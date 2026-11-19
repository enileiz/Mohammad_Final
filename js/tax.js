// tax.js - Income Tax Calculator (TRAIN Law graduated table, 2023 onward)

// 1. The tax table. To change the rules, edit only this list.
//    tax = base + (income - min) x rate
const brackets = [
  { min: 0,       max: 250000,   base: 0,       rate: 0,    label: "₱250,000 and below (0%)" },
  { min: 250000,  max: 400000,   base: 0,       rate: 0.15, label: "Over ₱250,000 to ₱400,000 (15%)" },
  { min: 400000,  max: 800000,   base: 22500,   rate: 0.20, label: "Over ₱400,000 to ₱800,000 (20%)" },
  { min: 800000,  max: 2000000,  base: 102500,  rate: 0.25, label: "Over ₱800,000 to ₱2,000,000 (25%)" },
  { min: 2000000, max: 8000000,  base: 402500,  rate: 0.30, label: "Over ₱2,000,000 to ₱8,000,000 (30%)" },
  { min: 8000000, max: Infinity, base: 2202500, rate: 0.35, label: "Over ₱8,000,000 (35%)" }
];

// 2. Get the elements from the page
const form = document.getElementById("tax-form");
const incomeInput = document.getElementById("income");
const message = document.getElementById("message");
const bracketResult = document.getElementById("bracket-result");
const taxResult = document.getElementById("tax-result");
const rateResult = document.getElementById("rate-result");
const netResult = document.getElementById("net-result");

// 3. Turn a number into peso text, like ₱42,500.00
function formatPeso(amount) {
  return "₱" + amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// 4. Find which bracket the income belongs to
function findBracket(income) {
  for (let i = 0; i < brackets.length; i++) {
    if (income <= brackets[i].max) {
      return brackets[i];
    }
  }
}

// 5. Clear the results (used when there is an error)
function clearResults() {
  bracketResult.textContent = "-";
  taxResult.textContent = "-";
  rateResult.textContent = "-";
  netResult.textContent = "-";
}

// 6. Run this when the Compute Tax button is clicked
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const income = parseFloat(incomeInput.value);

  // Check that the user typed a valid amount
  if (isNaN(income) || income < 0) {
    message.textContent = "Please enter a valid income (0 or more).";
    clearResults();
    return;
  }

  message.textContent = ""; // clear any old error

  const bracket = findBracket(income);
  const tax = bracket.base + (income - bracket.min) * bracket.rate;
  const netIncome = income - tax;

  // Effective rate = tax / income (avoid dividing by zero)
  let effectiveRate = 0;
  if (income > 0) {
    effectiveRate = (tax / income) * 100;
  }

  bracketResult.textContent = bracket.label;
  taxResult.textContent = formatPeso(tax);
  rateResult.textContent = effectiveRate.toFixed(2) + "%";
  netResult.textContent = formatPeso(netIncome);
});