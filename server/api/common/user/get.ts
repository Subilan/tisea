import {bindProperties, getKey, requireNonEmpty, deleteKey} from "../../../utils/common";

export default defineEventHandler(async e => {
    const body = await readBody(e);
    try {
        const token = requireNonEmpty(body.token) as string;
        const user = await User.fromToken(token);
        const key = requireNonEmpty(body.key);


        if (typeof key === 'string') {
            if (key === 'hash') {
                return ng(ERR.UNSUPPORTED_OPERATION);
            }
            if (key in user.dist) {
                return ok(null, getKey(user.dist, key));
            } else {
                return ng(ERR.INVALID_ARGUMENT)
            }
        } else if (Array.isArray(key)) {
            if (key.includes("hash")) {
                return ng(ERR.UNSUPPORTED_OPERATION);
            }
            const result = {};
            bindProperties(result, user.dist);
            Object.keys(result).forEach(k => {
                if (!key.includes(k)) {
                    deleteKey(result, k);
                }
            })
            return ok(null, result);
        }

        return ng(ERR.INVALID_ARGUMENT);
    } catch (e: any) {
        return ng(e.message);
    }
})