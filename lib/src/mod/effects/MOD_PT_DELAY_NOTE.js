import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';
import {MOD_PERIOD_TABLE} from '../MOD_PERIOD_TABLE';

export const MOD_PT_DELAY_NOTE = Utils.merge(TEMPLATE_EFFECT, {
    div:function(mixer, chan, param, playerState, channelState, period, note, song) {
        var noteToPlay = note.note;
        if (noteToPlay < 0) {
            noteToPlay = MOD_PERIOD_TABLE.getNote(period);
        }
        var instrument = note.sampleNumber > 0 ? song.instruments[note.sampleNumber - 1] : null;
        var sample = null;
        if (instrument && noteToPlay > 0) {
            var sampleNum = instrument.metadata.noteToSampleMap[noteToPlay];
            sample = instrument.samples[sampleNum];
        }
        channelState.effectState.noteDelay = {
            delay: param,
            note: note,
            sample: sample
        };
    },
    tick:function(mixer, chan, param, playerState, channelState) {
        if (playerState.tick == (param - 1)) {
            var note = channelState.effectState.noteDelay.note;

            var period = note.note < 0 ? 0 : MOD_PERIOD_TABLE.getPeriod(note.note);
            var volume = note.volume;
            var sample =  channelState.effectState.noteDelay.sample;
            if (sample) {
                mixer.setSample(chan, sample);
                channelState.volume = sample.metadata.volume;
                channelState.lastVolume = sample.metadata.volume;
            }
            if (period > 0) {
                channelState.period = period;
                channelState.lastPeriod = period;
                mixer.setSamplePosition(chan, 0);
            }
            if (volume >= 0) {
                channelState.volume = volume;
                channelState.lastVolume = volume;
            }
        }
    },
    allowPeriodChange: false,
    allowSampleTrigger: false,
    allowVolumeChange: false
});
