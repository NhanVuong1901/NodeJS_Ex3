import { ApiError } from "../../utils/http.js";
export class ProductService {
    productDb;
    constructor(productDb) {
        this.productDb = productDb;
    }
    async create(input) {
        const now = new Date();
        return this.productDb.create({
            ...input,
            createdAt: now,
            updatedAt: now,
        });
    }
    async updateById(id, update) {
        const product = await this.productDb.updateById(id, update);
        if (!product)
            throw new ApiError(404, { message: "Product not found" });
        return product;
    }
    async findById(id) {
        const product = await this.productDb.findById(id);
        if (!product)
            throw new ApiError(404, { message: "Product not found" });
        return product;
    }
    async deleteById(id) {
        const ok = await this.productDb.deleteById(id);
        if (!ok)
            throw new ApiError(404, { message: "Product not found" });
        return { deleted: true };
    }
    async list(query) {
        const parsedQuery = {
            q: typeof query.q === "string" ? query.q : undefined,
            category: typeof query.category === "string" ? query.category : undefined,
            tags: typeof query.tags === "string"
                ? [query.tags]
                : Array.isArray(query.tags)
                    ? query.tags
                    : undefined,
            status: query.status === "active" || query.status === "inactive"
                ? query.status
                : undefined,
            sort: query.sort === "az" ||
                query.sort === "price_asc" ||
                query.sort === "price_desc"
                ? query.sort
                : "az",
            minPrice: query.minPrice !== undefined ? Number(query.minPrice) : undefined,
            maxPrice: query.maxPrice !== undefined ? Number(query.maxPrice) : undefined,
            page: Number(query.page ?? 1),
            limit: Number(query.limit ?? 10),
        };
        return this.productDb.list(parsedQuery);
    }
}
//# sourceMappingURL=product.service.js.map