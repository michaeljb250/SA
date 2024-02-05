import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="augmentedtriad"
export default class extends Controller {
  connect() {
    Tone.start();

    const polySynth = new Tone.PolySynth().toDestination();

    const augmentedHarmonies = [
        ["C4", "E4", "G#4"],  // C Augmented
        ["F4", "A4", "C#5"],  // F Augmented
        ["G4", "B4", "D#5"],  // G Augmented
        ["A4", "C#5", "F5"],   // A Augmented
        ["D4", "F#4", "A#4"],  // D Augmented
        ["E4", "G#4", "C5"],   // E Augmented
        ["B3", "D#4", "G4"],   // B Augmented
        ["Db4", "F4", "A4"],   // Db Augmented
        ["Eb4", "G4", "B4"],   // Eb Augmented
        ["Ab3", "C5", "E5"],   // Ab Augmented
        ["Bb3", "D5", "F#5"]   // Bb Augmented
    ];

    const harmonySelect = document.getElementById("harmonySelect");
    const noteButtonsContainer = document.getElementById("noteButtons");
    const playButton = document.getElementById("playButton");
    const stopButton = document.getElementById("stopButton");

    let selectedHarmony = augmentedHarmonies[0]; // Default to the first augmented harmony

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
        selectedHarmony = augmentedHarmonies[parseInt(harmonySelect.value, 10)];
        createNoteButtons(); // Update note buttons when harmony changes
    });

    // Initialize note buttons
    createNoteButtons();
  }
}
