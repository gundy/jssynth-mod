"use strict";

import {Utils} from 'gundy/jssynth';
import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';
import {MOD_PERIOD_TABLE} from '../MOD_PERIOD_TABLE';

export const MOD_ARPEGGIO = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState) {
        var currentNote = MOD_PERIOD_TABLE.getNote(channelState.lastPeriod);
        if (param != 0x00) {
            if (currentNote < 0 || currentNote > 108) {
                channelState.effectState.arpTable = [ channelState.period, channelState.period, channelState.period];
            } else {
                var a = (param & 0xf0) / 16;
                var b = (param & 0x0f);
                channelState.effectState.arpTable = [
                    MOD_PERIOD_TABLE.getPeriod(currentNote),
                    MOD_PERIOD_TABLE.getPeriod(currentNote+a),
                    MOD_PERIOD_TABLE.getPeriod(currentNote+b)
                ];
                channelState.effectState.arpPos = 0;
            }
        }
    },
    tick: function(mixer, chan, param, playerState, channelState) {
        if (param != 0x00) {
            channelState.effectState.arpPos = (channelState.effectState.arpPos + 1) % 3;
            channelState.period = channelState.effectState.arpTable[channelState.effectState.arpPos];
        }
    }
});
