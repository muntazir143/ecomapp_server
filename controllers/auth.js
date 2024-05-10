const { validationResult } = require("express-validator");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

exports.register = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));
    return res.status(400).json({ errors: errorMessages });
  }
  try {
    let user = new User({
      ...req.body,
      passwordHash: bcrypt.hashSync(),
    });
  } catch (error) {
    return res.status(500).json({ type: error.name, message: error.message });
  }
};

exports.login = async function (req, res) {};

exports.forgotPassword = async function (req, res) {};

exports.verifyPasswordResetOTP = async function (req, res) {};

exports.resetPassword = async function (req, res) {};
