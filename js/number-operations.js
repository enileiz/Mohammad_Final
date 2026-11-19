// number-operations.js - Factorial, Sum and Average of the first N natural numbers

// 1. Get the elements from the page
const form = document.getElementById("numbers-form");
const numberInput = document.getElementById("n");
const message = document.getElementById("message");
const factorialResult = document.getElementById("factorial-result");
const sumResult = document.getElementById("sum-result");
const averageResult = document.getElementById("average-result");

// 2. Factorial using a WHILE loop
//    Example: 5! = 1 x 2 x 3 x 4 x 5 = 120
//    BigInt (the "n" after numbers) keeps big answers exact.
function getFactorial(n) {
  let result = 1n;
  let i = 1;

  while (i <= n) {
    result = result * BigInt(i);
    i++;
  }

  return result;
}

// 3. Sum using a DO...WHILE loop
//    Example: 1 + 2 + 3 + 4 + 5 = 15
function getSum(n) {
  let sum = 0;
  let i = 1;

  do {
    sum = sum + i;
    i++;
  } while (i <= n);

  return sum;
}

// 4. Average using a FOR loop
//    Add up 1 to N, then divide by N
function getAverage(n) {
  let total = 0;

  for (let i = 1; i <= n; i++) {
    total = total + i;
  }

  return total / n;
}

// 5. Run this when the Calculate button is clicked
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const n = Number(numberInput.value);

  // Check that N is a whole number from 1 to 100
  if (!Number.isInteger(n) || n < 1 || n > 100) {
    message.textContent = "Please enter a whole number from 1 to 100.";
    factorialResult.textContent = "-";
    sumResult.textContent = "-";
    averageResult.textContent = "-";
    return;
  }

  message.textContent = ""; // clear any old error

  factorialResult.textContent = getFactorial(n).toString();
  sumResult.textContent = getSum(n);
  averageResult.textContent = Number(getAverage(n).toFixed(2));
});
