// Edit this list to add or change cars. Figures are approximate.
const models = [
  { name: "330i",            type: "Sedan",    hp: 255, accel: 5.8, drive: "Rear-wheel drive",  m: false },
  { name: "M3 Competition",  type: "Sedan",    hp: 503, accel: 3.5, drive: "All-wheel drive",   m: true  },
  { name: "M4 Competition",  type: "Coupe",    hp: 503, accel: 3.5, drive: "All-wheel drive",   m: true  },
  { name: "M5",              type: "Sedan",    hp: 717, accel: 3.5, drive: "All-wheel drive",   m: true  },
  { name: "X5 xDrive40i",    type: "SUV",      hp: 375, accel: 5.3, drive: "All-wheel drive",   m: false },
  { name: "X5 M Competition",type: "SUV",      hp: 617, accel: 3.8, drive: "All-wheel drive",   m: true  },
  { name: "i4 eDrive40",     type: "Electric", hp: 340, accel: 5.7, drive: "Rear-wheel drive",  m: false },
  { name: "iX xDrive50",     type: "Electric", hp: 523, accel: 4.6, drive: "All-wheel drive",   m: false }
];

const filters = ["All", "Sedan", "Coupe", "SUV", "Electric", "M"];

const section = document.querySelector("main section");

// Build the page content inside the empty <section>
section.innerHTML = `
  <div class="hero">
    <h1>The BMW collection</h1>
    <p>Browse the lineup by body style. Select a car to see its details.</p>
  </div>
  <div class="filters" role="group" aria-label="Filter models"></div>
  <ul class="models" id="models"></ul>
`;

const filterBar = section.querySelector(".filters");
const list = section.querySelector("#models");
let active = "All";

function matches(car) {
  if (active === "All") return true;
  if (active === "M") return car.m;
  return car.type === active;
}

function renderFilters() {
  filterBar.innerHTML = "";
  filters.forEach(label => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = label === "M" ? "M models" : label;
    btn.setAttribute("aria-pressed", label === active);
    btn.addEventListener("click", () => {
      active = label;
      renderFilters();
      renderModels();
    });
    filterBar.appendChild(btn);
  });
}

function renderModels() {
  const shown = models.filter(matches);
  list.innerHTML = "";

  if (!shown.length) {
    list.innerHTML = `<li class="empty">No models in this category yet.</li>`;
    return;
  }

  shown.forEach(car => {
    const li = document.createElement("li");
    li.innerHTML = `
      <button class="model ${car.m ? "is-m" : ""}" aria-expanded="false">
        <h2>BMW ${car.name}</h2>
        <span class="type">${car.type}</span>
        <span class="power">${car.hp}<small>hp</small></span>
        <div class="details">
          <div><strong>${car.accel} s</strong>0–100 km/h</div>
          <div><strong>${car.drive}</strong>Drivetrain</div>
        </div>
      </button>`;
    const btn = li.firstElementChild;
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      list.querySelectorAll(".model").forEach(b => b.setAttribute("aria-expanded", "false"));
      btn.setAttribute("aria-expanded", String(!open));
    });
    list.appendChild(li);
  });
}

// Highlight the nav link of the section currently in view (works once #about / #contact exist)
const navLinks = document.querySelectorAll("header > ul a");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
  });
}, { threshold: 0.5 });

document.querySelectorAll("[id]").forEach(el => {
  if ([...navLinks].some(a => a.getAttribute("href") === `#${el.id}`)) observer.observe(el);
});

renderFilters();
renderModels();