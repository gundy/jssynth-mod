import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';


export const MOD_SET_SPEED = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState) {
        if (param <= 0x20) {
            playerState.speed = param;
        } else {
            playerState.bpm = param;
        }
    }
});
