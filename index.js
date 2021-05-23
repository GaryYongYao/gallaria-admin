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
app.use(
  cors(),
  bodyParser.json()
)
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

app.post('/checkout', async (req, res) => {
  const { line_items, email } = req.body
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['AU'],
    },
    payment_intent_data: {
      receipt_email: email
    },
    customer_email: email,
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: keys.successLink,
    cancel_url: keys.cancelLink,
  });
  res.json({ id: session.id });
})

app.use(express.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
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
