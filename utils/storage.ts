const KEYS = {
    user: {
        token: 'cc.seati.tisea.user.token'
    }
}

export default class Storage {
    public static get token(): Nullable<string> {
        return localStorage.getItem(KEYS.user.token);
    }

    public static set token(value) {
        if (value === null) localStorage.removeItem(KEYS.user.token);
        else localStorage.setItem(KEYS.user.token, value);
    }
}