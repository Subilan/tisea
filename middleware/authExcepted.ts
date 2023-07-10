import {checkToken} from "~/lib/common/futils/common";
import {navigateTo} from "#app/composables/router";
import {dispatchSnackbar} from "~/lib/common/futils/states";

export default defineNuxtRouteMiddleware(async () => {
    if (process.client) {
        const r = await checkToken();
        if (r) {
            dispatchSnackbar('你已经登录了~')
            return navigateTo("/");
        }
    }
});
