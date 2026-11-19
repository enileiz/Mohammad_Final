// payroll.js - Simple Payroll calculator

// 1. Settings you can change easily
const REGULAR_HOURS = 40;   // hours paid at the normal rate
const OVERTIME_RATE = 1.25; // overtime is paid 1.25x

// 2. Get the elements from the page
const form = document.getElementById("payroll-form");
const nameInput = document.getElementById("employee-name");
const hoursInput = document.getElementById("hours");
const rateInput = document.getElementById("rate");
const deductionsInput = document.getElementById("deductions");
const message = document.getElementById("message");

const employeeResult = document.getElementById("employee-result");
const regularResult = document.getElementById("regular-result");
const overtimeResult = document.getElementById("overtime-result");
const grossResult = document.getElementById("gross-result");
const deductionsResult = document.getElementById("deductions-result");
const netResult = document.getElementById("net-result");

// 3. Turn a number into peso text, like ₱4,625.00
function formatPeso(amount) {
  return "₱" + amount.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// 4. Do the payroll math
function calculatePayroll(hours, rate, deductions) {
  let regularHours = hours;
  let overtimeHours = 0;

  // If the employee worked more than 40 hours, the extra is overtime
  if (hours > REGULAR_HOURS) {
    regularHours = REGULAR_HOURS;
    overtimeHours = hours - REGULAR_HOURS;
  }

  const regularPay = regularHours * rate;
  const overtimePay = overtimeHours * rate * OVERTIME_RATE;
  const grossPay = regularPay + overtimePay;
  const netPay = grossPay - deductions;

  return { regularPay, overtimePay, grossPay, netPay };
}

// 5. Clear the results (used when there is an error)
function clearResults() {
  employeeResult.textContent = "-";
  regularResult.textContent = "-";
  overtimeResult.textContent = "-";
  grossResult.textContent = "-";
  deductionsResult.textContent = "-";
  netResult.textContent = "-";
}

// 6. Run this when the Compute Pay button is clicked
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value.trim();
  const hours = parseFloat(hoursInput.value);
  const rate = parseFloat(rateInput.value);

  // Deductions are optional: empty means 0
  let deductions = 0;
  if (deductionsInput.value !== "") {
    deductions = parseFloat(deductionsInput.value);
  }

  // Check the inputs
  if (isNaN(hours) || hours < 0 || hours > 168) {
    message.textContent = "Please enter hours worked from 0 to 168.";
    clearResults();
    return;
  }

  if (isNaN(rate) || rate < 0) {
    message.textContent = "Please enter a valid hourly rate.";
    clearResults();
    return;
  }

  if (isNaN(deductions) || deductions < 0) {
    message.textContent = "Deductions must be 0 or more.";
    clearResults();
    return;
  }

  const pay = calculatePayroll(hours, rate, deductions);

  if (deductions > pay.grossPay) {
    message.textContent = "Deductions cannot be more than the gross pay.";
    clearResults();
    return;
  }

  message.textContent = ""; // clear any old error

  employeeResult.textContent = name === "" ? "-" : name;
  regularResult.textContent = formatPeso(pay.regularPay);
  overtimeResult.textContent = formatPeso(pay.overtimePay);
  grossResult.textContent = formatPeso(pay.grossPay);
  deductionsResult.textContent = formatPeso(deductions);
  netResult.textContent = formatPeso(pay.netPay);
});