const IsAuth = require("../middlewares/isAuth.js");

const FileService = require("../services/FileService");

module.exports = class ViewRoute {
  static init(app) {
<<<<<<< HEAD:routes/view.js
    app.get("/", (req, res) => {
      res.json({ ok: "ok" });
      // res.render
    });
    app.post("/upload", IsAuth, (req, res) => FileService.upload(req, res));
    app.get("/d/:folder/:file", (req, res) => FileService.download(req, res));
    app.get("/list", (req, res) => FileService.list(req, res));
=======
    app.post("/upload", IsAuth, (req, res) => {
      FileService.upload(req, res);
    });
    app.get("/d/:folder/:file", (req, res) => {
      FileService.download(req, res);
    });
>>>>>>> 5fe03b30f3230441f870c5becf865cd56ed7a483:routes/file.js
  }
};
