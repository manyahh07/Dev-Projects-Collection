# Petal Weather —  Weather Forecast App

A beautifully designed pastel-themed weather application built with vanilla **HTML, CSS and JavaScript**, powered by the **OpenWeather API**.  
Search any city worldwide or use geolocation to get real-time weather insights and a 5-day forecast.

---

## Features

### MVP (Phase 1 — Core Features)
-  Search weather by city name  
-  Get weather using current location  
-  Real-time temperature, feels-like, highs & lows  
-  Humidity, wind speed, pressure & visibility tracking  
-  Sunrise and sunset information  
-  Dynamic 5-day weather forecast  
-  Live clock based interface  

---

## UI Highlights
- Soft pastel aesthetic inspired by modern dashboard design  
- Animated weather icons and floating effects  
- Responsive mobile-friendly layout  
- Card-based forecast interface  
- Elegant typography using DM Sans + DM Serif Display

---

## Tech Stack
- HTML5  
- CSS3 (Custom Properties / Grid / Animations)  
- Vanilla JavaScript  
- OpenWeather API  
- Geolocation API

---

## Functionality Implemented
- Concurrent API fetching with `Promise.all()`  
- Dynamic weather condition icon mapping  
- Forecast grouping and day-wise aggregation logic  
- Error handling for invalid cities, API issues and denied location access  
- Timezone-aware sunrise/sunset and local date rendering

---

## Screenshots

### Weather Home Page
![Weather Home Page](Weather%20Home%20Page.png)

### 5-Day Forecast View
![Weather Forecast](Weather%20Forecast.png)

---

## Future Improvements
- Hourly forecast charts  
- Weather maps integration  
- Dark mode toggle  
- Saved favorite cities  
- Air Quality Index (AQI) support  
- React + TypeScript migration  
- PWA offline support

---

## Run Locally

Clone the repository:

```bash
git clone https://github.com/yourusername/weather-app.git
```

Open:

```bash
index.html
```

in your browser or use Live Server in VS Code.

---

## API Setup
Generate a free API key from:

https://openweathermap.org/api

Replace:

```javascript
const API_KEY = "YOUR_API_KEY";
```

inside `script.js`

---

## Project Status
Completed MVP  
Iterating toward advanced weather dashboard
