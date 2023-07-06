import {getUUIDFromName, requireNonEmpty} from "../../utils/common";

export default defineEventHandler(async e => {
    const body = await readBody(e);
    try {
        const type: CheckTypes = requireNonEmpty(body.type);
        const value = requireNonEmpty(body.value);
        switch (type) {
            case "user.minecraft.valid": {
                const login = await getUUIDFromName(value);
                return ok(null, login !== null)
            }

            case "user.username.uniqueness": {
                const r = await UserUtil.doesExist({username: value});
                return ok(null, !r);
            }

            case "user.minecraft.uniqueness": {
                const r = await UserUtil.get({
                    minecraft: value
                });
                return ok(null, r === null);
            }

            case "user.oasis.uniqueness": {
                const r = await UserUtil.get({
                    oasisUsername: value
                });
                return ok(null, r === null);
            }

            default: {
                return ng(ERR.UNSUPPORTED_OPERATION, 'check-value.ts switch-default');
            }
        }
    } catch (e: any) {
        return ng(e.message, 'check-value.ts wild');
    }
})