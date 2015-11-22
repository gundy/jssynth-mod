import {Utils} from 'gundy/jssynth';
import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

export const MOD_JUMP_TO_PATTERN = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState) {
        playerState.jumpToPattern = param;
    }
});
