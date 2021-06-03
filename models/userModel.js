const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { appErrors } = require('../constants/appConstants');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		minlength: 3,
		maxlength: 15,
		required: [true, appErrors.FIRSTNAME_REQUIRED],
		validate: [validator.isAlpha, appErrors.INVALID_FIRSTNAME],
	},
	lastName: {
		type: String,
		minlength: 3,
		maxlength: 15,
		required: [true, appErrors.LASTNAME_REQUIRED],
		validate: [validator.isAlpha, appErrors.INVALID_LASTNAME],
	},
	email: {
		type: String,
		required: [true, appErrors.EMAIL_REQUIRED],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, appErrors.INVALID_EMAIL],
	},
	phone: {
		type: String,
		validate: [validator.isMobilePhone, appErrors.INVALID_PHONE_NUM],
	},
	password: {
		type: String,
		required: [true, appErrors.PASSWORD_REQUIRED],
		minlength: 8,
		select: false,
	},
	dateOfjoin: {
		type: Date,
		required: true,
		default: Date.now(),
	},
});

//pre save middleware (runs before data saved to db)
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

//SCHEMA METHODS
userSchema.methods.correctPassword = async function (candidatePassword, userpassword) {
	// Check Password Is Correct??
	return await bcrypt.compare(candidatePassword, userpassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
