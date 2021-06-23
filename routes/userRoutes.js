const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/usersController');
const {
  signupValidationRules,
  validationFunction,
} = require('../utils/validation');
const router = express.Router();

// SIGNUP
/**
 *@swagger
 *  /v1/users/signup:
 *  post:
 *    tags:
 *    - "Signup"
 *    summary: "use for signup"
 *    description: ""
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "signup data"
 *      required: true
 *      schema:
 *        type: "object"
 *        properties:
 *              firstName:
 *                  type: "string"
 *              lastName:
 *                  type: "string"
 *              email:
 *                  type: "string"
 *              phone:
 *                  type: "string"
 *              password:
 *                  type: "string"
 *              passwordConfirm:
 *                  type: "string"
 *    responses:
 *      "400":
 *        description: "Invalid input"
 *      "201":
 *        description: "Account created Successfully"
 */
router.post(
  '/signup',
  signupValidationRules,
  validationFunction,
  authController.signup,
);

//LOGIN

/**
 *@swagger
 *  /v1/users/login:
 *  post:
 *    tags:
 *    - "login"
 *    summary: "use for login"
 *    description: ""
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "login data"
 *      required: true
 *      schema:
 *        type: "object"
 *        properties:
 *              email:
 *                  type: "string"
 *              password:
 *                  type: "string"
 *    responses:
 *      "400":
 *        description: "incorrect email or password"
 *      "200":
 *        description: "you are logged in Successfully"
 */
router.post('/login', authController.login);

//LGOUT
/**
 *@swagger
 *  /v1/Users/logout:
 *  get:
 *    tags:
 *    - "logout"
 *    summary: "use for logout"
 *    description: ""
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    responses:
 *      "200":
 *        description: "operation successfull"
 */

router.get('/logout', authController.logout);

router.get(
  '/protected',
  authController.authenticate,
  authController.protectedRoute,
);

/**
 *@swagger
 *  /v1/Users/forgotPassword:
 *  post:
 *    tags:
 *    - [Forgot Password API]
 *    summary: "use for forgot password"
 *    description: ""
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "signup data"
 *      required: true
 *      schema:
 *        type: "object"
 *        properties:
 *              email:
 *                  type: "string"
 *    responses:
 *      "400":
 *        description: "Invalid input"
 *      "200":
 *        description: "Reset Link Sent"
 */

router.post('/forgotPassword', authController.forgotPassword);

/**
 *@swagger
 *  /v1/Users/resetPassword/{token}:
 *  patch:
 *    tags:
 *    - [Reset Password API]
 *    summary: "reset password"
 *    description: ""
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: path
 *      name: token
 *      schema:
 *        type: string
 *        required: true
 *        description: reset token
 *    - in: "body"
 *      name: "body"
 *      description: "reset data"
 *      required: true
 *      schema:
 *        type: "object"
 *        properties:
 *              password:
 *                  type: "string"
 *              passwordConfirm:
 *                  type: "string"
 *    responses:
 *      "400":
 *        description: "Invalid input"
 *      "200":
 *        description: "Password reset Successfully"
 */

router.patch('/resetPassword/:token', authController.resetPassword);

//? Forgot Password Via Number
/**
 *@swagger
 *  /v1/Users/forgetPassword:
 *  post:
 *    tags:
 *    - [Forgot Password Via Number API]
 *    summary: "use for forgot password"
 *    description: ""
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "signup data"
 *      required: true
 *      schema:
 *        type: "object"
 *        properties:
 *              phone:
 *                  type: "string"
 *    responses:
 *      "400":
 *        description: "Invalid input"
 *      "200":
 *        description: "Reset Link Sent"
 */

router.post('/forgetPassword', authController.forgotPasswordWithNumber);

//? ResetPassword
/**
 *@swagger
 *  /v1/Users/resetPasswordNumber/{token}:
 *  patch:
 *    tags:
 *    - [Reset Password Via Number API]
 *    summary: "reset password Via Number"
 *    description: ""
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: path
 *      name: token
 *      schema:
 *        type: string
 *        required: true
 *        description: Password reset Code
 *    - in: "body"
 *      name: "body"
 *      description: "reset data"
 *      required: true
 *      schema:
 *        type: "object"
 *        properties:
 *              password:
 *                  type: "string"
 *              passwordConfirm:
 *                  type: "string"
 *    responses:
 *      "400":
 *        description: "Invalid input"
 *      "200":
 *        description: "Password reset Successfully"
 */

router.patch(
  '/resetPasswordNumber/:token',
  authController.resetPasswordWithNumber,
);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
