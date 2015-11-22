import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';
import {MOD_PORTA_TO_NOTE} from './MOD_PORTA_TO_NOTE';
import {MOD_VOLUME_SLIDE} from './MOD_VOLUME_SLIDE';

export const MOD_PORTA_PLUS_VOL_SLIDE = Utils.merge(TEMPLATE_EFFECT, {
    // warning - copy pasted from effect #3
    div: function(mixer, chan, param, playerState, channelState, period) {
        if (period != 0) {
            channelState.effectState.portToNoteDestPeriod = period;
            if (!channelState.effectState.portToNoteSpeed) {
                channelState.effectState.portToNoteSpeed = 0x00;
            }
        }
    },
    tick: function(mixer, chan, param, playerState, channelState) {
        MOD_PORTA_TO_NOTE.tick(mixer, chan, param, playerState, channelState);
        MOD_VOLUME_SLIDE.tick(mixer, chan, param, playerState, channelState);
    },
    allowPeriodChange: false
});
