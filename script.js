// Edit your shows here. Past dates are hidden automatically.
const shows = [
  { date: "2027-01-15", venue: "Venue Name", city: "City, ST", tickets: "#" },
  { date: "2027-02-06", venue: "Another Venue", city: "City, ST", tickets: "#" }
];

const list = document.getElementById("show-list");
const today = new Date().toISOString().slice(0, 10);
const upcoming = shows.filter(s => s.date >= today).sort((a, b) => a.date.localeCompare(b.date));
if (!upcoming.length) document.getElementById("no-shows").hidden = false;
upcoming.forEach(s => {
  const d = new Date(s.date + "T12:00:00");
  const li = document.createElement("li");
  li.innerHTML = `<span class="date">${d.toLocaleDateString("en-US",{month:"short",day:"numeric"})}<small>${d.getFullYear()}</small></span>
    <span>${s.venue}<small>${s.city}</small></span>
    <a class="btn" href="${s.tickets}">Tickets</a>`;
  list.appendChild(li);
});

const btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
btn.addEventListener("click", () => btn.setAttribute("aria-expanded", nav.classList.toggle("open")));
nav.addEventListener("click", () => nav.classList.remove("open"));

const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("in")), {threshold: .1});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();

// Floating music notes: only on the first screen (hero), behind its content, while scrolling down
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const layer = document.createElement("div");
  layer.className = "notes-layer";
  layer.setAttribute("aria-hidden", "true");
  hero.prepend(layer);

  const symbols = ["♪", "♫", "♩", "♬", "𝄞", "𝄞", "𝄢"];   // 𝄞 treble clef, 𝄢 bass clef
  let lastY = window.scrollY, travelled = 0, active = 0;
  const STEP = 90, MAX = 10;   // px scrolled per note, max notes at once

  function spawn() {
    if (active >= MAX) return;
    const n = document.createElement("span");
    n.className = "note";
    n.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    n.style.left = (5 + Math.random() * 90) + "%";
    n.style.top = (3 + Math.random() * 85) + "%";   // anywhere on the first screen
    n.style.fontSize = (3 + Math.random() * 3.5) * (/[𝄞𝄢]/u.test(n.textContent) ? 1.15 : 1) + "rem";
    n.style.setProperty("--drift", (Math.random() * 160 - 80) + "px");
    n.style.setProperty("--rot", (Math.random() * 60 - 30) + "deg");
    layer.appendChild(n);
    active++;
    n.addEventListener("animationend", () => { n.remove(); active--; });
  }

  window.addEventListener("scroll", () => {
    const y = window.scrollY, dy = y - lastY;
    lastY = y;
    if (dy <= 0) { travelled = 0; return; }              // only when scrolling down
    if (y > hero.offsetHeight * 0.9) return;             // stop once past the first screen
    travelled += dy;
    while (travelled >= STEP) { spawn(); travelled -= STEP; }
  }, { passive: true });
})();
