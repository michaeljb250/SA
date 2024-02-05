import { Controller } from "@hotwired/stimulus";
import * as Tone from 'tone';

export default class extends Controller {
  connect() {
    const polySynth = new Tone.PolySynth().toDestination();

    const scales = {
      C: ["C4", "D4", "E4", "G4", "A4"],
      D: ["D4", "E4", "F#4", "A4", "B4"],
      E: ["E4", "G4", "A4", "B4", "D5"],
      F: ["F4", "G4", "A#4", "C5", "E5"],
      G: ["G4", "A4", "B4", "D5", "E5"],
      A: ["A4", "B4", "C#5", "E5", "F#5"],
      B: ["B4", "D5", "E5", "F#5", "A5"]
    };

    const noteNames = {
      C: ["C", "D", "E", "G", "A"],
      D: ["D", "E", "F#", "A", "B"],
      E: ["E", "G", "A", "B", "D"],
      F: ["F", "G", "A#", "C", "E"],
      G: ["G", "A", "B", "D", "E"],
      A: ["A", "B", "C#", "E", "F#"],
      B: ["B", "D", "E", "F#", "A"]
    };

    // Initialize variables
    let currentScale = "C"; // Default scale
    let grid = Array.from({ length: 5 }, () => Array(8).fill(false));
    let loop;

    // DOM elements
    const scaleSelector = document.getElementById("scale-selector");
    const gridContainer = document.getElementById("grid-container");
    const playBtn = document.getElementById("play-btn");
    const stopBtn = document.getElementById("stop-btn");
    const bpmSlider = document.getElementById("bpm-slider");
    const bpmValue = document.getElementById("bpm-value");

    // Event listeners
    scaleSelector.addEventListener("change", handleScaleChange);
    playBtn.addEventListener("click", startLoop);
    stopBtn.addEventListener("click", stopLoop);
    bpmSlider.addEventListener("input", updateBPM);

    // Initial setup
    updateGridUI();

    function handleScaleChange() {
      currentScale = scaleSelector.value;
      grid = Array.from({ length: 5 }, () => Array(8).fill(false)); // Reset the grid
      updateGridUI();
    }

    function toggleNote(row, col) {
      grid[row][col] = !grid[row][col];
      const isActive = grid[row][col];

      if (isActive) {
        polySynth.triggerAttackRelease(scales[currentScale][row], "5n");
      }

      updateGridUI();
    }

    function updateGridUI() {
      gridContainer.innerHTML = "";

      grid.forEach((row, rowIndex) => {
        row.forEach((isActive, colIndex) => {
          const gridItem = document.createElement("div");
          gridItem.classList.add("grid-item");
          if (isActive) {
            gridItem.classList.add("active");
            gridItem.classList.add(`note-${noteNames[currentScale][rowIndex]}`);
          }
          gridItem.textContent = noteNames[currentScale][rowIndex];
          gridItem.addEventListener("click", () => toggleNote(rowIndex, colIndex));
          gridContainer.appendChild(gridItem);
        });
      });
    }

    function startLoop() {
      const bpm = parseInt(bpmSlider.value, 10);
      Tone.Transport.bpm.value = bpm;

      loop = new Tone.Sequence(
        (time, col) => {
          grid.forEach((row, rowIndex) => {
            if (row[col]) {
              polySynth.triggerAttackRelease(scales[currentScale][rowIndex], "5n", time);
            }
          });
          updateGridUI();
        },
        [...Array(8).keys()], // Loop through all eight columns
        "8n"
      ).start(0);

      Tone.Transport.start();
    }

    function stopLoop() {
      if (loop) {
        loop.stop(0);
        Tone.Transport.stop();
        Tone.Transport.cancel();
      }
    }

    function updateBPM() {
      bpmValue.textContent = `${bpmSlider.value} BPM`;
    }
  }
}
