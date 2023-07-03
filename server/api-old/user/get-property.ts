export default defineEventHandler(async e => {
	const query = getQuery(e);
	const username = query.username as string;
	const properties = query.properties as (keyof User)[];
	if (!properties || !username) {
		return er(ERR.NOT_ENOUGH_ARGUMENT);
	}
	if (!Array.isArray(properties)) {
		return er(`Indispensable argument 'properties' is not a valid array.`);
	}
	const user = await DB.getUser(
		{
			username
		},
		Func.buildProjection<User>(...properties)
	);
    if (user === null) {
        return er(ERR.EMPTY_RESULT);
    }
    return ok(null, user);
});
