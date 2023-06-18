import DB from './db';
import Func from './func';

export default class Auth {
	static async verifyToken(playername: string, token: string) {
		const _token = await DB.findToken(playername);
		return token === _token;
	}

	static async getToken(playername: string) {
		let token = Func.genStr(200);
		return token;
	}

	static async upsertToken(playername: string) {
		const token = await this.getToken(playername);
		DB.upsertToken(playername, token).catch(e => {
			console.error(e);
		});
		return token;
	}

	static loginOasis(username: string, password: string) {
		return $fetch<NodeBBResponse>('https://i.oases.red/api/v3/utilities/login', {
			method: 'post',
			body: {
				username,
				password
			}
		}).catch(e => {
			if (typeof e.response._data === 'string') {
				throw new Error(e.response._data);
			} else {
				let d: NodeBBResponse = e.response._data as any;
				throw new Error(d.status.message);
			}
		});
	}
}
