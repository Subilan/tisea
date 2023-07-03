export default defineEventHandler(async e => {
	const body = await readBody(e);
    const username = body.username;
    if (!username) {
        return er(ERR.NOT_ENOUGH_ARGUMENT);
    }
    await Func.refreshLatestConnect(username);
});
