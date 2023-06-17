export const useLoginToken = useState('login-token', () => {
    if (process.client) {
        return localStorage.getItem('tisea-login-token');
    }
})