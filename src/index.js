const fs = require('fs');
const glob = require('glob-promise');
var tar = require('tar-fs');
var unzip = require('unzip');
var rp = require('request-promise')
const { convertFile } = require('../helpers/convertFile')
const models = require('../models')
var http = require('http');

const targetUrl = 'http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip'
const tarFileName = 'rdf-files.tar'

//batch 
const batchSize = 500;

//if not already
downloadFile = async() => {
  http.get(targetUrl, (res) => {
    res.pipe(unzip.Extract({path:'./'}))
  })
}

//extract files from tar
extractFromTar = async() => {
  fs.createReadStream(tarFileName).pipe(tar.extract('./data'))
}

run = async() => {
  await models.sequelize.sync()
  const fileNames = (await glob('data' + '**/**/**')).filter(x => /.rdf$/.test(x))
  for (let i = 0; i < fileNames.length; i += batchSize) { 
    const data = fileNames.slice(i, i + batchSize).map((fn) => { 
      return convertFile(fn) 
       .catch(e => console.log(`Error in converting file for ${fn}`)) 
    })
    const toSave =await Promise.all(data)
    await models.Document.bulkCreate(toSave)
     .catch(e => console.log(`Error in saving data for the batch ${i} - ${e}`))
  }
}

run()