interface IUser {
    id: string;
    username: string;
    displayname: string;
    hash: string;
    minecraft: Nullable<string>;
    uuid: string;
    avatar: string;
    latestLoginActionAt: number;
    latestLogoutActionAt: number;
    regType: UserRegType;
    perm: UserPerm;
    oasisUsername: string;
    oasis: Nullable<OasisUserObject>;
    isOnline: boolean;
}

interface IUserCreation extends IUser {
    password: string;
}

interface OasisUserObject {
    uid: number;
    username: string;
    userslug: string;
    picture: string;
    status: string;
    postcount: number;
    reputation: number;
    'email:confirmed': number;
    lastonline: number;
    flags: null;
    banned: boolean;
    'banned:expire': number;
    joindate: number;
    fullname: string;
    displayname: string;
    'icon:text': string;
    'icon:bgColor': string;
    joindateISO: Date;
    lastonlineISO: Date;
    banned_until: number;
    banned_until_readable: string;
}

interface NodeBBResponse {
    response: OasisUserObject;
    status: {
        code: string;
        message: string;
    };
}

interface Token {
    username: string;
    expires: number;
    id: string;
}