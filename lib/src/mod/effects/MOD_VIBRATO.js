import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';
import {VIBRATO_TABLE} from './VIBRATO_TABLE';

var lookupPeriodOffset = function(p) {
    //return ((VIBRATO_TABLE[p.waveform & 0x03][p.pos] * p.depth) / 128);
    return ((VIBRATO_TABLE[p.waveform & 0x03][p.pos] * p.depth) / 256);
};

var updatePos = function(p) {
    p.pos = (p.pos + p.speed) % 64;
};

export const MOD_VIBRATO = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState, period) {
        var vibParams = channelState.effectState.vibratoParams || {
                waveform: 0,
                pos: 0,
                depth: 0,
                speed: 0
            };
        if (vibParams.waveform <= 3 && period > 0) {
            vibParams.pos = 0;
        }
        if (param > 0x00) {
            var newDepth = param & 0x0f;
            if (newDepth > 0) {
                vibParams.depth = newDepth;
            }
            var newSpeed = ((param & 0xf0) / 16);
            if (newSpeed > 0) {
                vibParams.speed = newSpeed;
            }
        }
        channelState.effectState.vibratoParams = vibParams;
    },
    tick: function(mixer, chan, param, playerState, channelState) {
        var vibParams = channelState.effectState.vibratoParams;
        if (vibParams) {
            updatePos(vibParams);
            channelState.period = channelState.lastPeriod + lookupPeriodOffset(vibParams) * 4;
        }
    }

});
