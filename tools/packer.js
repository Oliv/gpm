var tar = require('tar');
var fstream = require('fstream');
var fs = require('fs');

var target = process.argv[2];
var source = process.argv[3];

function onError(err) {
  console.error('An error occurred:', err);
}

function onEnd() {
  console.log(source, 'Packed to', target);
}

function packer(source, target) {
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

if (target && source)
  packer(source, target);