import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { homedir } from 'os'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.maximize()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

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

const reactDevToolsPath = 'fmkadmapgofadopljbjfkapdkoienihi/7.0.1_1'
const reduxDevToolsPath = 'lmhkpmbekcpmknklioeibfkpmmfibljd/3.2.10_0'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const win = createWindow()

  ipcMain.handle('dialog:openFile', () => handleFileOpen(win))

  try {
    if (is.dev) {
      const loadExtension = (path: string) =>
        win.webContents.session.extensions.loadExtension(
          join(
            homedir(),
            `/Library/Application Support/Google/Chrome/Default/Extensions/${path}`
          ),
          {
            allowFileAccess: true,
          }
        )
      await Promise.all([
        loadExtension(reactDevToolsPath),
        loadExtension(reduxDevToolsPath),
      ])
    }
  } catch (error) {
    console.error('Failed to load extensions:', error)
  }

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
