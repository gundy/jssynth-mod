import {Utils} from 'gundy/jssynth';
import {TEMPLATE_EFFECT} from '../../mod/effects/TEMPLATE_EFFECT';

export const S3M_VOLUME_SLIDE = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState, period) {
        if (param == 0x00) {
            param = channelState.effectState.lastS3MVolSlide || 0x00;
        }
        channelState.effectState.lastS3MVolSlide = param;
        var a = (param & 0xf0) / 16;
        var b = param & 0x0f;
        if (playerState.fastS3MVolumeSlides) {
            if (b === 0x00 && a !== 0x00) {
                channelState.volume += a;
            } else if (a === 0x00 && b !== 0x00) {
                channelState.volume -= b;
            }
        }
        if (b === 0x0f) {
            channelState.volume += a;
        } else if (a === 0x0f) {
            channelState.volume -= b;
        }
        channelState.volume = channelState.volume < 0 ? 0 : channelState.volume > 64 ? 64 : channelState.volume;
        channelState.lastVolume = channelState.volume;
    },
    tick: function(mixer, chan, param, playerState, channelState) {
        var slideAmt = channelState.effectState.lastS3MVolSlide;
        var a = (slideAmt & 0xf0) / 16;
        var b = (slideAmt & 0x0f);
        if (b === 0x00 && a !== 0x00) {
            channelState.volume += a;
        } else if (a === 0x00 && b !== 0x00) {
            channelState.volume -= b;
        }
        channelState.volume = channelState.volume < 0 ? 0 : channelState.volume > 64 ? 64 : channelState.volume;
        channelState.lastVolume = channelState.volume;
    }
});
