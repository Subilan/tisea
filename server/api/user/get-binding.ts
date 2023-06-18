import DB from '../../utils/static/DB';

export default defineEventHandler(async e => {
	const query = getQuery(e);
	const username = query.username;
    if (username === null) {
        return er(ERR.NOT_ENOUGH_ARGUMENT)
    }
	const binding = await DB.getBinding({
		username: username as string
	});
	if (binding === null) {
		return er(ERR.EMPTY_RESULT);
	}
	return ok(null, binding);
});
