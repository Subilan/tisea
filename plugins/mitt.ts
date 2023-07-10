import mitt from "mitt";

export default defineNuxtPlugin({
    hooks: {
        async 'app:created'(app) {
           app.provide('emitter', mitt());
        }
    }
})