const express = require("express"),
  app = express();

//setting view engine to ejs
app.set("view engine", "ejs");

const users = [
  { name: "tobi", email: "tobi@learnboost.com" },
  { name: "loki", email: "loki@learnboost.com" },
  { name: "jane", email: "jane@learnboost.com" },
];

//route for index page
app.get("/", function (req, res) {
  res.render("index", {
    users: users,
    title: "EJS example",
    header: "Some users",
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000 ");
});
