/* ===== Footer dynamic fields ===== */
const yearSpan = document.querySelector("#copyright-year");
const lastModSpan = document.querySelector("#last-modified");
yearSpan.textContent = new Date().getFullYear();
lastModSpan.textContent = new Date(document.lastModified).toLocaleString();

/* ===== Wind Chill =====
   Inputs must be static values that MATCH the page text (rubric).
   Metric formula expects:
   T in °C, v in km/h
   WCI = 13.12 + 0.6215T - 11.37*v^0.16 + 0.3965*T*v^0.16
*/
const temp = Number(document.querySelector("#temp").textContent);   // °C
const wind = Number(document.querySelector("#wind").textContent);   // km/h
const out = document.querySelector("#windchill");

// one-line function, returns number rounded to 1 decimal
const calculateWindChill = (t, v) =>
  Math.round((13.12 + 0.6215*t - 11.37*Math.pow(v, 0.16) + 0.3965*t*Math.pow(v, 0.16)) * 10) / 10;

// only call if allowed (metric thresholds)
if (temp <= 10 && wind > 4.8) {
  out.textContent = `${calculateWindChill(temp, wind)} °C`;
} else {
  out.textContent = "N/A";
}
