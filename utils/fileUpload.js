const AWS = require('aws-sdk')
const keys = require('../keys')

AWS.config.update({
  accessKeyId: keys.awsAccessKey,
  secretAccessKey: keys.awsSecretKey,
})
const s3 = new AWS.S3()

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: keys.s3Bucket,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  }
  return s3.upload(params).promise()
}

const deleteFile = (Key) => {
  const params = {
    Bucket: keys.s3Bucket,
    Key
  }
  return s3.deleteObject(params).promise()
}

const renameFile = async (oldKey, renameKey) => {
  let value
  if (renameKey) {
    const renameParams = {
      Bucket: keys.s3Bucket, 
      CopySource: `${keys.s3Bucket}/${oldKey}`, 
      Key: renameKey
    }
    const deleteParams = {
      Bucket: keys.s3Bucket,
      Key: oldKey
    }
    
    value = await s3.copyObject(renameParams).promise()
    .then(async () => {
      const newKey = await s3.deleteObject(deleteParams).promise()
      .then(() => renameKey)
      return newKey
    })
  }
  
  return value
}

const renameFiles = async (files, oldCode, newCode) => {
  let value
  
  if (files.length > 0) {
    value = await files.map(async (file) => {
      const renameParams = {
        ACL: 'public-read',
        Bucket: keys.s3Bucket,
        CopySource: `${keys.s3Bucket}/${encodeURIComponent(file)}`, 
        Key: file.replace(oldCode, newCode)
      }
      const deleteParams = {
        Bucket: keys.s3Bucket,
        Key: encodeURIComponent(file)
      }
    
      const newFileKey = await s3.copyObject(renameParams).promise()
      .then(async () => {
        const newKey = await s3.deleteObject(deleteParams).promise()
        .then(() => file.replace(oldCode, newCode))
        return newKey
      })

      return newFileKey
    })
  }
  
  return Promise.all(value)
}

// Define POST route
module.exports = {
  uploadFile,
  deleteFile,
  renameFile,
  renameFiles
}
