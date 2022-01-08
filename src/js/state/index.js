import create from 'zustand/vanilla';
import { DEFAULT_SETTINGS } from '../constants';

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

const appInitialState = {
  ...DEFAULT_SETTINGS,
  ...getLocalStorage('appInitialState'),
};

const useStore = create((set) => ({
  ...appInitialState,
  updateSettings: ({ key, value }) => {
    set((state) => {
      setLocalStorage('appInitialState', {
        ...state,
        [key]: value,
      });
      return { [key]: value };
    });
  },
}));

export const { getState, setState, subscribe, destroy } = useStore;
