import express from "express";
import https from "https";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import blogCategoryRoutes from "./routes/blogCategoryRoutes";
import blogRoutes from "./routes/blogRoutes";
import userRoutes from "./routes/userRoutes";
import contactInfoRoutes from "./routes/contactInfoRoutes";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const privateKeyPath = path.join(__dirname, "../PossBackend/pv.key");
const certificatePath = path.join(__dirname, "../PossBackend/certificata.crt");
const privateKey = fs.readFileSync(privateKeyPath,"utf8");
const certificate = fs.readFileSync(certificatePath, "utf8");
const credentials = { key: privateKey, cert: certificate };

app.use("/api/auth", userRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contactInfo", contactInfoRoutes);

app.get("/", (_req, res) => {
  res.send("✅ API is up and running securely over HTTPS!");
});

const startServer = async () => {
  await connectDB();

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(PORT, () => {
    console.log(`🚀 Secure server running on https://localhost:${PORT}`);
  });
};

startServer();
