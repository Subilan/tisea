export const USER_ACTION = {
	UPDATE_DISPLAYNAME: 'update-displayname',
	REFRESH_LATEST_CONNECT: 'refresh-latest-connect'
};

export default class UserUtils {
	static async AgetLoggedIn() {
		if (process.server) return false;
		const r = await $fetch<CommonResponse>('/api/user/verify', {
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
		return this.action('REFRESH_LATEST_CONNECT');
	}

	static action(userAction: keyof typeof USER_ACTION, query: object = {}) {
		return $fetch<CommonResponse>(`/api/user/actions/${USER_ACTION[userAction]}`, {
			method: 'get',
			query
		});
	}

	static prop(...userProp: (keyof User)[]) {
		return $fetch<CommonResponse>(`/api/user/get-property`, {
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
			if (key?.includes('tisea-login')) {
				localStorage.removeItem(key);
			}
		}
	}

	static async AgetOasisObject() {
		const r = await $fetch<CommonResponse>('/api/user/get-oasis-user-object', {
			method: 'get',
			query: {
				oasisToken: localStorage.getItem('tisea-login-oasis-token')
			}
		});
		if (r.status === 'ok') {
			return r.data as OasisUserObject;
		} else {
			return null;
		}
	}

	static async AgetUUID() {
		const r = await $fetch<CommonResponse>(`/api/user/get-uuid`, {
			method: 'get',
			query: {
				username: this.username()
			}
		});
		if (r.status === 'er') return null;
		else return r.msg;
	}

	static async AgetAvatarURL() {
		if (this.type() === 'key') {
			const uuid = await this.AgetUUID();
			return `https://crafatar.com/renders/head/${uuid}`;
		} else if (this.type() === 'oasis') {
			const object = await this.AgetOasisObject();
			if (object === null) return '';
			return `https://i.oases.red${object.picture}`;
		}
	}
}
