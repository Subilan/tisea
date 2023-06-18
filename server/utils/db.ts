import { MongoClient } from 'mongodb';

export default class DB {
	static async upsertToken(playername: string, token: string) {
		const client = new MongoClient('mongodb://localhost:27017');
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

	static async getToken(playername: string) {
		const client = new MongoClient('mongodb://localhost:27017');
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

	static async upsertBinding(username: string, playername: string, uuid: string, verified: boolean = false, bindingToken: string | null = null) {
		const client = new MongoClient('mongodb://localhost:27017');
		try {
			const db = client.db('tisea');
			const c = db.collection('bindings');
			return await c.updateOne(
				{
					username
				},
				{
					$set: {
						uuid,
						verified,
						playername,
						bindingToken
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

	static async getBinding(find: object): Promise<Binding | null> {
		const client = new MongoClient('mongodb://localhost:27017');
		try {
			const db = client.db('tisea');
			const c = db.collection('bindings');
			const r = await c.findOne(find);
			return r as unknown as Binding | null;
		} finally {
			await client.close();
		}
	}
}


