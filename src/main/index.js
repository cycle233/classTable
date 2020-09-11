'use strict'

import {app, BrowserWindow} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  const options = {
    height: 500,
    width: 850,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
    backgroundColor: 'transparent',
    resizable: false,
    useContentSize: true
    // show: false,
    // frame: false,
    // center: true
    // fullscreenable: false

    // vibrancy: 'ultra-dark',
    // transparent: true,
    // titleBarStyle: 'hiddenInset',
    // webPreferences: {
    //   backgroundThrottling: false
    // }
  }
  // if (process.platform === 'win32') { // 针对windows平台做出不同的配置
  //   options.show = true // 创建即展示
  //   options.frame = false // 创建一个frameless窗口
  //   options.backgroundColor = '#3f3c37' // 背景色
  // }
  mainWindow = new BrowserWindow(options)
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
