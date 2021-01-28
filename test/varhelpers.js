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
  camelCase,
  pascalCase,
  upperFirst,
  coerceToDate,
  parseDate
} = require('..');

describe('varhelpers', function() {

  describe('coalesce', function() {
    it('should return first non null value', function() {
      assert.deepStrictEqual(coalesce(null, undefined, 0), 0);
    });
  });

  describe('coerceToArray', function() {
    it('should coerce non array value to array', function() {
      const v = 'a';
      assert.deepStrictEqual(coerceToArray(v), [v]);
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
      assert.deepStrictEqual(coerceToArray(null, d), [d]);
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

  describe('coerceToDate', function() {
    it('should keep Date value', function() {
      const d = new Date();
      assert.strictEqual(coerceToDate(d), d);
    });

    it('should coerce number value to date', function() {
      assert.ok(coerceToDate(0) instanceof Date);
    });

    it('should coerce string value to date', function() {
      const d = new Date('2011-11-23T10:30:28.123+01:00');
      assert.deepStrictEqual(coerceToDate('2011-11-23T10:30:28.123+01:00'), d);
      assert.deepStrictEqual(coerceToDate('2011-11-23 10:30:28.123+01:00'), d);
    });

  });

  describe('parseDate', function() {

    it('should parse YYYY string value to date', function() {
      const d = new Date('2011-01-01T00:00:00');
      assert.deepStrictEqual(parseDate('2011'), d);
    });

    it('should parse YYYY-MM string value to date', function() {
      const d = new Date('2011-11-01T00:00:00');
      assert.deepStrictEqual(parseDate('2011-11'), d);
    });

    it('should parse YYYY-MM-DD string value to date', function() {
      const d = new Date('2011-11-23T00:00:00');
      assert.deepStrictEqual(parseDate('2011-11-23'), d);
    });

    it('should parse YYYY-MM-DD HH:MM string value to date', function() {
      const d = new Date('2011-11-23T10:30:00');
      assert.deepStrictEqual(parseDate('2011-11-23T10:30'), d);
      assert.deepStrictEqual(parseDate('2011-11-23 10:30'), d);
    });

    it('should parse YYYY-MM-DD HH:MM:SS string value to date', function() {
      const d = new Date('2011-11-23T10:30:28');
      assert.deepStrictEqual(parseDate('2011-11-23T10:30:28'), d);
      assert.deepStrictEqual(parseDate('2011-11-23 10:30:28'), d);
    });

    it('should parse YYYY-MM-DD HH:MM:SS.sss string value to date', function() {
      const d = new Date('2011-11-23T10:30:28.123');
      assert.deepStrictEqual(parseDate('2011-11-23T10:30:28.123'), d);
      assert.deepStrictEqual(parseDate('2011-11-23 10:30:28.123'), d);
    });

    it('should parse YYYY-MM-DD HH:MM:SS.sssTz string value to date', function() {
      const d = new Date('2011-11-23T10:30:28.123+01:00');
      assert.deepStrictEqual(parseDate('2011-11-23T10:30:28.123+01:00'), d);
      assert.deepStrictEqual(parseDate('2011-11-23 10:30:28.123+01:00'), d);
    });

    it('should parse YYYY-MM-DD HH:MM:SS.sssZ string value to date', function() {
      const d = new Date('2011-11-23T10:30:28.123Z');
      assert.deepStrictEqual(parseDate('2011-11-23T10:30:28.123Z'), d);
      assert.deepStrictEqual(parseDate('2011-11-23 10:30:28.123Z'), d);
    });

    it('should ignore time', function() {
      const d = new Date('2011-11-23T00:00:00');
      assert.deepStrictEqual(parseDate('2011-11-23T10:30:28.123Z', {dateOnly: true}), d);
    });

    it('should ignore time', function() {
      const d = new Date('2011-11-23T10:30:28.123');
      assert.deepStrictEqual(parseDate('2011-11-23T10:30:28.123+08:00', {ignoreTimezone: true}), d);
    });

  });

  describe('camelCase', function() {
    it('should convert sentence to camel case', function() {
      assert.strictEqual(camelCase('any-word'), 'anyWord');
      assert.strictEqual(camelCase('any_word'), 'anyWord');
      assert.strictEqual(camelCase('any word'), 'anyWord');
      assert.strictEqual(camelCase('ANY WORD'), 'ANYWORD');
      assert.strictEqual(camelCase('AnyWord'), 'AnyWord');
      assert.strictEqual(camelize('any-word'), 'anyWord');
    });
  });

  describe('pascalCase', function() {
    it('should convert sentence to pascal case', function() {
      assert.strictEqual(pascalCase('any-word'), 'AnyWord');
      assert.strictEqual(pascalCase('any_word'), 'AnyWord');
      assert.strictEqual(pascalCase('any word'), 'AnyWord');
      assert.strictEqual(camelize('any-word', true), 'AnyWord');
    });
  });

  describe('upperFirst', function() {
    it('should upper first character', function() {
      assert.deepStrictEqual(upperFirst('any-word'), 'Any-word');
    });
    it('should coerce to string', function() {
      assert.deepStrictEqual(upperFirst(12345), '12345');
    });
  });

  describe('mapDistinct', function() {
    it('should return distinct array', function() {
      const v = mapDistinct([1, 2, 3, 4, 4, 5, 1]);
      assert.deepStrictEqual(v, [1, 2, 3, 4, 5]);
    });
    it('should use coercer', function() {
      const v = mapDistinct([1, 2, 3, 4, 4, 5, 1], coerceToString);
      assert.deepStrictEqual(v, ['1', '2', '3', '4', '5']);
    });
  });

});
