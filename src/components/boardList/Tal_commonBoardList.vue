
<template>
  <div id="boardListWrap" class="commonBoardListWrap">
    <template v-for="(board, index) in commonBoardListData" :key="index">
      <div class="commonListContentBox pushMbox" v-if="board.bodyFullStr" >
        <div @click="goDetail(board)" class="pushDetailTopArea">
            <div class="">
              <p class=" font15 fontBold commonBlack">{{resizeText(board.title)}}</p>
            <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
              <!-- <p class="font12 fl lightGray">{{this.changeText(board.nameMtext)}}</p> -->
              <!-- <p class="font12 fl lightGray">{{this.changeText(board.nameMtext)}}{{board.showCreNameYn === 1? '(' + this.$changeText(board.creUserName) + ')': ''}}</p> -->
              <p class="font12 fl lightGray">{{board.showCreNameYn === 1? this.$changeText(board.creUserName): ''}}</p>
              <p class="font12 fr lightGray">{{this.$changeDateFormat(board.creDate)}}</p>
            </div>
        </div>
        <div @click="goDetail(board)" class="font14 mbottom-05 bodyFullStr" v-html="setBodyLength(board.bodyFullStr)"></div>
        <div id="alimCheckArea">
          <div class="alimCheckContents">
            <!-- <div class="pushDetailStickerWrap">
              <div class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in tempAlimList.stickerList " :key="index" >
                <img :src="value.stickerIcon" alt="">
              </div>
            </div> -->

            <!-- <p v-show="board.bodyFullStr.length > 130" class="font16 textRight mbottom-05" style="">더보기></p>
            <div @click="changeAct(userDo, board.contentsKey)"  class="fr userDoWrap" v-for="(userDo, index) in settingUserDo(board.userDoList)" :key="index">
              <template v-if="userDo.doType === 'ST'">
                <img class="fl" style="width: 1.5rem" v-if="userDo.doKey > 0" src="../../assets/images/common/colorStarIcon.svg" alt="">
                <img class="fl" style="width: 1.5rem"  v-else src="../../assets/images/common/starIcon.svg" alt="">
              </template>
              <template v-else-if="userDo.doType === 'LI'">
                <img class="mright-05 fl" style="margin-top: 2px;width: 1.3rem" v-if="userDo.doKey > 0" src="../../assets/images/common/likeIcon.svg" alt="">
                <img class="mright-05 fl" style="margin-top: 3px;width: 1.3rem" v-else src="../../assets/images/common/light_likeIcon.svg" alt="">
              </template>
            </div> -->
          </div>
        </div>
      </div>
    </template>
    <div class="w-100P fl mtop-3" style="position: relative; width:100%; height:60px;">
      <gLoadingS ref="sLoadingBoard" class="fl"/>
    </div>
    <myObserver @triggerIntersected="loadMore" class="fl w-100P"></myObserver>

  </div>
</template>
<script>

export default {
  data: function () {
    return { // 데이터 정의
      mainYn: false,
      boardListWrap: null,
      boardList: {},
      currentScroll: 0
    }
  },
  props: {
    clickEvnt: {},
    commonBoardListData: {}
  },
  components: {

  },
  created () {
    // this.boardList = this.commonBoardListData
  },
  computed: {
  },
  watch: {
    commonBoardListData () {
      this.$refs.sLoadingBoard.hide()
    }
  },
  updated () {
    this.boardListWrap.scrollTop = this.currentScroll
  },
  mounted () {
    this.boardListWrap = document.getElementById('boardListWrap')
    this.boardListWrap.addEventListener('scroll', this.saveScroll)
  },
  unmounted () {
    this.boardListWrap.removeEventListener('scroll', this.saveScroll)
  },
  /* emits: ['goDetail'], */
  methods: {
    resizeText (text) {
      if (text.length > 20) {
        text = text.substr(0, 20)
      }
      return text
    },
    saveScroll () {
      this.currentScroll = this.boardListWrap.scrollTop
      this.$emit('currentScroll', this.currentScroll)
    },

    goDetail (value) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'boardDetail'
      param.contentsKey = value.contentsKey
      param.targetKey = value.contentsKey
      param.value = value
      this.$emit('goDetail', param)
    },
    cutStickerName (value) {
      var cutName = value.substr(0, 1)
      return cutName
    },
    settingUserDo (userDo) {
      // var userDoList = { LI: { doKey: 0 }, ST: { doKey: 0 } }
      var userDoList = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }]
      this.readYn = false
      if (userDo !== undefined && userDo !== null && userDo !== '') {
        for (var i = 0; i < userDo.length; i++) {
          if (userDo[i].doType === 'LI') {
            userDoList[1].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'ST') {
            userDoList[0].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'RE') {
            this.readYn = true
          }
        }
      }
      return userDoList
    },
    /* async changeAct (act, contentsKey) {
      var result = null
      var saveYn = true
      // this.pushDetail = JSON.parse(this.detailVal).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = contentsKey
      if (param.targetKey === null) { return }
      param.doType = act.doType
      if (saveYn === false) {
        param.doKey = act.doKey
        result = await this.$saveUserDo(param, 'delete')
      } else {
        param.actYn = true
        param.targetKind = 'C'
        result = await this.$saveUserDo(param, 'save')
      }
      if (result === true) {
        await this.$emit('refresh')
      }
    }, */
    async loadMore () {
      this.$refs.sLoadingBoard.hide()
      this.$emit('moreList', 10)
      /* const newArr = [
        ...this.commonBoardListData,
        ...resultList.content
      ]
      this.commonBoardListData = newArr */
    },
    setBodyLength (str) {
      // eslint-disable-next-line no-undef
      str = Base64.decode(str)
      // str = atob(str)
      if (str.length > 130) {
        str.substring(0, 130)
      }
      return str
    }
  }
}
</script>
<style scoped>
.bodyFullStr {
  max-height: 400px;
  overflow: hidden;
}
.commonListTr, .commonListTr td, .commonListTr th {height: 4rem; }
.listHeader {text-align: center;}
.listBodyRow{width: calc(100% - 60px);}
.commonBoardListWrap{overflow-y: scroll; width: 100%; overflow-x: hidden; height: calc(100% - 150px);

}

.pushDetailWrap{height: fit-content;}
.pushDetailTopArea{height: 3.0rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 30px; margin-right: 1px;}
.pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.1rem;}

.alimCheckContents{width: 100%;float: right; min-height: 20px;}
.alimCheckContents > img {margin-top: 3px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}
.chanLogoImgWrap {width: 40px; float: left; display: flex; align-items: center; justify-content: center; height: 40px; border-radius: 40px; margin-right: 0.5rem; border: 2px solid #ccc;}
.pushMbox{margin-bottom: 20px;}
.userDoWrap img {width: 1rem;}

.commonListContentBox{
    position: relative;
    width: calc(100% - 1rem);
    margin: 0.5rem 0.5rem;
    float: left;
    border-radius: 0.8rem;
    background-color: #ffffff;
    color: #363c5f;
    padding: 0.8rem 1rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 7px 3px #b7b4b440;
    animation-name: fadein;
    animation-duration: 0.3s;
    }

</style>
