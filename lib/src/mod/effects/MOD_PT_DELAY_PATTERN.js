import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

export const MOD_PT_DELAY_PATTERN = Utils.merge(TEMPLATE_EFFECT, {
    div:function(mixer, chan, param, playerState) {
        playerState.patternDelay = param * playerState.speed;
    },
    tick:function(mixer, chan, param, playerState, channelState) {
    }
});
