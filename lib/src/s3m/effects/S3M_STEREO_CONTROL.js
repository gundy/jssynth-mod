import {Utils} from 'gundy/jssynth';
import {TEMPLATE_EFFECT} from '../../mod/effects/TEMPLATE_EFFECT';

export const S3M_STEREO_CONTROL = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState) {
        if (param > 7) {
            param = param - 16;
        }
        param = param + 8;
        channelState.panPos.left = (15 -  param) / 15;
        channelState.panPos.right = param / 15;
    }
});
