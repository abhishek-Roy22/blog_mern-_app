require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const blogRoutes = require("./Routes/blogsRoutes");
const userRoutes = require("./Routes/usersRoutes");

// create express app
const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/blogs", blogRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log(`listening on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
