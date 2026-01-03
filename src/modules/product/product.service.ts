import { ApiError } from "../../utils/http.js";
import type { ProductDatabase, ProductListQuery } from "./product.database.js";
import type { ProductDoc } from "./product.model.js";

export class ProductService {
  constructor(private readonly productDb: ProductDatabase) {}

  async create(input: ProductDoc) {
    const now = new Date();
    return this.productDb.create({
      ...input,
      createdAt: now,
      updatedAt: now,
    });
  }

  async updateById(id: string, update: Partial<ProductDoc>) {
    const product = await this.productDb.updateById(id, update);
    if (!product) throw new ApiError(404, { message: "Product not found" });
    return product;
  }

  async findById(id: string) {
    const product = await this.productDb.findById(id);
    if (!product) throw new ApiError(404, { message: "Product not found" });
    return product;
  }

  async deleteById(id: string) {
    const ok = await this.productDb.deleteById(id);
    if (!ok) throw new ApiError(404, { message: "Product not found" });
    return { deleted: true };
  }

  async list(query: ProductListQuery) {
    return this.productDb.list(query);
  }
}
