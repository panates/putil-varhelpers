const assert = require('assert');
const {
  coalesce,
  toArray, toArrayDef,
  toBoolean, toBooleanDef,
  toNumber, toNumberDef,
  toInt, toIntDef,
  toString, toStringDef,
  toDate, toDateDef,
  mapDistinct,
  camelCase,
  pascalCase,
  upperFirst,
  parseDate
} = require('..');

describe('varhelpers', function() {

  describe('coalesce', function() {
    it('should return first non null value', function() {
      assert.deepStrictEqual(coalesce(null, undefined, 0), 0);
    });
  });

  describe('toArray', function() {
    it('should coerce non array value to array', function() {
      const v = 'a';
      assert.deepStrictEqual(toArray(v), [v]);
    });

    it('should return same object if value is an array', function() {
      const v = [1];
      assert.strictEqual(toArray(v), v);
    });

    it('should return default value if value is null', function() {
      let d = [1];
      assert.strictEqual(toArrayDef(null, d), d);
    });

    it('should coerce default value to array', function() {
      const d = 1;
      assert.deepStrictEqual(toArrayDef(null, d), [d]);
    });
  });

  describe('toBoolean', function() {
    it('should coerce non boolean value to boolean', function() {
      assert.strictEqual(toBoolean(1), true);
      assert.strictEqual(toBoolean(0), false);
    });

    it('should return same value if value is an boolean', function() {
      assert.strictEqual(toBoolean(true), true);
      assert.strictEqual(toBoolean(false), false);
    });

    it('should return default value if value is null', function() {
      assert.strictEqual(toBooleanDef(null, true), true);
    });

    it('should coerce default value to boolean', function() {
      assert.strictEqual(toBooleanDef(null, 1), true);
      assert.strictEqual(toBooleanDef(null, 0), false);
    });

    it('should return undefined if value is null', function() {
      assert.strictEqual(toBoolean(null), undefined);
    });
  });

  describe('toNumber', function() {
    it('should coerce string to number', function() {
      assert.strictEqual(toNumber('1'), 1);
    });

    it('should return same value if value is a number', function() {
      assert.strictEqual(toNumber(1), 1);
    });

    it('should return default value if value is null', function() {
      assert.strictEqual(toNumberDef(null, 1), 1);
    });

    it('should coerce default value to number', function() {
      assert.strictEqual(toNumberDef(null, '1'), 1);
    });

    it('should throw error if can not parse value', function() {
      assert.throws(() => toNumber('abc'),
          /"abc" is not a valid number value/);
    });

    it('should return undefined if value is null', function() {
      assert.strictEqual(toNumber(null), undefined);
    });

  });

  describe('toInt', function() {
    it('should coerce string to integer', function() {
      assert.strictEqual(toInt('1'), 1);
    });

    it('should coerce float formatted string value to integer', function() {
      assert.strictEqual(toInt('1.1'), 1);
    });

    it('should return same value if value is an integer', function() {
      assert.strictEqual(toInt(1), 1);
    });

    it('should return integer value if value is a float number', function() {
      assert.strictEqual(toInt(1.1), 1);
    });

    it('should return default value if value is null', function() {
      assert.strictEqual(toIntDef(null, 1), 1);
    });

    it('should coerce default value to number', function() {
      assert.strictEqual(toIntDef(null, '1'), 1);
    });

    it('should throw error if can not parse value', function() {
      assert.throws(() => toInt('abc'),
          /"abc" is not a valid integer value/);
    });

    it('should return undefined if value is null', function() {
      assert.strictEqual(toInt(null), undefined);
    });

  });

  describe('toString', function() {
    it('should coerce non string value to string', function() {
      assert.strictEqual(toString(1), '1');
    });

    it('should return same value if value is an string', function() {
      assert.strictEqual(toString('1'), '1');
    });

    it('should return default value if value is null', function() {
      assert.strictEqual(toStringDef(null, '1'), '1');
    });

    it('should coerce default value to string', function() {
      assert.strictEqual(toStringDef(null, 1), '1');
    });

    it('should return undefined if value is null', function() {
      assert.strictEqual(toString(null), undefined);
    });
  });

  describe('toDate', function() {
    it('should keep Date value', function() {
      const d = new Date();
      assert.strictEqual(toDate(d), d);
    });

    it('should coerce number value to date', function() {
      assert.ok(toDate(0) instanceof Date);
    });

    it('should coerce string value to date', function() {
      const d = new Date('2011-11-23T10:30:28.123+01:00');
      assert.deepStrictEqual(toDate('2011-11-23T10:30:28.123+01:00'), d);
      assert.deepStrictEqual(toDate('2011-11-23 10:30:28.123+01:00'), d);
    });

    it('should return default value if value is null', function() {
      const d = new Date();
      assert.strictEqual(toDateDef(null, d), d);
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
    });
  });

  describe('pascalCase', function() {
    it('should convert sentence to pascal case', function() {
      assert.strictEqual(pascalCase('any-word'), 'AnyWord');
      assert.strictEqual(pascalCase('any_word'), 'AnyWord');
      assert.strictEqual(pascalCase('any word'), 'AnyWord');
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
      const v = mapDistinct([1, 2, 3, 4, 4, 5, 1], toString);
      assert.deepStrictEqual(v, ['1', '2', '3', '4', '5']);
    });
  });

});
