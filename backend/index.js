import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRoute from "./Routes/Users.route.js";
import cors from "cors";

dotenv.config();

const app = express();
const Port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());

// Connecting to the database
const MongoDbURI = process.env.MongoDBURI;  // Get MongoDB URI from .env file

mongoose.connect(MongoDbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log("Not connected", error);
});

// routes
app.use("/User",usersRoute);

app.listen(Port, () => {
    console.log(`listening on port ${Port}`);
})