import Auth from '../../utils/auth';
import Func from '../../utils/func';

export default defineEventHandler(async e => {
	const body = await readBody(e);
	const type = body.loginType as 'oasis' | 'key';
	if (type === 'key') {
		let k = body.key.split('~');
		const token = k[1];
		const playername = k[0];
		return {
			status: await Auth.verifyToken(playername, token),
			code: 200
		};
	} else {
		const username = body.username;
		const password = body.password;
		try {
			const r = await Auth.loginOasis(username, password)
			return {
				status: true,
				code: 200,
                msg: Func.encrypt(`${username}.${password}`).toString()
			};
		} catch (e: any) {
			return {
				status: false,
				code: 403,
                msg: e.message
			};
		}
	}
});
