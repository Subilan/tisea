import {getOne, removeOne, upsertOne} from "../database";
import {
    bindProperties,
    verifyHash,
    deleteKey, genHash, genHashOasis,
    getRandomString,
    getUUIDFromName,
    isEmptyKey
} from "../common";
import CryptoEs from "crypto-es";

const CRYPTO_KEY = 'jkeUmUaYnfxVcuvjnpS39uo5EnX4mR7OHyIkXSOfmcVjAIUqxZntJBjgRsHGzTicCgbga0DwQJLs9JEKHp90dMSLefWQMC9OwJOPtUzbPey02gqlKL2GxRqQWAwLmlG2baLY4AiXOkRpwxLilKg0CHeX9OQTo2cKr3LEyOd555';

export class Creation implements IUserCreation {
    id = "";
    username = ""
    displayname = "";
    minecraft = "";
    uuid = "";
    avatar = "";
    latestLoginActionAt = 0;
    latestLogoutActionAt = 0;
    regType: UserRegType = "common";
    perm: UserPerm = 1;
    oasis: OasisUserObject | null = null;
    isOnline = false;
    hash = "";
    password = "";
    private static readonly MANDATORY: (keyof IUserCreation)[] = ["username", "password"]

    constructor(creation: Partial<IUserCreation>) {
        bindProperties(this, creation);
        this.displayname = this.username;
        this.latestLoginActionAt = new Date().getTime();
        this.id = getRandomString(10);
    }

    private static checkParams(params: Partial<IUserCreation>) {
        this.MANDATORY.forEach(k => {
            if (!Object.hasOwn(params, k)) throw new Error(ERR.NOT_ENOUGH_ARGUMENT);
            if (isEmptyKey(params, k)) throw new Error(ERR.UNEXPECTED_EMPTY_VALUE);
        })
    }

    public static async build(params: Partial<IUserCreation>) {
        const keys = Object.keys(params);
        this.checkParams(params);
        if ("id" in keys) {
            console.warn("Invalid `id` specification in user creation, which would be directly ignored.")
        }

        if ("uuid" in keys) {
            console.warn("Invalid `uuid` specification in user creation, which would be directly ignored.");
        }

        if ("hash" in keys) {
            console.warn("Invalid `hash` specification in user creation, which would be directly ignored.");
        }

        if ("displayname" in keys) {
            console.warn("Invalid `displayname` specification in user creation, which would be directly ignored.");
        }

        const password = params.password as string;
        const minecraft = params.minecraft as Nullable<string>;
        if (minecraft) {
            const uuid = await getUUIDFromName(minecraft);
            if (uuid === undefined) {
                throw new Error(ERR.CANNOT_GET_UUID);
            }
            params.uuid = uuid;
        }

        if (!['oasis', 'common'].includes(params.regType ?? '')) {
            params.regType = params.oasis ? 'oasis' : 'common';
        }

        if (params.regType === 'common') {
            params.hash = genHash(password);
        } else {
            params.hash = genHashOasis(params.oasis as OasisUserObject);
        }

        return new Creation(params);
    }

    public get dist(): IUser {
        const result = {};
        bindProperties(result, this);
        deleteKey(this, "password");
        return result as IUser;
    }

    public async create() {
        if (await UserUtil.doesExist({
            username: this.dist.username,
            uuid: this.dist.uuid
        })) {
            throw new Error(ERR.DUPLICATE);
        }
        try {
            await UserUtil.create(this.dist);
        } catch (e: any) {
            throw new Error(ERR.INTERNAL_QUERY_FAILED);
        }
    }
}

export class UserUtil {
    public static create(user: IUser) {
        return upsertOne<IUser>("users", {id: getRandomString(10)}, user);
    }

    public static alter(id: string, set: Partial<IUser>) {
        return upsertOne<IUser>("users", {id}, set);
    }

    public static get(filter: Partial<IUser>) {
        return getOne<IUser>("users", filter);
    }

    public static remove(id: string) {
        return removeOne<IUser>("users", {id});
    }

    public static async doesExist(filter: Partial<IUser>) {
        return (await getOne<IUser>("users", filter)) !== null;
    }

    public static checkEncryptedToken(encryptedToken: string) {
        let token: Nullable<Token> = null;
        try {
            token = JSON.parse(CryptoEs.AES.decrypt(encryptedToken, CRYPTO_KEY).toString(CryptoEs.enc.Utf8)) as Token;
        } catch (e: any) {
            return false;
        }
        return token.expires > new Date().getTime();
    }
}

/**
 * @class User
 * 用于对已存在的 User 进行 get/set 操作。
 */
export class User implements IUser {
    id = "";
    username = ""
    displayname = "";
    hash = "";
    uuid = "";
    avatar = ""
    minecraft = "";
    latestLoginActionAt = 0;
    latestLogoutActionAt = 0;
    regType: UserRegType = 'common';
    perm: UserPerm = 0;
    oasis: Nullable<OasisUserObject> = null;
    isOnline: boolean = false;

    constructor(user: IUser) {
        bindProperties(this, user);
    }

    public static async build(id: string = "", username: string = "") {
        let result: Nullable<IUser> = null;
        if (id && username) {
            result = await UserUtil.get({id, username});
        } else if (id) {
            result = await UserUtil.get({id})
        } else if (username) {
            result = await UserUtil.get({username})
        }
        if (result === null) {
            throw new Error(ERR.NOT_EXIST.USER);
        }
        return new User(result);
    }

    public static async fromToken(encryptedToken: string) {
        let token: Nullable<Token> = null;
        try {
            token = JSON.parse(CryptoEs.AES.decrypt(encryptedToken, CRYPTO_KEY).toString(CryptoEs.enc.Utf8)) as Token;
        } catch (e: any) {
            throw new Error(ERR.INVALID_TOKEN)
        }
        if (token.expires <= new Date().getTime()) {
            throw new Error(ERR.EXPIRED_TOKEN);
        }
        return await User.build(token.id);
    }

    public async alter(set: Partial<IUser>) {
        bindProperties(this, set);
        return await UserUtil.alter(this.id, set);
    }

    public async remove() {
        return await UserUtil.remove(this.id);
    }

    public async setPerm(perm: UserPerm) {
        return await this.alter({
            perm
        })
    }

    public async setOnline(isOnline: boolean) {
        return await this.alter({
            isOnline
        })
    }

    public async toggleOnline() {
        return await this.setOnline(!this.isOnline);
    }

    public async login(providedPwd: string) {
        if (!verifyHash(providedPwd, this.hash)) {
            throw new Error(ERR.VERFICIATION_FAILED);
        }

        if (this.perm === -2) {
            throw new Error(ERR.BANNED);
        }

        await this.setLogin();
    }

    public async logout() {
        await this.alter({
            latestLogoutActionAt: new Date().getTime(),
            isOnline: false
        })
    }

    public get dist() {
        const result = {};
        bindProperties(result, this);
        deleteKey(result, '_id');
        return result as IUser;
    }

    public getToken(expiration: number) {
        const rawToken: Token = {
            id: this.id,
            username: this.username,
            expires: new Date().getTime() + expiration
        }
        return CryptoEs.AES.encrypt(JSON.stringify(rawToken), CRYPTO_KEY).toString();
    }

    public setLogin() {
        return this.alter({
            latestLoginActionAt: new Date().getTime(),
            isOnline: true
        })
    }
}