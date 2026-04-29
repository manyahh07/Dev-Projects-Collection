// ── CONFIG ────────────────────────────────────────────
const API_KEY = "49e83bc60b62d0cf5d132c161cb8ebe1";

// ── CLOCK ─────────────────────────────────────────────
function tick() {
  document.getElementById("clock").textContent =
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
setInterval(tick, 1000);
tick();

// ── STATUS HELPERS ────────────────────────────────────
function setStatus(html) {
  document.getElementById("status-msg").innerHTML = html;
}

function showLoader() {
  setStatus('<div class="status"><div class="loader"></div></div>');
}

// BUG FIX: was just a plain string, now uses the .error CSS class
function showError(msg) {
  setStatus(`<div class="error">⚠ ${msg}</div>`);
}

function showResults() {
  document.getElementById("weather-result").style.display = "block";
  document.getElementById("forecast-result").style.display = "block";
  setStatus("");
}

// ── WEATHER ICON MAPPER ───────────────────────────────
function getIcon(id, isDay = true) {
  if (id >= 200 && id < 300) return "⛈";
  if (id >= 300 && id < 400) return "🌦";
  if (id >= 500 && id < 600) return "🌧";
  if (id >= 600 && id < 700) return "❄️";
  if (id >= 700 && id < 800) return "🌫";
  if (id === 800)             return isDay ? "☀️" : "🌙";
  if (id === 801)             return "🌤";
  if (id === 802)             return "⛅";
  if (id >= 803)              return "☁️";
  return "🌡";
}

// ── TIME FORMATTER ────────────────────────────────────
// Takes a Unix timestamp + UTC offset in seconds, returns "HH:MM"
function fmtTime(unix, offsetSeconds) {
  const d = new Date((unix + offsetSeconds) * 1000);
  const hh = String(Math.floor(((d.getUTCHours() % 12) || 12))).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  const ampm = d.getUTCHours() < 12 ? "AM" : "PM";
  return `${hh}:${mm} ${ampm}`;
}

// ── RENDER CURRENT WEATHER ────────────────────────────
function renderCurrent(d) {
  const offset    = d.sys.timezone;                          // seconds from UTC
  const weatherId = d.weather[0].id;
  const nowUnix   = Date.now() / 1000;
  const isDay     = nowUnix > d.sys.sunrise && nowUnix < d.sys.sunset;

  // Local date string for the city
  const localDate = new Date((nowUnix + offset) * 1000);
  const dateStr   = localDate.toUTCString().slice(0, 16);   // "Sat, 26 Apr 2025"

  document.getElementById("w-city").textContent     = d.name;
  document.getElementById("w-country").textContent  = d.sys.country;
  document.getElementById("w-date").textContent     = dateStr;
  document.getElementById("w-icon").textContent     = getIcon(weatherId, isDay);

  // BUG FIX: use Math.round() — raw floats like 15.7000000001 were shown before
  document.getElementById("w-temp").textContent     = Math.round(d.main.temp);
  document.getElementById("w-feels").textContent    = Math.round(d.main.feels_like);
  document.getElementById("w-desc").textContent     = d.weather[0].description;
  document.getElementById("w-high").textContent     = Math.round(d.main.temp_max);
  document.getElementById("w-low").textContent      = Math.round(d.main.temp_min);
  document.getElementById("w-humidity").textContent = d.main.humidity;
  document.getElementById("w-wind").textContent     = d.wind.speed.toFixed(1);

  // BUG FIX: visibility can be undefined on some OWM responses — guard it
  const visKm = d.visibility != null ? (d.visibility / 1000).toFixed(1) : "N/A";
  document.getElementById("w-vis").textContent      = visKm;

  document.getElementById("w-pressure").textContent = d.main.pressure;
  document.getElementById("w-rise").textContent     = fmtTime(d.sys.sunrise, offset);
  document.getElementById("w-set").textContent      = fmtTime(d.sys.sunset,  offset);
}

// ── RENDER 5-DAY FORECAST ─────────────────────────────
// BUG FIX: this function was entirely missing from the original script.js
function renderForecast(d) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = {};

  // Group the 3-hourly slots by calendar day
  d.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const key  = date.toDateString();
    if (!days[key]) {
      days[key] = {
        name:  dayNames[date.getDay()],
        highs: [],
        lows:  [],
        ids:   [],
        descs: []
      };
    }
    days[key].highs.push(item.main.temp_max);
    days[key].lows.push(item.main.temp_min);
    days[key].ids.push(item.weather[0].id);
    days[key].descs.push(item.weather[0].description);
  });

  // Skip today (index 0), show next 5 days
  const entries = Object.values(days).slice(1, 6);
  const list    = document.getElementById("fc-list");
  list.innerHTML = "";

  entries.forEach(day => {
    const hi   = Math.round(Math.max(...day.highs));
    const lo   = Math.round(Math.min(...day.lows));
    // Pick the middle slot's icon/description as most representative
    const mid  = Math.floor(day.ids.length / 2);
    const icon = getIcon(day.ids[mid]);
    const desc = day.descs[mid];

    const el = document.createElement("div");
    el.className = "fc-item";
    el.innerHTML = `
      <div class="fc-day">${day.name}</div>
      <div class="fc-icon">${icon}</div>
      <div class="fc-desc">${desc}</div>
      <div class="fc-temps">
        <span class="fc-hi">↑${hi}°</span>
        <span class="fc-lo">↓${lo}°</span>
      </div>
    `;
    list.appendChild(el);
  });
}

// ── CORE FETCH ────────────────────────────────────────
// BUG FIX: original only fetched current weather, never forecast
// BUG FIX: cod comparison fixed — OWM sends 200 (number) on success,
//          "401" / "404" (strings) on error, so we check both types
async function fetchWeather(params) {
  showLoader();
  try {
    const qs = new URLSearchParams({ ...params, appid: API_KEY, units: "metric" });

    const [wRes, fRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?${qs}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?${qs}`)
    ]);

    const wData = await wRes.json();
    const fData = await fRes.json();

    // BUG FIX: distinguish API key errors from city-not-found errors
    if (wData.cod === 401 || wData.cod === "401") {
      throw new Error("Invalid API key — check your key or wait a few minutes after creating it.");
    }
    if (wData.cod === 404 || wData.cod === "404") {
      throw new Error("City not found. Try a different spelling or include the country (e.g. 'Paris, FR').");
    }
    if (!wRes.ok) throw new Error(wData.message || "Could not fetch weather.");
    if (!fRes.ok) throw new Error(fData.message || "Could not fetch forecast.");

    renderCurrent(wData);
    renderForecast(fData);
    showResults();

  } catch (err) {
    console.error(err);
    showError(err.message);
  }
}

// ── SEARCH BUTTON ─────────────────────────────────────
// BUG FIX: original used alert() — replaced with inline error display
function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }
  fetchWeather({ q: city });
}

// ── LOCATION BUTTON ───────────────────────────────────
function getLocation() {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser.");
    return;
  }
  showLoader();
  navigator.geolocation.getCurrentPosition(
    pos => fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
    ()  => showError("Location access denied. Please search by city name instead.")
  );
}