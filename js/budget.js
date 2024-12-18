function handleSubmit() {
    const income = document.getElementById("income").value;
    const rent = document.getElementById("rent").value;
    const savings = document.getElementById("savings-monthly").value;
    const groceries = document.getElementById("groceries").value;
    const shortTermGoals = document.getElementById("short-term-goals").value;

    alert(`Income: ${income}\nRent: ${rent}\nSavings: ${savings}\nGroceries: ${groceries}\nShort-term Goals: ${shortTermGoals}`);
}
