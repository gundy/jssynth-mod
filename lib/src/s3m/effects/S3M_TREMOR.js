import {Utils} from 'gundy/jssynth';
import {TEMPLATE_EFFECT} from '../../mod/effects/TEMPLATE_EFFECT';

export const S3M_TREMOR = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState) {
        console.log("S3M Tremor; Does this sound okay?!");
        if (param > 0x00) {
            channelState.effectState.tremorParam = param;
        }
    },
    tick: function(mixer, chan, param, playerState, channelState) {
        channelState.effectState.tremorCount = ((channelState.effectState.tremorCount + 1) % (x+y));
        var x = (param & 0xf0) / 16;
        var y = param & 0x0f;
        if (channelState.effectState.tremorCount < x) {
            channelState.volume = channelState.lastVolume;
        } else {
            channelState.volume = 0;
        }
    }
});
