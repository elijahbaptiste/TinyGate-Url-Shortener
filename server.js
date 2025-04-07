const express = require("express");
const mongoose = require("mongoose");
const ShortUrls = require("./models/shortUrl");
const shortID = require('shortid')
const app = express();
const Path = require("path");

mongoose.connect("mongodb://localhost:27017/");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(Path.join(__dirname)));

app.get("/", async (req, res) => {
  res.render("MainUrlPage");
});

app.get("/MainUrlPage", async (req, res) => {
  res.render("MainUrlPage");
});

app.get("/HomePage", async (req, res) => {
  res.render("HomePage");
});

app.post("/shortUrls", async (req, res) => {
  try {
    if (!req.body.longURL) {
      return res.status(400).send("Full URL is required.");
    }
    const short = await ShortUrls.create({ fullURL: req.body.longURL});
    console.log(short.shortURL);
    res.render("AfterShort", { message: short.shortURL });
  } catch (error) {
    console.error("Error creating short URL:", error);
    if (error.code === 11000) {
      return  res.render("pageexists");
    }
    res.status(500).send("Error");
  }
});

app.get("/:shortUrl", async (req, res) => {
  const short = await ShortUrls.findOne({ shortURL: req.params.shortUrl});
  // console.log("Searching for:", req.params.shortUrl);
  // console.log("Found:", short);
  if (!short) return res.render("urlNotFound");;
  short.clicks++;
  short.save();
  res.redirect(short.fullURL);
});

app.listen(process.env.PORT || 5000);
