'use strict';
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    gId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    language: DataTypes.STRING,
    authors: DataTypes.STRING,
    publicationDate: DataTypes.DATEONLY,
    subjects: DataTypes.STRING,
    licenseRights: DataTypes.STRING
  }, {
    indexes: [
      {
        fields: ['title'],
        name: 'title_idx',
        using: 'gin'
      }
    ]
  });
  return Document;
};