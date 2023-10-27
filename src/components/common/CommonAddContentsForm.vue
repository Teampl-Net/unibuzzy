<template>
  <div id="layout">
    <header>
      <!-- Popup Title -->
      <h1>{{ pOptions.purpose }}</h1>
      <button @click="pClosePop" type="button">
        <img
          src="../../assets/images/common/popup_close.png"
          alt="close button"
        />
      </button>
    </header>
    <main>
      <form>
        <!-- neccessary post values -->
        <fieldset id="neccessaryOptions">
          <legend>기본 정보 설정</legend>
          <fieldset id="postReceivers">
            <div class="selectReceiverBox">
              <legend>받는 사람 지정</legend>
              <label for="">Receiver</label>
              <div class="btnWrap">
                <button
                  type="button"
                  @click="selectAllReceivers"
                  :class="{ activeBtn: params.actorList === 'A' }"
                >
                  <img
                    v-if="params.actorList === 'A'"
                    src="../../assets/images/common/icon_check_commonColor.svg"
                    alt="check image"
                  />
                  All
                </button>
                <button
                  type="button"
                  @click="toggleReceiverSelectPop"
                  :class="{
                    activeBtn:
                      showReceiverSelectList ||
                      (params.actorList.length && params.actorList !== 'A')
                  }"
                >
                  <img
                    v-if="
                      showReceiverSelectList ||
                      (params.actorList.length && params.actorList !== 'A')
                    "
                    src="../../assets/images/common/icon_check_commonColor.svg"
                    alt="check image"
                  />
                  Select
                </button>
              </div>
            </div>
            <!-- target선택 팝업 -->
            <SelectTargetPop
              v-if="showReceiverSelectList"
              :pSelectData="receiverList"
              :pSelectedTargetList="params.actorList"
              :pSelectOnlyYn="pSelectOnlyYn"
              @saveTarget="setSelectedTargetList"
              @closeXPop="toggleReceiverSelectPop"
            />
            <!-- 선택된 target -->
            <div
              @click="toggleReceiverSelectPop"
              v-if="params.actorList.length && params.actorList !== 'A'"
              class="selectedTargetList"
            >
              <div v-for="target in params.actorList" :key="target.accessKey">
                <img
                  v-if="target.accessKind === 'U' || target.accessKind === 'C'"
                  src="../../assets/images/footer/icon_people.svg"
                  alt="person image"
                />
                <img
                  v-else
                  src="../../assets/images/channel/channer_addressBook.svg"
                  alt="address book image"
                />
                {{ target.accessName }}
              </div>
              <img
                class="plusImg"
                src="../../assets/images/formEditor/icon_formEditPlus.svg"
                alt="plus image"
              />
            </div>
          </fieldset>
          <fieldset id="optionToggleBtnWrap">
            <label for="">Options</label>
            <div class="btnWrap">
              <button
                type="button"
                @click="toggleAnonymousYn"
                :class="{ activeBtn: params.showCreNameYn }"
              >
                <img
                  v-if="params.showCreNameYn"
                  src="../../assets/images/common/icon_check_commonColor.svg"
                  alt="check image"
                />
                익명
              </button>
              <button
                type="button"
                @click="toggleCommentYn"
                :class="{ activeBtn: params.canReplyYn }"
              >
                <img
                  v-if="params.canReplyYn"
                  src="../../assets/images/common/icon_check_commonColor.svg"
                  alt="check image"
                />
                댓글
              </button>
              <button
                type="button"
                @click="toggleTitleYn"
                :class="{ activeBtn: hasTitleYn }"
              >
                <img
                  v-if="hasTitleYn"
                  src="../../assets/images/common/icon_check_commonColor.svg"
                  alt="check image"
                />
                제목
              </button>
            </div>
          </fieldset>
          <fieldset v-if="hasTitleYn" id="postTitle">
            <label for="">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Please, enter the title."
              v-model="params.title"
            />
          </fieldset>
        </fieldset>
        <!-- optional post values -->
        <fieldset id="optionalOptions">
          <legend>선택정 정보 설정</legend>
          <fieldset v-if="pOptions.model === 'mankik'" id="dateSelect">
            <legend>날짜 선택</legend>
            <label for="">Date</label>
            <div class="dateBoxWrap">
              <input
                v-if="pOptions.model === 'mankik'"
                id="fromDate"
                type="date"
                v-model="params.fromDateStr"
              />
              <span>TO</span>
              <input id="toDate" type="date" v-model="params.toDateStr" />
            </div>
          </fieldset>
          <fieldset v-if="pOptions.model === 'mankik'" id="categoryTag">
            <legend>카테고리 선택</legend>
            <label for="">Tag</label>
            <div class="btnWrap">
              <button
                type="button"
                @click="toggleSelectTag(tag, index)"
                v-for="(tag, index) in tagListForDom"
                :key="tag.categoryKey"
                :class="{ activeBtn: tag.isSelected }"
              >
                <img
                  v-if="tag.isSelected"
                  src="../../assets/images/common/icon_check_commonColor.svg"
                  alt="check image"
                />
                {{ tag.categoryNameMtext }}
              </button>
            </div>
          </fieldset>
          <fieldset
            v-if="pOptions.model === 'mankik' || pOptions.model === 'unibuzzy'"
            id="uploadFile"
          >
            <legend>파일 첨부</legend>
            <label for="">File</label>
            <AttachFile @setSelectedAttachFileList="setAttachedFile" />
          </fieldset>
          <fieldset>
            <legend>작성 내용</legend>
            <!-- <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Please, enter the contents."
              v-model="params.bodyFullStr"
            ></textarea> -->
            <FormEditor
              ref="complexEditor"
              @changeUploadList="changeUploadList"
              @setParamInnerHtml="setParamInnerHtml"
              @postToolBox="postToolBox"
            />
          </fieldset>
        </fieldset>
      </form>
      <gToolBox
        :propTools="mToolBoxOptions"
        @changeTextStyle="changeFormEditorStyle"
      />
    </main>
    <footer>
      <div class="footerBtnWrap">
        <button @click="postContents">Post</button>
        <button @click="pClosePop">Cancel</button>
      </div>
    </footer>
  </div>
  <gConfirmPop
    v-if="failPopYn"
    @no="failPopYn = false"
    confirmType="timeout"
    :confirmText="errorText"
  />
  <gConfirmPop
    v-if="contentType === 'BOAR' && checkPopYn"
    :confirmText="modiYn ? $t('FORM_MSG_EDIT') : $t('FORM_MSG_SAVE')"
    @ok="sendBoard(), (checkPopYn = false)"
    @no="confirmNo()"
  />
</template>

<script>
// system settings
import { defineComponent, ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'

// components
import SelectTargetPop from './selectTarget/SelectTargetPop.vue'
import AttachFile from '../unit/formEditor/AttachFile.vue'
import FormEditor from '../unit/formEditor/FormEditor.vue'

export default defineComponent({
  props: [
    'pOptions',
    'pUserInfo',
    'pGetTagListFn',
    'pGetReceiverList',
    'pPostContentsFn',
    'pSelectOnlyYn',
    'pClosePop'
  ],
  components: {
    SelectTargetPop,
    AttachFile,
    FormEditor
  },
  created() {
    this.$addHistoryStack('writeContents')
  },
  setup(props) {
    // submit params 세팅
    const params = reactive({
      title: '',
      actorList: [],
      toDateStr: '',
      fromDateStr: '',
      bodyFullStr: '',
      tagTextList: [],
      attachFileList: [],
      showCreNameYn: true,
      canReplyYn: true
    })

    // 익명 & 댓글 & 제목 여부 설정
    const toggleAnonymousYn = () => {
      params.showCreNameYn = !params.showCreNameYn
    }
    const toggleCommentYn = () => {
      params.canReplyYn = !params.canReplyYn
    }
    const hasTitleYn = ref(false)
    const toggleTitleYn = () => {
      hasTitleYn.value = !hasTitleYn.value
      if (hasTitleYn.value) {
        params.title = ''
      }
    }

    // Target 선택 기능
    const receiverList = props.pGetReceiverList()
    const showReceiverSelectList = ref(false)
    const toggleReceiverSelectPop = () => {
      showReceiverSelectList.value = !showReceiverSelectList.value
      if (showReceiverSelectList.value && params.actorList === 'A') {
        params.actorList = []
      }
    }
    const selectAllReceivers = () => {
      params.actorList = 'A'
      showReceiverSelectList.value = false
    }
    const setSelectedTargetList = (selectedTargetList) => {
      params.actorList = selectedTargetList
    }

    // Tag(category) 선택 기능
    const tagTextList = props.pGetTagListFn()
    const tagListForDom = reactive([])
    if (tagTextList.length) {
      for (const tag of tagTextList) {
        tag.isSelected = false
        tagListForDom.push(tag)
      }
    }
    const toggleSelectTag = (selectedTag, index) => {
      const indexToRemove = params.tagTextList.indexOf(
        selectedTag.categoryNameMtext
      )
      if (indexToRemove !== -1) {
        params.tagTextList.splice(indexToRemove, 1)
        tagListForDom[index].isSelected = false
      } else {
        params.tagTextList.push(selectedTag.categoryNameMtext)
        tagListForDom[index].isSelected = true
      }
      console.log(tagListForDom, '456456564654654654654')
    }

    // fromDate기본값 설정
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const currentDate = `${year}-${month}-${day}`
    onMounted(() => {
      const dateInput = document.getElementById('fromDate')
      if (dateInput) {
        dateInput.value = currentDate
      }
    })

    // attach file 설정
    const tempFileList = []
    // ------ 업로드한 파일 변수에 담기
    const setAttachedFile = (fileList) => {
      if (fileList.addYn === true) {
        tempFileList.push(fileList)
      }
      if (hasTitleYn.value && !params.title) {
        params.title = fileList.file.name
      }
    }
    // formEditor 사용 업로드 시
    const changeUploadList = (upList) => {
      if (tempFileList.length > 0) {
        console.log(
          tempFileList.findIndex((item) => item.targetKey === upList.targetKey)
        )
        const index = tempFileList.findIndex(
          (item) => item.targetKey === upList.targetKey
        )
        if (index === -1) {
          const temp = []
          for (const file of tempFileList) {
            temp.push(file)
          }
          tempFileList.length = 0
          for (const file of temp) {
            tempFileList.push(file)
          }
          tempFileList.push(upList)
          // tempFileList = [...temp, upList]
        } else if (index !== -1) {
          tempFileList.splice(index, 1, upList)
        }
      } else {
        tempFileList.push(upList)
      }
    }
    // ------ 파일 서버에 업로드
    const fileDataUploadToServer = async () => {
      if (tempFileList.length > 0) {
        let iList = document.querySelectorAll('.formCard .addTrue')
        let form = new FormData()
        for (var i = 0; i < tempFileList.length; i++) {
          form = new FormData()
          const oldFile = tempFileList[i].file
          const newFile = new File([oldFile], oldFile.name.normalize('NFC'), {
            type: oldFile.type
          })
          form.append('files[0]', newFile)
          await axios
            // 파일서버 fileServer fileserver FileServer Fileserver
            .post('https://unibuzzy.com/file/tp.uploadFile', form, {
              headers: {
                'Content-Type': 'multipart/form-data; charset: UTF-8;'
              }
            })
            .then((res) => {
              console.log(res)
              if (res.data.length > 0) {
                if (tempFileList[i].attachYn === true) {
                  tempFileList[i].attachYn = true
                } else {
                }
                var path = res.data[0].domainPath + res.data[0].pathMtext
                tempFileList[i].successSave = true
                tempFileList[i].filePath = path
                tempFileList[i].fileSizeKb = res.data[0].fileSizeKb
                tempFileList[i].fileKey = res.data[0].fileKey
              }
            })
            .catch((error) => {
              // this.response = error
              // this.isUploading = false
              console.log(error)
            })
        }
        iList = document.querySelectorAll('.formCard .addTrue')
        if (iList.length > 0) {
          for (let s = 0; s < tempFileList.length; s++) {
            const uploadFile = tempFileList[s]
            if (uploadFile.successSave) {
              for (var il = 0; il < iList.length; il++) {
                if (
                  !uploadFile.attachYn &&
                  (iList[il].attributes.filekey === undefined ||
                    iList[il].attributes.filekey === null ||
                    iList[il].attributes.filekey === '')
                ) {
                  if (iList[il].src === uploadFile.previewImgUrl) {
                    iList[il].src = uploadFile.filePath
                    // eslint-disable-next-line no-unused-vars
                    iList[il].setAttribute('fileKey', uploadFile.fileKey)
                    iList[il].setAttribute('fileSizeKb', uploadFile.fileSizeKb)
                    iList[il].classList.remove('addTrue')
                    iList[il].classList.add('addFalse')
                    break
                  }
                }
              }
            } else {
              tempFileList.splice(s, 1)
            }
          }
        }
      } else {
        alert(this.$t('COMMON_MSG_NOFILE'))
      }
      return true
    }
    // ------ 서버에 업로드된 파일 정보로 데이터 재가공
    const handleFileListForUpload = () => {
      const newAttachFileList = []
      for (let i = 0; i < tempFileList.length; i++) {
        const fileObj = {}
        fileObj.addYn = true
        fileObj.attachYn = tempFileList[i].attachYn
        fileObj.fileKey = tempFileList[i].fileKey
        fileObj.fileName = tempFileList[i].file.name.normalize('NFC')
        newAttachFileList.push(fileObj)
      }
      return newAttachFileList
    }

    // 최종 Submit
    const postContents = async () => {
      try {
        if (tempFileList.length > 0) {
          await fileDataUploadToServer()
        }
        params.attachFileList = handleFileListForUpload()

        if (!hasTitleYn.value) {
          if (params.bodyFullStr) {
            params.title = params.bodyFullStr
          } else if (!params.bodyFullStr && params.attachFileList.length) {
            params.title = params.attachFileList[0].fileName
          }
        }

        // formEditor 작성 내용 추출
        boardDataCheck()

        // params value 체크
        if (props.pOptions.model === 'mankik') {
          if (hasTitleYn.value && !params.title) {
            alert('제목을 작성해주세요.')
          } else if (!params.toDateStr) {
            alert('목표 날짜를 지정해주세요.')
          } else if (!params.bodyFullStr && !params.attachFileList.length) {
            alert('공유하고자 하는 내용을 작성하거나, 파일을 첨부해주세요.')
          } else {
            props.pPostContentsFn(params)
          }
        } else if (props.pOptions.model === 'unibuzzy') {
          if (hasTitleYn.value && !params.title) {
            alert('제목을 작성해주세요.')
          } else if (!params.bodyFullStr && !params.attachFileList.length) {
            alert('공유하고자 하는 내용을 작성하거나, 파일을 첨부해주세요.')
          } else {
            props.pPostContentsFn(params)
          }
        }
      } catch (error) {
        console.log('error', error)
      }
    }

    watch(params, (newp) => {
      console.log(newp.bodyFullStr, '---------------ch')
    })

    // Regacy: 기존 FormEditor 컴포넌트 사용을 위한 레거시 코드들입니다. --------- 일부는 compositionAPI에 맞춰 수정
    // ============ 변수설정 ===========
    const contentType = ref('BOAR')
    const complexEditor = ref(null)
    const propFormData = reactive([])
    const mToolBoxOptions = ref({})
    const complexOkYn = ref(false)

    // Regacy: confirm pop
    const confirmPopVariable = reactive({
      errorText: '',
      failPopYn: false,
      checkPopYn: false
    })
    const confirmNo = () => {
      confirmPopVariable.checkPopYn = false
      complexOkYn.value = false
    }

    // ============ regacy 함수 ===========
    const postToolBox = (toolBoxOption) => {
      // Regacy comment: toolbox에 들어간 option들을 formEditor에서 watch로 계속 넘겨받고 prop으로 넘겨주고 있습니다
      mToolBoxOptions.value = toolBoxOption
    }
    const changeFormEditorStyle = (changeParam) => {
      // Regacy Comment: toolbox에 기능 전부, 선택된 formEditor에 드레그 한 text로 처리를 하기에 ref로 접근해서 함수를 실행하고 있습니다.
      // Regacy Comment: bold, italic, underLine은 text만 넘겨줘도 기능이 작동하기에 따로 구분을 하지 않았습니다.
      const targetType = changeParam.type
      if (targetType === 'font') {
        complexEditor.value.changeFontSize(changeParam.size)
      } else if (targetType === 'delFormCard') {
        complexEditor.value.delFormCard()
      } else {
        complexEditor.value.changeTextStyle(targetType)
      }
    }
    const setParamInnerHtml = (formCard) => {
      // console.log('=========== forCard whole body ===========', formCard)
      let extractedInnerHtml = ''
      let extractedOuterHtml = ''
      for (let i = 0; i < formCard.length; i++) {
        extractedOuterHtml += formCard[i].outerHtml
        extractedInnerHtml += formCard[i].innerHtml
      }
      // console.log(
      //   `=========== forCard Data =========== \n - inner: ${extractedInnerHtml}\n - outer: ${extractedOuterHtml}`
      // )
      extractedOuterHtml.replace('contenteditable', '')
      params.bodyFullStr = extractedOuterHtml
      propFormData.length = 0
      propFormData.push(...formCard)
      document.getElementById('msgBox').innerHTML = ''
      document.getElementById('msgBox').innerHTML = extractedInnerHtml
      // this.editorType = 'complex'
      complexOkYn.value = true
      if (contentType.value === 'ALIM') clickPageTopBtn()
      if (contentType.value === 'BOAR') boardDataCheck()
    }
    const clickPageTopBtn = async () => {
      // 취소를 누르거나 유효성 검사 (이 함수)에 통과하지 못하면 값을 다시 가져와야함. 그러므로 --> complexOkYn.value = false
      if (complexOkYn.value === false) {
        complexOkYn.value = true
        await complexEditor.value.setParamInnerHtml()
      } else {
        let titleValue = params.title
        titleValue = titleValue.trim()
        if (hasTitleYn.value) {
          if (
            titleValue !== undefined &&
            titleValue !== null &&
            titleValue !== ''
          ) {
          } else {
            confirmPopVariable.errorText = this.$t('FORM_MSG_TITLE')
            confirmPopVariable.failPopYn = true
            complexOkYn.value = false
            return
          }
        }

        // if (requestPushYn.value === true) {
        //   if (this.requestTitle.replace(' ', '') === '') {
        //     confirmPopVariable.errorText = this.$t('FORM_MSG_REASON')
        //     confirmPopVariable.failPopYn = true
        //     complexOkYn.value = false
        //     return
        //   }
        // }
        // if (this.allRecvYn === true) {
        // } else {
        //   await this.settingRecvList()
        //   if (this.selectedReceiverList.length > 0) {
        //   } else {
        //     if (!this.params.userKey) {
        //       confirmPopVariable.errorText = this.$t('FORM_MSG_SU_TARGET')
        //       confirmPopVariable.failPopYn = true
        //       complexOkYn.value = false
        //       return
        //     }
        //   }
        // }

        let msgData = ''
        msgData = document.getElementById('msgBox').innerText
        msgData = msgData.trim()
        if (
          (msgData !== undefined && msgData !== null && msgData !== '') ||
          tempFileList.length > 0
        ) {
        } else {
          confirmPopVariable.errorText = this.$t('FORM_MSG_NOTI_NOCONT')
          confirmPopVariable.failPopYn = true
          complexOkYn.value = false
          return
        }
        confirmPopVariable.checkPopYn = true
      }
    }
    const boardDataCheck = () => {
      if (complexOkYn.value === false) {
        complexOkYn.value = true
        complexEditor.value.setParamInnerHtml()
      } else {
        let title = params.title
        title = title.trim()
        if (title !== undefined && title !== null && title !== '') {
        } else {
          confirmPopVariable.errorText = this.$t('FORM_MSG_TITLE')
          confirmPopVariable.failPopYn = true
          complexOkYn.value = false
          return
        }
        var msgData = ''
        msgData = document.getElementById('msgBox').innerText
        msgData = msgData.trim()
        if (
          (msgData !== undefined && msgData !== null && msgData !== '') ||
          tempFileList.length > 0
        ) {
        } else {
          confirmPopVariable.errorText = this.$t('FORM_MSG_POST_NOCONT')
          confirmPopVariable.failPopYn = true
          complexOkYn.value = false
          return
        }
        // if (this.selectBoardYn === true) {
        //   if (
        //     this.selectBoardIndex !== undefined &&
        //     this.selectBoardIndex !== null &&
        //     this.selectBoardIndex !== ''
        //   ) {
        //     if (this.selectBoardCabinetKey === null) {
        //       confirmPopVariable.errorText = this.$t('FORM_MSG_DIFFBOARD')
        //       confirmPopVariable.failPopYn = true
        //       complexOkYn.value = false
        //       return
        //     }
        //   } else if (
        //     this.selectBoardIndex === undefined ||
        //     this.selectBoardIndex === null ||
        //     this.selectBoardIndex === ''
        //   ) {
        //     confirmPopVariable.errorText = this.$t('FORM_MSG_NOBOARD')
        //     confirmPopVariable.failPopYn = true
        //     complexOkYn.value = false
        //     return
        //   }
        // }
        confirmPopVariable.checkPopYn = true
      }
    }

    return {
      params,
      receiverList,
      showReceiverSelectList,
      toggleReceiverSelectPop,
      selectAllReceivers,
      setSelectedTargetList,
      toggleAnonymousYn,
      toggleCommentYn,
      hasTitleYn,
      toggleTitleYn,
      tagTextList,
      toggleSelectTag,
      tagListForDom,
      setAttachedFile,
      changeUploadList,
      postContents,
      mToolBoxOptions,
      postToolBox,
      changeFormEditorStyle,
      complexEditor,
      setParamInnerHtml,
      clickPageTopBtn,
      boardDataCheck,
      contentType,
      confirmNo
    }
  }
})
</script>

<style lang="scss" scoped>
// Common CSS
#layout {
  width: 80%;
  height: calc(100% - 120px);
  padding: 16px 24px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background-color: #f5f5f5;
  border-radius: 0.8rem;
}
button {
  min-width: 40px;
  min-height: 30px;
  padding: px 15px;

  color: #7a7a7a;
  word-wrap: break-word;

  background-color: #f1f1ff;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  & + button {
    margin-left: 8px;
  }
  &.activeBtn {
    border: 2px solid #5f61bd;
    color: #5f61bd;
  }
  &.closeBtn {
    border: none;
    background-color: none;
  }
}
h1,
label {
  min-width: 64px;
  margin-right: 8px;
  color: #5f61bd;
  font-weight: bold;
  text-align: start;
}
legend {
  display: none;
}
input,
textarea {
  border: 1px solid rgba(103, 104, 167, 0.27);
}
textarea {
  resize: none;
  width: 100%;
  padding: 15px;
  &::placeholder {
    margin: 20px;
  }
}
.btnWrap img {
  width: 16px;
}
// header & footer
header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  h1 {
    font-size: 20px;
  }
  button {
    padding: 3px;
    background-color: none;
    border: none;
    img {
      width: 18px;
    }
  }
}
footer {
  .footerBtnWrap {
    padding-top: 20px;
    button {
      font-size: 20px;
      font-weight: bold;
      &:first-child {
        background-color: #5f61bd;
        color: #fff;
      }
    }
  }
}

// Form CSS
main {
  height: calc(100% - 120px);
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  overflow-y: auto;

  fieldset > fieldset {
    margin-top: 16px;
  }

  .selectReceiverBox,
  #optionToggleBtnWrap,
  #dateSelect,
  #categoryTag,
  #uploadFile {
    display: flex;
    justify-content: space-between;
    .btnWrap,
    .dateBoxWrap {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      input {
        min-height: 30px;
        flex: 0 1 45%;
      }
      span {
        margin: 0 8px;
        flex-grow: 1;
      }
    }
  }
  #postReceivers {
    .selectedTargetList {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 35px;
      padding: 0 8px;
      margin-top: 5px;
      margin-left: 72px;
      cursor: pointer;

      background-color: #fff;
      border: 1px solid rgb(204, 204, 204);
      border-radius: 8px;
      & > div {
        margin-right: 16px;
        img {
          width: 15px;
        }
      }
      .plusImg {
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);

        width: 20px;
      }
    }
  }
  #postTitle {
    display: flex;
    input {
      flex-grow: 1;
    }
  }
}
</style>
