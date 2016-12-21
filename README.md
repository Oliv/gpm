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

Usage

    node ./tools/packer.js ./examples/trace trace.gpm

### Extracter

Usage

    node ./tools/extractor.js ./examples/trace.gpm ./examples/trace2