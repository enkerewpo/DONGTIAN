import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)


app.use(createVuestic({
    useRouter: true,
    config: {
        colors: {
            presets: {
                light: {
                    primary: '#8B0012',
                    myCoolColor: '#8B0012',
                    onMyCoolColor: '#8B0012',
                }
            }
        },
    },
}))

app.mount('#app')
