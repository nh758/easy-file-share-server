// NOTE: require("services/");

module.exports = class ViewRoute {
	static init(app) {
		app.get('/', (req, res) => {
			res.json({ ok: "ok" });
			// res.render

			// call any function of service
		});
	}
}