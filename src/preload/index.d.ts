import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      platform: NodeJS.Platform
      openFile: () => Promise<string | undefined>
      changeTheme: (theme: string) => void
    }
  }
}
