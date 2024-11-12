document.addEventListener("DOMContentLoaded", () => {
    // Getting the form elements
    const signInForm = document.querySelector("form");
    const userEmailInput = document.getElementById("userEmail");
    const passwordInput = document.getElementById("password");
    const rememberCheckbox = document.getElementById("remember-checkbox");
    const submitButton = document.getElementById("submit");
    
    // Getting the error message container
    const msgContainer = document.querySelector(".msg");
    const msgTitle = document.querySelector(".msg-title");
    
    // Handling form submission
    signInForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevents the default form submission

        const userEmail = userEmailInput.value.trim();
        const password = passwordInput.value.trim();

        // Simple validation for empty fields
        if (!userEmail || !password) {
            alert("Please enter both userEmail and password.");
            return;
        }

        // Simulate authentication
        // const userEmail= "testuser";
        const correctPassword = "12345";
        const correctuserEmail="alka@iiitr.ac.in";

        if (userEmail === correctuserEmail&& password === correctPassword) {
            // Simulating successful sign-in, redirect to home page
            window.location.href = "home.html";
        } else {
            // Show incorrect password message if credentials don't match
            const msgTitle = document.querySelector(".msg-title");
            msgContainer.classList.add("show"); 
            msgTitle.textContent = "Incorrect userEmail or password entered!";
            msgTitle.style.color = "red";
        }

         // Redirect to sign-in page after 2 seconds
         setTimeout(() => {
            window.location.href = "sign_in.html";
        }, 2000);
        
    });

    // Remember me functionality (simulating local storage usage)
    rememberCheckbox.addEventListener("change", () => {
        if (rememberCheckbox.checked) {
            localStorage.setItem("rememberMe", true);
            localStorage.setItem("userEmail", userEmailInput.value);
        } else {
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("userEmail");
        }
    });

    // On page load, if "remember me" was checked, auto-fill the userEmail
    if (localStorage.getItem("rememberMe")) {
        userEmailInput.value = localStorage.getItem("userEmail");
        rememberCheckbox.checked = true;
    }
});
