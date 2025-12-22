import { ObjectId } from "mongodb";
import { getDb } from "../../databse/mongo.js";
export class UserDatabase {
    col() {
        return getDb().collection("users");
    }
    async list() {
        return this.col().find({}).limit(50).toArray();
    }
    async findByEmail(email) {
        return this.col().findOne({ email });
    }
    async findById(id) {
        return this.col().findOne({
            _id: new ObjectId(id),
        });
    }
    async create(doc) {
        const res = await this.col().insertOne(doc);
        return { ...doc, _id: res.insertedId };
    }
    // insert many
    async createMany(docs) {
        if (!docs.length)
            return [];
        const res = await this.col().insertMany(docs);
        return docs.map((doc, index) => ({
            ...doc,
            _id: res.insertedIds[index], // không undefined vì index luôn hợp lệ
        }));
    }
    // updateById
    async updateById(id, update) {
        const _id = new ObjectId(id);
        await this.col().updateOne({ _id }, { $set: { ...update, updatedAt: new Date() } });
        return (await this.col().findOne({ _id }));
    }
    // deleteById
    async deleteById(id) {
        const res = await this.col().deleteOne({
            _id: new ObjectId(id),
        });
        return res.deletedCount === 1;
    }
}
//# sourceMappingURL=user.database.js.map