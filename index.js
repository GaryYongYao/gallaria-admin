const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const cors  = require('cors')
const { graphqlHTTP } = require('express-graphql')
const graphQLSchema = require('./graphql/schema')
const graphQLResolvers = require('./graphql/resolvers')
const keys = require('./keys')

const app = express()

app.disable('x-powered-by')
app.use(
  cors(),
  bodyParser.json()
)
app.use(
  "/graphql",
  graphqlHTTP ({
    schema: graphQLSchema,
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
