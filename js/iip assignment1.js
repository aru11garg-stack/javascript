// Get the form
const form = document.querySelector("form");

// Get input fields
const username = document.getElementById("username");
const password = document.getElementById("password");

// Get message area
const message = document.getElementById("message");

// When Login button is clicked
form.addEventListener("submit", function(event) {

    // Prevent page from refreshing
    event.preventDefault();

    // Get entered values
    let user = username.value.trim();
    let pass = password.value.trim();

    // Check if fields are empty
    if (user === "" || pass === "") {
        message.textContent = "Please enter username and password.";
        message.style.color = "red";
    }

    // Check username and password
    else if (user === "student" && pass === "12345") {
        message.textContent = "Login successful!";
        message.style.color = "green";
    }

    // Wrong username/password
    else {
        message.textContent = "Invalid username or password.";
        message.style.color = "red";
    }
});