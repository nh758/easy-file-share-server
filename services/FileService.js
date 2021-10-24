const fs = require("fs");
const path = require("path");
const AuthService = require("./AuthService.js");

module.exports = class FileService {
  static async upload(req, res) {
    const user = await AuthService.getUserInfo(req.headers.token);
    if (!user || !user.hasOwnProperty("folderName")) {
      return res.status(400).send("Unauthorized");
    }
    const folder = user.folderName;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const files = req.files;
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
      const fileUrl = `${req.hostname}/d/${folder}/${file.name}`;
      urls[key] = fileUrl;
    });

    return res.status(200).send(urls);
  }

  static download(req, res) {
    const { folder, file } = req.params;
    const downloadPath = path.join(__dirname, "../uploads", folder, file);
    res.download(downloadPath, file, err => {
      if (err) {
        res.status(500).send({
          message: "File Not Found"
        });
      }
    });
    return res;
  }

  static async list(req, res) {
    const user = await AuthService.getUserInfo(req.headers.token);
    console.log(user);
    if (!user || !user.hasOwnProperty("folderName")) {
      return res.status(400).send("Unauthorized");
    }
    const folder = user.folderName;
    const folderPath = path.join(__dirname, "../uploads", folder);

    if (!fs.existsSync(folderPath)) {
      return res.status(400).send("Folder not found");
    }

    const files = fs.readdirSync(folderPath);
    const fileList = [];
    files.forEach(file => {
      fileList.push({
        file: file,
        url: `${req.hostname}/d/${folder}/${file}`
      });
    });

    return res.status(200).send(fileList);
  }
  static async delete(req, res) {
    const user = await AuthService.getUserInfo(req.headers.token);
    if (!user || !user.hasOwnProperty("folderName")) {
      return res.status(400).send("Unauthorized");
    }
    const folder = user.folderName;
    const deleteFile = req.params.filename;
    const deletePath = path.join(__dirname, "../uploads", folder, deleteFile);

    fs.rmSync(deletePath);

    return res.status(200).send("the file is deleted");
  }
};
