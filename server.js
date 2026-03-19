import express from "express";
import mongoose from "mongoose";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/not-found.js";
import auth from "./routes/auth.js";
import foods from "./routes/foods.js";

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

// Routes
app.use("/api/foods", foods);
app.use("/api/auth", auth);

// Middleware
app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(
    "mongodb+srv://recipe-scale-admin:AFZ7R8hYtl3gtdul@cluster0.okla4gk.mongodb.net/Recipe-Scale?appName=Cluster0"
  )
  .then(() => {
    app.listen(8000, () => console.log(`Server running on port ${port}`));
    console.log("CONNECTED TO DB");
  })
  .catch(() => {
    console.log("CONNECTION FAILED");
  });
