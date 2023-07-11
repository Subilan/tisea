import VueCookies from 'vue-cookies';

export default defineNuxtPlugin({
    hooks: {
        async 'app:created'(app) {
            app.use(VueCookies);
        }
    }
})