import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import gButton from './components/cAd_gButton.vue'
import gButtonL from './components/cAd_gButtonL.vue'
import popHeader from './components/cAd_gPopHeader.vue'
import gActiveBar from './components/cAd_gActiveBar.vue'

import gWhiteButton from './components/cAd_gWhiteButton.vue'
import gWhiteSelect from './components/cAd_gWhiteSelect.vue'
import gPageTitle from './components/cAd_gPageTitle.vue'
import gSearchBox from './components/cAd_gSearchBox.vue'
import previewPop from './components/cAd_gPreviewPush.vue'
import contentsPop from './components/cAd_gcontentsPop.vue'
import gSelect from './components/cAd_gSelectBox.vue'
import searchResult from './components/cAd_gSearchResult.vue'
import pushDetailTile from './components/cAd_gDetailTitle.vue'
import detailSearchPop from './components/cAd_gDetailSearchPop.vue'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

// import selectGroupPop from './components/cAd_gSelectGroupPop.vue'

// import { axiosServer } from './resource/js/ad_common'

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
app.component('previewPop', previewPop)
app.component('contentsPop', contentsPop)
app.component('searchResult', searchResult)
app.component('detailSearchPop', detailSearchPop)
app.component('pushDetailTile', pushDetailTile)
// app.component('selectGroupPop', selectGroupPop)
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 100000
axios.defaults.baseURL = 'http://192.168.0.3:9090'

// 캐싱 방지
axios.defaults.headers.get['Cache-Control'] = 'no-cache'
axios.defaults.headers.get.Pragma = 'no-cache'

app.config.globalProperties.$axios = axios
// app.prototype.$axiosServer = axiosServer
app.mount('#app')
