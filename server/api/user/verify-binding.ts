import UserUtil from '../../utils/static/UserUtil';
import DB from '../../utils/static/DB';

export default defineEventHandler(async e => {
	const body = await readBody(e);
    const token = body.bindingToken;
	if (!token) return er(ERR.NOT_ENOUGH_ARGUMENT);
	const binding = await DB.getBinding({
        'bindingToken': token
    });
	if (binding === null) return er(ERR.INVALID_OPERATION);
	if (binding.verified === true || binding.bindingToken === null) return er(ERR.INVALID_OPERATION);
	try {
        UserUtil.bind(binding.username, binding.playername);
        DB.upsertUser({
            username: binding.username
        }, {
            playername: binding.playername
        })
        return ok();
    } catch (e: any) {
        return er(e.message)
    }
});
