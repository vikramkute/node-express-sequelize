const express = require('express')
const router = express.Router()
const env = process.env.NODE_ENV || 'development'
const config = require('../config/main')[env]

const Sequelize = require('sequelize')
const sequelize = new Sequelize(config)

//Function to connect to database and execute query
let executeQuery = function(res, query) {
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
      raw: false,
      // The type of query you are executing. The query type affects how results are formatted before they are passed back.
      type: Sequelize.QueryTypes.SELECT
    })
    .then(function(result) {
      res.status(200).send(result)
    })
}

router.get('/', async function(req, res) {
  res.send('Filters API')
})

// with raw sql query
router.get('/sampleData', async function(req, res) {
  models.targetSynonyms
    .update(
      {
        synonyms: data.newSynonym
      },
      {
        where: { synonyms: data.oldSynonym }
      }
    )
    .then(() => {
      res.status(200).send('Synonym name updated succesfully')
      data.old_synonyms = data.oldSynonym
      data.synonyms = data.newSynonym
      data.action_type = 'RENAME SYNONYM'
      auditTargetSynonymsLog(data)
    })
})

// with raw sql query
router.get('/sampleData', async function(req, res) {
  let query = `select *
  from sample_schema.sample_table`
  executeQuery(res, query)
})

module.exports = router
