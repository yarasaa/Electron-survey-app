const { contextBridge, ipcRenderer } = require('electron');

window.ipcRenderer = require('electron').ipcRenderer;
contextBridge.exposeInMainWorld('electron', {
  store: {
    get(val) {
      return ipcRenderer.sendSync('electron-store-get', val);
    },
    set(property, val) {
      ipcRenderer.send('electron-store-set', property, val);
    },
  },
});
