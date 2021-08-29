const { Storage } = require('@google-cloud/storage')
const keys = require('../keys')

const storage = new Storage({
  credentials: {
    type: "service_account",
    project_id: keys.googleProjectId,
    private_key_id: keys.googlePrivateKeyId,
    private_key: keys.googlePrivateKey,
    client_email: keys.googleClientEmail,
    client_id: keys.googleClientId,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${keys.googleClientX509CertUrl}`
  }
})

const uploadFile = async (pathname, name, type) => {
  return storage
  try {
    const url = await storage
      .bucket(keys.s3Bucket)
      .upload(
        pathname,
        {
          destination: `${name}.${type.ext}`
        }
      )

    return url
  } catch (err) {
    return err
  }
}

const deleteFile = async (name) => {
  try {
    await storage.bucket(keys.s3Bucket).file(name).delete();
  
    return 'Success'
  } catch (err) {
    return err
  }
}

const renameFiles = async (files, oldCode, newCode) => {
  let value
  
  if (files.length > 0) {
    value = await files.map(async (file) => {
      const url = await storage.bucket(keys.s3Bucket).file(file).rename(file.replace(oldCode, newCode));

      return url[0].name
    })
  
    return Promise.all(value)
  } else return []
}

// Define POST route
module.exports = {
  uploadFile,
  deleteFile,
  renameFiles
}
