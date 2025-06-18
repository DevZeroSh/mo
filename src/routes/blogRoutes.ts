import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogBySlug,
  getBlogsByCategory,
} from "../controllers/blogController";

const router = Router();

router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/category/:slug", getBlogsByCategory);
router.get("/:id", getBlogById);
router.get("/slug/:slug", getBlogBySlug);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
