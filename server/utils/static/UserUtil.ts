import Auth from './Auth';
import DB from './DB';
import Func from './Func';

interface MojangResponse {
	name: string;
	id: string;
}

export default class UserUtil {
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