jssynth-mod
===========

MOD/S3M player built on top of JSSynth Javascript synthesised audio library.

```JavaScript
        var song = ModReader.readMODfile(moduleData);
        var mixer = new Mixer({numChannels: 8 /* 4 for music, 4 for effects */ });
        var player = new Player(mixer);
        player.setSong(song);
        var audioOut = new WebAudioDriver(mixer, 4096);  /* 4096/8192/.. = buffer size */
        audioOut.start();

        // ...
        mixer.triggerSample(4, sample, 8000); /* trigger a sample (music is still playing) */
        // ...
```

Games, demos, interactive UI's, DSP related apps or prototypes, the sky is the limit.

If you use JSSynth or any of the related example code in any projects, please drop by and let 
me know.
