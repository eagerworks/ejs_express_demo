const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("./prisma/generated/client");

const app = express();
const prisma = new PrismaClient();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

//setting view engine to ejs
app.set("view engine", "ejs");

//route for index page
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.render("index", {
      users: users,
      title: "EJS example",
      header: "Some users",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("All fields are required.");
  }

  try {
    // Create a new user in the database using Prisma
    await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    // Rerender users
    res.redirect("/users?sucess=true");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 ");
});
