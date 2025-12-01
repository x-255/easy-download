import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { createThemeSlice, ThemeSlice } from './theme-slice'
import { createDownloadSlice, DownloadSlice } from './download-slice'

type AppStore = ThemeSlice & DownloadSlice

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createThemeSlice(...a),
        ...createDownloadSlice(...a),
      }),
      {
        name: 'easy-store',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)
