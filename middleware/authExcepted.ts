import {checkToken} from "~/utils/common";
import {navigateTo} from "#app/composables/router";
import {dispatchSnackbar} from "~/utils/states";

export default defineNuxtRouteMiddleware(async () => {
    if (process.client) {
        const r = await checkToken();
        if (r) {
            dispatchSnackbar('你已经登录了~')
            return navigateTo("/");
        }
    }
});
