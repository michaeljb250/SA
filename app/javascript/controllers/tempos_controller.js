import { Controller } from "@hotwired/stimulus"
import * as Tone from 'tone'

// Connects to data-controller="tempos"
export default class extends Controller {
  connect() {
    document.addEventListener('DOMContentLoaded', () => {
      const startButton = document.getElementById('startButton');
      const stopButton = document.getElementById('stopButton');
      const numeratorInput = document.getElementById('numerator');
      const denominatorInput = document.getElementById('denominator');
      const bpmInput = document.getElementById('bpm');
      const bpmValue = document.getElementById('bpmValue');

      let synthNumerator = new Tone.Synth({ oscillator: { type: 'triangle' } }).toDestination();
      let synthDenominator = new Tone.Synth({ oscillator: { type: 'sine' } }).toDestination();
      let loopNumerator, loopDenominator;

      startButton.addEventListener('click', () => {
          const numerator = parseInt(numeratorInput.value, 10);
          const denominator = parseInt(denominatorInput.value, 10);
          const bpm = parseInt(bpmInput.value, 10);

          const intervalNumerator = `${numerator}n`;
          const intervalDenominator = `${denominator}n`;

          Tone.Transport.bpm.value = bpm;

          Tone.Transport.timeSignature = [numerator, denominator];

          loopNumerator = new Tone.Loop((time) => {
              synthNumerator.triggerAttackRelease('C4', '0.2s', time);
          }, intervalNumerator);

          loopDenominator = new Tone.Loop((time) => {
              synthDenominator.triggerAttackRelease('E4', '0.2s', time);
          }, intervalDenominator);

          Tone.Transport.start();
          loopNumerator.start(0);
          loopDenominator.start(0);
      });

      stopButton.addEventListener('click', () => {
          Tone.Transport.stop();
          loopNumerator.stop(0);
          loopDenominator.stop(0);
      });

      bpmInput.addEventListener('input', () => {
          const bpm = parseInt(bpmInput.value, 10);
          bpmValue.textContent = `${bpm} BPM`;
      });
  });

  }
}
