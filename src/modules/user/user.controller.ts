import type { Request, Response } from "express";
import type { UserService } from "./user.service.js";
import { ok } from "../../utils/http.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  list = async (_req: Request, res: Response) => {
    const users = await this.userService.list();
    res.json({ data: users });
  };

  // POST Register
  register = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    const user = await this.userService.register({ email, password, role });

    res.status(201).json(
      ok({
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    );
  };

  // bulkRegister
  bulkRegister = async (req: Request, res: Response) => {
    const users = req.body;

    if (!Array.isArray(users)) {
      return res.status(400).json({
        message: "Body must be an array of users",
      });
    }

    const created = await this.userService.bulkRegister(users);

    res.status(201).json(
      ok({
        count: created.length,
        data: created.map((u) => ({
          id: u._id.toString(),
          email: u.email,
          role: u.role,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
        })),
      })
    );
  };

  // getByEmail
  getByEmail = async (req: Request, res: Response) => {
    const { email } = req.query;
    const user = await this.userService.getByEmail(String(email));
    res.json(ok({ data: user.email }));
  };

  // getByObjectId
  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getById(id);
    res.json(ok(user));
  };

  // updateById
  updateById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const updated = await this.userService.updateById(id, req.body);

    res.json(
      ok({
        message: "Update user successfully",
        data: {
          id: updated._id.toString(),
          email: updated.email,
          role: updated.role,
          updatedAt: updated.updatedAt,
        },
      })
    );
  };

  // deleteById
  deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.userService.deleteById(id);

    res.json(
      ok({
        message: "Delete user successfully",
      })
    );
  };
}
