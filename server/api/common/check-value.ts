import {getUUIDFromName, requireNonEmpty} from "../../../lib/common/butils/common";
import {ERR, ng, ok} from "../../../lib/common/butils/response";
import {UserUtil} from "../../../lib/common/butils/classes/User";

export default defineEventHandler(async e => {
    const body = await readBody(e);
    try {
        const type: CheckTypes = requireNonEmpty(body.type);
        const value = requireNonEmpty(body.value);
        switch (type) {
            case "user.minecraft.valid": {
                const login = await getUUIDFromName(value);
                return ok(login !== null)
            }

            case "user.username.uniqueness": {
                const r = await UserUtil.doesExist({username: value});
                return ok(!r);
            }

            case "user.minecraft.uniqueness": {
                const r = await UserUtil.get({
                    minecraft: value
                });
                return ok(r === null);
            }

            case "user.oasis.uniqueness": {
                const r = await UserUtil.get({
                    oasisUsername: value
                });
                return ok(r === null);
            }

            case "image.valid": {
                const r = await fetch(value, {method: 'HEAD'});
                return ok((await r.blob()).type.startsWith('image/'));
            }

            default: {
                return ng(ERR.UNSUPPORTED_OPERATION, 'check-value.ts switch-default');
            }
        }
    } catch (e: any) {
        return ng(e.message, 'check-value.ts wild');
    }
})