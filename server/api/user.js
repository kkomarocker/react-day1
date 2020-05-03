const router = require("express").Router();
const User = require("../db/user");
const bcrypt = require("bcrypt");

router.get("/users", async (req, res, next) => {
	try {
		const data = await User.findAll();
		res.send(data);
	} catch (err) {
		next(err);
	}
});

router.post("/register", async (req, res, next) => {
	try {
		const { userName, firstName, lastName, email, password } = req.body;
		const saltRound = 10;
		let hashedPassword = "";

		await bcrypt.hash(password, saltRound, (err, hash) => {
			if (err) console.log(err);
			hashedPassword = hash;

			User.findOrCreate({
				where: {
					userName,
				},
				defaults: {
					userName,
					firstName,
					lastName,
					email,
					password: hashedPassword,
				},
			}).then(([user, created]) => {
				const createdUser = user.get({ plain: true });
				const { userName, createdAt } = createdUser;

				const data = {
					userName,
					createdAt,
					created,
				};

				res.send(data);
			});
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
