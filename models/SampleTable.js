module.exports = function(sequelize, DataTypes) {
  let SampleTable = sequelize.define(
    'sampleTable',
    {
      col1: DataTypes.TEXT,
      col2: DataTypes.TEXT,
      username: DataTypes.TEXT,
      timestamp_upd: DataTypes.DATE
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'sample_table'
    }
  )
  SampleTable.removeAttribute('id')
  return SampleTable
}
