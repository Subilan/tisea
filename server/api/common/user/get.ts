import {bindProperties, getKey, requireNonEmpty, deleteKey} from "../../../utils/common";

export default defineEventHandler(async e => {
    const body = await readBody(e);
    try {
        const token = requireNonEmpty(body.token) as string;
        const user = await User.fromToken(token);
        const all = body.all ?? false;
        if (all) {
            const user = await User.fromToken(token);
            const dist = user.dist;
            deleteKey(dist, 'hash');
            deleteKey(dist, '_id');
            return ok(null, dist);
        }

        const key = requireNonEmpty(body.key) as string | string[];

        if (typeof key === 'string') {
            if (key === 'hash') {
                return ng(ERR.UNSUPPORTED_OPERATION);
            }
            if (key in user.dist) {
                return ok(null, getKey(user.dist, key));
            } else {
                return ng(ERR.ARGUMENT_TYPE_NOT_SATISFIED, null, 'get.ts')
            }
        } else if (Array.isArray(key)) {
            if (key.includes("hash")) {
                return ng(ERR.UNSUPPORTED_OPERATION, null, 'get.ts');
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

        return ng(ERR.ARGUMENT_TYPE_NOT_SATISFIED, null, 'get.ts');
    } catch (e: any) {
        return ng(e.message, null, 'get.ts wild');
    }
})