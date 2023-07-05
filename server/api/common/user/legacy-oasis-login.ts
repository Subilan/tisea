import {loginOasis, requireNonEmpty} from "../../../utils/common";

export default defineEventHandler(async e => {
    const body = await readBody(e);
    try {
        const username = requireNonEmpty(body.username);
        const password = requireNonEmpty(body.password);
        const login = await loginOasis(username, password);
        if (login === null) {
            return ng(null, ERR.INTERNAL_REQUEST_FAILED);
        }
        return ok(null, login);
    } catch (e: any) {
        return ng(e.message)
    }
})