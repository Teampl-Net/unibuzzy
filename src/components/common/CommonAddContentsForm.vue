<template>
  <div id="layout">
    <header>
      <!-- Popup Title -->
      <h1>{{ pOptions.purpose }}</h1>
      <button type="button">
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
                  :class="{ activeBtn: params.targetList === 'A' }"
                >
                  <img
                    v-if="params.targetList === 'A'"
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
                      (params.targetList.length && params.targetList !== 'A')
                  }"
                >
                  <img
                    v-if="
                      showReceiverSelectList ||
                      (params.targetList.length && params.targetList !== 'A')
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
              :pSelectedTargetList="params.targetList"
              :pSelectOnlyYn="pSelectOnlyYn"
              @saveTarget="setSelectedTargetList"
              @closeXPop="toggleReceiverSelectPop"
            />
            <!-- 선택된 target -->
            <div
              @click="toggleReceiverSelectPop"
              v-if="params.targetList.length && params.targetList !== 'A'"
              class="selectedTargetList"
            >
              <div v-for="target in params.targetList" :key="target.accessKey">
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
                v-for="tag in tagDataList"
                :key="tag.categoryKey"
                @click="toggleSelectTag(tag)"
              >
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
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Please, enter the contents."
              v-model="params.bodyFullStr"
            ></textarea>
          </fieldset>
        </fieldset>
      </form>
    </main>
    <footer>
      <div class="btnListWrap">
        <button @click="postContents">완료</button>
        <button>취소</button>
      </div>
    </footer>
  </div>
</template>

<script>
// system settings
import { defineComponent, ref, reactive, onMounted } from 'vue'
import axios from 'axios'

// components
import SelectTargetPop from './selectTarget/SelectTargetPop.vue'
import AttachFile from '../unit/formEditor/AttachFile.vue'

export default defineComponent({
  props: [
    'pOptions',
    'pUserInfo',
    'pGetTagListFn',
    'pGetReceiverList',
    'pPostContentsFn',
    'pSelectOnlyYn'
  ],
  components: {
    SelectTargetPop,
    AttachFile
  },
  setup(props) {
    // submit params 세팅
    const params = reactive({
      title: '',
      targetList: [],
      toDateStr: '',
      fromDateStr: '',
      bodyFullStr: '',
      tagList: [],
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
      if (showReceiverSelectList.value && params.targetList === 'A') {
        params.targetList = []
      }
    }
    const selectAllReceivers = () => {
      params.targetList = 'A'
      showReceiverSelectList.value = false
    }
    const setSelectedTargetList = (selectedTargetList) => {
      params.targetList = selectedTargetList
    }

    // Tag(category) 선택 기능
    const tagDataList = props.pGetTagListFn()
    const toggleSelectTag = (selectedTag) => {
      const indexToRemove = params.tagList.indexOf(selectedTag)
      if (indexToRemove !== -1) {
        params.tagList.splice(indexToRemove, 1)
      } else {
        params.tagList.push(selectedTag)
      }
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
              this.response = error
              this.isUploading = false
            })
        }
        iList = document.querySelectorAll('.msgArea .formCard .addTrue')
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

        if (props.pOptions.model === 'mankik') {
          if (hasTitleYn.value && !params.title) {
            alert('제목을 작성해주세요.')
          } else if (!params.toDateStr) {
            alert('목표 날짜를 지정해주세요.')
          } else if (!params.tagList.length) {
            alert('게시글의 Tag을 선택해주세요.')
          } else if (!params.bodyFullStr && !params.attachFileList.length) {
            alert('공유하고자 하는 내용을 작성하거나, 파일을 첨부해주세요.')
          } else {
            props.pPostContentsFn(params)
          }
        }
      } catch (error) {
        console.error(error)
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
      tagDataList,
      toggleSelectTag,
      setAttachedFile,
      postContents
    }
  }
})
</script>

<style lang="scss" scoped>
// Common CSS
#layout {
  width: 100%;
  height: calc(100% - 120px);
  margin-top: 60px;
  padding: 16px 24px;

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

// Form CSS
main {
  height: calc(100% - 120px);
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

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
