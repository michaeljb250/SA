import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'
import {Howl, Howler} from 'howler';

// Connects to data-controller="jazz"
export default class extends Controller {
  connect() {

    // Get references to DOM elements
const startButton = document.querySelector('#start-button');
const stopButton = document.querySelector('#stop-button');
const marker = document.querySelector('#marker');
const visualizer = document.querySelector('#visualizer');

// Initialize marker position to center of visualizer
let markerX = visualizer.clientWidth / 2;
let markerY = visualizer.clientHeight / 2;
marker.style.transform = `translate(${markerX}px, ${markerY}px)`;

// Set up listener for marker movement
let isDraggingMarker = false;
let markerOffsetX = 0;
let markerOffsetY = 0;
marker.addEventListener('mousedown', (e) => {
  isDraggingMarker = true;
  markerOffsetX = e.clientX - markerX;
  markerOffsetY = e.clientY - markerY;
  marker.style.cursor = 'grabbing';
});
window.addEventListener('mousemove', (e) => {
  if (isDraggingMarker) {
    markerX = e.clientX - visualizer.offsetLeft - markerOffsetX;
    markerY = e.clientY - visualizer.offsetTop - markerOffsetY;
    marker.style.transform = `translate(${markerX}px, ${markerY}px)`;

    // Set spatial position of sound based on marker position
    const x = (markerX / visualizer.clientWidth) * 2 - 1;
    const y = (markerY / visualizer.clientHeight) * 2 - 1;
    sound.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
  }
});
window.addEventListener('mouseup', (e) => {
  if (isDraggingMarker) {
    markerX = e.clientX - visualizer.offsetLeft - markerOffsetX;
    markerY = e.clientY - visualizer.offsetTop - markerOffsetY;
    marker.style.transform = `translate(${markerX}px, ${markerY}px)`;
    marker.style.cursor = 'grab';

    // Set spatial position of sound based on marker position
    const x = (markerX / visualizer.clientWidth) * 2 - 1;
    const y = (markerY / visualizer.clientHeight) * 2 - 1;
    sound.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
  }
  isDraggingMarker = false;
});

// Load audio file with Howler.js
const sound = new Howl({
  src: ['/tunes/indiepopbuzz.wav'],
  spatial: true,
});

// Set up listener for start button
startButton.addEventListener('click', () => {
  sound.play();
});

// Set up listener for stop button
stopButton.addEventListener('click', () => {
  sound.stop();
});

const marker2 = document.querySelector('#marker-2');
const visualizer2 = document.querySelector('#visualizer-2');

// Initialize marker position to center of visualizer
let marker2X = visualizer2.clientWidth / 2;
let marker2Y = visualizer2.clientHeight / 2;
marker2.style.transform = `translate(${marker2X}px, ${marker2Y}px)`;

// Set up listener for marker movement
let isDraggingMarker2 = false;
let marker2OffsetX = 0;
let marker2OffsetY = 0;
marker2.addEventListener('mousedown', (e) => {
  isDraggingMarker2 = true;
  marker2OffsetX = e.clientX - marker2X;
  marker2OffsetY = e.clientY - marker2Y;
  marker2.style.cursor = 'grabbing';
});
window.addEventListener('mousemove', (e) => {
  if (isDraggingMarker2) {
    marker2X = e.clientX - visualizer2.offsetLeft - marker2OffsetX;
    marker2Y = e.clientY - visualizer2.offsetTop - marker2OffsetY;
    marker2.style.transform = `translate(${marker2X}px, ${marker2Y}px)`;

    // Set spatial position of sound based on marker position
    const x = (marker2X / visualizer2.clientWidth) * 2 - 1;
    const y = (marker2Y / visualizer2.clientHeight) * 2 - 1;
    sound2.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
  }
});
window.addEventListener('mouseup', (e) => {
  if (isDraggingMarker2) {
    marker2X = e.clientX - visualizer2.offsetLeft - marker2OffsetX;
    marker2Y = e.clientY - visualizer2.offsetTop - marker2OffsetY;
    marker2.style.transform = `translate(${marker2X}px, ${marker2Y}px)`;
    marker2.style.cursor = 'grab';

    // Set spatial position of sound based on marker position
    const x = (marker2X / visualizer2.clientWidth) * 2 - 1;
    const y = (marker2Y / visualizer2.clientHeight) * 2 - 1;
    sound2.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
  }
  isDraggingMarker2 = false;
});

// Load audio file with Howler.js
const sound2 = new Howl({
  src: ['/tunes/indiepopdrums.wav'],
  spatial: true,
});

// Set up listener for start button
startButton.addEventListener('click', () => {
  sound2.play();
});

// Set up listener for stop button
stopButton.addEventListener('click', () => {
  sound2.stop();
});

const marker3 = document.querySelector('#marker-3');
const visualizer3 = document.querySelector('#visualizer-3');

// Initialize marker position to center of visualizer
let marker3X = visualizer3.clientWidth / 2;
let marker3Y = visualizer3.clientHeight / 2;
marker3.style.transform = `translate(${marker3X}px, ${marker3Y}px)`;

// Set up listener for marker movement
let isDraggingMarker3 = false;
let marker3OffsetX = 0;
let marker3OffsetY = 0;
marker3.addEventListener('mousedown', (e) => {
  isDraggingMarker3 = true;
  marker3OffsetX = e.clientX - marker3X;
  marker3OffsetY = e.clientY - marker3Y;
  marker3.style.cursor = 'grabbing';
});
window.addEventListener('mousemove', (e) => {
  if (isDraggingMarker3) {
    marker3X = e.clientX - visualizer3.offsetLeft - marker3OffsetX;
    marker3Y = e.clientY - visualizer3.offsetTop - marker3OffsetY;
    marker3.style.transform = `translate(${marker3X}px, ${marker3Y}px)`;

    // Set spatial position of sound based on marker position
    const x = (marker3X / visualizer3.clientWidth) * 2 - 1;
    const y = (marker3Y / visualizer3.clientHeight) * 2 - 1;
    sound3.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
  }
});
window.addEventListener('mouseup', (e) => {
  if (isDraggingMarker3) {
    marker3X = e.clientX - visualizer3.offsetLeft - marker3OffsetX;
    marker3Y = e.clientY - visualizer3.offsetTop - marker3OffsetY;
    marker3.style.transform = `translate(${marker3X}px, ${marker3Y}px)`;
    marker3.style.cursor = 'grab';

    // Set spatial position of sound based on marker position
    const x = (marker3X / visualizer3.clientWidth) * 2 - 1;
    const y = (marker3Y / visualizer3.clientHeight) * 2 - 1;
    sound3.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
  }
  isDraggingMarker3 = false;
});

// Load audio file with Howler.js
const sound3 = new Howl({
  src: ['/tunes/indiepoppiano1.wav'],
  spatial: true,
});

// Set up listener for start button
startButton.addEventListener('click', () => {
  sound3.play();
});

// Set up listener for stop button
stopButton.addEventListener('click', () => {
  sound3.stop();
});

const marker4 = document.querySelector('#marker-4');
const visualizer4 = document.querySelector('#visualizer-4');

// Initialize marker position to center of visualizer
let marker4X = visualizer4.clientWidth / 2;
let marker4Y = visualizer4.clientHeight / 2;
marker4.style.transform = `translate(${marker4X}px, ${marker4Y}px)`;

// Set up listener for marker movement
let isDraggingMarker4 = false;
let marker4OffsetX = 0;
let marker4OffsetY = 0;
marker4.addEventListener('mousedown', (e) => {
  isDraggingMarker4 = true;
  marker4OffsetX = e.clientX - marker4X;
  marker4OffsetY = e.clientY - marker4Y;
  marker4.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (e) => {
  if (isDraggingMarker4) {
    marker4X = e.clientX - visualizer4.offsetLeft - marker4OffsetX;
    marker4Y = e.clientY - visualizer4.offsetTop - marker4OffsetY;
    marker4.style.transform = `translate(${marker4X}px, ${marker4Y}px)`;

    // Set spatial position of sound based on marker position
    const x = (marker4X / visualizer4.clientWidth) * 2 - 1;
    const y = (marker4Y / visualizer4.clientHeight) * 2 - 1;
    sound4.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
  }
});

window.addEventListener('mouseup', (e) => {
  if (isDraggingMarker4) {
    marker4X = e.clientX - visualizer4.offsetLeft - marker4OffsetX;
    marker4Y = e.clientY - visualizer4.offsetTop - marker4OffsetY;
    marker4.style.transform = `translate(${marker4X}px, ${marker4Y}px)`;
    marker4.style.cursor = 'grab';

    // Set spatial position of sound based on marker position
    const x = (marker4X / visualizer4.clientWidth) * 2 - 1;
    const y = (marker4Y / visualizer4.clientHeight) * 2 - 1;
    sound4.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
  }
  isDraggingMarker4 = false;
});

// Load audio file with Howler.js
const sound4 = new Howl({
  src: ['/tunes/indiepoppino2.wav'],
  spatial: true,
});

// Set up listener for start button
startButton.addEventListener('click', () => {
  sound4.play();
});

// Set up listener for stop button
stopButton.addEventListener('click', () => {
  sound4.stop();
});

  }
}
