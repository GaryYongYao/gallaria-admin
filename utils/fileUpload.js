const AWS = require('aws-sdk')
const fileType = require('file-type')
const multiparty = require('multiparty')
const fs = require('fs')
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

// Define POST route
module.exports = app => {
  app.post('/api/file-upload', (request, response) => {
    const form = new multiparty.Form()
    form.parse(request, async (error, fields, files) => {
      if (error) {
        return response.status(500).send(error)
      }
      try {
        const path = files.file[0].path
        const buffer = fs.readFileSync(path)
        const type = await fileType.fromBuffer(buffer)
        const fileName = `${fields.bucketFolder}/${fields.fileName}`
        const data = await uploadFile(buffer, fileName, type)
        return response.status(200).send(data)
      } catch (err) {
        return response.status(500).send(err)
      }
    })
  })

  const deleteFile = (Key) => {
    const params = {
      Bucket: keys.s3Bucket,
      Key
    }
    return s3.deleteObject(params).promise()
  }
  
  app.post('/api/file-delete', (request, response) => {
    const form = new multiparty.Form()
    form.parse(request, async (error, fields, files) => {
      if (error) {
        return response.status(500).send(error)
      }
      try {
        const data = await deleteFile(fields.key[0])
        return response.status(200).send(data)
      } catch (err) {
        return response.status(500).send(err)
      }
    })
  })
}
