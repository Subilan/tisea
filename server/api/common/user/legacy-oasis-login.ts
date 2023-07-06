import {loginOasis, requireNonEmpty} from "../../../utils/common";

export default defineEventHandler(async e => {
    const body = await readBody(e);
    try {
        const username = requireNonEmpty(body.username);
        const password = requireNonEmpty(body.password);
        const login = await loginOasis(username, password);
        if (login === null) {
            return ng(ERR.INTERNAL_REQUEST_FAILED, 'legacy-oasis-login.ts');
        }
        return ok(login);
    } catch (e: any) {
        return ng(e.message, 'legacy-oasis-login.ts wild')
    }
})