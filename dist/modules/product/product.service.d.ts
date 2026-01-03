import type { ProductDatabase, ProductListQuery } from "./product.database.js";
import type { ProductDoc } from "./product.model.js";
export declare class ProductService {
    private readonly productDb;
    constructor(productDb: ProductDatabase);
    create(input: ProductDoc): Promise<import("./product.database.js").ProductEntity>;
    updateById(id: string, update: Partial<ProductDoc>): Promise<import("./product.database.js").ProductEntity>;
    findById(id: string): Promise<import("./product.database.js").ProductEntity>;
    deleteById(id: string): Promise<{
        deleted: boolean;
    }>;
    list(query: ProductListQuery): Promise<import("./product.database.js").ProductEntity[]>;
}
//# sourceMappingURL=product.service.d.ts.map