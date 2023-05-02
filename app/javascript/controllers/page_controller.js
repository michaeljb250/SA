import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'
// Connects to data-controller="page"
export default class extends Controller {
  connect() {
    var letters = document.getElementsByClassName("logo-letter");
    for (var i = 0; i < letters.length; i++) {
      letters[i].addEventListener("animationend", function() {
        this.style.animation = "bounce 0.6s ease-in-out forwards";
      });
    }
  // Load Tone.js
  const player = new Tone.Player();

  // Load the audio file
  const audioUrl = "https://tonejs.github.io/audio/berklee/gong_1.mp3";
  player.load(audioUrl);

  // Define the function to play audio
  function playAudio() {
    Tone.start();
    player.toDestination().start();
  }

  // Wait for 5 seconds before showing the button
  setTimeout(() => {
    document.getElementById("button-container").style.display = "flex";
  }, 4000);

  }
}
