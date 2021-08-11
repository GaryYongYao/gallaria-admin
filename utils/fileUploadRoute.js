const fileType = require('file-type')
const multiparty = require('multiparty')
const fs = require('fs')
const { uploadFile, deleteFile } = require('./fileUpload')
const keys = require('./keys')

const Stripe = require('stripe')
const stripe = Stripe(keys.stripeSecret)

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

  app.post('/api/checkout', async (req, res) => {
    const { line_items, email, phone } = req.body
    const session = await stripe.checkout.sessions.create({
      // shipping_rates: ['shr_1J2p3zIasUdIbFxXEHlSek2p'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['AU'],
      },
      payment_intent_data: {
        receipt_email: email,
        description: 'Phone Number: ' + phone
      },
      customer_email: email,
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: keys.successLink,
      cancel_url: keys.cancelLink
    });
    res.json({ id: session.id });
  })
}
