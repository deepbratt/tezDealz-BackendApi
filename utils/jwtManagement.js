const jwt = require('jsonwebtoken');

const signToken = (user) => {
	const payload = {
		userdata: {
			id: user._id,
		},
	};
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
	});
};
exports.createSendJwtToken = (user, statuscode, req, res) => {
	const token = signToken(user);
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
		httpOnly: true,
		//secure: req.secure || req.headers('x-forwarded-proto') === 'https',
	};
	res.cookie('jwt', token, cookieOptions);
	user.password = undefined;
	res.status(statuscode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};
