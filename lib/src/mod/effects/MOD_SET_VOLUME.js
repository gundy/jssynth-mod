import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

export const MOD_SET_VOLUME = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState) {
        channelState.volume = param < 0 ? 0 : param > 0x40 ? 0x40 : param;
        channelState.lastVolume = channelState.volume;
    }
});
