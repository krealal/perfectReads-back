require("dotenv").config();
const debug = require("debug")("perfectReadsBACK: userController");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const User = require("../../db/models/User");

const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_API_KEY,
  authDomain: "perfectreads-803fb.firebaseapp.com",
  projectId: "perfectreads-803fb",
  storageBucket: "perfectreads-803fb.appspot.com",
  messagingSenderId: "185184894300",
  appId: "1:185184894300:web:f40f16099f7c42d1fbd599",
};

const fireBaseApp = initializeApp(firebaseConfig);
const storage = getStorage(fireBaseApp);

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

const userRegister = async (req, res, next) => {
  const { username, password, name, email, about } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, +process.env.SALT);
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      const error = new Error(`Username ${username} already exists!`);
      error.code = 400;
      next(error);
      return;
    }
    const oldFileName = path.join("public", req.file.filename);
    const newFileName = path.join("public", req.file.originalname);
    fs.rename(oldFileName, newFileName, (error) => {
      if (error) {
        next(error);
      }
    });
    fs.readFile(newFileName, async (error, file) => {
      if (error) {
        next(error);
      } else {
        const storageRef = ref(
          storage,
          `${Date.now()}_${req.file.originalname}`
        );
        await uploadBytes(storageRef, file);
        const firebaseFileURL = await getDownloadURL(storageRef);
        const newUser = await User.create({
          username,
          password: encryptedPassword,
          name,
          image: firebaseFileURL,
          about,
          email,
        });
        debug(`User created with username: ${newUser.username}`);
        res.status(201);
        res.json({
          message: `User registered with username: ${newUser.username}`,
        });
      }
    });
  } catch (error) {
    fs.unlink(path.join("public", req.file.filename), () => {
      error.code = 400;
      next(error);
    });
  }
};

module.exports = { userLogin, userRegister };
