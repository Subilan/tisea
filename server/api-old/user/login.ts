import Auth from '../../utils/static/Auth';
import DB from '../../utils/static/DB';
import Func from '../../utils/static/Func';

async function initOasisUser(username: string) {
	// check if local user is already created
	const user = await DB.getUser({
		username
	});

	if (user !== null) {
		await Func.refreshLatestConnect(username);
		return user.username;
	}

	// generate random UID
	const uid = Func.genStr(10);

	// initialize oasis user
	await DB.upsertUser(
		{
			uid
		},
		{
			username,
			displayname: username,
			playername: '',
			group: 'player',
			latestConnect: new Date().toString(),
			type: 'oasis'
		}
	);
	return username;
}

async function initKeyUser(key: string) {
	const playername = Func.kgetPlayername(key);

	const user = await DB.getUser({
		playername
	})

	// player of the key is already bound to an existing oasis user
	if (user !== null) {
		await Func.refreshLatestConnect(user.username);
		return user.username;
	}

	// player of the key is not bound to an existing oasis user, create a new user from it.
	const uid = Func.genStr(20);

	await DB.upsertUser(
		{
			uid
		},
		{
			username: playername,
			displayname: playername,
			playername,
			group: 'player',
			latestConnect: new Date().toString(),
			type: 'key'
		}
	);
	return playername;
}

export default defineEventHandler(async e => {
	const body = await readBody(e);
	const type = body.loginType as UserType;
	if (!type) return er(ERR.NOT_ENOUGH_ARGUMENT);
	if (type === 'key') {
		const key = body.key;

		if (!key) return er(ERR.NOT_ENOUGH_ARGUMENT);
		try {
			if ((await Auth.verifyKey(key)) === true) {
				const username = await initKeyUser(key);
				return ok(username);
			} else {
				return er(ERR.VERIFICATION);
			}
		} catch (e: any) {
			return er(e.message);
		}
	} else {
		const username = body.username;
		const password = body.password;
		try {
			if (await Auth.checkOasis(username, password)) {
				await initOasisUser(username);
				return ok(Func.encrypt(`${username}.${password}`).toString());
			} else return er(ERR.VERIFICATION);
		} catch (e: any) {
			return er(e.message);
		}
	}
});
