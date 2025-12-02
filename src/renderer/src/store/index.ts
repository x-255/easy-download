import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { createDownloadSlice, DownloadSlice } from './download-slice'
import { createSettingSlice, SettingSlice } from './setting-slice'

type AppStore = DownloadSlice & SettingSlice

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createDownloadSlice(...a),
        ...createSettingSlice(...a),
      }),
      {
        name: 'easy-store',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)
