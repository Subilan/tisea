import Func from "../../utils/func";

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
	const user = new User('oasis', {
        key: "",
        oasisToken
    });
	if (await user.isValid()) {
		try {
            const bindingToken = Func.genStr(20);
			await user.setBinding(playername, false, bindingToken);
			return ok(bindingToken);
		} catch (err: any) {
			return er(err.message);
		}
	} else {
		return er(ERR.EDGE_CONTEXT);
	}
});
