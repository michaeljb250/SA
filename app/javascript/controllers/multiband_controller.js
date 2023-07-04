import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'


// Connects to data-controller="multiband"
export default class extends Controller {
  connect() {


    const textArray = [  "This is the first line of text.",  "This is the second line of text.",  "This is the third line of text."];

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

    const audioFile = "https://tonejs.github.io/audio/berklee/gong_1.mp3";


const player = new Tone.Player(audioFile).toDestination();
player.autostart = false;

const multibandCompressor = new Tone.MultibandCompressor({
  low: {
    threshold: -24,
  },
  high: {
    threshold: -12,
  },
}).toDestination();

// Set up the sliders
const lowSlider = document.getElementById("lowSlider");
const highSlider = document.getElementById("highSlider");

// Add event listeners to update the multiband compressor thresholds when the sliders are moved
lowSlider.addEventListener("input", (event) => {
  multibandCompressor.low.threshold.value = parseFloat(event.target.value);
});

highSlider.addEventListener("input", (event) => {
  multibandCompressor.high.threshold.value = parseFloat(event.target.value);
});

// Add event listeners to start and stop the player
document.getElementById("start").addEventListener("click", () => {
  if (player.state !== "started") {
    player.connect(multibandCompressor);
    player.start();
  }
});

document.getElementById("stop").addEventListener("click", () => {
  player.stop();
});

const textt = document.getElementById("textt");
let indexx = 0;
const textArrayy = [
  { textt: "This is the first line of text", duration: 10000 },
  { textt: "This is the second line of text", duration: 10000 },
  { textt: "This is the third line of text", duration: 10000 }
];

function rotateText() {
  textt.style.opacity = 0;
  setTimeout(() => {
    textt.textContent = textArrayy[indexx].textt;
    textt.style.opacity = 1;
  }, 1000);
  setTimeout(() => {
    textt.style.opacity = 0;
  }, textArrayy[indexx].duration - 1000);
  indexx = (indexx + 1) % textArrayy.length;
  setTimeout(rotateText, textArrayy[indexx].duration);
}

rotateText();


document.addEventListener("DOMContentLoaded", () => {
  const tracks = [
    {
      audioFile: "https://tonejs.github.io/audio/berklee/gong_1.mp3",
      volumeSlider: document.getElementById("volumeSlider1"),
      lowGainSlider: document.getElementById("lowGainSlider1"),
      midGainSlider: document.getElementById("midGainSlider1"),
      highGainSlider: document.getElementById("highGainSlider1"),
      panningSlider: document.getElementById("panningSlider1"),
      compressorSlider: document.getElementById("compressorSlider1"),
    },
    {
      audioFile: "https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3",
      volumeSlider: document.getElementById("volumeSlider2"),
      lowGainSlider: document.getElementById("lowGainSlider2"),
      midGainSlider: document.getElementById("midGainSlider2"),
      highGainSlider: document.getElementById("highGainSlider2"),
      panningSlider: document.getElementById("panningSlider2"),
      compressorSlider: document.getElementById("compressorSlider2"),
    },
    {
      audioFile: "https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3",
      volumeSlider: document.getElementById("volumeSlider3"),
      lowGainSlider: document.getElementById("lowGainSlider3"),
      midGainSlider: document.getElementById("midGainSlider3"),
      highGainSlider: document.getElementById("highGainSlider3"),
      panningSlider: document.getElementById("panningSlider3"),
      compressorSlider: document.getElementById("compressorSlider3"),
    },
  ];

  const players = [];
  const eqs = [];
  const panners = [];
  const compressors = [];

  tracks.forEach((track, index) => {
    const player = new Tone.Player(track.audioFile).toDestination();
    const eq = new Tone.EQ3().toDestination();
    const panner = new Tone.Panner().toDestination();
    const compressor = new Tone.Compressor().toDestination();

    // Set initial gain values for EQ
    eq.low.value = 0;
    eq.mid.value = 0;
    eq.high.value = 0;

    // Connect player to EQ, compressor, and panner
    player.connect(eq);
    eq.connect(compressor);
    compressor.connect(panner);

    // Store player, EQ, panner, and compressor instances
    players.push(player);
    eqs.push(eq);
    panners.push(panner);
    compressors.push(compressor);

    // Set up volume control event listener
    track.volumeSlider.addEventListener("input", () => {
      const volume = track.volumeSlider.value;
      player.volume.value = Tone.gainToDb(volume);
    });

    // Set up EQ control event listeners
    track.lowGainSlider.addEventListener("input", () => {
      const lowGain = track.lowGainSlider.value;
      eq.low.value = lowGain;
    });

    track.midGainSlider.addEventListener("input", () => {
      const midGain = track.midGainSlider.value;
      eq.mid.value = midGain;
    });

    track.highGainSlider.addEventListener("input", () => {
      const highGain = track.highGainSlider.value;
      eq.high.value = highGain;
    });

    // Set up panning control event listener
    track.panningSlider.addEventListener("input", () => {
      const panning = track.panningSlider.value;
      panner.pan.value = panning;
    });

    // Set up compressor control event listener
    track.compressorSlider.addEventListener("input", () => {      const threshold = track.compressorSlider.value;
      compressor.threshold.value = threshold;
    });
  });

  // Get DOM elements for common play and stop buttons
  const playBtn = document.getElementById("playBtn");
  const stopBtn = document.getElementById("stopBtn");

  // Set up play button event listener
  playBtn.addEventListener("click", () => {
    Tone.start();
    players.forEach((player) => {
      player.start();
    });
  });

  // Set up stop button event listener
  stopBtn.addEventListener("click", () => {
    players.forEach((player) => {
      player.stop();
    });
  });
});


}
}
