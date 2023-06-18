import Auth from './auth';
import DB from './db';
import Func from './func';

interface UserLoginData {
	key: string;
	oasisToken: string;
}

interface MojangResponse {
	name: string;
	id: string;
}

export class UserUtil {
	/**
	 * **使用 `playername`** 设置用户与玩家的绑定
	 *
	 * @param username 用户名
	 * @param playername 所要绑定的目标玩家名
	 * @param verified 此绑定是否有效
	 * @param bindingToken 绑定凭证
	 * @returns 执行成功？
	 * @throws 执行失败
	 */
	static async setBinding(username: string, playername: string, verified: boolean, bindingToken: string | null) {
		
		const resp: MojangResponse = await $fetch(`https://api.mojang.com/users/profiles/minecraft/${playername}`, {
			method: 'get'
		});
		if (resp.id) {
			DB.upsertBinding(username, playername, resp.id, verified, bindingToken);
			return true;
		} else {
			throw new Error(ERR.INTERNAL_REQUEST_FAILED);
		}
	}
}

export class User {
	type: UserType;
	username: string = '';
	login: UserLoginData;

	constructor(type: UserType, login: UserLoginData) {
		this.type = type;
		this.login = login;
		if (this.type === 'oasis') {
			this.username = Func.OgetUsername(login.oasisToken);
		} else {
			this.username = Func.KgetUsername(login.key);
		}
	}

	async isValid() {
		if (this.type === 'key') {
			return await Auth.verifyKey(this.login.key ?? '');
		} else {
			return await Auth.verifyOasis(this.login.oasisToken ?? '');
		}
	}

    async setBinding(playername: string, verified: boolean, bindingToken: string) {
        if (this.type === 'key') throw new Error(ERR.EDGE_CONTEXT);
        return UserUtil.setBinding(this.username, playername, verified, bindingToken);
    }
}
