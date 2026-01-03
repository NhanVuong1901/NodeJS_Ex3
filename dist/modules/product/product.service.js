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
        return this.productDb.list(query);
    }
}
//# sourceMappingURL=product.service.js.map