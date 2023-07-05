const states = reactive({
    snackbarGlobalCtrl: {
        display: false,
        text: ''
    }
})

export function dispatchSnackbar(text: string) {
    states.snackbarGlobalCtrl.display = true;
    states.snackbarGlobalCtrl.text = text;
}

export default states;