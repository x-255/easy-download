import { DOWNLOAD_STATUS } from '@renderer/constant/download'
import { getFilename } from '@renderer/lib/utils'
import { immer } from 'zustand/middleware/immer'

export interface DownloadItem {
  id: number
  url: string
  filename: string
  filesize: number
  downloadedSize: number
  status: DOWNLOAD_STATUS
  message?: string
}

export interface DownloadSlice {
  idCounter: number
  downloadList: DownloadItem[]
  addDownloadItem: (item: { url: string; filename?: string }) => void
  updateDownloadItem: (id: number, newItem: Partial<DownloadItem>) => void
  removeDownloadItem: (id: number) => void
}

export const createDownloadSlice = immer<DownloadSlice>((set) => ({
  idCounter: 1,
  downloadList: [],
  addDownloadItem: ({ url, filename }) =>
    set((state) => {
      filename = filename || getFilename(url || '')

      state.downloadList.push({
        id: state.idCounter++,
        url,
        filename,
        filesize: 0,
        status: DOWNLOAD_STATUS.Pending,
        downloadedSize: 0,
      })
    }),
  updateDownloadItem: (id, newItem) =>
    set((state) => {
      const index = state.downloadList.findIndex((item) => item.id === id)
      if (index !== -1) {
        Object.assign(state.downloadList[index], newItem)
      }
    }),
  removeDownloadItem: (id) =>
    set((state) => {
      const index = state.downloadList.findIndex((item) => item.id === id)
      if (index !== -1) {
        state.downloadList.splice(index, 1)
      }
    }),
}))
