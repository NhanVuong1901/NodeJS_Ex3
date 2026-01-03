import { Router } from "express";
import { UserDatabase } from "./user.database.js";
import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";
import { requireAuth, requireRole, } from "../../middlewares/auth.middlesware.js";
const router = Router();
const db = new UserDatabase();
const service = new UserService(db);
const controller = new UserController(service);
router.get("/", requireAuth, requireRole("admin"), controller.list);
router.post("/", controller.register);
router.post("/bulk", controller.bulkRegister);
router.get("/by-email", controller.getByEmail);
router.get("/:id", requireAuth, controller.getById);
router.put("/:id", requireAuth, controller.updateById);
router.delete("/:id", requireAuth, controller.deleteById);
export const userRouters = router;
//# sourceMappingURL=user.routes.js.map