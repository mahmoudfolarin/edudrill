# EduDrill Windows Desktop Application Guide

## 1. Overview
The EduDrill Windows Desktop Application packages the student CBT and learning platform into a standalone Windows `.exe` installer. It operates offline for educational features (questions, CBT mocks, syllabus learning, practice tests, and local progress tracking) while reusing the authoritative online backend for device activation.

---

## 2. Windows Installer Location
The production installer is generated in:
```
dist_desktop_installer/EduDrill_Setup_1.0.0.exe
```
- **File size**: ~132 MB
- **Architecture**: Windows x64 (compatible with Windows 10 & Windows 11)
- **Format**: NSIS Installation Wizard with Desktop Shortcut, Start Menu entry, and EduDrill branding.

---

## 3. How to Build a New Installer
To rebuild the desktop application and generate a fresh `.exe` installer, run:
```bash
npm run build:desktop
```
This single command runs the 3-step pipeline:
1. `npm run build:desktop:client`: Compiles the student-only React/Vite interface to `dist_desktop_client/`.
2. `npm run build:desktop:data`: Generates and syncs the initial SQLite database (`desktop/data/edudrill_initial.db`).
3. `npm run build:desktop:exe`: Packages the Electron runtime and NSIS installer using `electron-builder`.

### Individual Sub-commands:
- Build only the client UI: `npm run build:desktop:client`
- Re-seed offline question bank: `npm run build:desktop:data`
- Package the `.exe` installer: `npm run build:desktop:exe`
- Run the desktop app locally in development: `npm run start:desktop`

---

## 4. How the Offline Educational Database Works
- **Engine**: SQLite running via pure JavaScript WebAssembly (`sql.js/dist/sql-asm.js`), requiring no C++ compilers or native rebuild tools.
- **Initial Content**: Bundled in `desktop/data/edudrill_initial.db`, containing:
  - 1,890+ verified examination questions (WAEC, JAMB, NECO, GCE).
  - 22 subjects across Science, Commercial, Arts, and Core groups.
  - Curriculums, syllabuses, topics, and lessons.
- **User Data Storage**:
  On first launch, the application creates a persistent directory in the student's Windows AppData:
  ```
  %APPDATA%\EduDrill\EduDrillData\edudrill_local.db
  ```
  This stores:
  - Local practice and CBT mock exam scores
  - Topic bookmarks
  - Cryptographically signed offline license record
- **Preservation on Updates**:
  Because user data is stored in `%APPDATA%`, installing a new version of `EduDrill_Setup_x.x.x.exe` never erases or overwrites the student's saved practice history or activation.

---

## 5. Question and Content Updates
To update the bundled question bank in future installer versions:
1. Add new questions to `server/data/extractedQuestions.json` or `server/data/presetQuestions.json`.
2. Run:
   ```bash
   npm run build:desktop:data
   ```
3. Re-run `npm run build:desktop:exe` to generate an updated installer with the new question pack.

---

## 6. Security Architecture
- **Admin Isolation**: The desktop build (`src/DesktopApp.jsx`) completely excludes all administrative components (`AdminDashboard`, `AdminQuestions`, `ActivationKeys`, etc.). Any attempt to navigate to `/admin` routes redirects immediately to home (`/`).
- **No Server Secrets**: Server source code, database passwords, and environment files (`.env`) are explicitly excluded from the installer bundle in `electron-builder.json`.
- **Electron Security**:
  - `contextIsolation: true`
  - `nodeIntegration: false`
  - Strict IPC whitelist via `desktop/preload.cjs` (`window.desktopApi`).
  - Web navigation locked to local application files (`will-navigate` blocks arbitrary remote URLs).
  - Popups and new windows denied (`setWindowOpenHandler` denies all).

---

## 7. Online Activation & Offline License Verification
1. **Online Requirement**: First-time activation requires an internet connection to contact `https://edudrill-1.onrender.com/api/activation-keys/activate`.
2. **Offline Verification**: Once verified by the authoritative server, a tamper-evident HMAC signature is saved to the local SQLite database. On all subsequent launches, the desktop app validates the signature locally without requiring internet access.
3. **Graceful Fallbacks**: Features that genuinely require the cloud (AI Tutor and online dictionary) detect when the device is offline and provide a friendly notification without crashing or blocking the rest of the application.
