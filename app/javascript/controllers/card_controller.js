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
  { textt: "“Distortion is a beautiful thing. It's a way of life.” - Slash (Guns N' Roses) ", duration: 10000 },
  { textt: "“I like a heavy guitar, but I like to hear the words too.” - Kurt Cobain (Nirvana) ", duration: 10000 },
  { textt: "“Playing with high gain and feedback is like making love to your amp.” - Zakk Wylde (Black Label Society) ", duration: 10000 }
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
