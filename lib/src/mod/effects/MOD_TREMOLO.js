import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';
import {VIBRATO_TABLE} from './VIBRATO_TABLE';

var updatePos = function(p) {
    p.pos = (p.pos + p.speed) % 64;
};

var lookupVolumeOffset = function(p) {
    return (VIBRATO_TABLE[p.waveform & 0x03][p.pos] * p.depth / 64);
};

export const MOD_TREMOLO = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState, period) {
        var tremParams = channelState.effectState.tremoloParams || {
                waveform: 0,
                pos: 0,
                depth: 0,
                speed: 0
            };
        if (tremParams.waveform <= 3 && period > 0) {
            tremParams.pos = 0;
        }
        if (param > 0x00) {
            var newDepth = param & 0x0f;
            if (newDepth > 0) {
                tremParams.depth = newDepth;
            }
            var newSpeed = ((param & 0xf0) / 16);
            if (newSpeed > 0) {
                tremParams.speed = newSpeed;
            }
        }
        channelState.effectState.tremoloParams = tremParams;
    },
    tick: function(mixer, chan, param, playerState, channelState) {
        var tremParams = channelState.effectState.tremoloParams;
        if (tremParams) {
            updatePos(tremParams);
            channelState.volume = channelState.lastVolume + lookupVolumeOffset(tremParams);
            channelState.volume = Math.round(channelState.volume < 0 ? 0 : channelState.volume > 64 ? 64 : channelState.volume);
        }
    }
});
