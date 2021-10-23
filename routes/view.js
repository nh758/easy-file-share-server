const FileService = require("../services/FileService");

module.exports = class ViewRoute {
  static init(app) {
    app.get("/", (req, res) => {
      res.json({ ok: "ok" });
      // res.render
    });
    app.post("/upload", (req, res) => {
      FileService.upload(req, res);
    });
  }
};
