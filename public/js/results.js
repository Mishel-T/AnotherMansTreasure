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
    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeRows() {
        productContainer.empty();
        var productsToAdd = [];
        for (var i = 0; i < products.length; i++) {
            productsToAdd.push(createNewCard(products[i]));
        }
        productContainer.append(productsToAdd);
    }

    // This function constructs a product's HTML
    function createNewCard(product) {
        console.log("placeholder for dynamically created cards")
        var newProductCard = $("<div>");
        newProductCard.addClass("card col s3");
        var newProductImageContainer = $("<div>");
        newProductImageContainer.addClass("card-image waves-effect waves-block waves-light");
        var newProductImage = $("<img>");
        newProductImage.addClass("activator");
        //newProductImage.attr("src", product.img_path);
        // var imageName = $("#image").val();
        // console.log(imageName);
        // var imagePath =  "../images/" + imageName;
        // console.log(imagePath);
        // newProductImage.attr("src", imagePath);
        newProductImage.attr("src", "../images/snes.jpg")
        var newProductCardContent = $("<div>");
        newProductCardContent.addClass("card-content");
        var newProductTitle = $("<span>")
        newProductTitle.addClass("card-title activator grey-text text-darken-4");
        newProductTitle.text(product.item_name);
        var newProductTitleLoc = $("<p>").text(product.location);
        newProductTitle.append(newProductTitleLoc);
        var newProductTitleI = $("<i>")
        newProductTitleI.addClass("material-icons right");
        newProductTitleI.text("more_vert")
        newProductTitle.append(newProductTitleI);
        var submitTradeLink = $("<p>");
        var link = $("<a>").attr("href", "/post");
        link.text("Submit a Trade");
        submitTradeLink.append(link);
        var cardReveal = $("<div>");
        cardReveal.addClass("card-reveal");
        var cardSpan = $("<span>");
        cardSpan.addClass("card-title grey-text text-darken-4");
        cardSpan.text(product.item_name)
        var cardSpanI = $("<i>");
        cardSpanI.addClass("material-icons right");
        cardSpanI.text("close")
        cardSpan.append(cardSpanI);
        cardReveal.append(cardSpan);


        var cardDescription = $("<p>");
        cardDescription.text(product.description)

        newProductImageContainer.prepend(newProductImage);
        newProductCard.append(newProductImageContainer);
        newProductCardContent.append(newProductTitle);
        newProductCardContent.append(submitTradeLink);
        newProductCard.append(newProductCardContent);
        cardReveal.append(cardDescription);
        newProductCard.append(cardReveal);

        return newProductCard;

    }

    // This function displays a message when there are no products
    function displayEmpty() {
        productContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.attr('id', 'no-product');
        messageH2.html("No products have been added that match your search yet. Check back regularly to see new products! <br> Try a different <a href='/index'>search.</a>");
        productContainer.append(messageH2);
    }
})