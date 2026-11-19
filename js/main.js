// main.js - homepage script

// Select all four project cards
const cards = document.querySelectorAll(".card");

// Watch each card and fade it in when it scrolls into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => {
  card.classList.add("reveal"); // start hidden
  observer.observe(card);
});