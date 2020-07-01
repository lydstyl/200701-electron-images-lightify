const ipc = require("electron").ipcRenderer,
  folderBtn = document.querySelector("#folderPath"),
  folderInput = document.querySelector('[name="inputImagesFolder"]');

folderBtn.addEventListener("click", () => {
  ipc.send("getFolder", "Message getFolder");
});

ipc.on("asynReply", (event, args) => {
  folderInput.value = args;
});

document.querySelector('[type="submit"]').addEventListener("click", (evt) => {
  // ipc.send("getFolder", "Message getFolder");
  evt.preventDefault();

  const settings = {};

  document.querySelectorAll("input,select").forEach((el) => {
    if (el.name) {
      if (el.name === "width2" && el.value) {
        settings["width"] = el.value;
      } else {
        settings[el.name] = el.value;
      }
    }
  });

  if (settings.width2) {
  }

  // finish settings so it match the script
  settings.width = parseInt(settings.width, 10);
  settings.outputExts = ["jpg", "webp"];
  settings.greyscale = settings.greyscale === "true" ? true : false;

  ipc.send("resize", settings);
});
