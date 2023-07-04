import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="waver"
export default class extends Controller {
  connect() {
    // Initialize variables
let audioContext, sourceNode, analyserNode;
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const waveformCanvas = document.getElementById('waveformCanvas');
const canvasContext = waveformCanvas.getContext('2d');
let isPlaying = false;

// Load audio file
fetch('/tunes/tribal.mp3')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => decodeAudioData(arrayBuffer));

// Decode audio data
function decodeAudioData(arrayBuffer) {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioContext.decodeAudioData(arrayBuffer, buffer => {
    initializeAudio(buffer);
    setupPlayback();
  });
}

// Initialize audio nodes and connect them
function initializeAudio(audioBuffer) {
  // Create analyser node
  analyserNode = audioContext.createAnalyser();
  analyserNode.fftSize = 2048;
  const bufferLength = analyserNode.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  // Set up canvas
  const canvasWidth = waveformCanvas.width;
  const canvasHeight = waveformCanvas.height;

  // Render audio waveform
  function draw() {
    requestAnimationFrame(draw);

    // Get waveform data
    analyserNode.getByteTimeDomainData(dataArray);

    // Clear canvas
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

    // Set line style
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'black';

    // Start drawing waveform
    canvasContext.beginPath();

    const sliceWidth = canvasWidth * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvasHeight) / 2;

      if (i === 0) {
        canvasContext.moveTo(x, y);
      } else {
        canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    // Finish drawing waveform
    canvasContext.lineTo(canvasWidth, canvasHeight / 2);
    canvasContext.stroke();
  }

  // Start drawing waveform
  draw();

  // Setup playback event handlers
  playButton.addEventListener('click', () => {
    if (!isPlaying) {
      playAudio(audioBuffer);
    }
  });

  pauseButton.addEventListener('click', () => {
    if (isPlaying) {
      pauseAudio();
    }
  });
}

// Play audio
function playAudio(audioBuffer) {
  sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;

  sourceNode.connect(analyserNode);
  analyserNode.connect(audioContext.destination);

  sourceNode.start(0);
  isPlaying = true;

  playButton.disabled = true;
  pauseButton.disabled = false;
}

// Pause audio
function pauseAudio() {
  sourceNode.stop(0);
  isPlaying = false;

  playButton.disabled = false;
  pauseButton.disabled = true;
}

  }
}
