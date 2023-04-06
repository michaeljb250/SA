import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="synth"
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

// create an array of notes for the keyboard
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// create an object with different synth options
const synthOptions = {
  synth: Tone.Synth,
  amsynth: Tone.AMSynth,
  fmsynth: Tone.FMSynth,
  membranesynth: Tone.MembraneSynth,
};

// create a default synth with Tone.js
let synth = new Tone.Synth().toDestination();

// create the keyboard element in the DOM
const keyboard = document.getElementById('keyboard');

// create a button for each note and add it to the keyboard
notes.forEach(note => {
  const button = document.createElement('button');
  button.innerText = note;
  button.addEventListener('mousedown', () => {
    synth.triggerAttack(`${note}4`);
  });
  button.addEventListener('mouseup', () => {
    synth.triggerRelease();
  });
  keyboard.appendChild(button);
});

// add event listener to the synth select dropdown
const synthSelect = document.getElementById('synth');
synthSelect.addEventListener('change', () => {
  const synthOption = synthSelect.value;
  synth.dispose();
  synth = new synthOptions[synthOption]().toDestination();
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
