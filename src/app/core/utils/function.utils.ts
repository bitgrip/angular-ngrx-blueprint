/**
 * Build nested collection out of a flat collection with parent_id related properties
 *
 * @param data
 * @param parent_id
 * @returns {array}
 */
export function getNestedChildren(data, parent_id = null) {
  const nested = [];
  for (const item of data) {
    if (item.parent_id === parent_id) {
      const children = getNestedChildren(data, item.id);

      if (children.length) {
        item.children = children;
      }
      nested.push(item);
    }
  }
  return nested;
}

/**
 * Deep merge two objects.
 * immutable (does not modify the inputs)
 *
 * @param target
 * @param source
 * @returns {object}
 */
export function mergeDeep(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[ key ])) {
        if (!(key in target)) {
          Object.assign(output, { [ key ]: source[ key ] });
        } else {
          output[ key ] = mergeDeep(target[ key ], source[ key ]);
        }
      } else {
        Object.assign(output, { [ key ]: source[ key ] });
      }
    });
  }
  return output;
}

/**
 * cast any primitive data type to Boolean
 *
 * @param value
 * @returns {boolean}
 */
export function primitiveToBoolean(value: string | number | boolean | null): boolean {
  if (value === 'true') {
    return true;
  }

  return typeof value === 'string'
    ? !!+value   // we parse string to number first
    : !!value;
}

/**
 * Simple is object check.
 *
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}
