document.getElementById("calculator-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const initialDeposit = parseFloat(document.getElementById("initialDeposit").value);
  const periodicDeposit = parseFloat(document.getElementById("periodicDeposit").value);
  const depositFrequency = document.getElementById("depositFrequency").value;
  const interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
  const compoundingFrequency = document.getElementById("compoundingFrequency").value;
  const timeHorizon = parseFloat(document.getElementById("timeHorizon").value);

  const futureValue = calculateFutureValue(initialDeposit, periodicDeposit, depositFrequency, interestRate, compoundingFrequency, timeHorizon);
  showResult(futureValue);
});

function calculateFutureValue(initialDeposit, periodicDeposit, depositFrequency, interestRate, compoundingFrequency, timeHorizon) {
  const periodicInterestRate = interestRate / getCompoundingPeriods(compoundingFrequency);
  const numPeriods = timeHorizon * getCompoundingPeriods(compoundingFrequency);
  const numDeposits = timeHorizon * getDepositFrequency(depositFrequency);

  const futureValueOfPrincipal = initialDeposit * Math.pow(1 + periodicInterestRate, numPeriods);
  const futureValueOfDeposits = periodicDeposit * ((Math.pow(1 + periodicInterestRate, numDeposits) - 1) / periodicInterestRate);

  return futureValueOfPrincipal + futureValueOfDeposits;
}

function getCompoundingPeriods(compoundingFrequency) {
  switch (compoundingFrequency) {
    case "daily":
      return 365;
    case "monthly":
      return 12;
    case "quarterly":
      return 4;
    case "annually":
      return 1;
    default:
      return 0;
  }
}

function getDepositFrequency(depositFrequency) {
  switch (depositFrequency) {
    case "daily":
      return 365;
    case "weekly":
      return 52;
    case "monthly":
      return 12;
    case "annually":
      return 1;
    default:
      return 0;
  }
}

function showResult(futureValue) {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Future Value: $${futureValue.toFixed(2)}`;
  resultDiv.classList.remove("hidden");
  resultDiv.classList.add("result");
}
