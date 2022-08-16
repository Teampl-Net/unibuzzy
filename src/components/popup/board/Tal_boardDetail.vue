<template>
  <div v-if="loadYn" class="boardDetailWrap" :style="picBgPath ? 'background: ' + picBgPath + ';' : 'background: #6768A7;'">
    <imgPreviewPop :mFileKey="alimDetail[0].attachMfilekey" :startIndex="selectImgIndex" @closePop="this.previewPopShowYn = false" v-if="previewPopShowYn" style="width: 100vw; height: calc(100%); position: fixed; top: 0px; left: 0%; z-index: 999999; padding: 20px 0; background: #000000;" :contentsTitle="alimDetail[selectedImgContentsIndex].title" :creUserName="alimDetail[selectedImgContentsIndex].creUserName" :creDate="alimDetail[selectedImgContentsIndex].dateText"  :imgList="this.clickImgList" />

    <manageStickerPop :stickerList="userDoStickerList" v-if="this.manageStickerPopShowYn" @closePop="this.manageStickerPopShowYn = false"/>
    <!-- <div>{{pushKey}}</div> -->

    <div class="pagePaddingWrap root mtop-1 overflowYScroll" ref="memoarea" >
      <div class="content pushMbox" v-for="(alim, index) in alimDetail" :key="index">
        <div class="pushDetailTopArea">
          <div class="pushDetailHeaderTextArea">
            <p class=" font18 fontBold commonColor">{{alim.title}}</p>
            <div class="fr" v-if="creUser === alim.creUserKey || (!detailVal.nonMemYn && alim.creUserKey === 0) ">
              <p class="fl mright-05 font13"  @click="openUpdateContentsPop">수정</p>
              <p class="fl mright-05 font13"  @click="boardFuncClick('BOAR')">삭제</p>
              <!-- <p class="fl" @click="boardFuncClick('REPORT')" > 신고 </p> -->
            </div>
          <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
            <p class="font12 fl lightGray">{{alim.showCreNameYn === 1? this.$changeText(alim.creUserName) : ''}}</p>
            <p class="font12 fl lightGray mleft-05">{{this.$changeDateFormat(alim.creDate)}}</p>
            <p v-if="alim.updDate" class="font12 fl lightGray">{{'(업데이트: ' + this.$changeDateFormat(alim.updDate) + ')'}}</p>
          </div>

        </div>
        <div style="position: relative;width: 100%; height: 30px; float: left; ">
          <span @click="filePopShowYn = !filePopShowYn" class="commonBlack font14 fr">파일 다운로드 <!-- <span class="font14 fontBold">({{this.attachTrueFileList.length}})</span> --></span>
          <img src="../../../assets/images/formEditor/attachFIleIcon.svg" style="width: 20px; float: right;" alt="">
          <div v-if="filePopShowYn" style="width: 70%; padding: 10px; border-radius: 10px 0 10px 10px; box-shadow: rgb(0 0 0 / 12%) 2px 3px 10px 1px; max-width: 300px; min-width: 100px; min-height: 200px; max-height: 30%; right: 0; top: 25px; background: #fff; z-index: 99999; overflow: hidden auto; border: 1px solid #ccc; position: absolute">
            <p class="commonBlack font14 fontBold textLeft mbottom-05 ">파일 다운로드 </p><!--   ({{this.attachTrueFileList.length}})</p> -->
            <templete v-for="(value, index) in this.attachTrueFileList" :key="index">
              <div  v-if="value.attachYn"  style="width: 100%; height: 30px; float: left;" >
                <p class="font12 commonBlack mtop-05" style="margin-left: 2px; margin-right: 5px; float: left" >- </p>
                <a :fileKey="value.fileKey" :filePath="value.pathMtext" @click="download1(value.fileKey)" class="font12 commonBlack textOverdot"  >
                  {{value.fileName}}
                </a>
              </div>
            </templete>
            <!-- <p class="fr">({{this.$byteConvert(value.fileSizeKb)}})</p> -->
          </div>
        </div>
        <div  id="boardBodyArea" class="font15 mbottom-2" v-html="decodeContents(alim.bodyFullStr)"></div>

        <div id="alimCheckArea">
          <div class="alimCheckContents">
            <!-- <img class="fl" src="../../../assets/images/push/attatchStickerIcon.svg" alt=""  @click="this.manageStickerPopShowYn = true">
            <div class="pushDetailStickerWrap">
              <div  v-longclick="() => changeStickerEditMode()" class="stickerDiv" :style="'background-color:' + value.picBgPath" v-for="(value, index) in this.userDoStickerList " :key="index" >
                <img :src="value.picPath" alt="">
              </div>
            </div> -->
            <div v-if="!detailVal.nonMemYn" class="w-100P fl mbottom-05">
                <p class="commonBlack font13" style="float: right;">좋아요 {{alim.likeCount}}개</p>
                <p class="commonBlack font13" style="float: right; margin-right: 10px;'">댓글 {{alim.memoCount}}개</p>
            </div>
            <div v-else class="mbottom-05 fl" style="min-height: 30px;">
              <div class="commonBlack font12" style="float: left; padding: 2px 10px; background: rgb(0 0 0 / 21%); border-radius: 5px;">{{alim.memoCount > 0? '답변완료' : '답변대기'}}</div>
            </div>
            <template v-if="!detailVal.nonMemYn">
              <div @click="changeAct(userDo, alim.contentsKey)"  class="fl" v-for="(userDo, index) in this.userDoList" :key="index">
                <template v-if="userDo.doType === 'ST'">
                  <img class="mright-05 mtop-01 fl" v-if="userDo.doKey > 0" src="../../../assets/images/common/colorStarIcon.svg" alt="">
                  <img class="mright-05 mtop-01 fl" v-else src="../../../assets/images/common/starIcon.svg" alt="">
                </template>
                <template v-else-if="userDo.doType === 'LI'">
                  <img class="mright-05 fl" style="margin-top: 4px;" v-if="userDo.doKey > 0" src="../../../assets/images/common/likeIcon.svg" alt="">
                  <img class="mright-05 fl" style="margin-top: 5px;" v-else src="../../../assets/images/common/light_likeIcon.svg" alt="">
                </template>
              </div>
            </template>
            <gBtnSmall v-if="!detailVal.nonMemYn && replyYn" btnTitle="댓글 쓰기" class="fr" btnThema="light" @click="writeMemo"/>
            <!-- <div v-if="detailVal.replyYn" class="commentBtn fr" @click="writeMemo">댓글 쓰기</div> -->
            <!-- <img @click="sendkakao" src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"  class="plusMarginBtn" style="float: right; margin-right: 5px; width: 35px;" alt="카카오톡 공유하기"> -->
            <div style="width: 28px;height: 28px; margin-top: 1px;" data-clipboard-action="copy" id="boardDetailCopyBody" @click="copyText"
                :data-clipboard-text="'https://thealim.page.link/?link=http://mo.d-alim.com:18080?boardDetail=' + this.alimDetail[0].contentsKey
                    + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더편한구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'"
                  class="copyTextWrap">
              <img src="../../../assets/images/common/copyLink.svg" class="w-100P" alt="">
            </div>
          </div>
          <div v-if='!detailVal.nonMemYn && !replyYn' class="fl w-100P mtop-05 mbottom-05" style="background-color:#cccccc50; padding: 0.5rem 0; border-radius: 10px;">
            <p class="w-100P commonBlack font13 textCenter" >관리자가 댓글 사용을 중지하였습니다.</p>
          </div>
          <div class="boardBorder"></div>
          <div class="w-100P fl" style=" min-height: 100px;" >
            <gMemoList :nonMemYn="detailVal.nonMemYn" @loadMore='loadMore'  ref="boardMemoListCompo" :memoList="memoList" @deleteMemo='deleteMemo' @editTrue='getMemoList' @mememo='writeMememo' @scrollMove='scrollMove' :replyYn='replyYn' />
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
    <transition name="showMemoPop">
      <gMemoPop transition="showMemoPop" :style="getWindowSize"  v-if="memoShowYn" @saveMemoText="saveMemo" :mememo='mememoValue' @mememoCancel='mememoCancel' />
    </transition>
    <gConfirmPop :confirmText='confirmText' :confirmType="confirmType ? 'two' : 'timeout'" v-if="confirmPopShowYn" @no='confirmPopShowYn=false, confirmType = false' @ok='confirmOk' />
  </div>
</template>
<script>
import imgPreviewPop from '../file/Tal_imgPreviewPop.vue'
import manageStickerPop from '../sticker/Tal_manageStickerPop.vue'
export default {
  data () {
    return {
      creUser: JSON.parse(localStorage.getItem('sessionUser')).userKey,
      memoList: [],
      confirmText: '',
      confirmPopShowYn: false,
      memoShowYn: false,
      loadYn: true,
      clickImgList: [],
      selectImgIndex: 0,
      selectedImgContentsIndex: 0,
      alimDetail: [],
      filePopShowYn: false,
      previewPopShowYn: false,
      // alimDetail: [{ title: '안녕하세요.', nameMtext: 'KO$^$팀플', bodyFullStr: ' 저는 정재준입니다. ', creDate: '2022-06-02 10:30' }],
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
      mememoValue: null,
      replyYn: false,
      confirmType: false,
      boardFuncType: '',
      ownerYn: false,
      offsetInt: 0,
      pagesize: 10,
      endListYn: false,
      axiosYn: false,
      totalElements: 0,
      shareAuth: { R: true, W: true, V: true },
      picBgPath: '',
      fileYn: false,
      deleteYn: false, // 나중에 삭제된 게시글을 공유하게 된다면
      blindYn: false,
      attachTrueFileList: []
    }
  },
  props: {
    detailVal: {}
  },
  components: {
    manageStickerPop,
    imgPreviewPop
  },
  created () {
    // console.log(this.detailVal)
    // console.log(this.detailVal.value.value)
    if (this.detailVal.value) {
      this.picBgPath = this.detailVal.value.picBgPath
      if (this.detailVal.value.value) {
        var temp = this.detailVal.value.value
        // eslint-disable-next-line vue/no-mutating-props
        this.detailVal.value = temp
      }
    }
    if (this.detailVal.replyYn === true || this.detailVal.replyYn === 1) {
      this.replyYn = true
    } else {
      if (this.detailVal.value) {
        if (this.detailVal.value.value !== undefined && this.detailVal.value.value !== null &&
              (this.detailVal.value.value.replyYn === true || this.detailVal.value.value.replyYn === 1)) {
          this.replyYn = true
        }
      }
    }
    if (this.detailVal.value) {
      if (this.detailVal.value.creUserKey === JSON.parse(localStorage.getItem('sessionUser')).userKey) {
        this.ownerYn = true
      }
    }
    this.getContentsList()
    this.$emit('closeLoading')
  },
  mounted () {
    var thisthis = this
    if (this.alimDetail.length > 0) {
      this.addImgEvnt()
    } else {
      setTimeout(() => {
        thisthis.addImgEvnt()
      }, 3000)
    }
  },
  computed: {
    getWindowSize () {
      return {
        '--widndowHeight': window.innerHeight + 'px'
      }
    }
  },
  methods: {
    download (link, name) {
      var iframe
      iframe = document.getElementById('hiddenDownloader')
      if (iframe == null) {
        iframe = document.createElement('iframe')
        iframe.id = 'hiddenDownloader'
        iframe.style.visibility = 'none'
        document.body.appendChild(iframe)
      }
      link = link.replaceAll('http://61.97.186.14:19090/', '')
      iframe.src = 'http://61.97.186.14:19090/Tal_fileDownload.jsp?downloadURL=' + link + '&fileName=' + name
      // iframe.download = name
      this.filePopShowYn = false
      return false
    },
    download1 (fileKey) {
      var iframe
      iframe = document.getElementById('hiddenDownloader')
      if (iframe == null) {
        iframe = document.createElement('iframe')
        iframe.id = 'hiddenDownloader'
        iframe.style.visibility = 'none'
        document.body.appendChild(iframe)
      }
      // 파일서버 fileServer fileserver FileServer Fileserver
      iframe.src = 'https://mo.d-alim.com:12443/tp.downloadFile?fileKey=' + fileKey
    },
    addImgEvnt () {
      console.log(this.alimDetail[0])
      // eslint-disable-next-line no-debugger
      // debugger
      this.clickImgList = document.querySelectorAll('#boardBodyArea img')
      for (let m = 0; m < this.clickImgList.length; m++) {
        this.clickImgList[m].addEventListener('click', () => {
          this.selectImgIndex = m
          this.previewPopShowYn = true
        })
      }
      this.settingAddFalseList(false)
    },
    async checkUserAuth () {
      if (this.detailVal) { this.shareAuth = this.detailVal.shareAuth }
      var param = {}
      param.currentTeamKey = this.alimDetail[0].creTeamKey
      param.cabinetKey = this.alimDetail[0].cabinetKey
      var resultList = await this.$getCabinetDetail(param)
      // mShareItemList가 잘 들어오면 save잘 된것
      var mCabinetContentsDetail = resultList.mCabinet
      this.shareAuth = await this.$checkUserAuth(mCabinetContentsDetail.mShareItemList)
      if (this.alimDetail[0].creUserKey === JSON.parse(localStorage.getItem('sessionUser')).userKey) {
        this.ownerYn = true
        this.shareAuth = { R: true, W: true, V: true }
        this.shareAuth.R = true
        this.shareAuth.W = true
        this.shareAuth.V = true
      }
      this.replyYn = true
      this.picBgPath = mCabinetContentsDetail.picBgPath
      if (this.detailVal.nonMemYn) {
        this.picBgPath = '#6768A7'
      }
      this.fileYn = mCabinetContentsDetail.fileYn
      this.deleteYn = mCabinetContentsDetail.deleteYn // 나중에 삭제된 게시글을 공유하게 된다면
      this.blindYn = mCabinetContentsDetail.blindYn
    },
    openUpdateContentsPop () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = this.alimDetail[0].contentsKey
      param.targetType = 'writeBoard'
      param.creTeamKey = this.alimDetail[0].creTeamKey
      if (this.alimDetail[0].attachMfilekey) { param.attachMfilekey = this.alimDetail[0].attachMfilekey }
      param.bodyFullStr = this.alimDetail[0].bodyFullStr
      param.modiContentsKey = this.alimDetail[0].contentsKey
      param.titleStr = this.alimDetail[0].title
      param.parentAttachTrueFileList = this.attachTrueFileList
      this.$emit('openPop', param)
    },
    boardFuncClick (type) {
      this.confirmPopShowYn = true
      this.confirmType = true
      this.boardFuncType = type
      if (type === 'BOAR') {
        this.confirmText = '게시글을 삭제 하시겠습니까?'
      } else if (type === 'REPORT') {
        this.confirmText = '해당 게시글을 신고 하시겠습니까?'
      }
    },
    async confirmOk () {
      this.confirmPopShowYn = false
      this.confirmType = false
      var inParam = {}
      // console.log(this.alimDetail)
      inParam.contentsKey = this.alimDetail[0].contentsKey
      inParam.jobkindId = 'BOAR'
      inParam.teamKey = this.alimDetail[0].creTeamKey
      if (this.boardFuncType === 'BOAR') {
        inParam.deleteYn = true
        await this.$commonAxiosFunction({
          url: '/tp.saveContents',
          param: inParam
        })
        this.$emit('closeXPop', true)
        // console.log('Delete Content Result' + result)
      } else if (this.boardFuncType === 'REPORT') {
        inParam.reportYn = true
        this.confirmPopShowYn = true
        this.confirmText = '신고되었습니다.'
      }
    },
    mememoCancel () {
      this.mememoValue = null
    },
    scrollMove (wich) {
      var middle = (document.innerHeight || window.innerHeight) / 2 - 100
      var memoArea = this.$refs.memoarea
      if (wich === -1) {
        wich = document.getElementById(this.memoList[this.memoList.length - 1].memoKey).offsetTop
        this.$refs.boardMemoListCompo[0].anima(this.memoList[this.memoList.length - 1].memoKey)
      }
      memoArea.scrollTo({ top: (wich - middle), behavior: 'smooth' })
    },
    writeMemo () {
      if (this.shareAuth.R === true) {
        this.mememoValue = null
        this.memoShowYn = true
      } else {
        this.confirmText = '댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요.'
        this.confirmPopShowYn = true
      }
    },
    writeMememo (memo) {
      if (this.shareAuth.R === true) {
        var data = {}
        data.parentMemoKey = memo.memoKey // 대댓글때 사용하는것임
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
      var result = await this.$commonAxiosFunction({
        url: '/tp.deleteMemo',
        param: memo
      })
      if (result.data.result === true) {
        // this.memoList = []
        await this.getContentsList()
        await this.getMemoList(true)
      }
    },
    async loadMore () {
      if (this.endListYn === false && this.axiosYn === false) {
        await this.getMemoList()
        this.offsetInt += 1
      }
    },
    async getMemoList (allYn) {
      this.$refs.boardMemoListCompo[0].memoLoadingShow()
      this.axiosYn = true
      // eslint-disable-next-line no-new-object
      var memo = new Object()
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
        this.totalElements = result.data.totalElements
        if (allYn) {
          this.memoList = result.data.content
          this.endListYn = true
        } else {
          const newArr = [
            ...this.memoList,
            ...result.data.content
          ]
          this.memoList = newArr
        }

        await this.mememoChangeList()

        this.axiosYn = false
        if (this.totalElements < (result.data.pageable.offset + result.data.pageable.pageSize)) {
          this.endListYn = true
        } else {
          this.endListYn = false
          if (allYn) {
            this.endListYn = true
          }
        }
      }
      this.$refs.boardMemoListCompo[0].memoLoadingHide()
    },
    async getLikeCount () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.actYn = true
      param.targetKind = 'C'
      param.targetKey = this.alimDetail[0].contentsKey
      param.doType = 'LI'
      // eslint-disable-next-line no-unused-vars
      var result = await this.$commonAxiosFunction({
        url: '/tp.getUserDoListPage',
        param: param
      })
    },
    mememoChangeList () {
      for (let i = 0; i < this.memoList.length; i++) {
        this.memoList[i].mememoCount = 0
        if (this.memoList[i].parentMemoKey) {
          for (let j = 0; j < this.memoList.length; j++) {
            if (this.memoList[j].memoKey === this.memoList[i].parentMemoKey) {
              this.memoList[j].mememoCount += 1
              this.memoList[i].meMemoUserDispMtext = this.$changeText(this.memoList[j].userDispMtext || this.memoList[j].userNameMtext)
              this.memoList[i].meMemoBodyMinStr = this.memoList[j].bodyFullStr
            }
          }
        }
      }
    },
    async copyText () {
      // eslint-disable-next-line no-undef
      var clip = new ClipboardJS('#boardDetailCopyBody')
      var _this = this
      clip.on('success', function (e) {
        // console.log(e)
        _this.confirmText = '게시글 링크가 복사되었습니다!'
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
      var link = 'https://thealim.page.link/?link=http://mo.d-alim.com:18080?boardDetail=' + this.alimDetail[0].contentsKey +
                        '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더 편한 구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'
      var mainLink = 'https://thealim.page.link/?link=http://mo.d-alim.com:18080' +
                        '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더 편한 구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'
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
          description: '게시글이 공유되었습니다. 지금바로 확인하러 가볼까요?',
          imageUrl: 'http://pushmsg.net/img/homepage03_1_1.427f4b7c.png',
          imageWidth: 1200,
          imageHeight: 750,
          link: {
            mobileWebUrl: link
          }
        },
        buttons: [
          {
            title: '더알림 방문하기',
            link: {
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
        await this.getContentsList()
        await this.getMemoList(true)
        this.scrollMove(-1)
      }
    },
    settingAddFalseList (attachYn) {
      // eslint-disable-next-line no-debugger
      debugger
      if (this.alimDetail[0].attachFileList !== undefined && this.alimDetail[0].attachFileList.length > 0) {
        var addFalseImgList = document.querySelectorAll('#boardBodyArea .formCard .addFalse')

        for (var s = 0; s < this.alimDetail[0].attachFileList.length; s++) {
          var attFile = this.alimDetail[0].attachFileList[s]
          if (!attachYn) {
            for (var i = 0; i < addFalseImgList.length; i++) {
              if (Number(addFalseImgList[i].attributes.filekey.value) === Number(attFile.fileKey)) {
                addFalseImgList[i].setAttribute('mmFilekey', attFile.mmFilekey)
                break
              }
            }
          } else {
            this.attachTrueFileList.push(attFile)
          }
        }
      }
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    },
    async getContentsList () {
      // eslint-disable-next-line no-new-object

      // eslint-disable-next-line no-new-object
      var param = new Object()
      // param.baseContentsKey = this.detailVal.targetKey
      param.contentsKey = this.detailVal.targetKey
      param.jobkindId = 'BOAR'
      var resultList = await this.$getContentsList(param)
      this.alimDetail = resultList.content

      // var tempuserDoList = resultList.content[0].userDoList
      if (resultList.content[0].userDoList) {
        var userDoList = resultList.content[0].userDoList
        await this.settingUserDo(userDoList)
      } else {
        this.settingUserDo()
      }
      await this.settingAddFalseList(true)
      // await this.settingUserDo(tempuserDoList)

      // console.log(this.alimDetail)
      await this.getLikeCount()
      await this.checkUserAuth()
      this.$emit('closeLoading')
    },
    settingUserDo (userDo) {
      this.userDoList = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }]
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
      param.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
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
      // console.log('resultresult')
      // console.log(result)
      if (result === true) {
        await this.getContentsList()
        // this.$emit('reloadParent')
        // this.loadYn = false
        // setTimeout(()=>{
        //   this.loadYn = true
        // },200)
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
    padding-bottom: 50px;
}
.boardBorder{width: 100%; height: 20px; padding-bottom: 10px; border-bottom: 1.5px dashed #ccc; float: left;}
.boardDetailWrap{height: fit-content; z-index: 99999; width: 100%; height: 100%; padding-top: 70px; width: 100vw; background: rgb(236, 230, 204); height: calc(100vh);}
.pushDetailTopArea{min-height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 50px;height: 50px;}
/* .pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.2rem;} */
.pushDetailHeaderTextArea{width: 100%; cursor: pointer; float: left;margin-top: 0.2rem;}

#alimCheckArea{min-height: 35px;}
.alimCheckContents{width: 100%;float: right; min-height: 30px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
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
.memoBoxBackground{width: 100vw; height: 100vh; background: #00000036; position: fixed; top: 0; left: 0;}
.copyTextWrap{background: #6768a7; width: 35px; height: 35px; float: right; border-radius: 5px; padding: 0 0 0 1px; margin-right: 10px;}
</style>
