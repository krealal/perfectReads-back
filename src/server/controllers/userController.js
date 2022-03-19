require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../db/models/User");

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const findUser = await User.findOne({ username });

  if (!findUser) {
    const error = new Error("wrong username or password");
    error.code = 401;
    return next(error);
  }

  const rightPassword = await bcrypt.compare(password, findUser.password);

  if (!rightPassword) {
    const error = new Error("wrong username or password");
    error.code = 401;
    return next(error);
  }

  const UserData = {
    name: findUser.name,
    id: findUser.id,
  };
  const token = jwt.sign(UserData, process.env.JWT_SECRET);
  return res.json({ token });
};

module.exports = { userLogin };
