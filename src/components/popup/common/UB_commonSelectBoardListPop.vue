<i18n>
{
  "ko": {
    "BOAR_SELECT_MSG_COPY": "게시글을 복사할 게시판을 선택해주세요",
    "BOAR_SELECT_MSG_MOVE": "게시글을 이동할 게시판을 선택해주세요",
    "BOAR_SELECT_MSG_NOBOARD": "게시판을 선택해주세요.",
    "BOAR_SELECT_BTN_MOVE": "이동",
    "BOAR_SELECT_BTN_COPY": "복사"
  },
  "en": {
    "BOAR_SELECT_MSG_COPY": "Please select the board to which you want to copy the post",
    "BOAR_SELECT_MSG_MOVE": "Please select the board to move the post to",
    "BOAR_SELECT_MSG_NOBOARD": "Please select a board.",
    "BOAR_SELECT_BTN_MOVE": "Move",
    "BOAR_SELECT_BTN_COPY": "Copy"
  }
}
</i18n>
<template>
    <div class="selectBoardListPopWrap">
        <div class="selectPopHeader" >
            <p class="font24 commonBlack fontBold fl textLeft mbottom-05">{{ mainText === '이동'? $t('COMMON_BTN_MOVE_POST'):$t('COMMON_BTN_COPY_POST') }}</p>
            <img @click="closeXPop" class="fr closeImg" src="../../../assets/images/common/popup_close.png" alt="">
        </div>
        <p class="font16 textLeft commonBlack fontBold mtop-05 fl mbottom-05">{{ mainText === '이동'? $t('BOAR_SELECT_MSG_MOVE'):$t('BOAR_SELECT_MSG_COPY') }}</p>
        <div class="boardListItem" :style="boardDetail.cabinetKey === value.cabinetKey? 'background: rgb(234 233 233) !important; color: #FFF;': 'background: #FFF;'" @click="selectCabinet(value)" :class="selectedCabinet && selectedCabinet.cabinetKey === value.cabinetKey? 'activeCabinet': ''" :id="'selectBoard' + value.cabinetKey" :fileYn="value.fileYn" :cabinetKey="value.cabinetKey"  v-for="(value, index) in boardList" :key="index">
            <div :style="'background: ' + value.picBgPath"></div>
            <p :style="boardDetail.cabinetKey === value.cabinetKey? 'color: #9d9d9d;': 'color: #303030;'" class="font16 commonBlack fontBold fl">{{$changeText(value.cabinetNameMtext)}}</p>
        </div>
        <div class="boardListPopBtnWrap">
            <gBtnSmall @click="closeXPop" style="" btnThema="light" :btnTitle="$t('COMM_BTN_CANCEL')" />
            <gBtnSmall @click="openConfirmPop" class="mRight05" :btnTitle="mainText === '이동'? $t('BOAR_SELECT_BTN_MOVE'):$t('BOAR_SELECT_BTN_COPY')" />
        </div>
        <gConfirmPop :confirmText="returnConfirmText()" :confirmType="'two'" @no="confirmPopShowYn = false" @ok="confirmOk" v-if="confirmPopShowYn"/>
        <gConfirmPop :confirmText="confirmText" :confirmType="'timeout'" @no="errorPopShowYn = false"  @ok="errorPopShowYn = false" v-if="errorPopShowYn"/>
    </div>
</template>

<script>
export default {
  props: {
    boardDetail: {},
    boardValue: {},
    type: {}
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['UB_HISTORY/hStack']
    },
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  watch: {
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'selectBoardList') {
        this.closeXPop()
      }
    }
  },
  beforeUnmount () {
    this.$checkDeleteHistory('selectBoardList')
  },
  data () {
    return {
      boardList: [],
      currentTeamKey: null,
      selectedCabinet: null,
      mainText: null,
      confirmPopShowYn: false,
      errorPopShowYn: false,
      confirmText: '',
      mSaveFollowerType: '',
      mErrorPopBodyStr: '',
      mErrorPopBtnType: '',
      mErrorPopShowYn: false
    }
  },
  created () {
    this.$addHistoryStack('selectBoardList')

    if (this.type === 'move') {
      this.mainText = '이동'
    } else if (this.type === 'copy') {
      this.mainText = '복사'
    }
    this.getTeamMenuList()
  },
  methods: {
    returnConfirmText () {
      if (this.GE_LOCALE === 'ko') {
        return `해당 게시글을 [${this.$changeText(this.selectedCabinet.cabinetNameMtext)}](으)로<br>${this.mainText} 하시겠습니까?`
      } else {
        if (this.mainText === '이동') {
          return `Are you sure you want to move this post to the [${this.$changeText(this.selectedCabinet.cabinetNameMtext)}]?`
        } else {
          return `Are you sure you want to copy this post to the [${this.$changeText(this.selectedCabinet.cabinetNameMtext)}]?`
        }
      }
    },
    openConfirmPop () {
      if (this.selectedCabinet == null) {
        this.confirmText = this.$t('BOAR_SELECT_MSG_NOBOARD')
        this.errorPopShowYn = true
        return
      }
      this.confirmPopShowYn = true
    },
    confirmOk () {
      this.saveMCabContents()
    },
    closeXPop (value) {
      this.$emit('closeXPop', value)
    },
    selectCabinet (cab) {
      if (this.boardDetail.cabinetKey === cab.cabinetKey) {
        return
      }
      this.selectedCabinet = cab
    },
    async getTeamMenuList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.boardDetail.creTeamKey)
      paramMap.set('currentTeamKey', this.boardDetail.creTeamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', this.GE_USER.userKey)
      var result = await this.$getTeamMenuList(paramMap)
      this.boardList = result
      this.currentTeamKey = this.boardList[0].teamKey
    },
    async saveMCabContents () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.cabinetKey = this.selectedCabinet.cabinetKey
      param.jobkindId = 'BOAR'
      if (this.type === 'move') {
        param.mccKey = this.boardDetail.mccKey
      } else if (this.type === 'copy') {
        param.targetKey = this.boardDetail.contentsKey
      }
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveMCabContents',
        param: { mCabContents: param }
      })
      if (result && result.data && result.data.result) {
        this.confirmPopShowYn = false
        if (this.GE_LOCALE === 'ko') {
          this.confirmText = this.mainText + '되었습니다!'
        } else {
          if (this.mainText === '이동') {
            this.confirmText = 'Post moved successfully.'
          } else {
            this.confirmText = 'Post copied successfully.'
          }
        }
        this.errorPopShowYn = true
        var _this = this
        setTimeout(() => {
          _this.closeXPop(result.data.mCabContents)
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
.selectBoardListPopWrap {
  width: calc(100% - 100px);
  position: absolute;
  left: 50px;
  background:rgb(220, 221, 235);
  min-height: 500px;
  top: 15%;
  padding: 20px;
  padding-top: 0;
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: 0 0 9px 4px #ccc;
  z-index: 999999;
}
.selectPopHeader {
  width: calc(100% + 40px);
  background: #fff;
  margin-left: -20px;
  height: 50px;
  float: left;
  border-bottom: 1px solid #ccc;
  padding: 10px 15px;
}
.activeCabinet {
  background: #6768A750 !important;
}
.closeImg {
  width: 25px;
  margin-top: 5px;
}
.boardListItem {
  width: 100%;
  box-shadow: 0 0 7px 3px #b7b4b440;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 8px;
  float:left;
  min-height: 30px;
}
.boardListItem > div {
  width: 25px;
  margin-right: 10px;
  height: 25px;
  border-radius: 100%;
  float: left;
}
.boardListPopBtnWrap {
  width: 100%;
  min-height: 30px;
  float: left;
}
.mRight05 {
  margin-right: 0.5rem !important;
}
</style>
