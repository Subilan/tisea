export default defineEventHandler(async e => {
    const query = getQuery(e);
    const username = query.username as string;
    if (!username) {
        return er(ERR.NOT_ENOUGH_ARGUMENT);
    }
    const user = await DB.getUser({
        username
    })
    if (user === null) {
        return er(ERR.EMPTY_RESULT);
    }
    const binding =  await DB.getBinding({
        username: user.username
    });
    if (binding === null) {
        return er(ERR.EMPTY_RESULT);
    }
    if (binding.verified === true) {
        return ok(binding.uuid)
    } else {
        return er(`OPERATION_FORBIDDEN: This binding linking username:${binding.username} -> playername:${binding.playername}:uuid:${binding.uuid} is not verified.`)
    }
})