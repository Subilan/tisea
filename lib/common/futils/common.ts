import Storage from "~/lib/common/futils/storage";
import {useUser} from "~/lib/common/futils/states";
import {ERR} from '~/lib/common/butils/response';

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
    return result ? (result.state ? result.data as Partial<IUser> : {}) : {};
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

export function translate(input: Nullable<string>, context: TranslateContexts = 'none') {
    if (input === null) return '';
    let target = input;
    const dictionary: dict<string> = {
        [ERR.UNSUPPORTED_OPERATION]: "不支持的操作",
        [ERR.BANNED]: "此账号已被封禁",
        [ERR.NODEBB.EMAIL_NOT_CONFIRMED]: "火星港账号未确认邮箱",
        [ERR.TOKEN.EXPIRED]: "登录凭证已过期",
        [ERR.TOKEN.INVALID]: "登录凭证无效",
        [ERR.CRYPTO]: "加密过程出现问题",
        [ERR.ARGUMENT_TYPE_NOT_SATISFIED]: "无效参数类型",
        [ERR.NOT_ENOUGH_ARGUMENT]: "参数不足",
        [ERR.UNEXPECTED_EMPTY_VALUE]: "结果为空",
        [ERR.VERFICIATION_FAILED]: "验证失败",
        [ERR.DUPLICATE]: "重复操作",
        [ERR.INTERNAL_QUERY_FAILED]: "内部本地请求失败",
        [ERR.INTERNAL_REQUEST_FAILED]: "内部网络请求失败",
        [ERR.NOT_EXIST.OBJECT]: "对象不存在",
        [ERR.NOT_EXIST.USER]: "用户不存在",
        [ERR.CANNOT_GET_UUID]: "无法获取 UUID",
        [ERR.REQUIRE_NON_EMPTY]: "存在无效空值"
    }
    switch (context) {
        case "login": {
            dictionary[ERR.UNSUPPORTED_OPERATION] = '不支持该登录方式'
            dictionary[ERR.VERFICIATION_FAILED] = '用户名或密码错误'
            break;
        }
    }
    target = target.replace(/\(at.*\) /g, '');
    Object.keys(dictionary).forEach(k => {
        target = target.replace(k, dictionary[k]);
    })
    switch (context) {
        case "login": {
            target = `无法登录 — ${target}`;
            break;
        }
    }
    return target;
}