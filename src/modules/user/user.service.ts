import e from "express";
import { hashPassword } from "../../utils/crypto.js";
import { ApiError } from "../../utils/http.js";
import type { UserDatabase, UserEntity } from "./user.database.js";
import type { UserRole } from "./user.model.js";

export class UserService {
  constructor(private readonly userDb: UserDatabase) {}

  async list() {
    return this.userDb.list();
  }

  async register(input: {
    email: string;
    password: string;
    role?: UserRole;
  }): Promise<UserEntity> {
    const email = input.email.trim().toLowerCase();
    if (!email.includes("@"))
      throw new ApiError(400, { message: "Invalid email" });
    if (input.password.length < 6)
      throw new ApiError(400, {
        message: "Password must be more than 6 characters",
      });

    // btvn: bắt lỗi ký tự đặc biệt & chữ viết hoa
    if (!/[A-Z]/.test(input.password)) {
      throw new ApiError(400, {
        message: "Password must contain at least one uppercase letter",
      });
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(input.password)) {
      throw new ApiError(400, {
        message: "Password must contain at least one special character",
      });
    }

    // bắt lỗi trùng
    const existed = await this.userDb.findByEmail(email);
    if (existed) {
      throw new ApiError(409, { message: "Email already exists" });
    }

    const now = new Date();
    const passwordHash = await hashPassword(input.password);
    const role: UserRole = input.role || "customer";

    return this.userDb.create({
      email,
      passwordHash,
      role,
      createdAt: now,
      updatedAt: now,
    });
  }

  async bulkRegister(
    inputs: {
      email: string;
      password: string;
      role?: UserRole;
    }[]
  ): Promise<UserEntity[]> {
    if (!inputs.length) return [];

    const now = new Date();

    const docs = [];

    for (const input of inputs) {
      const email = input.email.trim().toLowerCase();

      if (!email.includes("@")) {
        throw new ApiError(400, { message: `Invalid email: ${email}` });
      }

      if (input.password.length < 6) {
        throw new ApiError(400, {
          message: `Password must be more than 6 characters for ${email}`,
        });
      }

      // bắt lỗi chữ viết hoa
      if (!/[A-Z]/.test(input.password)) {
        throw new ApiError(400, {
          message: `Password must contain uppercase letter for ${email}`,
        });
      }

      // bắt lỗi ký tự đặc biệt
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(input.password)) {
        throw new ApiError(400, {
          message: `Password must contain special character for ${email}`,
        });
      }

      // bắt lỗi trùng
      const existed = await this.userDb.findByEmail(email);
      if (existed) {
        throw new ApiError(409, {
          message: `Email already exists: ${email}`,
        });
      }

      const passwordHash = await hashPassword(input.password);

      docs.push({
        email,
        passwordHash,
        role: input.role || "customer",
        createdAt: now,
        updatedAt: now,
      });
    }

    return this.userDb.createMany(docs);
  }

  // get one by email
  async getByEmail(email: string) {
    const user = await this.userDb.findByEmail(email);
    if (!user) throw new ApiError(404, { message: "User not found" });
    return user;
  }

  // get one by id
  async getById(id?: string) {
    if (!id) throw new ApiError(400, { message: "Missing id" });
    const user = await this.userDb.findById(id);
    if (!user) throw new ApiError(404, { message: "User not found" });
    return user;
  }

  // update by id
  async updateById(id?: string, body?: any) {
    if (!id) throw new ApiError(400, { message: "Missing id" });

    const updated = await this.userDb.updateById(id, body);
    if (!updated) throw new ApiError(404, { message: "User not found" });

    return updated;
  }

  // delete by id
  async deleteById(id?: string) {
    if (!id) throw new ApiError(400, { message: "Missing id" });

    const ok = await this.userDb.deleteById(id);
    if (!ok) throw new ApiError(404, { message: "User not found" });
  }
}
