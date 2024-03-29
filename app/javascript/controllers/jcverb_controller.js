import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="jcverb"
export default class extends Controller {
  connect() {
    const textArray = [  "JCverb is a reverberator which uses a combination of filters to create a distinctive sound"];

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


// Create the audio player
const player = new Tone.Player("/tunes/LEX_SF_79_guitar_loop_electric_moonwalk_Cm.wav").toDestination();

// Create the reverb effect
const reverb = new Tone.JCReverb().toDestination();

// Connect the player to the reverb effect
player.connect(reverb);

// Set up the start button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  player.start();
});

// Set up the stop button
const stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", () => {
  player.stop();
});

// Set up the reverb button
const reverbButton = document.getElementById("reverbButton");
let reverbOn = false;
reverbButton.addEventListener("click", () => {
  reverbOn = !reverbOn;
  if (reverbOn) {
    player.disconnect();
    player.connect(reverb);
  } else {
    player.disconnect();
    player.toDestination();
  }
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
