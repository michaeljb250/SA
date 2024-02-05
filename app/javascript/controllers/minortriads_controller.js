import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="minortriads"
export default class extends Controller {
  connect() {
    Tone.start();

const polySynth = new Tone.PolySynth().toDestination();

const harmonies = [
 ["C4", "D#4", "G4"],  // C Minor
  ["F4", "G#4", "C5"],  // F Minor
  ["G4", "A#4", "D5"],  // G Minor
  ["A4", "C5", "E5"],   // A Minor
  ["D4", "E4", "A4"],   // D Minor
  ["E4", "F#4", "B4"],  // E Minor
  ["B3", "C#4", "F#4"], // B Minor
  ["Db4", "E4", "Ab4"], // Db Minor
  ["Eb4", "F#4", "Bb4"],// Eb Minor
  ["Ab3", "B3", "Eb4"], // Ab Minor
  ["Bb3", "C#4", "F4"]   // Bb Minor
];

const harmonySelect = document.getElementById("harmonySelect");
const noteButtonsContainer = document.getElementById("noteButtons");
const playButton = document.getElementById("playButton");
const stopButton = document.getElementById("stopButton");

let selectedHarmony = harmonies[0]; // Default to the first harmony

// Function to create note buttons dynamically
function createNoteButtons() {
    noteButtonsContainer.innerHTML = "";
    selectedHarmony.forEach(note => {
        const button = document.createElement("button");
        button.textContent = note;
        button.dataset.note = note;
        button.addEventListener("click", () => toggleNotePlayback(note));
        noteButtonsContainer.appendChild(button);
    });
}

// Function to toggle note playback
function toggleNotePlayback(note) {
    const index = selectedHarmony.indexOf(note);
    if (index !== -1) {
        // Note is in the harmony, remove it
        selectedHarmony.splice(index, 1);
    } else {
        // Note is not in the harmony, add it
        selectedHarmony.push(note);
    }

    // Toggle the "active" class to change the color
    updateNoteButtonStyle(note);
}

// Function to update note button style
function updateNoteButtonStyle(note) {
    const button = document.querySelector(`button[data-note="${note}"]`);
    if (button) {
        button.classList.toggle("active");
    }
}

// Event listeners for buttons
playButton.addEventListener("click", function () {
    // Play all notes of the selected harmony simultaneously
    polySynth.triggerAttackRelease(selectedHarmony, "14s");
});

stopButton.addEventListener("click", function () {
    polySynth.releaseAll();
});

// Event listener for harmony selection
harmonySelect.addEventListener("change", function () {
    selectedHarmony = harmonies[parseInt(harmonySelect.value, 10)];
    createNoteButtons(); // Update note buttons when harmony changes
});

// Initialize note buttons
createNoteButtons();
  }
}
