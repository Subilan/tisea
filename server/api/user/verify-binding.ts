import BUserUtil from '../../utils/static/BUserUtil';
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
        await BUserUtil.bind(binding.username, binding.playername, {
            bindingToken: "",
            verified: true
        });
        await DB.upsertUser({
            username: binding.username
        }, {
            playername: binding.playername
        })
        console.log(binding)
        return ok();
    } catch (e: any) {
        return er(e.message)
    }
});
