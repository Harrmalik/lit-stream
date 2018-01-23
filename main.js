const { app, BrowserWindow,globalShortcut } = require('electron');
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// app.on('ready', function handleReady () {
//   // Create our browser window for google.com
//   var windowOpts = {
//     height: 920,
//     width: 1024
//   };
//   // var browserWindow = new BrowserWindow(windowOpts);
//   // browserWindow.loadUrl('file://' + __dirname + '/index.html');
// createWindow()
//   // Load our media keys
//   // Copied from https://gist.github.com/twolfson/0a03820e27583cc9ad6e
//   var registered = globalShortcut.register('medianexttrack', function () {
//     console.log('medianexttrack pressed');
//   });
//   if (!registered) {
//     console.log('medianexttrack registration failed');
//   } else {
//     console.log('medianexttrack registration bound!');
//   }
//
//   var registered = globalShortcut.register('mediaplaypause', function () {
//     console.log('mediaplaypause pressed');
//   });
//   if (!registered) {
//     console.log('mediaplaypause registration failed');
//   } else {
//     console.log('mediaplaypause registration bound!');
//   }
//
//   var registered = globalShortcut.register('mediaprevioustrack', function () {
//     console.log('mediaprevioustrack pressed');
//   });
//   if (!registered) {
//     console.log('mediaprevioustrack registration failed');
//   } else {
//     console.log('mediaprevioustrack registration bound!');
//   }
//
//   var registered = globalShortcut.register('mediastop', function () {
//     console.log('mediastop pressed');
//   });
//   if (!registered) {
//     console.log('mediastop registration failed');
//   } else {
//     console.log('mediastop registration bound!');
//   }
// });

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
