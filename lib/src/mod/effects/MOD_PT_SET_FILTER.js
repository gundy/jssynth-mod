import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';


export const MOD_PT_SET_FILTER = Utils.merge(TEMPLATE_EFFECT, {
    div:function(mixer, chan, param, playerState, channelState, period) {
        playerState.filter = param;
    }
});
