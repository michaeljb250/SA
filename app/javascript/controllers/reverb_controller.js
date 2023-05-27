import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'


// Connects to data-controller="reverb"
export default class extends Controller {
  connect() {
    const textArray = [  "Audio reverb is an effect that simulates the sound reflections and reverberations in a physical space.",  "It is created by adding a series of delays and filters to an audio signal to replicate the echoes and decay of sound in a room or other environment",  "Reverb is commonly used   to add depth and space to sounds, particularly vocals, drums, and other instruments."];

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

// create a new Tone.js player instance
const player = new Tone.Player({
  url: '/tunes/DIA_BAJO_130_strings_historia_Fmin.wav',
  loop: true
}).toDestination();

// create a new Tone.js reverb effect instance
const reverb = new Tone.Reverb().toDestination();

// set up the start button
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', () => {
  player.start();
});

// set up the stop button
const stopBtn = document.getElementById('stopBtn');
stopBtn.addEventListener('click', () => {
  player.stop();
});

// set up the reverb slider
const reverbSlider = document.getElementById('reverbSlider');
reverbSlider.addEventListener('input', () => {
  const value = parseFloat(reverbSlider.value);
  reverb.wet.value = 1 - value; // subtract value from 1 to invert direction
});

// connect the player to the reverb effect
player.connect(reverb);



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
