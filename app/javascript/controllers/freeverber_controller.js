import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'


// Connects to data-controller="delay"
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

    const player = new Tone.Player({
      url: "/tunes/OS_MLW_85_electric_guitar_chords_sunset_Cm.wav",
      loop: true,
      autostart: false
    }).toDestination();

    const delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();

    let delayOn = false;

    document.getElementById("start-btn").addEventListener("click", () => {
      player.start();
    });

    document.getElementById("stop-btn").addEventListener("click", () => {
      player.stop();
    });

    document.getElementById("delay-btn").addEventListener("click", () => {
      if (delayOn) {
        player.disconnect(delay);
        delayOn = false;
      } else {
        player.connect(delay);
        delayOn = true;
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
