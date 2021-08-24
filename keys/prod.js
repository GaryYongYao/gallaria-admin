module.exports = {
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  tokenSecret: process.env.TOKEN_SECRET,
  s3Bucket: process.env.S3_BUCKET,
  buildHook: process.env.BUILD_HOOK,
  gravityUser: process.env.GRAVITY_USER,
  gravityPassword: process.env.GRAVITY_PASSWORD,
  stripePublic: process.env.STRIPE_PUBLIC,
  stripeSecret: process.env.STRIPE_SECRET,
  mediaBaseURL: process.env.MEDIA_BASE_URL,
  successLink: process.env.SUCCESS_LINK,
  cancelLink: process.env.CANCEL_LINK,
  captchaKey: process.env.CAPTCHA_KEY,
  // google cloud stuff
  googleProjectId: process.env.GOOGLE_PROJECT_ID,
  googlePrivateKeyId: process.env.GOOGLE_PRIVATE_KEY_ID,
  googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY === 'DEV' ? "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCyqIXpPwLXHNf0\nBfqpJ/QO66J9nq5Acle37kHRQt9xU1myInuyRQhoiBBqFcZ51IBZaoTPl/xF+Ntq\noCmyTo1WVn4s2ldIB0WeTQkRIwJKKhB10cIgsli2TbPkKmVnEXlm/VfmUYL0UZ2q\nREXujahFYoxispcZOYWv8Ur2XaNVmVdolFWW5fonrBwhYXUlrInGbyMSKDAbhg7K\na1xMysQ1ybIYp8zg9wpIoTXa1LEx01T1MsJnxmLKSwMCMBvM64f2DZQy1E4VhsSW\nMG1OBBM7PsYMsYTJ4R+7W7WbMoCCkQrkenKdxwfEBhViFn8RhVAUi/4eXTP5y6it\nmBNBr0JvAgMBAAECggEARFssWVDtkkaL7eb3wA70V10a37t96lSVcV9suVc/zMla\nUUjWUSAOlogw15YbSXPf49ZYmGELee48bXB4Y6ugcj9HqXuk139IyMeqx27AqoWr\npJisEPyL6rySLqN2BthtvdUC87GOTFKJ46KZqytyDZImKoEwRMt4dhf5WYf8PXx4\nzdP2Rx/edVplY0FJguL2DKVmMhV9+d82Wy7zVI/raUuKQDFDlZDctpmW4bcPwdRA\n40E5WEoLdsjj/hPMTYM8nh7h2FirEa0z1IfCIO+/iT7q9/zwfNRNRanc6fWHf1hf\nh2aIA76eg+ZDz8hCzzAhr7AAjHGnAzE/Yrciy/HSEQKBgQDrD1WcutsS/FJ3voKM\n1kUk+PvOgz8Z7Gyt17eDpeyVY4DMOXbmgPxkRxx8qOKBwukbMeHPuzGKNIdF1C9C\ny0lw5xH9Bc5jvnHgHPt10zynv/g8ot2PDNsmsqLJCKoEPdjyDh8YQzkDwtVJ29lB\nhU47dCrj42yJMFKYFOjafVSGCQKBgQDCkuuONDLyy6jB2AQxyQX3ZIjP/A/kUVRI\n0bu7nxC9bxdLlJDCCp/K22dd1qokpKBX4rgWTLOEe2FFmP/qLOUc/ynRpIIjh5Aq\nW/3r2BLPrSdlYBGZaDyU6T7YQe+TMzDiqJPRFf4KWX5joiFnVIDS+2jEbRYkHeQ8\npnY3tFRitwKBgAeVDQvrMxnfrcFTEd79ImnY5jZ5IVXyvGa3KKJEfecruIHd8Knq\nyzlo2dBjmjrZUK+h4kjTHvv4SczE1WlwKURND9V7lHa/M+koxiu8zp4SoS1Di6YL\noh4TcRDPCLzuScs1DWe482Pdqweg4dctN6LPUnrbYSrjtiZVtlUl6c4RAoGAN9Vd\nDsNf01gppuZL3dVnhuQsdjJIhSXpX7P/gQlWDmXwc1nAaE4QKG/pK35L+JPdBxsh\n5BRCd0PIV+ZdmV8kp7t4zpW8WmGuNtmK9cBdNYbkhSyaIEFPERQVWo0hKEZKQuBI\n+nirG2Eu6Xw+xZ30EZbfK256KgcB1X2W8skmZeUCgYEAxn2i6r2xN9BiZ/LeMxOp\nX3FCgGuhzLbPHim484Be5N2GvBStTiWaS+nmOrl+Q5SQ8AimFpTGVUcQZZ36FWdW\n7QuD1P/79MWrOtXjRvTd3s2/4q6YUtEBqfIrCgl5X5SiqtWsvQKkUa4ObQg8BHYR\noSEY7CzlDzUBAlUpK852SZI=\n-----END PRIVATE KEY-----\n": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgS5UYE4apF2hk\nWhAbgchSqC8hc6Ws7UcS+bNNzDRyV69NRAnFqmpTflHwnDZ9mBvE2J7pnpruYkCB\nc4+r1uzX22zfSGbBobHoBZzbLLqcFsCxG1VZX6+OoUEIP/fXTBhTa/P/eY0thVbr\n1BJM+lrlVTk+U8b6Y1rgoYSaXvGVJCg4U/S4iM3Ge7nf1A8ydKsDiMTiq6BSw4aU\nh1AVqHCmtQSMfgNVecrcjdtVHmTlv90L5FeRXw+Y91YlzZGn97UryrcduTNC5i9E\nbUU+WOPietLArOzLatfngYYNFYFYf2IVUHkLMq33kCVAzHUopc7A6GTL/YiQkXiE\nAw74J5SpAgMBAAECggEADBYW3FVgknBa5TIrQ7+x6JWY1CdhpxvO/53HSMbsb3Cw\nHZ3TNM3ILZp5ODC3JRoqgdmphcj5Op866OfbPeQ7QH1hhKZzZQc5oFqH/LivK2TF\ny7TZZx9BX/pFqocUO24X6XZa0/kIzZVfu/FmHdrErsURx2LOvoNuT0CufGtLQOj1\n9OrMaF6EiBgRxj636eMhY3F2bReSe7KYSijT6JEtZB36bm5jt0BbFFK+nv7PLRHB\nZRY3udxDBJXYvsXpYeQnfKgXv5i5iFx7hR2Eji9KLI2bciiF7wW0MOwej18k9ven\nYM2ybeKbT9DHRpCg4xvYhXSMl70TTI3tdUlUawGqQQKBgQDROAiN+SLJd34zzcSg\nERoTtn7qPLCkyRsRLU2Zm3AdlSOySiVgcz9zxEZ4VdWzxRUsjawcu3eC2uLQFPL8\nlUZM6nCtDDUByQvzxPDiiSme5XujDwfRFSjAtB2YxMF4uW5EXWMeprY3tEB5gwI8\nom5knkJmgvdT1Dcdh2TtSGs0mQKBgQDEIxhUX6olo9fx92gKT2GfU7qs2VIDUhDm\ngjx7HPBKTFKU4vRbnfg37JbpeTaaSZI9IQO76BAsDeUAFscLGPxMoGLMqxjYIcFf\nIrL6+zwMCRrZz770aiXYYRfZuecRZY5QSJDkm2YY8C8Am6D1rpz5STbkfy3Ir/Wk\nxgZoIBlakQKBgBw6HR1agZEA6CwBFQgrhoMmWhUsPwDciSRWImQZDpVPK9PAIS7U\nHbl2v7M4kW6BpouuSYxO1p72/SbpzKa7VRLHhpAyV2x4PX6UEZPewZjIiVfEjV9u\nJWNqaZvU3+1zxya+GsNl5qu5TAGY5VJc79vvZjICdW//77eyLrG81YnxAoGAInVv\n/tLX18kTVWV8F+OeaRmSwG9l40N1yKm06oRJCyShlZrSB46XX2vnj5lGKJEoaij0\nuPyqarL+OqfFzINVQDklYoPk14QGryove7zL7eljmETRbauAfqWARTZODFZlTGGT\nYzaSF2uLNnYhL0jAN2PPixF0/786TvqjgYOyMKECgYEAy2OJbOXOtIX9AiVAeMPx\nUCZxt7SHqSHPWFoCfgsw/s3IEIOyvLKHM9TAOT7n3kMjSKfVgf+CtXTvVBgcYoro\n1eaUhn6CUJZ7ORoqSPJ/CbvSH7NPU8OqZ1NAu72t5iyHUTZA0r50ULJhNWjfT7Z/\n3E/IKIzQpgXuzpwlnwUWRug=\n-----END PRIVATE KEY-----\n",
  googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientX509CertUrl: process.env.GOOGLE_CLIENT_CERT_URL
};
