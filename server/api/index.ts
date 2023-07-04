import {ERR, ng} from '../utils/response';
import {requireNonEmpty} from "../utils/common";
import {UserUtil} from "../utils/classes/User";

const Actions = ['user.create', 'user.alter', 'user.login', 'user.logout', 'user.checkToken'] as const;
export default defineEventHandler(async e => {
    const body = await readBody(e);
    if (typeof body.action !== 'string' || typeof body.params !== 'object') {
        return ng(ERR.INVALID_ARGUMENT);
    }
    const action = body.action as typeof Actions[number];
    const params = body.params as dict<any>;

    try {
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


            case "user.login": {
                const displayname = requireNonEmpty(params.displayname);
                const pwd = requireNonEmpty(params.password);
                // default: 12 hours
                const expiration = typeof params.expiration === 'number' ? params.expiration : 43200000;
                const user = await User.build("", displayname);
                await user.login(pwd);
                return ok(user.getToken(expiration));
            }

            case "user.logout": {
                const id = requireNonEmpty(params.id);
                const user = await User.build(id);
                await user.logout();
                return ok();
            }

            case "user.checkToken": {
                return ok(null, UserUtil.checkEncryptedToken(requireNonEmpty(params.token)));
            }
        }

        return ng(ERR.UNSUPPORTED_OPERATION);
    } catch (e: any) {
        return ng(e.message);
    }
})