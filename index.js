const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const cors  = require('cors')
const { graphqlHTTP } = require('express-graphql')
const { graphqlUploadExpress } = require('graphql-upload')
const graphQLSchema = require('./graphql/schema')
const graphQLResolvers = require('./graphql/resolvers')
const keys = require('./keys')

const Stripe = require('stripe')
const stripe = Stripe(keys.stripeSecret)

const app = express()

app.disable('x-powered-by')
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP ({
    schema: graphQLSchema,
    typeDefs: /* GraphQL */ `
      scalar Upload
    `,
    rootValue: graphQLResolvers
  })
)
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(express.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

app.post('/api/checkout', async (req, res) => {
  try {
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
    res.header("Access-Control-Allow-Origin", "*")
    res.json({ id: session.id });
  }
  catch(err) {
    res.send(err)
  }
})

app.post('/api/payment-succeed', async (req, res) => {
  try {
    const { object } = req.body.data
    const { id, shipping, customer_email } = object
    const { address, name } = shipping
    const { line1, line2, city, postal_code, state, country } = address

    stripe.checkout.sessions.listLineItems(
      id,
      { limit: 100 },
      async (error, lineItems) => {
        const { data } = lineItems
        const fullAddress = `${line1}, ${line2 && `${line2}, `}${city}, ${postal_code} ${state}, ${country}`

        GravFormRequest('POST', '/entries', {
          form_id: '5',
          is_starred: '0',
          is_read: '0',
          source_url: 'https://www.gallaria.com.au/',
          status: 'active',
          '1': name,
          '2': customer_email,
          '3': fullAddress,
          '8': data.map(({ object, description, amount_total, quantity }) => ({
            Name: object,
            Description: description,
            Price: amount_total / 100,
            Quantity: quantity
          }))
        })
          .then(({ data }) => {
            GravFormRequest('POST', `/entries/${data.id}/notifications`)
              .catch(err => { throw err })
          })
          .catch(err => { throw err })
      }
    );
  }
  catch(err) {
    res.send(err)
  }
})

require('./utils/fileUploadRoute')(app)

if (process.env.NODE_ENV === 'production') {
  // express serve up production asset
  // exp: main.js or main.css
  app.use(express.static('client/build'))

  //express serve up index.html
  // if it doesnt recognize route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log(PORT)
