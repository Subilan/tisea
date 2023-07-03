import {buildResponse, ERR, ng} from '../utils/response';

const Actions = ['user.create', 'user.alter', 'auth'] as const;
export default defineEventHandler(async e => {
    const body = await readBody(e);
    if (typeof body.action !== 'string' || typeof body.params !== 'object') {
        return ng(ERR.INVALID_PARAMETER);
    }
    const action = body.action as typeof Actions[number];
    const params = body.params as dict<any>;

    try {
        if (action.startsWith("user.")) {
            switch (action) {
                case "user.create": {

                    break;
                }

                case "user.alter": {
                    break;
                }

                default: {
                    return ng(ERR.UNSUPPORTED_OPERATION);
                }
            }
        }

        if (action === 'auth') {

        }
    } catch (e: InstanceType<Error>) {
        if (e.message === 'REQUIRE_NON_NULL_ERROR') return ng(ERR.INVALID_PARAMETER);
        return ng(`An internal error occurred. Detail: ${e.message}.`);
    }
})