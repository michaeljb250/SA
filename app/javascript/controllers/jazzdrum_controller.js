import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="jazzdrum"
export default class extends Controller {
  connect() {
    const drumSounds = {
      "hi-hat": "/tunes/jazzhat.wav",
      "tom": "/tunes/jazztom.wav",
      "bass": "/tunes/jazzbass.wav",
      "crash": "/tunes/jazzcrash.wav",
      "ride": "/tunes/jazzride.wav",
      // Add more drum sounds here if needed
    };

    const drumGrid = [
      { sound: "hi-hat", steps: [false, false, false, false, false, false, false, false] },
      { sound: "tom", steps: [false, false, false, false, false, false, false, false] },
      { sound: "bass", steps: [false, false, false, false, false, false, false, false] },
      { sound: "crash", steps: [false, false, false, false, false, false, false, false] },
      { sound: "ride", steps: [false, false, false, false, false, false, false, false] },
      // Add more drums here if needed
    ];

    const numDrums = drumGrid.length;
    const numSteps = 8;
    let isPlaying = false;
    let currentStep = 0;
    let tempo = 120;
    let intervalId = null;

    function playDrumSound(soundUrl) {
      const audio = new Audio(soundUrl);
      audio.play();
    }

    function playStep() {
      for (let i = 0; i < numDrums; i++) {
        const drum = drumGrid[i];
        const sound = drum.sound;
        const stepActive = drum.steps[currentStep];
        if (stepActive) {
          const soundUrl = drumSounds[sound];
          playDrumSound(soundUrl);
        }
      }
      currentStep = (currentStep + 1) % numSteps;
    }

    function startPlayback() {
      if (!isPlaying) {
        intervalId = setInterval(playStep, (60 * 1000) / tempo);
        isPlaying = true;
      }
    }

    function stopPlayback() {
      if (isPlaying) {
        clearInterval(intervalId);
        isPlaying = false;
        currentStep = 0;
      }
    }

    function toggleStep(drumIndex, stepIndex) {
      const drum = drumGrid[drumIndex];
      if (drum) {
        drum.steps[stepIndex] = !drum.steps[stepIndex];
      }
    }

    function updateTempoDisplay() {
      const tempoDisplay = document.getElementById("tempo-display");
      tempoDisplay.textContent = tempo;
    }

    document.addEventListener("DOMContentLoaded", function() {
      const drumRows = document.querySelectorAll(".drum-row");
      drumRows.forEach(function(row, drumIndex) {
        const drum = drumGrid[drumIndex];
        const sound = drum.sound;
        const steps = drum.steps;
        row.innerHTML = `
          <div class="drum-name">${sound}</div>
          ${steps
            .map(
              (step, stepIndex) =>
                `<div class="drum-step" data-drum="${drumIndex}" data-step="${stepIndex}"></div>`
            )
            .join("")}
        `;
      });

      const drumSteps = document.querySelectorAll(".drum-step");
      drumSteps.forEach(function(step) {
        step.addEventListener("click", function() {
          const drumIndex = parseInt(step.getAttribute("data-drum"));
          const stepIndex = parseInt(step.getAttribute("data-step"));
          toggleStep(drumIndex, stepIndex);
          step.classList.toggle("active");
        });
      });

      const playPauseButton = document.getElementById("play-pause-button");
      playPauseButton.addEventListener("click", function() {
        if (isPlaying) {
          stopPlayback();
          playPauseButton.textContent = "Play";
        } else {
          startPlayback();
          playPauseButton.textContent = "Pause";
        }
      });

      const tempoSlider = document.getElementById("tempo-slider");
    tempoSlider.addEventListener("input", function() {
    tempo = parseInt(tempoSlider.value);
    updateTempoDisplay();
    if (isPlaying) {
    stopPlayback();
    startPlayback();
    }
    });

    updateTempoDisplay();
    });

    const textArray = [  "Jazz drumming is all about the swing feel. Practice playing swung eighth notes and work on getting a consistent and relaxed swing groove.",  "Listen to and study recordings of jazz drumming legends like Art Blakey, Elvin Jones, Philly Joe Jones, and Tony Williams. ",  "Be open to experimentation and improvisation: Jazz is an improvisational art form, so embrace the spirit of experimentation. Take risks, explore new ideas, and be open to incorporating different genres and influences into your playing."];

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

    // Define your audio tracks here
    const audioTracks = {
      track1: "/tunes/jazzdrum1.wav",
      track2: "/tunes/jazzdrum2.wav",
      track3: "/tunes/jazzdrum3.wav",
    };

    const startBtn = document.getElementById("start-btn");
    const stopBtn = document.getElementById("stop-btn");
    const trackSelect = document.getElementById("track-select");

    let player;

    startBtn.addEventListener("click", async () => {
      const selectedTrack = audioTracks[trackSelect.value];
      if (selectedTrack) {
        await Tone.start();
        player = new Tone.Player(selectedTrack, () => {
          // Audio file is loaded and ready to play
          player.start();
        }).toDestination();
      }
    });

    stopBtn.addEventListener("click", () => {
      if (player) {
        player.stop();
      }
    });

  }
}
