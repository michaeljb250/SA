import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'


// Connects to data-controller="panner"
export default class extends Controller {
  connect() {
    const textArray = [  "Sound panning is the distribution of sound across a stereo or multi-channel audio system.",  "It allows sounds to be placed at different positions in the stereo field, creating a sense of spatialization and depth.",  "Sound panning is used to enhance the listening experience "];

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

 // Create a new Tone.js Player instance
const player = new Tone.Player("/tunes/tribal.mp3").toDestination();

// Create a new Tone.js Panner instance
const panner = new Tone.Panner(0).toDestination();

// Create a new Tone.js Transport instance
const transport = Tone.Transport;

// Get references to the start and stop buttons
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");

// Get a reference to the panner slider
const pannerSlider = document.getElementById("panner");

// Add event listeners to the start and stop buttons
startButton.addEventListener("click", () => {
  // Start the audio player and panner
  player.start();
  // Start the Tone.js Transport
  transport.start();
});

stopButton.addEventListener("click", () => {
  // Stop the audio player and panner
  player.stop();
  // Stop the Tone.js Transport
  transport.stop();
});

// Add an event listener to the panner slider
pannerSlider.addEventListener("input", () => {
  // Set the panner's pan value based on the slider value
  panner.pan.value = pannerSlider.value;
});

// Connect the player to the panner
player.connect(panner);


    const textt = document.getElementById("textt");
    let indexx = 0;
    const textArrayy = [
      { textt: "Panning is like painting a sonic picture. It allows you to create a three-dimensional space in the mix and bring out different elements in a way that captivates the listener.", duration: 10000 },
      { textt: "Panning is like sculpting with sound. You can shape the mix, carve out space, and guide the listener's attention to different elements by placing them strategically in the stereo field.", duration: 10000 },
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

    window.onunload = function() {
      player.stop();
    };
  }
}
