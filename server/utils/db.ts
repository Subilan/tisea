import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

export default class DB {
	static async upsertToken(playername: string, token: string) {
		try {
			const db = client.db('tisea');
			const c = db.collection('tokens');
			return await c.updateOne(
				{
					playername
				},
				{
					$set: {
						token
					}
				},
				{
					upsert: true
				}
			);
		} finally {
			await client.close();
		}
	}

	static async findToken(playername: string) {
		try {
			const db = client.db('tisea');
			const c = db.collection('tokens');
			const r = await c.findOne(
				{
					playername
				},
				{
					projection: {
						token: true
					}
				}
			);
			return r?.token;
		} finally {
			await client.close();
		}
	}
}
