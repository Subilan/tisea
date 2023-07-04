import CryptoEs from "crypto-es";
const RANDOM_STRING_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function castObject<T>(obj: any, targetClass: Class) {
    return (obj instanceof targetClass) ? obj as T : null;
}

/**
 * * 指定对应 `obj` 不为 `undefined` 或 `null`
 * * 否则抛出 ERR.INVALID_ARGUMENT 的错误。
 *
 * @param obj 判断对象
 */
export function requireNonEmpty<T = any>(obj: any): T {
    if (obj === undefined || obj === null) throw new Error(ERR.INVALID_ARGUMENT);
    return obj;
}

/**
 * * 若 `obj` 为字符串，则判断是否长度为 0
 * * 其余情况判断是否为 `undefined` 或者 `null`。
 *
 * @param obj 判断对象
 */

export function isEmpty(obj: any) {
    if (typeof obj === "string") {
        return obj.length === 0;
    } else {
        return obj === undefined || obj === null;
    }
}

export function isEmptyKey(obj: any, key: string) {
    return isEmpty(obj[key]);
}

/**
 * 将第二个参数的所有非函数属性同步至第一个参数上。
 * **注意：两个对象必须都能使用
 * [bracket notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors#bracket_notation)
 * 访问和赋值**
 *
 * @param bindTarget 被同步对象
 * @param bindFrom 来源对象
 */

export function bindProperties(bindTarget: any, bindFrom: any) {
    Object.keys(bindFrom).forEach(k => {
        if (!(typeof bindFrom[k] === 'function')) bindTarget[k] = bindFrom[k];
    })
}

/**
 * 创建指定长度的随机字符串
 *
 * @param len 长度
 */
export function getRandomString(len: number) {
    let randomString = '';
    for (let i = 0; i < len; i++) {
        const randomPoz = Math.floor(Math.random() * RANDOM_STRING_CHARSET.length);
        randomString += RANDOM_STRING_CHARSET.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

/**
 * 利用 Mojang 的 API 获得指定游戏名的 UUID。
 *
 * @param name 结果。若未找到则为 `null`
 */
export async function getUUIDFromName(name: string) {
    const resp: {
        name: string;
        id: string;
    } = await $fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`, {
        method: 'get'
    });
    return resp.id ? resp.id : undefined;
}

export function deleteKey(obj: any, key: string) {
    return delete obj[key];
}

export function getKey(obj: any, key: string) {
    return obj[key];
}

export function checkPassword(input: string, hash: string) {
    const {raw, salt} = splitHash(hash);
    return CryptoEs.PBKDF2(input, salt).toString() === raw;
}

function splitHash(hash: string) {
    const splitted = hash.split(".");
    if (splitted.length !== 2) {
        throw new Error(ERR.CRYPTO);
    }
    return {
        raw: splitted[0],
        salt: splitted[1]
    }
}