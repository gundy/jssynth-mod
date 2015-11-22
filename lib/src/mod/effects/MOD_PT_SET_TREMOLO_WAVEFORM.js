import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';


export const MOD_PT_SET_TREMOLO_WAVEFORM = Utils.merge(TEMPLATE_EFFECT, {
    div:function(mixer, chan, param, playerState, channelState) {
        channelState.effectState.tremoloParams.waveform = param & 0x07;
    }
});
