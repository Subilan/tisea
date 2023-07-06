import Storage from "~/utils/storage";
import {useUser} from "~/utils/states";

export function $openTab(url: string) {
    window.open(url);
}

export function doAction<T = any>(action: RequestActions, params: object) {
    return post<T>('/api', {
        action,
        params
    })
}

export function post<T = any>(url: string, body: object) {
    return $fetch<CommonResponse<T>>(url, {
        method: 'post',
        body
    });
}

export async function checkToken() {
    const result = await doAction<boolean>("user.checkToken", {
        token: Storage.token
    });
    return result ? (result.state === 'ok' && result.data) : false;
}

export function toggleOnlineStatus() {
    const user = useUser();
    setOnlineStatus(!user.value.target.isOnline);
}

export function setOnlineStatus(status: boolean) {
    navigator.sendBeacon('/api/common/user/set-online-status', JSON.stringify({
        token: Storage.token,
        isOnline: status
    }));
}

export function getUserProperty(token: string, key: keyof IUser | (keyof IUser)[]) {
    return post<IUser>('/api/common/user/get', {
        token,
        key
    })
}

export async function getUser() {
    const result = await post('/api/common/user/get', {
        token: Storage.token,
        all: true
    });
    return result ? result.state ? result.data as Partial<IUser> : {} : {};
}

export async function logout() {
    const user = useUser();
    if (!user.value.ready) return false;
    const result = await doAction<boolean>('user.logout', {
        id: user.value.target.id
    });
    if (result.state === 'ok') {
        Storage.token = null;
        return true;
    } else {
        console.error(result.msg);
        return false;
    }
}

export async function checkValue(value: any, type: CheckTypes, ifnotCallback: Nullable<Function> = null) {
    const r = await post<boolean>('/api/common/check-value', {
        type,
        value
    });
    if (r.state !== 'ok') {
        console.warn(`Error in checkValue ${value} ${type}? Details: ${r.msg}`);
    }
    if (!r.data) {
        if (ifnotCallback !== null) ifnotCallback();
        return false;
    } else {
        return true;
    }
}