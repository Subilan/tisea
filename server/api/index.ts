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
                        oasis: params.oasis ?? null
                    })
                    await creation.create()
                    return ok();
                }

                case "user.alter": {
                    const id = requireNonEmpty(params.id);
                    const user = await User.build(id);
                    await user.alter(params.set)
                    return ok();
                }
            }
        }

        if (action.startsWith('auth.')) {
            switch (action) {
                case "auth.login": {
                    const displayname = requireNonEmpty(params.displayname);
                    const pwd = requireNonEmpty(params.password);
                    const user = await User.build("", displayname);
                    await user.login(pwd);
                    return ok(user.toToken());
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