import { MongoClient } from 'mongodb';

export default class DB {
	/**
	 * 
	 * @param playername 
	 * @param token 
	 * @returns 
	 */
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

	static async upsertBinding(find: Partial<Binding>, set: Partial<Binding>) {
		const client = new MongoClient('mongodb://localhost:27017');
		try {
			const db = client.db('tisea');
			const c = db.collection('bindings');
			return await c.updateOne(
				find,
				{
					$set: set
				},
				{
					upsert: true
				}
			);
		} finally {
			await client.close();
		}
	}

	static async getBinding(find: Partial<Binding>, projection: Record<keyof Binding, boolean> | null = null) {
		const client = new MongoClient('mongodb://localhost:27017');
		try {
			const db = client.db('tisea');
			const c = db.collection('bindings');
			let r;
			if (projection) {
				r = await c.findOne(find, {
					projection
				});
			} else {
				r = await c.findOne(find);
			}
			return r as unknown as Binding | null;
		} finally {
			await client.close();
		}
	}

	static async upsertUser(find: Partial<User>, set: Partial<User>) {
		const client = new MongoClient('mongodb://localhost:27017');
		try {
			const db = client.db('tisea');
			const c = db.collection('users');
			return await c.updateOne(
				find,
				{
					$set: set
				},
				{
					upsert: true
				}
			);
		} finally {
			await client.close();
		}
	}

	static async getUser(find: Partial<User>, projection: Record<keyof User, boolean> | null = null) {
		const client = new MongoClient('mongodb://localhost:27017');
		try {
			const db = client.db('tisea');
			const c = db.collection('users');
			let r;
			if (projection) {
				r = await c.findOne(find, {
					projection
				});
			} else {
				r = await c.findOne(find);
			}
			return r as User | null;
		} finally {
			await client.close();
		}
	}
}
