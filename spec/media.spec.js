describe("Medias", function() {
  var json = require('../examples/media.json');

  it("should contain a media object", function() {
    expect(json).not.toBe(null);
    expect(json.medias).toBeDefined();
    expect(json.medias).not.toBe(null);
  });

  it("should be an array", function() {
    var media = json.medias;

    expect(media.length).toBeGreaterThan(0);
  });
});

describe("Media", function() {
  var json = require('../examples/media.json');
  var medias = json.medias;

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
    toBeType: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var result = {};
          var validTypes = [
            'trace',
            'polygon',
            'audio',
            'video',
            'text',
            'url',
            'html',
            'image',
            'animation'
          ];

          result.pass = validTypes.filter(function(el) {
            return actual === el;
          }).length;

          if (!result.pass)
            result.message = 'Failed to validate type ' + actual;

          return result;
        }
      };
    },
    toBeContent: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var result = {};
          var errorMessage;

          function isUrl(s) {
              return s.match(/^(https?|ftp):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/) !== null;
          }

          function isRelativePath(s) {
              return s.match(/^\.\/[a-z0-9]([a-z0-9-.]*[a-z0-9])?(\/[a-z0-9]([a-z0-9-.]*[a-z0-9])?)*$/) !== null;
          }

          function isPackagePath(s) {
              return s.match(/^\/[a-z0-9]([a-z0-9-_.]*[a-z0-9])?(\/[a-z0-9]([a-z0-9-_.]*[a-z0-9])?)*$/) !== null;
          }

          function isBase64NotNull(s) {
              return s.match(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/) !== null;
          }

          switch (expected) {
            case undefined:
            case 'text':
              result.pass = Object.prototype.toString.call(actual) === '[object String]';
              errorMessage = 'Content must be a string if the type is text or undefined';

              break;

            case 'trace':
              result.pass = isPackagePath(actual);
              errorMessage = 'Content must be a package path if the type is trace ' + actual;

              break;

            default:
              if (isUrl(actual))
                result.pass = true;
              else if (isRelativePath(actual))
                result.pass = true;
              else if (isPackagePath(actual))
                result.pass = true;
              else if (isBase64NotNull(actual))
                result.pass = true;
              else {
                result.pass = false;
                errorMessage = 'Failed to validate content ' + actual;
              }

              break;
          }

          if (!result.pass)
            result.message = errorMessage;

          return result;
        }
      };
    }
  };

  beforeEach(function() {
      jasmine.addMatchers(customMatchers);
  });

  function testMedia(media) {
    it('should contain mandatory id and coords', function() {
      expect(Object.keys(media)).toContain('point');
      expect(Object.keys(media)).toContain('content');
    });

    it('should have a point relative to an id', function() {
      expect(Object.prototype.toString.call(media.point)).toBe('[object Number]');
      expect(media.point).toBeId();
    });

    it('should have a facultative valid type', function() {
      if ('type' in media) {
        expect(media.type).not.toBe(null);
        expect(media.type).toBeType();
      }
    });

    it('should have a facultative object properties', function() {
      if ('props' in media) {
        expect(Object.prototype.toString.call(media.props)).toBe('[object Object]');
        expect(Object.keys(media.props).length).toBeGreaterThan(0);
      }
    });

    it('should have a valid content', function() {
      expect(Object.prototype.toString.call(media.content)).toBe('[object String]');
      expect(media.content).toBeContent(media.type);
    });
  }

  medias.forEach(function(media) {
    testMedia(media);
  });
});
