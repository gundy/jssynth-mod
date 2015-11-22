import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';
import {INVERT_LOOP_TABLE} from './INVERT_LOOP_TABLE';

export const MOD_PT_INVERT_LOOP = Utils.merge(TEMPLATE_EFFECT, {
    div:function(mixer, chan, param, playerState, channelState, period, note, song) {
        channelState.effectState.invertLoop.delay = 0;
        var ins = channelState.sample;
        if (ins > 0) {
            channelState.effectState.invertLoop.sample = song.instruments[ins];
        }
    },
    tick:function(mixer, chan, param, playerState, channelState) {
        var currentSample = channelState.effectState.invertLoop.sample;

        channelState.effectState.invertLoop.delay += INVERT_LOOP_TABLE[param];
        if (currentSample && currentSample.metadata.repeatLength > 2 && channelState.effectState.invertLoop.delay >= 128) {
            channelState.effectState.invertLoop.delay = 0;

            channelState.effectState.invertLoop.pos ++;
            if (channelState.effectState.invertLoop.pos > currentSample.metadata.repeatLength) {
                channelState.effectState.invertLoop.pos = 0;
            }

            currentSample.data[currentSample.metadata.repeatStart+channelState.effectState.invertLoop.pos] =
                (0 - currentSample.data[currentSample.metadata.repeatStart+channelState.effectState.invertLoop.pos]);
        }
    }
});
