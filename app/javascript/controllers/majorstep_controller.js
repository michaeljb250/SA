import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'


// Connects to data-controller="majorstep"
export default class extends Controller {
  connect() {
    // Initialize Tone.js
Tone.start();

// C Major Scale Notes
const cMajorScale = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

// Create buttons dynamically
const buttonsContainer = document.getElementById("buttons-container");

cMajorScale.forEach((note, index) => {
    const button = document.createElement("button");

    // Set button text to note name
    button.textContent = note;

    // Calculate interval (half or whole step)
    const interval = index < cMajorScale.length - 1 ? getInterval(note, cMajorScale[index + 1]) : null;

    // Set spacing based on interval
    if (interval === "W") {
        button.style.marginRight = "1em";
    } else if (interval === "H") {
        button.style.marginRight = "0.5em";
    }

    button.addEventListener("click", () => playNote(note));
    buttonsContainer.appendChild(button);
});

// Function to play a note
function playNote(note) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "8n");
}

// Function to calculate interval between two notes
function getInterval(note1, note2) {
    const pitchIndex = {
        C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11
    };

    const semitone = 1;
    const note1Pitch = pitchIndex[note1.charAt(0)] + parseInt(note1.charAt(1));
    const note2Pitch = pitchIndex[note2.charAt(0)] + parseInt(note2.charAt(1));

    const interval = Math.abs(note2Pitch - note1Pitch);

    return interval === semitone ? "H" : interval === 2 * semitone ? "W" : "";
}
  }
}
