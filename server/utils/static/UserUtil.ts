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
	 * @param set 绑定设置内容
	 * @returns 执行成功？
	 * @throws 执行失败
	 */
	static async bind(username: string, playername: string, update: Partial<Binding>) {
		const resp: MojangResponse = await $fetch(`https://api.mojang.com/users/profiles/minecraft/${playername}`, {
			method: 'get'
		});
		if (resp.id) {
			DB.upsertBinding(
				{ username },
				{
					...{ uuid: resp.id, verified: false, playername },
					...update
				}
			);
			return true;
		} else {
			throw new Error(ERR.INTERNAL_REQUEST_FAILED);
		}
	}
}
