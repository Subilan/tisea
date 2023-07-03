export const ERR = {
    INVALID_PARAMETER: 'error.invalid_parameter',
    UNSUPPORTED_OPERATION: 'error.unsupported_operation',
    NOT_ENOUGH_ARGUMENT: 'error.not_enough_argument',
    INTERNAL_REQUEST_FAILED: 'error.internal_request_failed',
    CANNOT_GET_UUID: 'error.cannot_get_uuid',
    VERFICIATION: 'error.verification',
    BANNED: 'error.banned'
}

export function ok<T extends any>(msg: Nullable<string> = null, data: Nullable<T> = null) {
    return buildResponse('ok', msg, data);
}

export function ng<T extends any>(msg: Nullable<string> = null, data: Nullable<T> = null) {
    return buildResponse('ng', msg, data);
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