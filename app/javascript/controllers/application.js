// import { Application } from "@hotwired/stimulus"

// const application = Application.start()

// // Configure Stimulus development experience
// application.debug = false
// window.Stimulus   = application

// export { application }

import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus = application

// Listen for Turbo navigation events to ensure a full page reload
document.addEventListener('turbo:before-visit', (event) => {
  // Perform a full reload for all navigation
  window.location.href = event.detail.url; // Redirect to the new URL
});

// Optional: Disable Turbo for specific links if needed
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[data-turbo="false"]');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = link.href; // Force full reload
    });
  });
});

export { application }
