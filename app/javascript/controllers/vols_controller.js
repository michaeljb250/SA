import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="vols"
export default class extends Controller {
  connect() {
    // create Tone.js synth
    const textArray = [  "Sound volume refers to the perceived loudness of a sound.", "In guitar playing, gain is often associated with distortion. It is used to increase the amplitude of an electric guitar's signal to create a distorted, overdriven sound."];

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
const audioFile = new Tone.Player("/tunes/OS_ES_90_electric_guitar_melody_love_Am.wav").toDestination();

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

const textt = document.getElementById("textt");
let indexx = 0;
const textArrayy = [
  { textt: "", duration: 10000 },
  { textt: "", duration: 10000 }
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
