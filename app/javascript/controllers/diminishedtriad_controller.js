import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'


// Connects to data-controller="diminishedtriad"
export default class extends Controller {
  connect() {
    Tone.start();

    const polySynth = new Tone.PolySynth().toDestination();

    const diminishedHarmonies = [
        ["C4", "Eb4", "Gb4"],  // C Diminished
        ["F4", "Ab4", "B4"],   // F Diminished
        ["G4", "Bb4", "Db5"],  // G Diminished
        ["A4", "C5", "Eb5"],   // A Diminished
        ["D4", "F4", "Ab4"],     // D Diminished
        ["E4", "G4", "Bb4"],    // E Diminished
        ["B3", "D4", "F4"],    // B Diminished
        ["Db4", "E4", "G4"],    // Db Diminished
        ["Eb4", "Gb4", "A4"],   // Eb Diminished
        ["Ab3", "B3", "D4"],    // Ab Diminished
        ["B3", "D4", "F4"]    // Bb Diminished
    ];

    const harmonySelect = document.getElementById("harmonySelect");
    const noteButtonsContainer = document.getElementById("noteButtons");
    const playButton = document.getElementById("playButton");
    const stopButton = document.getElementById("stopButton");

    let selectedHarmony = diminishedHarmonies[0]; // Default to the first diminished harmony

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
        selectedHarmony = diminishedHarmonies[parseInt(harmonySelect.value, 10)];
        createNoteButtons(); // Update note buttons when harmony changes
    });

    // Initialize note buttons
    createNoteButtons();
  }
}
