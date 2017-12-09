var reader = require('../tools/reader');

describe('Package', function() {
  var stream;
  var entries = [];
  var packageName = 'trace';
  var valid = true;

  beforeEach(function(done) {
    entries = [];

    stream = reader('./examples/' + packageName + '.gpm')
      .on('entry', function(e) {
        entries.push(e.path);
      })
      .on('end', function(e) {
        done();
      })
      .on('error', function(e) {
        valid = false;
        done();
      })
    ;
  });

  it('should be a valid tarball', function() {
    expect(valid).toBe(true);
  });

  it('should not be empty', function() {
    expect(entries.length).toBeGreaterThan(0);
  });

  it('should contain a directory with the package name', function() {
    var filtered = entries.filter(function(path) {
      return path.match('^' + packageName + '/');
    });

    expect(filtered.length).toBe(entries.length);
  });

  it('should contain a trace.json file', function() {
    var filtered = entries.filter(function(path) {
      return path.match('^' + packageName + '/trace.json$');
    });

    expect(filtered.length).toBe(1);
  });
});