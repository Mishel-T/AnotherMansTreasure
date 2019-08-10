// Get references to page elements
const $productName = $("#item-name");
const $productLoc = $("#post-loc");
const $productDesc = $("#description");
const $productType = $("#category");
const $productImage = $("#image");


// Gets the part of the url that comes after the "?" (which we have if we're updating a post)
var url = window.location.search;
var userId;

if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    console.log(userId)
}
// The API object contains methods for each kind of request we'll make
const productsAPI = {
    saveProduct: product => {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/products",
            data: JSON.stringify(product)
        });
    },
    getProduct: () => {
        return $.ajax({
            url: "api/products",
            type: "GET"
        });
    },
    modifyProduct: () => {
        return $.ajax({
            url: "api/products",
            type: "PUT"
        });
    },
    deleteProduct: id => {
        return $.ajax({
            url: "api/products/" + id,
            type: "DELETE"
        });
    }
};

// Saves the new product to the db
const createNewProduct = () => {

    const product = {
        item_name: $productName.val().trim(),
        type: $productType.val(),
        location: $productLoc.val().trim(),
        description: $productDesc.val().trim(),
        img_path: $productImage.val(),
        UserId: userId


    }

    productsAPI.saveProduct(product);

    $productName.val("");
    $productLoc.val("");
    $productDesc.val("");
    $productType.val("");
    getProductData()

};

function getProductData() {
    $.get("/api/products", function (data) {
        console.log(data)

        var url = window.location.search;
        var userId;
        if (url.indexOf("?user_id=") !== -1) {
            userId = url.split("=")[1];
            window.location.href = "/users?user_id=" + userId
        }



    });

}

$(document).ready(() => {

    // Create new product
    $("#productSubmit").on("click", createNewProduct);

});