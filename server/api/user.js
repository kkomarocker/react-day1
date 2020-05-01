const router = require("express").Router();


router.get("/register", (req, res, next) => {
	try {
		res.send("register user");
	} catch (err) {
		next(err);
	}
});

module.exports = router;