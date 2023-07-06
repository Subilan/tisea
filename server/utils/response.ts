export const ERR = {
    ARGUMENT_TYPE_NOT_SATISFIED: 'error.argument_type_not_satisfied',
    UNSUPPORTED_OPERATION: 'error.unsupported_operation',
    NOT_ENOUGH_ARGUMENT: 'error.not_enough_argument',
    INTERNAL_REQUEST_FAILED: 'error.internal_request_failed',
    CANNOT_GET_UUID: 'error.cannot_get_uuid',
    VERFICIATION_FAILED: 'error.verification_failed',
    REQUIRE_NON_EMPTY: 'error.require_non_empty',
    NOT_EXIST: {
      OBJECT: 'error.not_exist.object',
      USER: 'error.not_exist.user'
    },
    BANNED: 'error.banned',
    INTERNAL_QUERY_FAILED: 'error.internal_query_failed',
    CRYPTO: 'error.crypto',
    DUPLICATE: 'error.duplicate',
    TOKEN: {
        EXPIRED: 'error.token.expired',
        INVALID: 'error.token.invalid'
    },
    UNEXPECTED_EMPTY_VALUE: 'error.unexpected_empty_value',
    NODEBB: {
        EMAIL_NOT_CONFIRMED: 'error.nodebb.email_not_confirmed'
    }
}

export function ok<T = any>(msg: Nullable<string> = null, data: Nullable<T> = null) {
    return buildResponse('ok', msg, data);
}

export function ng<T = any>(msg: Nullable<string> = null, data: Nullable<T> = null, at: Nullable<string> = null) {
    return buildResponse('ng', `(at ${at}) ${msg}`, data);
}

/**
 * 创建一个标准的服务器返回对象
 * @param state 返回状态
 * @param msg 返回文本
 * @param data 返回数据 —— 可以使用 T 泛型约定类型，不填则为 any
 */
export function buildResponse<T = any>(state: ResponseState, msg: Nullable<string>, data: T): CommonResponse<T> {
    return {
        state,
        msg,
        data
    }
}