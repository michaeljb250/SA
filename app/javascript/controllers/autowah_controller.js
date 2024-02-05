import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="autowah"
export default class extends Controller {
  connect() {
    const textArray = [  "Autowah, also known as auto-wah, is an audio effect that automatically applies a wah-wah effect to a sound based on the input signal's dynamics. It mimics the sound of a wah-wah pedal, which is commonly used with guitars.",  "Autowah dynamically adjusts the filter frequency or resonance based on the input signal's amplitude, creating a sweeping, wah-like sound that responds to the player's playing intensity.",  " It is often used in funk, rock, and electronic music genres to add rhythmic and expressive tonal variations to instruments."];

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
    url: '/tunes/LEX_SF_79_guitar_loop_electric_moonwalk_Cm.wav',
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
      { textt: "Use auto-wah on rhythmic patterns, such as guitar strumming or funky bass lines, to accentuate specific beats or create a rhythmic 'wah' motion.", duration: 10000 },
      { textt: "Apply it to pads, synths, or even drum loops to create sweeping motion and filter-like effects.", duration: 10000 }
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


    window.addEventListener('unload', function () {
      // Stop the Tone.js audio player here
      Tone.Transport.stop();
      Tone.Transport.cancel();
  });
  }
}
