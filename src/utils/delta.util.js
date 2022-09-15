/**
 * Apply a delta to a given object to transform it into the after object.
 *
 * @param before The before object
 * @param delta The delta of change
 */
export function applyDelta(before, delta) {
  for (let key in delta) {
    if (delta[key] !== null && typeof delta[key] === 'object') {
      if (typeof before[key] !== 'object') {
        before[key] = delta[key];
        continue;
      }
      applyDelta(before[key], delta[key])
      continue;
    }
    if (delta[key] === null) {
      delete before[key];
      continue;
    }
    before[key] = delta[key]
  }
  return before;
}