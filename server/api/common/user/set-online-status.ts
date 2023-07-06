import {User} from "../../../utils/classes/User";
import {requireNonEmpty} from "../../../utils/common";

// important: please use navigator.sendBeacon(url, data: string) to test such API, absolutely not other API tools.
export default defineEventHandler(async e => {
    const body = await readBody(e);
    let token = '';
    let isOnline = false;
    try {
        token = requireNonEmpty(body.token);
        isOnline = requireNonEmpty(body.isOnline);
    } catch (e: any) {
        console.warn(`beacon: ${e.message}`);
        return null;
    }
    try {
        const user = await User.fromToken(token);
        await user.setOnline(isOnline);
        return null;
    } catch (e: any) {
        console.warn(`beacon: ${e.message}`);
        return null;
    }
})