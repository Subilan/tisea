import {ERR, ng} from '../utils/response';
import {isEmpty, loginOasis, requireNonEmpty, verifyHash} from "../utils/common";
import {UserUtil} from "../utils/classes/User";

export default defineEventHandler(async e => {
    const body = await readBody(e);
    if (typeof body.action !== 'string' || typeof body.params !== 'object') {
        return ng(ERR.ARGUMENT_TYPE_NOT_SATISFIED,  'index.ts');
    }
    const action = body.action as RequestActions;
    const params = body.params as dict<any>;

    try {
        switch (action) {
            case "user.create": {
                const oasis: Nullable<OasisUserObject> = params.oasis ?? null;
                const creation = await Creation.build({
                    username: requireNonEmpty(params.username),
                    minecraft: requireNonEmpty(params.minecraft),
                    password: requireNonEmpty(params.password),
                    oasis,
                    avatar: oasis ? `https://i.oases.red${oasis.picture}` : "",
                    regType: 'common',
                    oasisUsername: oasis ? oasis.username : ''
                })
                await creation.create()
                const user = await User.build(creation.dist.id);
                await user.setLogin();
                const expiration = typeof params.expiration === 'number' ? params.expiration : 43200000;
                return ok(null, user.getToken(expiration));
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
                if (user.regType === 'oasis') {
                    return ng(ERR.UNSUPPORTED_OPERATION,  'user.login');
                }
                await user.login(pwd);
                return ok(null, user.getToken(expiration));
            }

            case 'user.login.oasis': {
                const oasisUsername = requireNonEmpty(params.username);
                const oasisPassword = requireNonEmpty(params.password);
                const login = await loginOasis(oasisUsername, oasisPassword);
                const userExist = await UserUtil.doesExist({username: login?.username});
                if (login === null) {
                    return ng(ERR.VERFICIATION_FAILED, 'user.login.oasis');
                }
                if (login.banned) {
                    return ng(ERR.BANNED, 'user.login.oasis')
                }
                if (!login["email:confirmed"]) {
                    return ng(ERR.NODEBB.EMAIL_NOT_CONFIRMED, 'user.login.oasis');
                }
                if (!userExist) {
                    const creation = await Creation.build({
                        username: oasisUsername,
                        minecraft: null,
                        password: oasisPassword,
                        oasis: login,
                        avatar: `https://i.oases.red${login.picture}`,
                        oasisUsername: oasisUsername,
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
                await user.login(oasisPassword)
                return ok(null, user.getToken(expiration));
            }

            case "user.logout": {
                const id = requireNonEmpty(params.id);
                const user = await User.build(id);
                await user.logout();
                return ok();
            }

            case "user.checkToken": {
                return params.token ? ok(null, UserUtil.checkEncryptedToken(params.token)) : ok(null, false);
            }
        }

        return ng(ERR.UNSUPPORTED_OPERATION, 'index.ts');
    } catch (e: any) {
        return ng(e.message, 'index.ts wild');
    }
})