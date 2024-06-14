
document.addEventListener("DOMContentLoaded", function () {
    
    const registrationForm = document.getElementById("registration");
   
    const loginForm = document.getElementById("login");
  
    
    registrationForm.addEventListener("submit", function (event) {
      /
      event.preventDefault();
      
      clearErrors();
  
      
      const username = this.username.value.trim().toLowerCase();
      
      const email = this.email.value.trim().toLowerCase();
      
      const password = this.password.value;
     
      const passwordCheck = this.passwordCheck.value;
      
      const terms = this.terms.checked;
  
      
      let valid = true;
      
      let errors = [];
  
      
      if (
        !username ||
        username.length < 4 ||
        /[^a-z0-9]/i.test(username) ||
        new Set(username).size < 2
      ) {
        
        errors.push(
          "Username must be at least four characters long, contain only alphanumeric characters, and include at least two unique characters."
        );
        
        this.username.focus();
       
        valid = false;
      }
  
      
      if (localStorage.getItem(username)) {
       
        errors.push("That username is already taken.");
        
        this.username.focus();
        
        valid = false;
      }
  
     
      if (
        !email ||
        !/\S+@\S+\.\S+/.test(email) ||
        email.endsWith("@example.com")
      ) {
        
        errors.push(
          'Please enter a valid email address that is not from "example.com".'
        );
       
        this.email.focus();
    
        valid = false;
      }
  
      
      if (
        password.length < 12 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[^\w\s]/.test(password) ||
        /password/i.test(password) ||
        password.includes(username)
      ) {
      
        errors.push(
          'Password must be at least 12 characters long and include uppercase, lowercase, a number, and a special character. It cannot contain the word "password" or your username.'
        );
      
        this.password.focus();
        
        valid = false;
      }
  
      
      if (password !== passwordCheck) {
       
        errors.push("Passwords do not match.");
       
        this.passwordCheck.focus();
        
        valid = false;
      }
  
     
      if (!terms) {
        
        errors.push("You must agree to the terms.");
        
        this.terms.focus();
        
        valid = false;
      }
  
      
      if (!valid) {
        
        displayErrors(errors);
      } else {
        
        localStorage.setItem(
          username,
          JSON.stringify({ username, email, password })
        );
     
        clearForm(this);
        
        displaySuccess("Registration successful!");
      }
    });
  
    
    loginForm.addEventListener("submit", function (event) {
      
      event.preventDefault();
      
      clearErrors();
  
     
      const username = this.username.value.trim().toLowerCase();
      
      const password = this.password.value;
  
      
      let valid = true;
      
      let errors = [];
  
     
      if (!username) {
        
        errors.push("Username cannot be blank.");
        
        this.username.focus();
        
        valid = false;
      } else if (!localStorage.getItem(username)) {
        
        errors.push("Username does not exist.");
        
        this.username.focus();
        
        valid = false;
      }
  
      
      const userData = JSON.parse(localStorage.getItem(username));
      
      if (userData && userData.password !== password) {
       
        errors.push("Incorrect password.");
       
        this.password.focus();
        
        valid = false;
      }
  
     
      if (!valid) {
        
        displayErrors(errors);
      } else {
       
        clearForm(this);
        
        let message = "Login successful!";
        
        if (this.persist.checked) {
          message += " You will be kept logged in.";
        }
       
        displaySuccess(message);
      }
    });
  
    
    function displayErrors(errors) {
      
      const errorDisplay = document.getElementById("errorDisplay");
     
      errorDisplay.innerHTML = errors.join("<br>");
     
      errorDisplay.style.display = "block";
    }
  
    
    function clearErrors() {
     
      const errorDisplay = document.getElementById("errorDisplay");
      
      errorDisplay.innerHTML = "";
      
      errorDisplay.style.display = "none";
    }
  
    function clearForm(form) {
      Array.from(form.elements).forEach((element) => (element.value = ""));
    }
  
    function displaySuccess(message) {
      const errorDisplay = document.getElementById("errorDisplay");
      errorDisplay.innerHTML = message;
      errorDisplay.style.display = "block";
      errorDisplay.style.color = "green";
    }
  });