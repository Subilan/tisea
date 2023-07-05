import {useState} from "#app";

type SnackbarConfig = { display: boolean, text: string }
type UserConfig = { ready: boolean, target: Partial<IUser> }

export function dispatchSnackbar(text: string) {
    const s = useSnackbar();
    s.value.display = true;
    s.value.text = text;
}

export function updateUser(object: Partial<IUser>) {
    const u = useState<UserConfig>("user");
    u.value = {
        ready: !!object,
        target: object
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