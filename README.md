# GPM format

`GPM` (Geo Positioning Multimedia) file format focuses in linking multimedia content to a GPS trace.

## Specs

[GPM specs](./package.md)

## Tests

For windows users, an easy way to use `jasmine` command is to install jasmine globally.

    npm i -g jasmine

Type `jasmine` or `npm test` in the project directory to run the tests. They are running on examples files.

## Tools

### Packer

Command line :

    node ./tools/packer.js ./examples/trace ./examples/trace.gpm

Code :

    const packer = require('gpm/tools/packer');

    packer(directory, file).on('end', () => {
      console.log('Package packed');
    });


### Extractor

Command line :

    node ./tools/extractor.js ./examples/trace.gpm ./examples

Code :

    const extractor = require('gpm/tools/extractor');

    extractor(file, directory).on('end', () => {
      console.log('Package extracted');
    });

### Reader

Usage :

    var reader = require('gpm/tools/reader');

    var stream = reader('./examples/trace.gpm')
      .on('entry', function(e) {
        console.log('entry', e.props);
      })
      .on('end', function() {
        console.log('done reading package');
      })
      .on('error', function(e) {
        console.error('error while reading package', e);
      })
    ;

`reader()` returns a [Readable Stream](https://nodejs.org/api/stream.html#stream_class_stream_readable)
