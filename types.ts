const Actions = ['user.create', 'user.alter', 'user.login', 'user.login.oasis', 'user.logout', 'user.checkToken'] as const;
const CheckTypes = ['user.username.uniqueness', 'user.minecraft.valid', 'user.minecraft.uniqueness', 'user.oasis.uniqueness', 'image.valid'] as const;
const TranslateContexts = ['none', 'login'] as const;
const TokenExpiration = ['1h', '12h', '1d', '3d', '7d', '15d'] as const;

type RequestActions = typeof Actions[number];
type CheckTypes = typeof CheckTypes[number];
type TranslateContexts = typeof TranslateContexts[number];
type TokenExpiration = typeof TokenExpiration[number];

type dict<T> = { [prop: string]: T };

/**
 * * oasis - 使用火星港账号登录
 * * common - 站内注册后登录
 */
type UserRegType = 'oasis' | 'common';
/**
 * * -2 - 禁止登入
 * * -1 - 仅登入
 * * 0 - 正常
 * * 1 - 管理
 * * 2 - admin
 */
type UserPerm = -2 | -1 | 0 | 1 | 2;

type Class<IClass = any> = { new(...args: any[]): IClass }
type Nullable<T> = T | null;
type ResponseState = 'ok' | 'ng';
type CommonResponse<T = any> = { state: ResponseState, msg: Nullable<string>, data: T };
type CommonRequest<T extends {} = object> = { action: RequestActions, params: T };

