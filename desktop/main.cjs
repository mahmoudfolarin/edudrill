const { app, BrowserWindow, ipcMain, net, protocol } = require('electron')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const { pathToFileURL } = require('url')
const DatabaseManager = require('./database.cjs')

let mainWindow = null
let dbManager = null

// Register custom scheme as standard & secure before app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'edudrill',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true
    }
  }
])

// Persistent device identifier in %APPDATA%\EduDrill
function getOrCreateDeviceId() {
  const dataDir = path.join(app.getPath('userData'), 'EduDrillData')
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  const idFile = path.join(dataDir, 'device_id.txt')
  if (fs.existsSync(idFile)) {
    return fs.readFileSync(idFile, 'utf8').trim()
  }
  const newId = 'DESKTOP-' + crypto.randomUUID().toUpperCase()
  fs.writeFileSync(idFile, newId, 'utf8')
  return newId
}

// Persistent product key in %APPDATA%\EduDrill
function getOrCreateProductKey() {
  const dataDir = path.join(app.getPath('userData'), 'EduDrillData')
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  const keyFile = path.join(dataDir, 'product_key.txt')
  if (fs.existsSync(keyFile)) {
    return fs.readFileSync(keyFile, 'utf8').trim()
  }
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  function makePart() {
    let part = ''
    for (let i = 0; i < 4; i++) {
      part += characters[Math.floor(Math.random() * characters.length)]
    }
    return part
  }
  const newKey = `EDU-PROD-${makePart()}-${makePart()}`
  fs.writeFileSync(keyFile, newKey, 'utf8')
  return newKey
}

// Cryptographic HMAC check for offline license record
const LICENSE_HMAC_SALT = 'edudrill_desktop_offline_salt_v1'
function generateLicenseSignature(licenseData) {
  const payload = `${licenseData.productKey}:${licenseData.activationKey}:${licenseData.deviceIdentifier}:${licenseData.activatedAt}`
  return crypto.createHmac('sha256', LICENSE_HMAC_SALT).update(payload).digest('hex')
}

function verifyLicenseSignature(license) {
  if (!license || !license.product_key || !license.signature) return false
  const expected = generateLicenseSignature({
    productKey: license.product_key,
    activationKey: license.activation_key,
    deviceIdentifier: license.device_identifier,
    activatedAt: license.activated_at
  })
  return license.signature === expected
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 980,
    minHeight: 660,
    title: 'EduDrill',
    icon: path.join(__dirname, '..', 'public', 'favicon-32x32.png'),
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#0c192c',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: true
    }
  })

  // Security: prevent opening external links in the same window
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('edudrill://') && !url.startsWith('file://')) {
      event.preventDefault()
    }
  })

  // Security: block popup windows
  mainWindow.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' }
  })

  // Remove default application menu for a clean desktop experience
  mainWindow.setMenuBarVisibility(false)

  // Load compiled student desktop client via custom edudrill scheme
  const indexPath = path.join(__dirname, '..', 'dist_desktop_client', 'index.desktop.html')
  if (fs.existsSync(indexPath)) {
    mainWindow.loadURL('edudrill://app/index.desktop.html')
  } else {
    mainWindow.loadURL('http://localhost:5173')
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Application Lifecycle
app.whenReady().then(async () => {
  // Protocol handler for edudrill://app/...
  protocol.handle('edudrill', (request) => {
    try {
      const url = new URL(request.url)
      const clientDist = path.join(__dirname, '..', 'dist_desktop_client')
      let decodedPath = decodeURIComponent(url.pathname)

      if (decodedPath.startsWith('/')) {
        decodedPath = decodedPath.slice(1)
      }

      let targetFile = path.join(clientDist, decodedPath)

      // Fallback logic
      if (!decodedPath || decodedPath === '') {
        targetFile = path.join(clientDist, 'index.desktop.html')
      } else if (!fs.existsSync(targetFile)) {
        // If file doesn't exist directly, check assets folder by filename
        const assetFallback = path.join(clientDist, 'assets', path.basename(decodedPath))
        if (fs.existsSync(assetFallback)) {
          targetFile = assetFallback
        } else {
          // SPA Route fallback
          targetFile = path.join(clientDist, 'index.desktop.html')
        }
      }

      return net.fetch(pathToFileURL(targetFile).toString())
    } catch (err) {
      console.error('[PROTOCOL ERROR]', err)
      return new Response('Not found', { status: 404 })
    }
  })

  // Initialize local SQLite database
  dbManager = new DatabaseManager(app.getPath('userData'))
  await dbManager.init()

  // Register IPC Handlers
  setupIpcHandlers()

  await createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function setupIpcHandlers() {
  // 1. Database Queries
  ipcMain.handle('db:get-subjects', async () => {
    return dbManager.getSubjects()
  })

  ipcMain.handle('db:get-exams', async () => {
    return dbManager.getExams()
  })

  ipcMain.handle('db:get-syllabus', async (event, { exam, subject }) => {
    return dbManager.getSyllabus(exam, subject)
  })

  ipcMain.handle('db:get-questions', async (event, query) => {
    return dbManager.getQuestions(query || {})
  })

  ipcMain.handle('db:save-performance', async (event, data) => {
    return dbManager.savePerformance(data)
  })

  ipcMain.handle('db:get-performance', async (event, userId) => {
    return dbManager.getPerformance(userId || 'desktop_user')
  })

  ipcMain.handle('db:save-bookmark', async (event, data) => {
    return dbManager.saveBookmark(data)
  })

  ipcMain.handle('db:get-bookmarks', async (event, userId) => {
    return dbManager.getBookmarks(userId || 'desktop_user')
  })

  ipcMain.handle('db:delete-bookmark', async (event, { lessonId, userId }) => {
    return dbManager.deleteBookmark(lessonId, userId || 'desktop_user')
  })

  // 2. Licensing & Device
  ipcMain.handle('license:get-device-id', async () => {
    return getOrCreateDeviceId()
  })

  ipcMain.handle('license:get-product-key', async () => {
    return getOrCreateProductKey()
  })

  ipcMain.handle('db:save-profile', async (event, profile) => {
    return dbManager.saveStudentProfile(profile)
  })

  ipcMain.handle('db:get-profile', async () => {
    return dbManager.getStudentProfile()
  })

  ipcMain.handle('license:get-status', async () => {
    const lic = dbManager.getLicense()
    if (!lic) return { active: false, license: null }
    const isValid = verifyLicenseSignature(lic)
    return {
      active: isValid,
      license: isValid ? lic : null
    }
  })

  ipcMain.handle('license:activate', async (event, { productKey, activationKey }) => {
    const deviceId = getOrCreateDeviceId()
    try {
      // 1. Ensure device & product are registered on backend first
      try {
        await fetch('https://edudrill-1.onrender.com/api/products/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deviceIdentifier: deviceId,
            deviceName: 'EduDrill Desktop App'
          })
        })
      } catch (_) {}
      // Authoritative online request to production Render backend
      const response = await fetch('https://edudrill-1.onrender.com/api/activation-keys/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productKey,
          activationKey,
          deviceIdentifier: deviceId
        })
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        return {
          success: false,
          message: data.message || 'Activation failed with server.'
        }
      }

      // Compute tamper-evident signature and save to local SQLite
      const activatedAt = data.license?.activated_at || new Date().toISOString()
      const signature = generateLicenseSignature({
        productKey,
        activationKey,
        deviceIdentifier: deviceId,
        activatedAt
      })

      dbManager.saveLicense({
        productKey,
        activationKey,
        status: 'Active',
        deviceIdentifier: deviceId,
        activatedAt,
        signature
      })

      return {
        success: true,
        message: 'EduDrill activated successfully!',
        license: {
          product_key: productKey,
          activation_key: activationKey,
          status: 'Active',
          activated_at: activatedAt
        }
      }
    } catch (err) {
      console.error('[ACTIVATION ERROR]', err)
      return {
        success: false,
        message: 'Could not connect to activation server. Please check your internet connection.'
      }
    }
  })

  // 3. Network check
  ipcMain.handle('net:check-online', async () => {
    return net.isOnline()
  })

  // 4. Window Management
  ipcMain.on('window:minimize', () => {
    if (mainWindow) mainWindow.minimize()
  })
  ipcMain.on('window:maximize', () => {
    if (!mainWindow) return
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })
  ipcMain.on('window:close', () => {
    if (mainWindow) mainWindow.close()
  })
  ipcMain.handle('window:is-maximized', () => {
    return mainWindow ? mainWindow.isMaximized() : false
  })
}
