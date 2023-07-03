import {ng, ok} from "../utils/response";
import {User} from "../utils/classes/User";

// using navigator.sendBeacon(url, data: string) to send.
export default defineEventHandler(async e => {
    const body = await readBody(e);
    let json: Partial<IUser> = {}
    try {
        json = JSON.parse(body);
    } catch (e) {
        return ng("Invalid JSON object.")
    }
    if (json.id === undefined || json.isOnline === undefined) {
        return ng(ERR.INVALID_ARGUMENT);
    }
    const id = json.id;
    const isOnline = json.isOnline;
    try {
        await (await User.build(id)).setOnline(isOnline)
    } catch (e: any) {
        return ng(e.message);
    }
    return ok();
})