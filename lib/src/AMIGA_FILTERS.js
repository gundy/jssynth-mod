"use strict";

class Amiga_Lowpass_Filter_3300_12dB_per_octave  {
    constructor() {
        this.GAIN = 24.33619312;
        this.xv = [ 0, 0, 0 ];
        this.yv = [ 0, 0, 0 ];
    }
    next(sample) {
        this.xv[0] = this.xv[1];
        this.xv[1] = this.xv[2];
        this.xv[2] = sample / this.GAIN;
        this.yv[0] = this.yv[1];
        this.yv[1] = this.yv[2];
        this.yv[2] = (this.xv[0] + this.xv[2])
            + 2 * this.xv[1]
            + ( -0.5147540757 * this.yv[0] )
            + ( 1.3503898310 * this.yv[1]);
        return this.yv[2];
    }
}

export const AMIGA_FILTERS = [ new Amiga_Lowpass_Filter_3300_12dB_per_octave(), new Amiga_Lowpass_Filter_3300_12dB_per_octave() ];

