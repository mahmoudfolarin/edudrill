const { contextBridge, ipcRenderer } = require('electron')

// Restricted bridge exposing ONLY required student APIs
contextBridge.exposeInMainWorld('desktopApi', {
  isDesktop: true,

  getSubjects: () => ipcRenderer.invoke('db:get-subjects'),
  getExams: () => ipcRenderer.invoke('db:get-exams'),
  getSyllabus: (exam, subject) => ipcRenderer.invoke('db:get-syllabus', { exam, subject }),
  getQuestions: (query) => ipcRenderer.invoke('db:get-questions', query),

  savePerformance: (data) => ipcRenderer.invoke('db:save-performance', data),
  getPerformance: (userId) => ipcRenderer.invoke('db:get-performance', userId),

  saveBookmark: (data) => ipcRenderer.invoke('db:save-bookmark', data),
  getBookmarks: (userId) => ipcRenderer.invoke('db:get-bookmarks', userId),
  deleteBookmark: (lessonId, userId) => ipcRenderer.invoke('db:delete-bookmark', { lessonId, userId }),

  getLicenseStatus: () => ipcRenderer.invoke('license:get-status'),
  getDeviceId: () => ipcRenderer.invoke('license:get-device-id'),
  activate: (data) => ipcRenderer.invoke('license:activate', data),

  isOnline: () => ipcRenderer.invoke('net:check-online')
})
