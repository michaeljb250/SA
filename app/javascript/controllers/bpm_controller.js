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

    const synth = new Tone.Synth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.001,
        sustain: 0.5
      }
    }).toDestination();

    const gain = new Tone.Gain(0.7);
    synth.connect(gain);

    let isPlaying = false;
    const noteEl = document.getElementById('note');

    const pattern = new Tone.Pattern((time, note) => {
      noteEl.innerHTML = note;
      synth.triggerAttackRelease(note, "8n", time);
    }, ["C4", "E4", "G4", "B4"], "upDown");

    Tone.Transport.bpm.value = 200;
    pattern.start();

    document.getElementById('play').addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        Tone.Transport.start();
      } else {
        Tone.Transport.pause();
      }
    });

    document.getElementById('bpm').addEventListener('input', e => {
      Tone.Transport.bpm.rampTo(+e.target.value, 0.1);
      document.documentElement.style.setProperty('--bg-color', `hsl(${e.target.value / 4}, 70%, 60%)`);
    });


    const textt = document.getElementById("textt");
    let indexx = 0;
    const textArrayy = [
      { textt: "This is the first line of text", duration: 10000 },
      { textt: "This is the second line of text", duration: 10000 },
      { textt: "This is the third line of text", duration: 10000 }
    ];

    function rotateText() {
      textt.style.opacity = 0;
      setTimeout(() => {
        textt.textContent = textArrayy[indexx].textt;
        textt.style.opacity = 1;
      }, 1000);
      setTimeout(() => {
        textt.style.opacity = 0;
      }, textArrayy[indexx].duration - 1000);
      indexx = (indexx + 1) % textArrayy.length;
      setTimeout(rotateText, textArrayy[indexx].duration);
    }

    rotateText();
  }
}
