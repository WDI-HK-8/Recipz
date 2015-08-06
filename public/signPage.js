$(document).ready(function(){
  $('#signUpSubmit').click(function(){
    event.preventDefault();

    var email = $('#signUp > input[id="signUpEmail"]');
    var name = $('#signUp > input[id="signUpName"]');
    var username = $('#signUp > input[id="signUpUsername"]');
    var password = $('#signUp > input[id="signUpPassword"]');

    $.ajax({
      type: 'POST',
      url: '/users',
      data: {
        user: {
          email: email.val(),
          name: name.val(),
          username: username.val(),
          password: password.val()
        }
      },
      dataType: 'JSON',
      success: function(response){
        console.log(response);
        alert("Congratulations! User created!");
        window.location.href = "/";
        $.ajax({
          type: 'POST',
          url: '/sessions',
          data: {
            user: {
              username: username.val(),
              password: password.val()
            }
          },
          dataType: 'json',
          success: function(response){
            if(response.userExist === false){
              alert("Record not found. Please sign up.")
            } else if (response.authorized === false){
              alert("Credentials not correct, please check again")
            } else {
              alert('Login successful!')
              window.location.href = '/';
            }
          }
        })
      }
    });
  });

  $('#signInSubmit').click(function(){
    event.preventDefault();

    var username = $('#signIn > input[id="signInUsername"]');
    var password = $('#signIn > input[id="signInPassword"]');

    $.ajax({
      type: 'POST',
      url: '/sessions',
      data: {
        user: {
          username: username.val(),
          password: password.val()
        }
      },
      dataType: 'json',
      success: function(response){
        if(response.userExist === false){
          alert("Record not found. Please sign up.")
        } else if (response.authorized === false){
          alert("Credentials not correct, please check again")
        } else {
          alert('Login successful!')
          window.location.href = '/';
        }
      }
    })
  });
});