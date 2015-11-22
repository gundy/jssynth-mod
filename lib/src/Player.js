"use strict";

import {AMIGA_FILTERS} from './AMIGA_FILTERS';
import {MOD_PERIOD_TABLE} from './mod/MOD_PERIOD_TABLE';

/*
 * ======================================== PLAYER ===========================================
 */

var FREQ_NTSC = { clock: 7159090.5*4 };
var FREQ_PAL =  { clock: 7093789.2*4 };

/*
 * SONG PLAYER ...
 */
export class Player {
    constructor(mixer) {
        this.playing = true;
        this.loggingEnabled = false;
        this.song = null;
        this.stateCallback = null;
        this.mixer = mixer;
        this.mixer.setPreMixCallback(this.preSampleMix, this);
        this.FREQ = { PAL: FREQ_PAL, NTSC: FREQ_NTSC }
    }

    setSong(song) {
        this.song = song;
        this.effectMap = song.effectMap;
        this.playerState = {
            freq: song.defaultFreq || FREQ_PAL,

            pos: 0,
            row: -1,
            tick: 6,
            speed: song.initialSpeed || 6,
            bpm: song.initialBPM || 125,
            globalVolume: song.globalVolume || 64,
            patternDelay: 0,
            glissandoControl: 0,  /* 1 means that slides are locked to note values */
            breakToRow: null,
            jumpToPattern: null,
            l_breakToRow: null,  /* for pattern loop */
            l_jumpToPattern: null,
            fastS3MVolumeSlides: song.fastS3MVolumeSlides || false,
            filter: 0
        };

        var defaultPanPos = song.defaultPanPos || [ -0.8, 0.8, 0.8, -0.8, -0.8, 0.8, 0.8, -0.8,-0.8, 0.8, 0.8, -0.8,-0.8, 0.8, 0.8, -0.8];
        this.channelState = [];
        for (var i = 0; i < song.channels; i++) {
            this.channelState[i] = {
                chan: i,
                panPos: defaultPanPos[i],
                volume: 64,
                lastVolume: undefined,  /* last officially set volume - base volume for tremolo */
                period: 0,
                pitchOfs: 1,
                lastPeriod: 0,  /* last officially set period - base period for vibrato */
                effect: 0,
                effectParameter: 0,
                effectState: {
                    tremorCount: 0,
                    tremorParam: 0,
                    arpPos: 0,
                    noteDelay: -1,
                    vibratoParams: {
                        waveform: 0,
                        pos: 0,
                        depth: 0,
                        speed: 0
                    },
                    tremoloParams: {
                        waveform: 0,
                        pos: 0,
                        depth: 0,
                        speed: 0
                    },
                    patternLoop: {
                        row: 0,
                        count: null
                    },
                    invertLoop: {
                        pos: 0,
                        delay: 0,
                        sample: null
                    }
                }
            };
            this.mixer.setPanPosition(i, this.channelState[i].panPos);
        }
    }

    start() {
        this.playing = true;
    }

    stop() {
        // stop any further notes from being played
        this.playing = false;

        // and cut output from all song player related channels
        for (var chan = 0; chan < this.song.channels; chan++) {
            this.mixer.cut(chan);
        }
    }

    preSampleMix(mixer, sampleRate) {
        if (!this.playing) {
            return;
        }
        var state = this.playerState;
        var song = this.song;
        if (state.patternDelay > 0) {
            state.patternDelay--;
            this.handleTick(song.patterns[song.orders[state.pos]][state.row], state.tick, sampleRate);
        } else {
            if (state.tick == 0) {
                if (this.stateCallback) {
                    this.stateCallback(this.playerState, this.channelState);
                }
                this.handleDiv(song.patterns[song.orders[state.pos]][state.row], sampleRate);
            } else {
                this.handleTick(song.patterns[song.orders[state.pos]][state.row], state.tick, sampleRate);
            }
            this.advanceTick();
        }
        if (state.tick === 0) {
            /*
             * l_jumpToPattern and l_breakToRow are used for pattern loops;
             * these are processed _before_ normal jump to pattern/row commands
             */
            if (state.l_jumpToPattern !== null) {
                state.jumpToPattern = state.l_jumpToPattern;
                state.breakToRow = state.l_breakToRow;
                state.l_jumpToPattern = null;
                state.l_breakToRow = null;
            }
            if (state.jumpToPattern !== null) {
                state.pos = state.jumpToPattern;
                state.jumpToPattern = null;
                if (state.breakToRow !== null) {
                    state.row = state.breakToRow;
                    state.breakToRow = null;
                } else {
                    state.row = 0;
                }
            }
            if (state.breakToRow !== null) {
                if (state.row !== 0) {
                    this.advancePos();
                }
                state.row = state.breakToRow;
                state.breakToRow = null;
            }
        }
        if (this.playerState.filter > 0) {
            this.mixer.setFilters(AMIGA_FILTERS);
        } else {
            this.mixer.setFilters(null);
        }
        this.mixer.setGlobalVolume(state.globalVolume);
        this.mixer.setSecondsPerMix(1 / (state.bpm * 2 / 5));
    }

    /**
     * Jump to the next position in the song
     */
    nextPos() {
        this.advancePos();
        this.playerState.row = 0;
        this.playerState.tick = 0;
    }

    /**
     * Jump to the previous position in the song
     */
    previousPos() {
        this.decrementPos();
        this.playerState.row = 0;
        this.playerState.tick = 0;
    }

    advancePos() {
        var state = this.playerState;
        var song = this.song;

        do {
            state.pos = state.pos + 1;
        } while (song.orders[state.pos] == 254);

        if (state.pos >= song.songLength || song.orders[state.pos] == 255) {
            state.pos = 0;
        }
    }

    decrementPos() {
        var state = this.playerState;
        var song = this.song;

        do {
            state.pos -= 1;
        } while (song.orders[state.pos] == 254);

        if (state.pos < 0) {
            state.pos = song.songLength;
            do {
                state.pos -= 1;
            } while (song.orders[state.pos] == 254);
        }
    }

    advanceRow() {
        var state = this.playerState;
        var song = this.song;

        var numRows = song.patterns[song.orders[state.pos]].length;
        state.row = state.row + 1;

        if (state.row >= numRows) {
            var chan;
            for (chan = 0; chan < song.channels; chan++) {
                this.channelState[chan].effectState.patternLoop.row = 0;
            }
            state.row = 0;
            this.advancePos();
        }
    }

    advanceTick() {
        var state = this.playerState;
        state.tick += 1;
        if (state.tick >= state.speed) {
            state.tick = 0;
            this.advanceRow();
        }
    }

    handleTick(row, tick, sampleRate) {
        for (var chan = 0; chan < this.song.channels; chan++) {
            var chanState = this.channelState[chan];
            var effectParameter = chanState.effectParameter;
            var effectHandler = chanState.effect;
            var volumeEffectHandler = null, volumeEffectParameter = null;
            if (row && row[chan] && row[chan].volumeEffect) {
                volumeEffectHandler = this.effectMap[row[chan].volumeEffect].effect;
                volumeEffectParameter = row[chan].volumeEffectParameter;
            }
            if (volumeEffectHandler) {
                volumeEffectHandler.tick(this.mixer, chan, volumeEffectParameter, this.playerState, chanState, null, null, this.song);
            }
            if (effectHandler) {
                effectHandler.tick(this.mixer, chan, effectParameter, this.playerState, chanState, null, null, this.song);
            }
            var periodToPlay = chanState.period;
            if (this.playerState.glissandoControl > 0) {
                var noteNum = MOD_PERIOD_TABLE.getNote(periodToPlay);
                periodToPlay = MOD_PERIOD_TABLE.getPeriod(noteNum);
            }
            var freqHz = (this.playerState.freq.clock / (periodToPlay * 2)) * chanState.pitchOfs;
            this.mixer.setFrequency(chan, freqHz);
            this.mixer.setVolume(chan, chanState.volume);
        }
    }

    handleNote(chan, note, sampleRate) {
        var parms = this.channelState[chan];
        var period = 0;
        if (note.note > 0 && note.note !== 254) {
            period = MOD_PERIOD_TABLE.getPeriod(note.note);
        }
        var sampleNumber = note.sampleNumber - 1;
        parms.effectParameter = note.parameter;
        var effectHandler = this.effectMap[note.effect].effect;
        var volumeEffectHandler = null, volumeEffectParameter = null;
        if (note.volumeEffect) {
            volumeEffectHandler = this.effectMap[note.volumeEffect].effect;
            volumeEffectParameter = note.volumeEffectParameter;
        }
        if (!effectHandler && this.loggingEnabled) {
            console && console.log && console.log("no effect handler for effect "+note.effect.toString(16)+"/"+note.parameter.toString(16));
        }
        parms.effect = effectHandler;

        if (sampleNumber >= 0 && this.song.instruments[sampleNumber]) {

            var instrument = this.song.instruments[sampleNumber];

            var noteToPlay = note.note;
            if (noteToPlay < 0) {
                noteToPlay = MOD_PERIOD_TABLE.getNote(parms.period);
            }
            if (noteToPlay > 0) {
                var sampleNum = instrument.metadata.noteToSampleMap[noteToPlay];
                var sample = instrument.samples[sampleNum];

                // set sample (& volume)
                this.mixer.setSample(chan, sample);

                parms.pitchOfs = sample.metadata.pitchOfs || 1;
                if ((effectHandler && effectHandler.allowVolumeChange === true) || !effectHandler) {
                    parms.volume = sample.metadata.volume;
                    parms.lastVolume = sample.metadata.volume;
                }
            }

        }
        if (period > 0) {
            if ((effectHandler && effectHandler.allowPeriodChange === true) || !effectHandler) {
                parms.period = period;
                parms.lastPeriod = period;
                if ((effectHandler && effectHandler.allowSampleTrigger === true) || !effectHandler) {
                    this.mixer.setSamplePosition(chan, 0);
                }
            }
        }
        var volume = note.volume;
        if (volume >= 0) {
            if ((effectHandler && effectHandler.allowVolumeChange === true) || !effectHandler) {
                parms.volume = volume;
                parms.lastVolume = volume;
            }
        }
        if (note.note === 254) {  // 254 means note off
            this.mixer.cut(chan);
        }
        if (volumeEffectHandler) {
            volumeEffectHandler.div(this.mixer, chan, volumeEffectParameter, this.playerState, parms, period, note, this.song);
        }
        if (effectHandler) {
            effectHandler.div(this.mixer, chan, parms.effectParameter, this.playerState, parms, period, note, this.song);
        }
        var periodToPlay = parms.period;
        if (this.playerState.glissandoControl > 0) {
            var noteNum = MOD_PERIOD_TABLE.getNote(periodToPlay);
            periodToPlay = MOD_PERIOD_TABLE.getPeriod(noteNum);
        }

        this.mixer.setVolume(chan, parms.volume);
        var freqHz = this.playerState.freq.clock / (periodToPlay * 2) * parms.pitchOfs;
        this.mixer.setFrequency(chan, freqHz);

    }

    getPlayerState() {
        return this.playerState;
    }

    handleDiv(row, sampleRate) {
        for (var chan = 0; chan < this.song.channels; chan++) {
            var note = row[chan];
            this.handleNote(chan, note, sampleRate);
        }
    }

    registerCallback(callback) {
        this.stateCallback = callback;
    }
}

