//category dropdown initialize
$('.dropdown-trigger').dropdown();
$('#dropdown1 li').click(function () {
    a = $(this).text()
    $('.dropdownBtn').text(a)
})

//create on click even for login button. On login, capture id from db based on username - would actually go in index.js

//show password toggle on 
$("#pwshow").click(function () {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
});