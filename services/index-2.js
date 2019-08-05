const aws = require('aws-sdk');
const config = require('./config.json');

(async function() {
    try {

        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: config.accessKey,
            secretAccessKey: config.secretKey,
            region: 'us-west-2'
        });

        const s3 = new aws.S3();
        const response = await s3.listObjectsV2({
            Bucket: 'anothermanstreasure'
        }).promise();

        console.log('https://anothermanstreasure.s3-us-west-1.amazonaws.com/' + response.Contents[1].Key);

    } catch(err) {
        console.log(err);
    }
})();