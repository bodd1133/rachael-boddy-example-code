const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
  } = require('sequelize-test-helpers')

  const DocumentModel = require('../models/document')

  describe('DocumentModel', () => {
    let Model;
    let instance;  
    before(() => {
        Model = DocumentModel(sequelize, dataTypes)
        instance = new Model()
    })

    it('has the correct name', () => {
        checkModelName(Model)('Document')
    })

    it('has specified model properties', () => {
        context('properties', () => {
            ;['gId','language', 'title', 'authors', 'publicationDate', 'subjects', 'licenseRights'].forEach(checkPropertyExists(instance))
          })
    })
  })