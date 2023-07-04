interface IUser {
    id: string;
    displayname: string;
    hash: string;
    minecraft: string;
    uuid: string;
    avatar: string;
    latestLoginActionAt: number;
    latestLogoutActionAt: number;
    regType: UserRegType;
    perm: UserPerm;
    oasis: Nullable<OasisUserObject>;
    isOnline: boolean;
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