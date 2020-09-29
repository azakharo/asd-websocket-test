import {load as loadFromLocalStorage} from 'helpers/localStorage';

const STATE_KEY = 'state';

export const loadState = () => loadFromLocalStorage(STATE_KEY);

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (err) {
    // todo do something with error
    /* eslint-disable-next-line  no-console */
    console.exception(err);
  }
};
