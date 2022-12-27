<template>
    <div v-if="!childShowYn" style="width: 100%; min-height: 20px; display: flex; margin-bottom: 5px; ">
        <div style="width: 90px; margin-right: 10px; height: 100%;" @click="clickMemoEvnt({ 'targetType': 'goUserProfile', 'value': propMemoEle })">
            <p class="commonBlack textLeft font14 fontBold">{{this.$changeText(propMemoEle.userDispMtext)}}</p>
        </div>
        <div style="width: calc(100% - 100px); min-height: 20px;" @click="clickMemoEvnt({ 'targetType': 'goContentsDetail', 'value': propMemoEle })">
            <!-- <p class="commonBlack textLeft font14" v-html="$cutText($decodeHTML(propMemoEle.bodyFullStr), 80)"></p> -->
            <pre class="commonBlack textLeft font14" v-html="$decodeHTML(propMemoEle.bodyFullStr)"></pre>
        </div>
    </div>
    <div v-else-if="propMemoEle" style="width: 100%; float: left; height: 100%; margin-bottom: 20px; border-bottom: 1px solid #cccccc50;">
        <div style="width: 100%; min-height: 20px; display: flex; flex-direction: column; margin-bottom: 5px;float: left; position: relative;">
            <div style="width: 100%; min-height: 40px; display: flex;">
                <img src="../../../assets/images/push/contents_moreBtnIcon.svg" style="position: absolute; right: 5px; top: 0;" alt="" @click="contMenuClick(propMemoEle)">
                <!-- <div :style="this.GE_USER.userKey === propMemoEle.creUserKey? 'border: 2px solid #5B1CFC; ': 'border: 2px solid rgba(0, 0, 0, 0.1)!important;'" style="width: 40px; display: flex; justify-content: center; align-items: center; border-radius: 100%; margin-right: 10px; height: 40px;">
                    <div :style="'background-image: url(' + propMemoEle.domainPath + propMemoEle.userProfileImg + ');'" style="height: 36px; width: 36px; border-radius: 100%;  background-repeat: no-repeat; background-position: center; background-size: cover;"></div>
                </div> -->
                <gProfileImg :selfYn="propMemoEle.creUserKey === this.GE_USER.userKey ? true: false" :userInfo="propMemoEle" style="width: 40px; height: 40px; margin-right: 5px; margin-top: 3px; margin-bottom: 5px;" />
                <div style="float: left; display: flex; flex-direction: column; margin-right: 10px; min-height: 20px; margin-top: 5px;">
                    <p class="fl commonBlack mright-05 textLeft font14 fontBold" @click="clickMemoEvnt({ targetType: 'goUserProfile', value: propMemoEle })">{{this.$changeText(propMemoEle.userDispMtext)}}</p>
                    <p class="fl commonGray textLeft font12"  style="font-weight:normal;">{{this.$changeDateMemoFormat(propMemoEle.creDate)}}</p>
                </div>
            </div>
            <div style="width: calc(100%); padding-left: 10px; min-height: 40px; display: flex; flex-direction: column;">
                <div style="min-height: 20px; width: 100%; min-height: 20px;">
                    <div style="width: 100%; float: left; margin-top: 10px;margin-top: 10px;" v-if="getAttachTrueFile(propMemoEle.attachFileList).length > 0">
                        <p @click="showFileDownloadPop(propMemoEle)" class="textLeft cursorP fr font12 mright-1 fontBold commonColor">첨부파일({{getAttachTrueFile(propMemoEle.attachFileList).length}})</p>
                    </div>
                    <div v-if="getAttachFalseFile(propMemoEle.attachFileList).length > 0" :style="'height: ' + getMaxHeight(propMemoEle.attachFileList) + 'px'" style="float: left; max-width: 100%; background: rgb(238 238 238); float: left; border: 1px solid #aaa; padding-left: 10px ; margin: 10px 0; overflow: scroll hidden;">
                        <div id="memoBodyImgWrap" style="float: left; height: 100%; display:flex; align-items: center;" :style="'width:' + getImgListWidthSize(propMemoEle.attachFileList) + 'px'">
                            <img @click="this.openImgPop(propMemoEle, index)" :style="'max-height: ' + getMaxHeight(propMemoEle.attachFileList) + 'px'" style="border-right: 1px solid #aaa; border-left: 1px solid #aaa; margin-right: 10px; float: left; min-width: 70px" :fileKey="img.fileKey" v-for="(img, index) in getAttachFalseFile(propMemoEle.attachFileList)" :key="index" :src="img.domainPath + img.pathMtext" alt="">
                        </div>
                    </div>
                    <pre v-if="!this.mChangeMemoYn" class="commonBlack w-100P textLeft fl font14" v-html="this.$decodeHTML(propMemoEle.bodyFullStr)" :id="'memoFullStr'+propMemoEle.memoKey"></pre>
                    <pre v-else ref="modiMemoInput" :id="'memoFullStr'+propMemoEle.memoKey" class="editableContent  w-100P textLeft font14 cursorDragText" contenteditable=true style="margin-left: 5px; width: 100%;float: left; height: 100%; min-height: 30px; border-radius: 5px; padding: 0 5px; border: 1px solid #ccc; word-break: break-word;" v-html="mModiMemoInput"></pre>
                </div>
                <div style="min-height: 20px; margin-top: 10px;  width: 100%; padding-right: 10px; min-height: 20px;">
                    <p @click="deleteConfirm(propMemoEle)" v-if="this.GE_USER.userKey === propMemoEle.creUserKey && !this.mChangeMemoYn" class="commonGray mleft-1 textLeft font12 fr">삭제</p>
                    <p @click="this.mChangeMemoYn = false" v-if="this.GE_USER.userKey === propMemoEle.creUserKey && this.mChangeMemoYn" class="commonGray mleft-1 textLeft font12 fr">닫기</p>
                    <p class="commonGray textLeft font12 fr" v-if="!this.mChangeMemoYn" @click="writeMeMemo(propMemoEle)">답글달기</p>
                    <!-- <p class="commonGray textLeft font12 cursorP fr " @click="modiMemo(propMemoEle)" v-if="this.GE_USER.userKey === propMemoEle.creUserKey && !this.mChangeMemoYn">수정</p>
                    <p class="commonGray textLeft font12 cursorP fr " @click="saveModiMemo(propMemoEle)" v-if="this.GE_USER.userKey === propMemoEle.creUserKey && this.mChangeMemoYn">저장</p> -->
                </div>
            </div>
        </div>
        <div style="width: 100%; float: left; padding-left: 40px; min-height: 20px;">
            <div v-for="(cmemo, cIndex) in propMemoEle.cmemoList" :key="cIndex" style="width: 100%; min-height: 20px; display: flex; flex-direction: column; margin-bottom: 5px;float: left; position: relative;">
                <div style="width: 100%; min-height: 40px; display: flex;">
                    <img src="../../../assets/images/push/contents_moreBtnIcon.svg" style="position: absolute; right: 5px; top: 0;" alt="" @click="contMenuClick(cmemo)">
                    <gProfileImg :selfYn="cmemo.creUserKey === this.GE_USER.userKey ? true: false" :userInfo="cmemo" style="width: 40px; height: 40px; margin-right: 5px; margin-bottom: 5px;" />
                    <div style="float: left; display: flex; flex-direction: column; margin-top: 2px; margin-right: 10px; min-height: 20px;">
                        <p class="fl commonBlack mright-05 textLeft font14 fontBold" @click="clickMemoEvnt({ targetType: 'goUserProfile', value: cmemo })">{{this.$changeText(cmemo.userDispMtext)}}</p>
                        <p class="fl commonGray textLeft font12"  style="font-weight:normal;">{{this.$changeDateMemoFormat(cmemo.creDate)}}</p>
                    </div>
                </div>
                <div style="width: calc(100%); margin-top: 10px; padding-left: 10px; min-height: 40px; display: flex; flex-direction: column;">
                    <div style="width: 100%; float: left; min-height: 20px;" v-if="cmemo.attachMfilekey && cmemo.attachFileList && cmemo.attachFileList.length > 0">
                        <div style="width: 100%; float: left; margin-top: 10px;" v-if="cmemo.attachFileList && cmemo.attachFileList.length > 0 && getAttachTrueFile(cmemo.attachFileList).length > 0">
                            <p @click="showFileDownloadPop(cmemo)" class="textLeft cursorP fr font12 mright-1 fontBold commonColor">첨부파일({{getAttachTrueFile(cmemo.attachFileList).length}})</p>
                        </div>
                        <div v-if="cmemo.attachFileList && cmemo.attachFileList.length > 0" :style="'height: ' + getMaxHeight(cmemo.attachFileList) + 'px'" style="max-width: 100%; float: left; background: rgb(238 238 238); float: left; border: 1px solid #aaa; padding-left: 10px ; float: left;  overflow: scroll hidden;">
                            <div id="mememoBodyImgWrap" style="float: left; height: 100%;" :style="'width:' + getImgListWidthSize(cmemo.attachFileList) + 'px'">
                                <template v-for="(cImg, cIndex) in cmemo.attachFileList" :key="cIndex"  >
                                    <img  @click="openImgPop(cmemo, cIndex)" :style="'max-height: ' + getMaxHeight(cmemo.attachFileList) + 'px'" style="border-right: 1px solid #aaa; border-left: 1px solid #aaa; margin-right: 10px; float: left; min-width: 70px;" :fileKey="cImg.fileKey" v-if="!cImg.attachYn" :src="cImg.domainPath + cImg.pathMtext" alt="">
                                </template>
                            </div>
                        </div>
                    </div>
                    <div style="min-height: 20px; width: 100%; min-height: 20px; margin-top: 5px;">
                        <pre class="commonBlack textLeft font14" v-html="this.$decodeHTML(cmemo.bodyFullStr)" :id="'memoFullStr'+cmemo.memoKey" ></pre>
                    </div>
                    <div style="min-height: 20px; width: 100%; margin-top: 5px; padding-right: 10px; min-height: 20px;">
                        <p @click="deleteConfirm(cmemo)" v-if="this.GE_USER.userKey === cmemo.creUserKey" class="commonGray mleft-1 textLeft font12 fr">삭제</p>
                        <p class="commonGray textLeft font12 fr"  @click="writeMeMemo(cmemo)">답글달기</p>
                        <!-- <p class="commonGray textLeft font12 fr cursorP mright-1" @click="writeMeMemo(cmemo)" v-if="this.GE_USER.userKey === cmemo.creUserKey">수정</p> -->
                    </div>
                </div>
            </div>
        </div>
        <attachFileListPop :propFileData="this.mAttachFileList" v-if="mFilePopShowYn === true" @closePop="mFilePopShowYn = false"/>
        <imgLongClickPop @closePop="this.mImgDetailAlertShowYn = false" @clickBtn="longClickAlertClick" v-if="mImgDetailAlertShowYn" />

        <imgPreviewPop :startIndex="startIndex" :mFileKey="selectedImgPopObj.attachMfilekey"  @closePop="this.mPreviewPopShowYn = false " v-if="selectedImgPopObj && mPreviewPopShowYn && selectedImgPopObj.attachMfilekey" style="width: 100%; height: calc(100%); position: absolute; top: 0px; left: 0%; z-index: 999999; padding: 20px 0; background: #000000;" :creUserName="selectedImgPopObj.userDispMtext"  />
        <gConfirmPop :confirmText='mConfirmText' :confirmType='mConfirmType' v-if="mConfirmPopShowYn" @ok="confirmOk()" @no='mConfirmPopShowYn=false'/>
    </div>
<gReport v-if="mContMenuShowYn" @closePop="mContMenuShowYn = false"  @report="report" @editable="editable" @bloc="bloc" :contentsInfo="propMemoEle" contentType="MEMO" :contentOwner="this.GE_USER.userKey === propMemoEle.creUserKey"/>
</template>

<script>
import { onMessage } from '../../../assets/js/webviewInterface'
import imgPreviewPop from '@/components/popup/file/Tal_imgPreviewPop.vue'
import attachFileListPop from '../main/unit/D_commonAttatchFileListPop.vue'
export default {
  props: {
    propMemoEle: {},
    diplayCount: {},
    childShowYn: {},
    propContDetail: {}
  },
  components: {
    attachFileListPop,
    imgPreviewPop
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  data () {
    return {
      mImgDetailAlertShowYn: false,
      mPreviewPopShowYn: false,
      mChildrenPreviewPopShowYn: false,
      mConfirmText: '',
      mConfirmType: 'one',
      mConfirmPopShowYn: false,
      mCurrentConfirmType: '',
      mTempData: null,
      mCurrentMemoObj: {},
      mContMenuShowYn: false,
      mChangeMemoYn: false,
      mModiMemoInput: '',
      attachTrueFileList: [],
      attachFalseFileList: [],
      mFilePopShowYn: false,
      mAttachFileList: { D_ATTATCH_FILE_LIST: [], D_BODY_IMG_FILE_LIST: [] },
      selectedImgPopObj: null,
      startIndex: 0
    }
  },
  mounted () {
    // this.addImgEvnt()
  },
  created () {
    if (this.propMemoEle.bodyFullStr) {
      this.mModiMemoInput = this.propMemoEle.bodyFullStr
    }
    if (this.propMemoEle.attachMfilekey && this.propMemoEle.attachFileList && this.propMemoEle.attachFileList.length > 0) {
      for (var i = 0; i < this.propMemoEle.attachFileList.length; i++) {
        if (this.propMemoEle.attachFileList[i].attachYn) {
          this.attachTrueFileList.push(this.propMemoEle.attachFileList[i])
        } else if (!this.propMemoEle.attachFileList[i].attachYn) {
          this.attachFalseFileList.push(this.propMemoEle.attachFileList[i])
        }
      }
    }
  },
  updated () {
    /* try {
      if (this.propMemoEle.attachMfilekey && this.propMemoEle.attachFileList && this.propMemoEle.attachFileList.length > 0) {
        this.attachTrueFileList = []
        this.attachFalseFileList = []
        for (var i = 0; i < this.propMemoEle.attachFileList.length; i++) {
          if (this.propMemoEle.attachFileList[i].attachYn) {
            this.attachTrueFileList.push(this.propMemoEle.attachFileList[i])
          } else if (!this.propMemoEle.attachFileList[i].attachYn) {
            this.attachFalseFileList.push(this.propMemoEle.attachFileList[i])
          }
        }
      }
    } catch (error) {
      console.log(error)
    } */
  },
  methods: {
    getAttachTrueFile (list) {
      if (!list) return []
      var resultList = []
      for (var i = 0; i < list.length; i++) {
        if (list[i].attachYn) {
          resultList.push(list[i])
        }
      }
      return resultList
    },
    getAttachFalseFile (list) {
      if (!list) return []
      var resultList = []
      for (var i = 0; i < list.length; i++) {
        if (!list[i].attachYn) {
          resultList.push(list[i])
        }
      }
      return resultList
    },
    getMaxHeight (imgList) {
      var maxHeight = 0
      for (var i = 0; i < imgList.length; i++) {
        if (imgList[i].attachYn) {
          continue
        }
        var img = new Image()
        img.src = imgList[i].domainPath + imgList[i].pathMtext
        var imgH = img.height
        if (maxHeight < imgH && imgH <= 300) {
          maxHeight = imgH
        }
        if (maxHeight === 0) maxHeight = 300
      }
      return maxHeight
    },
    getImgListWidthSize (imgList) {
      var imgWidth = 0
      for (var i = 0; i < imgList.length; i++) {
        if (imgList[i].attachYn) {
          continue
        }
        var img = new Image()
        img.src = imgList[i].domainPath + imgList[i].pathMtext
        var imgW = img.width
        if (img.height && img.height > 300) {
          imgW = img.width * (300 / img.height)
        }
        if (imgW) imgWidth += (imgW + 12)
        else imgWidth += 300
      }
      return imgWidth
    },
    openImgPop (value, index) {
      this.selectedImgPopObj = value
      this.startIndex = index
      this.mPreviewPopShowYn = true
    },
    async imgDownload () {
      // eslint-disable-next-line no-debugger
      debugger
      try {
        if (this.$getMobileYn()) {
          onMessage('REQ', 'saveCameraRoll', this.mSelectImgObject.path)
        } else {
          // eslint-disable-next-line no-unused-vars
          var result = await this.$downloadFile(this.mSelectImgObject.fileKey, this.mSelectImgObject.path)
        }
        this.$showToastPop('저장되었습니다.')
        this.mImgDetailAlertShowYn = false
      } catch (error) {
        console.log(error)
      }
    },
    showFileDownloadPop (fileObj) {
      if (fileObj.attachMfilekey && fileObj.attachFileList && fileObj.attachFileList.length > 0) {
        for (var i = 0; i < fileObj.attachFileList.length; i++) {
          if (fileObj.attachFileList[i].attachYn) {
            this.mAttachFileList.D_ATTATCH_FILE_LIST.push(fileObj.attachFileList[i])
          } else if (!fileObj.attachFileList[i].attachYn) {
            this.mAttachFileList.D_BODY_IMG_FILE_LIST.push(fileObj.attachFileList[i])
          }
        }
      }
      this.mFilePopShowYn = true
    },
    saveModiMemo (oriMemo) {
      this.mChangeMemoYn = false
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.memoKey = oriMemo.memoKey
      param.bodyFullStr = this.$refs.modiMemoInput.innerHTML
      param.bodyMinStr = this.$refs.modiMemoInput.innerHTML
      param.targetType = oriMemo.targetType
      param.targetKey = oriMemo.targetKey

      this.$emit('saveModiMemo', { oriMemo: oriMemo, param: param })
    },
    modiMemo (memo) {
      this.mChangeMemoYn = true
    },
    contMenuClick (memoContents) {
      this.mTempData = memoContents
      this.mContMenuShowYn = true
    },
    editable (type, allYn) {
      this.mContMenuShowYn = false
      // tempData는 어떤 컨텐츠가 올지, 어떤 Function이 올지 몰라 해당 컨텐츠의 데이터를 일단 받아주는 변수입니다..!
      if (type === 'edit') {
        // 댓글 수정

        // this.$refs.commonPushListMemoRefs[0].editMemoClick(this.tempData, this.tempData.index, this.tempData.cIndex)
      } else if (type === 'delete') {
        // 댓글 삭제
        // this.deleteConfirm('memo')
        this.deleteMemo()
      } else if (type === 'textCopy') {
        this.textCopy()
      }
    },
    confirmOk () {
      var toastText = ''
      this.mConfirmType = 'timeout'
      if (this.mCurrentConfirmType === 'BLOC') {
        var param = {}
        param.claimType = 'BLOC'
        param.targetKind = 'U'
        param.targetKey = this.mTempData.creUserKey
        // if (this.CONT_DETAIL.contentsKey) {
        //   param.targetKind = 'C'
        //   param.targetKey = this.CONT_DETAIL.contentsKey
        // } else return false
        param.creUserKey = this.GE_USER.userKey
        toastText = '해당 유저를 차단했습니다.'
        console.log(toastText)
        this.saveActAxiosFunc(param, toastText)
      } else if (this.mCurrentConfirmType === 'memoDEL') {
        this.deleteMemo()
      }

      this.mCurrentConfirmType = ''
      this.mConfirmPopShowYn = false
    },
    bloc (type) {
      var typeText = type === 'USER' ? '유저를' : '게시글을'
      this.mConfirmText = '해당 ' + typeText + ' 차단하시겠습니까?'
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
      this.mCurrentConfirmType = 'BLOC'
    },
    report (type) {
      var targetKind
      var targetKey
      var toastText

      if (type === 'MEMO') {
        targetKind = 'C'
        targetKey = this.propMemoEle.memoKey
        toastText = '해당 댓글이 신고되었습니다.'
      } else if (type === 'CHANNEL') {
        targetKind = 'T'
        targetKey = this.CONT_DETAIL.creTeamKey
        toastText = '해당 채널이 신고되었습니다.'
      } else if (type === 'USER') {
        targetKind = 'U'
        targetKey = this.propMemoEle.creUserKey
        toastText = '해당 유저가 신고되었습니다.'
      }
      var param = {}
      param.claimType = 'REPO'
      param.targetKind = targetKind
      param.targetKey = parseInt(targetKey)
      param.creUserKey = this.GE_USER.userKey
      this.saveActAxiosFunc(param, toastText)
    },
    /** 신고, 차단, 탈퇴를 할 수 있는 axios함수 // actType, targetKind, targetKey, creUserKey 보내기 */
    async saveActAxiosFunc (param, toastText) {
      try {
        var result = await this.$commonAxiosFunction({
          url: 'service/tp.saveClaimLog',
          param: param
        })
        console.log(result)
        if (result) {
          this.$showToastPop(toastText)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.mContMenuShowYn = false
      }
    },
    clickMemoEvnt (emitData) {
      this.$emit('memoEmitFunc', emitData)
    },
    deleteConfirm (data) {
      // eslint-disable-next-line no-debugger
      debugger
      if ((data !== undefined && data !== null && data !== '') && (data !== 'alim' && data !== 'memo' && data !== 'board')) {
        this.mTempData = data
      }

      if (this.mTempData.parentMemoKey) {
        this.mConfirmText = '대댓글을 삭제하시겠습니까?'
      } else if (this.mTempData.memoKey) {
        this.mConfirmText = '댓글을 삭제하시겠습니까?'
      }
      this.mCurrentConfirmType = 'memoDEL'
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
    },
    textCopy () {
      const textarea = document.createElement('textarea')
      document.body.appendChild(textarea)
      var content = document.getElementById('memoFullStr' + this.mTempData.memoKey).innerText
      try {
        textarea.value = content
        textarea.select()
        // 복사 후 textarea 지우기
        document.execCommand('copy')
        document.body.removeChild(textarea)
        this.$showToastPop('복사되었습니다.')
      } catch (error) {
        this.$showToastPop('복사하지 못했습니다.')
      }
    },
    async deleteMemo () {
      var memo = {}
      memo.memoKey = this.mTempData.memoKey

      try {
        var result = await this.$commonAxiosFunction({
          url: 'service/tp.deleteMemo',
          param: memo
        })

        if (result.data.result === true) {
          // var cont = this.currentMemoObj
          var cont = this.propContDetail
          var index, cmemoListIdx
          if (this.mTempData.parentMemoKey) {
            // 댓글의 부모키값이 있으면 컨텐츠의 댓글 중 부모의 키값을 찾음
            index = cont.D_MEMO_LIST.findIndex((item) => item.memoKey === this.mTempData.parentMemoKey)

            // 컨텐츠의 댓글 중 부모키값의 인덱스에 자식 댓글리스트 중 삭제한 대댓글의 키를 찾음
            cmemoListIdx = cont.D_MEMO_LIST[index].cmemoList.findIndex(i => i.memoKey === this.mTempData.memoKey)

            // 찾은 대댓글의 키를 리스트에서 삭제함
            cont.D_MEMO_LIST[index].cmemoList.splice(cmemoListIdx, 1)
          } else {
            index = cont.D_MEMO_LIST.findIndex((item) => item.memoKey === this.mTempData.memoKey)
            cont.D_MEMO_LIST.splice(index, 1)
          }
          cont.memoCount -= 1
          this.$store.dispatch('D_CHANNEL/AC_DEL_MEMO_REPLACE_CONTENT', [cont])
          // this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
        }
        this.$showToastPop('댓글을 삭제하였습니다.')
        this.mConfirmPopShowYn = false
      } catch (error) {
        this.$showToastPop('정상적으로 완료하지 못했습니다.')
        this.mConfirmPopShowYn = false
        console.log(error)
      }
    },
    writeMeMemo (memo) {
      /* if (this.mCurrentMemoObj.memoKey !== memo.memoKey) {
        // this.$emit('clearMemo')
        this.clearMemo()
      } */
      // var memoObj = JSON.parse(JSON.stringify(memo))

      this.mCurrentMemoObj = JSON.parse(JSON.stringify(memo))
      if ((this.propContDetail.jobkindId === 'ALIM' && this.propContDetail.canReplyYn === 1) || (this.propContDetail.jobkindId === 'BOAR' && this.$checkUserAuth(this.propContDetail.shareItem).R === true)) {
        var data = {}
        data.parentMemoKey = this.mCurrentMemoObj.memoKey // 대댓글때 사용하는것임
        if (this.mCurrentMemoObj.parentMemoKey !== undefined && this.mCurrentMemoObj.parentMemoKey !== null && this.mCurrentMemoObj.parentMemoKey !== '') {
          data.parentMemoKey = this.mCurrentMemoObj.parentMemoKey
        }
        data.memo = this.mCurrentMemoObj

        this.clickMemoEvnt({ targetType: 'writeMeMemo', value: data })
      } else {
        this.confirmText = '댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요.'
        this.confirmPopShowYn = true
      }
    }
  }
}
</script>

<style scoped>

</style>
