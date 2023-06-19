import nprogress from 'nprogress';

export default defineNuxtPlugin({
    hooks: {
        'app:created'(app) {
            useRouter().beforeEach((to, from, next) => {
                nprogress.start();
                next();
            })
            useRouter().afterEach(() => {
                nprogress.done();
            })
        }
    }
})