import { UserUtil } from '../../utils/class';
import DB from '../../utils/db';

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
        UserUtil.setBinding(binding.username, binding.playername, true, null);
        return ok();
    } catch (e: any) {
        return er(e.message)
    }
});
