const fs = require("fs");
const path = require("path");
const AuthService = require("./AuthService.js");

module.exports = class FileService {
  static get() {}

  static upload(req, res) {
    //Check identity (WIP)
    // const user = AuthService.getUserInfo(req.headers.token);
    // if (!user || !user.hasOwnProperty("folder")) {
    //   return res.status(400).send("Unauthorized");
    // }
    // const folder = user.folder;
    const folder = "test";

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const files = req.files;
    console.log(files);
    const uploadDir = path.join(__dirname, "../uploads", folder);

    // Make the director if it's missing
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    const urls = {};

    Object.entries(files).forEach(entry => {
      const [key, file] = entry;
      file.mv(path.join(uploadDir, file.name), err => {
        if (err) {
          return res.status(500).send(err);
        }
      });
      const fileUrl = `TODO url...${file.name}`;
      urls[key] = fileUrl;
    });

    return res.status(200).send(urls);
  }
};
