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
    const sound1 = initializeDraggableMarker('#marker', '#visualizer', 'https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/hip1.mp3');
    const sound2 = initializeDraggableMarker('#marker-2', '#visualizer-2', 'https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/hip2.mp3');
    const sound3 = initializeDraggableMarker('#marker-3', '#visualizer-3', 'https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/hip3.mp3');

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
