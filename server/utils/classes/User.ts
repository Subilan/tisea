import {getOne, removeOne, upsertOne} from "../database";
import {bindProperties, deleteKey, getRandomString, getUUIDFromName, isEmpty, isEmptyKey} from "../common";
import interfaceTi from "../../../interface-ti";
import {createCheckers} from "ts-interface-checker";
import * as bcrypt from "bcryptjs";

const {OasisUserObject, IUser} = createCheckers(interfaceTi);

interface IUserCreation extends IUser {
    password: string;
}

export class Creation implements IUserCreation {
    id: string = "";
    displayname: string = "";
    minecraft: string = "";
    uuid: string = "";
    latestLoginActionAt: number = 0;
    latestLogoutActionAt: number = 0;
    regType: UserRegType = "common";
    perm: UserPerm = 1;
    oasis: OasisUserObject | null = null;
    isOnline: boolean = false;
    hash: string = "";
    password: string = "";
    private static readonly MANDATORY: (keyof IUserCreation)[] = ["minecraft", "displayname", "password"]

    constructor(creation: Partial<IUserCreation>) {
        bindProperties(this, creation)
        this.id = getRandomString(10);
    }

    private static checkParams(params: Partial<IUserCreation>) {
        this.MANDATORY.forEach(k => {
            if (!Object.hasOwn(params, k)) throw new Error(ERR.INVALID_ARGUMENT);
            if (isEmptyKey(params, k)) throw new Error(ERR.INVALID_ARGUMENT);
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

        if ("regType" in keys) {
            console.warn("Invalid `regType` specification in user creation, which would be directly ignored.");
        }

        if ("hash" in keys) {
            console.warn("Invalid `hash` specification in user creation, which would be directly ignored.");
        }

        const password = params.password as string;

        const minecraft = params.minecraft as string;
        const uuid = await getUUIDFromName(minecraft);
        if (uuid === undefined) {
            throw new Error(ERR.CANNOT_GET_UUID);
        }
        params.uuid = uuid;

        if (!isEmpty(params.oasis)) {
            if (!OasisUserObject.test(params.oasis)) {
                throw new Error(ERR.INVALID_ARGUMENT);
            } else {
                params.regType = 'oasis';
            }
        } else {
            params.regType = 'common';
        }

        params.hash = await bcrypt.hash(password, await bcrypt.genSalt(10));

        return new Creation(params);
    }

    public get dist(): IUser {
        const result = {};
        bindProperties(result, this);
        deleteKey(this, "password");
        return result as IUser;
    }

    public async create() {
        return await UserUtil.create(this.dist);
    }


}

export class UserUtil {
    public static create(user: IUser) {
        return upsertOne<IUser>("users", {id: getRandomString(10)}, {
            // provided
            minecraft: user.minecraft,
            displayname: user.displayname,
            oasis: user.oasis,
            // generated
            latestLoginActionAt: new Date().getTime(),
            regType: user.regType,
            perm: 1,
            hash: user.hash,
            uuid: user.uuid
        })
    }

    public static alter(id: string, set: Partial<IUser>) {
        return upsertOne<IUser>("users", {id}, set);
    }

    public static get(id: string) {
        return getOne<IUser>("users", {id});
    }

    public static remove(id: string) {
        return removeOne<IUser>("users", {id});
    }

    public static async doesExist(id: string) {
        return (await this.get(id)) !== null;
    }
}

/**
 * @class User
 * 用于对已存在的 User 进行 get/set 操作。
 */
export class User implements IUser {
    id = "";
    displayname = "";
    hash = "";
    uuid = "";
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

    public static async build(id: string) {
        const result = await UserUtil.get(id);
        if (result === null) {
            throw new Error(`User of id ${id} does not exist.`);
        }
        if (!IUser.test(result)) {
            throw new Error(`Obtained invalid user object.`);
        }
        return new User(result);
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
        if (!await bcrypt.compare(providedPwd, this.hash)) {
            throw new Error(ERR.VERFICIATION);
        }

        if (this.perm === -2) {
            throw new Error(ERR.BANNED);
        }

        await this.alter({
            latestLoginActionAt: new Date().getTime(),
            isOnline: true
        })
    }

    public async logout() {
        await this.alter({
            latestLogoutActionAt: new Date().getTime(),
            isOnline: false
        })
    }
}