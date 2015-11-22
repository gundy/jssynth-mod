import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

export const MOD_PT_16_POS_PAN = Utils.merge(TEMPLATE_EFFECT, {
    div:function(mixer, chan, param, playerState, channelState) {
        channelState.panPos.left = (15 - param) / 15;
        channelState.panPos.right = param / 15;
    }
});
