import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="pass"
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

    window.addEventListener("DOMContentLoaded", () => {
      const player = document.createElement("div");
      player.id = "player";
      document.body.appendChild(player);

      const lowpassSlider = document.getElementById("lowpass-slider");
      const highpassSlider = document.getElementById("highpass-slider");
      const startBtn = document.getElementById("start-btn");
      const stopBtn = document.getElementById("stop-btn");

      const lowpassFilter = new Tone.Filter({
        type: "lowpass",
        frequency: 20000,
      }).toDestination();

      const highpassFilter = new Tone.Filter({
        type: "highpass",
        frequency: 10,
      }).connect(lowpassFilter);

      const playerSource = new Tone.Player({
        url: "https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3",
        loop: true,
      }).connect(highpassFilter);

      lowpassSlider.addEventListener("input", (event) => {
        lowpassFilter.frequency.value = event.target.value;
      });

      highpassSlider.addEventListener("input", (event) => {
        highpassFilter.frequency.value = event.target.value;
      });

      startBtn.addEventListener("click", () => {
        Tone.start();
        playerSource.start();
      });

      stopBtn.addEventListener("click", () => {
        playerSource.stop();
      });
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
