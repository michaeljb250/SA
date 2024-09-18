import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="vibrato"
export default class extends Controller {
  connect() {

    const textArray = [  "Vibrato creates a subtle variation in pitch, oscillating above and below the original pitch.",  "It is commonly used in music to add expressiveness and warmth to a sustained note or melody."];

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


// Load audio file
const audioFile = "/tunes/SNS_SD_110_guitar_bubble_boy_Bmaj(1).wav";
const player = new Tone.Player(audioFile).toDestination();

// Define buttons
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const vibratoBtn = document.getElementById("vibrato-btn");

// Define vibrato effect
const vibrato = new Tone.Vibrato({
  frequency: 5,
  depth: 0.5,
}).toDestination();

// Connect player to vibrato effect
player.connect(vibrato);

// Event listeners for buttons
startBtn.addEventListener("click", () => {
  player.start();
});

stopBtn.addEventListener("click", () => {
  player.stop();
});

let isVibratoOn = false;
vibratoBtn.addEventListener("click", () => {
  if (isVibratoOn) {
    vibrato.depth.value = 0; // Turn off vibrato by setting depth to 0
    vibratoBtn.textContent = "Turn Vibrato On";
    isVibratoOn = false;
  } else {
    vibrato.depth.value = 0.5; // Turn on vibrato by setting depth to 0.5
    vibratoBtn.textContent = "Turn Vibrato Off";
    isVibratoOn = true;
  }
});

const textt = document.getElementById("textt");
    let indexx = 0;
    const textArrayy = [
      { textt: "Apply vibrato to string instruments like violin, cello, or guitar to add expressiveness to sustained notes.", duration: 10000 },
      { textt: "Employ vibrato on woodwind and brass instruments to emulate the natural expressiveness of human voice and string instruments.", duration: 10000 },
      { textt: "Practice control over the depth and speed of vibrato to suit the musical context. A gentle vibrato may be suitable for subtle embellishments, while a more pronounced vibrato can be used for dramatic and expressive moment", duration: 10000 }
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
