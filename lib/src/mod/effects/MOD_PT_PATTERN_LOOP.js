import {Utils} from 'gundy/jssynth';

import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

export const MOD_PT_PATTERN_LOOP = Utils.merge(TEMPLATE_EFFECT, {
    div:function(mixer, chan, param, playerState, channelState, period, note, song) {
        var doLoop = function() {
            channelState.effectState.patternLoop.count--;
            playerState.l_breakToRow = channelState.effectState.patternLoop.row;
            playerState.l_jumpToPattern = playerState.pos;
        };
        if (param == 0x00) {
            /* start loop */
            channelState.effectState.patternLoop.row = playerState.row;
        } else {
            if (channelState.effectState.patternLoop.count == null) {
                channelState.effectState.patternLoop.count = param;
                doLoop();
            } else {
                if (channelState.effectState.patternLoop.count != 0) {
                    doLoop();
                } else {
                    channelState.effectState.patternLoop.count = null;
                }
            }
        }
    }
});
