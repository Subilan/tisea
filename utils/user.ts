export default class User {
	isUser: boolean = false;
	username?: string = '';
	type: 'oasis' | 'key' | 'unknown' = 'unknown';

	constructor() {
		if (process.server) return;
		this.type = (localStorage.getItem('tisea-login-method') as 'oasis' | 'key' | null) ?? 'unknown';
		if (this.type !== 'unknown') {
			this.isUser = true;
		}
		if (this.type === 'key') {
			this.username = localStorage.getItem('tisea-login-key')?.split('~')[0];
		} else {
			this.username = localStorage.getItem('tisea-login-username') ?? undefined;
		}
	}

	logout() {
		if (process.server) return;
		localStorage.removeItem('tisea-login-method');
		localStorage.removeItem('tisea-login-date');
		if (this.type === 'key') {
			localStorage.removeItem('tisea-login-key');
		} else {
			localStorage.removeItem('tisea-login-username');
			localStorage.removeItem('tisea-login-oasis-token');
		}
	}

	getLoginDate() {
		if (process.server) return new Date(0);
		const date = localStorage.getItem('tisea-login-date')
		if (date === null) return new Date(0);
		return new Date(date);
	}
}
