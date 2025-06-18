import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import blogCategoryRoutes from "./routes/blogCategoryRoutes";
import blogRoutes from "./routes/blogRoutes";
import userRoutes from "./routes//userRoutes";
import contactInfoRoutes from "./routes/contactInfoRoutes";

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contactInfo", contactInfoRoutes);

// Test Route
app.get("/", (_req, res) => {
  res.send("✅ API is up and running!");
});

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
