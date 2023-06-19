export const USER_ACTION = {
	UPDATE_DISPLAYNAME: 'update-displayname'
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

	static username() {
		if (process.server) return null;
		return localStorage.getItem('tisea-login-username');
	}

	static loginDate() {
		if (process.server) return null;
		return localStorage.getItem('tisea-login-date');
	}

	static refreshLatestConnect() {
		return $fetch(`/api/user/set-latest-connect`, {
			method: 'get',
			body: {
				username: this.username()
			}
		});
	}

	static action(userAction: keyof typeof USER_ACTION, body: object) {
		return $fetch(`/api/user/actions/${USER_ACTION[userAction]}`, {
			method: 'get',
			body
		});
	}
}
