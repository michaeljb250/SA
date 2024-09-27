// import { Controller } from "@hotwired/stimulus"
// import * as Tone from 'tone'

// // Connects to data-controller="minorscalegame"
// export default class extends Controller {
//   connect() {
//     Tone.start();

// // Define all major scales
// const allMinorScales = {
//     'C': ['C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4'],
//     'D': ['D4', 'E4', 'F4', 'G4', 'A4', 'Bb4', 'C5'],
//     'E': ['E4', 'F#4', 'G4', 'A4', 'B4', 'C5', 'D5'],
//     'F': ['F4', 'G4', 'Ab4', 'Bb4', 'C5', 'Db5', 'Eb5'],
//     'G': ['G4', 'A4', 'Bb4', 'C5', 'D5', 'Eb5', 'F5'],
//     'A': ['A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'],
//     'B': ['B4', 'C#5', 'D5', 'E5', 'F#5', 'G5', 'A5']
// };


// // Initialize score, high score, selected note, and selected scale
// let score = 0;
// let highScore = localStorage.getItem('highScore') || 0;
// let selectedNote = null;
// let selectedScale = 'C'; // Default selected scale

// // Create a Tone.Synth instance to be reused
// const synth = new Tone.Synth().toDestination();

// // Function to play a random note from the selected major scale
// function playRandomNote() {
//     const scaleNotes = allMinorScales[selectedScale];
//     const randomIndex = Math.floor(Math.random() * scaleNotes.length);
//     return scaleNotes[randomIndex];
// }

// // Update the high score display
// function updateHighScore() {
//     document.getElementById('highScore').textContent = highScore;
// }

// // Update the guess options based on the selected major scale
// function updateGuessOptions() {
//     const guessOptions = document.querySelectorAll('.guessOption');
//     const scaleNotes = allMinorScales[selectedScale];

//     guessOptions.forEach((option, index) => {
//         option.textContent = scaleNotes[index];
//         option.classList.remove('correct'); // Remove the 'correct' class
//     });
// }

// // Function to play the selected note for two seconds
// function playSelectedNote() {
//     if (selectedNote) {
//         // Release any previously played notes
//         synth.triggerRelease();

//         // Play the selected note
//         synth.triggerAttack(selectedNote);

//         // Schedule the release after two seconds
//         setTimeout(() => {
//             synth.triggerRelease();
//         }, 2000); // 2000 milliseconds (2 seconds)
//     }
// }

// // Function to reset the game
// function resetGame() {
//     score = 0;
//     selectedNote = null;
//     updateHighScore();
//     updateGuessOptions();
// }

// // Play button click event
// const playButton = document.getElementById('playButton');
// playButton.addEventListener('click', () => {
//     selectedScale = document.getElementById('scaleSelect').value;

//     if (!selectedNote) {
//         selectedNote = playRandomNote(); // Play a new note only if no guess has been made
//         playSelectedNote();
//     }

//     updateGuessOptions(); // Update guess options based on selected major scale
// });

// // Guess options click events
// const guessOptions = document.querySelectorAll('.guessOption');
// guessOptions.forEach(option => {
//     option.addEventListener('click', () => {
//         selectedScale = document.getElementById('scaleSelect').value;
//         if (selectedNote) {
//             if (option.textContent === selectedNote) {
//                 score++;
//                 if (score > highScore) {
//                     highScore = score;
//                     localStorage.setItem('highScore', highScore);
//                     updateHighScore();
//                 }
//                 document.getElementById('score').textContent = score;
//             } else {
//                 score = 0;
//                 document.getElementById('score').textContent = score;

//                 // Highlight the correct guess option
//                 const correctOption = Array.from(guessOptions).find(opt => opt.textContent === selectedNote);
//                 if (correctOption) {
//                     correctOption.classList.add('correct');
//                 }
//             }

//             selectedNote = null;
//             updateHighScore();
//             updateGuessOptions(); // Update guess options based on selected major scale
//         }
//     });
// });

// // Key select change event
// const scaleSelect = document.getElementById('scaleSelect');
// scaleSelect.addEventListener('change', () => {
//     resetGame();
// });

// // Initialize high score display
// updateHighScore();
// updateGuessOptions(); // Initialize guess options based on default major scale

//   }
// }
import { Controller } from "@hotwired/stimulus";
import * as Tone from 'tone';

// Connects to data-controller="minorscalegame"
export default class extends Controller {
  connect() {
    // Initialize Tone.js
    Tone.start();

    // Define all minor scales
    const allMinorScales = {
      'C': ['C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4'],
      'D': ['D4', 'E4', 'F4', 'G4', 'A4', 'Bb4', 'C5'],
      'E': ['E4', 'F#4', 'G4', 'A4', 'B4', 'C5', 'D5'],
      'F': ['F4', 'G4', 'Ab4', 'Bb4', 'C5', 'Db5', 'Eb5'],
      'G': ['G4', 'A4', 'Bb4', 'C5', 'D5', 'Eb5', 'F5'],
      'A': ['A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'],
      'B': ['B4', 'C#5', 'D5', 'E5', 'F#5', 'G5', 'A5']
    };

    // Initialize score, high score, selected note, and selected scale
    let score = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    let selectedNote = null;
    let selectedScale = 'C'; // Default selected scale

    // Create a Tone.Synth instance to be reused
    const synth = new Tone.Synth().toDestination();

    // Function to play a random note from the selected minor scale
    function playRandomNote() {
      const scaleNotes = allMinorScales[selectedScale];
      const randomIndex = Math.floor(Math.random() * scaleNotes.length);
      return scaleNotes[randomIndex];
    }

    // Update the high score display
    function updateHighScore() {
      document.getElementById('highScore').textContent = highScore;
    }

    // Update the score display
    function updateScore() {
      document.getElementById('score').textContent = score;
    }

    // Update the guess options based on the selected minor scale
    function updateGuessOptions() {
      const guessOptions = document.querySelectorAll('.guessOption');
      const scaleNotes = allMinorScales[selectedScale];

      guessOptions.forEach((option, index) => {
        option.textContent = scaleNotes[index];
        option.classList.remove('correct'); // Remove the 'correct' class
      });
    }

    // Function to play the selected note for two seconds
    function playSelectedNote() {
      if (selectedNote) {
        // Release any previously played notes
        synth.triggerRelease();

        // Play the selected note
        synth.triggerAttack(selectedNote);

        // Schedule the release after two seconds
        setTimeout(() => {
          synth.triggerRelease();
        }, 2000); // 2000 milliseconds (2 seconds)
      }
    }

    // Function to reset the game
    function resetGame() {
      score = 0;
      selectedNote = null;
      updateHighScore();
      updateScore();
      updateGuessOptions();
      document.getElementById('guessText').textContent = "Play a note"; // Reset guess text
    }

    // Play button click event
    const playButton = document.getElementById('playButton');
    playButton.addEventListener('click', () => {
      selectedScale = document.getElementById('scaleSelect').value;

      if (!selectedNote) {
        selectedNote = playRandomNote(); // Play a new note only if no guess has been made
        playSelectedNote();
        document.getElementById('guessText').textContent = "Guess"; // Change to "Guess" after playing note
      }

      updateGuessOptions(); // Update guess options based on selected minor scale
    });

    // Guess options click events
    const guessOptions = document.querySelectorAll('.guessOption');
    guessOptions.forEach(option => {
      option.addEventListener('click', () => {
        if (selectedNote) {
          const guessText = document.getElementById('guessText');
          if (option.textContent === selectedNote) {
            // Correct guess
            score++;
            updateScore();
            guessText.textContent = "Right!";
            option.classList.add('correct'); // Change button color to green

            // Update high score if needed
            if (score > highScore) {
              highScore = score;
              localStorage.setItem('highScore', highScore);
              updateHighScore();
            }
          } else {
            // Incorrect guess
            score = 0;
            updateScore();
            guessText.textContent = "Wrong!";
            const correctOption = Array.from(guessOptions).find(opt => opt.textContent === selectedNote);
            if (correctOption) {
              correctOption.classList.add('correct'); // Change correct option color
            }
          }

          selectedNote = null;
          updateGuessOptions(); // Update guess options based on selected minor scale

          // Reset guess text after 1 second
          setTimeout(() => {
            guessText.textContent = "Play a note"; // Reset text back to "Play a note"
          }, 1000);
        }
      });
    });

    // Key select change event
    const scaleSelect = document.getElementById('scaleSelect');
    scaleSelect.addEventListener('change', () => {
      resetGame();
    });

    // Initialize high score and score display
    updateHighScore();
    updateScore();
    updateGuessOptions(); // Initialize guess options based on default minor scale
    document.getElementById('guessText').textContent = "Play a note"; // Set to "Play a note" on load
  }
}
