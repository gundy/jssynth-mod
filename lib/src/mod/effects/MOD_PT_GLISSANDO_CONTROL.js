import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';


export const MOD_PT_GLISSANDO_CONTROL = Utils.merge(TEMPLATE_EFFECT, {
    tick:function(mixer, chan, param, playerState, channelState) {
        playerState.glissandoControl = param;
    }
});
