const KEYS = {
    user: {
        token: 'cc.seati.tisea.user.token'
    }
}

export default class Storage {
    public static set(key: string, value: any) {
        if (process.client) {
            localStorage.setItem(key, value);
        }
    }

    public static get(key: string) {
        if (process.client) {
            return localStorage.getItem(key)
        }
        return null;
    }

    public static rm(key: string) {
        if (process.client) {
            localStorage.removeItem(key)
        }
    }

    public static get token(): Nullable<string> {
        return this.get(KEYS.user.token);
    }

    public static set token(value) {
        if (value === null) this.rm(KEYS.user.token);
        else this.set(KEYS.user.token, value);
    }
}