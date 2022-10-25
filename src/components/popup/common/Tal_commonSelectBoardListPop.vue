<template>
    <div style="width: calc(100% - 20px); position: absolute; left: 10px; background:rgb(220, 221, 235); min-height: 500px;top: 15%; padding: 20px; padding-top: 0;border-radius: 0.8rem; overflow: hidden; box-shadow: 0 0 9px 4px #ccc;  z-index: 999999;">
        <div class="selectPopHeader" >
            <p class="font24 fontBold fl textLeft mbottom-05">게시글 {{mainText}}</p>
            <img @click="closeXPop" class="fr" style="width: 25px; margin-top: 5px;" src="../../../assets/images/common/popup_close.png" alt="">
        </div>
        <p class="font16 textLeft commonBlack fontBold mtop-05 fl mbottom-05">게시글을 {{mainText}}할 게시판을 선택해주세요</p>
        <div :style="boardDetail.cabinetKey === value.cabinetKey? 'background: rgb(234 233 233) !important; color: #FFF;': 'background: #FFF;'" @click="selectCabinet(value)" :class="selectedCabinet && selectedCabinet.cabinetKey === value.cabinetKey? 'activeCabinet': ''" :id="'selectBoard' + value.cabinetKey" style="width: 100%; box-shadow: 0 0 7px 3px #b7b4b440; padding: 10px; border: 1px solid #ccc; margin-bottom: 10px;border-radius: 8px;float:left; min-height: 30px;" :fileYn="value.fileYn" :cabinetKey="value.cabinetKey"  v-for="(value, index) in boardList" :key="index">
            <div style="width: 25px; margin-right: 10px; height: 25px; border-radius: 100%; float: left;" :style="'background: ' + value.picBgPath"></div>
            <p :style="boardDetail.cabinetKey === value.cabinetKey? 'color: #9d9d9d;': 'color: #303030;'" class="font16 commonBlack fontBold fl">{{this.$changeText(value.cabinetNameMtext)}}</p>
        </div>
        <div style="width: 100%; min-height: 30px; float: left;">
            <gBtnSmall @click="closeXPop" style="" btnThema="light" btnTitle="취소" />
            <gBtnSmall @click="openConfirmPop" style="margin-right: 0.5rem;" :btnTitle="mainText" />
        </div>
        <gConfirmPop :confirmText="' 해당 게시글을 ' + '[' + this.$changeText(selectedCabinet.cabinetNameMtext) + '](으)로<br>' + mainText +'하시겠습니까?'" :confirmType="'two'" @no="confirmPopShowYn = false" @ok="confirmOk" v-if="confirmPopShowYn"/>
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
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  data () {
    return {
      boardList: [],
      currentTeamKey: null,
      selectedCabinet: null,
      mainText: null,
      confirmPopShowYn: false,
      errorPopShowYn: false,
      confirmText: ''
    }
  },
  created () {
    if (this.type === 'move') {
      this.mainText = '이동'
    } else if (this.type === 'copy') {
      this.mainText = '복사'
    }
    // console.log(this.boardDetail)
    // console.log(this.boardValue)
    this.getTeamMenuList()
  },
  methods: {
    openConfirmPop () {
      if (this.selectedCabinet == null) {
        this.confirmText = '게시판을 선택해주세요'
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
      // console.log(result)
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
        url: 'service//tp.saveMCabContents',
        param: { mCabContents: param }
      })
      // console.log(result)
      if (result.data.result) {
        this.confirmPopShowYn = false
        this.confirmText = this.mainText + '되었습니다!'
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
.selectPopHeader {
    width: calc(100% + 40px); background: #fff; margin-left: -20px; height: 50px; float:left; border-bottom: 1px solid #ccc; padding: 10px 15px;
}
.activeCabinet {background: #6768A750!important;}
</style>
