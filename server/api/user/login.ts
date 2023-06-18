import Auth from '../../utils/static/Auth';
import DB from '../../utils/static/DB';
import Func from '../../utils/static/Func';

async function initializeUser(username: string) {
	const user = await DB.getUser({
		username
	});
	if (user !== null) {
		DB.upsertUser({
			username
		}, {
			latestConnect: new Date().toString()
		})
		return;
	}
	const binding = await DB.getBinding({
		username
	});
	// default values
	let uid = Func.genStr(10);
	let playername = '';
	let displayname = username;
	let group: UserGroup = 'player';

	if (binding !== null) {
		playername = binding.playername;
	}

	DB.upsertUser(
		{
			uid
		},
		{
			username,
			displayname,
			playername,
			group,
			latestConnect: new Date().toString()
		}
	);
}

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
				await initializeUser(username);
				return ok(Func.encrypt(`${username}.${password}`).toString());
			} else return er(ERR.VERIFICATION);
		} catch (e: any) {
			return er(e.message);
		}
	}
});
