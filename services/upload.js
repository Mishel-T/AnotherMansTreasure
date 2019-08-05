const fs= require('fs');
const aws = require('aws-sdk');
// const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('./config.json');

// (async function() {
//     try {

aws.config.setPromisesDependency();
aws.config.update({
    accessKeyId: config.accessKey,
    secretAccessKey: config.secretKey,
    region: 'us-west-2'
});

const s3 = new aws.S3();
// const response = await s3.listObjectsV2({
//     Bucket: 'anothermanstreasure'
// }).promise();

// console.log('https://anothermanstreasure.s3-us-west-1.amazonaws.com/' + response.Contents[1].Key);

//     } catch(err) {
//         console.log(err);
//     }
// })();

// const app = express();

const fileName = 'Test2.jfif';

// For testing purposes, manually upload file image to AWS S3
const uploadFile = () => {
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'anothermanstreasure', // pass your bucket name
         Key: 'Test2.jfif', // file will be saved as testBucket/contacts.csv
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};

uploadFile();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'anothermanstreasure',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'Testing_Meta_Data!' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});

module.exports = upload;