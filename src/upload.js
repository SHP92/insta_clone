import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_PW,
    region: 'ap-northeast-2'
});

const uploads = multer({ storage: multerS3({
    s3: s3,
    bucket: 'prismagramss',
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString())
    }
})});

export default uploads;