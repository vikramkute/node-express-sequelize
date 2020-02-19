'use strict'
const dotenv = require('dotenv')
dotenv.config()
const env = process.env.NODE_ENV || 'development'
const config = require('./config/main')[env]
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config)
const Op = Sequelize.Op

// Function to connect to database and execute query
function executeQuery(query, callback) {
  sequelize
    .query(query, {
      // A function (or false) for logging your queries
      // Will get called for every SQL query that gets send
      // to the server.
      logging: console.log,
      // If plain is true, then sequelize will only return the first
      // record of the result set. In case of false it will all records.
      plain: false,
      // Set this to true if you don't have a model definition for your query.
      raw: true,
      // The type of query you are executing. The query type affects how results are formatted before they are passed back.
      type: Sequelize.QueryTypes.SELECT
    })
    .then(function(result) {
      return callback(null, result)
    })
    .catch(function(error) {
      return callback(error, null)
    })
}

function query(sql, callback) {
  executeQuery(sql, function(err, data) {
    if (err) {
      return callback(err)
    }
    callback(null, data)
  })
}

module.exports = {
  query: query
}
