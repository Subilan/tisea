import Storage from "~/utils/storage";

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
   const res = useFetch<CommonResponse<T>>(url, {
        method: 'post',
        body
    })
    if (res.error) {
        console.error(res.error);
        return null;
    }
    if (!res.data) {
        return null;
    } else {
        return unref(res.data);
    }
}

export async function checkToken() {
    const result = await doAction<boolean>("user.checkToken", {
        token: Storage.token
    });
    return result ? (result.state === 'ok' && result.data) : false;
}

export function toggleOnlineStatus(token: string) {
    navigator.sendBeacon('/api/common/user/toggle-online-status', token);
}

export function getUserProperty(token: string, key: keyof IUser | (keyof IUser)[]) {
    return post<IUser>('/api/common/user/get', {
        token,
        key
    })
}

export async function getUser(token: string) {
    const result = await post('/api/common/user/get', {
        token,
        all: true
    });
    return result ? result.state ? result.data as Partial<IUser> : {} : {};
}