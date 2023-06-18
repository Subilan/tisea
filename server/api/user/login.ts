import Auth from '../../utils/static/Auth';
import DB from '../../utils/static/DB';
import Func from '../../utils/static/Func';

export default defineEventHandler(async e => {
	const body = await readBody(e);
	const type = body.loginType as 'oasis' | 'key';
	if (type === 'key') {
		const key = body.key;
		if (!key) return er(ERR.NOT_ENOUGH_ARGUMENT);
		try {
			if ((await Auth.verifyKey(key)) === true) return ok();
			else return er(ERR.VERIFICATION);
		} catch (e: any) {
			return er(e.message);
		}
	} else {
		const username = body.username;
		const password = body.password;
		try {
			if (await Auth.loginOasis(username, password)) {
				const user = await DB.getUser({
					username
				});
				let uid = Func.genStr(10);

				if (user !== null) {
					uid = user.uid as string;
				}

				DB.upsertUser(uid, {
					username,
					displayname: username,
					playername: '',
					group: 'player',
					latestConnect: new Date().toString()
				});
				return ok(Func.encrypt(`${username}.${password}`).toString());
			} else return er(ERR.VERIFICATION);
		} catch (e: any) {
			return er(e.message);
		}
	}
});
