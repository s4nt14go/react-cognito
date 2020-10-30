export function stringify(val: any, depth: number, replacer: (this: any, key: string, value: any) => any, space?: string | number, onGetObjID?: (val: object) => string): string {
  depth = isNaN(+depth) ? 1 : depth;
  var recursMap = new WeakMap();
  function _build(val: any, depth: number, o?: any, a?: boolean, r?: boolean) {
    return !val || typeof val != 'object' ? val
      : (r = recursMap.has(val),
        recursMap.set(val, true),
        a = Array.isArray(val),
        // eslint-disable-next-line
        r ? (o = onGetObjID && onGetObjID(val) || null) : JSON.stringify(val, function (k, v) { if (a || depth > 0) { if (replacer) v = replacer(k, v); if (!k) return (a = Array.isArray(v), val = v); !o && (o = a ? [] : {}); o[k] = _build(v, a ? depth : depth - 1); } }),
        o === void 0 ? (a?[]:{}) : o);
  }
  return JSON.stringify(_build(val, depth), null, space);
}
