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

function camelize(v, upperFirst) {
  return v.replace(/[\W_\s]*([^\W_\s]+)/g, (arg$, c, i) => {
        c = (c != null ? c : '');
        return (upperFirst || i > 0 ?
            c[0].toUpperCase() + c.substring(1).toLowerCase() : c.toLowerCase());
      }
  );
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
  camelize,
  upperFirst,
  mapDistinct
};
