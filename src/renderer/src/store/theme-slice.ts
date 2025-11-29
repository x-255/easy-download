import { immer } from 'zustand/middleware/immer'

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export type ThemeSlice = {
  theme: Theme
  toggleTheme: () => void
}

export const createThemeSlice = immer<ThemeSlice>((set) => ({
  theme: Theme.Light,
  toggleTheme: () =>
    set((state) => {
      state.theme = state.theme === Theme.Light ? Theme.Dark : Theme.Light
    }),
}))
