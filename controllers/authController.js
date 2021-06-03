const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchErrors');
const { appErrors } = require('../constants/appConstants');
const { SUCCESS } = require('../constants/appConstants').resStatus;
const jwt = require('jsonwebtoken');
const jwtManagement = require('../utils/jwtManagement');

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = {
		firstName: req.body.firstName.trim(),
		lastName: req.body.lastName.trim(),
		email: req.body.email.trim(),
		phone: req.body.phone.trim(),
		password: req.body.password.trim(),
	};
	await User.create(newUser);
	res.status(201).json({
		status: SUCCESS,
		message: appErrors.OPERATION_SUCCESSFULL,
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		// checking email or password empty?
		return next(new AppError(appErrors.NO_CREDENTIALS, 400));
	}

	const user = await User.findOne({ email: email }).select('+password');
	//user existance and password is correct
	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError(appErrors.WRONG_CREDENTIAL_ERROR, 401));
	}
	jwtManagement.createSendJwtToken(user, 200, req, res);
});

exports.authenticate = catchAsync(async (req, res, next) => {
	//getting token and check is it there
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}
	if (!token) {
		return next(new AppError(appErrors.UNAUTHORIZED_ERROR, 401));
	}
	//verification token
	const decoded = jwt.verify(token, JWT_SECRET);
	//check if user sitll exists
	const currentUser = await User.findById(decoded.userdata.id);
	if (!currentUser) {
		return next(new AppError(`User ${appErrors.NOT_FOUND}`, 404));
	}
	//check if user changed password after the token was issued
	// if (currentUser.changedPasswordAfter(decoded.iat)) {
	// 	return next(new AppError('You have recently changed password! Please login again.', 401));
	// }

	//Grant access to protected route
	req.user = currentUser;
	next();
});

exports.logout = catchAsync(async (req, res, next) => {
	res.cookie('jwt', 'loggedout', {
		expires: new Date(Date.now() + 10),
		httpOnly: true,
	});
	res.status(200).json({ status: SUCCESS });
});

exports.protectedRoute = async (req, res) => {
	res.status(200).json({
		status: SUCCESS,
	});
};
