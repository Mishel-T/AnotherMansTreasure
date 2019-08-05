//create on click even for login button. On login, capture id from db based on username

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
$("#pwshow").click(function() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
});

