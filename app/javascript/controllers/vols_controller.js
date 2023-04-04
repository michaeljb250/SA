import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="vols"
export default class extends Controller {
  connect() {
    // create Tone.js synth
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


const synth = new Tone.Synth().toDestination();

// set initial volume to 50%
Tone.Destination.volume.value = -6;

// load audio file
const audioFile = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();

// get HTML elements
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const volumeSlider = document.getElementById('volume-slider');

// add event listeners to buttons and slider
startBtn.addEventListener('click', () => {
  audioFile.start();
});

stopBtn.addEventListener('click', () => {
  audioFile.stop();
});

volumeSlider.addEventListener('input', () => {
  const volumeValue = volumeSlider.value / 100; // convert to value between 0 and 1
  Tone.Destination.volume.rampTo(Tone.gainToDb(volumeValue), 0.1); // fade to new volume in 0.1 seconds
});

  }
}
