import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="card"
export default class extends Controller {
  connect() {
    const textArray = [  "Gain refers to the increase or decrease of the signal level of an audio signal, typically measured in decibels (dB).",  "It is commonly used in the context of sound engineering, where the gain control is used to adjust the level of an audio signal before it is processed or amplified.",  "In guitar playing, gain is often associated with distortion. It is used to increase the amplitude of an electric guitar's signal to create a distorted, overdriven sound."];

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

var player = new Tone.Player("/tunes/OS_ES_90_electric_guitar_melody_love_Am.wav");

var distortion = new Tone.Distortion();


player.connect(distortion);

distortion.toDestination();

var startButton = document.getElementById("start");
startButton.addEventListener("click", function() {
  Tone.start();
  player.start();
});

var stopButton = document.getElementById("stop");
stopButton.addEventListener("click", function() {
  player.stop();
});

var distortionSlider = document.getElementById("distortion");
distortionSlider.addEventListener("input", function() {
  var value = parseFloat(distortionSlider.value) / 100;

  distortion.distortion = value;
});

const textt = document.getElementById("textt");
let indexx = 0;
const textArrayy = [
  { textt: "It can certainly be tricky to understand the difference between Gain and Volume, don't worry if you are initially confused", duration: 10000 },
  { textt: "The true definition of gain from the analog audio days is the input level. of the audio signal. In essence, the gain control is what you alter prior to entering other forms of processing", duration: 10000 },
  { textt: "Volume, sometimes referred to as 'amplitude', is a sound system's dB output. Essentially, it is the level of the music coming out of your speakers.", duration: 10000 }
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
