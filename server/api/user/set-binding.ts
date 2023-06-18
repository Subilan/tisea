import Auth from '../../utils/static/Auth';
import Func from '../../utils/static/Func';

export default defineEventHandler(async e => {
	const body = await readBody(e);
	const type = body.userType;
	const playername = body.playername;
	const oasisToken = body.oasisToken;
	if (!type || !playername || !oasisToken) {
		return er(ERR.NOT_ENOUGH_ARGUMENT);
	}
	if (type !== 'oasis') {
		return er(ERR.INVALID_OPERATION);
	}
	if (await Auth.verifyOasis(oasisToken)) {
		try {
			const bindingToken = Func.genStr(20);
			await UserUtil.setBinding(Func.OgetUsername(oasisToken), playername, false, bindingToken);
			return ok(bindingToken);
		} catch (err: any) {
			return er(err.message);
		}
	} else {
		return er(ERR.EDGE_CONTEXT);
	}
});
