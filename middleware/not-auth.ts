export default defineNuxtRouteMiddleware(async (to, from) => {
	if (process.client) {
		const r = await $fetch<CommonResponse>('/api/user/verify', {
			method: 'get',
			params: {
				method: localStorage.getItem('tisea-login-method'),
				key: localStorage.getItem('tisea-login-seati-key'),
				data: localStorage.getItem('tisea-login-oasis-token')
			}
		});
		console.log(r);
		if (r.status === 'ok') {
			return navigateTo('/');
		}
	}
});
