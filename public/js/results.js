$(document).ready(function () {

    var location = "";
    var category = "";
    var productContainer = $(".product-container");

    //create on click event for search button. On click, capture values for location and/or category
    //add validation to make sure user has entered at least one search parameter
    $("#search-btn").click(function (event) {
        event.preventDefault

        var location = $("#location").val().trim();
        var category = $("#category").val();
        console.log(location)
        console.log(category)
        //if location or cateogry not selected, alert user and stop results page from loading. 

        if ($("#location").is(":empty") && !category) {
            console.log("exit search event")
            return alert('Please select a location and category first.');
        }

        else if (category != "none" && location.length != 0) {
            window.location.href = "results.html"

        }

        getProducts(location, category);
    });


    //use values and get data from get request 
    // This function grabs products from the database and updates the view
    function getProducts() {
        console.log("in getProducts")
        var categoryString = category || "";
        var locationString = location || "";
        if (categoryString) {
            categoryString = "/category/" + categoryString;
        }
        $.get("/api/products" + categoryString, function (data) {
            console.log("Products", data);
            products = data;
            if (!products || !products.length) {
                displayEmpty();
            }
            else {
                initializeCards();
            }
        });
    }
    //handles posting all search results to results page
    function initializeCards() {
        productContainer.empty();
        var productsToAdd = [];
        for (var i = 0; i < products.length; i++) {
            productsToAdd.push(createNewCard(posts[i]));
        }
        productContainer.append(productstoAdd);
    }

    //create function to create card elements to house product results from initializeCards

    // This function displays a message when there are no products
    function displayEmpty() {
        productContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.attr('id', 'no-product');
        messageH2.html("No products have been added that match your search yet. Check back regularly to see new products! <br> Try a different <a href='/index'>search.</a>");
        productContainer.append(messageH2);
    }
})