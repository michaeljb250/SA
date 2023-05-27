import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="limiter"
export default class extends Controller {
  connect() {
    const textArray = [  "A limiter is an audio processor used to control the peak levels of a sound signal.",  "A limiter works by reducing the gain or amplification of the audio signal when it exceeds the set threshold, preventing distortion and maintaining a more consistent and controlled output level"];

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

    const limiter = new Tone.Limiter(-100).toDestination();
    const oscillator = new Tone.Oscillator().connect(limiter);

    // Create limiter slider and set initial threshold value
    const limiterSlider = document.getElementById("limiter-slider");
    let threshold = limiter.threshold.value;
    limiterSlider.value = threshold;

    // Add event listeners to start and stop buttons
    document.getElementById("start-btn").addEventListener("click", () => {
      oscillator.start();
    });

    document.getElementById("stop-btn").addEventListener("click", () => {
      oscillator.stop();
    });

    // Add event listener to limiter slider to change threshold value
    limiterSlider.addEventListener("input", () => {
      threshold = parseFloat(limiterSlider.value);
      limiter.threshold.value = threshold;
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
