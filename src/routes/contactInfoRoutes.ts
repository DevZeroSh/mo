// src/routes/contactInfo.routes.ts

import { Router } from "express";
import {
  getContactInfo,
  upsertContactInfo,
} from "../controllers/contactInfoController";

const router = Router();

router.get("/", getContactInfo);
router.put("/", upsertContactInfo);

export default router;
