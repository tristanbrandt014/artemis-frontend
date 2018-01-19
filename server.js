// @flow
import compression from "compression"
import express from "express"
import cheerio from "cheerio"
import path from "path"
import fs from "fs"

const env = {
  API_HOST: process.env.API_HOST  || "http://localhost:3005",
  SITE_KEY: process.env.SITE_KEY  || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
  PORT: process.env.PORT || 3000
 }

const app = express()

app.use(compression())

app.use("/static", express.static(path.join(__dirname, "build/static")))
const publicFiles = [
  "asset-manifest.json",
  "favicon.ico",
  "highlight.css",
  "manifest.json",
  "service-worker.js"
]
publicFiles.forEach(file => app.use(`/${file}`, (req, res) => res.sendFile(path.join(__dirname, `build/${file}`))))
app.get("*", (req, res) => {
  const template = cheerio.load(
    fs.readFileSync(path.join(__dirname, "build/index.html"))
  )

  template("head").append(
    `<script>window.__CONFIG__ = ${JSON.stringify(env)}</script>\n`
  )

  template("body").append(`<script src="/bundle.js"></script>`)
  return res.send(template.html())
})

app.listen(env.PORT, () => {
  console.log(`--> Server listening for connection on http://localhost:${env.PORT}`)
})
