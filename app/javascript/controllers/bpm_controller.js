import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="bpm"
export default class extends Controller {
  connect() {
    const textArray = [  "This is the first line of text.",  "This is the second line of text.",  "This is the third line of text."];

    let index = 0;
    let textIndex = 0;

    function type() {
      const currentText = textArray[textIndex];
      if (index < currentText.length) {
        document.getElementById("text").innerHTML += currentText.charAt(index);
        index++;
        setTimeout(type, 50);
      }
    }

    function nextText() {
      textIndex++;
      index = 0;
      document.getElementById("text").innerHTML = "";
      type();
    }

    function prevText() {
      textIndex--;
      index = 0;
      document.getElementById("text").innerHTML = "";
      type();
    }

    document.getElementById("next-btn").addEventListener("click", () => {
      if (textIndex < textArray.length - 1) {
        nextText();
      }
    });

    document.getElementById("back-btn").addEventListener("click", () => {
      if (textIndex > 0) {
        prevText();
      }
    });

    type();

    var synth = new Tone.Synth();
    synth.oscillator.type = 'sine';
    synth.envelope.attack = 0.001;
    synth.envelope.sustain = 0.5;

    var gain  = new Tone.Gain(0.7);
    synth.connect(gain);
    gain.toMaster();

    var isPlaying = false
    var noteEl = document.getElementById('note')


    var pattern = new Tone.Pattern((t,n) => {
      noteEl.innerHTML = n
      synth.triggerAttackRelease(n, "8n", t)
    }, ["C4", "E4", "G4", "B4"], "upDown")


    Tone.Transport.bpm.value = 200
    pattern.start();


    document.getElementById('play').addEventListener('click', () => {
      isPlaying = !isPlaying
      if(isPlaying) {
        Tone.Transport.start();
      } else {
        Tone.Transport.pause();
      }
    })

    document.getElementById('bpm').addEventListener('input', e => {
      Tone.Transport.bpm.rampTo(+e.target.value, 0.01)
      document.documentElement.style.setProperty('--bg-color', `hsl(${e.target.value / 4}, 70%, 60%)`);
    })

  }
}
