import { dictionaries } from '@/lib/i18n/dictionaries';
import { useAppStore } from '@/store/app-store';

const getValue = (dictionary: unknown, path: string) => {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }

    return path;
  }, dictionary);
};

export function useI18n() {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const dictionary = dictionaries[language];

  return {
    language,
    setLanguage,
    t: (path: string) => {
      const value = getValue(dictionary, path);
      return typeof value === 'string' ? value : path;
    },
  };
}
