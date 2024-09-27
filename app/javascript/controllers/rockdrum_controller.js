
// import { Controller } from "@hotwired/stimulus";
// import * as Tone from 'tone';

// // Connects to data-controller="rockdrum"
// export default class extends Controller {
//   connect() {
//     const drumSounds = {
//       "kick": "/tunes/kick.wav",
//       "hi-hat": "/tunes/rockhat.wav",
//       "snare": "/tunes/rocksnare.wav",
//       "tom": "/tunes/rocktom.wav",
//       "crash": "/tunes/rockcrash.wav",
//     };

//     const drumGrid = [
//       { sound: "kick", steps: Array(16).fill(false) },
//       { sound: "hi-hat", steps: Array(16).fill(false) },
//       { sound: "snare", steps: Array(16).fill(false) },
//       { sound: "tom", steps: Array(16).fill(false) },
//       { sound: "crash", steps: Array(16).fill(false) },
//     ];

//     let isPlaying = false;
//     let currentStep = 0;
//     let tempo = 120;
//     let intervalId = null;

//     // Set up the drum grid in the DOM
//     const drumRows = this.element.querySelectorAll(".drum-row");
//     drumRows.forEach((row, drumIndex) => {
//       const drum = drumGrid[drumIndex];
//       row.innerHTML = `
//         <div class="drum-name">${drum.sound}</div>
//         ${drum.steps.map((step, stepIndex) =>
//           `<div class="drum-step" data-drum="${drumIndex}" data-step="${stepIndex}"></div>`
//         ).join("")}
//       `;
//     });

//     // Handle step clicks to toggle steps
//     const drumSteps = this.element.querySelectorAll(".drum-step");
//     drumSteps.forEach(step => {
//       step.addEventListener("click", () => {
//         const drumIndex = parseInt(step.getAttribute("data-drum"));
//         const stepIndex = parseInt(step.getAttribute("data-step"));
//         drumGrid[drumIndex].steps[stepIndex] = !drumGrid[drumIndex].steps[stepIndex];
//         step.classList.toggle("active");
//       });
//     });

//     function playDrumSound(soundUrl) {
//       const audio = new Audio(soundUrl);
//       audio.play();
//     }

//     function playStep() {
//       drumGrid.forEach((drum) => {
//         if (drum.steps[currentStep]) {
//           playDrumSound(drumSounds[drum.sound]);
//         }
//       });
//       currentStep = (currentStep + 1) % 16;
//     }

//     function startPlayback() {
//       if (!isPlaying) {
//         intervalId = setInterval(playStep, (60 * 1000) / tempo);
//         isPlaying = true;
//       }
//     }

//     function stopPlayback() {
//       if (isPlaying) {
//         clearInterval(intervalId);
//         isPlaying = false;
//         currentStep = 0;
//       }
//     }

//     // Play/pause button
//     const playPauseButton = this.element.querySelector("#play-pause-button");
//     playPauseButton.addEventListener("click", () => {
//       if (isPlaying) {
//         stopPlayback();
//         playPauseButton.textContent = "Play";
//       } else {
//         startPlayback();
//         playPauseButton.textContent = "Pause";
//       }
//     });

//     // Tempo slider
//     const tempoSlider = this.element.querySelector("#tempo-slider");
//     tempoSlider.addEventListener("input", () => {
//       tempo = parseInt(tempoSlider.value);
//       document.getElementById("tempo-display").textContent = tempo;
//       if (isPlaying) {
//         stopPlayback();
//         startPlayback();
//       }
//     });

//     // Text typing animation
//     const textArray = [
//       "The kick is normally the foundation and the pulse, played on the 1st and 3rd note.",
//       "Hi-Hats are also important; try playing them on all notes and adapt from there.",
//       "Explore incorporating offbeat accents, ghost notes, and displaced snare hits to create syncopated patterns."
//     ];

//     let textIndex = 0;
//     let charIndex = 0;

//     function type() {
//       const currentText = textArray[textIndex];
//       if (charIndex < currentText.length) {
//         document.getElementById("text").innerHTML += currentText.charAt(charIndex);
//         charIndex++;
//         setTimeout(type, 50);
//       }
//     }

//     function nextText() {
//       if (textIndex < textArray.length - 1) {
//         textIndex++;
//         charIndex = 0;
//         document.getElementById("text").innerHTML = "";
//         type();
//       }
//     }

//     function prevText() {
//       if (textIndex > 0) {
//         textIndex--;
//         charIndex = 0;
//         document.getElementById("text").innerHTML = "";
//         type();
//       }
//     }

//     document.getElementById("next-btn").addEventListener("click", nextText);
//     document.getElementById("back-btn").addEventListener("click", prevText);

//     type(); // Start typing text animation

//     // Handle backing track playback
//     const audioTracks = {
//       track1: "/tunes/rockoloop1.wav",
//       track2: "/tunes/rockoloop2.wav",
//       track3: "/tunes/rockoloop3.wav",
//     };

//     const startBtn = document.getElementById("start-btn");
//     const stopBtn = document.getElementById("stop-btn");
//     const trackSelect = document.getElementById("track-select");

//     let player;

//     startBtn.addEventListener("click", async () => {
//       const selectedTrack = audioTracks[trackSelect.value];
//       if (selectedTrack) {
//         await Tone.start();
//         player = new Tone.Player(selectedTrack, () => {
//           player.start();
//         }).toDestination();
//       }
//     });

//     stopBtn.addEventListener("click", () => {
//       if (player) {
//         player.stop();
//       }
//     });
//   }
// }
import { Controller } from "@hotwired/stimulus";
import * as Tone from 'tone';

// Connects to data-controller="rockdrum"
export default class extends Controller {
  connect() {
    const drumSounds = {
      "kick": "/tunes/kick.wav",
      "hi-hat": "/tunes/rockhat.wav",
      "snare": "/tunes/rocksnare.wav",
      "tom": "/tunes/rocktom.wav",
      "crash": "/tunes/rockcrash.wav",
    };

    const drumGrid = [
      { sound: "kick", steps: Array(16).fill(false) },
      { sound: "hi-hat", steps: Array(16).fill(false) },
      { sound: "snare", steps: Array(16).fill(false) },
      { sound: "tom", steps: Array(16).fill(false) },
      { sound: "crash", steps: Array(16).fill(false) },
    ];

    let isPlaying = false;
    let currentStep = 0;
    let tempo = 120;
    let intervalId = null;
    let player = null;

    // Set up the drum grid in the DOM
    const drumRows = this.element.querySelectorAll(".drum-row");
    drumRows.forEach((row, drumIndex) => {
      const drum = drumGrid[drumIndex];
      row.innerHTML = `
        <div class="drum-name">${drum.sound}</div>
        ${drum.steps.map((step, stepIndex) =>
          `<div class="drum-step" data-drum="${drumIndex}" data-step="${stepIndex}"></div>`
        ).join("")}
      `;
    });

    // Handle step clicks to toggle steps
    const drumSteps = this.element.querySelectorAll(".drum-step");
    drumSteps.forEach(step => {
      step.addEventListener("click", () => {
        const drumIndex = parseInt(step.getAttribute("data-drum"));
        const stepIndex = parseInt(step.getAttribute("data-step"));
        drumGrid[drumIndex].steps[stepIndex] = !drumGrid[drumIndex].steps[stepIndex];
        step.classList.toggle("active");
      });
    });

    function playDrumSound(soundUrl) {
      const audio = new Audio(soundUrl);
      audio.play();
    }

    function playStep() {
      drumGrid.forEach((drum) => {
        if (drum.steps[currentStep]) {
          playDrumSound(drumSounds[drum.sound]);
        }
      });
      currentStep = (currentStep + 1) % 16;
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

    const playPauseButton = this.element.querySelector("#play-pause-button");
    playPauseButton.addEventListener("click", () => {
      if (isPlaying) {
        stopPlayback();
        playPauseButton.textContent = "Play";
      } else {
        startPlayback();
        playPauseButton.textContent = "Pause";
      }
    });

    const tempoSlider = this.element.querySelector("#tempo-slider");
    tempoSlider.addEventListener("input", () => {
      tempo = parseInt(tempoSlider.value);
      document.getElementById("tempo-display").textContent = tempo;
      if (isPlaying) {
        stopPlayback();
        startPlayback();
      }
    });

    // Text typing animation and navigation
    const textArray = [
      "The kick is normally the foundation and the pulse, played on the 1st and 3rd note.",
      "Hi-Hats are also important; try playing them on all notes and adapt from there.",
      "Explore incorporating offbeat accents, ghost notes, and displaced snare hits to create syncopated patterns."
    ];

    let textIndex = 0;
    let charIndex = 0;

    function type() {
      const currentText = textArray[textIndex];
      if (charIndex < currentText.length) {
        document.getElementById("text").innerHTML += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(type, 50);
      }
    }

    function nextText() {
      if (textIndex < textArray.length - 1) {
        textIndex++;
        charIndex = 0;
        document.getElementById("text").innerHTML = "";
        type();
      }
    }

    function prevText() {
      if (textIndex > 0) {
        textIndex--;
        charIndex = 0;
        document.getElementById("text").innerHTML = "";
        type();
      }
    }

    document.getElementById("next-btn").addEventListener("click", nextText);
    document.getElementById("back-btn").addEventListener("click", prevText);

    type(); // Start typing text animation

    // Handle backing track playback
    const audioTracks = {
      track1: "/tunes/rockoloop1.wav",
      track2: "/tunes/rockoloop2.wav",
      track3: "/tunes/rockoloop3.wav",
    };

    const startBtn = document.getElementById("start-btn");
    const stopBtn = document.getElementById("stop-btn");
    const trackSelect = document.getElementById("track-select");

    startBtn.addEventListener("click", async () => {
      const selectedTrack = audioTracks[trackSelect.value];
      if (selectedTrack) {
        await Tone.start();
        player = new Tone.Player(selectedTrack, () => {
          player.start();
        }).toDestination();
      }
    });

    stopBtn.addEventListener("click", () => {
      if (player) {
        player.stop();
        player.dispose();  // Properly dispose of the Tone.js player
      }
    });

    // Stop all audio and playback when navigating away
    const stopAllAudio = () => {
      stopPlayback();
      if (player) {
        player.stop();
        player.dispose();  // Clean up Tone.js Player
      }
      Tone.Transport.stop(); // Stop any ongoing Tone.js transport activity
    };

    document.addEventListener("turbo:before-visit", stopAllAudio);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAllAudio();
      }
    });
  }

  disconnect() {
    // Ensure everything stops on disconnect
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Ensure player stops and is disposed
    if (this.player) {
      this.player.stop();
      this.player.dispose();  // Clean up Tone.js Player
    }

    Tone.Transport.stop(); // Stop any ongoing Tone.js transport activity
  }
}
