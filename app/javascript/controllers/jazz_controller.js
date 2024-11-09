// import { Controller } from "@hotwired/stimulus"
// import * as Tone from 'tone'
// import {Howl, Howler} from 'howler';

// // Connects to data-controller="jazz"
// export default class extends Controller {
//   connect() {

//     // Get references to DOM elements
// const startButton = document.querySelector('#start-button');
// const stopButton = document.querySelector('#stop-button');
// const marker = document.querySelector('#marker');
// const visualizer = document.querySelector('#visualizer');

// // Initialize marker position to center of visualizer
// let markerX = visualizer.clientWidth / 2;
// let markerY = visualizer.clientHeight / 2;
// marker.style.transform = `translate(${markerX}px, ${markerY}px)`;

// // Set up listener for marker movement
// let isDraggingMarker = false;
// let markerOffsetX = 0;
// let markerOffsetY = 0;
// marker.addEventListener('mousedown', (e) => {
//   isDraggingMarker = true;
//   markerOffsetX = e.clientX - markerX;
//   markerOffsetY = e.clientY - markerY;
//   marker.style.cursor = 'grabbing';
// });
// window.addEventListener('mousemove', (e) => {
//   if (isDraggingMarker) {
//     markerX = e.clientX - visualizer.offsetLeft - markerOffsetX;
//     markerY = e.clientY - visualizer.offsetTop - markerOffsetY;
//     marker.style.transform = `translate(${markerX}px, ${markerY}px)`;

//     // Set spatial position of sound based on marker position
//     const x = (markerX / visualizer.clientWidth) * 2 - 1;
//     const y = (markerY / visualizer.clientHeight) * 2 - 1;
//     sound.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
//   }
// });
// window.addEventListener('mouseup', (e) => {
//   if (isDraggingMarker) {
//     markerX = e.clientX - visualizer.offsetLeft - markerOffsetX;
//     markerY = e.clientY - visualizer.offsetTop - markerOffsetY;
//     marker.style.transform = `translate(${markerX}px, ${markerY}px)`;
//     marker.style.cursor = 'grab';

//     // Set spatial position of sound based on marker position
//     const x = (markerX / visualizer.clientWidth) * 2 - 1;
//     const y = (markerY / visualizer.clientHeight) * 2 - 1;
//     sound.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
//   }
//   isDraggingMarker = false;
// });

// // Load audio file with Howler.js
// const sound = new Howl({
//   src: ['https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/jazz1.mp3'],
//   spatial: true,
// });

// // Set up listener for start button
// startButton.addEventListener('click', () => {
//   sound.play();
// });

// // Set up listener for stop button
// stopButton.addEventListener('click', () => {
//   sound.stop();
// });

// const marker2 = document.querySelector('#marker-2');
// const visualizer2 = document.querySelector('#visualizer-2');

// // Initialize marker position to center of visualizer
// let marker2X = visualizer2.clientWidth / 2;
// let marker2Y = visualizer2.clientHeight / 2;
// marker2.style.transform = `translate(${marker2X}px, ${marker2Y}px)`;

// // Set up listener for marker movement
// let isDraggingMarker2 = false;
// let marker2OffsetX = 0;
// let marker2OffsetY = 0;
// marker2.addEventListener('mousedown', (e) => {
//   isDraggingMarker2 = true;
//   marker2OffsetX = e.clientX - marker2X;
//   marker2OffsetY = e.clientY - marker2Y;
//   marker2.style.cursor = 'grabbing';
// });
// window.addEventListener('mousemove', (e) => {
//   if (isDraggingMarker2) {
//     marker2X = e.clientX - visualizer2.offsetLeft - marker2OffsetX;
//     marker2Y = e.clientY - visualizer2.offsetTop - marker2OffsetY;
//     marker2.style.transform = `translate(${marker2X}px, ${marker2Y}px)`;

//     // Set spatial position of sound based on marker position
//     const x = (marker2X / visualizer2.clientWidth) * 2 - 1;
//     const y = (marker2Y / visualizer2.clientHeight) * 2 - 1;
//     sound2.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
//   }
// });
// window.addEventListener('mouseup', (e) => {
//   if (isDraggingMarker2) {
//     marker2X = e.clientX - visualizer2.offsetLeft - marker2OffsetX;
//     marker2Y = e.clientY - visualizer2.offsetTop - marker2OffsetY;
//     marker2.style.transform = `translate(${marker2X}px, ${marker2Y}px)`;
//     marker2.style.cursor = 'grab';

//     // Set spatial position of sound based on marker position
//     const x = (marker2X / visualizer2.clientWidth) * 2 - 1;
//     const y = (marker2Y / visualizer2.clientHeight) * 2 - 1;
//     sound2.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
//   }
//   isDraggingMarker2 = false;
// });

// // Load audio file with Howler.js
// const sound2 = new Howl({
//   src: ['https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/jazz2.mp3'],
//   spatial: true,
// });

// // Set up listener for start button
// startButton.addEventListener('click', () => {
//   sound2.play();
// });

// // Set up listener for stop button
// stopButton.addEventListener('click', () => {
//   sound2.stop();
// });

// const marker3 = document.querySelector('#marker-3');
// const visualizer3 = document.querySelector('#visualizer-3');

// // Initialize marker position to center of visualizer
// let marker3X = visualizer3.clientWidth / 2;
// let marker3Y = visualizer3.clientHeight / 2;
// marker3.style.transform = `translate(${marker3X}px, ${marker3Y}px)`;

// // Set up listener for marker movement
// let isDraggingMarker3 = false;
// let marker3OffsetX = 0;
// let marker3OffsetY = 0;
// marker3.addEventListener('mousedown', (e) => {
//   isDraggingMarker3 = true;
//   marker3OffsetX = e.clientX - marker3X;
//   marker3OffsetY = e.clientY - marker3Y;
//   marker3.style.cursor = 'grabbing';
// });
// window.addEventListener('mousemove', (e) => {
//   if (isDraggingMarker3) {
//     marker3X = e.clientX - visualizer3.offsetLeft - marker3OffsetX;
//     marker3Y = e.clientY - visualizer3.offsetTop - marker3OffsetY;
//     marker3.style.transform = `translate(${marker3X}px, ${marker3Y}px)`;

//     // Set spatial position of sound based on marker position
//     const x = (marker3X / visualizer3.clientWidth) * 2 - 1;
//     const y = (marker3Y / visualizer3.clientHeight) * 2 - 1;
//     sound3.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
//   }
// });
// window.addEventListener('mouseup', (e) => {
//   if (isDraggingMarker3) {
//     marker3X = e.clientX - visualizer3.offsetLeft - marker3OffsetX;
//     marker3Y = e.clientY - visualizer3.offsetTop - marker3OffsetY;
//     marker3.style.transform = `translate(${marker3X}px, ${marker3Y}px)`;
//     marker3.style.cursor = 'grab';

//     // Set spatial position of sound based on marker position
//     const x = (marker3X / visualizer3.clientWidth) * 2 - 1;
//     const y = (marker3Y / visualizer3.clientHeight) * 2 - 1;
//     sound3.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
//   }
//   isDraggingMarker3 = false;
// });

// // Load audio file with Howler.js
// const sound3 = new Howl({
//   src: ['https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/jazz3.mp3'],
//   spatial: true,
// });

// // Set up listener for start button
// startButton.addEventListener('click', () => {
//   sound3.play();
// });

// // Set up listener for stop button
// stopButton.addEventListener('click', () => {
//   sound3.stop();
// });

//   }
// }

import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'
import { Howl, Howler } from 'howler';

// Connects to data-controller="jazz"
export default class extends Controller {
  connect() {
    // Get references to DOM elements
    const startButton = document.querySelector('#start-button');
    const stopButton = document.querySelector('#stop-button');

    // Function to initialize a draggable marker and attach sound
    function initializeDraggableMarker(markerId, visualizerId, soundSrc) {
      const marker = document.querySelector(markerId);
      const visualizer = document.querySelector(visualizerId);

      // Initialize marker position to center of visualizer
      let markerX = visualizer.clientWidth / 2;
      let markerY = visualizer.clientHeight / 2;
      marker.style.transform = `translate(${markerX}px, ${markerY}px)`;

      // Initialize Howl sound with spatial audio enabled
      const sound = new Howl({
        src: [soundSrc],
        spatial: true,
      });

      // Initialize variables for dragging functionality
      let isDraggingMarker = false;
      let markerOffsetX = 0;
      let markerOffsetY = 0;

      // Start dragging (mouse or touch)
      function startDrag(event) {
        isDraggingMarker = true;
        if (event.type === 'mousedown' || event.type === 'touchstart') {
          const clientX = event.clientX || event.touches[0].clientX;
          const clientY = event.clientY || event.touches[0].clientY;
          markerOffsetX = clientX - markerX;
          markerOffsetY = clientY - markerY;
          marker.style.cursor = 'grabbing';
        }
      }

      // Dragging (mouse or touch)
      function drag(event) {
        if (isDraggingMarker) {
          event.preventDefault();
          const clientX = event.clientX || event.touches[0].clientX;
          const clientY = event.clientY || event.touches[0].clientY;
          markerX = clientX - visualizer.offsetLeft - markerOffsetX;
          markerY = clientY - visualizer.offsetTop - markerOffsetY;
          marker.style.transform = `translate(${markerX}px, ${markerY}px)`;

          // Update spatial position of sound based on marker position
          const x = (markerX / visualizer.clientWidth) * 2 - 1;
          const y = (markerY / visualizer.clientHeight) * 2 - 1;
          sound.pos(x, y, -1); // Set z-coordinate to -1 for 2D sound
        }
      }

      // Stop dragging (mouse or touch)
      function stopDrag() {
        if (isDraggingMarker) {
          marker.style.cursor = 'grab';
          isDraggingMarker = false;
        }
      }

      // Event listeners for desktop (mouse)
      marker.addEventListener('mousedown', startDrag);
      window.addEventListener('mousemove', drag);
      window.addEventListener('mouseup', stopDrag);

      // Event listeners for mobile (touch)
      marker.addEventListener('touchstart', startDrag);
      window.addEventListener('touchmove', drag);
      window.addEventListener('touchend', stopDrag);

      return sound;
    }

    // Initialize sounds and draggable markers
    const sound1 = initializeDraggableMarker('#marker', '#visualizer', 'https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/jazz1.mp3');
    const sound2 = initializeDraggableMarker('#marker-2', '#visualizer-2', 'https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/jazz2.mp3');
    const sound3 = initializeDraggableMarker('#marker-3', '#visualizer-3', 'https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/jazz3.mp3');

    // Start button functionality
    startButton.addEventListener('click', () => {
      sound1.play();
      sound2.play();
      sound3.play();
    });

    // Stop button functionality
    stopButton.addEventListener('click', () => {
      sound1.stop();
      sound2.stop();
      sound3.stop();
    });
  }
}
