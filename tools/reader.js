var tar = require('tar');
var fs = require('fs');

function reader(source) {
  return fs.createReadStream(source)
    .pipe(tar.Parse())
  ;
}

module.exports = reader;
