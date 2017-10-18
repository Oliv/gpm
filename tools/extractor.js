var tar = require('tar');
var fs = require('fs');

function onError(err) {
  console.error('An error occurred:', err);
}

function onEnd() {
  console.log(source, 'Extracted to', target);
}

function extractor(target, source) {
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

if (require.main === module) {
  extractor(process.argv[2], process.argv[3]);
}
