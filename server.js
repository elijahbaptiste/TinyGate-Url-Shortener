if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");

const mongoose = require("mongoose");
const { ShortUrls, BlackList, Users } = require("./shortUrl");
const bcrypt = require("bcrypt");
const qr = require("qrcode");
const Path = require("path");

const app = express();

mongoose.connect("mongodb://localhost:27017/");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(Path.join(__dirname)));


app.get("/", async (req, res) => {
  res.render("MainUrlPage");
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.get("/linkinfo", async (req, res) => {
  res.render("linkinfo");
});

app.get("/MainUserView", async (req, res) => {
  res.render("MainUserView");
});

app.get("/signup", async (req, res) => {
  res.render("signup");
});

app.get("/MainUrlPage", async (req, res) => {
  res.render("MainUrlPage");
});

app.get("/BlockedPage", async (req, res) => {
  res.render("BlockedPage");
});

app.get("/HomePage", async (req, res) => {
  res.render("HomePage");
});

app.get("/:shortUrl", async (req, res) => {
  const short = await ShortUrls.findOne({ shortURL: req.params.shortUrl });
  if (!short) return res.render("urlNotFound");

  const blackList = await BlackList.findOne({ url: short.fullURL });
  if (blackList) return res.render("BlockedPage");
  try {
    short.clicks++;
    short.save();
    res.redirect(short.fullURL);
  } catch (error) {
    console.error("Error creating short URL:", error);
    if (error.code === 11000) {
      return res.render("pageexists");
    }
    res.status(500).send("Error");
  }
});

app.post("/shortUrls", async (req, res) => {
  try {
    if (!req.body.longURL) {
      return res.status(400).send("Full URL is required.");
    }

    const existingUrl = await ShortUrls.findOne({fullURL: req.body.longURL});
    const blackList = await BlackList.findOne({ url: req.body.longURL });

    if (blackList != null) return res.render("BlockedPage");
    if (existingUrl != null) return res.render("pageexists", { message: "URL already exists" });

    if (!req.body.CustomShortUrl) {
      const short = await ShortUrls.create({ fullURL: req.body.longURL });
      res.render("AfterShort", { message: short.shortURL });
    } else {
      const shortCheck = await ShortUrls.countDocuments({shortURL: req.body.CustomShortUrl});
      if (shortCheck > 0) {
        const short = await ShortUrls.create({fullURL: req.body.longURL});
         res.render("AfterShort", { message: short.shortURL });
      } else {
        const short = await ShortUrls.create({fullURL: req.body.longURL, shortURL: req.body.CustomShortUrl});
      }
    }
  } catch (error) {
    console.error("Error creating short URL:", error);
    if (error.code === 11000) {
      return res.render("pageexists");
    }
    res.status(500).send("Error");
  }
});

app.post("/login", async (req, res) => {
  if (!req.body.username) {
    return res.status(400).send("username is required.");
  }
  if (!req.body.password) {
    return res.status(400).send("password is required.");
  }
  const uname = req.body.username;
  const pword = req.body.password;

  const existingUser = await Users.findOne({ name: uname });
  console.log("Existing users with that name:", existingUser);
  console.log("uname:", existingUser.name);
  console.log("pword:", existingUser.password);
  // basic login check. Needs Tweeking
  if (existingUser == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, existingUser.password)) {
      const urls = await ShortUrls.find({ createdBy: existingUser.name });
      res.render("MainUserView" ,   { message: existingUser.name });
    } else {
      res.render("login");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send();
  }
});

app.post("/signup", async (req, res) => {
  if (!req.body.username) {
    return res.status(400).send("username is required.");
  }
  if (!req.body.password) {
    return res.status(400).send("password is required.");
  }
  if (!req.body.email) {
    return res.status(400).send("email is required.");
  }

  const existingUrl = await ShortUrls.countDocuments({
    shortURL: req.get("CustomShortUrl"),
  });
  const uname = req.body.username;
  const existingUser = await Users.countDocuments({ name: uname });
  console.log("Existing users with that name:", existingUser);
  if (existingUser > 0) {
    return res.status(400).send("That Username is already taken");
  } else {
    const pword = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email;

    const user = new Users({ name: uname, password: pword, email: email });
    await user.save();
    res.render("login");
  }
});

app.listen(process.env.PORT || 5000);
