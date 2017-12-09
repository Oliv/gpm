const tar = require('tar');
const fs = require('fs');

function reader(source) {
  return fs.createReadStream(source)
    .pipe(tar.list())
  ;
}

module.exports = reader;
