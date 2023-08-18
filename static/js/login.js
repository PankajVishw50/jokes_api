
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const requestData = {
            method: "POST",
            body: formData
        };

        console.log(requestData);
        try {
            const response = await fetch("/api/login", requestData);

            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                window.location.href = "/";
            } else {
                alert("Login failed");
            }
        } catch (error) {
            alert("Error during login:", error);
        }
    });
});
