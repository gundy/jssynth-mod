import {Utils} from 'gundy/jssynth';
import {TEMPLATE_EFFECT} from '../../mod/effects/TEMPLATE_EFFECT';
import {MOD_PT_SET_FILTER} from '../../mod/effects/MOD_PT_SET_FILTER';
import {MOD_PT_GLISSANDO_CONTROL} from '../../mod/effects/MOD_PT_GLISSANDO_CONTROL';
import {MOD_PT_SET_FINETUNE} from '../../mod/effects/MOD_PT_SET_FINETUNE';
import {MOD_PT_SET_VIBRATO_WAVEFORM} from '../../mod/effects/MOD_PT_SET_VIBRATO_WAVEFORM';
import {MOD_PT_SET_TREMOLO_WAVEFORM} from '../../mod/effects/MOD_PT_SET_TREMOLO_WAVEFORM';
import {MOD_PT_16_POS_PAN} from '../../mod/effects/MOD_PT_16_POS_PAN';
import {S3M_STEREO_CONTROL} from './S3M_STEREO_CONTROL';
import {MOD_PT_PATTERN_LOOP} from '../../mod/effects/MOD_PT_PATTERN_LOOP';
import {MOD_PT_CUT_NOTE} from '../../mod/effects/MOD_PT_CUT_NOTE';
import {MOD_PT_DELAY_NOTE} from '../../mod/effects/MOD_PT_DELAY_NOTE';
import {MOD_PT_DELAY_PATTERN} from '../../mod/effects/MOD_PT_DELAY_PATTERN';
import {MOD_PT_INVERT_LOOP} from '../../mod/effects/MOD_PT_INVERT_LOOP';

var S3M_EXTENDED_EFFECT_MAP = {
    /* S0 */0x130: { code: 'x', effect: MOD_PT_SET_FILTER },
    /* S1 */0x131: { code: 'x', effect: MOD_PT_GLISSANDO_CONTROL },
    /* S2 */0x132: { code: 'x', effect: MOD_PT_SET_FINETUNE },
    /* S3 */0x133: { code: 'x', effect: MOD_PT_SET_VIBRATO_WAVEFORM },
    /* S4 */0x134: { code: 'x', effect: MOD_PT_SET_TREMOLO_WAVEFORM },
    /* S5 */0x135: { code: 'x', effect: TEMPLATE_EFFECT },
    /* S6 */0x136: { code: 'x', effect: TEMPLATE_EFFECT },
    /* S7 */0x137: { code: 'x', effect: TEMPLATE_EFFECT },
    /* S8 */0x138: { code: 'x', effect: MOD_PT_16_POS_PAN },
    /* S9 */0x139: { code: 'x', effect: TEMPLATE_EFFECT },
    /* SA */0x13a: { code: 'x', effect: S3M_STEREO_CONTROL },
    /* SB */0x13b: { code: 'x', effect: MOD_PT_PATTERN_LOOP },
    /* SC */0x13c: { code: 'x', effect: MOD_PT_CUT_NOTE },
    /* SD */0x13d: { code: 'x', effect: MOD_PT_DELAY_NOTE },
    /* SE */0x13e: { code: 'x', effect: MOD_PT_DELAY_PATTERN },
    /* SF */0x13f: { code: 'x', effect: MOD_PT_INVERT_LOOP } /* should this be "funk loop"? */
};

export const S3M_EXTENDED = Utils.merge(TEMPLATE_EFFECT, {
    div:function(mixer, chan, param, playerState, channelState, period, note, song) {
        var newEffect = 0x130 + ((param & 0xf0) / 16);
        var newParam = param & 0x0f;
        S3M_EXTENDED_EFFECT_MAP[newEffect].effect.div(mixer, chan, newParam, playerState, channelState, period, note, song);
    },
    tick:function(mixer, chan, param, playerState, channelState) {
        var newEffect = 0x130 + ((param & 0xf0) / 16);
        var newParam = param & 0x0f;
        S3M_EXTENDED_EFFECT_MAP[newEffect].effect.tick(mixer, chan, newParam, playerState, channelState);
    }
});
