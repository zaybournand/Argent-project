let goalList = [];

function addGoal() {
    const goalName = document.getElementById('goal-name').value;
    const targetAmount = document.getElementById('target-amount').value;
    const targetDate = document.getElementById('target-date').value;

    if (!goalName || !targetAmount || !targetDate) {
        alert('Please fill out all fields.');
        return;
    }

    const newGoal = {
        id: Date.now(),
        name: goalName,
        targetAmount: targetAmount,
        savedAmount: 0, // Start at 0 saved
        targetDate: targetDate,
    };

    goalList.push(newGoal);
    displayGoals();
}

function displayGoals() {
    const goalListDiv = document.getElementById('goal-list');
    goalListDiv.innerHTML = ''; // Clear previous content

    goalList.forEach((goal) => {
        // Calculate progress percentage
        const progress = Math.min(
            (goal.savedAmount / goal.targetAmount) * 100,
            100
        );

        const goalCard = document.createElement('div');
        goalCard.className = 'goal-card';

        goalCard.innerHTML = `
            <div class="goal-info">
                <h3>${goal.name}</h3>
                <div class="goal-progress" style="--progress: ${progress};">
                    <div class="progress-text">${Math.round(progress)}%</div>
                </div>
            </div>
            <button class="delete-btn" onclick="deleteGoal(${goal.id})">Delete</button>
        `;

        goalListDiv.appendChild(goalCard);
    });
}

function deleteGoal(id) {
    goalList = goalList.filter(goal => goal.id !== id);
    displayGoals();
}
