const tar = require('tar');
const fstream = require('fstream');
const fs = require('fs');

function packer(source, target) {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(target);

    const pack = tar.Pack({ noProprietary: true })
      .on('error', reject)
    ;

    fstream.Reader({ path: source, type: 'Directory' })
      .on('error', reject)
      .pipe(pack)
      .pipe(writeStream)
      .on('close', () => { resolve(); })
    ;
  });
}

module.exports = packer;

if (require.main === module) {
  packer(process.argv[2], process.argv[3]);
}
