import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="compressor"
export default class extends Controller {
  connect() {

    const audioFile = "https://tonejs.github.io/audio/berklee/gong_1.mp3";

const player = new Tone.Player(audioFile).toDestination();
player.autostart = false;

const multibandCompressor = new Tone.MultibandCompressor({
  low: {
    threshold: -24,
  },
  mid: {
    threshold: -18,
  },
  high: {
    threshold: -12,
  },
}).toDestination();

// Set up the sliders
const lowSlider = document.getElementById("lowSlider");
const midSlider = document.getElementById("midSlider");
const highSlider = document.getElementById("highSlider");

// Add event listeners to update the multiband compressor thresholds when the sliders are moved
lowSlider.addEventListener("input", (event) => {
  multibandCompressor.low.threshold.value = parseFloat(event.target.value);
});

midSlider.addEventListener("input", (event) => {
  multibandCompressor.mid.threshold.value = parseFloat(event.target.value);
});

highSlider.addEventListener("input", (event) => {
  multibandCompressor.high.threshold.value = parseFloat(event.target.value);
});

// Add event listeners to start and stop the player
document.getElementById("start").addEventListener("click", () => {
  if (player.state !== "started") {
    player.connect(multibandCompressor);
    player.start();
  }
});

document.getElementById("stop").addEventListener("click", () => {
  player.stop();
});

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

 }
}
