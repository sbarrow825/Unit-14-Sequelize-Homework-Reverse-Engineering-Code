$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) { // hits the api/user_data route then waits
    // for a response from the server before executing the "then" function. If the get
    // request is successful, the server will return on object containing both the email
    // and id of the user that's currently logged in. That object will be passed in as "data"
    // in the callback function

    $(".member-name").text(data.email); // jQuery syntax for selecting all DOM nodes of class=member-name
    // and setting their text attribute to that of the email that was returned by the server upon
    // making this get request.
  });
});
