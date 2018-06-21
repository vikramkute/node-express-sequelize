'use strict'

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')

const app = express()

let index = require('./routes/index')
let sampleApi = require('./routes/sampleApi')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  var allowedOrigins = [
    'http://localhost:8080'
  ]
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
    'X-Requested-With,cache-control, Content-Type, Accept'
  )
  res.setHeader('Access-Control-Allow-Credentials', false)
  res.setHeader('Access-Control-Max-Age', '1728000')
  next()
})

app.get('/*', function(req, res, next) {
  res.setHeader('Last-Modified', new Date().toUTCString())
  next()
})

app.use('/', index)
app.use('/sampleApi', sampleApi)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
