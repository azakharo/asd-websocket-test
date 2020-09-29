// Loads and de-serializes data.
// Returns undefined on any error.
/* eslint-disable-next-line import/prefer-default-export */
export const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
