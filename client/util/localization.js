import { directionality } from 'dictionary/localization';

/**
 * Returns the directionality of the language corresponding to the given code.
 * @param   {string}  code  The language code.
 * @returns {string}
 */
export function getLanguageDirectionality(code) {
  switch (code) {
    case 'ar':
      return directionality.rtl;
    default:
      return directionality.ltr;
  }
}
