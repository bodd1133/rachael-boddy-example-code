const chai = require('chai');
const expect = require('chai').expect;

var { convertFile } = require('../helpers/convertFile.js')

// full rdf object
const fullObj = 
    { 
        publisher: 'Gutenberg',
        gId: 1,
        language: 'en',
        title: 'The Declaration of Independence of the United States of America',
        authors: 'Jefferson, Thomas',
        publicationDate: '1971-12-01',
        subjects: 'E201, United States. Declaration of Independence, United States -- History -- Revolution, 1775-1783 -- Sources, JK' ,
        licenseRights: 'Public domain in the USA.'
    }

// rdf with missing fields
const missingFieldsObj = 
    { 
        publisher: 'Gutenberg',
        gId: 1,
        language: 'n/a',
        title: 'The Declaration of Independence of the United States of America',
        authors: 'Jefferson, Thomas',
        publicationDate: 'n/a',
        subjects: 'n/a',
        licenseRights: 'Public domain in the USA.'
    }


describe('convertFile', () => {
    describe('RDF file with all fields', () => {
        it('should create expected object with all fields populated', async () => {
                    const obj = await convertFile('test/testData/fullRDF.rdf')
                    expect(obj).to.deep.equal(fullObj)
        })
    })
    describe('RDF file with missing fields', () => {
        it('should create expected object with missing fields populate with "n/a"', async () => {
                const ob = await convertFile('test/testData/missingFieldsRDF.rdf')
                expect(ob).to.deep.equal(missingFieldsObj)
        })
    })
})