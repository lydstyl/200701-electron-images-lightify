const { app, BrowserWindow, dialog, ipcMain } = require("electron");



const { resize } = require("./askConvertConfirmation.js");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 630,
    height: 570,
    // height: 1350,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.setMenu(null);

  // and load the index.html of the app.
  win.loadFile("index.html");

  // Open the DevTools.
  // win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const ipc = require("electron").ipcMain;
ipc.on("synMessage", (event, args) => {
  console.log(args);
  event.returnValue = "Main said I received your Sync message";
});

ipc.on("aSynMessage", (event, args) => {
  console.log(args);
  event.sender.send("asynReply", "Main said: Async message received");
});

ipc.on("getFolder", (event, args) => {
  console.log(args);

  dialog.showOpenDialog({ properties: ["openDirectory"] }).then((res) => {
    console.log(res);
    if (!res.canceled) {
      event.sender.send("asynReply", res.filePaths[0]);
    }
  });
});

ipc.on("resize", (event, args) => {
  if (!args.inputImagesFolder) return;

  resize(args);
});
