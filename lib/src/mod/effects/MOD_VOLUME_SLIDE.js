import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

export const MOD_VOLUME_SLIDE = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState, period) { },
    tick: function(mixer, chan, param, playerState, channelState) {
        var upAmt = (param & 0xf0) / 16,  downAmt = param & 0x0f;
        if (upAmt !== 0x00 && downAmt !== 0x00) {
            downAmt = 0x00;
        }
        channelState.volume += upAmt - downAmt;
        channelState.volume = channelState.volume < 0 ? 0 : channelState.volume > 64 ? 64 : channelState.volume;
        channelState.lastVolume = channelState.volume;
    }
});
