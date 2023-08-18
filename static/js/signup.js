
document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const formData = new FormData(signupForm);
        const requestData = {
            method: "POST",
            body: formData
        };

        console.log(requestData);
        try {
            const response = await fetch("/api/me", requestData);

            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                window.location.href = "/";
            } else {
                alert("Signup Failed");
            }
        } catch (error) {
            alert("Error during signup:", error);
        }
    });
});
