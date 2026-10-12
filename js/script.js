document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const navLinks = document.querySelectorAll("header ul li a");
    const searchInput = document.querySelector("main input[type='text']");
    const main = document.querySelector("main");

    /* ---------- 1. Header shadow on scroll ---------- */
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 10);
    });

    /* ---------- 2. Highlight the clicked nav link ---------- */
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            navLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");

            if (link.textContent.trim() === "Login") {
                openModal();
            }
        });
    });

    /* ---------- 3. Search input ---------- */
    const message = document.createElement("div");
    message.className = "search-message";
    message.style.display = "none";
    main.appendChild(message);

    searchInput.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;

        const query = searchInput.value.trim();

        if (query === "") {
            searchInput.classList.add("error");
            message.style.display = "none";
            setTimeout(() => searchInput.classList.remove("error"), 400);
            return;
        }

        message.textContent = `Searching for "${query}"...`;
        message.style.display = "block";
    });

    searchInput.addEventListener("input", () => {
        if (searchInput.value.trim() === "") {
            message.style.display = "none";
        }
    });

    /* ---------- 4. Login modal ---------- */
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-label="Log in">
            <h2>Log in</h2>
            <input type="email" id="login-email" placeholder="Email">
            <input type="password" id="login-password" placeholder="Password">
            <button id="login-submit">Log in</button>
            <button class="close-btn" id="login-close">Cancel</button>
        </div>
    `;
    document.body.appendChild(overlay);

    function openModal() {
        overlay.classList.add("open");
        document.getElementById("login-email").focus();
    }

    function closeModal() {
        overlay.classList.remove("open");
    }

    document.getElementById("login-close").addEventListener("click", closeModal);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    document.getElementById("login-submit").addEventListener("click", () => {
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }

        alert("Logged in as " + email);
        closeModal();
    });
});