const assert = require('assert');
const {
  coalesce,
  coerceToArray,
  coerceToBoolean,
  coerceToNumber,
  coerceToInt,
  coerceToString,
  mapDistinct,
  camelize,
  upperFirst
} = require('..');

describe('varhelpers', function() {

  describe('coalesce', function() {
    it('should return first non null value', function() {
      assert.deepEqual(coalesce(null, undefined, 0), 0);
    });
  });

  describe('coerceToArray', function() {
    it('should coerce non array value to array', function() {
      const v = 'a';
      assert.deepEqual(coerceToArray(v), [v]);
    });

    it('should return same object if value is an array', function() {
      const v = [1];
      assert.strictEqual(coerceToArray(v), v);
    });

    it('should return default value if value is null', function() {
      let d = [1];
      assert.strictEqual(coerceToArray(null, d), d);
    });

    it('should coerce default value to array', function() {
      const d = 1;
      assert.deepEqual(coerceToArray(null, d), [d]);
    });
  });

  describe('coerceToBoolean', function() {
    it('should coerce non boolean value to boolean', function() {
      assert.strictEqual(coerceToBoolean(1), true);
      assert.strictEqual(coerceToBoolean(0), false);
    });

    it('should return same value if value is an boolean', function() {
      assert.strictEqual(coerceToBoolean(true), true);
      assert.strictEqual(coerceToBoolean(false), false);
    });

    it('should return default value if value is null', function() {
      assert.strictEqual(coerceToBoolean(null, true), true);
    });

    it('should coerce default value to boolean', function() {
      assert.strictEqual(coerceToBoolean(null, 1), true);
      assert.strictEqual(coerceToBoolean(null, 0), false);
    });

    it('should return null if value is null', function() {
      assert.strictEqual(coerceToBoolean(null), null);
    });
  });

  describe('coerceToNumber', function() {
    it('should coerce string to number', function() {
      assert.strictEqual(coerceToNumber('1'), 1);
    });

    it('should return same value if value is a number', function() {
      assert.strictEqual(coerceToNumber(1), 1);
    });

    it('should return default value if value is null', function() {
      assert.strictEqual(coerceToNumber(null, 1), 1);
    });

    it('should coerce default value to number', function() {
      assert.strictEqual(coerceToNumber(null, '1'), 1);
    });

    it('should throw error if can not parse value', function() {
      assert.throws(() => coerceToNumber('abc'),
          /"abc" is not a valid number value/);
    });

    it('should return default if can not parse value', function() {
      assert.strictEqual(coerceToNumber('abc', null), null);
    });

    it('should return null if value is null', function() {
      assert.strictEqual(coerceToNumber(null), null);
    });

  });

  describe('coerceToInt', function() {
    it('should coerce string to integer', function() {
      assert.strictEqual(coerceToInt('1'), 1);
    });

    it('should coerce float formatted string value to integer', function() {
      assert.strictEqual(coerceToInt('1.1'), 1);
    });

    it('should return same value if value is an integer', function() {
      assert.strictEqual(coerceToInt(1), 1);
    });

    it('should return integer value if value is a float number', function() {
      assert.strictEqual(coerceToInt(1.1), 1);
    });

    it('should return default value if value is null', function() {
      assert.strictEqual(coerceToInt(null, 1), 1);
    });

    it('should coerce default value to number', function() {
      assert.strictEqual(coerceToInt(null, '1'), 1);
    });

    it('should throw error if can not parse value', function() {
      assert.throws(() => coerceToInt('abc'),
          /"abc" is not a valid integer value/);
    });

    it('should return default if can not parse value', function() {
      assert.strictEqual(coerceToInt('abc', null), null);
    });

    it('should return null if value is null', function() {
      assert.strictEqual(coerceToInt(null), null);
    });

  });

  describe('coerceToString', function() {
    it('should coerce non string value to string', function() {
      assert.strictEqual(coerceToString(1), '1');
    });

    it('should return same value if value is an string', function() {
      assert.strictEqual(coerceToString('1'), '1');
    });

    it('should return default value if value is null', function() {
      assert.strictEqual(coerceToString(null, '1'), '1');
    });

    it('should coerce default value to string', function() {
      assert.strictEqual(coerceToString(null, 1), '1');
    });

    it('should return null if value is null', function() {
      assert.strictEqual(coerceToString(null), null);
    });
  });

  describe('camelize', function() {
    it('should camelize removing (-,_, ) characters', function() {
      assert.deepEqual(camelize('any-word'), 'anyWord');
      assert.deepEqual(camelize('any_word'), 'anyWord');
      assert.deepEqual(camelize('any word'), 'anyWord');
    });
    it('should start with upper character', function() {
      assert.deepEqual(camelize('any-word', true), 'AnyWord');
      assert.deepEqual(camelize('any_word', true), 'AnyWord');
      assert.deepEqual(camelize('any word', true), 'AnyWord');
    });
  });

  describe('upperFirst', function() {
    it('should upper first character', function() {
      assert.deepEqual(upperFirst('any-word'), 'Any-word');
    });
    it('should coerce to string', function() {
      assert.deepEqual(upperFirst(12345), '12345');
    });
  });

  describe('mapDistinct', function() {
    it('should return distinct array', function() {
      const v = mapDistinct([1, 2, 3, 4, 4, 5, 1]);
      assert.deepEqual(v, [1, 2, 3, 4, 5]);
    });
    it('should use coercer', function() {
      const v = mapDistinct([1, 2, 3, 4, 4, 5, 1], coerceToString);
      assert.deepEqual(v, ['1', '2', '3', '4', '5']);
    });
  });

});
