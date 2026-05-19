import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthSession, Language } from '@/types';

interface AppState {
  language: Language;
  session: AuthSession;
  setLanguage: (language: Language) => void;
  signIn: (workerId: string) => void;
  signOut: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      session: {
        isAuthenticated: false,
        workerId: null,
        role: 'worker',
      },
      setLanguage: (language) => set({ language }),
      signIn: (workerId) =>
        set({
          session: {
            isAuthenticated: true,
            workerId,
            role: 'worker',
          },
        }),
      signOut: () =>
        set({
          session: {
            isAuthenticated: false,
            workerId: null,
            role: 'worker',
          },
        }),
    }),
    {
      name: 'gig-worker-os-app',
      partialize: (state) => ({
        language: state.language,
        session: state.session,
      }),
    },
  ),
);
