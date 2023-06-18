import DB from "../../utils/static/DB";

export default defineEventHandler(async e => {
    const query = getQuery(e);
    const username = query.username;
    const binding = await DB.getBinding({
        username
    })
    if (binding === null) {
        return er(ERR.EMPTY_RESULT);
    }
    return ok(null, binding)
})