import nprogress from 'nprogress';
import {updateUser} from "~/lib/common/futils/states";
import {getUser} from "~/lib/common/futils/common";

export default defineNuxtPlugin({
    hooks: {
        async 'app:created'() {
            updateUser(await getUser() ?? {})
            useRouter().beforeEach(async (to, from, next) => {
                updateUser(await getUser() ?? {})
                next();
                nprogress.start();
            })
            useRouter().afterEach(() => {
                nprogress.done();
            })
        }
    }
})