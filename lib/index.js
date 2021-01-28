Object.defineProperty(exports, '__esModule', {
  value: true
});

const DATE_FORMAT_PATTERN = /^(\d{4})-?(0[1-9]|1[012])?-?([123]0|[012][1-9]|31)?(?:[T ]?([01][0-9]|2[0-3]):?([0-5][0-9]):?([0-5][0-9])?(?:\.(\d+))?(?:(Z)|(?:([+-])([01]?[0-9]|2[0-3]):?([0-5][0-9])?))?)?$/;

function coalesce(...args) {
  const l = args.length;
  let v;
  for (let i = 0; i < l; i++) {
    v = args[i];
    if (v != null)
      return v;
  }
}

function coerceToArray(v, d) {
  return Array.isArray(v) ? v :
      (v ? [v] : (d != null ? coerceToArray(d) : v));
}

function coerceToBoolean(v, d) {
  return v != null ? !!v :
      (d !== undefined ? coerceToBoolean(d) : v);
}

function coerceToNumber(v, d) {
  let x;
  if (v != null) {
    x = parseFloat(v);
    if (x || x === 0)
      return x;
  }
  if ((v == null || isNaN(x)) && arguments.length > 1)
    return d == null ? d : coerceToNumber(d);
  if (v == null)
    return v;
  throw new TypeError(`"${v}" is not a valid number value.`);
}

function coerceToInt(v, d) {
  let x;
  if (v != null) {
    x = parseInt(v, 10);
    if (x || x === 0)
      return x;
  }
  if ((v == null || isNaN(x)) && arguments.length > 1)
    return d == null ? d : coerceToInt(d);
  if (v == null)
    return v;
  throw new TypeError(`"${v}" is not a valid integer value.`);
}

function coerceToString(v, d) {
  return v != null ? '' + v :
      (d !== undefined ? coerceToString(d) : v);
}

function coerceToDate(v, d) {
  if (v == null)
    return d || v;
  if (v instanceof Date)
    return v;
  if (typeof v === 'number')
    return new Date(v);
  if (typeof v === 'string')
    return parseDate(v);
  throw new TypeError(`"${v}" is not a valid date value.`);
}

function parseDate(v, opts) {
  const m = v.match(DATE_FORMAT_PATTERN);
  if (!m)
    throw new TypeError(`"${v}" is not a valid date value.`);
  let s = m[1] + '-' + (m[2] || '01') + '-' + (m[3] || '01') + 'T';

  if (opts && opts.dateOnly)
    s += '00:00:00';
  else {
    s += (m[4] || '00') + ':' + (m[5] || '00') + ':' + (m[6] || '00') +
        (m[7] ? '.' + m[7] : '');
    if (!(opts && opts.ignoreTimezone))
        // Timezone
      s += m[8] ? 'Z' :
          (m[9] ? (m[9] + (m[10] || '00') + ':' + (m[11] || '00')) : '');
  }
  return new Date(s);
}

function camelize(v, pascal) {
  return pascal ? pascalCase(v) : camelCase(v);
}

function camelCase(v) {
  return v.replace(/[\W_\s]+([^\W_\s])/g, (arg$, c) => {
        return c[0].toUpperCase();
      }
  );
}

function pascalCase(v) {
  const s = camelCase(v);
  return s[0].toUpperCase() + s.substring(1);
}

function upperFirst(v) {
  v = coerceToString(v);
  return v ? v[0].toUpperCase() + v.substring(1) : v;
}

function mapDistinct(arr, cb) {
  return arr.reduce((a, x) => {
    x = cb ? cb(x) : x;
    /* istanbul ignore else */
    if (x != null && !a.includes(x))
      a.push(x);
    return a;
  }, []);
}

module.exports = {
  coalesce,
  coerceToArray,
  coerceToString,
  coerceToBoolean,
  coerceToNumber,
  coerceToInt,
  coerceToDate,
  parseDate,
  camelize,
  camelCase,
  pascalCase,
  upperFirst,
  mapDistinct
};
