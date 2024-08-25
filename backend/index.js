import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const MongoDbURI = "mongodb://localhost:27017/hospital";
import usersRoute from "./Routes/Users.route.js";
import cors from "cors";

const app = express();

dotenv.config();
const Port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());

// connecting to db
mongoose.connect(MongoDbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to database");
}).catch(()=>{
    console.log("Not connected");
});

// routes
app.use("/User",usersRoute);

app.listen(Port, () => {
    console.log(`listening on port ${Port}`);
})