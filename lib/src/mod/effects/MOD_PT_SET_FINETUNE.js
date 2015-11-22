import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

var EIGHTH_SEMITONE_MULTIPLIER = Math.pow(2, 1/(12*8));

export const MOD_PT_SET_FINETUNE = Utils.merge(TEMPLATE_EFFECT, {
    div:function(mixer, chan, param, playerState, channelState, period, note, song) {
        if (note.sampleNumber != 0) {
            var instrument = song.instruments[note.sampleNumber - 1];
            instrument.metadata.pitchOfs = Math.pow(EIGHTH_SEMITONE_MULTIPLIER, (param < 8 ? param : (param - 16)));
        }
    }
});
