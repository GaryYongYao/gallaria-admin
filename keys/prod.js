module.exports = {
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  tokenSecret: process.env.TOKEN_SECRET,
  s3Bucket: process.env.S3_BUCKET,
  awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  buildHook: process.env.BUILD_HOOK,
  gravityUser: process.env.GRAVITY_USER,
  gravityPassword: process.env.GRAVITY_PASSWORD,
  stripePublic: process.env.STRIPE_PUBLIC,
  stripeSecret: process.env.STRIPE_SECRET,
  mediaBaseURL: process.env.MEDIA_BASE_URL,
  successLink: process.env.SUCCESS_LINK,
  cancelLink: process.env.CANCEL_LINK,
  captchaKey: process.env.CAPTCHA_KEY
};
