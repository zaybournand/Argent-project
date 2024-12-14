// Simulating user data
const userData = {
    name: "John Doe",
    email: "johndoe@example.com"
};

// Injecting user data into HTML
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("user-name").textContent = userData.name;
    document.getElementById("user-email").textContent = userData.email;
});
