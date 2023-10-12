import { Controller } from "@hotwired/stimulus"
import gsap from "gsap";
import * as Tone from 'tone'

// Connects to data-controller="synthlab"
export default class extends Controller {
  connect() {

// Global variables
let synths = [];
let isSynthsActive = false;
let polySynth;
let raindrops = [];
const NUM_RAINDROPS = 100;
const COLORS = ["#ff0000", "#00ff00", "#0000ff", "#ffff00"];

// Create the synths and polySynth
function createSynths() {
  // Create and configure the synths using Tone.js
  synths.push(new Tone.MembraneSynth().toDestination());
  synths.push(new Tone.MetalSynth().toDestination());
  synths.push(new Tone.FMSynth().toDestination());
  synths.push(new Tone.AMSynth().toDestination());
  polySynth = new Tone.PolySynth().toDestination();
}

// Generate a raindrop
function generateRaindrop(color) {
  const raindrop = document.createElement("div");
  raindrop.classList.add("raindrop");
  raindrop.style.background = color;
  document.body.appendChild(raindrop);

  const startX = Math.random() * window.innerWidth;
  const startY = -20;
  const endY = window.innerHeight + 20;
  const duration = 2 + Math.random() * 3;

  raindrop.style.left = startX + "px";
  raindrop.style.top = startY + "px";

  gsap.fromTo(
    raindrop,
    { y: startY, scaleY: 0.1 },
    {
      y: endY,
      scaleY: 1,
      duration: duration,
      ease: "power1.in",
      onComplete: () => {
        raindrop.remove();
      },
    }
  );

  raindrops.push(raindrop);
}

// Start a synth and rain animation
function startSynth(synthIndex, note) {
  synths[synthIndex].triggerAttackRelease(note, "2n");

  raindrops = [];
  for (let i = 0; i < NUM_RAINDROPS; i++) {
    const color = COLORS[synthIndex % COLORS.length];
    generateRaindrop(color);
  }

  isSynthsActive = true;
}

// Initialize the application
function init() {
  createSynths();

  const buttons = document.querySelectorAll(".play-btn");
  buttons.forEach((button, index) => {
    const note = ["C4", "E4", "G4", "A4"][index % 4]; // Example notes
    button.addEventListener("click", () => {
      startSynth(index, note);
    });
  });
}

const textArray = [  "Membrane synths can be used to simulate traditional percussion instruments like drums, as well as create abstract, otherworldly tones.",  "Metal synths provide a means to generate powerful and aggressive sounds, enabling musicians to create compelling metal compositions as wellas other genres.",  "FM/AM synths have been used in various musical genres, ranging from pop and electronic music to experimental and ambient genres. They offer a distinctive and versatile sound palette that can be both expressive and complex,"];

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

init();

  }
}
