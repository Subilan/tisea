import {getKey, requireNonEmpty} from "../utils/common";

export default defineEventHandler(async e => {
    const body = await readBody(e);
    try {
        const token = requireNonEmpty(body.token) as string;
        const key = requireNonEmpty(body.key) as string;
        const user = User.fromToken(token);
        if (key === 'hash') {
            return ng(ERR.UNSUPPORTED_OPERATION);
        }
        if (key in user.dist) {
            return ok(getKey(user.dist, key));
        } else {
            return ng(ERR.INVALID_ARGUMENT)
        }
    } catch (e: any) {
        return ng(e.message);
    }
})