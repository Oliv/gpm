const tar = require('tar');

function packer(source, target) {
  return tar.c({
    file: target
  }, [ source ]);
}

module.exports = packer;

if (require.main === module) {
  packer(process.argv[2], process.argv[3]);
}
