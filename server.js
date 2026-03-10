import express from "express";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/not-found.js";
import recipes from "./routes/recipes.js";

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

// Routes
app.use("/api/recipes", recipes);

// Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(8000, () => console.log(`Server running on port ${port}`));
