import Auth from '../../utils/static/Auth';
import { ERR, er, ok } from '../../utils/common';

export default defineEventHandler(async e => {
	const q = getQuery(e);
	if (q.method === 'oasis') {
		if (q.oasisToken === null) {
			return er(ERR.NOT_ENOUGH_ARGUMENT);
		}
		try {
			if ((await Auth.verifyOasis(q.oasisToken as string)) === true) {
				return ok();
			}
		} catch (err: any) {
			return er(err.message);
		}
	} else if (q.method === 'key') {
		if (q.seatiKey === null) {
			return er(ERR.NOT_ENOUGH_ARGUMENT);
		}
		const r = await Auth.verifyKey(q.seatiKey as string);
		if (r === true) {
			return ok();
		} else {
			return er(ERR.VERIFICATION);
		}
	} else {
		return er();
	}
});
