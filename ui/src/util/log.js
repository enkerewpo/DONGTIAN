import { useToast } from 'vuestic-ui'
const { init, notify, close, closeAll } = useToast()

function ui_log(str) {
    notify({
        title: str,
        position: 'bottom-left',
    })
}

export { ui_log }