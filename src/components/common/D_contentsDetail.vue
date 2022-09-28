<template>
  <div v-if="this.CONT_DETAIL && (CONT_DETAIL.jobkindId === 'ALIM' || (CONT_DETAIL.jobkindId === 'BOAR' && this.CAB_DETAIL))" class="boardDetailWrap" :style="(CONT_DETAIL.jobkindId === 'BOAR' && CAB_DETAIL.picBgPath) ? 'background: ' + CAB_DETAIL.picBgPath + ';' : 'background: #6768A7;'">
    <div v-if="saveMemoLoadingYn" id="loading" style="display: block; z-index:9999999"><div class="spinner"></div></div>
    <loadingCompo class="fl" style="z-index: 999999999 !important; position:absolute; top:0; left:0; width:100%; height:100%;" v-if="loadingYn" />
    <imgPreviewPop :mFileKey="CONT_DETAIL.attachMfilekey" :startIndex="selectImgIndex" @closePop="this.backClick()" v-if="previewPopShowYn && CONT_DETAIL.attachMfilekey" style="width: 100%; height: calc(100%); position: absolute; top: 0px; left: 0%; z-index: 999999; padding: 20px 0; background: #000000;" :contentsTitle="CONT_DETAIL.title" :creUserName="CONT_DETAIL.creUserName" :creDate="CONT_DETAIL.dateText"  :imgList="this.clickImgList" />

    <!-- <manageStickerPop :stickerList="userDoStickerList" v-if="this.manageStickerPopShowYn" @closePop="this.manageStickerPopShowYn = false"/> -->
    <!-- <div>{{pushKey}}</div> -->

    <div id="boardDetailScrollArea" class="pagePaddingWrap root mtop-1 overflowYScroll" ref="memoarea" >
      <div class="content pushMbox">
        <div class="pushDetailTopArea">
          <div @click="goChanDetail(CHANNEL_DETAIL.teamKey)" class="boardDetailChanLogoImgWrap fl" :style="'background-image: url(' + (CHANNEL_DETAIL.logoDomainPath ? CHANNEL_DETAIL.logoDomainPath + CHANNEL_DETAIL.logoPathMtext : CHANNEL_DETAIL.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center;">
          </div>
          <div class="pushDetailHeaderTextArea">
            <p class=" font18 fontBold commonColor cursorDragText" style="word-break: break-word;">
              <pp v-if="CONT_DETAIL.jobkindId === 'ALIM'" class="font14 fl contentTypeTextArea fontNomal" style="background:#6768A7; color: #FFF;">{{'알림'}}</pp>
              <pp v-else-if="CONT_DETAIL.jobkindId === 'BOAR'" class="font14 fl contentTypeTextArea" style="background:#FFF; color: #6768A7; font-weight: bold; border: 1px solid #6768A7  ">{{'게시'}}</pp>
              <img class="fr mright-03" style="width:4.5px;" @click="contentMenuClick({type:'BOAR', ownerYn: GE_USER.userKey === CONT_DETAIL.creUserKey || (!detailVal.nonMemYn && CONT_DETAIL.creUserKey === 0), tempData: alim})" src="../../assets/images/common/icon_menu_round_vertical.svg"  alt="">
              {{CONT_DETAIL.title}}
            </p>
            <!-- <div class="fr" v-if="creUser === alim.creUserKey || (!detailVal.nonMemYn && alim.creUserKey === 0) ">
              <p class="fl mright-05 font13"  @click="openUpdateContentsPop">수정</p>
              <p class="fl mright-05 font13"  @click="boardFuncClick('BOAR')">삭제</p>
            </div> -->
          <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
            <p class="font12 fl lightGray"  @click="userNameClick(CONT_DETAIL.creUserKey, CONT_DETAIL.creTeamKey, CONT_DETAIL.blindYn === 1)">{{CONT_DETAIL.jobkindId === 'BOAR' && CAB_DETAIL.blindYn === true ? '익명' : (CONT_DETAIL.showCreNameYn === 1 ? this.$changeText(CONT_DETAIL.creUserName) : '')}}</p>
            <p class="font12 fr lightGray mleft-05">{{this.$changeDateFormat(CONT_DETAIL.creDate)}}</p>
            <p v-if="CONT_DETAIL.updDate" class="font12 fl lightGray">{{'(업데이트: ' + this.$changeDateFormat(CONT_DETAIL.updDate) + ')'}}</p>
          </div>

        </div>
        <!-- <div v-if="fileDownloadAreaYn" style="position: relative;width: 100%; height: 30px; float: left; "> -->
        <div v-if="this.CONT_DETAIL_D_ATTATCH_FILE_LIST && this.CONT_DETAIL_D_ATTATCH_FILE_LIST.length > 0" style="position: relative;width: 100%; height: 30px; float: left; ">
            <span @click="filePopShowYn = !filePopShowYn" class="commonBlack font14 fr">파일 다운로드 <!-- <span class="font14 fontBold">({{this.attachTrueFileList.length}})</span> --></span>
            <img src="../../assets/images/formEditor/attachFIleIcon.svg" style="width: 20px; float: right;" alt="">
            <div v-if="filePopShowYn" style="width: 70%; word-break: break-all; padding: 10px; border-radius: 10px 0 10px 10px; box-shadow: rgb(0 0 0 / 12%) 2px 3px 10px 1px; max-width: 300px; min-width: 100px; min-height: 200px; max-height: 30%; right: 0; top: 25px; background: #fff; z-index: 99999; overflow: hidden auto; border: 1px solid #ccc; position: absolute">
                <p class="commonBlack font14 fontBold textLeft mbottom-05 ">파일 다운로드 </p><!--   ({{this.attachTrueFileList.length}})</p> -->
                <templete v-for="(value, index) in this.CONT_DETAIL_D_ATTATCH_FILE_LIST" :key="index">
                <div  v-if="value.attachYn"  style="width: 100%; word-break: break-all; height: 30px; float: left;" >
                    <p class="font12 commonBlack mtop-05" style="margin-left: 2px; margin-right: 5px; float: left" >- </p>
                    <a :fileKey="value.fileKey" @click="download1(value.fileKey, value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)" style="word-break: break-all;" :filePath="value.domainPath? value.domainPath + value.pathMtext : value.pathMtext" class="font12 commonBlack"  >
                    {{value.fileName}}
                    </a>
                </div>
                </templete>
                <!-- <p class="fr">({{this.$byteConvert(value.fileSizeKb)}})</p> -->
            </div>
        </div>
        <pre  id="boardBodyArea" class="font15 mbottom-2 cursorDragText" v-html="decodeContents(CONT_DETAIL.bodyFullStr)"></pre>

        <div id="alimCheckArea">
          <div class="alimCheckContents">
            <!-- <img class="fl" src="../../assets/images/push/attatchStickerIcon.svg" alt=""  @click="this.manageStickerPopShowYn = true">
            <div class="pushDetailStickerWrap">
              <div  v-longclick="() => changeStickerEditMode()" class="stickerDiv" :style="'background-color:' + value.picBgPath" v-for="(value, index) in this.userDoStickerList " :key="index" >
                <img :src="value.picPath" alt="">
              </div>
            </div> -->
            <div v-if="!detailVal.nonMemYn" class="w-100P fl mbottom-05">
                <p class="commonBlack font13" style="float: right;">좋아요 {{CONT_DETAIL.likeCount}}개</p>
                <p class="commonBlack font13" style="float: right; margin-right: 10px;'">댓글 {{this.CONT_DETAIL.totalMemoCount}}개</p>
            </div>
            <div v-else class="mbottom-05 fr" style="min-height: 30px;">
              <div class="commonBlack font12" style="float: left; padding: 2px 10px; background: rgb(0 0 0 / 21%); border-radius: 5px;">{{CONT_DETAIL.memoCount > 0? '답변완료' : '답변대기'}}</div>
            </div>
            <div class="fl" style="display:flex;">
              <template v-if="!detailVal.nonMemYn">
                <div @click="changeAct(userDo, CONT_DETAIL.contentsKey)"  class="fl" v-for="(userDo, index) in this.CONT_DETAIL.D_CONT_USER_DO" :key="index">
                  <template v-if="userDo.doType === 'ST'">
                    <img class="mright-05 mtop-01 fl" v-if="userDo.doKey > 0" src="../../assets/images/common/colorStarIcon.svg" alt="">
                    <img class="mright-05 mtop-01 fl" v-else src="../../assets/images/common/starIcon.svg" alt="">
                  </template>
                  <template v-else-if="userDo.doType === 'LI'">
                    <img class="mright-05 fl" style="margin-top: 4px;" v-if="userDo.doKey > 0" src="../../assets/images/common/likeIcon.svg" alt="">
                    <img class="mright-05 fl" style="margin-top: 5px;" v-else src="../../assets/images/common/light_likeIcon.svg" alt="">
                  </template>
                </div>
              </template>
              <img src="../../assets/images/common/icon_share_square.svg" class="img-w20 fl" alt="공유 아이콘"
              data-clipboard-action="copy" id="boardDetailCopyBody" @click="openSelectSharePop"
                :data-clipboard-text="CONT_DETAIL.copyTextStr">
            </div>
            <gBtnSmall v-if="!detailVal.nonMemYn && (CONT_DETAIL.jobkindId === 'ALIM' || this.CAB_DETAIL.replyYn)" btnTitle="댓글 쓰기" class="fr" btnThema="light" @click="writeMemo"/>
            <!-- <div v-if="detailVal.replyYn" class="commentBtn fr" @click="writeMemo">댓글 쓰기</div> -->
            <!-- <img @click="sendkakao" src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"  class="plusMarginBtn" style="float: right; margin-right: 5px; width: 35px;" alt="카카오톡 공유하기"> -->
            <!-- <div style="width: 28px;height: 28px; margin-top: 1px;" data-clipboard-action="copy" id="boardDetailCopyBody" @click="copyText" -->
            <!-- <div class="copyTextWrap"> -->
              <!-- <img src="../../assets/images/common/copyLink.svg" class="w-100P" alt=""> -->
            <!-- <img src="../../assets/images/common/icon_share_square.svg" class="img-w20 fl" alt="공유 아이콘"
            data-clipboard-action="copy" id="boardDetailCopyBody" @click="copyText"
              :data-clipboard-text="'https://dalim.page.link/?link=https://mo.d-alim.com?boardDetail=' + this.CONT_DETAIL.contentsKey
                  + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더편한구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'"> -->
            <!-- </div> -->
          </div>
          <div v-if="!detailVal.nonMemYn && CONT_DETAIL.jobkindId === 'BOAR' && !this.CAB_DETAIL.replyYn" class="fl w-100P mtop-05 mbottom-05" style="background-color:#cccccc50; padding: 0.5rem 0; border-radius: 10px;">
            <p class="w-100P commonBlack font13 textCenter" >관리자가 댓글 사용을 중지하였습니다.</p>
          </div>
          <div class="boardBorder"></div>
          <div id="memoWrap" class="w-100P fl" style=" min-height: 100px;" >
            <gMemoList :nonMemYn="detailVal.nonMemYn" @loadMore='loadMore' ref="boardMemoListCompo" :memoList="CONT_DETAIL.D_MEMO_LIST" @deleteMemo='deleteConfirm' @editTrue='editMemo' @mememo='writeMememo' @scrollMove='scrollMove' :replyYn='replyYn' @contentMenuClick="contentMenuClick" @memoUserNameClick="memoUserNameClick" @mememoMemo="writeMememo"/>
          </div>
        </div>
        <!-- <div  class="font15"> {{this.alimDetail.creDate}}</div> -->
        <!-- <div> -->
          <!-- <gBtnSmall class="mr-04 gBtnSmall addClick_popupClick.test()_addClick" btnTitle="상세보기" /> -->
          <!-- <gBtnSmall  class="mr-04 gBtnSmall"  btnTitle="링크열기" /> -->
        <!-- </div> -->
        <div class="pushDetailPaperEffect" />
      </div>

    </div>
    <div v-if="memoShowYn" class="memoBoxBackground" @click="this.memoShowYn = false"></div>
    <!-- <transition name="showMemoPop"> -->
      <gMemoPop transition="showMemoPop" :style="getWindowSize"  v-if="memoShowYn" @saveMemoText="saveMemo" :mememo='mememoValue' @mememoCancel='mememoCancel' />
    <!-- </transition> -->
    <gConfirmPop :confirmText='confirmText' :confirmType="confirmType ? 'two' : 'timeout'" v-if="confirmPopShowYn" @no='confirmPopShowYn=false, reportYn = false' @ok='confirmOk' />
    <gReport v-if="reportYn" @closePop="reportYn = false" :contentType="contentType" :contentOwner="contentOwner" @report="report" @editable="editable" @bloc="bloc" />
    <smallPop v-if="smallPopYn" :confirmText='confirmMsg' @no="smallPopYn = false"/>
    <imgLongClickPop @closePop="backClick" @clickBtn="longClickAlertClick" v-if="imgDetailAlertShowYn" />
    <gSelectBoardPop :type="this.selectBoardType" @closeXPop="closeSelectBoardPop" v-if="CONT_DETAIL.jobkindId === 'BOAR' && selectBoardPopShowYn" :boardDetail="CONT_DETAIL" :boardValue="CAB_DETAIL" />
  </div>
</template>
<script>
import loadingCompo from '@/components/layout/Tal_loading.vue'
import imgPreviewPop from '@/components/popup/file/Tal_imgPreviewPop.vue'
import { onMessage } from '../../assets/js/webviewInterface'
/* import manageStickerPop from '../sticker/Tal_manageStickerPop.vue' */
export default {
  data () {
    return {
      selectBoardPopShowYn: false,
      selectBoardType: 'move',
      confirmText: '',
      confirmPopShowYn: false,
      memoShowYn: false,
      loadYn: true,
      clickImgList: [],
      selectImgIndex: 0,
      selectedImgContentsIndex: 0,
      filePopShowYn: false,
      imgDetailAlertShowYn: false,
      previewPopShowYn: false,
      /* manageStickerPopShowYn: false, */
      /* userDoStickerList: [], */
      mememoValue: null,
      replyYn: false,
      confirmType: false,
      boardFuncType: '',
      /* ownerYn: false, */
      offsetInt: 0,
      pagesize: 10,
      endListYn: false,
      axiosYn: false,
      deleteYn: false, // 나중에 삭제된 게시글을 공유하게 된다면
      t: [],
      reportYn: false,
      contentType: '',
      contentOwner: false,
      tempData: {},
      currentConfirmType: '',
      smallPopYn: false,
      confirmMsg: '',
      subPopId: null,
      clickTime: 0,
      selectImgObject: {},
      mobileYn: this.$getMobileYn(),
      clickEndYn: false,
      alertPopId: null,
      clickImg: null,
      systemName: localStorage.getItem('systemName'),
      loadingYn: false,
      saveMemoLoadingYn: false
    }
  },
  props: {
    detailVal: {}
  },
  components: {
    /* manageStickerPop, */
    imgPreviewPop,
    loadingCompo
  },
  created () {
    // // console.log('this.detailVal')
    // // console.log(this.detailVal)
    // // console.log('this.CHANNEL_DETAIL')
    // // console.log(this.CHANNEL_DETAIL)
    this.readyFunction()
    // document.addEventListener('message', e => this.recvNoti(e))
    // window.addEventListener('message', e => this.recvNoti(e))
  },
  updated () {
    this.settingAtag()
  },
  mounted () {
    // console.log('########################')
    // console.log(this.detailVal)
    // console.log('########################')
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    CHANNEL_DETAIL () {
      // console.log('!!! CHANNEL_DETAIL !!!')
      // console.log(this.detailVal.teamKey)
      var chan = this.$getDetail('TEAM', this.detailVal.teamKey)
      if (chan) {
        // console.log('tlqkf')
        // console.log(chan[0])
        return chan[0]
      } else {
        return null
      }
    },
    CAB_DETAIL () {
      if (this.detailVal.jobkindId === 'BOAR') {
        // console.log(this.CHANNEL_DETAIL)
        // console.log(this.CHANNEL_DETAIL)
        var test = this.$getBoardCabinetDetail(this.CHANNEL_DETAIL, this.detailVal.cabinetKey)
        if (test) {
          // console.log('#!@##################')
          // console.log('#!@##################')
          // console.log('#!@##################')
          // console.log('#!@##################')
          // console.log('#!@##################')
          // console.log(test[0])
          return test[0]
        } else {
          return null
        }
      } else {
        return null
      }
    },
    CONT_DETAIL () {
      // console.log('## this.CHANNEL_DETAIL ##')
      // console.log(this.CHANNEL_DETAIL)
      // console.log('## this.detailVal.contentsKey ##')
      // console.log(this.detailVal.contentsKey)
      var cont = this.$getContentsDetail(null, this.detailVal.contentsKey, this.detailVal.teamKey)
      // eslint-disable-next-line no-debugger
      debugger
      if (cont) {
        // console.log('SSSSSSSSSSSSSSSSSSSSSSSSSS')
        // console.log(cont[0])
        return cont[0]
      } else {
        // console.log(cont)
        return null
      }
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['D_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    getWindowSize () {
      return {
        '--widndowHeight': window.innerHeight + 'px'
      }
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
    }
  },
  watch: {
    CHANNEL_DETAIL: {
      handler () {
      },
      deep: true
    },
    CAB_DETAIL: {
      handler (value, old) {
        // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
        // console.log(value)
        if (value) {
        }
      },
      deep: false
    },
    CONT_DETAIL: {
      handler (value, old) {
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!1this.CONT_DETAIL')
        // console.log(value)
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!1this.CONT_DETAIL')
        // console.log(old)
        if (value) {
          this.onLoadFunction()
        }
      },
      deep: true
    },
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    },
    GE_NEW_MEMO_LIST: {
      handler (value, old) {
        //  alert(true)
        var newArr = []
        // alert(true)
        if (!value || value.length === 0) return
        // var memoContents = value[0]
        var memo = null
        memo = this.CONT_DETAIL
        if (!memo) return
        newArr = [
          value[0],
          ...memo.D_MEMO_LIST
        ]
        this.CONT_DETAIL.D_MEMO_LIST = this.replaceArr(newArr)
      },
      deep: true
    }
  },
  methods: {
    memoCountCheck () {
      if (this.CONT_DETAIL.D_MEMO_LIST.length > 0) {
        var memoTotalCount = this.$countingTotalMemo(this.CONT_DETAIL.D_MEMO_LIST)
        if (this.CONT_DETAIL.memoCount !== memoTotalCount) {
          this.getMemoList(true)
        }
      }
    },
    async readyFunction () {
      try {
        this.loadingYn = true
        if (!this.CHANNEL_DETAIL || !this.CHANNEL_DETAIL.D_CHAN_AUTH || !this.CHANNEL_DETAIL.D_CHAN_AUTH.settingYn) {
          await this.$addChanList(this.detailVal.teamKey)
        }
        // console.log('this.CHANNEL_DETAIL')
        // console.log(this.CHANNEL_DETAIL)
        if (!this.CONT_DETAIL) {
          await this.getContentsDetail()
        // this.getContentsList()
        } else {
          if (!this.CONT_DETAIL.D_CONT_USER_DO) {
          }
        }
        // console.log('this.CONT_DETAIL')
        // console.log(this.CONT_DETAIL)

        if (this.CONT_DETAIL && this.CONT_DETAIL.jobkindId === 'BOAR' && !this.CAB_DETAIL) {
          await this.getCabinetDetail()
        }
        // console.log(this.CONT_DETAIL)
        // eslint-disable-next-line no-debugger
        debugger
        if (!this.CONT_DETAIL.D_MEMO_LIST) {
          this.CONT_DETAIL.D_MEMO_LIST = []
          await this.getMemoList()
        }
        if (this.CONT_DETAIL.attachFileList && !this.CONT_DETAIL_D_ATTATCH_FILE_LIST) {
          this.settingFileList()
        }
        if (this.CONT_DETAIL.D_MEMO_LIST) {
          this.memoCountCheck()
        }
        // console.log('###############################!!!!##############################')
      } catch (e) {
        // console.log(e)
      }
      this.loadingYn = false
    },
    updateStoreData (Detail) {
      // // console.log(this.CAB_DETAIL)
      var tempChan = this.CHANNEL_DETAIL
      var cabinetList = tempChan.ELEMENTS.cabinetList
      var index = cabinetList.findIndex((item) => item.cabinetKey === this.detailVal.cabinetKey)
      if (index >= 0) {
        cabinetList[index] = Detail
      } else {
        cabinetList.push(Detail)
      }
      tempChan.ELEMENTS.cabinetList = cabinetList
      this.$store.dispatch('D_CHANNEL/AC_REPLACE_CHANNEL', tempChan)
      /* this.$actionVuex('TEAM', tempChan, this.CHANNEL_DETAIL.teamKey, false, true) */
    },
    async getCabinetDetail () {
      if (!this.CAB_DETAIL || !this.CAB_DETAIL.shareAuth) {
        // eslint-disable-next-line no-new-object
        var param = new Object()
        // var tt = this.propData
        param.currentTeamKey = this.CHANNEL_DETAIL.teamKey
        param.cabinetKey = this.detailVal.cabinetKey
        var resultList = await this.$getCabinetDetail(param)
        // eslint-disable-next-line no-debugger
        debugger
        resultList.mCabinet.shareAuth = this.$checkUserAuth(resultList.mCabinet.mShareItemList)
        this.updateStoreData(resultList.mCabinet)
      }
    },
    async getContentsDetail () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.contentsKey = this.detailVal.contentsKey
      param.jobkindId = this.detailVal.jobkindId
      // // console.log(param)
      // // console.log('param')
      var resultList = await this.$getContentsList(param)
      var detailData = resultList.content[0]
      // console.log('!!!!!!!!!!! tq !!!!!!!!!!!!!')
      // console.log(detailData)

      // var idx1, idx2
      // var chanDetail = {}
      // var contentList = []
      // idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.detailVal.teamKey)
      // console.log(idx1)
      // chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
      // console.log(chanDetail)
      // contentList = detailData.jobkindId === 'ALIM' ? chanDetail.ELEMENTS.alimList : chanDetail.ELEMENTS.boardList
      // console.log(contentList)
      // idx2 = contentList.findIndex((item) => item.mccKey === detailData.mccKey)
      // console.log(idx2)
      // if (idx2 !== -1) {
      //   contentList[idx2] = detailData
      // } else {
      //   this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      // }
      // console.log(contentList)

      // this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [contentList])
      // this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
      detailData.D_CONT_USER_DO = await this.settingUserDo(detailData.userDoList)
      if (!detailData.D_MEMO_LIST) detailData.D_MEMO_LIST = []
      // console.log('!!!!!!!!!!! tqtqtqtqtqtqtqtqtqtqtq !!!!!!!!!!!!!')
      // console.log(detailData)
      this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [detailData])
    },
    onLoadFunction () {
      var thisthis = this
      if (this.CONT_DETAIL) {
        this.addImgEvnt()
        this.settingAtag()
        this.loadingYn = false
      } else {
        setTimeout(() => {
          thisthis.addImgEvnt()
          thisthis.loadingYn = false
        }, 1000)
      }
      var pushListWrap = this.$refs.memoarea
      if (pushListWrap) {
        pushListWrap.addEventListener('scroll', () => {
          this.clickEndYn = true
        })
      } else {
        setTimeout(() => {
          if (pushListWrap) {
            pushListWrap.addEventListener('scroll', () => {
              this.clickEndYn = true
            })
          }
        }, 300)
      }
    },
    memoUserNameClick (userKey) {
      this.userNameClick(userKey, this.CONT_DETAIL.creTeamKey, false)
    },
    userNameClick (userKey, teamKey, blindYn) {
      // // console.log('zzz')
      if (blindYn === false) {
        var param = {}
        param.targetType = 'bookMemberDetail'
        param.readOnlyYn = true
        param.userKey = userKey
        param.teamKey = teamKey
        if (userKey === this.GE_USER.userKey) {
          param.selfYn = true
        } else {
          param.contentOpenYn = true
        }
        // // console.log(param)
        this.$emit('openPop', param)
      } else {
        this.$showToastPop('익명의 게시글로 유저 정보를 볼 수 없습니다.')
      }
    },
    settingAtag () {
      if (this.systemName !== 'Android' && this.systemName !== 'android') {
        return
      }
      var contentsATagList = document.querySelectorAll('#boardBodyArea a')
      if (contentsATagList && contentsATagList.length > 0) {
        for (var i = 0; i < contentsATagList.length; i++) {
          contentsATagList[i].target = '_blank'
        }
      }
    },
    longClickAlertClick (btnType) {
      if (btnType === 'download') this.imgDownload()
      else if (btnType === 'share');
      else if (btnType === 'preview') {
        this.backClick()
        this.clickEndYn = false
        this.previewPopShowYn = true
      }
    },
    async imgDownload () {
      try {
        if (this.mobileYn) {
          onMessage('REQ', 'saveCameraRoll', this.selectImgObject.path)
        } else {
          var result = await this.$downloadFile(this.selectImgObject.fileKey, this.selectImgObject.path)
          console.log(result)
        }
        this.confirmText = '저장되었습니다!'
        this.confirmType = false
        this.backClick()
        this.confirmPopShowYn = true
      } catch (error) {
        // // console.log(error)
      }
    },
    openSelectBoardPop (type) {
      this.selectBoardType = type
      this.selectBoardPopShowYn = true
    },
    closeSelectBoardPop (value) {
      this.selectBoardPopShowYn = false
      this.$emit('closeAndNewPop', value)
    },
    editable (type) {
      this.reportYn = false
      if (this.tempData) {
        if (this.tempData.contentsKey) {
          if (type === 'edit') {
            this.openUpdateContentsPop()
          } else if (type === 'delete') {
            this.boardFuncClick('BOAR')
          } else if (type === 'move' || type === 'copy') {
            this.openSelectBoardPop(type)
          }
        } else if (this.tempData.memoKey) {
          if (type === 'edit') {
            // alert('메모 수정')
            this.$refs.boardMemoListCompo[0].editMemoClick(this.tempData, this.tempData.index, this.tempData.cIndex)
            // this.openUpdateContentsPop()
          } else if (type === 'delete') {
            // alert('메모 삭제')
            this.deleteConfirm('memo')
            // this.deleteMemo({ memoKey: this.tempData.memoKey })
            // this.boardFuncClick('BOAR')
          }
        }
      }
    },
    deleteConfirm (data) {
      if ((data !== undefined && data !== null && data !== '') && (data !== 'alim' && data !== 'memo')) {
        this.tempData = data
      }
      if (data === 'memo' || this.tempData.memoKey) {
        this.confirmText = '댓글을 삭제하시겠습니까?'
        if (this.tempData.parentMemoKey) {
          this.confirmText = '대댓글을 삭제하시겠습니까?'
        }
        this.currentConfirmType = 'memoDEL'
      }

      // // console.log(this.tempData)
      this.confirmType = 'two'
      this.confirmPopShowYn = true
    },
    report (type) {
      var targetKind
      var targetKey
      if (type === 'alim') {
        targetKind = 'C'
        targetKey = this.tempData.contentsKey
        this.confirmText = '해당 알림이 신고되었습니다.'
      } else if (type === 'BOAR') {
        targetKind = 'C'
        targetKey = this.tempData.contentsKey
        this.confirmText = '해당 게시글이 신고되었습니다.'
      } else if (type === 'memo') {
        targetKind = 'C'
        targetKey = this.tempData.memoKey
        this.confirmText = '해당 댓글이 신고되었습니다.'
      } else if (type === 'channel') {
        targetKind = 'T'
        targetKey = this.tempData.creTeamKey
        this.confirmText = '해당 채널이 신고되었습니다.'
      } else if (type === 'user') {
        targetKind = 'U'
        targetKey = this.tempData.creUserKey
        this.confirmText = '해당 유저가 신고되었습니다.'
      }

      var param = {}
      param.actType = 'REPO'
      param.targetKind = targetKind
      param.targetKey = parseInt(targetKey)
      param.creUserKey = this.GE_USER.userKey
      this.saveActAxiosFunc(param)
    },
    /** 신고, 차단, 탈퇴를 할 수 있는 axios함수 // actType, targetKind, targetKey, creUserKey 보내기 */
    async saveActAxiosFunc (param) {
      this.reportYn = false
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveActLog',
        param: param
      })
      // // console.log(result.data.result)
      if (result.data.result === true) {
        this.confirmMsg = this.confirmText
        this.smallPopYn = true
        // this.confirmPopShowYn = true
      }
    },
    bloc (type) {
      var typeText = type === 'user' ? '유저를' : '게시글을'
      this.confirmText = '해당 ' + typeText + ' 차단하시겠습니까?'
      this.confirmType = 'two'
      this.confirmPopShowYn = true
      this.currentConfirmType = 'BLOC'
    },
    contentMenuClick (params) {
      this.contentOwner = params.ownerYn
      this.contentType = params.type
      if (params.tempData) {
        params.tempData.index = params.index
        params.tempData.cIndex = params.cIndex
        // console.log(params.tempData.index)
      }
      this.tempData = params.tempData
      this.reportYn = true
    },
    async download1 (fileKey, path) {
      var result = await this.$downloadFile(fileKey, path)
      console.log(result)
    },
    openSelectSharePop () {
      if (navigator.share) {
        navigator.share({ title: '더알림', text: this.CONT_DETAIL.title, url: this.CONT_DETAIL.copyTextStr })
      } else alert('지원하지 않는 브라우저입니다.')
    },
    addImgEvnt () {
      // console.log(this.CONT_DETAIL)

      this.clickImgList = document.querySelectorAll('#boardBodyArea img')
      for (let m = 0; m < this.clickImgList.length; m++) {
        var thisthis = this
        thisthis.clickImgList[m].addEventListener('touchstart', () => {
          thisthis.clickTime = Date.now()
          thisthis.clickEndYn = false
          thisthis.clickImgList[m].style.opacity = 0.8
          setTimeout(() => {
            if (thisthis.clickEndYn === false) {
              thisthis.selectImgObject.path = thisthis.clickImgList[m].src
              thisthis.selectImgObject.fileKey = Number(thisthis.clickImgList[m].attributes.filekey.value)
              thisthis.selectImgIndex = m
              thisthis.clickImgList[m].style.opacity = 1
              this.openImgDetailAlert(thisthis.clickImgList[m])
            }
          }, 300)
          // thisthis.previewPopShowYn = true
        })
        thisthis.clickImgList[m].addEventListener('touchend', () => {
          thisthis.clickEndYn = true
          thisthis.clickImgList[m].style.opacity = 1
        })

        thisthis.clickImgList[m].addEventListener('mousedown', () => {
          thisthis.clickTime = Date.now()
          thisthis.clickEndYn = false
          thisthis.clickImgList[m].style.opacity = 0.8
          setTimeout(() => {
            if (thisthis.clickEndYn === false) {
              thisthis.selectImgObject.path = thisthis.clickImgList[m].src
              thisthis.selectImgObject.fileKey = Number(thisthis.clickImgList[m].attributes.filekey.value)
              this.openImgDetailAlert(thisthis.clickImgList[m])
              thisthis.selectImgIndex = m
              thisthis.clickImgList[m].style.opacity = 1
            }
          }, 1000)
        })
        thisthis.clickImgList[m].addEventListener('mouseup', () => {
          thisthis.clickEndYn = true
          thisthis.clickImgList[m].style.opacity = 1
        })
      }
      // this.settingFileList(false)
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.alertPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.imgDetailAlertShowYn = false
      } else {
        this.previewPopShowYn = false
      }
    },
    openImgDetailAlert (img) {
      var history = this.$store.getters['D_HISTORY/hStack']
      this.alertPopId = 'imgDetailAlertPop' + history.length
      history.push(this.alertPopId)
      this.$store.commit('D_HISTORY/updateStack', history)
      // console.log(this.$store.getters['D_HISTORY/hStack'])
      this.imgDetailAlertShowYn = true
      this.clickEndYn = false
    },
    openUpdateContentsPop () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = this.CONT_DETAIL.contentsKey
      param.targetType = 'writeBOAR'
      param.creTeamKey = this.CONT_DETAIL.creTeamKey
      if (this.CONT_DETAIL.attachMfilekey) { param.attachMfilekey = this.CONT_DETAIL.attachMfilekey }
      param.bodyFullStr = this.CONT_DETAIL.bodyFullStr
      param.modiContentsKey = this.CONT_DETAIL.contentsKey
      param.titleStr = this.CONT_DETAIL.title
      param.parentAttachTrueFileList = this.CONT_DETAIL.D_ATTATCH_FILE_LIST
      this.$emit('openPop', param)
    },
    boardFuncClick (type) {
      this.confirmType = true
      this.boardFuncType = type
      if (type === 'BOAR') {
        this.confirmText = '게시글을 삭제 하시겠습니까?'
        this.currentConfirmType = 'deleteBoar'
      } else if (type === 'REPORT') {
        this.confirmText = '해당 게시글을 신고 하시겠습니까?'
      } else if (type === 'memoDel') {
        this.confirmText = '댓글을 삭제하시겠습니까?'
      }
      this.confirmPopShowYn = true
    },
    async confirmOk () {
      this.confirmType = false
      this.confirmPopShowYn = false
      if (this.currentConfirmType === 'deleteBoar') {
        var inParam = {}
        // console.log(this.alimDetail)
        inParam.contentsKey = this.CONT_DETAIL.contentsKey
        inParam.jobkindId = 'BOAR'
        inParam.teamKey = this.CONT_DETAIL.creTeamKey
        inParam.deleteYn = true
        await this.$commonAxiosFunction({
          url: 'service/tp.deleteContents',
          param: inParam
        })
        this.$emit('closeXPop', true)
        // console.log('Delete Content Result' + result)
      } else if (this.currentConfirmType === 'BLOC') {
        this.currentConfirmType = ''
        // console.log(this.tempData)
        var param = {}
        param.actType = 'BLOC'
        if (this.tempData.memoKey) {
          param.targetKind = 'U'
          param.targetKey = this.tempData.creUserKey
        } else if (this.tempData.contentsKey) {
          param.targetKind = 'C'
          param.targetKey = this.tempData.contentsKey
        } else {
          this.errorBoxText = '알수 없는 오류입니다.'
        }
        param.creUserKey = this.GE_USER.userKey
        this.errorBoxText = '해당 유저를 차단했습니다.'
        this.saveActAxiosFunc(param)
      } else if (this.currentConfirmType === 'memoDEL') {
        this.deleteMemo({ memoKey: this.tempData.memoKey })
      }
    },
    mememoCancel () {
      this.mememoValue = null
    },
    scrollMove (wich) {
      var middle = (document.innerHeight || window.innerHeight) / 2 - 100
      var memoArea = this.$refs.memoarea
      if (wich === -1) {
        wich = document.getElementById(this.CONT_DETAIL.D_MEMO_LIST[this.CONT_DETAIL.D_MEMO_LIST.length - 1].memoKey).offsetTop
        this.$refs.boardMemoListCompo[0].anima(this.CONT_DETAIL.D_MEMO_LIST[this.CONT_DETAIL.D_MEMO_LIST.length - 1].memoKey)
      }
      memoArea.scrollTo({ top: (wich - middle), behavior: 'smooth' })
    },
    writeMemo () {
      if ((this.CONT_DETAIL.jobkindId === 'ALIM' && this.CONT_DETAIL.canReplyYn === 1) || this.CAB_DETAIL.shareAuth.R === true) {
        this.mememoValue = null
        this.memoShowYn = true
      } else {
        this.$showToastPop('댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요.')
        // this.confirmText = '댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요.'
        // this.confirmPopShowYn = true
      }
    },
    writeMememo (memo) {
      if ((this.CONT_DETAIL.jobkindId === 'ALIM' && this.CONT_DETAIL.canReplyYn === 1) || this.CAB_DETAIL?.shareAuth.R === true) {
        var data = {}
        data.parentMemoKey = memo.memoKey // 대댓글때 사용하는것임
        if (memo.parentMemoKey !== undefined && memo.parentMemoKey !== null && memo.parentMemoKey !== '') {
          data.parentMemoKey = memo.parentMemoKey
        }
        data.memo = memo
        // eslint-disable-next-line no-new-object
        this.mememoValue = new Object()
        this.mememoValue = data
        this.memoShowYn = true
      } else {
        this.confirmText = '댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요.'
        this.confirmPopShowYn = true
      }
    },
    async deleteMemo (param) {
      // console.log(param)
      var memo = {}
      memo.memoKey = param.memoKey
      // // console.log(param)
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.deleteMemo',
        param: memo
      })
      if (result.data.result === true) {
        var memos = this.CONT_DETAIL.D_MEMO_LIST
        var index = memos.findIndex((item) => item.memoKey === param.memoKey)
        // console.log('**')
        // console.log(this.tempData)
        // console.log(' index : ' + index)
        if (this.tempData.parentMemoKey) {
          var cmemoListIdx
          for (let i = 0; i < memos.length; i++) {
            if (memos[i].cmemoList.length > 0) {
              index = memos[i].cmemoList.findIndex(i => i.memoKey === param.memoKey)
              if (index !== -1) {
                cmemoListIdx = i
                break
              }
            }
          }
          // console.log('cmemoListIdx : ' + cmemoListIdx)
          if (cmemoListIdx !== -1) memos[cmemoListIdx].cmemoList.splice(index, 1)
        } else {
          memos.splice(index, 1)
        }
        var cont = this.CONT_DETAIL
        cont.D_MEMO_LIST = memos
        cont.memoCount = this.$countingTotalMemo(cont.D_MEMO_LIST)
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
      }
    },
    async loadMore () {
      if (!this.CONT_DETAIL.D_MEMO_LIST || this.CONT_DETAIL.totalMemoCount > (this.CONT_DETAIL.D_MEMO_LIST.length)) {
        await this.getMemoList()
      }
    },
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1) {
          data.push(current)
        }
        return data
      }, [])
      return uniqueArr
    },
    async editMemo (memo) {
      var cont = this.CONT_D_MEMO
      var index = cont.D_MEMO_LIST.findIndex((item) => item.memoKey === memo.memoKey)
      cont.D_MEMO_LIST[index].bodyFullStr = memo.bodyFullStr
      this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
    },
    async getMemoList (refreshYn) {
      // eslint-disable-next-line no-new-object
      var memo = new Object()
      memo.targetKind = 'C'
      memo.targetKey = this.CONT_DETAIL.contentsKey
      memo.pageSize = this.pagesize
      memo.offsetInt = this.offsetInt
      memo.pageSize = this.CONT_DETAIL.totalMemoCount + 1
      memo.offsetInt = 0

      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getMemoList',
        param: memo
      })

      if (result.data.memoList) {
        this.CONT_DETAIL.totalMemoCount = result.data.totalElements
        var tempList = []
        // 수민_ 대댓글의 경우, 어짜피 전체 리로드를 한번 해줘야 반영되기 때문에 중복제거x
        if (this.CONT_DETAIL.D_MEMO_LIST && !refreshYn) {
          tempList = this.CONT_DETAIL.D_MEMO_LIST
        }
        const newArr = [
          ...tempList,
          ...result.data.memoList
        ]
        var tempMemo = this.replaceArr(newArr)

        if (tempMemo && tempMemo.length > 0) {
          for (let i = 0; i < tempMemo.length; i++) {
            if (tempMemo.parentMemoKey) {
              for (let j = 0; j < tempMemo.length; j++) {
                if (tempMemo[j].memoKey === tempMemo[i].parentMemoKey) {
                  tempMemo[i].meMemoUserDispMtext = this.$changeText(tempMemo[j].userDispMtext)
                  tempMemo[i].meMemoBodyMinStr = tempMemo[j].bodyFullStr
                }
              }
            }
          }
        }
        var cont = this.CONT_DETAIL
        console.log(tempMemo)
        cont.D_MEMO_LIST = [...tempMemo]
        console.log(cont)
        console.log(cont.D_MEMO_LIST)
        // var totalMemoCount = this.$countingTotalMemo(cont.D_MEMO_LIST)
        cont.memoCount = result.data.totalElements.length === 0 ? 0 : result.data.totalElements
        this.offsetInt = result.data.totalElements
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
      }
      // this.$refs.boardMemoListCompo[0].memoLoadingHide()
    },
    /* async getLikeCount () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.actYn = true
      param.targetKind = 'C'
      param.targetKey = this.CONT_DETAIL.contentsKey
      param.doType = 'LI'
      // eslint-disable-next-line no-unused-vars
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getUserDoListPage',
        param: param
      })
    }, */
    async saveMemo (text) {
      this.saveMemoLoadingYn = true
      // eslint-disable-next-line no-new-object
      var memo = new Object()
      memo.parentMemoKey = null
      if (this.mememoValue !== undefined && this.mememoValue !== null && this.mememoValue !== {}) {
        memo.parentMemoKey = this.mememoValue.parentMemoKey
      }

      memo.bodyFullStr = text
      /* memo.bodyFilekey  */
      memo.targetKind = 'C'
      memo.targetKey = this.CONT_DETAIL.contentsKey
      // memo.toUserKey = this.CONT_DETAIL.creUserKey 대댓글때 사용하는것임
      memo.creUserKey = this.GE_USER.userKey
      memo.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      memo.userName = this.$changeText(this.GE_USER.userDispMtext)
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveMemo',
        param: { memo: memo }
      })
      if (result.data.result === true || result.data.result === 'true') {
        this.memoShowYn = false
        // if (this.mememoValue !== undefined && this.mememoValue !== null && this.mememoValue !== {}) {
        //   await this.getMemoList(true)
        // } else {
        //   await this.getMemoList()
        // }
        this.getMemoList(true)
      }
      this.saveMemoLoadingYn = false
    },
    async settingFileList () {
      if (this.CONT_DETAIL && this.CONT_DETAIL.attachFileList !== undefined && this.CONT_DETAIL.attachFileList.length > 0) {
        var attachFileList = []
        for (var a = 0; a < this.CONT_DETAIL.attachFileList.length; a++) {
          if (this.CONT_DETAIL.attachFileList[a].attachYn) {
            attachFileList.push(this.CONT_DETAIL.attachFileList[a])
          }
        }
        var bodyImgFileList = []
        var addFalseImgList = document.querySelectorAll('#boardBodyArea .formCard .addFalse')
        if (addFalseImgList) {
          for (var s = 0; s < this.CONT_DETAIL.attachFileList.length; s++) {
            var attFile = this.CONT_DETAIL.attachFileList[s]
            for (var i = 0; i < addFalseImgList.length; i++) {
              if (Number(addFalseImgList[i].attributes.filekey.value) === Number(attFile.fileKey)) {
                addFalseImgList[i].setAttribute('mmFilekey', attFile.mmFilekey)
                bodyImgFileList.push(attFile)
                break
              }
            }
          }
        }
        var cont = this.CONT_DETAIL
        cont.D_ATTATCH_FILE_LIST = attachFileList
        cont.D_BODY_IMG_FILE_LIST = bodyImgFileList
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
      }
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    },
    async settingUserDo (userDo) {
      var D_CONT_USER_DO = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }, { doType: 'RE', doKey: false }]

      if (userDo !== undefined && userDo !== null && userDo !== '') {
        // eslint-disable-next-line no-array-constructor
        /* this.userDoStickerList = new Array() */
        for (var i = 0; i < userDo.length; i++) {
          if (userDo[i].doType === 'LI') {
            D_CONT_USER_DO[1].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'ST') {
            D_CONT_USER_DO[0].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'RE') {
            D_CONT_USER_DO[2].doKey = true
          }
          /* if (userDo[i].doType === 'SK') {
            this.userDoStickerList.push(userDo[i].sticker)
          } */
        }
      }
      /* var cont = this.CONT_DETAIL
      cont.D_CONT_USER_DO = D_CONT_USER_DO
      this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont]) */
      return D_CONT_USER_DO
    },

    async changeAct (act, key) {
      // eslint-disable-next-line no-unused-vars
      var result = null
      var saveYn = true
      var temp = []
      if (!this.CONT_DETAIL.D_CONT_USER_DO) {
        this.CONT_DETAIL.D_CONT_USER_DO = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }, { doType: 'RE', doKey: false }]
      }
      if (this.CONT_DETAIL.D_CONT_USER_DO) {
        temp = this.CONT_DETAIL.D_CONT_USER_DO
      }
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].doType === act.doType) {
          if (temp[i].doKey === 1) return
        }
      }
      // this.pushDetail = JSON.parse(this.detailVal).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = key
      if (param.targetKey === null) { return }
      param.doType = act.doType
      param.userName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
      if (saveYn === false) {
        param.doKey = act.doKey
        result = this.$saveUserDo(param, 'delete')
        if (act.doType === 'LI') {
          this.CONT_DETAIL.likeCount -= 1
        }
        for (i = 0; i < temp.length; i++) {
          if (temp[i].doType === act.doType) {
            temp[i].doKey = 0
          }
        }
        this.CONT_DETAIL.D_CONT_USER_DO = temp
        this.changeData += 1
      } else {
        param.actYn = true
        param.targetKind = 'C'
        var this_ = this
        this.$saveUserDo(param, 'save').then(result => {
          // debugger
          for (var d = temp.length - 1; d >= 0; d--) {
            if (temp[d].doType === act.doType) {
              temp[d].doKey = result.doKey
            }
          }
          // temp.push({ doType: act.doType, doKey: result.doKey })
          this_.CONT_DETAIL.D_CONT_USER_DO = temp
          this_.changeData += 1
          this_.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', [this_.CONT_DETAIL])
        })
        for (var d = temp.length - 1; d >= 0; d--) {
          if (temp[d].doType === act.doType) {
            temp[d].doKey = 1
          }
        }
        if (act.doType === 'LI') {
          this.CONT_DETAIL.likeCount += 1
        }
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', [this.CONT_DETAIL])
        // }
      }
    },
    goChanDetail () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      // eslint-disable-next-line no-new-object
      var value = new Object()
      params.targetType = 'chanDetail'
      params.targetKey = this.CHANNEL_DETAIL.teamKey
      value.nameMtext = this.CHANNEL_DETAIL.nameMtext
      params.value = this.CHANNEL_DETAIL.teamKey
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
    },
    pointAni () {
      var firstMemoCard = document.querySelectorAll('#memoWrap .memoCard')[0]
      if (firstMemoCard) {
        firstMemoCard.style.boxShadow = '0 0 15px 4px #6768a75c'
        firstMemoCard.style.transition = 'box-shadow 0.7s ease-in-out'
        setTimeout(() => {
          firstMemoCard.style.boxShadow = 'none'
        }, 1000)
      } else {
      }
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
    padding-bottom: 50px;
}
.boardBorder{width: 100%; height: 20px; padding-bottom: 10px; border-bottom: 1.5px dashed #ccc; float: left;}
.boardDetailWrap{height: fit-content; z-index: 99999; width: 100%; height: 100%; padding-top: 50px; width: 100%; background: rgb(236, 230, 204); height: calc(100vh);}
.pushDetailTopArea{min-height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 50px;height: 50px;}
/* .pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.2rem;} */
.pushDetailHeaderTextArea{width: calc(100% - 48px); cursor: pointer; float: left;margin-top: 0.2rem;}

#alimCheckArea{min-height: 35px;}
.alimCheckContents{width: 100%;float: right; min-height: 30px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100% - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}

.pushMbox{margin-bottom: 20px;}

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
  min-height: 22rem;
  padding-bottom: 3rem;

}

.showMemoPop-enter {
  bottom: 0;
  animation: showMemoPop-dialog-fade-in 0.2s ease;
}
.showMemoPop-leave{
  bottom: 100px;
}
/* @keyframes showMemoPop-dialog-fade-in {
  0% {bottom: -100px};
  100% {top: 0px;}
}
@keyframes showMemoPop-dialog-fade-out {
    0% {top: 0px}
    100% { bottom: -100px}
}*/
.showMemoPop-enter {animation: showMemoPop-dialog-fade-in 0.2s ease;}
.showMemoPop-leave {animation: showMemoPop-dialog-fade-out 0.2s ease forwards;}
.showMemoPop-enter-active {animation: showMemoPop-dialog-fade-in 0.2s ease;}
.showMemoPop-leave-active {animation: showMemoPop-dialog-fade-out 0.2s ease forwards;}
@keyframes showMemoPop-dialog-fade-in {
    /* 0% {transform: translateY(var(--widndowHeight));}
    100% {transform: translateY(0);} */
    0% {bottom: -100px;}
    100% {bottom: 0;}
}
@keyframes showMemoPop-dialog-fade-out {
    /* 0% {transform: translateY(0);}
    100% { transform: translateY(var(--widndowHeight));} */
    0% {bottom: 0;}
    100% {bottom: -100px;}
}
.memoBoxBackground{width: 100%; height: 100vh; background: #00000036; position: absolute; top: 0; left: 0;}
/* .copyTextWrap{background: #6768a7; width: 35px; height: 35px; float: right; border-radius: 5px; padding: 0 0 0 1px; margin-right: 10px;} */
.boardDetailChanLogoImgWrap {width: 40px; float: left; display: flex; align-items: center; justify-content: center; height: 40px; border-radius: 40px; margin-right: 0.5rem; border: 2px solid #ccc; position: relative;;}
</style>
