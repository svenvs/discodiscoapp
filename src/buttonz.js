let sounds = {
  '52': {
    howl: new Howl({
      src: ['/sounds/OS_BH_128_Kick9.wav'],
      onplay: ()=> toggleElementPlaying('52'),
      onend: ()=> toggleElementPlaying('52'),
    }),
    timeout: false,
  },
  '53': { 
    howl: new Howl({
      src: ['/sounds/MP_Snare1.wav'],
      onplay: ()=> toggleElementPlaying('53'),
      onend: ()=> toggleElementPlaying('53'),
  }),
    timeout: false,
  },
  '54': { 
    howl: new Howl({src: ['/sounds/OS_BH_128_Fmin_PianoRiff5.wav'],
      onplay: ()=> toggleElementPlaying('54'),
      onend: ()=> toggleElementPlaying('54'),
    }),
    timeout: false,
  },
  '55': { 
    howl: new Howl({src: ['/sounds/OS_BH_128_Fmin_PianoRiff6.wav'],
      onplay: ()=> toggleElementPlaying('55'),
      onend: ()=> toggleElementPlaying('55'),
    }),
    timeout: false,
  },
  '56': { 
    howl: new Howl({src: ['/sounds/OS_BH_128_Drum_Loop_18_(Full).wav'],
      onplay: ()=> toggleElementPlaying('56'),
      onend: ()=> toggleElementPlaying('56'),
    }),
    timeout: false,
  },
  '57': { 
    howl: new Howl({src: ['/sounds/OS_BH_128_Drum_Loop 26_(Full).wav'],
      onplay: ()=> toggleElementPlaying('57'),
      onend: ()=> toggleElementPlaying('57'),
    }),
    timeout: false,
  },
  '58': { 
    howl: new Howl({src: ['/sounds/OS_BH_128_Drum_Loop 26_(Full).wav'],
      onplay: ()=> toggleElementPlaying('58'),
      onend: ()=> toggleElementPlaying('58'),
    }),
    timeout: false,
  },
  '59': { 
    howl: new Howl({src: ['/sounds/OS_BH_128_Drum_Loop 26_(Full).wav'],
      onplay: ()=> toggleElementPlaying('59'),
      onend: ()=> toggleElementPlaying('59'),
    }),
    timeout: false,
  },
  '60': { 
    howl: new Howl({src: ['/sounds/OS_BH_SFX_09.wav'],
      onplay: ()=> toggleElementPlaying('60'),
      onend: ()=> toggleElementPlaying('60'),
    }),
    timeout: false,
  },
  '61': { 
    howl: new Howl({src: ['/sounds/OS_BH_SFX_12.wav'],
      onplay: ()=> toggleElementPlaying('61'),
      onend: ()=> toggleElementPlaying('61'),
    }),
    timeout: false,
  },
  '62': { 
    howl: new Howl({src: ['/sounds/OS_BH_128_Fmin_SwurveBass.wav'],
      onplay: ()=> toggleElementPlaying('62'),
      onend: ()=> toggleElementPlaying('62'),
    }),
    timeout: false,
  },
  '63': { 
    howl: new Howl({src: ['/sounds/OS_BH_128_Fmin_SwurveBass2.wav'],
      onplay: ()=> toggleElementPlaying('63'),
      onend: ()=> toggleElementPlaying('63'),
    }),
    timeout: false,
  },
}

navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
  console.log(midiAccess);

  var inputs = midiAccess.inputs;
  var outputs = midiAccess.outputs;

  for (var input of midiAccess.inputs.values()){
    input.onmidimessage = getMIDIMessage;
  }
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

function toggleElementPlaying(id){
  document.querySelector(`#button-${id}`).classList.toggle("isPlaying");
}

function getMIDIMessage(midiMessage) {
  console.log(midiMessage.data);
  if(midiMessage.data[0] === 144 && !sounds[midiMessage.data[1]].timeout){
    sounds[midiMessage.data[1]].timeout = true;
    //timeout hack because stuff is to fast else madnes :D
    setTimeout( ()=>{
      sounds[midiMessage.data[1]].timeout = false;
    }, 200)
    sounds[midiMessage.data[1]].howl.play();
  } 
}