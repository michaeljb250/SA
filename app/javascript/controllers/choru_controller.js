import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="choru"
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

    const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();

    // Create chorus effect
    const chorus = new Tone.Chorus({
      frequency: 1.5,
      delayTime: 3.5,
      depth: 0.7,
      wet: 0.5,
    }).toDestination();

    // Connect player to chorus effect
    player.connect(chorus);

    // Get start/stop buttons and chorus effect slider
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const chorusSlider = document.getElementById("chorusSlider");

    // Set initial value for chorus effect level
    let chorusLevel = 0.5;

    // Listen for changes to chorus effect slider
    chorusSlider.addEventListener("input", (event) => {
      // Update chorus effect level
      chorusLevel = parseFloat(event.target.value);
      // Update chorus effect wet/dry mix based on new level
      chorus.wet.value = chorusLevel;
    });

    // Listen for click on start button
    startButton.addEventListener("click", () => {
      // Start audio player and chorus effect
      player.start();
      chorus.start();
    });

    // Listen for click on stop button
    stopButton.addEventListener("click", () => {
      // Stop audio player and chorus effect
      player.stop();
      chorus.stop();
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
    document.getElementById('chorusSlider').addEventListener('input', e => {
      Tone.Transport.bpm.rampTo(+e.target.value, 0.1)
      document.documentElement.style.setProperty('--bg-color', `hsl(${e.target.value / 4}, 70%, 60%)`);
    })
  }
}
