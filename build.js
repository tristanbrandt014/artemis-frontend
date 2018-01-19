"use strict";

var _compression = require("compression");

var _compression2 = _interopRequireDefault(_compression);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = {
  API_HOST: process.env.API_HOST || "http://localhost:3005",
  SITE_KEY: process.env.SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
  PORT: process.env.PORT || 3000
};


var app = (0, _express2.default)();

app.use((0, _compression2.default)());

app.use("/static", _express2.default.static(_path2.default.join(__dirname, "build/static")));
var publicFiles = ["asset-manifest.json", "favicon.ico", "highlight.css", "manifest.json", "service-worker.js"];
publicFiles.forEach(function (file) {
  return app.use("/" + file, function (req, res) {
    return res.sendFile(_path2.default.join(__dirname, "build/" + file));
  });
});
app.get("*", function (req, res) {
  var template = _cheerio2.default.load(_fs2.default.readFileSync(_path2.default.join(__dirname, "build/index.html")));

  template("head").append("<script>window.__CONFIG__ = " + JSON.stringify(env) + "</script>\n");

  template("body").append("<script src=\"/bundle.js\"></script>");
  return res.send(template.html());
});

app.listen(env.PORT, function () {
  console.log("--> Server listening for connection on http://localhost:" + env.PORT);
});
