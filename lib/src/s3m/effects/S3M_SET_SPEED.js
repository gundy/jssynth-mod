import {Utils} from 'gundy/jssynth';
import {TEMPLATE_EFFECT} from '../../mod/effects/TEMPLATE_EFFECT';

export const S3M_SET_SPEED = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState) {
        playerState.speed = param;
    }
});
