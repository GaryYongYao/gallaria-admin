module.exports = {
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  tokenSecret: process.env.TOKEN_SECRET,
  s3Bucket: process.env.S3_BUCKET,
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY
};
