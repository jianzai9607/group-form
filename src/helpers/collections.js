import _ from "lodash";

const getDeepKeys = (obj) => {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
    if (typeof obj[key] === "object") {
      var subkeys = getDeepKeys(obj[key]);
      keys = keys.concat(
        subkeys.map(function (subkey) {
          return key + "." + subkey;
        })
      );
    }
  }
  return keys;
};

// Check object is not null/undefined and has all keys of defaultObject
export const checkHasAllKeys = (object, defaultObject) => {
  try {
    const keys = getDeepKeys(defaultObject);

    if (object) {
      for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!_.has(object, key)) {
          throw `${object} no have key: ${key}.`;
        }
      }
      return true;
    }

    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
