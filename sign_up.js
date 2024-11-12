document.addEventListener("DOMContentLoaded", () => {
    // Get form elements
    const signUpForm = document.querySelector("form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const rememberCheckbox = document.getElementById("remember-checkbox");
    // const submitButton = document.getElementById("submit");

    // Message container
    const msgContainer = document.querySelector(".msg");
    const msgTitle = document.querySelector(".msg-title");

    // Initially hide the message container
    // msgContainer.style.display = "none";

    // Handle form submission
    signUpForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission+

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation for empty fields
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }
        else
        {
            // const msgTitle = document.querySelector(".msg-title");
            msgTitle.textContent = "Signed up successfully!";
            // msgContainer.style.display = "block"; // Display the success message
            msgContainer.classList.add("show"); // Show the message container
            msgTitle.style.color = "green";
        }
        
        
        // Display success message
        // window.location.href = "sign_in.html";
        
        // Redirect to sign-in page after 2 seconds
        setTimeout(() => {
            window.location.href = "sign_in.html";
        }, 2000);
        
    });
    // Simulate saving the username and password
    rememberCheckbox.addEventListener("change", () => {
        if (rememberCheckbox.checked) {
            localStorage.setItem("rememberMe", true);
            localStorage.setItem("username", usernameInput.value);
        } else {
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("username");
        }
    });
    
    // Auto-fill username if "Remember me" was checked previously
    if (localStorage.getItem("rememberMe")) {
        usernameInput.value = localStorage.getItem("username");
        rememberCheckbox.checked = true;
    }
});
