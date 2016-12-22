var tar = require('tar');
var fs = require('fs');

var source = process.argv[2];
var target = process.argv[3];

function onError(err) {
  console.error('An error occurred:', err);
}

function onEnd() {
  console.log(source, 'Extracted to', target);
}

function extractor(source, target) {
  var extract = tar.Extract({ path: target })
    .on('error', onError)
    .on('end', onEnd)
  ;

  return fs.createReadStream(source)
    .on('error', onError)
    .pipe(extract)
  ;
}

module.exports = extractor;

if (target && source)
  extractor(source, target);