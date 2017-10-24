const tar = require('tar');
const fs = require('fs');

function extractor(source, target) {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(target);

    const extract = tar.Extract({ path: target })
      .on('error', reject)
      .on('end', resolve)
    ;

    fs.createReadStream(source)
      .on('error', reject)
      .pipe(extract)
    ;
  });
}

module.exports = extractor;

if (require.main === module) {
  extractor(process.argv[2], process.argv[3]);
}
