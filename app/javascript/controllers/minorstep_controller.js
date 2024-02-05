import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'


// Connects to data-controller="minorstep"
export default class extends Controller {
  connect() {
    // Initialize Tone.js
Tone.start();

// C Minor Scale Notes
const cMinorScale = ["C4", "D4", "Eb4", "F4", "G4", "Ab4", "Bb4"];

// Create buttons dynamically
const buttonsContainer = document.getElementById("buttons-container");

cMinorScale.forEach((note, index) => {
    const button = document.createElement("button");

    // Set button text to note name
    button.textContent = note;

    // Calculate interval (half or whole step)
    const interval = index < cMinorScale.length - 1 ? getInterval(note, cMinorScale[index + 1]) : null;

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
        C: 0, D: 2, E: 3, F: 5, G: 7, A: 8, B: 10
    };

    const semitone = 1;
    const note1Pitch = pitchIndex[note1.charAt(0)];
    const note2Pitch = pitchIndex[note2.charAt(0)];

    let interval = Math.abs(note2Pitch - note1Pitch);

    // Adjust interval to consider the octave
    if (interval > 6) {
        interval = 12 - interval;
    }

    return (interval === semitone) ? "H" : (interval === 2 * semitone) ? "W" : "";
}
  }
}
