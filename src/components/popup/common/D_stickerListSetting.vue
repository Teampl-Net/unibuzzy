<i18n>
{
  "ko": {
    "STICK_MSG_ADD_LABEL": "라벨을 추가해주세요!"
  },
  "en": {
    "STICK_MSG_ADD_LABEL": "Please add a label!"
  }
}
</i18n>
<template>
  <div ref="layerPopUp" v-if="this.openStickerPopYn" @click="saveUserDoStickerList" @wheel="saveUserDoStickerList" class="w-100P h-100P layerPopUp"></div>
    <div v-if="this.openStickerPopYn" style="width: 70%; max-height: 140px; right: 0; right: 10px; bottom: 20px; background: #fff; border: 2px solid #5F61BD; border-radius: 25px; padding: 10px 20px; position: absolute; z-index: 8;">
      <div class="fl w-100P mbottom-05" style="height: 35px; display: flex; align-items: center;overflow: scroll hidden; border-bottom: 2px solid #ccc;" @wheel="horizontalScroll" id="stickerContList">
        <!-- <template style="" v-for="(value, index) in this.contDetail.D_CONT_USER_STICKER_LIST" :key="index"> -->
        <p v-if="this.mContStickerList.length === 0" class="font14 textLeft fontBold">{{ $t('STICK_MSG_ADD_LABEL') }}</p>
        <template style="" v-for="(value, index) in this.mContStickerList" :key="index">
          <gStickerLine @click="selectStickerFromBox(value)" :pSelecteModeYn="true" :mContStickerList="this.mContStickerList" v-if="value" style="float: left; margin-right: 5px; min-width: 30px;" :pSticker="value" />
        </template>
      </div>
      <div class="fl w-100P mbottom-05" :class="!isMobile? 'thinScrollBar':''" style="height: 35px; display: flex; align-items: center;overflow: auto hidden;" @wheel="horizontalScroll" id="stickerMList">
        <div @click="openStickerDetailPop(mAddStickerObj)" class="cursorP mright-05 fontBold" style="width: 25px; height: 25px; flex-shrink: 0; line-height: 25px; background: #5F61BD; color: #fff; border-radius: 5px;">+</div>
        <template style="float: left; height: 35px; width: calc(100% - 20px);" v-for="(value, index) in this.GE_NON_SELECTED_STICKER_LIST" :key="index" >
          <!-- <gStickerLine v-if="value" :pSmallYn="true" style="float: left; margin-right: 5px; min-width: 30px;" :pSticker="value.sticker" /> -->
          <gStickerLine class="stickerIcon" v-if="value" style="float: left; margin-right: 10px; min-width: 30px; margin-bottom: 0 !important;" :pSticker="value" @click="selectSticker(value)"/>
        </template>
      </div>
      <transition name="showModal">
          <!-- <stickerDetail transition="showModal" @addMSticker="addMSticker" @closeXPop="mAddStickerPopShowYn = false" ref="stickerDetail" v-if="mAddStickerPopShowYn" :pStickerObj="mAddStickerObj" /> -->
        <stickerDetail transition="showModal" @deleteSticker="deleteSticker" @addMSticker="addMSticker" @closeXPop="mAddStickerPopShowYn = false" ref="stickerDetail" v-if="mAddStickerPopShowYn" :pStickerObj="mAddStickerObj" />
      </transition>
      <div @click="openStickerPopSetting" class="fl w-100P commonColor textRight font14 fontBold" style="">MORE ></div>
      <!-- <template style="height: 50px; width: 100%; background: red;" v-for="(value, index) in this.contDetail.D_CONT_USER_STICKER_LIST" :key="index" >
        <gStickerLine v-if="value" :pSmallYn="true" style="float: left; margin-right: 5px; min-width: 30px;" :pSticker="value.sticker" />
      </template> -->
    </div>
</template>

<!-- popId && targetType -->

<script>
import stickerDetail from '../sticker/D_stickerDetailPop.vue'

export default {
  components: {
    stickerDetail
  },
  props: {
    contDetail: {},
    openStickerListYn: {},
    propStickerList: {}
  },
  watch: {
    GE_STICKER_LIST: {
      handler (value, old) {
        this.mStickerList = this.GE_STICKER_LIST
      },
      deep: true
    },
    contDetail: {
      handler (value, old) {
        if (this.contDetail.D_CONT_USER_STICKER_LIST) {
          var stickerList = []
          for (var s = 0; s < this.contDetail.D_CONT_USER_STICKER_LIST.length; s++) {
            if (!this.contDetail.D_CONT_USER_STICKER_LIST[s].sticker) continue
            stickerList.push(this.contDetail.D_CONT_USER_STICKER_LIST[s].sticker)
          }
          this.mContStickerList = stickerList
        }
      },
      deep: true
    }
  },
  data () {
    return {
      popId: null,
      openStickerPopYn: true,
      mContStickerList: [],
      mStickerList: [],
      mAddStickerObj: { picBgPath: '#E57373', nameMtext: '' },
      mAddStickerPopShowYn: false,
      isMobile: /Mobi/i.test(window.navigator.userAgent)
    }
  },
  async created () {
    if (this.contDetail.D_CONT_USER_STICKER_LIST) {
      var stickerList = []
      for (var s = 0; s < this.contDetail.D_CONT_USER_STICKER_LIST.length; s++) {
        if (!this.contDetail.D_CONT_USER_STICKER_LIST[s].sticker) continue
        stickerList.push(this.contDetail.D_CONT_USER_STICKER_LIST[s].sticker)
      }
      this.mContStickerList = stickerList
    }
    this.mStickerList = this.propStickerList
    // var param = {}
    // param.creUserKey = this.GE_USER.userKey
    // var result = await this.$commonAxiosFunction({
    //   url: '/service/tp.getStickerList',
    //   param: param
    // })
    // this.mStickerList = result.data
    // this.getMyStickerList()
    // creDate 말고 저장Date도 있어야. 가장 마지막으로 저장한 라벨이 맨 앞으로 가도록.
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'selectStickerPop' + history.length
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  computed: {
    GE_STICKER_LIST () {
      return this.$store.getters['D_CHANNEL/GE_STICKER_LIST']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_NON_SELECTED_STICKER_LIST () {
      if (this.mContStickerList.length === 0) {
        return this.mStickerList
      }
      var newArr = []
      for (var i = 0; i < this.mStickerList.length; i++) {
        if (this.mContStickerList.findIndex((item) => Number(item.stickerKey) === Number(this.mStickerList[i].stickerKey)) === -1) {
          newArr.push(this.mStickerList[i])
        }
      }
      return newArr
    }
  },
  methods: {
    openStickerPopSetting () {
      var params = {}
      params.targetType = 'stickerPop'
      params.contDetail = this.contDetail
      params.mStickerList = this.mStickerList
      this.$emit('openPop', params)
    },
    async getMyStickerList () {
      var param = {}
      if (this.GE_USER.unknownYn) return
      param.creUserKey = this.GE_USER.userKey
      var result = await this.$commonAxiosFunction({
        url: '/service/tp.getStickerList',
        param: param
      })
      this.mStickerList = result.data
      var index
      for (var i = 0; i < this.mContStickerList.length; i++) {
        index = this.mStickerList.findIndex((item) => Number(item.stickerKey) === Number(this.mContStickerList[i].stickerKey))
        if (index !== -1) {
          this.mStickerList.splice(index, 1)
        }
      }
    },
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ stickerKey }) => stickerKey === current.stickerKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.stickerKey - a.stickerKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    selectStickerFromBox (val) {
      this.selectSticker(val, true)
    },
    async selectSticker (value, delYn) {
      if (delYn) {
        var index = this.mContStickerList.findIndex((item) => Number(item.stickerKey) === Number(value.stickerKey))
        this.mContStickerList.splice(index, 1)
        // this.mStickerList.push(value)
      } else {
        // var StickerIndex = this.mStickerList.findIndex((item) => Number(item.stickerKey) === Number(value.stickerKey))
        // this.mStickerList.splice(StickerIndex, 1)
        this.mContStickerList.unshift(value)
      }
      var params = {}
      params.mContStickerList = this.mContStickerList
      this.$emit('mContStickerList', params)
      // eslint-disable-next-line no-new-object
      var param = new Object()
      var keyList = []
      console.log(this.mContStickerList.length)
      for (var i = 0; i < this.mContStickerList.length; i++) {
        if (!this.mContStickerList[i]) continue
        var stickerKey = this.mContStickerList[i].stickerKey
        console.log(stickerKey)
        keyList.push(stickerKey)
      }
      param.stickerKeyList = keyList
      param.userKey = this.GE_USER_KEY
      param.doType = 'SK'
      param.targetKind = 'C'
      param.targetKey = this.contDetail.contentsKey
      param.creUserKey = this.GE_USER.userKey
      var result = await this.$commonAxiosFunction({
        url: '/service/tp.saveUserDoList',
        param: param
      })
      if (result.data.result) {
        var userDoList = result.data.userDoList
        var contents = this.contDetail
        if (contents.D_CONT_USER_DO) {
          var cUserDoList = contents.D_CONT_USER_DO
          for (var c = cUserDoList.length - 1; c >= 0; c--) {
            if (cUserDoList[c].doType === 'SK') {
              cUserDoList.splice(c, 1)
            }
          }
          if (userDoList.length > 0) {
            cUserDoList = [
              ...cUserDoList,
              ...userDoList
            ]
          }
          contents.userDoList = cUserDoList
          contents.D_CONT_USER_DO = cUserDoList
          contents.D_CONT_USER_STICKER_LIST = userDoList
          await this.$store.commit('D_CHANNEL/MU_REPLACE_CONTENTS_ONLY_USERDO', [contents])
          this.$emit('closeXPop')
        }
      }
    },
    // deleteSticker (sticker) {
    //   console.log(sticker)
    //   var idx = this.mStickerList.findIndex((item) => Number(item.stickerKey) === Number(sticker.stickerKey))
    //   if (idx !== -1) {
    //     this.mStickerList.splice(idx, 1)
    //   }
    // },
    openStickerDetailPop (data) {
      // selectSticker(value)
      this.mAddStickerObj = { picBgPath: '#E57373', nameMtext: '' }
      this.mAddStickerObj.modiYn = false
      console.log(this.mAddStickerObj)
      var params = {}
      params.targetType = 'stickerDetail'
      params.addStickerObj = this.mAddStickerObj
      params.mStickerList = this.mStickerList
      this.$emit('openPop', params)
      // this.mAddStickerPopShowYn = true
    },
    async addMSticker (data) {
      this.mStickerList.unshift(data)
    },
    async saveUserDoStickerList (paramData) {
      this.openStickerPopYn = false
      this.$emit('openStickerPop')
    },
    horizontalScroll (e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 5
      })
    }
  }
}
</script>
<style scoped>
.layerPopUp{
  /* display: none; */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 8;
}
.stickerIcon {
  transform-origin: top;
  animation: stickerIconAni 3s infinite linear;
}

@keyframes stickerIconAni{
  0%, 50%, 100%{
    transform: rotate(0deg);
  }
  5%, 15%, 25%, 35%, 45%, 55%, 65%, 75%, 85%, 95% {
    transform: rotate(4deg);
  }
  10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90% {
    transform: rotate(-4deg);
  }
}
</style>
