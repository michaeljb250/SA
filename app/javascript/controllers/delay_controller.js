import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'


// Connects to data-controller="delay"
export default class extends Controller {
  connect() {
    const textArray = [  "Delay refers to a time delay between the input and output of an audio signal.",  "It can used as an effect in music production to create echoes or other time-based effects."];

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
      { textt: "The audio delay effect is great for giving the music a more immersive quality.", duration: 10000 },
      { textt: "'Delay is a versatile effect that can be used subtly to add a touch of warmth and depth, or it can be pushed to the extremes to create mind-bending sonic landscapes.' - David Gilmour (Pink Floyd)", duration: 10000 },
      { textt: "'The beauty of the audio delay effect is that it can turn a simple guitar riff or vocal line into something truly captivating. It adds a sense of depth and intrigue that draws the listener in.' - John Mayer", duration: 10000 }
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

    window.addEventListener('beforeunload', function () {
      // Stop the Tone.js audio player here
      Tone.Transport.stop();
      Tone.Transport.cancel();
  });
  }
}
