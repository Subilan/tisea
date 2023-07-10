import {bindProperties, getKey, requireNonEmpty, deleteKey} from "../../../../lib/common/butils/common";
import {ERR, ng, ok} from "../../../../lib/common/butils/response";
import {User} from "../../../../lib/common/butils/classes/User";

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
            return ok(dist);
        }

        const key = requireNonEmpty(body.key) as string | string[];

        if (typeof key === 'string') {
            if (key === 'hash') {
                return ng(ERR.UNSUPPORTED_OPERATION);
            }
            if (key in user.dist) {
                return ok(getKey(user.dist, key));
            } else {
                return ng(ERR.ARGUMENT_TYPE_NOT_SATISFIED, 'get.ts')
            }
        } else if (Array.isArray(key)) {
            if (key.includes("hash")) {
                return ng(ERR.UNSUPPORTED_OPERATION, 'get.ts');
            }
            const result = {};
            bindProperties(result, user.dist);
            Object.keys(result).forEach(k => {
                if (!key.includes(k)) {
                    deleteKey(result, k);
                }
            })
            return ok(result);
        }

        return ng(ERR.ARGUMENT_TYPE_NOT_SATISFIED, 'get.ts');
    } catch (e: any) {
        return ng(e.message, 'get.ts wild');
    }
})