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

        //once user verified against db, open profile page
        window.location.href = "profile.html";

        getUserProfile();

    };

    //function to pull user info
    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        getProducts(userId);
    }

    // This function grabs products from the database and updates the view
    function getProducts(user) {
        userID = user || "";
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
                console.log(userId)
                //initializeRows();
            }
        });
    }
    //----------------------------------------------------------------

    var albumBucketName = 'anothermanstreasure';
    var bucketRegion = 'us-west-2';
    var IdentityPoolId = 'IDENTITY_POOL_ID';

    AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
        })
    });

    var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: albumBucketName }
    });

    // Upload photos to Amazon S3 Bucket
    function addPhoto(albumName) {
        var files = document.getElementById('photoupload').files;
        if (!files.length) {
            return alert('Please choose a file to upload first.');
        }
        var file = files[0];
        var fileName = file.name;
        var albumPhotosKey = encodeURIComponent(albumName) + '//';

        var photoKey = albumPhotosKey + fileName;
        s3.upload({
            Key: photoKey,
            Body: file,
            ACL: 'public-read'
        }, function (err, data) {
            if (err) {
                return alert('There was an error uploading your photo: ', err.message);
            }
            alert('Successfully uploaded photo.');
            viewAlbum(albumName);
        });
    }

    function viewAlbum(albumName) {
        var albumPhotosKey = encodeURIComponent(albumName) + '//';
        s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
            if (err) {
                return alert('There was an error viewing your album: ' + err.message);
            }
            // 'this' references the AWS.Response instance that represents the response
            var href = this.request.httpRequest.endpoint.href;
            var bucketUrl = href + albumBucketName + '/';

            var photos = data.Contents.map(function (photo) {
                var photoKey = photo.Key;
                var photoUrl = bucketUrl + encodeURIComponent(photoKey);
                return getHtml([
                    '<span>',
                    '<div>',
                    '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
                    '</div>',
                    '<div>',
                    '<span onclick="deletePhoto(\'' + albumName + "','" + photoKey + '\')">',
                    'X',
                    '</span>',
                    '<span>',
                    photoKey.replace(albumPhotosKey, ''),
                    '</span>',
                    '</div>',
                    '</span>',
                ]);
            });
            var message = photos.length ?
                '<p>Click on the X to delete the photo</p>' :
                '<p>You do not have any photos in this album. Please add photos.</p>';
            var htmlTemplate = [
                '<h2>',
                'Album: ' + albumName,
                '</h2>',
                message,
                '<div>',
                getHtml(photos),
                '</div>',
                '<input id="photoupload" type="file" accept="image/*">',
                '<button id="addphoto" onclick="addPhoto(\'' + albumName + '\')">',
                'Add Photo',
                '</button>',
                '<button onclick="listAlbums()">',
                'Back To Albums',
                '</button>',
            ]
            document.getElementById('app').innerHTML = getHtml(htmlTemplate);
        });
    }

    //show password toggle on 
    $("#pwshow").click(function () {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    });
});

