import {ERR, ng} from '../utils/response';
import {requireNonEmpty} from "../utils/common";

const Actions = ['user.create', 'user.alter', 'auth.login', 'auth.logout'] as const;
export default defineEventHandler(async e => {
    const body = await readBody(e);
    if (typeof body.action !== 'string' || typeof body.params !== 'object') {
        return ng(ERR.INVALID_ARGUMENT);
    }
    const action = body.action as typeof Actions[number];
    const params = body.params as dict<any>;

    try {
        if (action.startsWith("user.")) {
            switch (action) {
                case "user.create": {
                    const creation = await Creation.build({
                        displayname: requireNonEmpty(params.displayname),
                        minecraft: requireNonEmpty(params.minecraft),
                        password: requireNonEmpty(params.password),
                        oasis: requireNonEmpty(params.oasis),
                    })
                    if (await creation.create()) {
                        return ok();
                    } else {
                        ng(ERR.UNKNOWN)
                    }
                    break;
                }

                case "user.alter": {
                    const id = requireNonEmpty(params.id);
                    const user = await User.build(id);
                    if (await user.alter(params.set)) {
                        return ok();
                    } else {
                        return ng(ERR.UNKNOWN);
                    }
                }
            }
        }

        if (action.startsWith('auth.')) {
            switch (action) {
                case "auth.login": {
                    const id = requireNonEmpty(params.id);
                    const pwd = requireNonEmpty(params.password);
                    const user = await User.build(id);
                    await user.login(pwd);
                    return ok();
                }

                case "auth.logout": {
                    const id = requireNonEmpty(params.id);
                    const user = await User.build(id);
                    await user.logout();
                    return ok();
                }
            }
        }

        return ng(ERR.UNSUPPORTED_OPERATION);
    } catch (e: any) {
        return ng(e.message);
    }
})