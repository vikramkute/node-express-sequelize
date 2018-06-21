module.exports = {
  development: {
    username: 'mssql',
    password: 'mssql',
    database: 'sampleDb',
    schema: 'sample_schema',
    host: 'localhost',
    dialect: 'mssql',
    pool: {
      max: 100,
      min: 0,
      idle: 50000,
      evict: 50000,
      acquire: 50000
    },
    operatorsAliases: false,
    dialectOptions: {
      requestTimeout: 900000
    }
  },
  production: {
    username: 'mssql',
    password: 'mssql@P@$$w0rd$$',
    database: 'sampleDb_prod',
    schema: 'sample_schema',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 100,
      min: 0,
      idle: 50000,
      evict: 50000,
      acquire: 50000
    },
    operatorsAliases: false,
    dialectOptions: {
      requestTimeout: 900000,
      // encrypt: true // enable for Azure
    }
  }
}
