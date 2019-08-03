//create on click even for login button. On login, capture id from db based on username

//show password toggle on 
$("#pwshow").click(function() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
});