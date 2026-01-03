import { ObjectId } from "mongodb";
import { getDb } from "../../databse/mongo.js";
export class ProductDatabase {
    col() {
        return getDb().collection("products");
    }
    // Create new product
    async create(doc) {
        const entity = {
            ...doc,
            _id: new ObjectId(),
        };
        await this.col().insertOne(entity);
        return entity;
    }
    // Update by product id
    async updateById(id, update) {
        const _id = new ObjectId(id);
        await this.col().updateOne({ _id }, { $set: { ...update, updatedAt: new Date() } });
        return this.col().findOne({ _id });
    }
    // Find by product id
    async findById(id) {
        return this.col().findOne({ _id: new ObjectId(id) });
    }
    // Delete by product id
    async deleteById(id) {
        const res = await this.col().deleteOne({
            _id: new ObjectId(id),
        });
        return res.deletedCount === 1;
    }
    // List all products
    async list(query) {
        const { q, category, tags, status, minPrice, maxPrice, sort, page, limit } = query;
        const filter = {};
        if (q)
            filter.title = { $regex: q, $options: "i" };
        if (category)
            filter.category = category;
        if (tags?.length)
            filter.tags = { $in: tags };
        if (status)
            filter.status = status;
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {
                ...(minPrice !== undefined ? { $gte: minPrice } : {}),
                ...(maxPrice !== undefined ? { $lte: maxPrice } : {}),
            };
        }
        const sortMap = {
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
//# sourceMappingURL=product.database.js.map