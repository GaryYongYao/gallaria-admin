const fs = require('fs')

const write = async () => {
  const text = await `runtime: nodejs16
env_variables:
  MONGO_URI: '${process.env.MONGO_URI}'
  COOKIE_KEY: '${process.env.COOKIE_KEY}'
  REDIRECT_DOMAIN: '${process.env.REDIRECT_DOMAIN}'
  TOKEN_SECRET: '${process.env.TOKEN_SECRET}'
  S3_BUCKET: '${process.env.S3_BUCKET}'
  BUILD_HOOK: '${process.env.BUILD_HOOK}'
  GRAVITY_USER: '${process.env.GRAVITY_USER}'
  GRAVITY_PASSWORD: '${process.env.GRAVITY_PASSWORD}'
  STRIPE_PUBLIC: '${process.env.STRIPE_PUBLIC}'
  STRIPE_SECRET: '${process.env.STRIPE_SECRET}'
  MEDIA_BASE_URL: '${process.env.MEDIA_BASE_URL}'
  SUCCESS_LINK: '${process.env.SUCCESS_LINK}'
  CANCEL_LINK: '${process.env.CANCEL_LINK}'
  CAPTCHA_KEY: '${process.env.CAPTCHA_KEY}'
  GOOGLE_PROJECT_ID: '${process.env.GOOGLE_PROJECT_ID}'
  GOOGLE_PRIVATE_KEY_ID: '${process.env.GOOGLE_PRIVATE_KEY_ID}'
  GOOGLE_PRIVATE_KEY: '${process.env.GOOGLE_PRIVATE_KEY}'
  GOOGLE_CLIENT_EMAIL: '${process.env.GOOGLE_CLIENT_EMAIL}'
  GOOGLE_CLIENT_ID: '${process.env.GOOGLE_CLIENT_ID}'
  GOOGLE_CLIENT_CERT_UR: '${process.env.GOOGLE_CLIENT_CERT_UR}'`

  await fs.writeFile('app.yaml', text, function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  })
}

write()