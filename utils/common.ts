export function $openTab(url: string) {
    window.open(url);
}

export function post<T = any>(action: RequestActions, params: object) {
    return $fetch<CommonResponse<T>>('/api', {
        method: 'post',
        body: {
            action,
            params
        }
    });
}

export function toggleOnlineStatus(token: string) {
    navigator.sendBeacon('/api/common/user/toggle-online-status', token);
}

export function getUserProperty(token: string, key: string | string[]) {
    return $fetch('/api/common/user/get', {
        method: 'post',
        body: {
            token,
            key
        }
    })
}