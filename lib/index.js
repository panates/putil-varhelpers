function camelize(v, upperFirst) {
  return (upperFirst ? v[0].toUpperCase() : v[0]) +
      v.substring(1).replace(/[-_]+(.)?/g, (arg$, c) =>
          (c != null ? c : '').toUpperCase()
      );
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
  if (v == null)
    return d !== undefined ? coerceToNumber(d) : v;
  v = parseFloat(v);
  return isNaN(v) ? undefined : v;
}

function coerceToString(v, d) {
  return v != null ? '' + v :
      (d !== undefined ? coerceToString(d) : v);
}

module.exports = {
  camelize,
  coerceToArray,
  coerceToString,
  coerceToBoolean,
  coerceToNumber
};
