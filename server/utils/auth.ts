import DB from './db';
import Func from './func';

export default class Auth {
	/**
	 * 验证登陆凭证有效性
	 *
	 * @param key 凭证
	 * @returns 有效？
	 */
	static async verifyKey(key: string) {
		const playername = Func.KgetUsername(key);
		const token = Func.KgetToken(key);
		const _token = await DB.getToken(playername);
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

	/**
	 * 验证用户名和密码能否在 Oasis 正常登录
	 *
	 * @param username 用户名
	 * @param password 密码
	 * @returns 成功？
	 */
	static async loginOasis(username: string, password: string) {
		try {
			const r = await $fetch<NodeBBResponse>('https://i.oases.red/api/v3/utilities/login', {
				method: 'post',
				body: {
					username,
					password
				}
			});
			return r.status.code === 'ok';
		} catch (err: any) {
			if (typeof err.response._data === 'string') {
				throw new Error(err.response._data);
			} else {
				let d: NodeBBResponse = err.response._data as any;
				throw new Error(d.status.message);
			}
		}
	}

	/**
	 * 通过 NodeBB API 验证 Oasis 登录凭证有效性
	 *
	 * @param datastr Oasis 登录凭证，登录时由后端返回至前端
	 * @returns 有效？
	 */
	static async verifyOasis(datastr: string) {
		let username,
			password,
			lg = null;
		try {
			let de = Func.decrypt(datastr).split('.');
			username = de[0];
			password = de[1];
		} catch (err) {
			throw new Error(ERR.CIPHER_DECRYPTION);
		}
		try {
			if (await this.loginOasis(username, password)) return true;
			else throw new Error(ERR.INTERNAL_REQUEST_FAILED);
		} catch (err: any) {
			throw new Error(err.message);
		}
	}
}
