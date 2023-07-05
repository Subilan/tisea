import {ERR, ng} from '../utils/response';
import {genPasswordOasis, loginOasis, requireNonEmpty} from "../utils/common";
import {UserUtil} from "../utils/classes/User";

export default defineEventHandler(async e => {
    const body = await readBody(e);
    if (typeof body.action !== 'string' || typeof body.params !== 'object') {
        return ng(ERR.INVALID_ARGUMENT);
    }
    const action = body.action as RequestActions;
    const params = body.params as dict<any>;

    try {
        switch (action) {
            case "user.create": {
                const creation = await Creation.build({
                    username: requireNonEmpty(params.username),
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
                await user.alter(params.set);
                return ok();
            }


            case "user.login": {
                const username = requireNonEmpty(params.username);
                const pwd = requireNonEmpty(params.password);
                // default: 12 hours
                const expiration = typeof params.expiration === 'number' ? params.expiration : 43200000;
                const user = await User.build("", username);
                await user.login(pwd);
                return ok(user.getToken(expiration));
            }
            
            case 'user.login.oasis': {
                const oasisUsername = requireNonEmpty(params.username);
                const oasisPassword = requireNonEmpty(params.password);
                const login = await loginOasis(oasisUsername, oasisPassword);
                const userExist = await UserUtil.doesExist({username: login?.username });
                if (login === null) {
                    return ng(ERR.VERFICIATION_FAILED);
                }
                const password = genPasswordOasis(login)
                if (!userExist) {
                    const creation = await Creation.build({
                        username: requireNonEmpty(login?.username),
                        minecraft: null,
                        password,
                        oasis: login
                    });
                    await creation.create();
                }
                const expiration = typeof params.expiration === 'number' ? params.expiration : 43200000;
                const user = await User.build("", login.username);
                if (userExist) {
                    await user.alter({
                        oasis: login
                    })
                }
                await user.login(password)
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