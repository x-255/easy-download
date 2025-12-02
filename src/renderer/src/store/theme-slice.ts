import { immer } from 'zustand/middleware/immer'
import { theme } from 'antd'

export interface ThemeSlice {
  theme: typeof theme.darkAlgorithm | typeof theme.defaultAlgorithm
  toggleTheme: () => void
}

export const createThemeSlice = immer<ThemeSlice>((set) => ({
  theme: theme.defaultAlgorithm,
  toggleTheme: () =>
    set((state) => {
      state.theme =
        state.theme === theme.darkAlgorithm
          ? theme.defaultAlgorithm
          : theme.darkAlgorithm
    }),
}))
