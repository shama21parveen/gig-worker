import type { Language, LocalizedString } from '@/types';

export const getLocalizedText = (value: LocalizedString, language: Language) => value[language];
