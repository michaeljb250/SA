import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="phaser"
export default class extends Controller {
  connect() {
    const textArray = [  "Audio phaser is an effect that creates notches and peaks in the frequency spectrum of an audio signal.",  "It is achieved by splitting the signal into two or more paths, ",  "Audio phaser is commonly used in music production to add movement and texture to sounds, particularly guitars and synthesizers."];

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

    const phaser = new Tone.Phaser({
      frequency: 15,
      octaves: 5,
      baseFrequency: 1000
    }).toDestination();
    const synth = new Tone.FMSynth().connect(phaser);

    // Create phaser slider and set initial frequency value
    const phaserSlider = document.getElementById("phaser-slider");
    let frequency = phaser.frequency.value;
    phaserSlider.value = frequency;

    // Add event listeners to start and stop buttons
    document.getElementById("start-btn").addEventListener("click", () => {
      synth.triggerAttackRelease("E3", "50");
    });

    document.getElementById("stop-btn").addEventListener("click", () => {
      synth.triggerRelease();
    });

    // Add event listener to phaser slider to change frequency value
    phaserSlider.addEventListener("input", () => {
      frequency = parseFloat(phaserSlider.value);
      phaser.frequency.value = frequency;
    });



    const textt = document.getElementById("textt");
    let indexx = 0;
    const textArrayy = [
      { textt: "A well-placed phaser can add an otherworldly vibe to your sound", duration: 10000 },
      { textt: "Phaser can transform a dry, static sound into a dynamic audio track.", duration: 10000 },
      { textt: "", duration: 10000 }
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
