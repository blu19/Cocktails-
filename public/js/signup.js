$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var birthdateInput = $("#dob-input");



  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      user_dob: birthdateInput.val().trim()
    };

    var userDob = new Date(userData.user_dob)

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var evaluatedDate = new Date(year - 21, month, day);


    if (!userData.email || !userData.password || userDob >= evaluatedDate) {
      window.location.href = "http://www.eelslap.com/"
      return;
    }


    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.user_dob);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, user_dob) {
    console.log("hello")
    $.post("/signup", {
      user_name: "username",
      email: email,
      password: password,
      user_dob: user_dob,

    })
      .then(function (data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(function (err) {
        console.log("in the .catch++++++++++++")
        console.log(err)
        handleLoginErr(err)
      })
  }

  function handleLoginErr(err) {
    console.log("in the handleLoginErr")
    console.log(err.responseJSON)
    let alertMessage;
    for (let index = 0; index < err.responseJSON.errors.length; index++) {
      alertMessage = alertMessage + " " + err.responseJSON.errors[index].message;
    }
    $("#alert .msg").text(alertMessage);
    $("#alert").fadeIn(500);
  }
});


