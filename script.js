const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const filterButtons = document.querySelectorAll(".filter-button");
const caseCards = document.querySelectorAll(".case-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    caseCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const voiceCards = Array.from(document.querySelectorAll(".voice-card"));
const previousButton = document.querySelector(".slider-button.prev");
const nextButton = document.querySelector(".slider-button.next");
let activeVoiceIndex = 0;

function showVoice(index) {
  activeVoiceIndex = (index + voiceCards.length) % voiceCards.length;
  voiceCards.forEach((card, cardIndex) => {
    card.classList.toggle("active", cardIndex === activeVoiceIndex);
  });
}

if (voiceCards.length && previousButton && nextButton) {
  previousButton.addEventListener("click", () => showVoice(activeVoiceIndex - 1));
  nextButton.addEventListener("click", () => showVoice(activeVoiceIndex + 1));
  window.setInterval(() => showVoice(activeVoiceIndex + 1), 6500);
}

const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    if (contactForm.dataset.netlify === "true") {
      return;
    }

    event.preventDefault();
    if (formNote) {
      formNote.textContent = "公開環境でフォーム送信が有効になります。";
    }
  });
}
