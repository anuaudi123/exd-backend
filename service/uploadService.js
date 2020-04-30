const fs = require('fs');
const promisesAll = require('promises-all')
const mkdirp = require('mkdirp')
const shortid = require('shortid')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { GraphQLUpload } = require('apollo-upload-server')
const { app_config } = require('../config')

const uploadDir = './uploads'
const db = lowdb(new FileSync('db.json'))
var path1,id1,filename1;
// Seed an empty DB
db.defaults({ uploads: [] }).write()

// Ensure upload directory exists
mkdirp.sync(uploadDir)

const storeFS = ({ stream, filename }) => {
  const id = shortid.generate()
    path1=`${app_config.hostname}:${app_config.port}/${id}-${filename}`;
    console.log(path1)
    var path = `${uploadDir}/${id}-${filename}`
  
  
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(path)
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path}))
  )
}

const storeDB = file =>
  db
    .get('uploads')
    .push(file)
    .last()
    .write()

const processUpload = async upload => {
      const { stream, filename, mimetype, encoding } = await upload
      var { id, path } = await storeFS({ stream, filename })
      path=path1;
      return storeDB({ id, filename, mimetype, encoding, path })
}

const getFile = () => {
 return db.get('uploads').value();
}

module.exports = {
    storeFS,
    storeDB,
    processUpload,
    getFile
}