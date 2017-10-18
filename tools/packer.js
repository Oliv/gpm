var tar = require('tar');
var fstream = require('fstream');
var fs = require('fs');

function onError(err) {
  console.error('An error occurred:', err);
}

function onEnd() {
  console.log('Packed');
}

function packer(target, source) {
  var dirDest = fs.createWriteStream(source);

  var pack = tar.Pack({ noProprietary: true })
    .on('error', onError)
    .on('end', onEnd)
  ;

  return fstream.Reader({ path: target, type: 'Directory' })
    .on('error', onError)
    .pipe(pack)
    .pipe(dirDest)
  ;
}

module.exports = packer;

if (require.main === module) {
  packer(process.argv[2], process.argv[3]);
}
