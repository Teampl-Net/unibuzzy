import { createApp } from 'vue'
import App from './TheAlim.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import gButton from './components/unit/button/cAd_gButton.vue'
import gButtonL from './components/unit/button/cAd_gButtonL.vue'
import popHeader from './components/layout/cAd_gPopHeader.vue'
import gActiveBar from './components/unit/cAd_gActiveBar.vue'

import gWhiteButton from './components/unit/button/cAd_gWhiteButton.vue'
import gWhiteSelect from './components/unit/selectBox/cAd_gWhiteSelect.vue'
import gSearchBox from './components/unit/searchBox/cAd_gSearchBox.vue'
import contentsPop from './components/popup/cAd_gcontentsPop.vue'
import gSelect from './components/unit/selectBox/cAd_gSelectBox.vue'
import searchResult from './components/unit/searchBox/cAd_gSearchResult.vue'
import pushDetailTile from './components/unit/cAd_gDetailTitle.vue'
import gPageTitle from './components/unit/cAd_gPageTitle.vue'
import detailSearchPop from './components/popup/cAd_gDetailSearchPop.vue'
import gFilterPop from './components/popup/cAd_gFilterPop.vue'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

// import { axiosServer } from './assets/js/ad_common'

// import previewPop from './components/test/cAd_gPreviewPush.vue'

const app = createApp(App).use(store).use(router)
app.component('popHeader', popHeader)
app.component('gButton', gButton)
app.component('Datepicker', Datepicker)
app.component('gButtonL', gButtonL)
app.component('gActiveBar', gActiveBar)
app.component('gPageTitle', gPageTitle)

app.component('gSearchBox', gSearchBox)
app.component('gWhiteButton', gWhiteButton)
app.component('gWhiteSelect', gWhiteSelect)
app.component('gSelect', gSelect)
// app.component('previewPop', previewPop)
app.component('contentsPop', contentsPop)
app.component('searchResult', searchResult)
app.component('detailSearchPop', detailSearchPop)
app.component('pushDetailTile', pushDetailTile)
app.component('gFilterPop', gFilterPop)
// app.component('selectGroupPop', selectGroupPop)
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
