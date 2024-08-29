import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRoute from "./Routes/Users.route.js";
import postsRoute from "./Routes/Post.route.js";
import commentRoute from "./Routes/Comment.route.js";

import cors from "cors";

dotenv.config();

const app = express();
const Port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());

// Validate MongoDB URI environment variable
if (!process.env.MongoDBURI) {
  console.error("Error: MongoDBURI environment variable is not set");
  process.exit(1);
}

// Connecting to the database
mongoose.connect(process.env.MongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  });

// routes
app.use("/User", usersRoute);
app.use("/posts", postsRoute);
app.use("/comments", commentRoute);

app.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});