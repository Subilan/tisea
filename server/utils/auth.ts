import DB from './db';
import Func from './func';

export default class Auth {
	static async verifyToken(playername: string, token: string) {
		const _token = await DB.findToken(playername);
		return token === _token;
	}

	static async getToken(playername: string) {
		let token = Func.genStr(200);
		return token;
	}

	static async upsertToken(playername: string) {
		const token = await this.getToken(playername);
		DB.upsertToken(playername, token).catch(e => {
			console.error(e);
		});
		return token;
	}
}

export interface NodeBBResponse {
	response: {
		uid: number;
		username: string;
		userslug: string;
		picture: string;
		status: string;
		postcount: number;
		reputation: number;
		'email:confirmed': number;
		lastonline: number;
		flags: null;
		banned: boolean;
		'banned:expire': number;
		joindate: number;
		fullname: string;
		displayname: string;
		'icon:text': string;
		'icon:bgColor': string;
		joindateISO: Date;
		lastonlineISO: Date;
		banned_until: number;
		banned_until_readable: string;
	};
	status: {
		code: string;
		message: string;
	};
}
