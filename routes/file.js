const IsAuth = require("../middlewares/isAuth.js");

const FileService = require("../services/FileService");

module.exports = class ViewRoute {
  static init(app) {
    app.post("/upload", IsAuth, (req, res) => {
      FileService.upload(req, res);
    });
    app.get("/d/:folder/:file", (req, res) => {
      FileService.download(req, res);
    });
  }
};
