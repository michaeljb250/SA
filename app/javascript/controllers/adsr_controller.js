import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="adsr"
export default class extends Controller {
  connect() {

    const textArray = [  "Attack, decay, sustain, release (ADSR) are the four stages of an envelope used to shape the volume of a sound over time:",  "attack is the time it takes for the sound to reach its maximum level, decay is the time it takes for the sound to decrease to a sustain level, ",  "sustain is the level the sound maintains until it is released, and release is the time it takes for the sound to fade out completely."];

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
      envelope: {
        attack: 0,
        decay: 0.5,
        sustain: 0.5,
        release: 0.5
      }
    }).toDestination(); // create a simple synth with ADSR envelope

    const notes = [
      "C2", "D2", "E2", "F2", "G2", "A2", "B2",
      "C3", "D3", "E3", "F3", "G3", "A3", "B3",
      "C4"
    ]; // define the notes you want to use

    const keyboard = document.getElementById("keyboard"); // get the keyboard element

    // create a button for each note
    notes.forEach(note => {
      const button = document.createElement("button");
      button.innerHTML = note;
      button.classList.add("note-button");
      button.addEventListener("mousedown", () => {
        synth.triggerAttack(note); // play the note when the button is pressed
      });
      button.addEventListener("mouseup", () => {
        synth.triggerRelease(); // stop playing the note
      });
      keyboard.appendChild(button);
    });

    // get the slider elements
    const attackSlider = document.getElementById("attack-slider");
    const decaySlider = document.getElementById("decay-slider");
    const sustainSlider = document.getElementById("sustain-slider");
    const releaseSlider = document.getElementById("release-slider");

    // set up event listeners for the sliders
    attackSlider.addEventListener("input", () => {
      synth.envelope.attack = parseFloat(attackSlider.value);
    });
    decaySlider.addEventListener("input", () => {
      synth.envelope.decay = parseFloat(decaySlider.value);
    });
    sustainSlider.addEventListener("input", () => {
      synth.envelope.sustain = parseFloat(sustainSlider.value);
    });
    releaseSlider.addEventListener("input", () => {
      synth.envelope.release = parseFloat(releaseSlider.value);
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
