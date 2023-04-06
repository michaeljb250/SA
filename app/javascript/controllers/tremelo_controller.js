import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="tremelo"
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

    const tremolo = new Tone.Tremolo({
      frequency: 9,
      depth: 0.75,
    }).toDestination();

    // create a player for the audio file
    const player = new Tone.Player({
      url: "https://tonejs.github.io/audio/berklee/gong_1.mp3",
      loop: true,
    }).connect(tremolo);

    // get the DOM elements
    const playButton = document.getElementById("play");
    const stopButton = document.getElementById("stop");
    const tremoloButton = document.getElementById("tremolo");

    // add event listeners
    playButton.addEventListener("click", () => {
      if (player.state !== "started") {
        player.start();
      }
    });

    stopButton.addEventListener("click", () => {
      if (player.state === "started") {
        player.stop();
      }
    });

    let tremoloOn = true;
    tremoloButton.addEventListener("click", () => {
      tremoloOn = !tremoloOn;
      if (tremoloOn) {
        tremolo.start();
      } else {
        tremolo.stop();
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
