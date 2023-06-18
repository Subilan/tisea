interface CommonResponse {
	status: RespStatus;
	msg: string;
	data: any;
}

interface LoginResponse {
	code: number;
	status: boolean;
	msg?: string;
}

interface NodeBBResponse {
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

type RespStatus = 'er' | 'ok';