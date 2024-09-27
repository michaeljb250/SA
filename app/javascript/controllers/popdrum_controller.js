// import { Controller } from "@hotwired/stimulus"
// import * as Tone from 'tone'

// // Connects to data-controller="popdrum"
// export default class extends Controller {
//   connect() {
//     const drumSounds = {
//       "open-hat": "/tunes/popo1.wav",
//       "cymbal": "/tunes/popo2.wav",
//       "snare": "/tunes/popo3.wav",
//       "closed-hat": "/tunes/popo4.wav",
//       "kick": "/tunes/popo5.wav",

//       // Add more drum sounds here if needed
//     };

//     const drumGrid = [
//       { sound: "open-hat", steps: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false] },
//       { sound: "cymbal", steps: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false] },
//       { sound: "snare", steps: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false] },
//       { sound: "closed-hat", steps: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false] },
//       { sound: "kick", steps: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false] },
//       // Add more drums here if needed
//     ];

//     const numDrums = drumGrid.length;
//     const numSteps = 16;
//     let isPlaying = false;
//     let currentStep = 0;
//     let tempo = 120;
//     let intervalId = null;

//     function playDrumSound(soundUrl) {
//       const audio = new Audio(soundUrl);
//       audio.play();
//     }

//     function playStep() {
//       for (let i = 0; i < numDrums; i++) {
//         const drum = drumGrid[i];
//         const sound = drum.sound;
//         const stepActive = drum.steps[currentStep];
//         if (stepActive) {
//           const soundUrl = drumSounds[sound];
//           playDrumSound(soundUrl);
//         }
//       }
//       currentStep = (currentStep + 1) % numSteps;
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

//     function toggleStep(drumIndex, stepIndex) {
//       const drum = drumGrid[drumIndex];
//       if (drum) {
//         drum.steps[stepIndex] = !drum.steps[stepIndex];
//       }
//     }

//     function updateTempoDisplay() {
//       const tempoDisplay = document.getElementById("tempo-display");
//       tempoDisplay.textContent = tempo;
//     }

//     document.addEventListener("DOMContentLoaded", function() {
//       const drumRows = document.querySelectorAll(".drum-row");
//       drumRows.forEach(function(row, drumIndex) {
//         const drum = drumGrid[drumIndex];
//         const sound = drum.sound;
//         const steps = drum.steps;
//         row.innerHTML = `
//           <div class="drum-name">${sound}</div>
//           ${steps
//             .map(
//               (step, stepIndex) =>
//                 `<div class="drum-step" data-drum="${drumIndex}" data-step="${stepIndex}"></div>`
//             )
//             .join("")}
//         `;
//       });

//       const drumSteps = document.querySelectorAll(".drum-step");
//       drumSteps.forEach(function(step) {
//         step.addEventListener("click", function() {
//           const drumIndex = parseInt(step.getAttribute("data-drum"));
//           const stepIndex = parseInt(step.getAttribute("data-step"));
//           toggleStep(drumIndex, stepIndex);
//           step.classList.toggle("active");
//         });
//       });

//       const playPauseButton = document.getElementById("play-pause-button");
//       playPauseButton.addEventListener("click", function() {
//         if (isPlaying) {
//           stopPlayback();
//           playPauseButton.textContent = "Play";
//         } else {
//           startPlayback();
//           playPauseButton.textContent = "Pause";
//         }
//       });

//       const tempoSlider = document.getElementById("tempo-slider");
//     tempoSlider.addEventListener("input", function() {
//     tempo = parseInt(tempoSlider.value);
//     updateTempoDisplay();
//     if (isPlaying) {
//     stopPlayback();
//     startPlayback();
//     }
//     });

//     updateTempoDisplay();
//     });

//     const textArray = [  "Pop music often thrives on simplicity and catchiness. Keep your drum patterns straightforward... or don't ",  "Alternating between closed hi-hats and open hi-hats on beats 1 and 3 can create dynamics and accents in the groove.",  "The snare often occupies beat 2 and 4, while the kick operates on the 1 and 3 on slower ballads, or all notes on faster tunes."];

//     let index = 0;
//     let textIndex = 0;

//     function type() {
//       const currentText = textArray[textIndex];
//       if (index < currentText.length) {
//         document.getElementById("text").innerHTML += currentText.charAt(index);
//         index++;
//         setTimeout(type, 50);
//       }
//     }

//     function nextText() {
//       textIndex++;
//       index = 0;
//       document.getElementById("text").innerHTML = "";
//       type();
//     }

//     function prevText() {
//       textIndex--;
//       index = 0;
//       document.getElementById("text").innerHTML = "";
//       type();
//     }

//     document.getElementById("next-btn").addEventListener("click", () => {
//       if (textIndex < textArray.length - 1) {
//         nextText();
//       }
//     });

//     document.getElementById("back-btn").addEventListener("click", () => {
//       if (textIndex > 0) {
//         prevText();
//       }
//     });

//     type();

//     // Define your audio tracks here
//     const audioTracks = {
//       track1: "/tunes/popdrumo1.mp3",
//       track2: "/tunes/popdrumo2.mp3",
//       track3: "/tunes/popdrumo3.mp3",
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
//           // Audio file is loaded and ready to play
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

// Connects to data-controller="popdrum"
export default class extends Controller {
  connect() {
    const drumSounds = {
      "open-hat": "/tunes/popo1.wav",
      "cymbal": "/tunes/popo2.wav",
      "snare": "/tunes/popo3.wav",
      "closed-hat": "/tunes/popo4.wav",
      "kick": "/tunes/popo5.wav",
    };

    const drumGrid = [
      { sound: "open-hat", steps: Array(16).fill(false) },
      { sound: "cymbal", steps: Array(16).fill(false) },
      { sound: "snare", steps: Array(16).fill(false) },
      { sound: "closed-hat", steps: Array(16).fill(false) },
      { sound: "kick", steps: Array(16).fill(false) },
    ];

    let isPlaying = false;
    let currentStep = 0;
    let tempo = 120;
    let intervalId = null;

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

    function toggleStep(drumIndex, stepIndex) {
      drumGrid[drumIndex].steps[stepIndex] = !drumGrid[drumIndex].steps[stepIndex];
    }

    function updateTempoDisplay() {
      const tempoDisplay = document.getElementById("tempo-display");
      tempoDisplay.textContent = tempo;
    }

    document.addEventListener("DOMContentLoaded", function() {
      const drumRows = document.querySelectorAll(".drum-row");
      drumRows.forEach((row, drumIndex) => {
        const drum = drumGrid[drumIndex];
        row.innerHTML = `
          <div class="drum-name">${drum.sound}</div>
          ${drum.steps.map((step, stepIndex) =>
            `<div class="drum-step" data-drum="${drumIndex}" data-step="${stepIndex}"></div>`
          ).join("")}
        `;
      });

      const drumSteps = document.querySelectorAll(".drum-step");
      drumSteps.forEach(step => {
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

    const textArray = [
      "Pop music often thrives on simplicity and catchiness. Keep your drum patterns straightforward... or don't.",
      "Alternating between closed hi-hats and open hi-hats on beats 1 and 3 can create dynamics and accents in the groove.",
      "The snare often occupies beat 2 and 4, while the kick operates on the 1 and 3 on slower ballads, or all notes on faster tunes."
    ];

    let textIndex = 0;
    let index = 0;

    function type() {
      const currentText = textArray[textIndex];
      if (index < currentText.length) {
        document.getElementById("text").innerHTML += currentText.charAt(index);
        index++;
        setTimeout(type, 50);
      }
    }

    function nextText() {
      if (textIndex < textArray.length - 1) {
        textIndex++;
        index = 0;
        document.getElementById("text").innerHTML = "";
        type();
      }
    }

    function prevText() {
      if (textIndex > 0) {
        textIndex--;
        index = 0;
        document.getElementById("text").innerHTML = "";
        type();
      }
    }

    document.getElementById("next-btn").addEventListener("click", nextText);
    document.getElementById("back-btn").addEventListener("click", prevText);

    type();

    // Define your audio tracks here
    const audioTracks = {
      track1: "/tunes/popdrumo1.mp3",
      track2: "/tunes/popdrumo2.mp3",
      track3: "/tunes/popdrumo3.mp3",
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
