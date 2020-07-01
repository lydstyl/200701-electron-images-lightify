const ipc = require("electron").ipcRenderer,
  folderBtn = document.querySelector("#folderPath"),
  replyDiv = document.querySelector('[name="inputImagesFolder"]');

folderBtn.addEventListener("click", () => {
  ipc.send("getFolder", "Message getFolder");
});

ipc.on("asynReply", (event, args) => {
  replyDiv.value = args;
});

document.querySelector('[type="submit"]').addEventListener("click", (evt) => {
  // ipc.send("getFolder", "Message getFolder");
  evt.preventDefault();

  const options = {};

  document.querySelectorAll("input,select").forEach((el) => {
    if (el.name) {
      if (el.name === "width2" && el.value) {
        options["width"] = el.value;
      } else {
        options[el.name] = el.value;
      }
    }
  });

  if (options.width2) {
  }

  console.log("options", options);
});
