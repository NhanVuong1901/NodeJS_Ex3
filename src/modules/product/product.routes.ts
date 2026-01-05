import { Router } from "express";
import { ProductDatabase } from "./product.database.js";
import { ProductService } from "./product.service.js";
import { ProductController } from "./product.controller.js";
import {
  requireAuth,
  requireRole,
} from "../../middlewares/auth.middlesware.js";

const router = Router();

const db = new ProductDatabase();
const service = new ProductService(db);
const controller = new ProductController(service);

// anyone
router.get("/", controller.list);
router.get("/:id", controller.findById);

// admin only
router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  controller.create
);

router.put(
  "/:id",
  requireAuth,
  requireRole("admin"),
  controller.updateById
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("admin"),
  controller.updateById
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  controller.deleteById
);

export const productRouters = router;
