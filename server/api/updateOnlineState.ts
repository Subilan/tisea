import {ng, ok} from "../utils/response";
import {User} from "../utils/classes/User";

export default defineEventHandler(async e => {
    const body = await readBody(e);
    let json: Partial<IUser> = {}
    try {
        json = JSON.parse(body);
    } catch (e) {
        return ng("Invalid JSON object.")
    }
    if (json.id === undefined || json.isOnline === undefined) {
        return ng(ERR.INVALID_PARAMETER);
    }
    const id = json.id;
    const isOnline = json.isOnline;
    await (await User.build(id)).setOnline(isOnline)
    return ok();
})