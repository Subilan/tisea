import Auth from '../../utils/auth';
import { ERR, er, ok } from '../../utils/common';
import Func from '../../utils/func';

export default defineEventHandler(async e => {
	const q = getQuery(e);
	if (q.method === 'oasis') {
		if (q.data === null) {
			return er(ERR.NOT_ENOUGH_ARGUMENT);
		}
		let username,
			password,
			lg = null;
		try {
			let de = Func.decrypt(q.data as string).split('.');
			username = de[0];
			password = de[1];
		} catch (err) {
			return er(ERR.CIPHER_DECRYPTION);
		}
		try {
			lg = await Auth.loginOasis(username, password);
			if (lg.status.code === 'ok') return ok();
			else return er(ERR.INTERNAL_REQUEST_FAILED);
		} catch (err: any) {
			return er(err.message);
		}
	} else if (q.method === 'key') {
		if (q.key === null) {
			return er(ERR.NOT_ENOUGH_ARGUMENT);
		}

		let playername,
			token = null;
		let k = (q.key as string).split('~');
		playername = k[0];
		token = k[1];
		const r = await Auth.verifyToken(playername, token);
		if (r === true) {
			return ok();
		} else {
			return er();
		}
	} else {
		return er(ERR.INVALID_REQUEST);
	}
});
