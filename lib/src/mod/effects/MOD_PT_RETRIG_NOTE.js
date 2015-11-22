import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';


export const MOD_PT_RETRIG_NOTE = Utils.merge(TEMPLATE_EFFECT, {
    tick:function(mixer, chan, param, playerState, channelState) {
        if ((playerState.tick + 1) % param == 0) {
            mixer.setSamplePosition(chan, 0);
        }
    }
});
