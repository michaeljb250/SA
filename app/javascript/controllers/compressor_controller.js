import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="compressor"
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

    // create the audio context
const context = new AudioContext();

// create the gain node with default settings
const gainNode = new GainNode(context, { gain: 1 });

// create the compressor node with default settings
const compressor = new DynamicsCompressorNode(context);

// connect the nodes in the audio graph
gainNode.connect(compressor).connect(context.destination);

// load the audio file
fetch('https://tonejs.github.io/audio/berklee/gong_1.mp3')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    let bufferSource;

    // create the envelope with initial settings
    let attack = 0.1;
    let release = 0.5;
    const envelope = new GainNode(context, { gain: 0 });

    // create the event listener for the start button
    document.querySelector("#start-btn").addEventListener("click", () => {
      // check if the buffer source is already playing
      if (bufferSource && bufferSource.isPlaying) {
        // stop the buffer source
        bufferSource.stop();

        // reset the envelope gain to 0
        envelope.gain.linearRampToValueAtTime(0, context.currentTime + 0.001);
      }

      // create the buffer source with the audio file
      bufferSource = new AudioBufferSourceNode(context, { buffer: audioBuffer });

      // set the attack and release times
      attack = parseFloat(document.querySelector("#attack-slider").value);
      release = parseFloat(document.querySelector("#release-slider").value);

      // connect the buffer source to the envelope and gain nodes
      bufferSource.connect(envelope).connect(gainNode);

      // start the buffer source
      bufferSource.start();

      // set the envelope attack and release times
      envelope.gain.setValueAtTime(0, context.currentTime);
      envelope.gain.linearRampToValueAtTime(1, context.currentTime + attack);
      envelope.gain.linearRampToValueAtTime(0, context.currentTime + attack + release);

      bufferSource.isPlaying = true;
    });

    // create the event listener for the stop button
    document.querySelector("#stop-btn").addEventListener("click", () => {
      // check if the buffer source is playing
      if (bufferSource && bufferSource.isPlaying) {
        // stop the buffer source
        bufferSource.stop();

        // reset the envelope gain to 0
        envelope.gain.linearRampToValueAtTime(0, context.currentTime + 0.001);

        bufferSource.isPlaying = false;
      }
    });

    // create the event listener for the attack slider
    document.querySelector("#attack-slider").addEventListener("input", () => {
      attack = parseFloat(document.querySelector("#attack-slider").value);
    });

    // create the event listener for the release slider
    document.querySelector("#release-slider").addEventListener("input", () => {
      release = parseFloat(document.querySelector("#release-slider").value);
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
