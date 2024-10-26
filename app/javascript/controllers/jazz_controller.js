// import { Controller } from "@hotwired/stimulus";
// import { Howl, Howler } from 'howler';

// // Connects to data-controller="jazz"
// export default class extends Controller {
//   connect() {
//     // Get references to DOM elements
//     const startButton = document.querySelector('#start-button');
//     const stopButton = document.querySelector('#stop-button');
//     const marker1 = document.querySelector('#marker');
//     const visualizer1 = document.querySelector('#visualizer');
//     const marker2 = document.querySelector('#marker-2');
//     const visualizer2 = document.querySelector('#visualizer-2');
//     const marker3 = document.querySelector('#marker-3');
//     const visualizer3 = document.querySelector('#visualizer-3');

//     // Create audio sounds with Howler.js
//     const sounds = [
//       new Howl({
//         src: ['https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/jazz1.wav'],
//         spatial: true,
//       }),
//       new Howl({
//         src: ['https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/jazz2.wav'],
//         spatial: true,
//       }),
//       new Howl({
//         src: ['https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/jazz3.wav'],
//         spatial: true,
//       }),
//     ];

//     // Initialize markers positions
//     const markers = [marker1, marker2, marker3];
//     const visualizers = [visualizer1, visualizer2, visualizer3];
//     const markerPositions = [
//       { x: visualizer1.clientWidth / 2, y: visualizer1.clientHeight / 2 },
//       { x: visualizer2.clientWidth / 2, y: visualizer2.clientHeight / 2 },
//       { x: visualizer3.clientWidth / 2, y: visualizer3.clientHeight / 2 },
//     ];

//     markers.forEach((marker, index) => {
//       const { x, y } = markerPositions[index];
//       marker.style.transform = `translate(${x}px, ${y}px)`;

//       // Marker movement logic
//       let isDragging = false;
//       let offsetX = 0;
//       let offsetY = 0;

//       marker.addEventListener('mousedown', (e) => {
//         isDragging = true;
//         offsetX = e.clientX - x;
//         offsetY = e.clientY - y;
//         marker.style.cursor = 'grabbing';
//       });

//       window.addEventListener('mousemove', (e) => {
//         if (isDragging) {
//           const newX = e.clientX - visualizers[index].offsetLeft - offsetX;
//           const newY = e.clientY - visualizers[index].offsetTop - offsetY;
//           marker.style.transform = `translate(${newX}px, ${newY}px)`;
//           markerPositions[index] = { x: newX, y: newY };

//           // Set spatial position of sound based on marker position
//           const soundX = (newX / visualizers[index].clientWidth) * 2 - 1;
//           const soundY = (newY / visualizers[index].clientHeight) * 2 - 1;
//           sounds[index].pos(soundX, soundY, -1); // Set z-coordinate to -1 for 2D sound
//         }
//       });

//       window.addEventListener('mouseup', () => {
//         if (isDragging) {
//           marker.style.cursor = 'grab';
//           isDragging = false;
//         }
//       });
//     });

//     // Set up listener for start button
//     startButton.addEventListener('click', () => {
//       sounds.forEach(sound => sound.play());
//     });

//     // Set up listener for stop button
//     stopButton.addEventListener('click', () => {
//       sounds.forEach(sound => sound.stop());
//     });
//   }
// }

import { Controller } from "@hotwired/stimulus";
import { Howl, Howler } from 'howler';

// Connects to data-controller="jazz"
export default class extends Controller {
  connect() {
    // Get references to DOM elements
    const startButton = document.querySelector('#start-button');
    const stopButton = document.querySelector('#stop-button');
    const marker1 = document.querySelector('#marker');
    const visualizer1 = document.querySelector('#visualizer');
    const marker2 = document.querySelector('#marker-2');
    const visualizer2 = document.querySelector('#visualizer-2');
    const marker3 = document.querySelector('#marker-3');
    const visualizer3 = document.querySelector('#visualizer-3');

    // Create audio sounds with Howler.js
    const sounds = [
      new Howl({
        src: ['https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/jazz1.wav'],
        spatial: true,
        preload: true, // Preload the audio
      }),
      new Howl({
        src: ['https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/jazz2.wav'],
        spatial: true,
        preload: true, // Preload the audio
      }),
      new Howl({
        src: ['https://soundacademybucket.s3.ap-southeast-2.amazonaws.com/jazz3.wav'],
        spatial: true,
        preload: true, // Preload the audio
      }),
    ];

    // Initialize markers positions
    const markers = [marker1, marker2, marker3];
    const visualizers = [visualizer1, visualizer2, visualizer3];
    const markerPositions = [
      { x: visualizer1.clientWidth / 2, y: visualizer1.clientHeight / 2 },
      { x: visualizer2.clientWidth / 2, y: visualizer2.clientHeight / 2 },
      { x: visualizer3.clientWidth / 2, y: visualizer3.clientHeight / 2 },
    ];

    markers.forEach((marker, index) => {
      const { x, y } = markerPositions[index];
      marker.style.transform = `translate(${x}px, ${y}px)`;

      // Marker movement logic
      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      marker.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - x;
        offsetY = e.clientY - y;
        marker.style.cursor = 'grabbing';
      });

      window.addEventListener('mousemove', (e) => {
        if (isDragging) {
          const newX = e.clientX - visualizers[index].offsetLeft - offsetX;
          const newY = e.clientY - visualizers[index].offsetTop - offsetY;
          marker.style.transform = `translate(${newX}px, ${newY}px)`;
          markerPositions[index] = { x: newX, y: newY };

          // Set spatial position of sound based on marker position
          const soundX = (newX / visualizers[index].clientWidth) * 2 - 1;
          const soundY = (newY / visualizers[index].clientHeight) * 2 - 1;
          sounds[index].pos(soundX, soundY, -1); // Set z-coordinate to -1 for 2D sound
        }
      });

      window.addEventListener('mouseup', () => {
        if (isDragging) {
          marker.style.cursor = 'grab';
          isDragging = false;
        }
      });
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        marker.style.cursor = 'grab';
        isDragging = false;
      }
    });

    // Touch events
    marker.addEventListener('touchstart', (e) => {
      isDragging = true;
      const touch = e.touches[0];
      offsetX = touch.clientX - x;
      offsetY = touch.clientY - y;
      marker.style.cursor = 'grabbing';
    });

    window.addEventListener('touchmove', (e) => {
      if (isDragging) {
        const touch = e.touches[0];
        const newX = touch.clientX - visualizers[index].offsetLeft - offsetX;
        const newY = touch.clientY - visualizers[index].offsetTop - offsetY;
        marker.style.transform = `translate(${newX}px, ${newY}px)`;
        markerPositions[index] = { x: newX, y: newY };

        const soundX = (newX / visualizers[index].clientWidth) * 2 - 1;
        const soundY = (newY / visualizers[index].clientHeight) * 2 - 1;
        sounds[index].pos(soundX, soundY, -1);
      }
    });

    window.addEventListener('touchend', () => {
      if (isDragging) {
        marker.style.cursor = 'grab';
        isDragging = false;
      }
    });

    setTimeout(() => {
      startButton.style.display = 'block'; // Show the start button after 9 seconds
      stopButton.style.display = 'block';  // Show the stop button after 9 seconds
    }, 9000);


    startButton.addEventListener('click', () => {
      sounds.forEach(sound => sound.play());
    });


    stopButton.addEventListener('click', () => {
      sounds.forEach(sound => sound.stop());
    });

  }
}
