import Auth, { NodeBBResponse } from '../../utils/auth';

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
			await $fetch('https://i.oases.red/api/v3/utilities/login', {
				method: 'post',
				body: {
					username,
					password
				}
			});
			return {
				status: true,
                code: 200
			};
		} catch (e: any) {
			return {
				status: false,
				code: e?.statusCode ?? -1
			};
		}
	}
});
