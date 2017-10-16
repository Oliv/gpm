describe("Points", function() {
  var json = require('../examples/trace/point.json');

  it("should contain a point object", function() {
    expect(json).not.toBe(null);
    expect(json.points).toBeDefined();
    expect(json.points).not.toBe(null);
  });

  it("should be an array", function() {
    var points = json.points;

    expect(points.length).toBeGreaterThan(0);
  });
});

describe("Point", function() {
  var json = require('../examples/trace/point.json');
  var points = json.points;

  var customMatchers = {
    toBeId: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var result = {};

          actual = ''+actual;

          result.pass = actual.match(/^[0-9]{1,11}$/) !== null;

          if (!result.pass)
            result.message = 'Failed to validate id ' + actual;

          return result;
        }
      };
    },
    toBeDate: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var result = {};

          actual = ''+actual;

          if (actual.indexOf('+') === 0) {
            // Relative
            actual = actual.slice(1);

            result.pass = actual.match(/^[0-9]{1,11}$/) !== null;
          } else {
            result.pass = isFinite(+new Date(!isNaN(actual) ? +actual : actual));
          }

          if (!result.pass)
            result.message = 'Failed to validate date ' + actual;

          return result;
        }
      };
    }
  };

  beforeEach(function() {
      jasmine.addMatchers(customMatchers);
  });

  function testPoint(point) {
    it('should contain mandatory id and coords', function() {
      expect(Object.keys(point)).toContain('id');
      expect(Object.keys(point)).toContain('coords');
    });

    it('should have int(11) id', function() {
      expect(Object.prototype.toString.call(point.id)).toBe('[object Number]');
      expect(point.id).toBeId();
    });

    it('should have a facultative valid date', function() {
      if ('date' in point) {
        expect(point.date).not.toBe(null);
        expect(point.date).toBeDate();
      }
    });

    it('should have a facultative object properties', function() {
      if ('props' in point) {
        expect(Object.prototype.toString.call(point.props)).toBe('[object Object]');
        expect(Object.keys(point.props).length).toBeGreaterThan(0);
      }
    });
  }

  points.forEach(function(point) {
    testPoint(point);
  });
});
