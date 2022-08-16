<template>
  <div class="pushDetailWrap">
    <div v-if="previewPopShowYn" @click="this.previewPopShowYn = false" style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 99999; background: #00000026;">
    </div>
    <imgPreviewPop :mFileKey="alimDetail[0].attachMfilekey" :startIndex="selectImgIndex" @closePop="this.previewPopShowYn = false" v-if="previewPopShowYn" style="width: 100vw; height: calc(100%); position: fixed; top: 0px; left: 0%; z-index: 999999; padding: 20px 0; background: #000000;" :contentsTitle="alimDetail[selectedImgContentsIndex].title" :creUserName="alimDetail[selectedImgContentsIndex].creUserName" :creDate="alimDetail[selectedImgContentsIndex].dateText"  :imgList="this.clickImgList" />

    <div class="pagePaddingWrap root mtop-1 overflowYScroll" ref="alimArea">
      <!-- <div class="whiteArea"> -->
        <div :class="{ alimCreatorColor : creUser === alim.creUserKey}" class="pushDetailPaper pushMbox" v-for="(alim, index) in alimDetail" :key="index">
          <div class="pushDetailTopArea" style="position: relative;">
            <div class="fl" style="width:40px; height:40px; margin-right: 0.5rem;"></div>
            <div v-if="alim.logoPathMtext" @click="goChanDetail(alim)" class="chanLogoImgWrap fl" style="width:40px; height:40px; margin-right: 0.5rem;  position: absolute; top:50%;transform: translate(0, -50%); " :class="{creYnTrans : creUser === alim.creUserKey}"><img alt="채널 프로필이미지" style="width:80%;" :src="alim.logoPathMtext">
              <div style="width:100%; position: fixed; bottom:-7px; padding:0 2px; background-color:#cccccc90; border-radius: 5px;z-index:1 " v-if="creUser === alim.creUserKey"> <p class="font10" style="text-align:center; color:black; white-space:nowrap;">보낸이</p> </div>
              <img v-if="alim.officialYn" class="fl" src="../../../assets/images/channel/icon_official.svg" style="position: absolute; width:30px; bottom:-1.0rem; left: 50%; transform: translateX(-50%);" alt="">

            </div>
            <img v-else @click="goChanDetail(alim)" class="fl mr-04 cursorP pushDetailChanLogo" src="../../../assets/images/channel/tempChanImg.png">

            <div class="pushDetailHeaderTextArea">
              <p class=" font18 fontBold commonColor fl" style="margin-bottom: 0.1rem; word-break: break-all; width: 100%;">{{resizeText(alim.title)}}</p>
                  <p class="font12 fl lightGray" v-if="alim.showCreNameYn">{{this.changeText(alim.creUserName)}}</p>

                  <div style="height: 18px; float: right;">
                    <img src="../../../assets/images/push/icon_clock_noBackground.svg" v-if="clockClickYn" style="width: 18px; height: 18px; padding-bottom: 3px;" class="fr mleft-05" @click="datechange(alim.creDate, index)"/>
                    <img src="../../../assets/images/push/icon_clock.svg" v-else style="width: 18px; height: 18px; padding-bottom: 3px;" class="fr mleft-05" @click="datechange(alim.creDate, index)"/>
                    <p class="font11 fr mleft-03 lightGray">{{alim.dateText}}</p>
                    <p class="fr font11 mleft-1" v-if="alim.rUserCount === 1">한명에게</p>
                    <p class="fr font11 mleft-1" v-else-if="alim.rUserCount > 1">여러명에게</p>
                    <p v-else class="fr font11 mleft-1" @click="testAlert(alim)">전체에게</p>
                  </div>
            </div>
          </div>
          <div id="bodyArea" class="font15 mbottom-2" style="word-break: break-all;" v-html="decodeContents(alim.bodyFullStr)"></div>
          <!-- <div id="bodyArea" class="font15 mbottom-2" style="word-break: break-all;" v-html="decodeUTF8(decodeContents(alim.bodyFullStr))"></div> -->

          <div id="alimCheckArea">
            <div class="alimCheckContents">
              <!-- <gBtnSmall v-if="setParentContents(alim)" btnTitle="이전알림 보기" @click="ㅅㄷㄴㅅ"/> -->
              <div @click="changeIconColor(userDo, alim.contentsKey)" class="fl listMR05Last0" v-for="(userDo, index) in this.userDoList" :key="index">
                <template v-if="userDo.doType === 'ST'">
                  <img class="fl" v-if="userDo.doKey > 0 || !userDo.starClickYn" src="../../../assets/images/common/colorStarIcon.svg" alt="">
                  <img class="fl" v-else src="../../../assets/images/common/starIcon.svg" alt="">
                </template>
                <template v-else-if="userDo.doType === 'LI'">
                  <img class="mright-05 fl" style="margin-top: 4px;" v-if="userDo.doKey > 0 || !userDo.likeClickYn" src="../../../assets/images/common/light_likeIcon.svg" alt="">
                  <img class="mright-05 fl" style="margin-top: 4px;" v-else src="../../../assets/images/common/likeIcon.svg" alt="">
                </template>
              </div>
              <gBtnSmall class="fr" v-if="(alim.canReplyYn && creUser !== alim.creUserKey) || (parentContentsKey && !alimDetail[0].creUserKey === alim.creUserKey) " btnTitle="답장하기" @click="alimReply"/>
              <!-- <gBtnSmall v-if="(alim.canReplyYn && creUser !== alim.creUserKey) || (parentContentsKey && !alimDetail[0].creUserKey === alim.creUserKey) " btnTitle="답장하기" @click="alimReply"/> -->

              <!-- <img @click="sendkakao" src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"  class="plusMarginBtn" style="float: right; width: 35px;" alt="카카오톡 공유하기"> -->
              <div data-clipboard-action="copy" id="pushDetailCopyBody" @click="copyText"
                  :data-clipboard-text="'https://thealim.page.link/?link=http://mo.d-alim.com:18080?pushDetail=' + this.alimDetail[0].contentsKey
                      + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더편한구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'"
                    style="background: #6768a7; width: 30px; height: 30px; float: right; border-radius: 5px; padding: 0 0 0 1px; margin-right: 10px;">
                <img src="../../../assets/images/common/copyLink.svg" style="width: 100%" alt="">
              </div>

            </div>
            <gBtnSmall  btnTitle="댓글쓰기" class="fr mtop-05" :btnThema="creUser === alim.creUserKey ? 'deepLightColor' : 'light' " @click="writeMemo"/>

            <div class="alimMemoBorder"></div>
            <p class="commonBlack fr font14 mright-1 mtop-1" style="" @click="memoListShowYn = !memoListShowYn">{{memoListShowYn ? '댓글 접기' : '댓글 펼치기'}}</p>
            <p class="commonBlack fl font16 mleft-05 mtop-1 fontBold" v-show="memoListShowYn" >댓글</p>
            <div class="w-100P fl" v-show="memoListShowYn" style="border-radius:10px; min-height: 50px; background:white; margin-top:0.5rem; padding: 0.5rem 0.5rem" >
              <gMemoList :replyYn='true' :nonMemYn="detailVal.nonMemYn" @loadMore='loadMore'  ref="AlimMemoListCompo" :memoList="alimMemoList" @deleteMemo='deleteMemo' @editTrue='getBoardMemoList' @mememo='writeMememo' @scrollMove='scrollMove'   />
            </div>

          </div>
          <div class="pushDetailPaperEffect"></div>
        </div>
    </div>

    <div v-if="memoShowYn" class="alimMemoBoxBackground" @click="this.memoShowYn = false"></div>
    <transition name="showMemoPop">
      <gMemoPop transition="showMemoPop" :style="getWindowSize"  v-if="memoShowYn" @saveMemoText="saveMemo" :mememo='mememoValue' @mememoCancel='mememoCancel' />
    </transition>

    <gConfirmPop  :draggable="true" :confirmText='confirmText' confirmType='timeout' v-if="confirmPopShowYn" @no='confirmPopShowYn=false'  />
  </div>
</template>
<script>
/* eslint-disable */
/* import manageStickerPop from '../../popup/Tal_manageStickerPop.vue' */
import imgPreviewPop from '../../popup/file/Tal_imgPreviewPop.vue'
export default {
  data () {
    return {
      starClickYn: false,
      likeClickYn: false,
      clockClickYn: false,
      alimDetail: [],
      clickImgList: [],
      previewPopShowYn: false,
      selectedImgContentsIndex: 0,
      /* manageStickerPopShowYn: false, */
      userDoList: [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }],
      userDoStickerList: [],
      parentContentsKey: null,
      // dateClickYn:false
      confirmPopShowYn: false,
      confirmText: '',

      alimMemoList: [],
      selectImgIndex: 0,
      creUser: JSON.parse(localStorage.getItem('sessionUser')).userKey,

      offsetInt :0,
      pagesize : 10,
      endListYn : false,

      mememoValue : undefined,
      memoShowYn : false,
      memoListShowYn : false,

    }
  },
  watch: {
  },
  props: {
    detailVal: {},
  },
  components: {
    imgPreviewPop
    /* manageStickerPop */
  },
  created() {
    this.$emit('openLoading')
    this.getContentsList()
    /* if (this.alimDetail) {} else {
      this.alimDetail = {
        teamName: '',
        creDate: '0',
        bodyFullStr: '오류입니다.'
      }
    } */
  },
  mounted () {
    var thisthis = this
    if (this.alimDetail.length > 0) {
      this.changeMode()
    } else {
      setTimeout(() => {
        thisthis.changeMode()
      }, 3000)
    }

    /* debugger
    var tets = this.alimDetail
    if (this.alimDetail[0].attachFileList != undefined && this.alimDetail[0].attachFileList.length > 0) {
      var addFalseImgList = document.querySelectorAll('.pushDetailPaper .formCard .editorImg')
      if (this.alimDetail[0].attachFileList.length === addFalseImgList.length) {
        for (var i = 0; i < addFalseImgList.length; i++) {
          if (Number(addFalseImgList[i].attributes.filekey.value) === this.alimDetail[0].attachFileList[i].filekey) {
            addFalseImgList[i].setAttribute('mmFilekey', this.alimDetail[0].attachFileList[i].mmFilekey)
          }
        }
      }

    } */
    /*
    var test = this.$store.state.historyStack
    test.push(0)
    this.$store.commit('updateStack', test)
    */
  },
  unmounted () {
    /* if (this.$historyStack) {
      for (var i = 0; i < this.$historyStack.length; i++) {
        if (this.$historyStack[i] === 'detail') {
          this.$historyStack.splice(i, 1)
        }
      }
    } */
  },
  computed: {
    historyStack () {
      return this.$store.state.historyStack
    },

    getWindowSize () {
      return {
        '--widndowHeight': window.innerHeight + 'px'
      }
    }

  },
  methods: {
    encodeUTF8(str){// 특수문자도 포함할 경우  encodeURIComponent(str) 를 사용.     
      return encodeURI(str);
    },
    decodeUTF8(str){ // 특수문자도 포함할 경우  decodeURIComponent(str) 를 사용.    
      return decodeURI(str); 
    },
    eventModalTest(){
      this.$refs.eventModalTestCompo.draggable()
      this.eventModalTest = true

    },
    scrollMove (wich) {
      var middle = (document.innerHeight || window.innerHeight) / 2 - 100
      var alimArea = this.$refs.alimArea
      if (wich === -1) {
        wich = document.getElementById(this.alimMemoList[this.alimMemoList.length - 1].memoKey).offsetTop
        this.$refs.AlimMemoListCompo[0].anima(this.alimMemoList[this.alimMemoList.length - 1].memoKey)
      }
      alimArea.scrollTo({ top: (wich - middle), behavior: 'smooth' })
    },
    mememoCancel(){
      this.mememoValue = null
    },
    writeMemo () {
      // if (this.shareAuth.R === true) {
        this.mememoValue = null
        this.memoShowYn = true
      // } else {
      //   this.confirmText = '댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요.'
      //   this.confirmPopShowYn = true
      // }
    },
    writeMememo (memo) {
      // if (this.shareAuth.R === true) {
        var data = {}
        data.parentMemoKey = memo.memoKey // 대댓글때 사용하는것임
        data.memo = memo
        // eslint-disable-next-line no-new-object
        this.mememoValue = new Object()
        this.mememoValue = data
        this.memoShowYn = true
      // } else {
      //   this.confirmText = '댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요.'
      //   this.confirmPopShowYn = true
      // }
    },

    async deleteMemo (param) {

      var memo = {}
      memo.memoKey = param.memoKey
      var result = await this.$commonAxiosFunction({
        url: '/tp.deleteMemo',
        param: memo
      })
      if (result.data.result === true) {
        // this.memoList = []
        await this.getBoardMemoList(true)
      }
    },

    async saveMemo (text) {
      // eslint-disable-next-line no-new-object
      var memo = new Object()
      memo.parentMemoKey = null
      if (this.mememoValue !== undefined && this.mememoValue !== null && this.mememoValue !== {}) {
        memo.parentMemoKey = this.mememoValue.parentMemoKey
      }

      memo.bodyFullStr = text
      /* memo.bodyFilekey  */
      memo.targetKind = 'C'
      memo.targetKey = this.alimDetail[0].contentsKey
      // memo.toUserKey = this.alimDetail[0].creUserKey 대댓글때 사용하는것임
      memo.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      memo.creUserName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
      memo.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)

      var result = await this.$commonAxiosFunction({
        url: '/tp.saveMemo',
        param: { memo: memo }
      })
      if (result.data.result === true || result.data.result === 'true') {
        /* this.confirmText = '댓글 저장 성공'
        this.confirmPopShowYn = true */
        this.memoShowYn = false
        // await this.getContentsList()
        await this.getBoardMemoList(true)
        this.scrollMove(-1)
      }
    },
    async loadMore () {
      if (this.endListYn === false) {
        await this.getBoardMemoList()
      }
    },
    async getBoardMemoList (allYn) {
      this.$refs.AlimMemoListCompo[0].memoLoadingShow()

      var memo = {}
      memo.targetKind = 'C'
      memo.targetKey = this.alimDetail[0].contentsKey
      memo.pageSize = this.pagesize
      memo.offsetInt = this.offsetInt
      if (allYn) {
        memo.pageSize = this.totalElements + 1
        memo.offsetInt = 0
      }
      var result = await this.$commonAxiosFunction({
        url: '/tp.getMemoList',
        param: memo
      })
      if (result.data.content) {
        if (allYn) {
          this.alimMemoList = result.data.content
          this.endListYn = true
        } else {
          const newArr = [
            ...this.alimMemoList,
            ...result.data.content
          ]
          this.alimMemoList = newArr
        }
        this.endListSetFunc(result.data)
        // if (this.totalElements < (result.data.pageable.offset + result.data.pageable.pageSize)) {
        //   this.endListYn = true
        // } else {
        //   this.endListYn = false
        //   if (allYn) {
        //     this.endListYn = true
        //   }
        // }
      }
      this.$refs.AlimMemoListCompo[0].memoLoadingHide()
    },
    endListSetFunc (resultList) {
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
        if (this.offsetInt > 0) this.offsetInt -= 1
      } else {
        this.endListYn = false
        this.offsetInt += 1
      }
    },
    datechange (date, index) {
      this.clockClickYn = !this.clockClickYn
      this.alimDetail[index].dateText = this.$changeDateFormat(date, this.clockClickYn)
    },
    setParentContents (data) {
      if (data.parentContentsKey) {
        return true
      } else {
        return false
      }
    },
    resizeText (text) {
      if (!text) {
        text = '[' + this.$changeText(this.alimDetail[0].nameMtext) + '] 제목없는 알림'
      }
      return text
    },
    changeMode () {
      var formList = document.querySelectorAll('#bodyArea .formCard')
      // eslint-disable-next-line no-
      //
      for (var i = 0; i < formList.length; i++) {
        formList[i].contentEditable = false
      }
      this.clickImgList = document.querySelectorAll('#bodyArea img')

      for(let m = 0; m < this.clickImgList.length; m++){
        this.clickImgList[m].addEventListener('click', () => {
          this.selectImgIndex = m
          this.previewPopShowYn = true
        });
      }

    },
    alimReply () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetKey = this.detailVal.value.creTeamKey

      params.creUserName = this.alimDetail[0].creUserName
      params.creUserKey = this.alimDetail[0].creUserKey
      params.targetContentsKey = this.alimDetail[0].contentsKey
      params.replyPopYn = true
      params.targetType = 'writePush'
      params.targetNameMtext = this.detailVal.value.nameMtext
      params.contentsKey = this.detailVal.contentsKey
      this.$emit('openPop', params)
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      // eslint-disable-next-line no-
      return changeText
    },
    async getContentsList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // param.baseContentsKey = this.detailVal.targetKey
      if (this.detailVal) {
        param.contentsKey = this.detailVal.targetKey || this.detailVal.targetKey
      }
      if (!param.contentsKey) {
        if (this.detailVal.value) {
          param.contentsKey = this.detailVal.value.contentsKey || this.detailVal.value.targetKey
        }
      }
      param.jobkindId = 'ALIM'
      var resultList = await this.$getContentsList(param)
      this.alimDetail = resultList.content
      // debugger

      if (this.alimDetail[0].childrenContents) {
        if (this.alimDetail[0].creUserKey === this.creUser) {
          this.alimDetail = [
            this.alimDetail[0],
            ...this.alimDetail[0].childrenContents
          ]
        }
      }
      // eslint-disable-next-line no-
      if (resultList.content[0].userDoList) {
        var userDoList = resultList.content[0].userDoList
        await this.settingUserDo(userDoList)

      }
      this.alimDetail[0].dateText = this.$changeDateFormat(this.alimDetail[0].creDate, false)
      // console.log(this.alimDetail)
      this.$emit('closeLoading')
    },
    settingUserDo (userDo) {
      this.userDoList = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }]
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
    async copyText () {
      // eslint-disable-next-line no-undef
      var clip = new ClipboardJS('#pushDetailCopyBody')
      var _this = this
      clip.on('success', function (e) {
        // console.log(e)
        _this.confirmText = '알림 링크가 복사되었습니다!'
        _this.confirmPopShowYn = true
      })
    },
    sendkakao: function () {
      try {
        // eslint-disable-next-line no-undef
        if (Kakao) {
          // eslint-disable-next-line no-undef
          Kakao.init('ad73ad189dfce70f1a9c3b77c9924c45')
        };
      } catch (e) {};
      var link = 'https://thealim.page.link/?link=http://mo.d-alim.com:18080?pushDetail=' + this.alimDetail[0].contentsKey
                        + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더 편한 구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'
      var mainLink = 'https://thealim.page.link/?link=http://mo.d-alim.com:18080'
                        + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더 편한 구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'
      var titleText = this.alimDetail[0].title
      var newText = null
      if (titleText.length > 20) {
        newText = titleText.substring(0, 20) + '...'
      } else {
        newText = titleText
      }
      // eslint-disable-next-line no-undef
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '"' + newText + ' "',
          description: '알림이 공유되었습니다. 지금바로 확인하러 가볼까요?',
          imageUrl: 'http://pushmsg.net/img/homepage03_1_1.427f4b7c.png',
          imageWidth: 1200,
          imageHeight: 750,
          link: {
            /* mobileWebUrl: 'http://mo.d-alim.com:18080' + '?chanDetail=' + this.chanDetail.teamKey, */
            /* webUrl: 'http://mo.d-alim.com:18080' + '?chanDetail=' + this.chanDetail.teamKey, */
            // webUrl: link,
            mobileWebUrl: link
            /* mobileWebUrl: 'https://thealim.page.link/H3Ed',
            webUrl: 'https://thealim.page.link/H3Ed' */
          }
        },
        buttons: [
          {
            title: '더알림 방문하기',
            link: {
              /* mobileWebUrl: 'http://mo.d-alim.com:18080' + '?chanDetail=' + this.chanDetail.teamKey, */
              /* webUrl: 'http://mo.d-alim.com:18080' + '?chanDetail=' + this.chanDetail.teamKey */
              // webUrl: link,
              mobileWebUrl: mainLink
            }
          },
          {
            title: '확인하러 가기',
            link: {
              /* mobileWebUrl: 'http://mo.d-alim.com:18080' + '?chanDetail=' + this.chanDetail.teamKey, */
              /* webUrl: 'http://mo.d-alim.com:18080' + '?chanDetail=' + this.chanDetail.teamKey */
              // webUrl: link,
              mobileWebUrl: link
            }
          }
        ]
      })
    },
    changeIconColor(act, inputContentsKey) {
      if (act.likeClickYn) {
        act.likeClickYn = false
      } else {
        act.likeClickYn = true
      }
      if (act.starClickYn) {
        act.starClickYn = false
      } else {
        act.starClickYn
      }
      this.changeAct(act, inputContentsKey)
    },
    async changeAct(act, inputContentsKey) {
      var result = null
      var saveYn = true
      // this.pushDetail = JSON.parse(this.detailVal).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = inputContentsKey
      if (param.targetKey === null) { return }
      param.doType = act.doType
      param.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
      if (saveYn === false) {
        param.doKey = act.doKey
        result = await this.$saveUserDo(param, 'delete')
        // act.likeClickYn = false
      } else {
        param.targetKind = 'C'
        result = await this.$saveUserDo(param, 'save')
        // act.likeClickYn = true
      }
      if (result === true) {
        var resultList = await this.$getContentsList({ contentsKey: inputContentsKey })
        var userDoList = resultList.content[0].userDoList
        await this.settingUserDo(userDoList)
        this.$emit('reloadParent')
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

/* .alimCreatorColor {background-color: #6768a7 !important} */
.alimCreatorColor {background-color: #f0f0ff !important;}
.pagePaddingWrap {
    padding: 60px 1.5rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 0;
}
.pushDetailWrap{height: fit-content;}
.pushDetailTopArea{ margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 50px;height: 50px;}
.pushDetailHeaderTextArea{width: calc(100% - 50px); cursor: pointer; float: left;margin-top: 0.2rem; margin-bottom: 0.2rem;}

#alimCheckArea{min-height: 20px; width: calc(100%); float: left;}
.alimCheckContents{width: 100%; float: left; height: 30px;}
.alimCheckContents > img {margin-top: 3px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}

/* .whiteArea{
  width: 100%;
  background-color: #ffffff;
  border-radius: 0.8rem;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%  , 0 100%);
} */

.pushMbox{margin-bottom: 20px;}

  .pushDetailPaper {
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
      margin-bottom: 10px;
      padding-bottom: 30px;
      justify-content: space-between;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%  , 0 100%);
  }
  .creYnTrans{
    transform: translate(0, -70%) !important;
  }
  .listMR05Last0{
    margin-right: 0.5rem;
  }
  .listMR05Last0 :last-child{
    margin-right: 0rem !important;
  }
/* .pushDetailPaperEffect     >>>  common.css이동 */

  #dateAll{
    /* accent-color:#6768A7; */
    accent-color:#ccc;
  }
.alimMemoBorder{
  width: 100%; height: 1.5px; padding-bottom: 10px; border-bottom: 1.5px dashed #ccc; float: left;
}

.alimMemoBoxBackground{
  width: 100vw; height: 100vh; background: #00000036; position: fixed; top: 0; left: 0;
}

</style>
