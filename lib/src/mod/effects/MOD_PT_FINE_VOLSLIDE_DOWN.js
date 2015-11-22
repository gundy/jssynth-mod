import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

export const MOD_PT_FINE_VOLSLIDE_DOWN = Utils.merge(TEMPLATE_EFFECT, {
    div:function(mixer, chan, param, playerState, channelState) {
        channelState.volume -= param;
        if (channelState.volume < 0) {
            channelState.volume = 0;
        }
        channelState.lastVolume = channelState.volume;
    }
});
