System.register("lib/src/mod/MOD_FINETUNE_TABLE.js", [], function (_export) {
  var MOD_FINETUNE_TABLE;
  return {
    setters: [],
    execute: function () {
      "use strict";

      MOD_FINETUNE_TABLE = [0, 1, 2, 3, 4, 5, 6, 7, -8, -7, -6, -5, -4, -3, -2, -1];

      _export("MOD_FINETUNE_TABLE", MOD_FINETUNE_TABLE);
    }
  };
});
System.register('lib/src/mod/effects/MOD_SET_SPEED.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_SET_SPEED;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_SET_SPEED = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState) {
                    if (param <= 64) {
                        playerState.speed = param;
                    } else {
                        playerState.bpm = param;
                    }
                }
            });

            _export('MOD_SET_SPEED', MOD_SET_SPEED);
        }
    };
});
System.register("lib/src/mod/effects/INVERT_LOOP_TABLE.js", [], function (_export) {
  var INVERT_LOOP_TABLE;
  return {
    setters: [],
    execute: function () {
      "use strict";
      INVERT_LOOP_TABLE = [0, 5, 6, 7, 8, 10, 11, 13, 16, 19, 22, 26, 32, 43, 64, 128];

      _export("INVERT_LOOP_TABLE", INVERT_LOOP_TABLE);
    }
  };
});
System.register('lib/src/mod/effects/MOD_PT_INVERT_LOOP.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js', 'lib/src/mod/effects/INVERT_LOOP_TABLE.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, INVERT_LOOP_TABLE, MOD_PT_INVERT_LOOP;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }, function (_libSrcModEffectsINVERT_LOOP_TABLEJs) {
            INVERT_LOOP_TABLE = _libSrcModEffectsINVERT_LOOP_TABLEJs.INVERT_LOOP_TABLE;
        }],
        execute: function () {
            'use strict';

            MOD_PT_INVERT_LOOP = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState, period, note, song) {
                    channelState.effectState.invertLoop.delay = 0;
                    var ins = channelState.sample;
                    if (ins > 0) {
                        channelState.effectState.invertLoop.sample = song.instruments[ins];
                    }
                },
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    var currentSample = channelState.effectState.invertLoop.sample;

                    channelState.effectState.invertLoop.delay += INVERT_LOOP_TABLE[param];
                    if (currentSample && currentSample.metadata.repeatLength > 2 && channelState.effectState.invertLoop.delay >= 128) {
                        channelState.effectState.invertLoop.delay = 0;

                        channelState.effectState.invertLoop.pos++;
                        if (channelState.effectState.invertLoop.pos > currentSample.metadata.repeatLength) {
                            channelState.effectState.invertLoop.pos = 0;
                        }

                        currentSample.data[currentSample.metadata.repeatStart + channelState.effectState.invertLoop.pos] = 0 - currentSample.data[currentSample.metadata.repeatStart + channelState.effectState.invertLoop.pos];
                    }
                }
            });

            _export('MOD_PT_INVERT_LOOP', MOD_PT_INVERT_LOOP);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_DELAY_PATTERN.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_DELAY_PATTERN;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_DELAY_PATTERN = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState) {
                    playerState.patternDelay = param * playerState.speed;
                },
                tick: function tick(mixer, chan, param, playerState, channelState) {}
            });

            _export('MOD_PT_DELAY_PATTERN', MOD_PT_DELAY_PATTERN);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_DELAY_NOTE.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js', 'lib/src/mod/MOD_PERIOD_TABLE.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PERIOD_TABLE, MOD_PT_DELAY_NOTE;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }, function (_libSrcModMOD_PERIOD_TABLEJs) {
            MOD_PERIOD_TABLE = _libSrcModMOD_PERIOD_TABLEJs.MOD_PERIOD_TABLE;
        }],
        execute: function () {
            'use strict';

            MOD_PT_DELAY_NOTE = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState, period, note, song) {
                    var noteToPlay = note.note;
                    if (noteToPlay < 0) {
                        noteToPlay = MOD_PERIOD_TABLE.getNote(period);
                    }
                    var instrument = note.sampleNumber > 0 ? song.instruments[note.sampleNumber - 1] : null;
                    var sample = null;
                    if (instrument && noteToPlay > 0) {
                        var sampleNum = instrument.metadata.noteToSampleMap[noteToPlay];
                        sample = instrument.samples[sampleNum];
                    }
                    channelState.effectState.noteDelay = {
                        delay: param,
                        note: note,
                        sample: sample
                    };
                },
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    if (playerState.tick == param - 1) {
                        var note = channelState.effectState.noteDelay.note;

                        var period = note.note < 0 ? 0 : MOD_PERIOD_TABLE.getPeriod(note.note);
                        var volume = note.volume;
                        var sample = channelState.effectState.noteDelay.sample;
                        if (sample) {
                            mixer.setSample(chan, sample);
                            channelState.volume = sample.metadata.volume;
                            channelState.lastVolume = sample.metadata.volume;
                        }
                        if (period > 0) {
                            channelState.period = period;
                            channelState.lastPeriod = period;
                            mixer.setSamplePosition(chan, 0);
                        }
                        if (volume >= 0) {
                            channelState.volume = volume;
                            channelState.lastVolume = volume;
                        }
                    }
                },
                allowPeriodChange: false,
                allowSampleTrigger: false,
                allowVolumeChange: false
            });

            _export('MOD_PT_DELAY_NOTE', MOD_PT_DELAY_NOTE);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_CUT_NOTE.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_CUT_NOTE;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_CUT_NOTE = Utils.merge(TEMPLATE_EFFECT, {
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    if (playerState.tick >= param) {
                        channelState.volume = 0;
                    }
                    channelState.lastVolume = channelState.volume;
                }
            });

            _export('MOD_PT_CUT_NOTE', MOD_PT_CUT_NOTE);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_FINE_VOLSLIDE_DOWN.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_FINE_VOLSLIDE_DOWN;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_FINE_VOLSLIDE_DOWN = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState) {
                    channelState.volume -= param;
                    if (channelState.volume < 0) {
                        channelState.volume = 0;
                    }
                    channelState.lastVolume = channelState.volume;
                }
            });

            _export('MOD_PT_FINE_VOLSLIDE_DOWN', MOD_PT_FINE_VOLSLIDE_DOWN);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_FINE_VOLSLIDE_UP.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_FINE_VOLSLIDE_UP;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_FINE_VOLSLIDE_UP = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState) {
                    channelState.volume += param;
                    if (channelState.volume > 64) {
                        channelState.volume = 64;
                    }
                    channelState.lastVolume = channelState.volume;
                }
            });

            _export('MOD_PT_FINE_VOLSLIDE_UP', MOD_PT_FINE_VOLSLIDE_UP);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_RETRIG_NOTE.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_RETRIG_NOTE;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_RETRIG_NOTE = Utils.merge(TEMPLATE_EFFECT, {
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    if ((playerState.tick + 1) % param == 0) {
                        mixer.setSamplePosition(chan, 0);
                    }
                }
            });

            _export('MOD_PT_RETRIG_NOTE', MOD_PT_RETRIG_NOTE);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_16_POS_PAN.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_16_POS_PAN;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_16_POS_PAN = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState) {
                    channelState.panPos.left = (15 - param) / 15;
                    channelState.panPos.right = param / 15;
                }
            });

            _export('MOD_PT_16_POS_PAN', MOD_PT_16_POS_PAN);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_SET_TREMOLO_WAVEFORM.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_SET_TREMOLO_WAVEFORM;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_SET_TREMOLO_WAVEFORM = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState) {
                    channelState.effectState.tremoloParams.waveform = param & 7;
                }
            });

            _export('MOD_PT_SET_TREMOLO_WAVEFORM', MOD_PT_SET_TREMOLO_WAVEFORM);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_PATTERN_LOOP.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_PATTERN_LOOP;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_PATTERN_LOOP = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState, period, note, song) {
                    var doLoop = function doLoop() {
                        channelState.effectState.patternLoop.count--;
                        playerState.l_breakToRow = channelState.effectState.patternLoop.row;
                        playerState.l_jumpToPattern = playerState.pos;
                    };
                    if (param == 0) {
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

            _export('MOD_PT_PATTERN_LOOP', MOD_PT_PATTERN_LOOP);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_SET_FINETUNE.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, EIGHTH_SEMITONE_MULTIPLIER, MOD_PT_SET_FINETUNE;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            EIGHTH_SEMITONE_MULTIPLIER = Math.pow(2, 1 / (12 * 8));
            MOD_PT_SET_FINETUNE = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState, period, note, song) {
                    if (note.sampleNumber != 0) {
                        var instrument = song.instruments[note.sampleNumber - 1];
                        instrument.metadata.pitchOfs = Math.pow(EIGHTH_SEMITONE_MULTIPLIER, param < 8 ? param : param - 16);
                    }
                }
            });

            _export('MOD_PT_SET_FINETUNE', MOD_PT_SET_FINETUNE);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_SET_VIBRATO_WAVEFORM.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_SET_VIBRATO_WAVEFORM;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_SET_VIBRATO_WAVEFORM = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState) {
                    channelState.effectState.vibratoParams.waveform = param & 7;
                }
            });

            _export('MOD_PT_SET_VIBRATO_WAVEFORM', MOD_PT_SET_VIBRATO_WAVEFORM);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_GLISSANDO_CONTROL.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_GLISSANDO_CONTROL;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_GLISSANDO_CONTROL = Utils.merge(TEMPLATE_EFFECT, {
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    playerState.glissandoControl = param;
                }
            });

            _export('MOD_PT_GLISSANDO_CONTROL', MOD_PT_GLISSANDO_CONTROL);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_FINE_PORTA_DOWN.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_FINE_PORTA_DOWN;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_FINE_PORTA_DOWN = Utils.merge(TEMPLATE_EFFECT, {
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    channelState.period += param * 4;
                    channelState.lastPeriod = channelState.period;
                }
            });

            _export('MOD_PT_FINE_PORTA_DOWN', MOD_PT_FINE_PORTA_DOWN);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_FINE_PORTA_UP.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_FINE_PORTA_UP;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_FINE_PORTA_UP = Utils.merge(TEMPLATE_EFFECT, {
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    channelState.period -= param * 4;
                    channelState.lastPeriod = channelState.period;
                }
            });

            _export('MOD_PT_FINE_PORTA_UP', MOD_PT_FINE_PORTA_UP);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PT_SET_FILTER.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_SET_FILTER;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PT_SET_FILTER = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState, period) {
                    playerState.filter = param;
                }
            });

            _export('MOD_PT_SET_FILTER', MOD_PT_SET_FILTER);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PROTRACKER.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js', 'lib/src/mod/effects/MOD_PT_SET_FILTER.js', 'lib/src/mod/effects/MOD_PT_FINE_PORTA_UP.js', 'lib/src/mod/effects/MOD_PT_FINE_PORTA_DOWN.js', 'lib/src/mod/effects/MOD_PT_GLISSANDO_CONTROL.js', 'lib/src/mod/effects/MOD_PT_SET_VIBRATO_WAVEFORM.js', 'lib/src/mod/effects/MOD_PT_SET_FINETUNE.js', 'lib/src/mod/effects/MOD_PT_PATTERN_LOOP.js', 'lib/src/mod/effects/MOD_PT_SET_TREMOLO_WAVEFORM.js', 'lib/src/mod/effects/MOD_PT_16_POS_PAN.js', 'lib/src/mod/effects/MOD_PT_RETRIG_NOTE.js', 'lib/src/mod/effects/MOD_PT_FINE_VOLSLIDE_UP.js', 'lib/src/mod/effects/MOD_PT_FINE_VOLSLIDE_DOWN.js', 'lib/src/mod/effects/MOD_PT_CUT_NOTE.js', 'lib/src/mod/effects/MOD_PT_DELAY_NOTE.js', 'lib/src/mod/effects/MOD_PT_DELAY_PATTERN.js', 'lib/src/mod/effects/MOD_PT_INVERT_LOOP.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PT_SET_FILTER, MOD_PT_FINE_PORTA_UP, MOD_PT_FINE_PORTA_DOWN, MOD_PT_GLISSANDO_CONTROL, MOD_PT_SET_VIBRATO_WAVEFORM, MOD_PT_SET_FINETUNE, MOD_PT_PATTERN_LOOP, MOD_PT_SET_TREMOLO_WAVEFORM, MOD_PT_16_POS_PAN, MOD_PT_RETRIG_NOTE, MOD_PT_FINE_VOLSLIDE_UP, MOD_PT_FINE_VOLSLIDE_DOWN, MOD_PT_CUT_NOTE, MOD_PT_DELAY_NOTE, MOD_PT_DELAY_PATTERN, MOD_PT_INVERT_LOOP, PROTRACKER_EFFECTS, MOD_PROTRACKER;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }, function (_libSrcModEffectsMOD_PT_SET_FILTERJs) {
            MOD_PT_SET_FILTER = _libSrcModEffectsMOD_PT_SET_FILTERJs.MOD_PT_SET_FILTER;
        }, function (_libSrcModEffectsMOD_PT_FINE_PORTA_UPJs) {
            MOD_PT_FINE_PORTA_UP = _libSrcModEffectsMOD_PT_FINE_PORTA_UPJs.MOD_PT_FINE_PORTA_UP;
        }, function (_libSrcModEffectsMOD_PT_FINE_PORTA_DOWNJs) {
            MOD_PT_FINE_PORTA_DOWN = _libSrcModEffectsMOD_PT_FINE_PORTA_DOWNJs.MOD_PT_FINE_PORTA_DOWN;
        }, function (_libSrcModEffectsMOD_PT_GLISSANDO_CONTROLJs) {
            MOD_PT_GLISSANDO_CONTROL = _libSrcModEffectsMOD_PT_GLISSANDO_CONTROLJs.MOD_PT_GLISSANDO_CONTROL;
        }, function (_libSrcModEffectsMOD_PT_SET_VIBRATO_WAVEFORMJs) {
            MOD_PT_SET_VIBRATO_WAVEFORM = _libSrcModEffectsMOD_PT_SET_VIBRATO_WAVEFORMJs.MOD_PT_SET_VIBRATO_WAVEFORM;
        }, function (_libSrcModEffectsMOD_PT_SET_FINETUNEJs) {
            MOD_PT_SET_FINETUNE = _libSrcModEffectsMOD_PT_SET_FINETUNEJs.MOD_PT_SET_FINETUNE;
        }, function (_libSrcModEffectsMOD_PT_PATTERN_LOOPJs) {
            MOD_PT_PATTERN_LOOP = _libSrcModEffectsMOD_PT_PATTERN_LOOPJs.MOD_PT_PATTERN_LOOP;
        }, function (_libSrcModEffectsMOD_PT_SET_TREMOLO_WAVEFORMJs) {
            MOD_PT_SET_TREMOLO_WAVEFORM = _libSrcModEffectsMOD_PT_SET_TREMOLO_WAVEFORMJs.MOD_PT_SET_TREMOLO_WAVEFORM;
        }, function (_libSrcModEffectsMOD_PT_16_POS_PANJs) {
            MOD_PT_16_POS_PAN = _libSrcModEffectsMOD_PT_16_POS_PANJs.MOD_PT_16_POS_PAN;
        }, function (_libSrcModEffectsMOD_PT_RETRIG_NOTEJs) {
            MOD_PT_RETRIG_NOTE = _libSrcModEffectsMOD_PT_RETRIG_NOTEJs.MOD_PT_RETRIG_NOTE;
        }, function (_libSrcModEffectsMOD_PT_FINE_VOLSLIDE_UPJs) {
            MOD_PT_FINE_VOLSLIDE_UP = _libSrcModEffectsMOD_PT_FINE_VOLSLIDE_UPJs.MOD_PT_FINE_VOLSLIDE_UP;
        }, function (_libSrcModEffectsMOD_PT_FINE_VOLSLIDE_DOWNJs) {
            MOD_PT_FINE_VOLSLIDE_DOWN = _libSrcModEffectsMOD_PT_FINE_VOLSLIDE_DOWNJs.MOD_PT_FINE_VOLSLIDE_DOWN;
        }, function (_libSrcModEffectsMOD_PT_CUT_NOTEJs) {
            MOD_PT_CUT_NOTE = _libSrcModEffectsMOD_PT_CUT_NOTEJs.MOD_PT_CUT_NOTE;
        }, function (_libSrcModEffectsMOD_PT_DELAY_NOTEJs) {
            MOD_PT_DELAY_NOTE = _libSrcModEffectsMOD_PT_DELAY_NOTEJs.MOD_PT_DELAY_NOTE;
        }, function (_libSrcModEffectsMOD_PT_DELAY_PATTERNJs) {
            MOD_PT_DELAY_PATTERN = _libSrcModEffectsMOD_PT_DELAY_PATTERNJs.MOD_PT_DELAY_PATTERN;
        }, function (_libSrcModEffectsMOD_PT_INVERT_LOOPJs) {
            MOD_PT_INVERT_LOOP = _libSrcModEffectsMOD_PT_INVERT_LOOPJs.MOD_PT_INVERT_LOOP;
        }],
        execute: function () {
            'use strict';

            PROTRACKER_EFFECTS = {
                /* protracker commands */
                224: MOD_PT_SET_FILTER,
                225: MOD_PT_FINE_PORTA_UP,
                226: MOD_PT_FINE_PORTA_DOWN,
                227: MOD_PT_GLISSANDO_CONTROL,
                228: MOD_PT_SET_VIBRATO_WAVEFORM,
                229: MOD_PT_SET_FINETUNE,
                230: MOD_PT_PATTERN_LOOP,
                231: MOD_PT_SET_TREMOLO_WAVEFORM,
                232: MOD_PT_16_POS_PAN,
                233: MOD_PT_RETRIG_NOTE,
                234: MOD_PT_FINE_VOLSLIDE_UP,
                235: MOD_PT_FINE_VOLSLIDE_DOWN,
                236: MOD_PT_CUT_NOTE,
                237: MOD_PT_DELAY_NOTE,
                238: MOD_PT_DELAY_PATTERN,
                239: MOD_PT_INVERT_LOOP
            };
            MOD_PROTRACKER = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState, period, note, song) {
                    var newEffect = 224 + (param & 240) / 16;
                    var newParam = param & 15;
                    PROTRACKER_EFFECTS[newEffect].div(mixer, chan, newParam, playerState, channelState, period, note, song);
                },
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    var newEffect = 224 + (param & 240) / 16;
                    var newParam = param & 15;
                    PROTRACKER_EFFECTS[newEffect].tick(mixer, chan, newParam, playerState, channelState);
                }
            });

            _export('MOD_PROTRACKER', MOD_PROTRACKER);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PATTERN_BREAK.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PATTERN_BREAK;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PATTERN_BREAK = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState) {
                    var x = (param & 240) / 16;
                    var y = param & 15;
                    var newRow = x * 10 + y;
                    playerState.breakToRow = newRow;
                }
            });

            _export('MOD_PATTERN_BREAK', MOD_PATTERN_BREAK);
        }
    };
});
System.register('lib/src/mod/effects/MOD_SET_VOLUME.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_SET_VOLUME;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_SET_VOLUME = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState) {
                    channelState.volume = param < 0 ? 0 : param > 64 ? 64 : param;
                    channelState.lastVolume = channelState.volume;
                }
            });

            _export('MOD_SET_VOLUME', MOD_SET_VOLUME);
        }
    };
});
System.register('lib/src/mod/effects/MOD_JUMP_TO_PATTERN.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_JUMP_TO_PATTERN;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_JUMP_TO_PATTERN = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState) {
                    playerState.jumpToPattern = param;
                }
            });

            _export('MOD_JUMP_TO_PATTERN', MOD_JUMP_TO_PATTERN);
        }
    };
});
System.register('lib/src/mod/effects/MOD_SAMPLE_OFFSET.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_SAMPLE_OFFSET;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_SAMPLE_OFFSET = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState, period) {
                    mixer.setSamplePosition(chan, param * 256);
                }
            });

            _export('MOD_SAMPLE_OFFSET', MOD_SAMPLE_OFFSET);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PAN.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PAN;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PAN = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState, period) {
                    if (param <= 128) {
                        channelState.panPos.left = (128 - param) / 128;
                        channelState.panPos.right = param / 128;
                    } else if (param == 164) {
                        channelState.panPos.left = 1;
                        channelState.panPos.right = -1;
                    }
                }
            });

            _export('MOD_PAN', MOD_PAN);
        }
    };
});
System.register('lib/src/mod/effects/MOD_TREMOLO.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js', 'lib/src/mod/effects/VIBRATO_TABLE.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, VIBRATO_TABLE, updatePos, lookupVolumeOffset, MOD_TREMOLO;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }, function (_libSrcModEffectsVIBRATO_TABLEJs) {
            VIBRATO_TABLE = _libSrcModEffectsVIBRATO_TABLEJs.VIBRATO_TABLE;
        }],
        execute: function () {
            'use strict';

            updatePos = function updatePos(p) {
                p.pos = (p.pos + p.speed) % 64;
            };

            lookupVolumeOffset = function lookupVolumeOffset(p) {
                return VIBRATO_TABLE[p.waveform & 3][p.pos] * p.depth / 64;
            };

            MOD_TREMOLO = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState, period) {
                    var tremParams = channelState.effectState.tremoloParams || {
                        waveform: 0,
                        pos: 0,
                        depth: 0,
                        speed: 0
                    };
                    if (tremParams.waveform <= 3 && period > 0) {
                        tremParams.pos = 0;
                    }
                    if (param > 0) {
                        var newDepth = param & 15;
                        if (newDepth > 0) {
                            tremParams.depth = newDepth;
                        }
                        var newSpeed = (param & 240) / 16;
                        if (newSpeed > 0) {
                            tremParams.speed = newSpeed;
                        }
                    }
                    channelState.effectState.tremoloParams = tremParams;
                },
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    var tremParams = channelState.effectState.tremoloParams;
                    if (tremParams) {
                        updatePos(tremParams);
                        channelState.volume = channelState.lastVolume + lookupVolumeOffset(tremParams);
                        channelState.volume = Math.round(channelState.volume < 0 ? 0 : channelState.volume > 64 ? 64 : channelState.volume);
                    }
                }
            });

            _export('MOD_TREMOLO', MOD_TREMOLO);
        }
    };
});
System.register('lib/src/mod/effects/MOD_VIBRATO_PLUS_VOL_SLIDE.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js', 'lib/src/mod/effects/MOD_VIBRATO.js', 'lib/src/mod/effects/MOD_VOLUME_SLIDE.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_VIBRATO, MOD_VOLUME_SLIDE, MOD_VIBRATO_PLUS_VOL_SLIDE;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }, function (_libSrcModEffectsMOD_VIBRATOJs) {
            MOD_VIBRATO = _libSrcModEffectsMOD_VIBRATOJs.MOD_VIBRATO;
        }, function (_libSrcModEffectsMOD_VOLUME_SLIDEJs) {
            MOD_VOLUME_SLIDE = _libSrcModEffectsMOD_VOLUME_SLIDEJs.MOD_VOLUME_SLIDE;
        }],
        execute: function () {
            'use strict';

            MOD_VIBRATO_PLUS_VOL_SLIDE = Utils.merge(TEMPLATE_EFFECT, {
                div: function div() {},
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    MOD_VOLUME_SLIDE.tick(mixer, chan, param, playerState, channelState);
                    MOD_VIBRATO.tick(mixer, chan, param, playerState, channelState);
                }
            });

            _export('MOD_VIBRATO_PLUS_VOL_SLIDE', MOD_VIBRATO_PLUS_VOL_SLIDE);
        }
    };
});
System.register('lib/src/mod/effects/MOD_VOLUME_SLIDE.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_VOLUME_SLIDE;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_VOLUME_SLIDE = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState, period) {},
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    var upAmt = (param & 240) / 16,
                        downAmt = param & 15;
                    if (upAmt !== 0 && downAmt !== 0) {
                        downAmt = 0;
                    }
                    channelState.volume += upAmt - downAmt;
                    channelState.volume = channelState.volume < 0 ? 0 : channelState.volume > 64 ? 64 : channelState.volume;
                    channelState.lastVolume = channelState.volume;
                }
            });

            _export('MOD_VOLUME_SLIDE', MOD_VOLUME_SLIDE);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PORTA_PLUS_VOL_SLIDE.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js', 'lib/src/mod/effects/MOD_PORTA_TO_NOTE.js', 'lib/src/mod/effects/MOD_VOLUME_SLIDE.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PORTA_TO_NOTE, MOD_VOLUME_SLIDE, MOD_PORTA_PLUS_VOL_SLIDE;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }, function (_libSrcModEffectsMOD_PORTA_TO_NOTEJs) {
            MOD_PORTA_TO_NOTE = _libSrcModEffectsMOD_PORTA_TO_NOTEJs.MOD_PORTA_TO_NOTE;
        }, function (_libSrcModEffectsMOD_VOLUME_SLIDEJs) {
            MOD_VOLUME_SLIDE = _libSrcModEffectsMOD_VOLUME_SLIDEJs.MOD_VOLUME_SLIDE;
        }],
        execute: function () {
            'use strict';

            MOD_PORTA_PLUS_VOL_SLIDE = Utils.merge(TEMPLATE_EFFECT, {
                // warning - copy pasted from effect #3
                div: function div(mixer, chan, param, playerState, channelState, period) {
                    if (period != 0) {
                        channelState.effectState.portToNoteDestPeriod = period;
                        if (!channelState.effectState.portToNoteSpeed) {
                            channelState.effectState.portToNoteSpeed = 0;
                        }
                    }
                },
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    MOD_PORTA_TO_NOTE.tick(mixer, chan, param, playerState, channelState);
                    MOD_VOLUME_SLIDE.tick(mixer, chan, param, playerState, channelState);
                },
                allowPeriodChange: false
            });

            _export('MOD_PORTA_PLUS_VOL_SLIDE', MOD_PORTA_PLUS_VOL_SLIDE);
        }
    };
});
System.register("lib/src/mod/effects/VIBRATO_TABLE.js", [], function (_export) {
    var VIBRATO_TABLE;
    return {
        setters: [],
        execute: function () {
            "use strict";

            VIBRATO_TABLE = [
            /* Waveform #0: SINE WAVE TABLE ~~~~~~~~.  */
            [0, 24, 49, 74, 97, 120, 141, 161, 180, 197, 212, 224, 235, 244, 250, 253, 255, 253, 250, 244, 235, 224, 212, 197, 180, 161, 141, 120, 97, 74, 49, 24, 0, -24, -49, -74, -97, -120, -141, -161, -180, -197, -212, -224, -235, -244, -250, -253, -255, -253, -250, -244, -235, -224, -212, -197, -180, -161, -141, -120, -97, -74, -49, -24],

            /* Waveform #1: RAMP DOWN:  |`._|`._|`._ */
            [255, 246, 238, 230, 222, 214, 206, 198, 190, 182, 173, 165, 157, 149, 141, 133, 125, 117, 109, 100, 92, 84, 76, 68, 60, 52, 44, 36, 27, 19, 11, 3, -4, -12, -20, -28, -36, -45, -53, -61, -69, -77, -85, -93, -101, -109, -118, -126, -134, -142, -150, -158, -166, -174, -182, -191, -199, -207, -215, -223, -231, -239, -247, -255],

            /*                             _   _
             * Waveform #2: SQUARE WAVE |_| |_| |_
             */
            [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255, -255],

            /* random - obviously not true, but hopefully close enough */
            [81, -123, 63, -138, 153, -84, 208, 97, 160, -195, 173, -94, 162, 30, 34, -135, -102, -82, 24, -141, -167, -137, -232, -229, 224, 145, -212, 181, 60, 64, -55, 36, -26, 46, 120, 163, -132, -16, -208, -87, 179, 122, 244, 91, 179, -175, 202, -207, 168, 191, -241, 236, -192, -146, -185, 12, 6, 81, 214, 151, 196, -10, -95, -155]];

            _export("VIBRATO_TABLE", VIBRATO_TABLE);
        }
    };
});
System.register('lib/src/mod/effects/MOD_VIBRATO.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js', 'lib/src/mod/effects/VIBRATO_TABLE.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, VIBRATO_TABLE, lookupPeriodOffset, updatePos, MOD_VIBRATO;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }, function (_libSrcModEffectsVIBRATO_TABLEJs) {
            VIBRATO_TABLE = _libSrcModEffectsVIBRATO_TABLEJs.VIBRATO_TABLE;
        }],
        execute: function () {
            'use strict';

            lookupPeriodOffset = function lookupPeriodOffset(p) {
                //return ((VIBRATO_TABLE[p.waveform & 0x03][p.pos] * p.depth) / 128);
                return VIBRATO_TABLE[p.waveform & 3][p.pos] * p.depth / 256;
            };

            updatePos = function updatePos(p) {
                p.pos = (p.pos + p.speed) % 64;
            };

            MOD_VIBRATO = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState, period) {
                    var vibParams = channelState.effectState.vibratoParams || {
                        waveform: 0,
                        pos: 0,
                        depth: 0,
                        speed: 0
                    };
                    if (vibParams.waveform <= 3 && period > 0) {
                        vibParams.pos = 0;
                    }
                    if (param > 0) {
                        var newDepth = param & 15;
                        if (newDepth > 0) {
                            vibParams.depth = newDepth;
                        }
                        var newSpeed = (param & 240) / 16;
                        if (newSpeed > 0) {
                            vibParams.speed = newSpeed;
                        }
                    }
                    channelState.effectState.vibratoParams = vibParams;
                },
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    var vibParams = channelState.effectState.vibratoParams;
                    if (vibParams) {
                        updatePos(vibParams);
                        channelState.period = channelState.lastPeriod + lookupPeriodOffset(vibParams) * 4;
                    }
                }

            });

            _export('MOD_VIBRATO', MOD_VIBRATO);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PORTA_TO_NOTE.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PORTA_TO_NOTE;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }],
        execute: function () {
            'use strict';

            MOD_PORTA_TO_NOTE = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState, period) {
                    if (period != 0) {
                        channelState.effectState.portToNoteDestPeriod = period;
                        if (!channelState.effectState.portToNoteSpeed) {
                            channelState.effectState.portToNoteSpeed = 0;
                        }
                        channelState.lastPeriod = period;
                    }
                    if (param != 0) {
                        channelState.effectState.portToNoteSpeed = param * 4;
                    }
                },
                tick: function tick(mixer, chan, param, playerState, channelState) {

                    if (channelState.effectState.portToNoteDestPeriod && channelState.effectState.portToNoteSpeed) {
                        if (channelState.effectState.portToNoteDestPeriod > channelState.period) {
                            channelState.period += channelState.effectState.portToNoteSpeed;
                            if (channelState.period > channelState.effectState.portToNoteDestPeriod) {
                                channelState.period = channelState.effectState.portToNoteDestPeriod;
                                channelState.lastPeriod = channelState.period;
                            }
                        }
                        if (channelState.effectState.portToNoteDestPeriod < channelState.period) {
                            channelState.period -= channelState.effectState.portToNoteSpeed;
                            if (channelState.period < channelState.effectState.portToNoteDestPeriod) {
                                channelState.period = channelState.effectState.portToNoteDestPeriod;
                                channelState.lastPeriod = channelState.period;
                            }
                        }
                    }
                },
                allowPeriodChange: false,
                allowSampleTrigger: false
            });

            _export('MOD_PORTA_TO_NOTE', MOD_PORTA_TO_NOTE);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PORTA_DOWN.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js', 'lib/src/mod/effects/SLIDE_CONFIG.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, SLIDE_CONFIG, MOD_PORTA_DOWN;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }, function (_libSrcModEffectsSLIDE_CONFIGJs) {
            SLIDE_CONFIG = _libSrcModEffectsSLIDE_CONFIGJs.SLIDE_CONFIG;
        }],
        execute: function () {
            'use strict';

            MOD_PORTA_DOWN = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState) {
                    channelState.effectState.portAmt = param * 4;
                },
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    channelState.period += channelState.effectState.portAmt;
                    if (channelState.period > SLIDE_CONFIG.MAX_SLIDE_PERIOD) {
                        channelState.period = SLIDE_CONFIG.MAX_SLIDE_PERIOD;
                    }
                }
            });

            _export('MOD_PORTA_DOWN', MOD_PORTA_DOWN);
        }
    };
});
System.register("lib/src/mod/effects/SLIDE_CONFIG.js", [], function (_export) {
    var SLIDE_CONFIG;
    return {
        setters: [],
        execute: function () {
            "use strict";

            SLIDE_CONFIG = {
                MIN_SLIDE_PERIOD: 54,
                MAX_SLIDE_PERIOD: 1712 * 4
            };

            _export("SLIDE_CONFIG", SLIDE_CONFIG);
        }
    };
});
System.register('lib/src/mod/effects/MOD_PORTA_UP.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js', 'lib/src/mod/effects/SLIDE_CONFIG.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, SLIDE_CONFIG, MOD_PORTA_UP;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }, function (_libSrcModEffectsSLIDE_CONFIGJs) {
            SLIDE_CONFIG = _libSrcModEffectsSLIDE_CONFIGJs.SLIDE_CONFIG;
        }],
        execute: function () {
            'use strict';

            MOD_PORTA_UP = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState) {
                    channelState.effectState.portAmt = param * 4;
                },
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    channelState.period -= channelState.effectState.portAmt;
                    if (channelState.period < SLIDE_CONFIG.MIN_SLIDE_PERIOD) {
                        channelState.period = SLIDE_CONFIG.MIN_SLIDE_PERIOD;
                    }
                }
            });

            _export('MOD_PORTA_UP', MOD_PORTA_UP);
        }
    };
});
System.register('github:gundy/jssynth@master/lib/src/webaudiodriver', ['npm:babel-runtime@5.2.17/helpers/class-call-check'], function (_export) {
    var _classCallCheck, WA_BUF_SIZE, WA_NUM_OUTPUT_CHANNELS, WebAudioDriver;

    return {
        setters: [function (_npmBabelRuntime5217HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5217HelpersClassCallCheck['default'];
        }],
        execute: function () {
            /* */
            'use strict';

            'format es6';

            /* WEB AUDIO OUTPUT SUPPORT */
            WA_BUF_SIZE = 2048;
            WA_NUM_OUTPUT_CHANNELS = 2;

            /**
             * Web Audio ("ScriptProcessorNode") audio output functionality
             * @param mixer A mixer function that gets called periodically to produce new sampled audio data.
             *              mixer provides a single method "mix(sampleRate)" - where sampleRate is, eg. 44100.
             * @param bufferSize the desired size of the output buffer
             * @constructor
             */

            WebAudioDriver = function WebAudioDriver(mixer, bufferSize) {
                _classCallCheck(this, WebAudioDriver);

                var self = this;

                if (window.hasOwnProperty('webkitAudioContext') && !window.hasOwnProperty('AudioContext')) {
                    window.AudioContext = window.webkitAudioContext;
                }

                if (!window.hasOwnProperty('AudioContext')) {
                    throw new Error('Unable to use WebAudioDriver in this browser.');
                }

                this.context = new AudioContext();
                this.node = this.context.createScriptProcessor(bufferSize || WA_BUF_SIZE, 0, WA_NUM_OUTPUT_CHANNELS);

                // array of samples to be written to audio output device
                this.nextSamples = null;
                // offset into nextSamples array that we're currently up to
                this.nextSamplesOffset = 0;

                var processSamples = function processSamples(event) {
                    var outputBuffer = event.outputBuffer;
                    var sampleRate = outputBuffer.sampleRate;
                    var bufferLength = outputBuffer.length;
                    // get output buffers from the AudioProcessingEvent
                    var channelData = [outputBuffer.getChannelData(0), outputBuffer.getChannelData(1)];
                    var i = null;
                    var outputOfs = 0;

                    // bufferLength is the amount of data that the audio system is expecting
                    // - we need to keep looping until we've filled it all up.
                    while (outputOfs < bufferLength) {

                        // if we're out of samples the simply call the mixer to create some more
                        if (!self.nextSamples) {
                            self.nextSamples = mixer.mix(sampleRate);
                            self.nextSamplesOffset = 0;
                        }

                        // fill the output buffers with stuff from the nextSamples buffer
                        // (at least until we fill the output buffer, or drain the nextSamples array)
                        for (var chan = 0; chan < WA_NUM_OUTPUT_CHANNELS; chan++) {
                            for (i = 0; self.nextSamplesOffset + i < self.nextSamples.bufferSize && i + outputOfs < bufferLength; i++) {
                                channelData[chan][outputOfs + i] = self.nextSamples.output[chan][self.nextSamplesOffset + i];
                            }
                        }
                        outputOfs += i;
                        self.nextSamplesOffset += i;

                        // if we've emptied the nextSamples array, then null it out so it will get
                        // replenished from the mixer next time around the loop.
                        if (self.nextSamplesOffset >= self.nextSamples.bufferSize) {
                            self.nextSamples = null;
                        }
                    }
                };

                /**
                 * Start the audio output
                 */
                this.start = function () {
                    this.node.connect(self.context.destination);
                    this.node.onaudioprocess = processSamples;
                };

                /**
                 * Stop/pause the audio output
                 */
                this.stop = function () {
                    this.node.disconnect();
                    this.node.onaudioprocess = undefined;
                };
            };

            _export('WebAudioDriver', WebAudioDriver);
        }
    };
});
System.register("github:gundy/jssynth@master/lib/src/instrument", ["npm:babel-runtime@5.2.17/helpers/class-call-check", "github:gundy/jssynth@master/lib/src/utils"], function (_export) {
    var _classCallCheck, Utils, DEFAULT_INSTRUMENT_METADATA, Instrument;

    return {
        setters: [function (_npmBabelRuntime5217HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5217HelpersClassCallCheck["default"];
        }, function (_githubGundyJssynthMasterLibSrcUtils) {
            Utils = _githubGundyJssynthMasterLibSrcUtils.Utils;
        }],
        execute: function () {
            "use strict";

            /* */
            "use strict";

            DEFAULT_INSTRUMENT_METADATA = {
                numSamples: 1,
                name: "Default Instrument",
                noteToSampleMap: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                volumeType: 0, // bit 0: On; 1: Sustain; 2: Loop
                volumeEnvelope: [],
                numVolumePoints: 0,
                volumeSustainPoint: 0,
                volumeLoopStartPoint: 0,
                volumeLoopEndPoint: 0,

                panningType: 0, // bit 0: On; 1: Sustain; 2: Loop
                panningEnvelope: [],
                numPanningPoints: 0,
                panningSustainPoint: 0,
                panningLoopStartPoint: 0,
                panningLoopEndPoint: 0,

                vibratoType: 0, // ???
                vibratoSweep: 0,
                vibratoDepth: 0,
                vibratoRate: 0,

                volumeFadeout: 0
            };

            Instrument = function Instrument(metadata, samples) {
                _classCallCheck(this, Instrument);

                this.metadata = Utils.merge(DEFAULT_INSTRUMENT_METADATA, metadata);
                this.samples = samples;
            };

            _export("Instrument", Instrument);
        }
    };
});
System.register("github:gundy/jssynth@master/lib/src/sample", ["npm:babel-runtime@5.2.17/helpers/create-class", "npm:babel-runtime@5.2.17/helpers/class-call-check", "github:gundy/jssynth@master/lib/src/utils"], function (_export) {
    var _createClass, _classCallCheck, Utils, DEFAULT_SAMPLE_METADATA, Sample;

    return {
        setters: [function (_npmBabelRuntime5217HelpersCreateClass) {
            _createClass = _npmBabelRuntime5217HelpersCreateClass["default"];
        }, function (_npmBabelRuntime5217HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5217HelpersClassCallCheck["default"];
        }, function (_githubGundyJssynthMasterLibSrcUtils) {
            Utils = _githubGundyJssynthMasterLibSrcUtils.Utils;
        }],
        execute: function () {
            "use strict";

            /* */
            "use strict";

            DEFAULT_SAMPLE_METADATA = {
                name: "",
                bits: 8,
                channels: 1,
                littleEndian: true,
                deltaEncoding: false,
                signed: true,
                sampleRate: 8000,
                representedFreq: 440, /* the frequency that this sample will produce if played at it's sample rate */
                pitchOfs: 1,
                repeatType: "NON_REPEATING",
                volume: 64,
                repeatStart: 0,
                repeatEnd: 0,
                sampleLength: 0
            };

            /*
             * Convert a set of raw (byte-wise) samples into arrays of doubles
             *
             * metadata important to parsing samples is of the form:
             * {
             *   "bits":            8|16|24,
             *   "channels":        1|2,
             *   "sampleLength":    number of sample points in the sample,
             *   "littleEndian":    boolean -> true if samples are stored in little endian format,
             *   "signed":          boolean -> true if samples are stored in signed format (-127..128 instead of 0..255)
             *   "deltaEncoding":   boolean -> true if each new sample is stored as a delta from previous value
             * }
             *
             * defaults are: bits=8, channels=1
             *
             * metadata describes the content of samples.
             *
             * samples are read
             *  0..num_samples
             *    0..num_channels
             *      0..bytes_per_sample
             */

            Sample = (function () {
                function Sample(sampleData, metadata, offset) {
                    _classCallCheck(this, Sample);

                    this.metadata = Utils.merge(DEFAULT_SAMPLE_METADATA, metadata);

                    if (typeof sampleData === "function") {
                        this.data = sampleData();
                    } else {
                        this.data = Sample.convertSamplesBytesToDoubles(sampleData, metadata, offset);
                    }

                    /*
                     this looks a little weird, but we're just extending the end of the sample if
                     it's set to repeat, so that interpolation doesn't get confused across repeat
                     boundaries.
                     */
                    if (this.metadata.repeatType !== "NON_REPEATING") {
                        for (var c = 0; c < this.data.length; c++) {
                            this.data[c][metadata.repeatEnd + 1] = this.data[c][metadata.repeatEnd];
                        }
                    }
                }

                _createClass(Sample, null, [{
                    key: "convertSamplesBytesToDoubles",

                    /*
                     * Convert a set of raw (byte-wise) samples into arrays of doubles
                     */
                    value: function convertSamplesBytesToDoubles(samples, meta, offset) {
                        var startOfs = offset || 0;
                        var channelData = [];
                        var rawData = [];
                        var chan;

                        for (chan = 0; chan < meta.channels; chan++) {
                            channelData[chan] = [];
                            rawData[chan] = [];
                        }
                        if (meta.bits % 8 !== 0 || meta.bits > 24) {
                            throw new Error("can only read 8, 16 or 24-bit samples");
                        }
                        var bytesPerSample = meta.bits / 8;
                        var bytesPerSamplePeriod = bytesPerSample * meta.channels;
                        var periodsToRead = meta.sampleLength;
                        for (var i = 0; i < periodsToRead; i++) {
                            var ofs = bytesPerSamplePeriod * i;
                            for (chan = 0; chan < meta.channels; chan++) {
                                var chanOfs = ofs + chan * bytesPerSample;
                                var startBytePos = chanOfs + (meta.littleEndian ? bytesPerSample - 1 : 0);
                                var endBytePos = chanOfs + (meta.littleEndian ? -1 : bytesPerSample);
                                var bytePosDelta = meta.littleEndian ? -1 : 1;
                                var data = 0;
                                var scale = 0.5;
                                var mask = 255;
                                for (var bytePos = startBytePos; bytePos !== endBytePos; bytePos += bytePosDelta) {
                                    data = data * 256 + samples.charCodeAt(startOfs + bytePos);
                                    scale = scale * 256;
                                    mask = mask * 256 + 255;
                                }
                                if (meta.signed) {
                                    /* samp XOR 0x8000 & 0xffff converts from signed to unsigned */
                                    data = (data ^ scale) & mask;
                                }
                                if (meta.deltaEncoding) {
                                    var previousVal = i == 0 ? 0 : rawData[chan][i - 1];
                                    rawData[chan][i] = previousVal + ((data ^ scale) & mask) & 255;
                                    channelData[chan][i] = (((rawData[chan][i] ^ scale) & mask) - scale) / scale;
                                } else {
                                    data = (data - scale) / scale;
                                    channelData[chan][i] = data;
                                }
                            }
                        }
                        return channelData;
                    }
                }]);

                return Sample;
            })();

            _export("Sample", Sample);
        }
    };
});
System.register("github:gundy/jssynth@master/lib/src/utils", ["npm:babel-runtime@5.2.17/helpers/create-class", "npm:babel-runtime@5.2.17/helpers/class-call-check"], function (_export) {
    var _createClass, _classCallCheck, Utils;

    return {
        setters: [function (_npmBabelRuntime5217HelpersCreateClass) {
            _createClass = _npmBabelRuntime5217HelpersCreateClass["default"];
        }, function (_npmBabelRuntime5217HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5217HelpersClassCallCheck["default"];
        }],
        execute: function () {
            /* */
            "use strict";

            "format es6";

            Utils = (function () {
                function Utils() {
                    _classCallCheck(this, Utils);
                }

                _createClass(Utils, null, [{
                    key: "clone",

                    /**
                     * Perform a shallow clone of a JS object
                     * @param obj
                     * @returns {{}}
                     */
                    value: function clone(obj) {
                        var newObj = {};

                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                newObj[key] = obj[key];
                            }
                        }
                        return newObj;
                    }
                }, {
                    key: "merge",

                    /**
                     * Take a clone of existingObj and merge new properties into the clone
                     * @param existingObj
                     * @param toMerge
                     * @returns {{}}
                     */
                    value: function merge(existingObj, toMerge) {
                        var newObj = Utils.clone(existingObj);

                        if (toMerge !== undefined && toMerge !== null) {
                            for (var key in toMerge) {
                                if (toMerge.hasOwnProperty(key)) {
                                    newObj[key] = toMerge[key];
                                }
                            }
                        }
                        return newObj;
                    }
                }, {
                    key: "makeArrayOf",

                    /**
                     * Make an array consisting of length copies of value
                     * @param value
                     * @param length
                     * @returns {Array}
                     */
                    value: function makeArrayOf(value, length) {
                        var arr = [],
                            i = length;
                        while (i--) {
                            arr[i] = value;
                        }
                        return arr;
                    }
                }]);

                return Utils;
            })();

            _export("Utils", Utils);
        }
    };
});
System.register('github:gundy/jssynth@master/lib/src/mixer', ['npm:babel-runtime@5.2.17/helpers/class-call-check', 'npm:babel-runtime@5.2.17/helpers/create-class', 'github:gundy/jssynth@master/lib/src/utils'], function (_export) {
    var _classCallCheck, _createClass, Utils, DEFAULT_GLOBAL_STATE, DEFAULT_CHANNEL_STATE, STEP_FUNCS, MixResult, Mixer;

    return {
        setters: [function (_npmBabelRuntime5217HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5217HelpersClassCallCheck['default'];
        }, function (_npmBabelRuntime5217HelpersCreateClass) {
            _createClass = _npmBabelRuntime5217HelpersCreateClass['default'];
        }, function (_githubGundyJssynthMasterLibSrcUtils) {
            Utils = _githubGundyJssynthMasterLibSrcUtils.Utils;
        }],
        execute: function () {
            'use strict';

            /* */
            'format es6';

            DEFAULT_GLOBAL_STATE = {
                numChannels: 8,
                volume: 64,
                secondsPerMix: 0.1,
                filters: null
            };
            DEFAULT_CHANNEL_STATE = {
                panPos: 0, /* -1 = full left, +1 = full right */
                playbackFreqHz: 0,
                sample: undefined,
                samplePosition: -1,
                volume: 64,
                enabled: true
            };
            STEP_FUNCS = { /* step through the sample, key is "repeatType" flag */
                'REP_NORMAL': function REP_NORMAL(samplePos, samplePosStep, repEnd, repLen) {
                    var spTmp = samplePos;
                    spTmp += samplePosStep;
                    while (spTmp >= repEnd) {
                        spTmp -= repLen;
                    }
                    return spTmp;
                },
                'NON_REPEATING': function NON_REPEATING(samplePos, samplePosStep) {
                    return samplePos + samplePosStep;
                }
            };

            MixResult = function MixResult(bufferSize, output) {
                _classCallCheck(this, MixResult);

                this.bufferSize = bufferSize;
                this.output = output;
            };

            Mixer = (function () {
                function Mixer(globalState, defaultChannelState) {
                    _classCallCheck(this, Mixer);

                    this.globalState = Utils.merge(DEFAULT_GLOBAL_STATE, globalState);
                    this.preMixCallback = null;
                    this.preMixObject = null;
                    this.postMixCallback = null;
                    this.postMixObject = null;
                    this.channelState = [];
                    var dcs = Utils.merge(DEFAULT_CHANNEL_STATE, defaultChannelState);
                    for (var chan = 0; chan < this.globalState.numChannels; chan++) {
                        this.channelState[chan] = Utils.clone(dcs);
                    }
                }

                _createClass(Mixer, [{
                    key: 'setPreMixCallback',

                    /**
                     * Set the callback to be called prior to mixing the next batch of samples.
                     *
                     * Note: sample mixing is driven by the audio event loop -
                     *
                     * @param preMixCallback callback function to provide notification toolbar
                     * @param preMixObject object that will receive the notification (sets this)
                     */
                    value: function setPreMixCallback(preMixCallback, preMixObject) {
                        this.preMixCallback = preMixCallback;
                        this.preMixObject = preMixObject;
                    }
                }, {
                    key: 'setPostMixCallback',

                    /**
                     * Set the callback to be called after mixing the next batch of samples
                     * @param postMixCallback
                     * @param postMixObject
                     */
                    value: function setPostMixCallback(postMixCallback, postMixObject) {
                        this.postMixCallback = postMixCallback;
                        this.postMixObject = postMixObject;
                    }
                }, {
                    key: 'setGlobalVolume',
                    value: function setGlobalVolume(vol) {
                        this.globalState.volume = vol;
                    }
                }, {
                    key: 'setSecondsPerMix',

                    /**
                     * Set the number of seconds worth of data to return from each mix() call
                     * @param secondsPerMix
                     */
                    value: function setSecondsPerMix(secondsPerMix) {
                        this.globalState.secondsPerMix = secondsPerMix;
                    }
                }, {
                    key: 'triggerSample',

                    /**
                     * Trigger a sample to start playing on a given channel
                     * @param channel channel to play the sample on
                     * @param sample sample to play
                     * @param freqHz frequency (absolute) to play the sample at
                     */
                    value: function triggerSample(channel, sample, freqHz) {
                        this.channelState[channel].sample = sample;
                        this.channelState[channel].playbackFreqHz = freqHz;
                        this.channelState[channel].samplePosition = 0;
                        this.channelState[channel].volume = sample.metadata.volume;
                    }
                }, {
                    key: 'enableChannels',

                    /**
                     * @param channels a list of channels to enable
                     */
                    value: function enableChannels(channels) {
                        for (var i = 0; i < channels.length; i++) {
                            this.channelState[channels[i]].enabled = true;
                        }
                    }
                }, {
                    key: 'disableChannels',

                    /**
                     * @param channels a list of channels to disable
                     */
                    value: function disableChannels(channels) {
                        for (var i = 0; i < channels.length; i++) {
                            this.channelState[channels[i]].enabled = false;
                        }
                    }
                }, {
                    key: 'setSample',

                    /**
                     * Set sample without updating any other params
                     * @param channel channel to play the sample on
                     * @param sample sample to play
                     * @param freqHz frequency (absolute) to play the sample at
                     */
                    value: function setSample(channel, sample) {
                        this.channelState[channel].sample = sample;
                    }
                }, {
                    key: 'setSamplePosition',

                    /**
                     * Set the current position/offset of the sample playing on a given channel
                     * @param channel
                     * @param offset
                     */
                    value: function setSamplePosition(channel, offset) {
                        var sample = this.channelState[channel].sample;
                        if (sample) {
                            var length = sample.metadata.sampleLength;
                            if (sample.metadata.repeatType !== 'NON_REPEATING') {
                                var repStart = sample.metadata.repeatStart;
                                var repEnd = sample.metadata.repeatEnd;
                                var repLen = repEnd - repStart;
                                while (offset > length) {
                                    offset -= repLen;
                                }
                            }
                            if (offset < length) {
                                this.channelState[channel].samplePosition = offset;
                            } else {
                                this.channelState[channel].samplePosition = -1;
                            }
                        }
                    }
                }, {
                    key: 'addToSamplePosition',

                    /**
                     * Add a phase offset to the sample playing on a given channel
                     * @param channel
                     * @param offset
                     */
                    value: function addToSamplePosition(channel, offset) {
                        var sample = this.channelState[channel].sample;
                        if (sample && this.channelState[channel].samplePosition >= 0) {
                            this.setSamplePosition(channel, this.channelState[channel].samplePosition + offset);
                        }
                    }
                }, {
                    key: 'setFrequency',

                    /**
                     * Change the frequency of a sample playing on a given channel
                     * @param channel
                     * @param freqHz
                     */
                    value: function setFrequency(channel, freqHz) {
                        this.channelState[channel].playbackFreqHz = freqHz;
                    }
                }, {
                    key: 'setVolume',

                    /**
                     * Change the volume of a sample playing on a given channel
                     * @param channel
                     * @param vol
                     */
                    value: function setVolume(channel, vol) {
                        this.channelState[channel].volume = vol;
                    }
                }, {
                    key: 'setPanPosition',

                    /**
                     * Change the L/R mix for a given channel (-1 = full left, +1 = full right)
                     * @param channel
                     * @param panPos
                     */
                    value: function setPanPosition(channel, panPos) {
                        this.channelState[channel].panPos = panPos;
                    }
                }, {
                    key: 'cut',

                    /**
                     * (Immediately) cut playback of a sample playing on a given channel
                     * @param channel
                     */
                    value: function cut(channel) {
                        this.channelState[channel].samplePosition = -1;
                        this.channelState[channel].sample = undefined;
                    }
                }, {
                    key: 'setFilters',

                    /**
                     * Set globally applied filters (array, 0 = left filter, 1 = right filter)
                     * @param filters
                     */
                    value: function setFilters(filters) {
                        if (filters) {
                            this.globalState.filters = filters;
                        } else {
                            this.globalState.filters = null;
                        }
                    }
                }, {
                    key: 'calculatePanMatrix',

                    /* TODO; not sure if things need to get this complicated for now */
                    value: function calculatePanMatrix(pp) {
                        if (pp >= -1 && pp <= 1) {
                            var pp = (pp + 1) / 2; /* shift values from -1 to 1, to be in the range 0..1 (left -> right) */
                            return {
                                ll: 1 - pp, /* left channel, % left mix */
                                lr: 0, /* left channel, % right mix - TODO */
                                rl: 0, /* right channel, % left mix */
                                rr: pp /* right channel, % right mix - TODO */
                            };
                        } else {
                            return { ll: 1, rr: -1 }; /* surround */
                        }
                    }
                }, {
                    key: 'mix',
                    value: function mix(sampleRate) {
                        var self = this;
                        if (this.preMixCallback) {
                            this.preMixCallback.call(this.preMixObject, this, sampleRate);
                        }
                        var i = 0,
                            chan = 0;
                        var output = [];
                        var numSamples = Math.floor(sampleRate * this.globalState.secondsPerMix);
                        output[0] = Utils.makeArrayOf(0, numSamples); /* left */
                        output[1] = Utils.makeArrayOf(0, numSamples); /* right */
                        //output[0] = [];
                        //output[1] = [];
                        var numChannels = this.globalState.numChannels;
                        var globalVolume = this.globalState.volume;
                        for (chan = 0; chan < numChannels; chan++) {
                            var state = this.channelState[chan];
                            if (!state.enabled) {
                                break;
                            }

                            var panPos = this.calculatePanMatrix(state.panPos);
                            var sample = state.sample;

                            var channelVolume = state.volume;
                            var samplePos = state.samplePosition;
                            var samplePosStep = state.playbackFreqHz / sampleRate;
                            var scale = 1 / (numChannels / 2) * (globalVolume / 64) * (channelVolume / 64);
                            var leftScale = scale * panPos.ll;
                            var rightScale = scale * panPos.rr;
                            if (sample && sample.data && samplePos >= 0 && samplePosStep > 0) {
                                var representedFreq = sample.metadata.representedFreq;
                                var sampleSampleRate = sample.metadata.sampleRate;
                                samplePosStep *= sampleSampleRate / representedFreq;

                                var leftSampleData = sample.data[0];
                                var rightSampleData = sample.data[1] || sample.data[0]; /* mix in mono if that's all we've got */
                                var sampleLength = sample.metadata.sampleLength;
                                var repStart = sample.metadata.repeatStart;
                                var repEnd = sample.metadata.repeatEnd;
                                var repLen = repEnd - repStart;
                                var stepFunc = STEP_FUNCS[sample.metadata.repeatType];
                                for (i = 0; i < numSamples && samplePos < sampleLength; i++) {
                                    output[0][i] += leftSampleData[Math.floor(samplePos)] * leftScale;
                                    output[1][i] += rightSampleData[Math.floor(samplePos)] * rightScale;
                                    samplePos = stepFunc(samplePos, samplePosStep, repEnd, repLen);
                                }
                            }
                            state.samplePosition = samplePos;
                        }
                        if (this.globalState.filters) {
                            var filters = this.globalState.filters;
                            for (i = 0; i < numSamples; i++) {
                                output[0][i] = filters[0].next(output[0][i]);
                                output[1][i] = filters[1].next(output[1][i]);
                            }
                        }
                        var mixResult = new MixResult(numSamples, output);
                        if (this.postMixCallback) {
                            window.setTimeout(function () {
                                self.postMixCallback.call(self.postMixObject, mixResult);
                            }, 0);
                        }
                        return mixResult;
                    }
                }]);

                return Mixer;
            })();

            _export('Mixer', Mixer);
        }
    };
});
System.register('github:gundy/jssynth@master/lib/jssynth', ['github:gundy/jssynth@master/lib/src/mixer', 'github:gundy/jssynth@master/lib/src/sample', 'github:gundy/jssynth@master/lib/src/instrument', 'github:gundy/jssynth@master/lib/src/webaudiodriver'], function (_export) {
    var Mixer, Sample, Instrument, WebAudioDriver;
    return {
        setters: [function (_githubGundyJssynthMasterLibSrcMixer) {
            Mixer = _githubGundyJssynthMasterLibSrcMixer.Mixer;
        }, function (_githubGundyJssynthMasterLibSrcSample) {
            Sample = _githubGundyJssynthMasterLibSrcSample.Sample;
        }, function (_githubGundyJssynthMasterLibSrcInstrument) {
            Instrument = _githubGundyJssynthMasterLibSrcInstrument.Instrument;
        }, function (_githubGundyJssynthMasterLibSrcWebaudiodriver) {
            WebAudioDriver = _githubGundyJssynthMasterLibSrcWebaudiodriver.WebAudioDriver;
        }],
        execute: function () {
            /* */
            'use strict';

            _export('Mixer', Mixer);

            _export('Sample', Sample);

            _export('Instrument', Instrument);

            _export('WebAudioDriver', WebAudioDriver);
        }
    };
});
System.register("github:gundy/jssynth@master", ["github:gundy/jssynth@master/lib/jssynth"], function (_export) {
  return {
    setters: [function (_githubGundyJssynthMasterLibJssynth) {
      for (var _key in _githubGundyJssynthMasterLibJssynth) {
        _export(_key, _githubGundyJssynthMasterLibJssynth[_key]);
      }

      _export("default", _githubGundyJssynthMasterLibJssynth["default"]);
    }],
    execute: function () {
      "use strict";
    }
  };
});
System.register('lib/src/mod/effects/MOD_ARPEGGIO.js', ['github:gundy/jssynth@master', 'lib/src/mod/effects/TEMPLATE_EFFECT.js', 'lib/src/mod/MOD_PERIOD_TABLE.js'], function (_export) {
    var Utils, TEMPLATE_EFFECT, MOD_PERIOD_TABLE, MOD_ARPEGGIO;
    return {
        setters: [function (_githubGundyJssynthMaster) {
            Utils = _githubGundyJssynthMaster.Utils;
        }, function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }, function (_libSrcModMOD_PERIOD_TABLEJs) {
            MOD_PERIOD_TABLE = _libSrcModMOD_PERIOD_TABLEJs.MOD_PERIOD_TABLE;
        }],
        execute: function () {
            'use strict';

            'use strict';

            MOD_ARPEGGIO = Utils.merge(TEMPLATE_EFFECT, {
                div: function div(mixer, chan, param, playerState, channelState) {
                    var currentNote = MOD_PERIOD_TABLE.getNote(channelState.lastPeriod);
                    if (param != 0) {
                        if (currentNote < 0 || currentNote > 108) {
                            channelState.effectState.arpTable = [channelState.period, channelState.period, channelState.period];
                        } else {
                            var a = (param & 240) / 16;
                            var b = param & 15;
                            channelState.effectState.arpTable = [MOD_PERIOD_TABLE.getPeriod(currentNote), MOD_PERIOD_TABLE.getPeriod(currentNote + a), MOD_PERIOD_TABLE.getPeriod(currentNote + b)];
                            channelState.effectState.arpPos = 0;
                        }
                    }
                },
                tick: function tick(mixer, chan, param, playerState, channelState) {
                    if (param != 0) {
                        channelState.effectState.arpPos = (channelState.effectState.arpPos + 1) % 3;
                        channelState.period = channelState.effectState.arpTable[channelState.effectState.arpPos];
                    }
                }
            });

            _export('MOD_ARPEGGIO', MOD_ARPEGGIO);
        }
    };
});
System.register("lib/src/mod/effects/TEMPLATE_EFFECT.js", [], function (_export) {
    var TEMPLATE_EFFECT;
    return {
        setters: [],
        execute: function () {
            // a prototypical effect - effectively does nothing
            // allows samples to be triggered
            // allows volume changes
            // allows note period changes to occur
            "use strict";

            TEMPLATE_EFFECT = {
                div: function div(param, playerState, channelState, period) {},
                tick: function tick(param, playerState, channelState, period) {},
                allowSampleTrigger: true,
                allowVolumeChange: true,
                allowPeriodChange: true
            };

            _export("TEMPLATE_EFFECT", TEMPLATE_EFFECT);
        }
    };
});
System.register('lib/src/mod/effects/MOD_EFFECT_MAP.js', ['lib/src/mod/effects/TEMPLATE_EFFECT.js', 'lib/src/mod/effects/MOD_ARPEGGIO.js', 'lib/src/mod/effects/MOD_PORTA_UP.js', 'lib/src/mod/effects/MOD_PORTA_DOWN.js', 'lib/src/mod/effects/MOD_PORTA_TO_NOTE.js', 'lib/src/mod/effects/MOD_VIBRATO.js', 'lib/src/mod/effects/MOD_PORTA_PLUS_VOL_SLIDE.js', 'lib/src/mod/effects/MOD_VIBRATO_PLUS_VOL_SLIDE.js', 'lib/src/mod/effects/MOD_TREMOLO.js', 'lib/src/mod/effects/MOD_PAN.js', 'lib/src/mod/effects/MOD_SAMPLE_OFFSET.js', 'lib/src/mod/effects/MOD_VOLUME_SLIDE.js', 'lib/src/mod/effects/MOD_JUMP_TO_PATTERN.js', 'lib/src/mod/effects/MOD_SET_VOLUME.js', 'lib/src/mod/effects/MOD_PATTERN_BREAK.js', 'lib/src/mod/effects/MOD_PROTRACKER.js', 'lib/src/mod/effects/MOD_SET_SPEED.js'], function (_export) {
    var TEMPLATE_EFFECT, MOD_ARPEGGIO, MOD_PORTA_UP, MOD_PORTA_DOWN, MOD_PORTA_TO_NOTE, MOD_VIBRATO, MOD_PORTA_PLUS_VOL_SLIDE, MOD_VIBRATO_PLUS_VOL_SLIDE, MOD_TREMOLO, MOD_PAN, MOD_SAMPLE_OFFSET, MOD_VOLUME_SLIDE, MOD_JUMP_TO_PATTERN, MOD_SET_VOLUME, MOD_PATTERN_BREAK, MOD_PROTRACKER, MOD_SET_SPEED, MOD_EFFECT_MAP;
    return {
        setters: [function (_libSrcModEffectsTEMPLATE_EFFECTJs) {
            TEMPLATE_EFFECT = _libSrcModEffectsTEMPLATE_EFFECTJs.TEMPLATE_EFFECT;
        }, function (_libSrcModEffectsMOD_ARPEGGIOJs) {
            MOD_ARPEGGIO = _libSrcModEffectsMOD_ARPEGGIOJs.MOD_ARPEGGIO;
        }, function (_libSrcModEffectsMOD_PORTA_UPJs) {
            MOD_PORTA_UP = _libSrcModEffectsMOD_PORTA_UPJs.MOD_PORTA_UP;
        }, function (_libSrcModEffectsMOD_PORTA_DOWNJs) {
            MOD_PORTA_DOWN = _libSrcModEffectsMOD_PORTA_DOWNJs.MOD_PORTA_DOWN;
        }, function (_libSrcModEffectsMOD_PORTA_TO_NOTEJs) {
            MOD_PORTA_TO_NOTE = _libSrcModEffectsMOD_PORTA_TO_NOTEJs.MOD_PORTA_TO_NOTE;
        }, function (_libSrcModEffectsMOD_VIBRATOJs) {
            MOD_VIBRATO = _libSrcModEffectsMOD_VIBRATOJs.MOD_VIBRATO;
        }, function (_libSrcModEffectsMOD_PORTA_PLUS_VOL_SLIDEJs) {
            MOD_PORTA_PLUS_VOL_SLIDE = _libSrcModEffectsMOD_PORTA_PLUS_VOL_SLIDEJs.MOD_PORTA_PLUS_VOL_SLIDE;
        }, function (_libSrcModEffectsMOD_VIBRATO_PLUS_VOL_SLIDEJs) {
            MOD_VIBRATO_PLUS_VOL_SLIDE = _libSrcModEffectsMOD_VIBRATO_PLUS_VOL_SLIDEJs.MOD_VIBRATO_PLUS_VOL_SLIDE;
        }, function (_libSrcModEffectsMOD_TREMOLOJs) {
            MOD_TREMOLO = _libSrcModEffectsMOD_TREMOLOJs.MOD_TREMOLO;
        }, function (_libSrcModEffectsMOD_PANJs) {
            MOD_PAN = _libSrcModEffectsMOD_PANJs.MOD_PAN;
        }, function (_libSrcModEffectsMOD_SAMPLE_OFFSETJs) {
            MOD_SAMPLE_OFFSET = _libSrcModEffectsMOD_SAMPLE_OFFSETJs.MOD_SAMPLE_OFFSET;
        }, function (_libSrcModEffectsMOD_VOLUME_SLIDEJs) {
            MOD_VOLUME_SLIDE = _libSrcModEffectsMOD_VOLUME_SLIDEJs.MOD_VOLUME_SLIDE;
        }, function (_libSrcModEffectsMOD_JUMP_TO_PATTERNJs) {
            MOD_JUMP_TO_PATTERN = _libSrcModEffectsMOD_JUMP_TO_PATTERNJs.MOD_JUMP_TO_PATTERN;
        }, function (_libSrcModEffectsMOD_SET_VOLUMEJs) {
            MOD_SET_VOLUME = _libSrcModEffectsMOD_SET_VOLUMEJs.MOD_SET_VOLUME;
        }, function (_libSrcModEffectsMOD_PATTERN_BREAKJs) {
            MOD_PATTERN_BREAK = _libSrcModEffectsMOD_PATTERN_BREAKJs.MOD_PATTERN_BREAK;
        }, function (_libSrcModEffectsMOD_PROTRACKERJs) {
            MOD_PROTRACKER = _libSrcModEffectsMOD_PROTRACKERJs.MOD_PROTRACKER;
        }, function (_libSrcModEffectsMOD_SET_SPEEDJs) {
            MOD_SET_SPEED = _libSrcModEffectsMOD_SET_SPEEDJs.MOD_SET_SPEED;
        }],
        execute: function () {
            'use strict';

            MOD_EFFECT_MAP = {
                0: { code: '0', effect: MOD_ARPEGGIO },
                1: { code: '1', effect: MOD_PORTA_UP },
                2: { code: '2', effect: MOD_PORTA_DOWN },
                3: { code: '3', effect: MOD_PORTA_TO_NOTE },
                4: { code: '4', effect: MOD_VIBRATO },
                5: { code: '5', effect: MOD_PORTA_PLUS_VOL_SLIDE },
                6: { code: '6', effect: MOD_VIBRATO_PLUS_VOL_SLIDE },
                7: { code: '7', effect: MOD_TREMOLO },
                8: { code: '8', effect: MOD_PAN },
                9: { code: '9', effect: MOD_SAMPLE_OFFSET },
                10: { code: 'a', effect: MOD_VOLUME_SLIDE },
                11: { code: 'b', effect: MOD_JUMP_TO_PATTERN },
                12: { code: 'c', effect: MOD_SET_VOLUME },
                13: { code: 'd', effect: MOD_PATTERN_BREAK },
                14: { code: 'e', effect: MOD_PROTRACKER },
                15: { code: 'f', effect: MOD_SET_SPEED },
                16: { code: 'g', effect: TEMPLATE_EFFECT },
                17: { code: 'h', effect: TEMPLATE_EFFECT },
                18: { code: 'i', effect: TEMPLATE_EFFECT },
                19: { code: 'j', effect: TEMPLATE_EFFECT },
                20: { code: 'k', effect: TEMPLATE_EFFECT },
                21: { code: 'l', effect: TEMPLATE_EFFECT },
                22: { code: 'm', effect: TEMPLATE_EFFECT },
                23: { code: 'n', effect: TEMPLATE_EFFECT },
                24: { code: 'o', effect: TEMPLATE_EFFECT },
                25: { code: 'p', effect: TEMPLATE_EFFECT },
                26: { code: 'q', effect: TEMPLATE_EFFECT },
                27: { code: 'r', effect: TEMPLATE_EFFECT },
                28: { code: 's', effect: TEMPLATE_EFFECT },
                29: { code: 't', effect: TEMPLATE_EFFECT },
                30: { code: 'u', effect: TEMPLATE_EFFECT },
                31: { code: 'v', effect: TEMPLATE_EFFECT },
                32: { code: 'w', effect: TEMPLATE_EFFECT },
                33: { code: 'x', effect: TEMPLATE_EFFECT },
                34: { code: 'y', effect: TEMPLATE_EFFECT },
                35: { code: 'z', effect: TEMPLATE_EFFECT }
            };

            _export('MOD_EFFECT_MAP', MOD_EFFECT_MAP);
        }
    };
});
System.register('lib/src/mod/MODLoader.js', ['npm:babel-runtime@5.2.17/helpers/create-class', 'npm:babel-runtime@5.2.17/helpers/class-call-check', 'lib/src/mod/effects/MOD_EFFECT_MAP.js', 'lib/src/mod/MOD_PERIOD_TABLE.js', 'lib/src/mod/MOD_FINETUNE_TABLE.js', 'github:gundy/jssynth@master'], function (_export) {
    var _createClass, _classCallCheck, MOD_EFFECT_MAP, MOD_PERIOD_TABLE, MOD_FINETUNE_TABLE, Sample, Instrument, MODTypes, EIGHTH_SEMITONE_MULTIPLIER, MODLoader;

    return {
        setters: [function (_npmBabelRuntime5217HelpersCreateClass) {
            _createClass = _npmBabelRuntime5217HelpersCreateClass['default'];
        }, function (_npmBabelRuntime5217HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5217HelpersClassCallCheck['default'];
        }, function (_libSrcModEffectsMOD_EFFECT_MAPJs) {
            MOD_EFFECT_MAP = _libSrcModEffectsMOD_EFFECT_MAPJs.MOD_EFFECT_MAP;
        }, function (_libSrcModMOD_PERIOD_TABLEJs) {
            MOD_PERIOD_TABLE = _libSrcModMOD_PERIOD_TABLEJs.MOD_PERIOD_TABLE;
        }, function (_libSrcModMOD_FINETUNE_TABLEJs) {
            MOD_FINETUNE_TABLE = _libSrcModMOD_FINETUNE_TABLEJs.MOD_FINETUNE_TABLE;
        }, function (_githubGundyJssynthMaster) {
            Sample = _githubGundyJssynthMaster.Sample;
            Instrument = _githubGundyJssynthMaster.Instrument;
        }],
        execute: function () {
            'use strict';

            'use strict';

            /* =========== MOD reader ================= */
            MODTypes = {
                'M.K.': { key: 'M.K.', channels: 4, instruments: 31 },
                'M!K!': { key: 'M!K!', channels: 4, instruments: 31 },
                'FLT4': { key: 'FLT4', channels: 4, instruments: 31 },
                '4CHN': { key: '4CHN', channels: 4, instruments: 31 },
                '6CHN': { key: '6CHN', channels: 6, instruments: 31 },
                'FLT8': { key: 'FLT8', channels: 8, instruments: 31 },
                '8CHN': { key: '8CHN', channels: 8, instruments: 31 },
                '16CH': { key: '16CH', channels: 16, instruments: 31 }
            };
            EIGHTH_SEMITONE_MULTIPLIER = Math.pow(2, 1 / (12 * 8));

            MODLoader = (function () {
                function MODLoader() {
                    _classCallCheck(this, MODLoader);
                }

                _createClass(MODLoader, null, [{
                    key: 'readMODfile',
                    value: function readMODfile(data) {
                        var i;
                        var readWord = function readWord(ofs) {
                            return data.charCodeAt(ofs) * 256 + data.charCodeAt(ofs + 1);
                        };
                        var modType = data.substring(1080, 1084);
                        var modTypeData = MODTypes[modType] || { key: 'NOIS', channels: 4, instruments: 15 };
                        var song = {};

                        song.name = data.substring(0, 20);
                        song.type = modTypeData.key;
                        song.channels = modTypeData.channels;

                        song.effectMap = MOD_EFFECT_MAP;
                        var songLengthPos = 20 + 30 * modTypeData.instruments;

                        song.songLength = data.charCodeAt(songLengthPos);
                        song.orders = [];
                        var maxPatternNum = 0;
                        for (i = 0; i < 128; i++) {
                            song.orders[i] = data.charCodeAt(songLengthPos + 2 + i);
                            if (song.orders[i] > maxPatternNum) {
                                maxPatternNum = song.orders[i];
                            }
                        }

                        var patternOfs = songLengthPos + 130;
                        if (modTypeData.instruments > 15) {
                            patternOfs += 4;
                        }

                        song.patterns = [];
                        for (i = 0; i <= maxPatternNum; i++) {
                            var pattern = [];
                            var ofs = patternOfs + 64 * 4 * modTypeData.channels * i;
                            var row;
                            for (row = 0; row < 64; row++) {
                                var rowData = [];
                                var chan;
                                for (chan = 0; chan < modTypeData.channels; chan++) {
                                    var note = {};
                                    var chanOfs = ofs + row * 4 * modTypeData.channels + chan * 4;
                                    var b1 = data.charCodeAt(chanOfs);
                                    var b2 = data.charCodeAt(chanOfs + 1);
                                    var b3 = data.charCodeAt(chanOfs + 2);
                                    var b4 = data.charCodeAt(chanOfs + 3);
                                    note.sampleNumber = (b1 & 240) + (b3 & 240) / 16;
                                    var period = ((b1 & 15) * 256 + b2) * 4;
                                    note.note = period === 0 ? -1 : MOD_PERIOD_TABLE.getNote(period);
                                    note.effect = b3 & 15;
                                    note.parameter = b4;
                                    note.volume = -1;
                                    rowData.push(note);
                                }
                                pattern.push(rowData);
                            }
                            song.patterns.push(pattern);
                        }

                        var sampleOfs = patternOfs + 64 * 4 * modTypeData.channels * (maxPatternNum + 1);

                        var modInstruments = [];

                        (function () {
                            var insOffset;
                            var sampleLength;
                            var repeatLength;
                            var sampleName;
                            var sample;
                            var repeatStart;
                            var repeatEnd;

                            for (i = 0; i < modTypeData.instruments; i++) {
                                insOffset = 20 + 30 * i;

                                sampleLength = readWord(insOffset + 22) * 2;
                                repeatLength = readWord(insOffset + 28) * 2;
                                sampleName = data.substring(insOffset, insOffset + 22);
                                repeatStart = readWord(insOffset + 26) * 2;
                                repeatEnd = readWord(insOffset + 26) * 2 + repeatLength;
                                if (repeatLength > 2 && repeatEnd > sampleLength) {
                                    repeatEnd = sampleLength - 1;
                                    repeatLength = repeatEnd - repeatStart;
                                }

                                sample = new Sample(data, {
                                    name: sampleName,
                                    bits: 8,
                                    channels: 1,
                                    signed: true,
                                    sampleRate: 44100,
                                    representedFreq: 44100 / Math.pow(EIGHTH_SEMITONE_MULTIPLIER, MOD_FINETUNE_TABLE[data.charCodeAt(insOffset + 24)]),
                                    sampleLength: sampleLength,
                                    volume: data.charCodeAt(insOffset + 25),
                                    repeatType: repeatLength > 2 ? 'REP_NORMAL' : 'NON_REPEATING',
                                    repeatStart: repeatStart,
                                    repeatEnd: repeatEnd
                                }, sampleOfs);
                                sampleOfs += sampleLength;

                                modInstruments[i] = new Instrument({ name: sampleName, numSamples: 1 }, [sample]);
                            }
                        })();

                        song.instruments = modInstruments;

                        return song;
                    }
                }]);

                return MODLoader;
            })();

            _export('MODLoader', MODLoader);
        }
    };
});
System.register("lib/src/mod/MOD_PERIOD_TABLE.js", [], function (_export) {
    var MOD_PERIOD_TABLE;
    return {
        setters: [],
        execute: function () {
            "use strict";

            MOD_PERIOD_TABLE = {
                PERIODS: [27392, 25856, 24384, 23040, 21696, 20480, 19328, 18240, 17216, 16256, 15360, 14496, 13696, 12928, 12192, 11520, 10848, 10240, 9664, 9120, 8608, 8128, 7680, 7248, 6848, 6464, 6096, 5760, 5424, 5120, 4832, 4560, 4304, 4064, 3840, 3624, 3424, 3232, 3048, 2880, 2712, 2560, 2416, 2280, 2152, 2032, 1920, 1812, 1712, 1616, 1524, 1440, 1356, 1280, 1208, 1140, 1076, 1016, 960, 906, 856, 808, 762, 720, 678, 640, 604, 570, 538, 508, 480, 453, 428, 404, 381, 360, 339, 320, 302, 285, 269, 254, 240, 226, 214, 202, 190, 180, 170, 160, 151, 143, 135, 127, 120, 113, 107, 101, 95, 90, 85, 80, 75, 71, 67, 63, 60, 56],
                NOTE_NAMES: ["C-0", "C#0", "D-0", "D#0", "E-0", "F-0", "F#0", "G-0", "G#0", "A-0", "A#0", "B-0", "C-1", "C#1", "D-1", "D#1", "E-1", "F-1", "F#1", "G-1", "G#1", "A-1", "A#1", "B-1", "C-2", "C#2", "D-2", "D#2", "E-2", "F-2", "F#2", "G-2", "G#2", "A-2", "A#2", "B-2", "C-3", "C#3", "D-3", "D#3", "E-3", "F-3", "F#3", "G-3", "G#3", "A-3", "A#3", "B-3", "C-4", "C#4", "D-4", "D#4", "E-4", "F-4", "F#4", "G-4", "G#4", "A-4", "A#4", "B-4", "C-5", "C#5", "D-5", "D#5", "E-5", "F-5", "F#5", "G-5", "G#5", "A-5", "A#5", "B-5", "C-6", "C#6", "D-6", "D#6", "E-6", "F-6", "F#6", "G-6", "G#6", "A-6", "A#6", "B-6", "C-7", "C#7", "D-7", "D#7", "E-7", "F-7", "F#7", "G-7", "G#7", "A-7", "A#7", "B-7", "C-8", "C#8", "D-8", "D#8", "E-8", "F-8", "F#8", "G-8", "G#8", "A-8", "A#8", "B-8"],
                getNote: function getNote(period) {
                    var i = 0;
                    if (period <= 0) {
                        return -1;
                    }
                    for (i = 0; i < MOD_PERIOD_TABLE.PERIODS.length - 1; i++) {
                        var p = MOD_PERIOD_TABLE.PERIODS[i];
                        var p1 = MOD_PERIOD_TABLE.PERIODS[i + 1];
                        if (Math.abs(p - period) < Math.abs(p1 - period)) {
                            return i;
                        }
                    }
                    return -1;
                },
                getPeriod: function getPeriod(note) {
                    return MOD_PERIOD_TABLE.PERIODS[note] || -1;
                },
                getName: function getName(note) {
                    if (note == 254) {
                        return "oFF";
                    } else {
                        return MOD_PERIOD_TABLE.NOTE_NAMES[note] || "---";
                    }
                }
            };

            _export("MOD_PERIOD_TABLE", MOD_PERIOD_TABLE);
        }
    };
});
System.register("lib/src/AMIGA_FILTERS.js", ["npm:babel-runtime@5.2.17/helpers/create-class", "npm:babel-runtime@5.2.17/helpers/class-call-check"], function (_export) {
    var _createClass, _classCallCheck, Amiga_Lowpass_Filter_3300_12dB_per_octave, AMIGA_FILTERS;

    return {
        setters: [function (_npmBabelRuntime5217HelpersCreateClass) {
            _createClass = _npmBabelRuntime5217HelpersCreateClass["default"];
        }, function (_npmBabelRuntime5217HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5217HelpersClassCallCheck["default"];
        }],
        execute: function () {
            "use strict";

            Amiga_Lowpass_Filter_3300_12dB_per_octave = (function () {
                function Amiga_Lowpass_Filter_3300_12dB_per_octave() {
                    _classCallCheck(this, Amiga_Lowpass_Filter_3300_12dB_per_octave);

                    this.GAIN = 24.33619312;
                    this.xv = [0, 0, 0];
                    this.yv = [0, 0, 0];
                }

                _createClass(Amiga_Lowpass_Filter_3300_12dB_per_octave, [{
                    key: "next",
                    value: function next(sample) {
                        this.xv[0] = this.xv[1];
                        this.xv[1] = this.xv[2];
                        this.xv[2] = sample / this.GAIN;
                        this.yv[0] = this.yv[1];
                        this.yv[1] = this.yv[2];
                        this.yv[2] = this.xv[0] + this.xv[2] + 2 * this.xv[1] + -0.5147540757 * this.yv[0] + 1.350389831 * this.yv[1];
                        return this.yv[2];
                    }
                }]);

                return Amiga_Lowpass_Filter_3300_12dB_per_octave;
            })();

            AMIGA_FILTERS = [new Amiga_Lowpass_Filter_3300_12dB_per_octave(), new Amiga_Lowpass_Filter_3300_12dB_per_octave()];

            _export("AMIGA_FILTERS", AMIGA_FILTERS);
        }
    };
});
System.registerDynamic("npm:babel-runtime@5.2.17/helpers/class-call-check", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@0.9.7/library/modules/$.fw", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function($) {
    $.FW = false;
    $.path = $.core;
    return $;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@0.9.7/library/modules/$", ["npm:core-js@0.9.7/library/modules/$.fw"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = typeof self != 'undefined' ? self : Function('return this')(),
      core = {},
      defineProperty = Object.defineProperty,
      hasOwnProperty = {}.hasOwnProperty,
      ceil = Math.ceil,
      floor = Math.floor,
      max = Math.max,
      min = Math.min;
  var DESC = !!function() {
    try {
      return defineProperty({}, 'a', {get: function() {
          return 2;
        }}).a == 2;
    } catch (e) {}
  }();
  var hide = createDefiner(1);
  function toInteger(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  }
  function desc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  }
  function simpleSet(object, key, value) {
    object[key] = value;
    return object;
  }
  function createDefiner(bitmap) {
    return DESC ? function(object, key, value) {
      return $.setDesc(object, key, desc(bitmap, value));
    } : simpleSet;
  }
  function isObject(it) {
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  }
  function isFunction(it) {
    return typeof it == 'function';
  }
  function assertDefined(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  }
  var $ = module.exports = $__require('npm:core-js@0.9.7/library/modules/$.fw')({
    g: global,
    core: core,
    html: global.document && document.documentElement,
    isObject: isObject,
    isFunction: isFunction,
    it: function(it) {
      return it;
    },
    that: function() {
      return this;
    },
    toInteger: toInteger,
    toLength: function(it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
    },
    toIndex: function(index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    },
    has: function(it, key) {
      return hasOwnProperty.call(it, key);
    },
    create: Object.create,
    getProto: Object.getPrototypeOf,
    DESC: DESC,
    desc: desc,
    getDesc: Object.getOwnPropertyDescriptor,
    setDesc: defineProperty,
    setDescs: Object.defineProperties,
    getKeys: Object.keys,
    getNames: Object.getOwnPropertyNames,
    getSymbols: Object.getOwnPropertySymbols,
    assertDefined: assertDefined,
    ES5Object: Object,
    toObject: function(it) {
      return $.ES5Object(assertDefined(it));
    },
    hide: hide,
    def: createDefiner(0),
    set: global.Symbol ? simpleSet : hide,
    mix: function(target, src) {
      for (var key in src)
        hide(target, key, src[key]);
      return target;
    },
    each: [].forEach
  });
  if (typeof __e != 'undefined')
    __e = core;
  if (typeof __g != 'undefined')
    __g = global;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@0.9.7/library/fn/object/define-property", ["npm:core-js@0.9.7/library/modules/$"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@0.9.7/library/modules/$');
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.2.17/core-js/object/define-property", ["npm:core-js@0.9.7/library/fn/object/define-property"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@0.9.7/library/fn/object/define-property'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.2.17/helpers/create-class", ["npm:babel-runtime@5.2.17/core-js/object/define-property"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$defineProperty = $__require('npm:babel-runtime@5.2.17/core-js/object/define-property')["default"];
  exports["default"] = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register('lib/src/Player.js', ['npm:babel-runtime@5.2.17/helpers/create-class', 'npm:babel-runtime@5.2.17/helpers/class-call-check', 'lib/src/AMIGA_FILTERS.js', 'lib/src/mod/MOD_PERIOD_TABLE.js'], function (_export) {
    var _createClass, _classCallCheck, AMIGA_FILTERS, MOD_PERIOD_TABLE, FREQ_NTSC, FREQ_PAL, Player;

    return {
        setters: [function (_npmBabelRuntime5217HelpersCreateClass) {
            _createClass = _npmBabelRuntime5217HelpersCreateClass['default'];
        }, function (_npmBabelRuntime5217HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5217HelpersClassCallCheck['default'];
        }, function (_libSrcAMIGA_FILTERSJs) {
            AMIGA_FILTERS = _libSrcAMIGA_FILTERSJs.AMIGA_FILTERS;
        }, function (_libSrcModMOD_PERIOD_TABLEJs) {
            MOD_PERIOD_TABLE = _libSrcModMOD_PERIOD_TABLEJs.MOD_PERIOD_TABLE;
        }],
        execute: function () {
            'use strict';

            'use strict';

            /*
             * ======================================== PLAYER ===========================================
             */

            FREQ_NTSC = { clock: 7159090.5 * 4 };
            FREQ_PAL = { clock: 7093789.2 * 4 };

            /*
             * SONG PLAYER ...
             */

            Player = (function () {
                function Player(mixer) {
                    _classCallCheck(this, Player);

                    this.playing = true;
                    this.loggingEnabled = false;
                    this.song = null;
                    this.stateCallback = null;
                    this.mixer = mixer;
                    this.mixer.setPreMixCallback(this.preSampleMix, this);
                    this.FREQ = { PAL: FREQ_PAL, NTSC: FREQ_NTSC };
                }

                _createClass(Player, [{
                    key: 'setSong',
                    value: function setSong(song) {
                        this.song = song;
                        this.effectMap = song.effectMap;
                        this.playerState = {
                            freq: song.defaultFreq || FREQ_PAL,

                            pos: 0,
                            row: -1,
                            tick: 6,
                            speed: song.initialSpeed || 6,
                            bpm: song.initialBPM || 125,
                            globalVolume: song.globalVolume || 64,
                            patternDelay: 0,
                            glissandoControl: 0, /* 1 means that slides are locked to note values */
                            breakToRow: null,
                            jumpToPattern: null,
                            l_breakToRow: null, /* for pattern loop */
                            l_jumpToPattern: null,
                            fastS3MVolumeSlides: song.fastS3MVolumeSlides || false,
                            filter: 0
                        };

                        var defaultPanPos = song.defaultPanPos || [-0.8, 0.8, 0.8, -0.8, -0.8, 0.8, 0.8, -0.8, -0.8, 0.8, 0.8, -0.8, -0.8, 0.8, 0.8, -0.8];
                        this.channelState = [];
                        for (var i = 0; i < song.channels; i++) {
                            this.channelState[i] = {
                                chan: i,
                                panPos: defaultPanPos[i],
                                volume: 64,
                                lastVolume: undefined, /* last officially set volume - base volume for tremolo */
                                period: 0,
                                pitchOfs: 1,
                                lastPeriod: 0, /* last officially set period - base period for vibrato */
                                effect: 0,
                                effectParameter: 0,
                                effectState: {
                                    tremorCount: 0,
                                    tremorParam: 0,
                                    arpPos: 0,
                                    noteDelay: -1,
                                    vibratoParams: {
                                        waveform: 0,
                                        pos: 0,
                                        depth: 0,
                                        speed: 0
                                    },
                                    tremoloParams: {
                                        waveform: 0,
                                        pos: 0,
                                        depth: 0,
                                        speed: 0
                                    },
                                    patternLoop: {
                                        row: 0,
                                        count: null
                                    },
                                    invertLoop: {
                                        pos: 0,
                                        delay: 0,
                                        sample: null
                                    }
                                }
                            };
                            this.mixer.setPanPosition(i, this.channelState[i].panPos);
                        }
                    }
                }, {
                    key: 'start',
                    value: function start() {
                        this.playing = true;
                    }
                }, {
                    key: 'stop',
                    value: function stop() {
                        // stop any further notes from being played
                        this.playing = false;

                        // and cut output from all song player related channels
                        for (var chan = 0; chan < this.song.channels; chan++) {
                            this.mixer.cut(chan);
                        }
                    }
                }, {
                    key: 'preSampleMix',
                    value: function preSampleMix(mixer, sampleRate) {
                        if (!this.playing) {
                            return;
                        }
                        var state = this.playerState;
                        var song = this.song;
                        if (state.patternDelay > 0) {
                            state.patternDelay--;
                            this.handleTick(song.patterns[song.orders[state.pos]][state.row], state.tick, sampleRate);
                        } else {
                            if (state.tick == 0) {
                                if (this.stateCallback) {
                                    this.stateCallback(this.playerState, this.channelState);
                                }
                                this.handleDiv(song.patterns[song.orders[state.pos]][state.row], sampleRate);
                            } else {
                                this.handleTick(song.patterns[song.orders[state.pos]][state.row], state.tick, sampleRate);
                            }
                            this.advanceTick();
                        }
                        if (state.tick === 0) {
                            /*
                             * l_jumpToPattern and l_breakToRow are used for pattern loops;
                             * these are processed _before_ normal jump to pattern/row commands
                             */
                            if (state.l_jumpToPattern !== null) {
                                state.jumpToPattern = state.l_jumpToPattern;
                                state.breakToRow = state.l_breakToRow;
                                state.l_jumpToPattern = null;
                                state.l_breakToRow = null;
                            }
                            if (state.jumpToPattern !== null) {
                                state.pos = state.jumpToPattern;
                                state.jumpToPattern = null;
                                if (state.breakToRow !== null) {
                                    state.row = state.breakToRow;
                                    state.breakToRow = null;
                                } else {
                                    state.row = 0;
                                }
                            }
                            if (state.breakToRow !== null) {
                                if (state.row !== 0) {
                                    this.advancePos();
                                }
                                state.row = state.breakToRow;
                                state.breakToRow = null;
                            }
                        }
                        if (this.playerState.filter > 0) {
                            this.mixer.setFilters(AMIGA_FILTERS);
                        } else {
                            this.mixer.setFilters(null);
                        }
                        this.mixer.setGlobalVolume(state.globalVolume);
                        this.mixer.setSecondsPerMix(1 / (state.bpm * 2 / 5));
                    }
                }, {
                    key: 'nextPos',

                    /**
                     * Jump to the next position in the song
                     */
                    value: function nextPos() {
                        this.advancePos();
                        this.playerState.row = 0;
                        this.playerState.tick = 0;
                    }
                }, {
                    key: 'previousPos',

                    /**
                     * Jump to the previous position in the song
                     */
                    value: function previousPos() {
                        this.decrementPos();
                        this.playerState.row = 0;
                        this.playerState.tick = 0;
                    }
                }, {
                    key: 'advancePos',
                    value: function advancePos() {
                        var state = this.playerState;
                        var song = this.song;

                        do {
                            state.pos = state.pos + 1;
                        } while (song.orders[state.pos] == 254);

                        if (state.pos >= song.songLength || song.orders[state.pos] == 255) {
                            state.pos = 0;
                        }
                    }
                }, {
                    key: 'decrementPos',
                    value: function decrementPos() {
                        var state = this.playerState;
                        var song = this.song;

                        do {
                            state.pos -= 1;
                        } while (song.orders[state.pos] == 254);

                        if (state.pos < 0) {
                            state.pos = song.songLength;
                            do {
                                state.pos -= 1;
                            } while (song.orders[state.pos] == 254);
                        }
                    }
                }, {
                    key: 'advanceRow',
                    value: function advanceRow() {
                        var state = this.playerState;
                        var song = this.song;

                        var numRows = song.patterns[song.orders[state.pos]].length;
                        state.row = state.row + 1;

                        if (state.row >= numRows) {
                            var chan;
                            for (chan = 0; chan < song.channels; chan++) {
                                this.channelState[chan].effectState.patternLoop.row = 0;
                            }
                            state.row = 0;
                            this.advancePos();
                        }
                    }
                }, {
                    key: 'advanceTick',
                    value: function advanceTick() {
                        var state = this.playerState;
                        state.tick += 1;
                        if (state.tick >= state.speed) {
                            state.tick = 0;
                            this.advanceRow();
                        }
                    }
                }, {
                    key: 'handleTick',
                    value: function handleTick(row, tick, sampleRate) {
                        for (var chan = 0; chan < this.song.channels; chan++) {
                            var chanState = this.channelState[chan];
                            var effectParameter = chanState.effectParameter;
                            var effectHandler = chanState.effect;
                            var volumeEffectHandler = null,
                                volumeEffectParameter = null;
                            if (row && row[chan] && row[chan].volumeEffect) {
                                volumeEffectHandler = this.effectMap[row[chan].volumeEffect].effect;
                                volumeEffectParameter = row[chan].volumeEffectParameter;
                            }
                            if (volumeEffectHandler) {
                                volumeEffectHandler.tick(this.mixer, chan, volumeEffectParameter, this.playerState, chanState, null, null, this.song);
                            }
                            if (effectHandler) {
                                effectHandler.tick(this.mixer, chan, effectParameter, this.playerState, chanState, null, null, this.song);
                            }
                            var periodToPlay = chanState.period;
                            if (this.playerState.glissandoControl > 0) {
                                var noteNum = MOD_PERIOD_TABLE.getNote(periodToPlay);
                                periodToPlay = MOD_PERIOD_TABLE.getPeriod(noteNum);
                            }
                            var freqHz = this.playerState.freq.clock / (periodToPlay * 2) * chanState.pitchOfs;
                            this.mixer.setFrequency(chan, freqHz);
                            this.mixer.setVolume(chan, chanState.volume);
                        }
                    }
                }, {
                    key: 'handleNote',
                    value: function handleNote(chan, note, sampleRate) {
                        var parms = this.channelState[chan];
                        var period = 0;
                        if (note.note > 0 && note.note !== 254) {
                            period = MOD_PERIOD_TABLE.getPeriod(note.note);
                        }
                        var sampleNumber = note.sampleNumber - 1;
                        parms.effectParameter = note.parameter;
                        var effectHandler = this.effectMap[note.effect].effect;
                        var volumeEffectHandler = null,
                            volumeEffectParameter = null;
                        if (note.volumeEffect) {
                            volumeEffectHandler = this.effectMap[note.volumeEffect].effect;
                            volumeEffectParameter = note.volumeEffectParameter;
                        }
                        if (!effectHandler && this.loggingEnabled) {
                            console && console.log && console.log('no effect handler for effect ' + note.effect.toString(16) + '/' + note.parameter.toString(16));
                        }
                        parms.effect = effectHandler;

                        if (sampleNumber >= 0 && this.song.instruments[sampleNumber]) {

                            var instrument = this.song.instruments[sampleNumber];

                            var noteToPlay = note.note;
                            if (noteToPlay < 0) {
                                noteToPlay = MOD_PERIOD_TABLE.getNote(parms.period);
                            }
                            if (noteToPlay > 0) {
                                var sampleNum = instrument.metadata.noteToSampleMap[noteToPlay];
                                var sample = instrument.samples[sampleNum];

                                // set sample (& volume)
                                this.mixer.setSample(chan, sample);

                                parms.pitchOfs = sample.metadata.pitchOfs || 1;
                                if (effectHandler && effectHandler.allowVolumeChange === true || !effectHandler) {
                                    parms.volume = sample.metadata.volume;
                                    parms.lastVolume = sample.metadata.volume;
                                }
                            }
                        }
                        if (period > 0) {
                            if (effectHandler && effectHandler.allowPeriodChange === true || !effectHandler) {
                                parms.period = period;
                                parms.lastPeriod = period;
                                if (effectHandler && effectHandler.allowSampleTrigger === true || !effectHandler) {
                                    this.mixer.setSamplePosition(chan, 0);
                                }
                            }
                        }
                        var volume = note.volume;
                        if (volume >= 0) {
                            if (effectHandler && effectHandler.allowVolumeChange === true || !effectHandler) {
                                parms.volume = volume;
                                parms.lastVolume = volume;
                            }
                        }
                        if (note.note === 254) {
                            // 254 means note off
                            this.mixer.cut(chan);
                        }
                        if (volumeEffectHandler) {
                            volumeEffectHandler.div(this.mixer, chan, volumeEffectParameter, this.playerState, parms, period, note, this.song);
                        }
                        if (effectHandler) {
                            effectHandler.div(this.mixer, chan, parms.effectParameter, this.playerState, parms, period, note, this.song);
                        }
                        var periodToPlay = parms.period;
                        if (this.playerState.glissandoControl > 0) {
                            var noteNum = MOD_PERIOD_TABLE.getNote(periodToPlay);
                            periodToPlay = MOD_PERIOD_TABLE.getPeriod(noteNum);
                        }

                        this.mixer.setVolume(chan, parms.volume);
                        var freqHz = this.playerState.freq.clock / (periodToPlay * 2) * parms.pitchOfs;
                        this.mixer.setFrequency(chan, freqHz);
                    }
                }, {
                    key: 'getPlayerState',
                    value: function getPlayerState() {
                        return this.playerState;
                    }
                }, {
                    key: 'handleDiv',
                    value: function handleDiv(row, sampleRate) {
                        for (var chan = 0; chan < this.song.channels; chan++) {
                            var note = row[chan];
                            this.handleNote(chan, note, sampleRate);
                        }
                    }
                }, {
                    key: 'registerCallback',
                    value: function registerCallback(callback) {
                        this.stateCallback = callback;
                    }
                }]);

                return Player;
            })();

            _export('Player', Player);
        }
    };
});
System.register('lib/jssynth-mod.js', ['lib/src/Player.js', 'lib/src/mod/MODLoader.js', 'github:gundy/jssynth@master'], function (_export) {
    var Player, MODLoader, Sample, Instrument, Mixer, WebAudioDriver;
    return {
        setters: [function (_libSrcPlayerJs) {
            Player = _libSrcPlayerJs.Player;
        }, function (_libSrcModMODLoaderJs) {
            MODLoader = _libSrcModMODLoaderJs.MODLoader;
        }, function (_githubGundyJssynthMaster) {
            Sample = _githubGundyJssynthMaster.Sample;
            Instrument = _githubGundyJssynthMaster.Instrument;
            Mixer = _githubGundyJssynthMaster.Mixer;
            WebAudioDriver = _githubGundyJssynthMaster.WebAudioDriver;
        }],
        execute: function () {
            'use strict';

            _export('Mixer', Mixer);

            _export('Player', Player);

            _export('MODLoader', MODLoader);

            _export('Sample', Sample);

            _export('Instrument', Instrument);

            _export('WebAudioDriver', WebAudioDriver);
        }
    };
});
//# sourceMappingURL=jssynth-mod.dist.js.map