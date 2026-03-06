// ================= REGISTER PAGE =================
const form = document.getElementById("registrationForm");

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const userData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        try {
            await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(userData);
            localStorage.setItem("users", JSON.stringify(users));

            document.getElementById("message").innerText = "Registration Successful!";

            setTimeout(() => {
                window.location.href = "display.html";
            }, 1000);

        } catch (error) {
            console.error("POST Error:", error);
        }
    });
}

// ================= DISPLAY PAGE =================
const loadBtn = document.getElementById("loadDataBtn");

if (loadBtn) {
    loadBtn.addEventListener("click", async () => {
        console.log("clicked the btn");

        try {
            await fetch("https://jsonplaceholder.typicode.com/posts/1");

            const users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.length === 0) {
                alert("No user data found");
                return;
            }

            const user = users[users.length - 1];

            document.getElementById("d_name").value = user.name;
            document.getElementById("d_email").value = user.email;
            document.getElementById("d_password").value = user.password;

        } catch (error) {
            console.error("GET Error:", error);
        }
    });
}