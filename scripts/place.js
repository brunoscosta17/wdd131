const yearSpan = document.querySelector("#copyright-year");
const lastModSpan = document.querySelector("#last-modified");
yearSpan.textContent = new Date().getFullYear();
lastModSpan.textContent = new Date(document.lastModified).toLocaleString();

const temp = Number(document.querySelector("#temp").textContent);
const wind = Number(document.querySelector("#wind").textContent);
const out = document.querySelector("#windchill");

const calculateWindChill = (t, v) =>
  Math.round((13.12 + 0.6215*t - 11.37*Math.pow(v, 0.16) + 0.3965*t*Math.pow(v, 0.16)) * 10) / 10;

if (temp <= 10 && wind > 4.8) {
  out.textContent = `${calculateWindChill(temp, wind)} °C`;
} else {
  out.textContent = "N/A";
}
