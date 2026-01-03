import { ObjectId } from "mongodb";
import { getDb } from "../../databse/mongo.js";
import type { ProductDoc } from "./product.model.js";

export type ProductListQuery = {
  q?: string;
  category?: string;
  tags?: string[];
  status?: "active" | "inactive";
  minPrice?: number;
  maxPrice?: number;
  sort?: "az" | "price_asc" | "price_desc";
  page: number;
  limit: number;
};

export type ProductEntity = ProductDoc & { _id: ObjectId };

export class ProductDatabase {
  private col() {
    return getDb().collection<ProductEntity>("products");
  }

  // Create new product
  async create(doc: ProductDoc): Promise<ProductEntity> {
    const entity: ProductEntity = {
      ...doc,
      _id: new ObjectId(),
    };

    await this.col().insertOne(entity);
    return entity;
  }

  // Update by product id
  async updateById(
    id: string,
    update: Partial<ProductDoc>
  ): Promise<ProductEntity | null> {
    const _id = new ObjectId(id);

    await this.col().updateOne(
      { _id },
      { $set: { ...update, updatedAt: new Date() } }
    );

    return this.col().findOne({ _id });
  }

  // Find by product id
  async findById(id: string): Promise<ProductEntity | null> {
    return this.col().findOne({ _id: new ObjectId(id) });
  }

  // Delete by product id
  async deleteById(id: string): Promise<boolean> {
    const res = await this.col().deleteOne({
      _id: new ObjectId(id),
    });
    return res.deletedCount === 1;
  }

  // List all products
  async list(query: ProductListQuery): Promise<ProductEntity[]> {
    const { q, category, tags, status, minPrice, maxPrice, sort, page, limit } =
      query;

    const filter: Record<string, any> = {};

    if (q) filter.title = { $regex: q, $options: "i" };
    if (category) filter.category = category;
    if (tags?.length) filter.tags = { $in: tags };
    if (status) filter.status = status;

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {
        ...(minPrice !== undefined ? { $gte: minPrice } : {}),
        ...(maxPrice !== undefined ? { $lte: maxPrice } : {}),
      };
    }

    const sortMap: Record<string, any> = {
      az: { title: 1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
    };

    return this.col()
      .find(filter)
      .sort(sortMap[sort ?? "az"])
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
  }
}
