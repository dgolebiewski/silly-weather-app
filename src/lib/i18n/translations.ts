import i18n from 'sveltekit-i18n';
import type { Config } from 'sveltekit-i18n';
import { createLoaders } from './loaders';

const KEYS = ['common', 'homepage', 'settings'];

const config: Config = {
	loaders: [...createLoaders('en', KEYS), ...createLoaders('pl', KEYS)]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
