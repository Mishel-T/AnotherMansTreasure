// Get references to page elements
const $productName = $("#item-name");
const $productLoc = $("#post-loc");
const $productDesc = $("#description");

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
        type: "Placeholder",
        location: $productLoc.val().trim(),
        description: $productDesc.val().trim(),
        img_path: "placeholder"
    }

    productsAPI.saveProduct(product);

    $productName.val("");
    $productLoc.val("");
    $productDesc.val("");
};

$(document).ready(() => {

    // Create new product
    $("#productSubmit").on("click", createNewProduct);

});