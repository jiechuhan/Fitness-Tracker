const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/workout';
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const PORT = process.env.PORT || 3000;

const app = express();


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(CONNECTION_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});