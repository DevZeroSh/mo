// src/controllers/blogController.ts

import { Request, Response } from "express";
import * as BlogService from "../services/blog.service";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = await BlogService.createBlog(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
};

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await BlogService.getAllBlogs(page, limit);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const getBlogsByCategory = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await BlogService.getBlogsByCategory(slug, page, limit);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getBlogsByCategory controller:", error);
    res.status(500).json({ error: "Failed to fetch blogs by category" });
  }
};

export const getBlogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blog = await BlogService.getBlogById(req.params.id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

export const getBlogBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blog = await BlogService.getBlogBySlug(req.params.slug);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog by slug" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const updatedBlog = await BlogService.updateBlog(req.params.id, req.body);
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    await BlogService.deleteBlog(req.params.id);
    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};
