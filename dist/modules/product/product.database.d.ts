import { ObjectId } from "mongodb";
import type { ProductDoc } from "./product.model.js";
export type ProductListQuery = {
    q?: string;
    category?: string;
    tags?: string[];
    status?: "active" | "inactive";
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    sort?: "az" | "price_asc" | "price_desc";
    page: number;
    limit: number;
};
export type ProductEntity = ProductDoc & {
    _id: ObjectId;
};
export declare class ProductDatabase {
    private col;
    create(doc: ProductDoc): Promise<ProductEntity>;
    updateById(id: string, update: Partial<ProductDoc>): Promise<ProductEntity | null>;
    findById(id: string): Promise<ProductEntity | null>;
    deleteById(id: string): Promise<boolean>;
    list(query: ProductListQuery): Promise<ProductEntity[]>;
}
//# sourceMappingURL=product.database.d.ts.map