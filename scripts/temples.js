document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Hamburger toggle (mobile)
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("primary-nav");
const srStatus = document.getElementById("sr-status");

hamburger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(isOpen));
  srStatus.textContent = isOpen ? "Menu opened" : "Menu closed";
});

// Close menu if user clicks a link (mobile UX nicety)
nav.addEventListener("click", (e) => {
  const target = e.target;
  if (target.matches("a") && nav.classList.contains("open")) {
    nav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }
});
