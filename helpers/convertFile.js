const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const fs = require('fs');
const util = require('util');
const path = require("path");

const readFile = util.promisify(fs.readFile);

exports.convertFile = async (filename) => {
    const file = await readFile(path.resolve(__dirname, `../${filename}`))
    const entry = {
        publisher: 'Gutenberg'
    }
    parser.parseString(file, function (err, result) {
        const ebook = result['rdf:RDF']['pgterms:ebook'][0];
        entry.gId = parseInt(ebook['$']['rdf:about'].match(/(\d+)/g)[0])
        entry.title= ebook['dcterms:title'] ? ebook['dcterms:title'][0] : 'n/a'
        entry.subjects= ebook['dcterms:subject'] ? ebook['dcterms:subject'].map(x => x['rdf:Description'][0]['rdf:value'][0]).join(', ') : 'n/a'
        entry.licenseRights= ebook['dcterms:rights'] ? ebook['dcterms:rights'][0] : 'n/a'
        entry.publicationDate= ebook['dcterms:issued']? ebook['dcterms:issued'][0]['_'] : 'n/a'
        try {
            entry.language= ebook['dcterms:language'][0]['_'] ? ebook['dcterms:language'][0]['_'] : ebook['dcterms:language'][0]['rdf:Description'][0]['rdf:value'][0]['_']
        } catch(e) {
            entry.language = 'n/a'
        }
        try {
            entry.authors= ebook['dcterms:creator'][0]['pgterms:agent'][0]['pgterms:name'].join('; ') 
        } catch(e){
            entry.authors = 'n/a'
        }
    })
    return entry
}

 

