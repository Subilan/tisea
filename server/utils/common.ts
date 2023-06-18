export const ERR = {
	NOT_ENOUGH_ARGUMENT: 'NOT_ENOUGH_ARGUMENT',
    CIPHER_DECRYPTION: 'CIPHER_DECRYPTION',
    INTERNAL_REQUEST_FAILED: 'INTERNAL_REQUEST_FAILED',
	EDGE_CONTEXT: 'EDGE_CONTEXT',
	INVALID_OPERATION: 'INVALID_OPERATION',
	VERIFICATION: 'VERIFICATION',
	EMPTY_RESULT: 'EMPTY_RESULT'
};

export function r(status: RespStatus, msg: string | null, data: any = null) {
	return {
		status,
		msg,
		data
	};
}

export function er(msg: string | null = null) {
	return r('er', msg, null);
}

export function ok(msg: string | null = null, data: any = null) {
	return r('ok', msg, data);
}
