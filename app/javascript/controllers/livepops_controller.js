import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="livemix"
export default class extends Controller {
  connect() {
      const tracks = [
        {
          audioFile: "/tunes/jazz2.wav",
          volumeSlider: document.getElementById("volumeSlider1"),
          lowGainSlider: document.getElementById("lowGainSlider1"),
          midGainSlider: document.getElementById("midGainSlider1"),
          highGainSlider: document.getElementById("highGainSlider1"),
          panningSlider: document.getElementById("panningSlider1"),
          compressorSlider: document.getElementById("compressorSlider1"),
        },
        {
          audioFile: "/tunes/jazz1.wav",
          volumeSlider: document.getElementById("volumeSlider2"),
          lowGainSlider: document.getElementById("lowGainSlider2"),
          midGainSlider: document.getElementById("midGainSlider2"),
          highGainSlider: document.getElementById("highGainSlider2"),
          panningSlider: document.getElementById("panningSlider2"),
          compressorSlider: document.getElementById("compressorSlider2"),
        },
        {
          audioFile: "/tunes/jazz3.wav",
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
    ;


  }
}
