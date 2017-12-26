const tar = require('tar');
const fs = require('fs');

function extractor(source, target) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(source).pipe(
      tar.x({
        C: target ? target : process.cwd()
      })
      .on('error', reject)
      .on('end', resolve)
    )
  });
}

module.exports = extractor;

if (require.main === module) {
  extractor(process.argv[2], process.argv[3]);
}
