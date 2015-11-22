import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

export const MOD_PORTA_TO_NOTE = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState, period) {
        if (period != 0) {
            channelState.effectState.portToNoteDestPeriod = period;
            if (!channelState.effectState.portToNoteSpeed) {
                channelState.effectState.portToNoteSpeed = 0x00;
            }
            channelState.lastPeriod = period;
        }
        if (param != 0x00) {
            channelState.effectState.portToNoteSpeed = param * 4;
        }
    },
    tick: function(mixer, chan, param, playerState, channelState) {

        if (channelState.effectState.portToNoteDestPeriod && channelState.effectState.portToNoteSpeed) {
            if (channelState.effectState.portToNoteDestPeriod > channelState.period) {
                channelState.period += channelState.effectState.portToNoteSpeed;
                if (channelState.period > channelState.effectState.portToNoteDestPeriod) {
                    channelState.period = channelState.effectState.portToNoteDestPeriod;
                    channelState.lastPeriod = channelState.period;
                }
            }
            if (channelState.effectState.portToNoteDestPeriod < channelState.period) {
                channelState.period -= channelState.effectState.portToNoteSpeed;
                if (channelState.period < channelState.effectState.portToNoteDestPeriod) {
                    channelState.period = channelState.effectState.portToNoteDestPeriod;
                    channelState.lastPeriod = channelState.period;
                }
            }
        }
    },
    allowPeriodChange: false,
    allowSampleTrigger: false
});
