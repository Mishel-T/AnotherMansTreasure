$('.dropdown-trigger').dropdown();

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");


// Opens modal for account created message$(document).ready(function(){
$(document).ready(function () {
    $('.modal').modal();
});

// The API object contains methods for each kind of request we'll make
var API = {
    saveExample: function (example) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/examples",
            data: JSON.stringify(example)
        });
    },
    getExamples: function () {
        return $.ajax({
            url: "api/examples",
            type: "GET"
        });
    },
    deleteExample: function (id) {
        return $.ajax({
            url: "api/examples/" + id,
            type: "DELETE"
        });
    }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
    API.getExamples().then(function (data) {
        var $examples = data.map(function (example) {
            var $a = $("<a>")
                .text(example.text)
                .attr("href", "/example/" + example.id);

            var $li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": example.id
                })
                .append($a);

            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");

            $li.append($button);

            return $li;
        });

        $exampleList.empty();
        $exampleList.append($examples);
    });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
    event.preventDefault();

    var example = {
        text: $exampleText.val().trim(),
        description: $exampleDescription.val().trim()
    };

    if (!(example.text && example.description)) {
        alert("You must enter an example text and description!");
        return;
    }

    API.saveExample(example).then(function () {
        refreshExamples();
    });

    $exampleText.val("");
    $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");

    API.deleteExample(idToDelete).then(function () {
        refreshExamples();
    });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);


// Get new user
$(document).ready(() => {
    const $userName = $("#name");
    const $userEmail = $("#email");
    const $userPassword = $("#password");

    $("#userSubmit").on("click", () => {
        console.log(`Name: ${$userName.val().trim()} \nEmail: ${$userEmail.val().trim()} \nPassword: ${$userPassword.val().trim()}`);

        const user = {
            name: $userName.val().trim(),
            email: $userEmail.val().trim(),
            password: $userPassword.val().trim()
        }

        $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/users",
            data: JSON.stringify(user)
        });
    });

});