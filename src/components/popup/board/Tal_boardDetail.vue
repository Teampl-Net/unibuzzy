<template>
  <div v-if="loadYn" class="boardDetailWrap">
    <manageStickerPop :stickerList="userDoStickerList" v-if="this.manageStickerPopShowYn" @closePop="this.manageStickerPopShowYn = false"/>
    <!-- <div>{{pushKey}}</div> -->

    <div class="pagePaddingWrap root mtop-1 overflowYScroll">
      <div class="content pushMbox" v-for="(alim, index) in alimDetail" :key="index">
        <div class="pushDetailTopArea">
          <div class="pushDetailHeaderTextArea">
            <p class=" font18 fontBold commonColor">{{alim.title}}</p>
          <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
            <p class="font12 fl lightGray">{{alim.showCreNameYn === 1? this.$changeText(alim.creUserName) : ''}}</p>
            <p class="font12 fr lightGray">{{this.$changeDateFormat(alim.creDate)}}</p>
          </div>
        </div>
        <div  class="font15 mbottom-2" v-html="decodeContents(alim.bodyFullStr)"></div>

        <div id="alimCheckArea">
          <div class="alimCheckContents">
            <!-- <img class="fl" src="../../../assets/images/push/attatchStickerIcon.svg" alt=""  @click="this.manageStickerPopShowYn = true">
            <div class="pushDetailStickerWrap">
              <div  v-longclick="() => changeStickerEditMode()" class="stickerDiv" :style="'background-color:' + value.picBgPath" v-for="(value, index) in this.userDoStickerList " :key="index" >
                <img :src="value.picPath" alt="">
              </div>
            </div> -->

            <div @click="changeAct(userDo, alim.contentsKey)"  class="fl" v-for="(userDo, index) in this.userDoList" :key="index">
              <template v-if="userDo.doType === 'ST'">
                <img class="mright-05 fl" v-if="userDo.doKey > 0" src="../../../assets/images/common/colorStarIcon.svg" alt="">
                <img class="mright-05 fl" v-else src="../../../assets/images/common/starIcon.svg" alt="">
              </template>
              <template v-else-if="userDo.doType === 'LI'">
                <img class="mright-05 fl" style="margin-top: 4px;" v-if="userDo.doKey > 0" src="../../../assets/images/common/likeIcon.svg" alt="">
                <img class="mright-05 fl" style="margin-top: 5px;" v-else src="../../../assets/images/common/light_likeIcon.svg" alt="">
              </template>
            </div>

          </div>
          <div style="width: 100%; height: 50px; padding: 10px 0; border-bottom: 1.5px dashed #ccc; float: left;">
            <gBtnSmall btnTitle="댓글 쓰기" @click="this.memoShowYn = true"/>
          </div>
          <div style="width: 100%; min-height: 100px; float: left;">
            <gMemoList :memoList="memoList" @deleteMemo='deleteMemo' @editTrue='getMemoList' @mememo='writeMememo' />
          </div>
        </div>
        <!-- <div  class="font15"> {{this.alimDetail.creDate}}</div> -->
        <!-- <div> -->
          <!-- <gBtnSmall class="mr-04 gBtnSmall addClick_popupClick.test()_addClick" btnTitle="상세보기" /> -->
          <!-- <gBtnSmall  class="mr-04 gBtnSmall"  btnTitle="링크열기" /> -->
        <!-- </div> -->

      </div>
    </div>
    <div v-if="memoShowYn" style="width: 100vw; height: 100vh; background: #00000036; position: fixed; top: 0; left: 0; " @click="this.memoShowYn = false"></div>
    <transition name="showMemoPop">
      <gMemoPop transition="showMemoPop" :style="getWindowSize"  v-if="memoShowYn" @saveMemoText="saveMemo" />
    </transition>
    <gConfirmPop :confirmText='confirmText' confirmType='timeout' v-if="confirmPopShowYn" @no='confirmPopShowYn=false' />
  </div>
</template>
<script>
/* eslint-disable */
// eslint-disable-next-line
import manageStickerPop from '../Tal_manageStickerPop.vue'
export default {
  data () {
    return {
      memoList: [],
      confirmText: '',
      confirmPopShowYn: false,
      memoShowYn: false,
      loadYn: true,
      alimDetail: [{ title: '안녕하세요.', nameMtext: 'KO$^$팀플', bodyFullStr: ' 저는 정재준입니다. ', creDate: '2022-06-02 10:30' }],
      manageStickerPopShowYn: false,
      tempAlimList: {
        readYn: false,
        stickerList: [
          { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#ffc1075e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
          { stickerName: '온라인 쇼핑몰', stickerKey: '1', stickerColor: '#0dcaf05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
          { stickerName: '공연 및 예술', stickerKey: '2', stickerColor: '#0d61f05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' }
        ]
      },
      userDoList: [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }],
      userDoStickerList: [],

      memeoValue:{}

    }
  },
  props: {
    detailVal: {}
  },
  components: {
    manageStickerPop
  },
  async created() {
    // this.alimDetail = this.detailVal
    await this.getContentsList()
    await this.getMemoList()
    /* if (this.alimDetail) {} else {
      this.alimDetail = {
        teamName: '',
        creDate: '0',
        bodyFullStr: '오류입니다.'
      }
    } */
  },
  computed: {
    getWindowSize () {
      return {
        '--widndowHeight': window.innerHeight + 'px'
      }
    }
  },
  methods: {
    writeMememo (memo) {
      console.log(memo)
      var data = {}
      // data.targetKey = memo.memoKey
      // data.targetKind = 'M' //
      // data.toUserKey = memo.memoKey //대댓글때 사용하는것임
      data.parentMemoKey = memo.memoKey //대댓글때 사용하는것임
      // data.creMemoKey = memo.memoKey //대댓글때 사용하는것임
      // data.toMemoKey = memo.memoKey //대댓글때 사용하는것임
      // data.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      // data.creUserName = JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext
      this.mememoValue = data
      this.memoShowYn = true
      console.log(this.mememoValue)
    },
    async deleteMemo (param) {
      console.log(param);
      var memo = {}
      memo.memoKey = param.memoKey
      var result = await this.$commonAxiosFunction({
        url: '/tp.deleteMemo',
        param: memo
      })
      if(result.data.result == true){
        this.memoList = []
        await this.getMemoList()
      }
    },
    async getMemoList () {
      var memo = new Object()
      memo.targetKind = 'C'
      memo.targetKey = this.alimDetail[0].contentsKey
      var result = await this.$commonAxiosFunction({
        url: '/tp.getMemoList',
        param: memo
      })
      if(result.data.content) {
        this.memoList = result.data.content
      }

    },
    async saveMemo (text) {
      var memo = new Object()
      if(this.memeoValue !== null && this.memeoValue !== '' && this.memeoValue !== undefined ){
        memo = this.mememoValue
      }
      memo.bodyFullStr = text
      /* memo.bodyFilekey  */
      memo.targetKind = 'C'
      memo.targetKey = this.alimDetail[0].contentsKey
      // memo.toUserKey = this.alimDetail[0].creUserKey 대댓글때 사용하는것임
      memo.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      memo.creUserName = JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext

      console.log(memo);

      var result = await this.$commonAxiosFunction({
        url: '/tp.saveMemo',
        param: {memo: memo}
      })
      if(result.data.result === true || result.data.result === 'true') {
        /* this.confirmText = '댓글 저장 성공'
        this.confirmPopShowYn = true */
        this.memoShowYn = false
        await this.getMemoList()
      }
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    },
    async getContentsList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // param.baseContentsKey = this.detailVal.targetKey
      param.contentsKey = this.detailVal.targetKey
      param.jobkindId = 'BOAR'
      var resultList = await this.$getContentsList(param)
      this.alimDetail = resultList.content
      var userDoList = resultList.content[0].userDoList
      await this.settingUserDo(userDoList)
      // console.log(this.alimDetail)
      this.$emit('closeLoading')
    },
    settingUserDo (userDo) {
      // var userDoList = { LI: { doKey: 0 }, ST: { doKey: 0 } }
      this.readYn = false
      if (userDo !== undefined && userDo !== null && userDo !== '') {
        // eslint-disable-next-line no-array-constructor
        this.userDoStickerList = new Array()
        for (var i = 0; i < userDo.length; i++) {
          if (userDo[i].doType === 'LI') {
            this.userDoList[1].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'ST') {
            this.userDoList[0].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'RE') {
            this.readYn = true
          }
          if (userDo[i].doType === 'SK') {
            this.userDoStickerList.push(userDo[i].sticker)
          }
        }
      }
    },
    async changeAct (act, contentsKey) {
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
        await this.getContentsList()
        this.loadYn = false
        this.loadYn = true
      }
    },
    goChanDetail (alim) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      // eslint-disable-next-line no-new-object
      var value = new Object()
      params.targetType = 'chanDetail'
      params.targetKey = alim.creTeamKey
      value.nameMtext = alim.nameMtext
      params.value = value
      // params.chanName = value.chanName
      // params.value = value
      this.$emit('openPop', params)

      // this.$router.replace({ name: 'subsDetail', params: { chanKey: idx } })
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      return changeTxt
      // if (changeTxt !== undefined) { return changeTxt }
    }
  }
}
</script>
<style scoped>
.pagePaddingWrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 0;
}
.boardDetailWrap{height: fit-content; z-index: 99999; width: 100%; height: 100%; padding-top: 70px; width: 100vw; background: rgb(236, 230, 204); height: calc(100vh);}
.pushDetailTopArea{height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 50px;height: 50px;}
/* .pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.2rem;} */
.pushDetailHeaderTextArea{width: 100%; cursor: pointer; float: left;margin-top: 0.2rem;}

#alimCheckArea{min-height: 35px;}
.alimCheckContents{width: 100%;float: right; height: 30px;}
.alimCheckContents > img {margin-top: 3px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}

.pushMbox{margin-bottom: 20px;}

.menuHeader {padding-top:0.5rem; top: 0rem; left: 0; width: 100%; height: 50px; border-bottom: 1px solid #fff;}
.menuHeader p{font-size: 16px; text-align: center; line-height: 2.5rem;}
.menuHeader img{ width: 0.8rem; line-height: 50px;}


.pushMbox{margin-bottom: 20px;}

  .content {
      position: relative;
      width: 100%;
      margin: auto;
      border-radius: 0.8rem;
      background-color: #ffffff;
      color: #363c5f;
      padding: 1.5rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%  , 0 100%);
  }

  .content ::after {
      content: '';
      position: absolute;
      display: block;
      width: 30px;
      height: 30px;
      background-color: #e1e1f2;
      bottom: 0;
      right: 0;
  }


.showMemoPop-enter {animation: showMemoPop-dialog-fade-in 0.2s ease;}
.showMemoPop-leave {animation: showMemoPop-dialog-fade-out 0.2s ease forwards;}
.showMemoPop-enter-active {animation: showMemoPop-dialog-fade-in 0.2s ease;}
.showMemoPop-leave-active {animation: showMemoPop-dialog-fade-out 0.2s ease forwards;}
@keyframes showMemoPop-dialog-fade-in {
    0% {transform: translateY(var(--widndowHeight));}
    100% {transform: translateY(0);}
}
@keyframes showMemoPop-dialog-fade-out {
    0% {transform: translateY(0);}
    100% { transform: translateY(var(--widndowHeight));}
}

</style>
