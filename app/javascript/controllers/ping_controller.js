import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="ping"
export default class extends Controller {
  connect() {
    const textArray = [  "Ping pong delay involves alternating the delay between the left and right channels to create a bouncing ping pong effect.",  "Ping pong delay is commonly used in music production to create a sense of space and movement in the stereo field."];

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


    const drum = new Tone.MembraneSynth().toDestination();

let pingPong;
let isPingPongEnabled = false;

const togglePingPong = () => {
  isPingPongEnabled = !isPingPongEnabled;
  if (isPingPongEnabled) {
    pingPong = new Tone.PingPongDelay("4n", 0.2).toDestination();
    drum.connect(pingPong);
  } else {
    drum.disconnect(pingPong);
    pingPong.dispose();
  }
};

document.querySelector("#playButton").addEventListener("click", () => {
  Tone.start();
  drum.triggerAttackRelease("C4", "32n");
  document.querySelector("#playButton").disabled = true;
  document.querySelector("#stopButton").disabled = false;
});

document.querySelector("#stopButton").addEventListener("click", () => {
  drum.triggerRelease();
  document.querySelector("#playButton").disabled = false;
  document.querySelector("#stopButton").disabled = true;
});

document.querySelector("#pingPongCheckbox").addEventListener("change", togglePingPong);




const textt = document.getElementById("textt");
let indexx = 0;
const textArrayy = [
  { textt: "The ping pong delay effect is like having your music bounce around the room. It adds a three-dimensional quality that can really enhance the listening experience.", duration: 10000 },
  { textt: "Using ping pong delay on vocals gives them a unique character and makes them stand out in the mix. It's a simple yet powerful tool for adding texture and movement to recordings", duration: 10000 }
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
