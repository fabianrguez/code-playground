import { getState } from './state';

const INPUTS_TYPE = {
  INPUT: 'INPUT',
};

const settingsElements = document.querySelectorAll('.settings [data-for]');

const { updateSettings, ...settings } = getState();

settingsElements.forEach((settingsElement) => {
  const { for: settingKey } = settingsElement.dataset;
  const actualSettingValue = settings[settingKey];
  const { tagName } = settingsElement;

  settingsElement.value = actualSettingValue;

  if (tagName === INPUTS_TYPE.INPUT) {
    settingsElement.addEventListener('change', ({ target }) => {
      const { value } = target;
      updateSettings({ key: settingKey, value });
    });
  }
});
