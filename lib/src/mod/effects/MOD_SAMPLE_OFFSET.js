import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';


export const MOD_SAMPLE_OFFSET = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState, period) {
        mixer.setSamplePosition(chan, param * 256);
    }
});
