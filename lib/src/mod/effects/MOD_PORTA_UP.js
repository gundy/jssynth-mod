import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';
import {SLIDE_CONFIG} from './SLIDE_CONFIG';

export const MOD_PORTA_UP = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState) {
        channelState.effectState.portAmt = param * 4;
    },
    tick: function(mixer, chan, param, playerState, channelState) {
        channelState.period -= channelState.effectState.portAmt;
        if (channelState.period < SLIDE_CONFIG.MIN_SLIDE_PERIOD) {
            channelState.period = SLIDE_CONFIG.MIN_SLIDE_PERIOD;
        }
    }
});
