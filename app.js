'use strict'
const express = require('express')
var cors = require('cors')
const passport = require('passport')
const BearerStrategy = require('passport-azure-ad').BearerStrategy

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')
const http = require('http')
const port = normalizePort(process.env.PORT || '3000')
const app = express().use('*', cors())

let index = require('./routes/index')
let dashboard = require('./routes/dashboard')


let authenticatedUserTokens = []

const options = {
  identityMetadata:
    'https://login.microsoftonline.com/{company-id}/v2.0/.well-known/openid-configuration/',
  clientID: '',
  validateIssuer: true,
  issuer: 'https://sts.windows.net/{company-id}/',
  loggingLevel: 'warn', // warn, info, error
  loggingNoPII: true,
}

var bearerStrategy = new BearerStrategy(options, (token, done) => {
  let currentUser = null
  let userToken = authenticatedUserTokens.find((user) => {
    currentUser = user
    user.sub === token.sub
  })

  if (!userToken) {
    authenticatedUserTokens.push(token)
    console.log('success---')
    return done(null, token)
  }
  console.log('success2---')
  return done(currentUser, token)
})

passport.use(bearerStrategy)
app.use(passport.initialize())
app.use(passport.session())

app.set('port', port)
app.set('etag', 'strong')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())

/* var allowedOrigins = [
  'http://localhost:4200'
]
var corsOptions = {
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(function(req, res, next) {
  var origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, cache-control, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Max-Age', '1728000')
  next()
}) */

app.get('/*', function (req, res, next) {
  res.setHeader('Last-Modified', new Date().toUTCString())
  next()
})


// passport.authenticate('oauth-bearer', { session: false }),

app.use('/', index)
app.use('/dashboard', dashboard)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send('error')
})

const server = http.createServer(app)

server.listen(port, function () {
  console.log('Express server listening on port ' + server.address().port)
})

server.on('error', onError)
server.on('listening', onListening)
function normalizePort(val) {
  let port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

function onListening() {
  let addr = server.address()
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.log('Listening on ' + bind)
}

module.exports = app
