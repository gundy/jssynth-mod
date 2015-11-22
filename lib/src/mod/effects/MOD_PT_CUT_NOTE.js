import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';


export const MOD_PT_CUT_NOTE = Utils.merge(TEMPLATE_EFFECT, {
    tick:function(mixer, chan, param, playerState, channelState) {
        if (playerState.tick >= param) {
            channelState.volume = 0;
        }
        channelState.lastVolume = channelState.volume;
    }
});
