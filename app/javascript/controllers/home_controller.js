import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="home"
export default class extends Controller {
  connect() {
    const textt = document.getElementById("textt");
let indexx = 0;
const textArrayy = [
  { textt: "“The music is not in the notes, but in the silence between” - Wolfgang Amadeus Mozart", duration: 10000 },
  { textt: "“Technology is neutral, but it all depends on the way we use it.” - Jean-Michel Jarre", duration: 10000 },
  { textt: " “Don’t be a prisoner of your own style!” - Armin van Buuren", duration: 10000 }
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
  }
}
