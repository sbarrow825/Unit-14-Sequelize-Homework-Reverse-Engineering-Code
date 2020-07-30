$(document).ready(function() { // waits for the document to fully load before doing anything
  // Getting references to our form and inputs
  var loginForm = $("form.login"); // jQuery syntax for selecting DOM elements. Creates a variable loginForm which points to the login.form DOM node
  var emailInput = $("input#email-input"); // creates a variable emailInput which points to all inputs with id=email-input
  var passwordInput = $("input#password-input"); // creates a variable passwordInput which points to all inputs with id=password-input

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) { // jQuery syntax for adding an on submit event listener to the loginForm variable
    event.preventDefault(); // prevents the form from submitting like it usually would
    var userData = { // instantiates a new object named userData
      email: emailInput.val().trim(), // sets a key value pair in the object userData,
      // where key = email and value = what the user typed into the emailInput input field.
      // .trim() removes all whitespace from the beginning and end of the string
      password: passwordInput.val().trim() // sets a key value pair in the object userData,
      // where key = passowrd and value = what the user typed into the passwordInput input field.
      // .trim() removes all whitespace from the beginning and end of the string
    };

    if (!userData.email || !userData.password) { // if either the email input field or password field
      // were left empty, return out of the function before doing anything
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password); // call the function on line 32 with the
    // inputted email and password values as parameters
    emailInput.val(""); // sets the text in emailInput back to the empty string
    passwordInput.val(""); // sets the text in passwordInput back to the empty string
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", { // makes a request to the server, telling the server that it's making a POST
    // request at the url /api/login and handing it and object, and expecting a response back.
      email: email,
      password: password
    })
      .then(function() { // everything inside the "then" promise will only be run after the client
      // has recieved a response from the server
        window.location.replace("/members"); // redirect to the members page
        // If there's an error, log the error
      })
      .catch(function(err) { // if the post request didn't work, this will be ran instead of the
      // "then" promise above
        console.log(err); // console log the error that the server sent to the client as a response
      });
  }
});
