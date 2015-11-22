import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';
import {MOD_VIBRATO} from './MOD_VIBRATO';
import {MOD_VOLUME_SLIDE} from './MOD_VOLUME_SLIDE';

export const MOD_VIBRATO_PLUS_VOL_SLIDE = Utils.merge(TEMPLATE_EFFECT, {
    div:function() {
    },
    tick: function(mixer, chan, param, playerState, channelState) {
        MOD_VOLUME_SLIDE.tick(mixer, chan, param, playerState, channelState);
        MOD_VIBRATO.tick(mixer, chan, param, playerState, channelState);
    }
});
