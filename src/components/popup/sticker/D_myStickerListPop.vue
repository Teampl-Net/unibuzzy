<i18n>
{
  "ko": {
    "STICK_NAME_SET": "라벨 설정",
    "STICK_TITLE_LIST": "라벨 목록",
    "STICK_MSG_EDIT": "라벨을 클릭해 이름/색깔을 수정하거나 삭제하세요!",
    "STICK_MSG_NOLABEL": "선택가능한 분류가 없습니다. <br>분류를 추가해주세요!"
  },
  "en": {
    "STICK_NAME_SET": "Set Labels",
    "STICK_TITLE_LIST": "Label List",
    "STICK_MSG_EDIT": "Click on the label to edit or delete the name/color!",
    "STICK_MSG_NOLABEL": "There are no label available to select. <br>Please add a label!"
  }
}
</i18n>
<template>
  <div  style="width: calc(100% - 40px); position: absolute; left: 20px; top: 30%; z-index: 9; min-height: 200px; max-height: 40%; border-radius: 0.8rem; border: 1px solid #ccc; background: #FFF; ">
    <div class="newHeaderLine" style="width: 100%; padding: 10px 20px; display: flex; align-items: center; position: relative; height: 50px;">
        <p class="fl font20 commonColor fontBold">{{ $t('STICK_NAME_SET') }}</p>
        <img @click="backClick" class="cursorP" src="../../../assets/images/common/popup_close.png" style="width: 20px; position: absolute; right: 15px; top: 15px;" alt="">
    </div>
    <div class="okScrollBar thinScrollBar" style="width: 100%; overflow: hidden auto;  height: calc(100% - 110px); padding: 10px 0; padding-right: 10px;">
        <!-- <p class="font16 fontBold textLeft commonColor " style="padding: 0 20px;" >대상</p> -->
        <!-- <div style="width: 100%; min-height: 50px; float: left; padding: 0 20px;">
            <gContentsBox @selectSticker="selectStickerFromBox" :propJustShowYn="true" class="cursorP mbottom-1" style="" :contentsEle="pContentsEle" :propPreStickerList="mContStickerList"/>
        </div> -->
        <div style="width: 100%; min-height: 50px; float: left; position: relative;">
            <div style="width: 100%; min-height: 20px;" class="mtop-1">
              <p class="font16 fontBold commonColor textLeft  fl " style="padding-left: 20px;">{{ $t('STICK_TITLE_LIST') }}</p>
              <div @click="openStickerDetailPop(mAddStickerObj, true)" class="cursorP font14" style="color: #FFF; line-height: 24px; float: right; background: #AEB0FB; border-radius: 6px; min-width: 25px; height: 24px; padding: 0 5px; margin-right: 5px;">+</div>
            </div>
            <p class="font14 textLeft fontBold commonGray mbottom-05 fl w-100P" style="line-height: 24px; padding-left: 20px;">{{ $t('STICK_MSG_EDIT') }}</p>
            <!-- <div class="thinScrollBar" style="width: calc(100% - 40px); overflow: auto hidden; margin: 10px 20px; display: flex; align-items: center;" id="stickerListWrap" @wheel="horizontalScroll"> -->
            <div class="thinScrollBar" style="width: calc(100% - 40px); max-height: 125px; overflow: hidden auto; margin: 10px 20px; display: flex; align-items: center; flex-wrap: wrap; padding: 5px;" id="stickerListWrap">
                <!-- <div class="cursorP" @click="openAddStickerPop" style="width: 50px; margin-right: 10px;display: flex; align-items: center; justify-content: center; font-size: 20px; height: 50px; border-radius: 100%; float: left; border:1px solid #ccc;"> + </div> -->
                <p v-if="this.mStickerList.length === 0" class="font12 textLeft fontBold">{{ $t('STICK_MSG_NOLABEL') }}</p>
                <gStickerLine :pSmallYn="true" class="cursorP stickerIcon cursorHover" @click="openStickerDetailPop(value, false)" style="margin-right: 5px;" v-for="(value) in this.mStickerList" :pSticker="value" :key="value.stickerKey" />
            </div>
        </div>
        <!-- <manageMySticker v-if="this.mStickerList" :pMyStickerList="this.mStickerList"/> -->
        <div v-if="mAddStickerPopShowYn" @click="this.$refs.stickerDetail.backClick()" style="width: 100%; height: 100%; left: 0; top: 0; position: absolute; z-index: 10; background: #00000026;"></div>
        <transition name="showModal">
            <stickerDetail @deleteSticker="deleteSticker" transition="showModal" @addMSticker="addMSticker" @closeXPop="mAddStickerPopShowYn = false" ref="stickerDetail" v-if="mAddStickerPopShowYn" :pStickerList="this.mStickerList" :pStickerObj="mAddStickerObj" />
        </transition>
    </div>
    <div style="display: flex; align-items: center; justify-content: center;width: 100%; height: 60px; float: left">
        <gBtnSmall @click="saveUserDoStickerList" btnTitle="저장" class="mright-05"/>
        <gBtnSmall @click="backClick" btnThema="light" btnTitle="취소"/>
    </div>
  </div>
</template>

<script>
/* import manageMySticker from './D_manageMySticker.vue' */
import stickerDetail from './D_stickerDetailPop.vue'
export default {
  components: {
    stickerDetail
    /* manageMySticker */
  },
  props: {
    pContentsEle: {},
    propStickerList: {}
  },
  computed: {
    GE_STICKER_LIST () {
      return this.$store.getters['D_CHANNEL/GE_STICKER_LIST']
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
    },
    stickerBoxScrollWidth () {
      var stickerListLength = this.mStickerList.length
      return {
        '--width': (stickerListLength * 80 + 10) + 'px'
      }
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    GE_STICKER_LIST: {
      handler (value, old) {
        if (this.GE_STICKER_LIST.length !== 0) {
          this.mStickerList = this.GE_STICKER_LIST
        }
      },
      deep: true
    },
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  },
  data () {
    return {
      mStickerList: [],
      mContStickerList: [],
      mAddStickerPopShowYn: false,
      modiStickerObj: {},
      mSelectedColor: '#E57373',
      mAddStickerObj: { picBgPath: '#E57373', nameMtext: '' },
      mConfirmText: '추가하시겠습니까?',
      mConfirmType: 'timeout',
      mConfirmPopShowYn: false,
      popId: null,
      addStickerPopId: null,
      isMobile: /Mobi/i.test(window.navigator.userAgent),
      mManagingMode: false
    }
  },
  created () {
    if (this.pContentsEle) {
      if (this.pContentsEle.D_CONT_USER_STICKER_LIST) {
        var stickerList = []
        for (var s = 0; s < this.pContentsEle.D_CONT_USER_STICKER_LIST.length; s++) {
          if (!this.pContentsEle.D_CONT_USER_STICKER_LIST[s].sticker) continue
          stickerList.push(this.pContentsEle.D_CONT_USER_STICKER_LIST[s].sticker)
        }
        this.mContStickerList = this.replaceArr(stickerList)
      }
    }
    this.mStickerList = this.propStickerList
    // this.getMyStickerList()
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'selectStickerPop' + history.length
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  methods: {
    horizontalScroll (e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 10
      })
    },
    deleteSticker (sticker) {
      var idx = this.mStickerList.findIndex((item) => Number(item.stickerKey) === Number(sticker.stickerKey))
      if (idx !== -1) {
        this.mStickerList.splice(idx, 1)
        this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', this.mStickerList)
      }
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.$emit('closeXPop')
      }
    },
    replaceArr (arr) {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => Number(item.stickerKey) === Number(current.stickerKey)) === -1) {
        /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
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
      console.log(val)
      this.selectSticker(val, true)
    },
    openStickerDetailPop (data, newYn) {
      // selectSticker(value)
      if (newYn === false) {
        this.mAddStickerObj = data
        this.mAddStickerObj.nameMtext = this.$changeText(this.mAddStickerObj.nameMtext)
        this.mAddStickerObj.modiYn = true
      } else {
        this.mAddStickerObj = { picBgPath: '#E57373', nameMtext: '' }
      }
      this.mAddStickerPopShowYn = true
    },
    selectSticker (value, delYn) {
      // eslint-disable-next-line no-debugger
      if (delYn) {
        var index = this.mContStickerList.findIndex((item) => Number(item.stickerKey) === Number(value.stickerKey))
        this.mContStickerList.splice(index, 1)
      } else {
        /* if (this.mContStickerList.length > 1) {
          this.mConfirmText = '분류는 최대 2개까지 설정할 수 있습니다.'
          this.mConfirmType = 'timeout'
          this.mConfirmPopShowYn = true
          return
        } */
        this.mContStickerList.push(value)
      }
      console.log(this.mContStickerList)
    },
    closeXPop () {
      this.$emit('closeXPop')
    },
    // async getMyStickerList () {
    //   var param = {}
    //   param.creUserKey = this.GE_USER.userKey
    //   var result = await this.$commonAxiosFunction({
    //     url: '/sUniB/tp.getStickerList',
    //     param: param
    //   })
    //   this.mStickerList = result.data
    // },
    addMSticker (data) {
      this.mStickerList.unshift(data)
    },
    async saveUserDoStickerList (paramData) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      var keyList = []
      for (var i = 0; i < this.mContStickerList.length; i++) {
        if (!this.mContStickerList[i]) continue
        var stickerKey = this.mContStickerList[i].stickerKey
        keyList.push(stickerKey)
      }
      param.stickerKeyList = keyList
      param.userKey = this.GE_USER_KEY
      param.doType = 'SK'
      param.targetKind = 'C'
      param.targetKey = this.pContentsEle.contentsKey
      param.creUserKey = this.GE_USER.userKey
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveUserDoList',
        param: param
      })
      /* this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.cDetail]) */
      /* this.mConfirmPopShowYn = false */
      if (result.data.result) {
        // eslint-disable-next-line no-debugger
        debugger
        var userDoList = result.data.userDoList
        var contents = this.pContentsEle
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
          this.backClick()
          // this.$emit('closeXPop')
        }
      }
    }
  }
}
</script>

<style scoped>
/* .cursorHover :hover {
    border: 2px solid #ccc;
    box-shadow: 0 0 4px 4px #00000020!important;
} */

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
