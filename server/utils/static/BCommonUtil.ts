export default class BCommonUtil {
	static buildProjection<T>(...keys: (keyof T)[]) {
        let r = {};
        keys.forEach(k => {
            Object.defineProperty(r, k, {
                value: true
            })
        });
        return r as Record<keyof T, boolean>;
    }
}
