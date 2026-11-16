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
