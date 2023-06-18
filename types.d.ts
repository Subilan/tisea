interface CommonResponse {
	status: RespStatus;
	msg: string;
	data: any;
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
type UserType = 'oasis' | 'key';
type UserGroup = 'admin' | 'player';
type dict<T> = { [prop: string]: T };

interface Binding {
	playername: string;
	username: string;
	uuid: string;
	verified: boolean;
	bindingToken: string | null;
}

interface BindingData extends Binding {
	_id: string;
}

interface User {
	uid: string;
	username: string;
	displayname: string;
	playername: string;
	group: UserGroup;
	latestConnect: string;
}
