const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/user-auth");

// this is for register

app.post("/api/register", async (req, res) => {
  console.log(req.body);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newPassword = await bcryptjs.hash(req.body.password, 10);

      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
        isLoggedIn: false,
      });
      res.json({ status: "ok" });
    } else {
      res.json({ status: "error", error: "duplicate email" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "duplicate email" });
  }
});

// this is for login

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    const isPasswordVaild = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (isPasswordVaild) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "sercet321"
      );

      user.isLoggedIn = true;
      await user.save();

      return res.json({
        status: "ok",
        user: { token, loginId: user._id, userEmail: user.email },
      });
    } else {
      return res.json({
        status: "error",
        user: false,
        userEmail: user.email,
        userPassword: user.password,
      });
    }
  } else {
    return res.json({
      status: "error",
      error: "Invalid login",
      user: false,
    });
  }
});

app.get("/api/logout", async (req, res) => {
  const user = await User.findOne({
    _id: req.query.id,
  });

  if (user) {
    user.isLoggedIn = false;
    await user.save();

    res.json({
      message: "logout successful",
      status: "ok"
    });
  } else {
    res.json({
      message: "logout failed",
    });
  }

  // console.log(req.query, "rr");
  // res.send("hrlllo");
});

app.listen(3001, () => {
  console.log("server running on 3001");
});
