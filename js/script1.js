// =========================
// RESUME JAVASCRIPT
// =========================

// Welcome message when resume is opened
window.addEventListener("load", function () {
    console.log("Welcome to Arnav Garg's Resume!");
});


// =========================
// OPEN LINKS SAFELY
// =========================

const links = document.querySelectorAll("a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        console.log("Opening: " + link.textContent);

    });

});


// =========================
// CURRENT YEAR
// =========================

const currentYear = new Date().getFullYear();

console.log("Current Year: " + currentYear);