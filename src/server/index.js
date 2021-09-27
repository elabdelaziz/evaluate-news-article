const dotenv = require("dotenv");
dotenv.config();

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const bodyParser = require("body-parser");
const cors = require("cors");
// const fetch = require("node-fetch");
const axios = require("axios");

const API_URL = process.env.API_ID;
const API_KEY = process.env.API_KEY;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("dist"));

// console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html"); // check again
  // res.sendFile(path.resolve("src/client/views/index.html"));
});
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/add", async (req, res) => {
  const blogAddress = req.body.url;
  sendUrlData = `${API_URL}?key=${API_KEY}&url=${blogAddress}&lang=en`;

  // const apiResponse = await axios(sendUrlData);
  // const articleData = await apiResponse.json();
  // console.log(res);
  // res.send(apiResponse);
  // console.log("sent");

  try {
    const {
      data: {
        sentence_list,
        score_tag,
        agreement,
        subjectivity,
        confidence,
        irony,
      },
    } = await axios(sendUrlData);
    res.send({
      text: sentence_list[0].text || "",
      score_tag: score_tag,
      agreement: agreement,
      subjectivity: subjectivity,
      confidence: confidence,
      irony: irony,
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = {
  app,
};
