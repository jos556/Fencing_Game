import { create } from 'zustand';

interface SettingsStore {
  language: 'en' | 'zh';
  volume: number;
  theme: string;
  setLanguage: (lang: 'en' | 'zh') => void;
  setVolume: (vol: number) => void;
  setTheme: (theme: string) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  language: 'zh',
  volume: 0.5,
  theme: 'classic',
  setLanguage: (lang) => set({ language: lang }),
  setVolume: (vol) => set({ volume: vol }),
  setTheme: (theme) => set({ theme: theme }),
})); 