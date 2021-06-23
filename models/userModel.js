const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
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
  // dateOfjoin: {
  // 	type: Date,
  // 	required: true,
  // 	default: Date.now(),
  // },
  passwordConfirm: {
    type: String,
    required: [true, appErrors.CONFIRM_PASSWORD_REQUIRED],
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: appErrors.PASSWORD_MISMATCH,
    },
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
});

//pre save middleware (runs before data saved to db)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//SCHEMA METHODS
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userpassword,
) {
  // Check Password Is Correct??
  return await bcrypt.compare(candidatePassword, userpassword);
};

// Instance Method to get Random 4-digit code
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = Math.floor(Math.random() * (1000 - 9999 + 1) + 9999);

  this.passwordResetToken = resetToken;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
