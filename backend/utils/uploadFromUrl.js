const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const axios = require('axios');
const https = require('https');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFromUrl = async (url, filename) => {
  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    httpsAgent: agent,
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const contentType = response.headers['content-type'];
  const extension = path.extname(new URL(url).pathname) || '.jpg';
  const key = filename || `${uuidv4()}${extension}`;

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: response.data,
    ContentType: contentType
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

module.exports = uploadFromUrl;