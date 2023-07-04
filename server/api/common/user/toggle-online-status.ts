import {ng, ok} from "../../../utils/response";
import {User, UserUtil} from "../../../utils/classes/User";

// important: please use navigator.sendBeacon(url, data: string) to test such API, absolutely not other API tools.
export default defineEventHandler(async e => {
    const body = await readBody(e);
    const user = await User.fromToken(body);

    try {
        await user.setOnline(!user.isOnline);
        return ok();
    } catch (e: any) {
        return ng(e.message);
    }
})