import type { Dict } from './schema';
import { en } from './locales/en';
import { vi } from './locales/vi';
import { ptBr } from './locales/pt-br';
import { ru } from './locales/ru';
import { id } from './locales/id';
import { hi } from './locales/hi';
import { DEFAULT_LOCALE, type Locale } from './config';

export const DICTS: Record<Locale, Dict> = {
  en,
  vi,
  'pt-br': ptBr,
  ru,
  id,
  hi,
};

/** Look up a dictionary, falling back to English for an unknown code. */
export function t(locale: Locale): Dict {
  return DICTS[locale] ?? DICTS[DEFAULT_LOCALE];
}

export { DEFAULT_LOCALE };
export type { Locale, Dict };
export * from './config';
