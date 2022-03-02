import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
// import { onMessage } from './resource/js/webviewInterface'
import webViewBridge from './resource/js/webViewBridge'

import gActiveBar from './components/globalComponents/Tal_commonActiveBar.vue'
import gButtonS from './components/globalComponents/Tal_commonButtonS.vue'
import gButtonL from './components/globalComponents/Tal_commonButtonL.vue'
import fullModal from './components/popup/Tal_common_popupWrap.vue'
import pushModal from './components/popup/Tal_common_pushPopWrap.vue'
import TalHeader from './components/globalComponents/Tal_mainHeader.vue'
import TalFooter from './components/globalComponents/Tal_footer.vue'
import commonList from './components/globalComponents/Tal_commonList.vue'
// import massage from './resource/js/Tal_popup'

import popupClick from './resource/js/Tal_popup'

const app = createApp(App).use(router)
app.component('gBtnSmall', gButtonS)
app.component('gBtnLarge', gButtonL)
app.component('gActiveBar', gActiveBar)
app.component('fullModal', fullModal)
app.component('pushModal', pushModal)
app.component('TalHeader', TalHeader)
app.component('TalFooter', TalFooter)
app.component('commonList', commonList)

app.use(webViewBridge)
app.use(store)
app.use(popupClick)
// app.use(massage)
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 100000
axios.defaults.baseURL = 'http://192.168.1.111:9090'
// axios.defaults.baseURL = 'http://dev.on-apt.kr:8081/'

// 캐싱 방지
axios.defaults.headers.get['Cache-Control'] = 'no-cache'
axios.defaults.headers.get.Pragma = 'no-cache'

// Vue.prototype.$http = axios

app.config.globalProperties.$axios = axios
app.mount('#app')
