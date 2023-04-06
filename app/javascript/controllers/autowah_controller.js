import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="autowah"
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

    const playButton = document.getElementById('playButton');
const stopButton = document.getElementById('stopButton');
const autoWahButton = document.getElementById('autoWahButton');
const audio = document.getElementById('audio');

// Initialize Tone.js context and autowah effect
const context = new Tone.Context();
const autowah = new Tone.AutoWah().toDestination();

// Initialize audio player and connect to autowah effect
const player = new Tone.Player({
    url: 'https://tonejs.github.io/audio/berklee/gong_1.mp3',
    loop: true
}).connect(autowah);

// Play and stop audio player
playButton.addEventListener('click', () => {
    Tone.start();
    player.start();
});

stopButton.addEventListener('click', () => {
    player.stop();
});

// Turn on and off autowah effect
let autowahOn = false;
autoWahButton.addEventListener('click', () => {
    autowahOn = !autowahOn;
    if (autowahOn) {
        player.disconnect();
        player.connect(autowah);
        autoWahButton.textContent = 'AutoWah On';
    } else {
        player.disconnect();
        player.toDestination();
        autoWahButton.textContent = 'AutoWah Off';
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
