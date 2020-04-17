$(document).ready(function () {
  // This file does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  function loginUser(email, password) {
    $.post("/login", {
      email: email,
      password: password
    })
      .then(function () {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});

