import CryptoEs from 'crypto-es';

const CRYPTO_KEY = 'jkeUmUaYnfxVcuvjnpS39uo5EnX4mR7OHyIkXSOfmcVjAIUqxZntJBjgRsHGzTicCgbga0DwQJLs9JEKHp90dMSLefWQMC9OwJOPtUzbPey02gqlKL2GxRqQWAwLmlG2baLY4AiXOkRpwxLilKg0CHeX9OQTo2cKr3LEyOd555';

export default class Func {
	static genStr(len: number) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < len) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}
		return result;
	}

	static encrypt(str: string) {
		return CryptoEs.AES.encrypt(str, CRYPTO_KEY);
	}

	static decrypt(cipher: string) {
		return CryptoEs.AES.decrypt(cipher, CRYPTO_KEY).toString(CryptoEs.enc.Utf8);
	}

	static OgetUsername(oasisToken: string) {
		return this.decrypt(oasisToken).split('.')[0];
	}

	static OgetPassword(oasisToken: string) {
		return this.decrypt(oasisToken).split('.')[1];
	}

	static KgetUsername(key: string) {
		return key.split('~')[0];
	}

	static KgetToken(key: string) {
		return key.split('~')[1];
	}

	static async refreshLatestConnect(username: string) {
		DB.upsertUser(
			{
				username
			},
			{
				latestConnect: new Date().toString()
			}
		);
	}
}
