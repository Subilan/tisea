import {useState} from "#app";
import Storage from "~/lib/common/futils/storage";

type SnackbarConfig = { display: boolean, text: Nullable<string> }
type UserConfig = { ready: boolean, target: Partial<IUser> }

export function dispatchSnackbar(text: Nullable<string>) {
    const s = useSnackbar();
    s.value.display = true;
    s.value.text = text;
}

/**
 * 更新用户 Object
 * @param object 若为 {} 则删除用户信息
 */
export function updateUser(object: UserConfig['target']) {
    const u = useState<UserConfig>("user");
    u.value = {
        ready: Object.values(object).length > 0,
        target: object
    }
    if (!u.value.ready) {
        Storage.token = null;
    }
}

export function useSnackbar() {
    return useState<SnackbarConfig>('snackbarGlobal', () => {
        return {
            display: false,
            text: ''
        }
    });
}

export function useUser() {
    return useState<UserConfig>('user', () => {
        return {ready: false, target: {}}
    });
}