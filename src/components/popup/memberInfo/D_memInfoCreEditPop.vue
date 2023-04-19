<template>
  <div @click="backClick" style="width: 100%; height: 100%; background: #00000026;top: 0; left: 0; z-index: 99; position: fixed;"></div>
  <div class=" fl" style="width: calc(100% - 40px); height: 500px; position: fixed; left: 20px; box-shadow: 0 0 4px 4px rgb(0 0 0 / 5%) 0px 0px 4px 4px; border-radius: 0.8rem; top: 20%; z-index: 99; background: #FFF;">
    <div style="width: 100%; height: 50px; position: relative; padding: 10px 20px; float: left; border-bottom: 2px solid #6768a7;">
        <p class="fontLeft fl fontBold font18 commonColor">멤버정보 수정</p>
        <img class="cursorP" src="../../../assets/images/common/popup_close.png" @click="backClick" style="position: absolute; top: 15px; right: 20px; width: 20px;" alt="">
    </div>
    <div class="pSide-15 fl w-100P">
        <div class="queInfoRow fl ">
            <p class="fontBold  textLeft font16 fr" style="width: 60px; line-height: 30px;">정보명</p>
            <div style="display: flex; float: left; width: calc(100% - 60px); height: 100%; min-height: 30px;">
                <input class="fl" style="width: calc(100% - 150px);" v-model="InfoQueTitle" type="text" placeholder="멤버 정보 명을 입력해주세요." id="channelName">
                <div style="width: calc(150px); height: 100%; min-height: 30px;">
                    <gCheckBtn style="width: calc(50% - 10px); min-width: 65px;" class="mleft-05 fl" title='주관식' :selectedYn='mSelectedItemType === "T"' @click="mSelectedItemType = 'T'" />
                    <gCheckBtn style="width: calc(50% - 10px); min-width: 65px;" class="mleft-05 fl" title='객관식' :selectedYn='mSelectedItemType === "F"' @click="mSelectedItemType = 'F'" />
                </div>
            </div>
        </div>
            <!-- <div class="queInfoRow fl ">
            <p class="fontBold  textLeft font16 fr" style="width: 60px; line-height: 30px;">설명</p>
            <div style="display: flex; float: left; width: calc(100% - 60px); height: 100%; min-height: 30px;">
                <input type="text" style="width: 100%; padding: 0 10px;">
            </div>
            </div> -->

            <!-- <div class="queInfoRow fl ">
            <p class="fontBold  textLeft font16 fr" style="width: 100px;">유형</p>
            <select class="fr commonBlack" v-model="mSelectedItemType" @change="changeOption" style="border: 1px solid #ccc; width: calc(100%); min-height:30px;" >
                <option v-for="(answer, index) in options" :key="index" @click="selectOption = answer.InfoQueType" :value="answer.InfoQueType" class="fl w-100P" style="display: flex; align-items: center; padding-bottom:0.5rem"> {{ answer.title }} </option>
            </select>
            </div> -->

        <tempDotline class="fl" style="border: 1px dashed #cccccc90; width:100%; height:1px;" />

        <div class="fl w-100P mtop-1" style="">

        <template v-if="mSelectedItemType === 'T'">
            <div class="fl wh-100P" style="display: flex;">
            <!-- <p class="fl font16 commonColr textLeft fontBold h-100P" style="flex:2">제시글</p> -->
            <div class="fl h-100P" style="flex:3">
                <gCheckBtn class="fl mtop-05" title='숫자만 허용' :selectedYn='onlyNumYn === true' @click="onlyNumYn = !onlyNumYn" />
                <!-- <input class="fr" style="min-height:30px; background: #CCCCCC50 !important; width:100%; max-width:300px; " type="text" disabled :placeholder="InfoQueTitle"> -->
                <div class="fl w-50P mtop-05 mleft-05 " style="width: calc(100% - 110px);">
                <gCheckBtn class="fl" title='글자수 최대' :selectedYn='maxLengthYn === true' @click="maxLengthYn = !maxLengthYn" />
                <input type="number" max="255" class="fl" v-show="maxLengthYn === true" style="width: calc(100% - 120px); min-height:30px; min-width:30px; margin-left: 10px;" v-model="maxLength">
                </div>
            </div>
            </div>
        </template>

        <template v-if="mSelectedItemType === 'F' || mSelectedItemType === 'L'">
            <div class="fl wh-100P h-100P" style="">
            <p class="fl font16 w-100P commonColr textLeft fontBold mbottom-05  h-100P" style="">선택항</p>

            <div class="fl w-100P" style="height: 260px; padding-right: 8px; overflow: hidden scroll; ">
                <draggable class="ghostClass" :v-model="answerList" ghost-class="ghost" :dragging="dragging" @end="endDragList" delay="200" handle=".movePoint">
                    <transition-group>
                        <div class="memberInfoListRow fr w-100P  mbottom-05" :listIndex="index" v-for="(list, index) in answerList" :key='index' >
                            <input class="fl" type="text" style="min-height:30px; width: calc(100% - 90px); max-width:300px; " v-model="list.answerName">

                            <div class="fl mleft-05" style="width:60px; height: 30px; align-items: center; display:flex; ">
                                <div style="margin-right: 5px; width: 20px; margin-left: 5px; height: 20px; border: 1px solid #5F61BD; border-radius: 100%; display: flex; justify-content: center; align-items: center;">
                                    <p class="fl img-w20 commonColor cursorP" style="height: 20px; margin-bottom: 12px;"  @click="addInfo(index)">+</p>
                                </div>
                                <div style="margin-right: 10px; width: 20px; margin-left: 5px; height: 20px; border: 1px solid #5F61BD; border-radius: 100%; display: flex; justify-content: center; align-items: center;">
                                    <p class="fl img-w20 commonColor cursorP" style="height: 20px; margin-bottom: 12px;"  @click="deleteInfoQue(index)">-</p>
                                </div>
                                <div class="f movePoint cursorP" style="width: 30px; margin-left: 8px; height: 100%; display: flex; align-items: center; background: rgba(255, 255, 255, 0.75); ">
                                    <img src="../../../assets/images/formEditor/icon_formEdit_movePointer.svg" class="img-w15" style="flex-shrink: 0; flex-grow: 0" alt="">
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </draggable>
                <!-- <div class="fl w-100P mtop-1">
                <gBtnSmall :btnTitle="'추가'" @click="addInfo" class="mright-05" style="float:right !important;"/>
                </div> -->
            </div>

            </div>
        </template>

        </div>
        <div class="w-100P" style="position: absolute; left:0; bottom:0; min-height:50px; display: flex; align-items: center; justify-content: center; border-top: 1px solid #ccc;">
            <gBtnSmall :btnTitle="'저장'" @click="saveMemberTypeItem" class="mright-05" style=""/>
            <gBtnSmall :btnTitle="'닫기'" btnThema="light" @click="closeXPop" class="mleft-05" style=""/>
        </div>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  components: {
    draggable: VueDraggableNext
  },
  props: {
    propData: {}
  },
  data () {
    return {
      mSelectedItemType: 'T',
      options: [{ title: '주관식', InfoQueType: 'T' }, { title: '객관식(드롭다운)', InfoQueType: 'F' }, { title: '객관식(리스트)', InfoQueType: 'L' }],
      answerList: [{ answerName: '' }],
      answerTitle: '',
      InfoQueTitle: { type: String, default: '' },
      maxLengthYn: '',
      maxLength: 10,
      onlyNumYn: '',
      mPopId: null
    }
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    this.mPopId = 'editMemberItemPop' + this.propData.selectedMemberType.memberTypeKey
    // console.log(history)
    history.push(this.mPopId)
    this.$store.commit('D_HISTORY/updateStack', history)

    if (this.propData && this.propData.selectedMemberType) {
      this.settingMemberItem(this.propData.selectedMemberType)
    }
    // this.$showToastPop('현재 테스트 화면이며, 작동되지 않습니다. 추후 업데이트를 기다려주세요!')
  },
  methods: {
    endDragList (list) {
      console.log(this.answerList)
      // eslint-disable-next-line no-debugger
      debugger
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      console.log(this.mPopId + '||' + hStack[hStack.length - 1])
      if (this.mPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.closeXPop()
      } else {

      }
    },
    settingMemberItem (data) {
      this.mSelectedItemType = data.itemType
      this.InfoQueTitle = this.$changeText(data.itemNameMtext)
      if (data.maxLen) {
        this.maxLengthYn = true
        this.maxLength = data.maxLen
      }
      if (data.numberYn || data.numberYn === 1) {
        this.onlyNumYn = true
      }
      if (data.optListStr) {
        // eslint-disable-next-line no-debugger
        debugger
        var objList = data.optListStr.split('$#$')
        this.answerList = []
        for (var i = 0; i < objList.length; i++) {
          if (objList[i].trim() === '') continue
          this.answerList.push({ answerName: objList[i] })
        }
      }
    },
    addInfo (index) {
      var temp = {}
      temp.answerName = ''
      if (!this.answerList) this.answerList = []
      this.answerList.splice(index + 1, 0, temp)
    },
    deleteInfoQue (idx) {
      this.answerList.splice(idx, 1)
    },
    checkData () {
      var passYn = true
      if (this.InfoQueTitle === undefined || this.InfoQueTitle === null || this.InfoQueTitle === '') {
        this.$showToastPop('질문을 입력해주세요')
        passYn = false
      }
      if (this.mSelectedItemType === undefined || this.mSelectedItemType === null || this.mSelectedItemType === '') {
        this.$showToastPop('질문의 유형을 선택해주세요.')
        passYn = false
      }
      return passYn
    },
    async saveMemberTypeItem () {
      if (await this.checkData() === false) return

      var param = null
      param = this.propData.selectedMemberType
      console.log(param)
      param.itemNameMtext = 'KO$^$' + this.InfoQueTitle
      param.itemType = this.mSelectedItemType
      if (this.mSelectedItemType === 'T') {
        param.maxLen = this.maxLengthYn
        if (this.maxLengthYn === true) param.maxLen = this.maxLength
        param.numberYn = this.onlyNumYn
      } else {
        // eslint-disable-next-line no-debugger
        debugger
        // eslint-disable-next-line no-unused-vars
        var selectListStr = ''
        var dragItemList = document.getElementsByClassName('memberInfoListRow')
        // eslint-disable-next-line no-debugger
        debugger
        var saveList = []
        for (var i = 0; i < dragItemList.length; i++) {
          saveList.push(this.answerList[Number(dragItemList[i].attributes.listindex.value)])
        }
        for (var s = 0; s < saveList.length; s++) {
          if (i === 0) {
            selectListStr += (saveList[s].answerName)
          } else {
            selectListStr += ('$#$' + saveList[s].answerName)
          }
        }
        param.optListStr = selectListStr
      }
      this.$emit('changeMemberItem', param)
      /* var saveItem = await this.$commonAxiosFunction({
        url: 'service/tp.saveMemberTypeItem',
        param: { member: param }
      }) */
      // console.log(saveItem)
      // eslint-disable-next-line no-debugger
      debugger
      // this.$emit('saveMemInfoQuestion', param)

      this.$emit('closeXPop', true)
    },
    closeXPop () {
      this.$emit('closeXPop')
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  }

}
</script>

<style>
.queInfoRow {
  width: 100%;
  min-height: 30px;
  display: flex;
  padding: 0.8rem 0;
  align-items: flex-start;
}

.queInfoRow input {
  background: #fff !important;
  min-height: 30px !important;
  height: 100% !important;
  border: 1px solid #BEBBD4 !important;
  border-radius: 8px !important;
  padding-left : 10px;
  color: #505050;
}
.itemTypeBtn {margin-left: 10px; display: flex; justify-content: center; align-items: center; float: left; width: calc(50% - 10px); min-height: 30px; height: 100%; border-radius: 8px; border: 1px solid #9C9C9C ;background-color: #F8F8FF;}
.itemTypeBtn img {
    width: 15px!important;
    margin-right: 5px;
}
.queInfoRow input::placeholder {
  color: #BDBDBD;
}
</style>
