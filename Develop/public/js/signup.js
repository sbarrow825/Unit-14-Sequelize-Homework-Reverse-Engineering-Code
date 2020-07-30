$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup"); // jQuery syntax for selecting DOM nodes. Same description as in login.js
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) { // jQuery on submit event listener for signUpForm
    event.preventDefault(); // prevent the form from submitting itself
    var userData = { // create a new object userData
      email: emailInput.val().trim(), // set a new key-value pair in the userData object
      // with key = email and value = what the user typed in to the emailInput section
      // minus any whitespace before and after the entry thanks to .trim()
      password: passwordInput.val().trim() // same as above but with the passwordInput section
    };

    if (!userData.email || !userData.password) { // if either the email or password fields
      // were blank when the client clicked submit, return out of the function before doing anything
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password); // call the function on line 30 with the
    // inputted email and password as parameters
    emailInput.val(""); // reset the text inside the email input section to an empty string
    passwordInput.val("");// reset the text inside the password input section to an empty string
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", { // makes a POST request to the /api/signup route
      email: email, // gives the server a JSON object as part the request
      password: password
    })
      .then(function(data) { // after the server responds with confirmation that the user is signed up
        window.location.replace("/members"); // redirect to the members page
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr); // runs instead of the "then" callback if the server responds with an err
  }

  function handleLoginErr(err) { // called if the server responds with an error
    $("#alert .msg").text(err.responseJSON); // notifies the user of what went wrong
    // by setting the DOM element with id=alert's text equal to the responseJSON field
    // of the err that was return
    $("#alert").fadeIn(500); // fades in the DOM element with id=alert
  }
});
