import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="eq"
export default class extends Controller {
  connect() {

    const textArray = [  "Audio EQ, or equalization, is the process of adjusting the balance between different frequency components of an audio signal.",  "It is used to enhance or reduce specific frequencies, such as boosting bass or cutting out unwanted noise."];

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

    const audioFile = '/tunes/SNS_SD_110_guitar_bubble_boy_Bmaj(1).wav';
const player = new Tone.Player(audioFile).toDestination();
const eq3 = new Tone.EQ3().toDestination();
const lowGainSlider = document.getElementById('low-gain-slider');
const midGainSlider = document.getElementById('mid-gain-slider');
const highGainSlider = document.getElementById('high-gain-slider');

// Set the initial gain values for the EQ3 object
eq3.low.value = 0;
eq3.mid.value = 0;
eq3.high.value = 0;

// Add event listeners to the sliders to update the gain values of the EQ3 object
lowGainSlider.addEventListener('input', (event) => {
  eq3.low.value = event.target.value;
});
midGainSlider.addEventListener('input', (event) => {
  eq3.mid.value = event.target.value;
});
highGainSlider.addEventListener('input', (event) => {
  eq3.high.value = event.target.value;
});

document.getElementById('start-btn').addEventListener('click', () => {
  player.connect(eq3); // Connect the player to the EQ3 object
  player.start();
});

document.getElementById('stop-btn').addEventListener('click', () => {
  player.stop();
});


    const textt = document.getElementById("textt");
    let indexx = 0;
    const textArrayy = [
      { textt: "'Equalization is the art of finding the sweet spot for each instrument. It's about bringing out the character and personality of a sound by highlighting the frequencies that make it shine.' - Chris Lord-Alge", duration: 10000 },
      { textt: "'Equalization is a powerful tool, but it should be used with precision and intention. Don't just EQ for the sake of EQing; make sure every adjustment serves a purpose and enhances the overall sonic experience.' - Mick Guzauski", duration: 10000 },
      { textt: "'EQ is not just a technical process; it's an art form. It's about understanding the emotion and intention behind the music and using EQ to amplify and enhance those elements.' - Manny Marroquin", duration: 10000 }
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
