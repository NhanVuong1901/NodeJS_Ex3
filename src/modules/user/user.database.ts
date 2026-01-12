import { ObjectId, type InsertManyResult } from "mongodb";
import { getDb } from "../../databse/mongo.js";
import type { UserDoc } from "./user.model.js";

export type UserEntity = UserDoc & { _id: ObjectId };

export class UserDatabase {
  private col() {
    return getDb().collection<UserDoc>("users");
  }

  async list(): Promise<Array<UserEntity>> {
    return this.col().find({}).limit(50).toArray() as Promise<UserEntity[]>;
  }

  async findPublicByEmail(email: string): Promise<UserEntity | null> {
    return this.col().findOne(
      { email },
      { projection: { passwordHash: 0 } }
    ) as Promise<UserEntity | null>;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.col().findOne({ email }) as Promise<UserEntity | null>;
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.col().findOne({
      _id: new ObjectId(id),
    }) as Promise<UserEntity | null>;
  }

  async create(doc: UserDoc): Promise<UserEntity> {
    const res = await this.col().insertOne(doc);
    return { ...doc, _id: res.insertedId };
  }

  // insert many
  async createMany(docs: UserDoc[]): Promise<UserEntity[]> {
    if (!docs.length) return [];
    const res: InsertManyResult<UserDoc> = await this.col().insertMany(docs);
    return docs.map((doc, index) => ({
      ...doc,
      _id: res.insertedIds[index]!, // không undefined vì index luôn hợp lệ
    }));
  }

  // updateById
  async updateById(
    id: string,
    update: Partial<UserDoc>
  ): Promise<UserEntity | null> {
    const _id = new ObjectId(id);

    await this.col().updateOne(
      { _id },
      { $set: { ...update, updatedAt: new Date() } }
    );

    return (await this.col().findOne({ _id })) as UserEntity | null;
  }

  // deleteById
  async deleteById(id: string): Promise<boolean> {
    const res = await this.col().deleteOne({
      _id: new ObjectId(id),
    });

    return res.deletedCount === 1;
  }
}
