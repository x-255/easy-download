import { immer } from 'zustand/middleware/immer'
import { THEME } from '@renderer/constant/theme'

export interface ThemeSlice {
  theme: THEME
  toggleTheme: () => void
}

export const createThemeSlice = immer<ThemeSlice>((set) => ({
  theme: THEME.Light,
  toggleTheme: () =>
    set((state) => {
      state.theme = state.theme === THEME.Light ? THEME.Dark : THEME.Light
    }),
}))
