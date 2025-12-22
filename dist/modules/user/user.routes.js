import { Router } from "express";
import { UserDatabase } from "./user.database.js";
import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";
const router = Router();
const db = new UserDatabase();
const service = new UserService(db);
const controller = new UserController(service);
router.get("/", controller.list);
router.post("/", controller.register);
router.post("/bulk", controller.bulkRegister);
router.get("/by-email", controller.getByEmail);
router.get("/:id", controller.getById);
router.put("/:id", controller.updateById);
router.delete("/:id", controller.deleteById);
export const userRouters = router;
//# sourceMappingURL=user.routes.js.map