"use strict";

import {MOD_EFFECT_MAP} from './effects/MOD_EFFECT_MAP';
import {MOD_PERIOD_TABLE} from './MOD_PERIOD_TABLE';
import {MOD_FINETUNE_TABLE} from './MOD_FINETUNE_TABLE';
import {Sample} from 'gundy/jssynth';
import {Instrument} from 'gundy/jssynth';

/* =========== MOD reader ================= */
var MODTypes = {
    'M.K.': { key: 'M.K.', channels: 4, instruments: 31 },
    'M!K!': { key: 'M!K!', channels: 4, instruments: 31 },
    'FLT4': { key: 'FLT4', channels: 4, instruments: 31 },
    '4CHN': { key: '4CHN', channels: 4, instruments: 31 },
    '6CHN': { key: '6CHN', channels: 6, instruments: 31 },
    'FLT8': { key: 'FLT8', channels: 8, instruments: 31 },
    '8CHN': { key: '8CHN', channels: 8, instruments: 31 },
    '16CH': { key: '16CH', channels: 16, instruments: 31 }
};

var EIGHTH_SEMITONE_MULTIPLIER = Math.pow(2, 1/(12*8));

export class MODLoader {
    static readMODfile(data) {
        var i;
        var readWord = function (ofs) {
            return (data.charCodeAt(ofs) * 256 + data.charCodeAt(ofs + 1) );
        };
        var modType = data.substring(1080, 1084);
        var modTypeData = MODTypes[modType] || { key: 'NOIS', channels: 4, instruments: 15 };
        var song = {};

        song.name = data.substring(0, 20);
        song.type = modTypeData.key;
        song.channels = modTypeData.channels;

        song.effectMap = MOD_EFFECT_MAP;
        var songLengthPos = 20 + (30 * modTypeData.instruments);

        song.songLength = data.charCodeAt(songLengthPos);
        song.orders = [];
        var maxPatternNum = 0;
        for (i = 0; i < 128; i++) {
            song.orders[i] = data.charCodeAt(songLengthPos + 2 + i);
            if (song.orders[i] > maxPatternNum) {
                maxPatternNum = song.orders[i];
            }
        }

        var patternOfs = songLengthPos + 130;
        if (modTypeData.instruments > 15) {
            patternOfs += 4;
        }

        song.patterns = [];
        for (i = 0; i <= maxPatternNum; i++) {
            var pattern = [];
            var ofs = patternOfs + (64 * 4 * modTypeData.channels * i);
            var row;
            for (row = 0; row < 64; row++) {
                var rowData = [];
                var chan;
                for (chan = 0; chan < modTypeData.channels; chan++) {
                    var note = { };
                    var chanOfs = ofs + (row * 4 * modTypeData.channels) + chan * 4;
                    var b1 = data.charCodeAt(chanOfs);
                    var b2 = data.charCodeAt(chanOfs + 1);
                    var b3 = data.charCodeAt(chanOfs + 2);
                    var b4 = data.charCodeAt(chanOfs + 3);
                    note.sampleNumber = (b1 & 0xf0) + ((b3 & 0xf0) / 16);
                    var period = (((b1 & 0x0f) * 256) + b2) * 4;
                    note.note = (period === 0) ? -1 : MOD_PERIOD_TABLE.getNote(period);
                    note.effect = b3 & 0x0f;
                    note.parameter = b4;
                    note.volume=-1;
                    rowData.push(note);
                }
                pattern.push(rowData);
            }
            song.patterns.push(pattern);
        }

        var sampleOfs = patternOfs + (64 * 4 * modTypeData.channels * (maxPatternNum + 1));

        var modInstruments = [];

        (function() {
            var insOffset;
            var sampleLength;
            var repeatLength;
            var sampleName;
            var sample;
            var repeatStart;
            var repeatEnd;

            for (i = 0; i < modTypeData.instruments; i++) {
                insOffset = 20 + 30 * i;

                sampleLength = readWord(insOffset + 22) * 2;
                repeatLength = readWord(insOffset + 28) * 2;
                sampleName = data.substring(insOffset, insOffset + 22);
                repeatStart = readWord(insOffset+26)*2;
                repeatEnd = readWord(insOffset+26)*2+repeatLength;
                if (repeatLength > 2 && repeatEnd > sampleLength) {
                    repeatEnd = sampleLength-1;
                    repeatLength = repeatEnd - repeatStart;
                }

                sample = new Sample(data, {
                    name: sampleName,
                    bits: 8,
                    channels: 1,
                    signed: true,
                    sampleRate: 44100,
                    representedFreq: 44100 / Math.pow(EIGHTH_SEMITONE_MULTIPLIER, MOD_FINETUNE_TABLE[data.charCodeAt(insOffset + 24)]),
                    sampleLength: sampleLength,
                    volume: data.charCodeAt(insOffset + 25),
                    repeatType: repeatLength > 2 ? 'REP_NORMAL' : 'NON_REPEATING',
                    repeatStart: repeatStart,
                    repeatEnd: repeatEnd
                }, sampleOfs);
                sampleOfs += sampleLength;

                modInstruments[i] = new Instrument({name: sampleName, numSamples: 1}, [sample]);
            }
        })();

        song.instruments = modInstruments;

        return song;
    }
}
