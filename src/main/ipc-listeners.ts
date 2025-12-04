import { BrowserWindow, dialog, ipcMain, nativeTheme } from 'electron'

async function handleFileOpen(win: BrowserWindow) {
  const { canceled, filePaths } = await dialog.showOpenDialog(win, {
    properties: ['openDirectory'],
  })
  if (!canceled) {
    return filePaths[0]
  } else {
    return undefined
  }
}

export default function ipcListeners(win: BrowserWindow) {
  ipcMain.handle('dialog:openFile', handleFileOpen.bind(null, win))
  ipcMain.on('theme:change', (_e, theme) => {
    nativeTheme.themeSource = theme
  })
}
