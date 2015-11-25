import {Utils} from 'gundy/jssynth';
import {TEMPLATE_EFFECT} from '../../mod/effects/TEMPLATE_EFFECT';
import {S3M_RETRIG_TABLE} from './S3M_RETRIG_TABLE';

export const S3M_RETRIG_PLUS_VOLUME_SLIDE = Utils.merge(TEMPLATE_EFFECT, {
    div: function(mixer, chan, param, playerState, channelState, period) {
        if (param & 0xf0 != 0x00) {
            channelState.effectState.lastS3MRetrigVolSldParam = (param & 0xf0) / 16;
        }
        if (param & 0x0f != 0x00) {
            channelState.effectState.lastS3MRetrigRetrigTickParam = (param & 0x0f);
        }

    },
    tick:function(mixer, chan, param, playerState, channelState) {
        var retrigTicks = channelState.effectState.lastS3MRetrigRetrigTickParam || 0x00;
        var volSld = channelState.effectState.lastS3MRetrigVolSldParam || 0x00;
        if ((playerState.tick + 1) % retrigTicks == 0) {
            mixer.setSamplePosition(chan, 0);
            channelState.volume = S3M_RETRIG_TABLE[volSld](channelState.volume);
        }
        channelState.volume = channelState.volume < 0 ? 0 : channelState.volume > 64 ? 64 : channelState.volume;
        channelState.lastVolume = channelState.volume;
    }
});
