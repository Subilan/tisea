export default defineEventHandler(async e => {
	const query = getQuery(e);
	const oasisToken = query.oasisToken as string;
	if (!oasisToken) return er(ERR.NOT_ENOUGH_ARGUMENT);
	let r: NodeBBResponse | null = null;
	try {
		r = await Auth.loginOasis(Func.OgetUsername(oasisToken), Func.OgetPassword(oasisToken));
        if (r.status.code === 'ok') {
            return ok(null, r.response)
        } else {
            return er(ERR.INTERNAL_REQUEST_FAILED);
        }
	} catch (err: any) {
		return er(err.message);
	}
});
