//category dropdown initialize
$(document).ready(function () {
    $('.modal').modal();



    //clearing warning to enter username and pw
    $("#id01").click(
        function clearDiv() {
            $("#warning").empty();
            $("#loginUname").empty();
            $("#loginpw").empty()

        });

    //create on click event for login button. 
    $(document).on("click", "#login-btn", userLogin);
    //on click event for post an item button 
    $(document).on("click", "#post-item-btn", postItem);

    //login function
    function userLogin(event) {
        event.preventDefault();
        var username = $("#loginUname").val().trim();
        var password = $("#loginpw").val();
        console.log(username)
        // Don't do anything if the fields haven't been filled out
        if (!username || !password) {
            var noLogin = $("<p>").text("Please enter username and password")
            $("#warning").append(noLogin)
            return;
        }
        //function to pull user info
        var url = window.location.search;
        console.log(url);

        var userId;
        if (url.indexOf("?user_id") !== -1) {
            userId = url.split("=")[1];
            getProducts(userId);
            console.log(userId)
        }


        window.location.href = "/users?user_id=" + user.id

        //getUserProfile(username);

    };

    //on click event for post an item button to capture id and direct to that post page (like the post an item link in displayEmpty)

    function postItem(id) {
        var query = window.location.search;
        window.location.href='/post' + query 
    }

    //begin blog.js equivalent code - finds all products by user and dispplays them      

    // product container holds all of our products
    var productContainer = $(".product-container");
    var postCategorySelect = $("#category");
    // Variable to hold products
    var products;

    // The code below handles the case where we want to get products for a specific user
    // Looks for a query param in the url for user_id
    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        getProducts(userId);
    }

    function getProducts(user) {
        userId = user || "";
        if (userId) {
            userId = "/?user_id=" + userId;
        }
        $.get("/api/products" + userId, function (data) {
            console.log("Products", data);
            products = data;
            if (!products || !products.length) {
                displayEmpty(user);
            }
            else {
                initializeRows();
            }
        });
    }

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
        newProductImage.attr("src", product.img_path);
        console.log(product.img_path);
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

        newProductImageContainer.append(newProductImage);
        newProductCard.append(newProductImageContainer);
        newProductCardContent.append(newProductTitle);
        newProductCardContent.append(submitTradeLink);
        newProductCard.append(newProductCardContent);
        cardReveal.append(cardDescription);
        newProductCard.append(cardReveal);

        return newProductCard;



        // newPostAuthor.text("Written by: " + post.Author.name);
        // newPostAuthor.css({
        //     float: "right",
        //     color: "blue",
        //     "margin-top":
        //         "-10px"
        // });
        // var newPostCardBody = $("<div>");
        // newPostCardBody.addClass("card-body");
        // var newPostBody = $("<p>");
        // newPostTitle.text(post.title + " ");
        // newPostBody.text(post.body);
        // newPostDate.text(formattedDate);
        // newPostTitle.append(newPostDate);
        // newPostCardHeading.append(deleteBtn);
        // newPostCardHeading.append(editBtn);
        // newPostCardHeading.append(newPostTitle);
        // newPostCardHeading.append(newPostAuthor);
        // newPostCardBody.append(newPostBody);
        // newPostCard.append(newPostCardHeading);
        // newPostCard.append(newPostCardBody);
        // newPostCard.data("post", post);
        // return newProductCard;

    }

    // This function displays a message when there are no posts
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for User #" + id;
        }
        productContainer.empty();
        var messageH6 = $("<h6>");
        messageH6.html("No products posted yet yet. Click <a href='/post" + query +
            "'>Post an Item</a> to get started.");
        productContainer.append(messageH6);
    }




    

    //use username to find id in db 
    // This function does an API call to delete posts
    // function deletePost(id) {
    //     $.ajax({
    //         method: "DELETE",
    //         url: "/api/posts/" + id
    //     })
    //         .then(function () {
    //             getPosts(postCategorySelect.val());
    //         });
    // }

    // function getUserProfile(username) {
    //     $.get("/api/users/:email", username, function () {
    //         $.ajax({
    //         method: "GET",
    //         url: "/api/users/" + username

    //     })
    //         .then(function (response) {
    //             console.log(response)
    //         });
    //         //once user verified against db, open profile page
    //        // window.location.href = "/profile.html";
    //         console.log(username)
    //     };



    // This function grabs products from the database and updates the view
    // function getProducts(user) {
    //     userID = user || "";
    //     if (userId) {
    //         userId = "/?user_id=" + userId;
    //     }
    //     $.get("/api/products" + userId, function (data) {
    //         console.log("Products", data);
    //         products = data;
    //         if (!products || !products.length) {
    //             displayEmpty(user);
    //         }
    //         else {
    //             console.log(userId)
    //             //initializeRows();
    //         }
    //     });
    // }
    //----------------------------------------------------------------


    //     // Upload photos to Amazon S3 Bucket
    //     function addPhoto(albumName) {
    //         var files = document.getElementById('photoupload').files;
    //         if (!files.length) {
    //             return alert('Please choose a file to upload first.');
    //         }
    //         var file = files[0];
    //         var fileName = file.name;
    //         var albumPhotosKey = encodeURIComponent(albumName) + '//';

    //         var photoKey = albumPhotosKey + fileName;
    //         s3.upload({
    //             Key: photoKey,
    //             Body: file,
    //             ACL: 'public-read'
    //         }, function (err, data) {
    //             if (err) {
    //                 return alert('There was an error uploading your photo: ', err.message);
    //             }
    //             alert('Successfully uploaded photo.');
    //             viewAlbum(albumName);
    //         });
    //     }

    //     function viewAlbum(albumName) {
    //         var albumPhotosKey = encodeURIComponent(albumName) + '//';
    //         s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
    //             if (err) {
    //                 return alert('There was an error viewing your album: ' + err.message);
    //             }
    //             // 'this' references the AWS.Response instance that represents the response
    //             var href = this.request.httpRequest.endpoint.href;
    //             var bucketUrl = href + albumBucketName + '/';

    //             var photos = data.Contents.map(function (photo) {
    //                 var photoKey = photo.Key;
    //                 var photoUrl = bucketUrl + encodeURIComponent(photoKey);
    //                 return getHtml([
    //                     '<span>',
    //                     '<div>',
    //                     '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
    //                     '</div>',
    //                     '<div>',
    //                     '<span onclick="deletePhoto(\'' + albumName + "','" + photoKey + '\')">',
    //                     'X',
    //                     '</span>',
    //                     '<span>',
    //                     photoKey.replace(albumPhotosKey, ''),
    //                     '</span>',
    //                     '</div>',
    //                     '</span>',
    //                 ]);
    //             });
    //             var message = photos.length ?
    //                 '<p>Click on the X to delete the photo</p>' :
    //                 '<p>You do not have any photos in this album. Please add photos.</p>';
    //             var htmlTemplate = [
    //                 '<h2>',
    //                 'Album: ' + albumName,
    //                 '</h2>',
    //                 message,
    //                 '<div>',
    //                 getHtml(photos),
    //                 '</div>',
    //                 '<input id="photoupload" type="file" accept="image/*">',
    //                 '<button id="addphoto" onclick="addPhoto(\'' + albumName + '\')">',
    //                 'Add Photo',
    //                 '</button>',
    //                 '<button onclick="listAlbums()">',
    //                 'Back To Albums',
    //                 '</button>',
    //             ]
    //             document.getElementById('app').innerHTML = getHtml(htmlTemplate);
    //         });
    //     }

    //     //show password toggle on 
    //     $("#pwshow").click(function () {
    //         var x = document.getElementById("password");
    //         if (x.type === "password") {
    //             x.type = "text";
    //         } else {
    //             x.type = "password";
    //         }
    //     });
});

