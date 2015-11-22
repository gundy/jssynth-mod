import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

export const MOD_PT_SET_VIBRATO_WAVEFORM = Utils.merge(TEMPLATE_EFFECT, {
    div:function(mixer, chan, param, playerState, channelState) {
        channelState.effectState.vibratoParams.waveform = param & 0x07;
    }
});
