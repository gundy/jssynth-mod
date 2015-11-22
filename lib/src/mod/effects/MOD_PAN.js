import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

export const MOD_PAN = Utils.merge(TEMPLATE_EFFECT, {
    div:function(mixer, chan, param, playerState, channelState, period) {
        if (param <= 0x80) {
            channelState.panPos.left = (128-param)/128;
            channelState.panPos.right = param / 128;
        } else if (param == 0xa4) {
            channelState.panPos.left = 1;
            channelState.panPos.right = -1;
        }
    }
});
