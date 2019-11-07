import { LOCALIZATION__UPDATE } from 'dictionary/action';
import { supportedLanguages } from 'dictionary/localization';
import { createAction } from 'util/action';
import { getLanguageDirectionality } from 'util/localization';

export function updateLocalization(languageCode) {
  return createAction({
    type: LOCALIZATION__UPDATE,
    action: async() => {
      if (Object.keys(supportedLanguages).includes(languageCode)) {
        return {
          directionality: getLanguageDirectionality(languageCode),
          languageCode,
          staticText: await import(`assets/json/staticText/${languageCode}.json`),
        };
      }

      return Promise.reject(languageCode);
    },
  });
}
