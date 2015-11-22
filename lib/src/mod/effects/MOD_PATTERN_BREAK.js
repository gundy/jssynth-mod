import {Utils} from 'gundy/jssynth';
import {TEMPLATE_EFFECT} from './TEMPLATE_EFFECT';

export const MOD_PATTERN_BREAK = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState) {
        var x = ((param & 0xf0) / 16);
        var y = param & 0x0f;
        var newRow = x * 10 + y;
        playerState.breakToRow = newRow;
    }
});
