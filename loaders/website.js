const express = require("express");
const formData = require("express-form-data");
const os = require("os");
const path = require('path');

const viewRoute = require("../routes/view.js");

module.exports = class WebLoader {
	static init(app) {
		// view engine
		// app.set('view engine', 'ejs');
		// app.set("views", path.resolve('client/views'));

		// define STATIC resources
		// app.use(express.static(__dirname + ''));

		// parse application/json
		app.use(express.json());

		/**
		 * Options are the same as multiparty takes.
		 * But there is a new option "autoClean" to clean all files in "uploadDir" folder after the response.
		 * By default, it is "false".
		 */
		const options = {
			uploadDir: os.tmpdir(),
			autoClean: true
		};

		// parse data with connect-multiparty. 
		app.use(formData.parse(options));
		// delete from the request all empty files (size == 0)
		app.use(formData.format());
		// change the file objects to fs.ReadStream 
		app.use(formData.stream());
		// union the body and the files
		app.use(formData.union());

		this.initRoutes(app);

		app.listen(process.env.PORT);
	}

	static initRoutes(app) {
		viewRoute.init(app);
	}
};
