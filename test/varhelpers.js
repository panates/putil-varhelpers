const assert = require('assert');
const {
  camelize,
  coalesce,
  coerceToArray,
  coerceToBoolean,
  coerceToNumber,
  coerceToInt,
  coerceToString
} = require('..');

describe('varhelpers', function() {

  describe('camelize', function() {
    it('should camelize removing (-,_) characters', function() {
      assert.deepEqual(camelize('any-word'), 'anyWord');
      assert.deepEqual(camelize('any_word'), 'anyWord');
    });
    it('should start with upper character', function() {
      assert.deepEqual(camelize('any-word', true), 'AnyWord');
      assert.deepEqual(camelize('any_word', true), 'AnyWord');
    });
  });

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

    it('should return undefined if can not parse value', function() {
      assert.strictEqual(coerceToNumber('abc'), undefined);
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

    it('should return undefined if can not parse value', function() {
      assert.strictEqual(coerceToInt('abc'), undefined);
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
  });

});
