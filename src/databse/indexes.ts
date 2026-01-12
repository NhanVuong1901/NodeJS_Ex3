import { getDb } from "./mongo.js";

export async function ensureIndexes(): Promise<void> {
  const db = getDb();

  await db.collection("users").createIndex({ email: 1 }, { unique: true });

  const productCollection = db.collection("products");
  const productIndexes = await productCollection.indexes();

  const hasTextIndex = productIndexes.some(
    (index) => index.key && Object.values(index.key).includes("text")
  );

  if (!hasTextIndex) {
    await productCollection.createIndex(
      { title: "text", description: "text" },
      { name: "products_text_search" }
    );
  }

  await db
    .collection("refresh_tokens")
    .createIndex(
      { userId: 1, revokeAt: 1, expiresAt: 1 },
      { name: "rt_user_active" }
    );

  await db
    .collection("chat_messages")
    .createIndex({ createdAt: -1 }, { name: "chat_timeline" });
}
