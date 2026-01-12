import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { userRouters } from "./modules/user/user.routes.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { chatRoutes } from "./modules/chat/chat.routes.js";
import { productRouters } from "./modules/product/product.routes.js";
export function createApp() {
    const app = express();
    app.use(cors({
        origin: "http://localhost:1912",
        credentials: true,
    }));
    app.use(express.json({ limit: "1mb" }));
    app.use(cookieParser());
    app.get("/health", (_req, res) => {
        res.json({ ok: true });
    });
    app.use("/api/users", userRouters);
    app.use("/api/auth", authRoutes);
    app.use("/api/products", productRouters);
    app.use("/api/chat", chatRoutes);
    app.use(errorMiddleware);
    return app;
}
//# sourceMappingURL=app.js.map