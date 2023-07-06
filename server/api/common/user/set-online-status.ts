import {User} from "../../../utils/classes/User";

// important: please use navigator.sendBeacon(url, data: string) to test such API, absolutely not other API tools.
export default defineEventHandler(async e => {
    const body = await readBody(e);
    let token = body.token;
    let isOnline = body.isOnline;
    try {
        const user = await User.fromToken(token);
        await user.setOnline(isOnline);
        console.log(`Set isOnline to ${isOnline} for user ${user.username}.`);
        return null;
    } catch (e: any) {
        if (e.message !== ERR.TOKEN.INVALID) console.warn(`Beacon warning: ${e.message}`);
        return null;
    }
})