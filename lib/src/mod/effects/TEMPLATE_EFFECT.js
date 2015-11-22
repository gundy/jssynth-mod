// a prototypical effect - effectively does nothing
// allows samples to be triggered
// allows volume changes
// allows note period changes to occur
export const TEMPLATE_EFFECT = {
    div: function(param, playerState, channelState, period) {},
    tick: function(param, playerState, channelState, period) {},
    allowSampleTrigger: true,
    allowVolumeChange: true,
    allowPeriodChange: true
};
