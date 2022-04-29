import express from "express";
import conn from "./db/conn.js";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";

import contactRoutes from "./routes/contacts.js";
import projectRoutes from "./routes/projects.js";

const app = express();
dotenv.config();
conn;
// import routes
// const productRoutes = require("./routes/users.js");

// Middleware

// app.use(express.json());
app.use("users/", userRoutes);
=======
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use("/user", userRoutes);
app.use("/contact", contactRoutes);
app.use("/project", projectRoutes);


const PORT = process.env.PORT || 5000;
// App Listen
app.listen(PORT, () => {
  console.log(`server app running in port ${PORT}`);
});
