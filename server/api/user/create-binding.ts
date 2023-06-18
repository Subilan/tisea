import Func from '../../utils/static/Func';

export default defineEventHandler(async e => {
	const body = await readBody(e);
	const type = body.userType;
	const playername = body.playername;
	const username = body.username;
	if (!type || !playername || !username) {
		return er(ERR.NOT_ENOUGH_ARGUMENT);
	}
	if (type !== 'oasis') {
		return er(ERR.INVALID_OPERATION);
	}

	try {
		const bindingToken = Func.genStr(20);
		await UserUtil.bind(username, playername, {
			bindingToken,
			verified: false
		});
		return ok(bindingToken);
	} catch (err: any) {
		return er(err.message);
	}
});
