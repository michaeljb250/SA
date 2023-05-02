import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="freeverb"
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

    // Load the audio file
const audioFile = 'https://tonejs.github.io/audio/berklee/gong_1.mp3';
const player = new Tone.Player(audioFile).toDestination();

// Create a Tone.js Freeverb effect
const freeverb = new Tone.Freeverb();

// Connect the player to the freeverb effect
player.connect(freeverb);
freeverb.toDestination();

// Set up the audio player
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const toggleEffectButton = document.getElementById('toggle-effect');

startButton.addEventListener('click', () => {
  player.start();
});

stopButton.addEventListener('click', () => {
  player.stop();
});

toggleEffectButton.addEventListener('click', () => {
  if (freeverb.wet.value > 0) {
    freeverb.wet.value = 0;
  } else {
    freeverb.wet.value = 1;
  }
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
