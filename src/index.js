"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const blogCategoryRoutes_1 = __importDefault(require("./routes/blogCategoryRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const userRoutes_1 = __importDefault(require("./routes//userRoutes"));
const contactInfoRoutes_1 = __importDefault(require("./routes/contactInfoRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Routes
app.use("/api/auth", userRoutes_1.default);
app.use("/api/blog-categories", blogCategoryRoutes_1.default);
app.use("/api/blogs", blogRoutes_1.default);
app.use("/api/contactInfo", contactInfoRoutes_1.default);
// Test Route
app.get("/", (_req, res) => {
    res.send("✅ API is up and running!");
});
// Start Server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
startServer();
