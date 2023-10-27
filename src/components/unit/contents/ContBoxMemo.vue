<i18n>
{
  "ko": {
    "MEMO_TITLE_FILES": "개의 파일",
    "MEMO_MSG_BLOCK": "해당 유저를 차단했습니다.",
    "MEMO_MSG_NO_PERM": "댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요."
  },
  "en": {
    "MEMO_TITLE_FILES": "Files",
    "MEMO_MSG_BLOCK": "This user has been blocked.",
    "MEMO_MSG_NO_PERM": "You do not have permission to write comments. \nContact your administrator."
  }
}
</i18n>
<template>
  <div
    v-if="mModiMemoPopShowYn"
    class="modiMemoPopBg"
    @click="closeModiMemoPop"
  ></div>
  <modiMemoPop
    :propContDetail="propContDetail"
    ref="modiMemoPop"
    :pClosePop="closeModiMemoPop"
    :pMemoEle="mModiMemoObj"
    v-if="mModiMemoPopShowYn"
  />
  <div
    class="modiMemoPopBg"
    v-if="mContMenuShowYn"
    @click="mContMenuShowYn = false"
  ></div>
  <gReport
    v-if="mContMenuShowYn"
    @closePop="mContMenuShowYn = false"
    @report="report"
    @editable="editable"
    @bloc="bloc"
    :contentsInfo="propMemoEle"
    contentType="MEMO"
    :contentOwner="GE_USER.userKey === propMemoEle.creUserKey"
  />
  <div class="noChildMemoWrap" v-if="!childShowYn">
    <div
      class="noChildUserNameBox"
      @click="
        clickMemoEvnt({ targetType: 'goUserProfile', value: propMemoEle })
      "
    >
      <p class="commonBlack textLeft font14 fontBold textOverdot">
        {{ $changeText(propMemoEle.userDispMtext) }}
      </p>
    </div>
    <img
      v-if="propMemoEle.attachMfilekey"
      src="../../../assets/images/contents/icon_clip.png"
      class="attachFileIcon"
      alt=""
    />
    <div
      class="contBoxMemoArea mbottom-05 noChildMemoCont"
      :style="
        propMemoEle.attachMfilekey
          ? 'width: calc(100% - 180px);'
          : 'width: calc(100% - 160px);'
      "
      @click="
        clickMemoEvnt({ targetType: 'goContentsDetail', value: propMemoEle })
      "
    >
      <div v-if="mMemoFadeShowYn" class="w100P fl textLeft memoFade">...</div>
      <pre
        ref="mainMemoRef"
        class="commonBlack textLeft font14"
        v-html="$decodeHTML(propMemoEle.bodyFullStr)"
      ></pre>
    </div>
    <p class="fl commonGray textLeft mleft-05 font12 fontNomal">
      {{ $changeDateMemoFormat(propMemoEle.creDate) }}
    </p>
  </div>
  <div
    v-else-if="propMemoEle"
    ref="fullMemoWrap"
    class="fullMemoWrap"
    :style="
      propMIndex !== propMemoLength - 1
        ? 'border-bottom: 1px solid #cccccc50;'
        : ''
    "
  >
    <div class="parentMemoBox">
      <div class="parentMemoTop">
        <img
          class="parentMemoMore"
          v-if="!pNoAuthYn"
          src="../../../assets/images/contents/contents_moreBtnIcon.svg"
          alt=""
          @click="contMenuClick(propMemoEle)"
        />
        <gProfileImg
          class="memoUserProfile"
          @click="
            clickMemoEvnt({ targetType: 'goUserProfile', value: propMemoEle })
          "
          :selfYn="propMemoEle.creUserKey === GE_USER.userKey ? true : false"
          :userInfo="propMemoEle"
        />
        <div class="memoUserInfo">
          <p
            class="fl commonBlack mright-05 textLeft font14 fontBold"
            @click="
              clickMemoEvnt({ targetType: 'goUserProfile', value: propMemoEle })
            "
          >
            {{ $changeText(propMemoEle.userDispMtext) }}
          </p>
          <p class="fl commonGray textLeft font12 fontNomal" @click="click">
            {{ $changeDateMemoFormat(propMemoEle.creDate) }}
          </p>
        </div>
      </div>
      <div class="parentMemoContWrap">
        <div class="parentMemoContBox">
          <div
            @wheel="horizontalScroll"
            :class="mobileYn ? '' : 'thinScrollBar'"
            id="memoImgWrap"
            class="parentMemoImgWrap"
            v-if="getAttachFalseFile(propMemoEle.attachFileList).length > 0"
            :style="
              'height: ' + getMaxHeight(propMemoEle.attachFileList) + 'px'
            "
          >
            <div
              class="parentMemoImg"
              id="memoBodyImgWrap"
              :style="
                'width:' +
                getImgListWidthSize(propMemoEle.attachFileList) +
                'px'
              "
            >
              <img
                @click="
                  openImgPop(
                    getAttachFalseFile(propMemoEle.attachFileList),
                    index
                  )
                "
                :style="
                  'max-height: ' +
                  getMaxHeight(propMemoEle.attachFileList) +
                  'px'
                "
                :fileKey="img.fileKey"
                v-for="(img, index) in getAttachFalseFile(
                  propMemoEle.attachFileList
                )"
                :key="index"
                :src="img.domainPath + img.pathMtext"
                alt=""
              />
            </div>
          </div>
          <pre
            v-if="!mChangeMemoYn"
            class="commonBlack w100P textLeft fl font14 cursorDragText cursorText"
            v-html="$decodeHTML(propMemoEle.bodyFullStr)"
            :id="'memoFullStr' + propMemoEle.memoKey"
          ></pre>
          <pre
            v-else
            ref="modiMemoInput"
            :id="'memoFullStr' + propMemoEle.memoKey"
            class="editableContent w100P textLeft font14 cursorDragText parentMemoFullStr"
            contenteditable="true"
            v-html="mModiMemoInput"
          ></pre>
        </div>
        <div class="parentMemoFuncArea">
          <p
            @click="mChangeMemoYn = false"
            v-if="GE_USER.userKey === propMemoEle.creUserKey && mChangeMemoYn"
            class="commonGray mleft-1 textLeft font12 fr"
          >
            {{ $t('COMM_BTN_CLOSE') }}
          </p>
          <p
            class="commonGray textLeft font12 fr cursorP"
            v-if="!mChangeMemoYn && !pNoAuthYn"
            @click="writeMeMemo(propMemoEle)"
          >
            {{ $t('COMM_BTN_REPLY_COMM') }}
          </p>
          <p
            class="commonGray textLeft font12 mright-05 cursorP fr"
            @blur="testFunction"
            @click="openModiMemoPop(propMemoEle)"
            v-if="GE_USER.userKey === propMemoEle.creUserKey && !mChangeMemoYn"
          >
            {{ $t('COMM_BTN_EDIT2') }}
          </p>
        </div>
        <div
          class="cursorP parentMemoAttachFile"
          v-if="getAttachTrueFile(propMemoEle.attachFileList).length > 0"
        >
          <div
            class="downloadFileBtn"
            @click="showFileDownloadPop(propMemoEle)"
          >
            <img
              class="mright-05 memoAttachFileIcon"
              src="../../../assets/images/contents/attachFileIcon.png"
              alt=""
            />
            <p
              v-if="getAttachTrueFile(propMemoEle.attachFileList).length === 1"
              class="textLeft font12 fontBold commonColor attachFileName"
            >
              {{
                getFileName(
                  getAttachTrueFile(propMemoEle.attachFileList)[0].fileName
                )
              }}
            </p>
            <p
              v-if="getAttachTrueFile(propMemoEle.attachFileList).length === 1"
              class="textLeft font12 mright-1 fontBold commonColor"
            >
              .{{
                getFileExt(
                  getAttachTrueFile(propMemoEle.attachFileList)[0].fileName
                )
              }}
            </p>
            <p v-else class="textLeft font12 mright-1 fontBold commonColor">
              {{
                getAttachTrueFile(propMemoEle.attachFileList).length +
                ' ' +
                $t('MEMO_TITLE_FILES')
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="childMemoWrap">
      <div
        class="childMemoItem"
        v-for="(cmemo, cIndex) in propMemoEle.cmemoList"
        :key="cIndex"
      >
        <div class="childUserInfo">
          <img
            src="../../../assets/images/contents/contents_moreBtnIcon.svg"
            class="parentMemoMore"
            alt=""
            @click="contMenuClick(cmemo)"
          />
          <gProfileImg
            :selfYn="cmemo.creUserKey === GE_USER.userKey ? true : false"
            :userInfo="cmemo"
            class="memoUserProfile mTop-0"
          />
          <div class="memoUserInfo mTop-2">
            <p
              class="fl commonBlack mright-05 textLeft font14 fontBold"
              @click="
                clickMemoEvnt({ targetType: 'goUserProfile', value: cmemo })
              "
            >
              {{ $changeText(cmemo.userDispMtext) }}
            </p>
            <p class="fl commonGray textLeft font12 fontNomal">
              {{ $changeDateMemoFormat(cmemo.creDate) }}
            </p>
          </div>
        </div>
        <div class="parentMemoContWrap mTop-0">
          <div
            class="childImgWrap"
            v-if="
              cmemo.attachMfilekey &&
              cmemo.attachFileList &&
              cmemo.attachFileList.length > 0
            "
          >
            <div
              @wheel="horizontalScroll"
              :class="mobileYn ? '' : 'thinScrollBar'"
              id="childMemoImgWrap"
              class="childImgBox"
              v-if="getAttachFalseFile(cmemo.attachFileList).length > 0"
              :style="'height: ' + getMaxHeight(cmemo.attachFileList) + 'px'"
            >
              <div
                id="mememoBodyImgWrap"
                class="fl h100P"
                :style="
                  'width:' + getImgListWidthSize(cmemo.attachFileList) + 'px'
                "
              >
                <template
                  v-for="(cImg, cIndex) in cmemo.attachFileList"
                  :key="cIndex"
                >
                  <img
                    class="childImg"
                    @click="openImgPop(cmemo.attachFileList, cIndex)"
                    :style="
                      'max-height: ' + getMaxHeight(cmemo.attachFileList) + 'px'
                    "
                    :fileKey="cImg.fileKey"
                    v-if="!cImg.attachYn"
                    :src="cImg.domainPath + cImg.pathMtext"
                    alt=""
                  />
                </template>
              </div>
            </div>
          </div>
          <div class="childBodyStr">
            <pre
              class="commonBlack textLeft font14"
              v-html="$decodeHTML(cmemo.bodyFullStr)"
              :id="'memoFullStr' + cmemo.memoKey"
            ></pre>
          </div>
          <div class="childMemoFuncArea">
            <p
              class="commonGray textLeft font12 fr"
              @click="writeMeMemo(cmemo)"
            >
              {{ $t('COMM_BTN_REPLY_COMM') }}
            </p>
            <p
              class="commonGray textLeft font12 fr cursorP mright-1"
              @click="openModiMemoPop(cmemo)"
              v-if="GE_USER.userKey === cmemo.creUserKey"
            >
              {{ $t('COMM_BTN_EDIT2') }}
            </p>
          </div>
        </div>
        <div
          class="cursorP parentMemoAttachFile"
          v-if="
            cmemo.attachFileList &&
            cmemo.attachFileList.length > 0 &&
            getAttachTrueFile(cmemo.attachFileList).length > 0
          "
        >
          <div class="downloadFileBtn" @click="showFileDownloadPop(cmemo)">
            <img
              class="mright-05 memoAttachFileIcon"
              src="../../../assets/images/contents/attachFileIcon.png"
              alt=""
            />
            <p
              v-if="getAttachTrueFile(cmemo.attachFileList).length === 1"
              class="textLeft font12 fontBold commonColor attachFileName"
            >
              {{
                getFileName(
                  getAttachTrueFile(propMemoEle.attachFileList)[0].fileName
                )
              }}
            </p>
            <p
              v-if="getAttachTrueFile(cmemo.attachFileList).length === 1"
              class="textLeft font12 mright-1 fontBold commonColor"
            >
              .{{
                getFileExt(
                  getAttachTrueFile(propMemoEle.attachFileList)[0].fileName
                )
              }}
            </p>
            <p v-else class="textLeft font12 mright-1 fontBold commonColor">
              {{
                getAttachTrueFile(cmemo.attachFileList).length +
                ' ' +
                $t('MEMO_TITLE_FILES')
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modiMemoPopBg"
      v-if="mFilePopShowYn"
      @click="mFilePopShowYn = false"
    ></div>
    <attachFileListPop
      @updateMemo="updateMemo"
      propTargetType="R"
      :propFileData="mResultParam"
      v-if="mFilePopShowYn === true"
      @closePop="mFilePopShowYn = false"
    />
    <gConfirmPop
      :confirmText="mConfirmText"
      :confirmType="mConfirmType"
      v-if="mConfirmPopShowYn"
      @ok="confirmOk()"
      @no="mConfirmPopShowYn = false"
    />
  </div>
</template>

<script>
import modiMemoPop from '../../popup/contents/ModiMemoPop.vue'
import attachFileListPop from '../../pageComponents/main/unit/CommonAttachFileListPop'
export default {
  props: {
    propMemoLength: {},
    propMIndex: {},
    propMemoEle: {},
    childShowYn: {},
    propContDetail: {},
    pNoAuthYn: {}
  },
  components: {
    attachFileListPop,
    modiMemoPop
  },
  computed: {
    GE_USER() {
      return this.$store.getters['UB_USER/GE_USER']
    }
  },
  data() {
    return {
      mMemoFadeShowYn: false,
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
      mAttachFileList: { D_ATTACH_FILE_LIST: [], D_BODY_IMG_FILE_LIST: [] },
      mResultParam: {},
      targetMemo: {},
      mModiMemoPopShowYn: false,
      mModiMemoObj: null,
      mobileYn: this.$getMobileYn()
    }
  },
  mounted() {
    this.showMemoMore()
  },
  created() {
    if (this.propMemoEle.bodyFullStr) {
      this.mModiMemoInput = this.propMemoEle.bodyFullStr
    }
    console.log(this.propMemoEle)
    if (
      this.propMemoEle.attachMfilekey &&
      this.propMemoEle.attachFileList &&
      this.propMemoEle.attachFileList.length > 0
    ) {
      for (var i = 0; i < this.propMemoEle.attachFileList.length; i++) {
        if (this.propMemoEle.attachFileList[i].attachYn) {
          this.attachTrueFileList.push(this.propMemoEle.attachFileList[i])
        } else if (!this.propMemoEle.attachFileList[i].attachYn) {
          this.attachFalseFileList.push(this.propMemoEle.attachFileList[i])
        }
      }
    }
  },
  methods: {
    showMemoMore() {
      const a = this.$refs.mainMemoRef
      if (a) {
        const memoHeight = a.offsetHeight
        if (memoHeight > 45) {
          this.mMemoFadeShowYn = true
        } else {
          this.mMemoFadeShowYn = false
        }
      }
    },
    getFileName(fileFullName) {
      var fileName = fileFullName.substring(0, fileFullName.lastIndexOf('.'))
      return fileName
    },
    getFileExt(fileName) {
      var fileExt = fileName.substring(fileName.lastIndexOf('.') + 1)
      return fileExt
    },
    openModiMemoPop(memo) {
      this.mModiMemoObj = memo
      this.mModiMemoPopShowYn = true
    },
    closeModiMemoPop() {
      this.mModiMemoPopShowYn = false
    },
    updateMemo(param) {
      this.$emit('updateMemo', [
        param,
        this.targetMemo.memoKey,
        this.targetMemo.parentMemoKey
      ])
    },
    getAttachTrueFile(list) {
      if (!list) return []
      var resultList = []
      for (var i = 0; i < list.length; i++) {
        if (list[i].attachYn) {
          resultList.push(list[i])
        }
      }
      return resultList
    },
    getAttachFalseFile(list) {
      if (!list) return []
      var resultList = []
      for (var i = 0; i < list.length; i++) {
        if (!list[i].attachYn) {
          resultList.push(list[i])
        }
      }
      return resultList
    },
    getMaxHeight(imgList) {
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
    getImgListWidthSize(imgList) {
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
        if (imgW) imgWidth += imgW + 12
        else imgWidth += 300
      }
      return imgWidth
    },
    openImgPop(imgList, index) {
      var value = imgList
      var returnImgList = []
      for (var i = 0; i < value.length; i++) {
        var imgObject = {}
        var img = new Image()
        img.src = value[i].domainPath + value[i].pathMtext
        imgObject.src = img.src
        imgObject.fileKey = Number(value[i].fileKey)
        imgObject.width = img.width
        imgObject.height = img.height
        returnImgList.push(imgObject)
      }
      this.$emit('openImgPop', [returnImgList, index])
    },
    showFileDownloadPop(fileObj) {
      this.mAttachFileList.D_ATTACH_FILE_LIST = []
      this.mAttachFileList.D_BODY_IMG_FILE_LIST = []
      if (
        fileObj.attachMfilekey &&
        fileObj.attachFileList &&
        fileObj.attachFileList.length > 0
      ) {
        for (var i = 0; i < fileObj.attachFileList.length; i++) {
          if (fileObj.attachFileList[i].attachYn) {
            this.mAttachFileList.D_ATTACH_FILE_LIST.push(
              fileObj.attachFileList[i]
            )
          } else if (!fileObj.attachFileList[i].attachYn) {
            this.mAttachFileList.D_BODY_IMG_FILE_LIST.push(
              fileObj.attachFileList[i]
            )
          }
        }
      }
      var resultObj = {}
      resultObj.contentsKey = this.propMemoEle.targetKey
      resultObj.creUserKey = this.propMemoEle.creUserKey
      resultObj = {
        D_ATTACH_FILE_LIST: this.mAttachFileList.D_ATTACH_FILE_LIST,
        ...resultObj
      }

      this.mResultParam = resultObj
      this.mFilePopShowYn = true
      this.targetMemo = fileObj
    },
    saveModiMemo(oriMemo) {
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
    contMenuClick(memoContents) {
      this.mTempData = memoContents
      this.mContMenuShowYn = true
    },
    editable(type, allYn) {
      this.mContMenuShowYn = false
      if (type === 'edit') {
        // 댓글 수정
      } else if (type === 'delete') {
        // 댓글 삭제
        this.deleteMemo()
      } else if (type === 'textCopy') {
        this.textCopy()
      }
    },
    confirmOk() {
      var toastText = ''
      this.mConfirmType = 'timeout'
      if (this.mCurrentConfirmType === 'BLOC') {
        var param = {}
        param.claimType = 'BLOC'
        param.targetKind = 'U'
        param.targetKey = this.mTempData.creUserKey
        param.creUserKey = this.GE_USER.userKey
        toastText = this.$t('MEMO_MSG_BLOCK')
        this.saveActAxiosFunc(param, toastText)
      } else if (this.mCurrentConfirmType === 'memoDEL') {
        this.deleteMemo()
      }

      this.mCurrentConfirmType = ''
      this.mConfirmPopShowYn = false
    },
    bloc(type) {
      if (type === 'USER') {
        this.mConfirmText = this.$t('COMMON_MSG_BLOCK')
      } else {
        this.mConfirmText = this.$t('COMMON_MSG_BLOCK_BOAR')
      }
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
      this.mCurrentConfirmType = 'BLOC'
    },
    report(type) {
      var targetKind
      var targetKey
      var toastText

      if (type === 'MEMO') {
        targetKind = 'C'
        targetKey = this.propMemoEle.memoKey
        toastText = this.$t('COMMON_MSG_REPORT_COMMENT')
      } else if (type === 'USER') {
        targetKind = 'U'
        targetKey = this.propMemoEle.creUserKey
        toastText = this.$t('COMMON_MSG_REPORT_USER')
      }
      var param = {}
      param.claimType = 'REPO'
      param.targetKind = targetKind
      param.targetKey = parseInt(targetKey)
      param.creUserKey = this.GE_USER.userKey
      this.saveActAxiosFunc(param, toastText)
    },
    /** 신고, 차단, 탈퇴를 할 수 있는 axios함수 // actType, targetKind, targetKey, creUserKey 보내기 */
    async saveActAxiosFunc(param, toastText) {
      try {
        var result = await this.$commonAxiosFunction({
          url: '/tp.saveClaimLog',
          param: param
        })
        if (result) {
          this.$showToastPop(toastText)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.mContMenuShowYn = false
      }
    },
    clickMemoEvnt(emitData) {
      this.$emit('memoEmitFunc', emitData)
    },
    textCopy() {
      const textarea = document.createElement('textarea')
      document.body.appendChild(textarea)
      var content = document.getElementById(
        'memoFullStr' + this.mTempData.memoKey
      ).innerText
      try {
        textarea.value = content
        textarea.select()
        // 복사 후 textarea 지우기
        document.execCommand('copy')
        document.body.removeChild(textarea)
        this.$showToastPop(this.$t('COMMON_MSG_COPY_SUCCESS'))
      } catch (error) {
        this.$showToastPop(this.$t('COMMON_MSG_COPY_FAIL'))
      }
    },
    async deleteMemo() {
      var memo = {}

      memo.memoKey = this.mTempData.memoKey
      try {
        var result = await this.$commonAxiosFunction({
          url: '/tp.deleteMemo',
          param: memo
        })
        if (result.data.result === true) {
          var cont = this.propContDetail
          var index, cmemoListIdx
          if (this.mTempData.parentMemoKey) {
            // 댓글의 부모키값이 있으면 컨텐츠의 댓글 중 부모의 키값을 찾음
            index = cont.D_MEMO_LIST.findIndex(
              (item) => item.memoKey === this.mTempData.parentMemoKey
            )

            // 컨텐츠의 댓글 중 부모키값의 인덱스에 자식 댓글리스트 중 삭제한 대댓글의 키를 찾음
            cmemoListIdx = cont.D_MEMO_LIST[index].cmemoList.findIndex(
              (i) => i.memoKey === this.mTempData.memoKey
            )

            // 찾은 대댓글의 키를 리스트에서 삭제함
            cont.D_MEMO_LIST[index].cmemoList.splice(cmemoListIdx, 1)
          } else {
            index = cont.D_MEMO_LIST.findIndex(
              (item) => item.memoKey === this.mTempData.memoKey
            )
            cont.D_MEMO_LIST.splice(index, 1)
          }
          cont.memoCount -= 1
          this.$store.dispatch('UB_CHANNEL/AC_DEL_MEMO_REPLACE_CONTENT', [cont])
        }
        this.$showToastPop(this.$t('COMMON_MSG_DELETED_COMMENT'))
        this.mConfirmPopShowYn = false
      } catch (error) {
        this.$showToastPop(this.$t('COMMON_MSG_FAILED'))
        this.mConfirmPopShowYn = false
        console.log(error)
      }
    },
    horizontalScroll(e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 10
      })
    },
    writeMeMemo(memo) {
      this.mCurrentMemoObj = memo
      console.log(this.propContDetail)
      if (
        (this.propContDetail.jobkindId === 'BOAR' &&
          this.$checkUserAuth(this.propContDetail.shareItem).R === true) ||
        this.propContDetail.todoKey
      ) {
        var data = {}
        data.parentMemoKey = this.mCurrentMemoObj.memoKey // 대댓글때 사용하는것임
        if (
          this.mCurrentMemoObj.parentMemoKey !== undefined &&
          this.mCurrentMemoObj.parentMemoKey !== null &&
          this.mCurrentMemoObj.parentMemoKey !== ''
        ) {
          data.parentMemoKey = this.mCurrentMemoObj.parentMemoKey
        }
        data.memo = this.mCurrentMemoObj

        this.clickMemoEvnt({ targetType: 'writeMeMemo', value: data })
      } else {
        this.confirmText = this.$t('MEMO_MSG_NO_PERM')
        this.confirmPopShowYn = true
      }
    }
  }
}
</script>

<style scoped>
.modiMemoPopBg {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #00000026;
  z-index: 12;
  top: 0;
  left: 0;
}
.noChildMemoWrap {
  width: 100%;
  min-height: 20px;
  display: flex;
  margin-bottom: 5px;
  overflow: hidden;
}
.noChildUserNameBox {
  width: 95px;
  margin-right: 10px;
  min-height: 20px;
}
.attachFileIcon {
  width: 14px;
  height: 16px;
  margin-top: 1px;
  margin-right: 5px;
}
.noChildMemoCont {
  position: relative;
  min-height: 20px;
  max-height: 45px;
  overflow: hidden;
}
.memoFade {
  position: absolute;
  bottom: -6px;
}
.fullMemoWrap {
  width: 100%;
  float: left;
  min-height: 20px;
  margin-bottom: 5px;
}
.parentMemoBox {
  width: 100%;
  min-height: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  float: left;
  position: relative;
}
.parentMemoTop {
  width: 100%;
  min-height: 40px;
  display: flex;
}
.parentMemoMore {
  position: absolute;
  right: 5px;
  top: 0;
}
.memoUserProfile {
  width: 40px !important;
  height: 40px !important;
  margin-right: 5px !important;
  margin-top: 3px !important;
  margin-bottom: 5px !important;
}
.memoUserInfo {
  float: left;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  min-height: 20px;
  margin-top: 5px;
}
.parentMemoContWrap {
  width: 100%;
  padding-left: 10px;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.parentMemoContBox {
  min-height: 20px;
  width: 100%;
}
.parentMemoImgWrap {
  float: left;
  max-width: 100%;
  background: rgb(238 238 238);
  float: left;
  border: 1px solid #aaa;
  /* padding-left: 10px; */
  /* margin: 10px 0; */
  overflow: scroll hidden;
}
.parentMemoImg {
  float: left;
  height: 100%;
  display: flex;
  align-items: center;
}
.parentMemoImg > img {
  /* border-right: 0px solid #aaa; */
  /* border-left: 1px solid #aaa; */
  margin-right: 10px;
  float: left;
  min-width: 70px;
}
.cursorText {
  cursor: text;
}
.parentMemoFullStr {
  margin-left: 5px;
  width: 100%;
  float: left;
  height: 100%;
  min-height: 30px;
  border-radius: 5px;
  padding: 0 5px;
  border: 1px solid #ccc;
  word-break: break-word;
}
.parentMemoFuncArea {
  min-height: 20px;
  margin-top: 10px;
  width: 100%;
  padding-right: 10px;
  min-height: 20px;
}
.parentMemoAttachFile {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 3px;
}
.downloadFileBtn {
  width: 140px;
  display: flex;
  justify-content: flex-end;
}
.memoAttachFileIcon {
  width: auto;
  height: 18px;
}
.attachFileName {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.childMemoWrap {
  width: 100%;
  float: left;
  padding-left: 40px;
  min-height: 20px;
}
.childMemoItem {
  width: 100%;
  min-height: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  float: left;
  position: relative;
}
.mTop-0 {
  margin-top: 0 !important;
}
.mTop-2 {
  margin-top: 2 !important;
}
.childUserInfo {
  width: 100%;
  min-height: 40px;
  display: flex;
}
.childImgWrap {
  width: 100%;
  float: left;
  min-height: 20px;
}
.childImgBox {
  margin-top: 10px;
  max-width: 100%;
  float: left;
  background: rgb(238 238 238);
  float: left;
  border: 1px solid #aaa;
  padding-left: 10px;
  float: left;
  overflow: scroll hidden;
}
.childImg {
  border-right: 1px solid #aaa;
  border-left: 1px solid #aaa;
  margin-right: 10px;
  float: left;
  min-width: 70px;
}
.childBodyStr {
  min-height: 20px;
  width: 100%;
  min-height: 20px;
  margin-top: 5px;
}
.childMemoFuncArea {
  min-height: 20px;
  width: 100%;
  margin-top: 5px;
  padding-right: 10px;
  min-height: 20px;
}
/* .contBoxMemoArea::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 30px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
} */
</style>
