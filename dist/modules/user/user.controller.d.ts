import type { Request, Response } from "express";
import type { UserService } from "./user.service.js";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    list: (_req: Request, res: Response) => Promise<void>;
    register: (req: Request, res: Response) => Promise<void>;
    bulkRegister: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getByEmail: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    updateById: (req: Request, res: Response) => Promise<void>;
    deleteById: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map