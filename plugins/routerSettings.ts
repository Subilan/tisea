import nprogress from 'nprogress';
import {updateUser} from "~/utils/states";
import {getUser} from "~/utils/common";

export default defineNuxtPlugin({
    hooks: {
        async 'app:created'() {
            updateUser(await getUser())
            useRouter().beforeEach(async (to, from, next) => {
                updateUser(await getUser())
                next();
                nprogress.start();
            })
            useRouter().afterEach(() => {
                nprogress.done();
            })
        }
    }
})