import {Utils} from 'gundy/jssynth';
import {TEMPLATE_EFFECT} from '../../mod/effects/TEMPLATE_EFFECT';
import {SLIDE_CONFIG} from '../../mod/effects/SLIDE_CONFIG';

export const S3M_PORTA_UP = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState, period) {
        if (param == 0x00) {
            param = channelState.effectState.lastS3MPortDown || 0x00;
        }
        channelState.effectState.lastS3MPortDown = param;
        var a = (param & 0xf0) / 16;
        var b = param & 0x0f;
        if (a == 0x0f) {
            channelState.period -= b * 4;
        } else if (a == 0x0e) {
            channelState.period -= b;
        }
        if (channelState.period < SLIDE_CONFIG.MIN_SLIDE_PERIOD) {
            channelState.period = SLIDE_CONFIG.MIN_SLIDE_PERIOD;
        }
    },
    tick: function(mixer, chan, param, playerState, channelState) {
        var slideAmt = channelState.effectState.lastS3MPortDown;
        var a = (slideAmt & 0xf0) / 16;
        var b = (slideAmt & 0x0f);
        if (a < 0x0e) {
            channelState.period -= ((a * 16) + b) * 4;
        }
        if (channelState.period < SLIDE_CONFIG.MIN_SLIDE_PERIOD) {
            channelState.period = SLIDE_CONFIG.MIN_SLIDE_PERIOD;
        }
    }
});
