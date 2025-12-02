import { THEME } from '@renderer/constant/theme'
import { immer } from 'zustand/middleware/immer'

export interface Setting {
  storagePath: string
  dlLimit: number
}

export interface SettingSlice {
  setting: Setting
  setSetting: (setting: Setting) => void
  theme: THEME
  toggleTheme: () => void
}

export const createSettingSlice = immer<SettingSlice>((set) => ({
  setting: {
    storagePath:
      window.api.platform === 'win32' ? 'C:\\Downloads' : '/Downloads',
    dlLimit: 3,
  },
  setSetting: (setting: Setting) => set({ setting }),
  theme: THEME.Light,
  toggleTheme: () =>
    set((state) => {
      state.theme = state.theme === THEME.Light ? THEME.Dark : THEME.Light
    }),
}))
