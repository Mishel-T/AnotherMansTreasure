// Get references to page elements
const $userName = $("#name");
const $userEmail = $("#email");
const $userPassword = $("#password");

// The API object contains methods for each kind of request we'll make
const usersAPI = {
    saveUser: user => {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/users",
            data: JSON.stringify(user)
        });
    },
    getUser: () => {
        return $.ajax({
            url: "api/users",
            type: "GET"
        });
    },
    modifyUser: () => {
        return $.ajax({
            url: "api/users",
            type: "GET"
        });
    },
    deleteUser: id => {
        return $.ajax({
            url: "api/users/" + id,
            type: "DELETE"
        });
    }
};

// Saves the new user to the db
const createNewUser = () => {

    const user = {
        name: $userName.val().trim(),
        email: $userEmail.val().trim(),
        password: $userPassword.val().trim()
    }

    usersAPI.saveUser(user);

    $userName.val("");
    $userEmail.val("");
    $userPassword.val("");
};

$(document).ready(() => {

    // Create new user
    $("#userSubmit").on("click", createNewUser);

});