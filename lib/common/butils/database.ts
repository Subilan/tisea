import {MongoClient} from "mongodb";

const DB_NAME = "tisea";
const DB_COLLECTIONS = ["users"] as const;

type CollectionLiteral = typeof DB_COLLECTIONS[number];

export function getMongoClient() {
    return new MongoClient("mongodb://127.0.0.1:27017");
}

export function getMongoCollection(collection: CollectionLiteral) {
    return getMongoClient().db(DB_NAME).collection(collection);
}

export async function upsertOne<T extends object>(
    collection: CollectionLiteral,
    filter: Partial<T>,
    set: Partial<T>
) {
    const col = getMongoCollection(collection);
    return (await col.updateOne(filter, {
        $set: set
    }, {
        upsert: true
    })).acknowledged;
}

export async function getOne<T extends object>(
    collection: CollectionLiteral,
    filter: Partial<T>,
    projection: Record<keyof T, boolean> | null = null
) {
    const col = getMongoCollection(collection);
    if (projection === null) {
        return await col.findOne(filter) as unknown as T | null;
    } else {
        return await col.findOne(filter, {projection: projection}) as unknown as T | null;
    }
}

export async function removeOne<T extends object>(
    collection: CollectionLiteral,
    filter: Partial<T>
) {
    const col = getMongoCollection(collection);
    return (await col.deleteOne(filter)).deletedCount > 0;
}