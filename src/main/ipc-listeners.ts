import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  IpcMainInvokeEvent,
  nativeTheme,
} from 'electron'
import pie from 'puppeteer-in-electron'
import puppeteer from 'puppeteer-core'
import { partial } from 'ramda'

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

const parseJablePage = async (_e: IpcMainInvokeEvent, pageUrl: string) => {
  const browser = await pie.connect(app, puppeteer as any)

  const window = new BrowserWindow({ show: false })
  await window.loadURL(pageUrl)

  const page = await pie.getPage(browser, window)
  const filename = (await page.title()).split(' ')[1]
  const hlsUrl = await page.evaluate(() => hlsUrl)
  await window.close()
  return { filename, url: hlsUrl }
}

export default function ipcListeners(win: BrowserWindow) {
  ipcMain.on('theme:change', (_e, theme) => {
    nativeTheme.themeSource = theme
  })
  ipcMain.handle('dialog:openFile', partial(handleFileOpen, [win]))
  ipcMain.handle('parseJablePage', parseJablePage)
}
