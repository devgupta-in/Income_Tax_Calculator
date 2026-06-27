const form = document.querySelector("#tax-form");
const incomeInput = document.querySelector("#income");
const errorMessage = document.querySelector("#income-error");
const result = document.querySelector("#result");
const taxAmount = document.querySelector("#tax-amount");
const postTaxIncome = document.querySelector("#post-tax");
const effectiveRate = document.querySelector("#effective-rate");
const recalculateButton = document.querySelector("#recalculate");

const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
});

function calculateTax(income) {
    if (income <= 1200000) {
        return 0;
    }

    if (income <= 1600000) {
        return (income - 1200000) * 0.15;
    }

    if (income <= 2000000) {
        return (income - 1600000) * 0.20 + 60000;
    }

    if (income <= 2400000) {
        return (income - 2000000) * 0.25 + 140000;
    }

    return (income - 2400000) * 0.30 + 240000;
}

function showError(message) {
    incomeInput.setAttribute("aria-invalid", "true");
    errorMessage.textContent = message;
    result.classList.remove("is-visible");
    result.setAttribute("aria-hidden", "true");
}

function clearError() {
    incomeInput.removeAttribute("aria-invalid");
    errorMessage.textContent = "";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const income = Number(incomeInput.value);

    if (incomeInput.value.trim() === "" || !Number.isFinite(income)) {
        showError("Please enter your annual income.");
        incomeInput.focus();
        return;
    }

    if (income < 0) {
        showError("Income cannot be negative.");
        incomeInput.focus();
        return;
    }

    clearError();

    const tax = calculateTax(income);
    const rate = income === 0 ? 0 : (tax / income) * 100;

    taxAmount.textContent = currencyFormatter.format(tax);
    postTaxIncome.textContent = currencyFormatter.format(income - tax);
    effectiveRate.textContent = `${rate.toFixed(1)}%`;
    result.classList.add("is-visible");
    result.setAttribute("aria-hidden", "false");
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });

    form.reset();
});

incomeInput.addEventListener("input", clearError);

recalculateButton.addEventListener("click", () => {
    result.classList.remove("is-visible");
    result.setAttribute("aria-hidden", "true");
    incomeInput.value = "";
    incomeInput.focus();
});
