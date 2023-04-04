import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="distortion"
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

  }
}
