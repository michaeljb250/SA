import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

export default class extends Controller {
  connect() {

    const textArray = [  "Commonly reverb features will allow you to adjust 'roomsize', replicating the echo of being in a larger or smaller space",  "Dampening refers to the reduction of sound energy or the suppression of certain frequencies to achieve a desired sound quality or to control unwanted vibrations. It is commonly used to control resonance, eliminate echoes, or mitigate excessive reverberation in a room or an audio system."];

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

// create a new freeverb effect with the default values
const freeverb = new Tone.Freeverb().toDestination();

// set up the room size slider
const roomsizeSlider = document.getElementById("roomsize-slider");
roomsizeSlider.addEventListener("input", (event) => {
  const value = parseFloat(event.target.value);
  freeverb.roomSize.value = value;
});

// set up the dampening slider
const dampeningSlider = document.getElementById("dampening-slider");
dampeningSlider.addEventListener("input", (event) => {
  const value = parseFloat(event.target.value);
  freeverb.dampening = value;
});

// create a new player with the audio file
const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").connect(freeverb);

// get references to the start and stop buttons
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

// add event listeners to the buttons
startButton.addEventListener("click", () => {
  // start playing the audio file
  player.start();
});

stopButton.addEventListener("click", () => {
  // stop playing the audio file
  player.stop();
});

// preload the audio file
player.load().then(() => {
  console.log("Audio file loaded");
}).catch((error) => {
  console.error("Error loading audio file:", error);
});


const textt = document.getElementById("textt");
let indexx = 0;
const textArrayy = [
  { textt: "", duration: 10000 },
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
