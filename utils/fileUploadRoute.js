const fileType = require('file-type')
const multiparty = require('multiparty')
const fs = require('fs')
const { uploadFile, deleteFile } = require('./fileUpload')

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
        console.log(path, fileName, type)
        const fileName = `${fields.bucketFolder}/${fields.fileName}`
        // const data = await uploadFile(buffer, fileName, type)
        const data = await uploadFile(path, fileName, type)
        return response.status(200).send(data)
      } catch (err) {
        return response.status(500).send(err)
      }
    })
  })
  
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
