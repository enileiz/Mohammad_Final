// conversion.js - Conversion calculator

// 1. Get the elements from the page
const form = document.getElementById("conversion-form");
const typeSelect = document.getElementById("conversion-type");
const valueInput = document.getElementById("value");
const result = document.getElementById("result");

// 2. Units for each conversion type (used to show the answer)
const units = {
  "c-to-f":  { from: "°C", to: "°F" },
  "f-to-c":  { from: "°F", to: "°C" },
  "m-to-ft": { from: "m",  to: "ft" },
  "ft-to-m": { from: "ft", to: "m" }
};

// 3. A function that does the math
function convert(type, value) {
  if (type === "c-to-f") {
    return (value * 9) / 5 + 32;
  } else if (type === "f-to-c") {
    return ((value - 32) * 5) / 9;
  } else if (type === "m-to-ft") {
    return value * 3.28084;
  } else if (type === "ft-to-m") {
    return value / 3.28084;
  }
}

// 4. Run this when the Convert button is clicked
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const type = typeSelect.value;
  const value = parseFloat(valueInput.value);

  // Check that the user typed a number
  if (isNaN(value)) {
    result.textContent = "Please enter a valid number.";
    return;
  }

  const answer = convert(type, value);
  const rounded = Number(answer.toFixed(2)); // 2 decimal places

  result.textContent =
    value + " " + units[type].from + " = " + rounded + " " + units[type].to;
});