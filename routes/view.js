const FileService = require("../services/FileService");

module.exports = class ViewRoute {
  static init(app) {
    app.get("/", (req, res) => {
      res.json({ ok: "ok" });
      // res.render
    });
    app.post("/upload", (req, res) => FileService.upload(req, res));
    app.get("/d/:folder/:file", (req, res) => FileService.download(req, res));
    app.get("/list", (req, res) => FileService.list(req, res));
  }
};
