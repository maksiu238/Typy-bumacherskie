const tipsByDate = {
  "2026-03-05": [
    {
      discipline: "Piłka nożna",
      access: "free",
      league: "Premier League",
      match: "Arsenal vs Brighton",
      prediction: "Arsenal wygra",
      odds: "1.65",
      confidence: "72%",
    },
    {
      discipline: "Piłka nożna",
      access: "free",
      league: "Serie A",
      match: "Milan vs Torino",
      prediction: "Powyżej 1.5 gola",
      odds: "1.42",
      confidence: "78%",
    },
    {
      discipline: "Piłka nożna",
      access: "premium",
      league: "La Liga",
      match: "Atletico vs Villarreal",
      prediction: "Atletico i poniżej 3.5 gola",
      odds: "2.20",
      confidence: "65%",
    },
    {
      discipline: "Tenis",
      access: "premium",
      league: "ATP Dubai",
      match: "Musetti vs Rublev",
      prediction: "Powyżej 22.5 gemów",
      odds: "1.95",
      confidence: "61%",
    },
  ],
  "2026-03-06": [
    {
      discipline: "Piłka nożna",
      access: "free",
      league: "Ekstraklasa",
      match: "Lech Poznań vs Pogoń Szczecin",
      prediction: "BTTS - TAK",
      odds: "1.80",
      confidence: "66%",
    },
    {
      discipline: "Koszykówka",
      access: "free",
      league: "NBA",
      match: "Celtics vs Knicks",
      prediction: "Powyżej 214.5 pkt",
      odds: "1.88",
      confidence: "63%",
    },
    {
      discipline: "Piłka nożna",
      access: "premium",
      league: "Championship",
      match: "Leeds vs Norwich",
      prediction: "Leeds wygra do zera",
      odds: "2.45",
      confidence: "58%",
    },
  ],
};

const dateInput = document.getElementById("tips-date");
const disciplineFilter = document.getElementById("discipline-filter");
const accessFilter = document.getElementById("access-filter");
const tipsList = document.getElementById("tips-list");
const premiumToggle = document.getElementById("premium-toggle");
const template = document.getElementById("tip-card-template");

const defaultDate = Object.keys(tipsByDate)[0];
let premiumUnlocked = false;

function getAvailableDisciplines() {
  const set = new Set(["all"]);
  Object.values(tipsByDate).forEach((tips) => {
    tips.forEach((tip) => set.add(tip.discipline));
  });
  return [...set];
}

function renderDisciplineFilter() {
  const disciplines = getAvailableDisciplines();
  disciplineFilter.innerHTML = disciplines
    .map((discipline) => {
      const label = discipline === "all" ? "Wszystkie" : discipline;
      return `<option value="${discipline}">${label}</option>`;
    })
    .join("");
}

function createCard(tip) {
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector(".tip-card");

  card.querySelector(".discipline-tag").textContent = tip.discipline;
  card.querySelector(".access-tag").textContent = tip.access === "premium" ? "Płatne" : "Darmowe";
  card.querySelector(".league").textContent = tip.league;
  card.querySelector(".match").textContent = tip.match;
  card.querySelector(".prediction").textContent = `Typ: ${tip.prediction}`;
  card.querySelector(".odds").textContent = `Kurs: ${tip.odds}`;
  card.querySelector(".confidence").textContent = `Pewność: ${tip.confidence}`;

  if (tip.access === "premium") {
    card.classList.add("premium");
    if (!premiumUnlocked) {
      card.classList.add("locked");
    }
  }

  return clone;
}

function getFilteredTips() {
  const date = dateInput.value;
  const selectedDiscipline = disciplineFilter.value;
  const selectedAccess = accessFilter.value;
  const tips = tipsByDate[date] || [];

  return tips.filter((tip) => {
    const disciplineMatch = selectedDiscipline === "all" || tip.discipline === selectedDiscipline;
    const accessMatch = selectedAccess === "all" || tip.access === selectedAccess;
    return disciplineMatch && accessMatch;
  });
}

function renderTips() {
  const filtered = getFilteredTips();
  tipsList.innerHTML = "";

  if (!filtered.length) {
    tipsList.innerHTML = "<p>Brak typów dla wybranych filtrów.</p>";
    return;
  }

  filtered.forEach((tip) => tipsList.appendChild(createCard(tip)));
}

premiumToggle.addEventListener("click", () => {
  premiumUnlocked = !premiumUnlocked;
  premiumToggle.classList.toggle("active", premiumUnlocked);
  premiumToggle.textContent = premiumUnlocked ? "Tryb premium aktywny" : "Odblokuj podgląd premium";
  renderTips();
});

dateInput.addEventListener("change", renderTips);
disciplineFilter.addEventListener("change", renderTips);
accessFilter.addEventListener("change", renderTips);

renderDisciplineFilter();
dateInput.value = defaultDate;
renderTips();
