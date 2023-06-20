export const USER_ACTION = {
	UPDATE_DISPLAYNAME: 'update-displayname',
	REFRESH_LATEST_ACTIVE: 'refresh-latest-active'
};

export default class UserUtils {
	static async loggedIn() {
		if (process.server) return false;
		const r = await $fetch('/api/user/verify', {
			method: 'get',
			query: {
				method: localStorage.getItem('tisea-login-method'),
				seatiKey: localStorage.getItem('tisea-login-seati-key'),
				oasisToken: localStorage.getItem('tisea-login-oasis-token')
			}
		});
		return r.status === 'ok';
	}

	static type(): UserType | null {
		if (process.server) return null;
		return localStorage.getItem('tisea-login-method') as UserType;
	}

	static username() {
		if (process.server) return null;
		return localStorage.getItem('tisea-login-username');
	}

	static loginDate() {
		if (process.server) return null;
		return localStorage.getItem('tisea-login-date');
	}

	static refreshLatestConnect() {
		return this.action('REFRESH_LATEST_ACTIVE');
	}

	static action(userAction: keyof typeof USER_ACTION, query: object = {}) {
		return $fetch(`/api/user/actions/${USER_ACTION[userAction]}`, {
			method: 'get',
			query
		});
	}

	static prop(...userProp: (keyof User)[]) {
		return $fetch(`/api/user/get-property`, {
			method: 'get',
			query: {
				properties: userProp,
				username: this.username()
			}
		});
	}

	static logout() {
		if (process.server) return;
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			if (key?.startsWith('tisea-login')) {
				localStorage.removeItem(key);
			}
		}
	}

	static uuid() {
		return $fetch(`/api/user/get-uuid`, {
			method: 'get',
			query: {
				username: this.username()
			}
		})
	}

	static avatar() {
		if (this.type() === 'key') {
		} else if (this.type() === 'oasis') {
		}
	}
}
