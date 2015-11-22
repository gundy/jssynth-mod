import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

export const MOD_PT_FINE_PORTA_UP = Utils.merge(TEMPLATE_EFFECT, {
    tick:function(mixer, chan, param, playerState, channelState) {
        channelState.period -= param * 4;
        channelState.lastPeriod = channelState.period;
    }
});
