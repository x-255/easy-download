import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { createThemeSlice, ThemeSlice } from './theme-slice'

type AppStore = ThemeSlice

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createThemeSlice(...a),
      }),
      {
        name: 'easy-store',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)
