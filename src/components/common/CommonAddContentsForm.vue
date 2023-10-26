<template>
  <header>
    <!-- Popup Title -->
    <h1>{{ pOptions.purpose }}</h1>
    <button>닫기</button>
  </header>

  <main>
    <form>
      <!-- neccessary post values -->
      <fieldset id="neccessaryOptions">
        <legend>기본 정보 설정</legend>

        <fieldset id="postReceivers">
          <legend>받는 사람 지정</legend>
          <button type="button">All</button>
          <button type="button" @click="toggleReceiverSelectPop">Select</button>

          <!-- target선택 팝업 -->
          <SelectTargetPop
            v-if="showReceiverSelectList"
            :pSelectData="receiverList"
            :pSelectedTargetList="params.targetList"
            :pSelectOnlyYn="pSelectOnlyYn"
            @saveTarget="setTargetList"
            @closeXPop="toggleReceiverSelectPop"
          />

          <!-- 선택된 target -->
          <div v-if="params.targetList.length" class="selectedTargetList">
            <div v-for="target in params.targetList" :key="target.accessKey">
              {{ target.accessName }}
            </div>
          </div>
        </fieldset>

        <div class="optionToggleBtnWrap">
          <button type="button" @click="toggleAnonymousYn">익명</button>
          <button type="button" @click="toggleCommentYn">댓글</button>
        </div>

        <fieldset>
          <label for="id">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            v-model="tagList.title"
          />
        </fieldset>
      </fieldset>

      <!-- optional post values -->
      <fieldset id="optionalOptions">
        <fieldset v-if="pOptions.model === 'mamkik'" id="date">
          <legend>날짜 선택</legend>
          <label for="">Date</label>
          <input
            v-if="pOptions.model === 'mamkik'"
            id="fromDate"
            type="date"
            v-model="params.fromDateStr"
          />
          <input id="toDate" type="date" v-model="params.toDateStr" />
        </fieldset>

        <fieldset v-if="pOptions.model === 'mamkik'" id="categoryTag">
          <legend>카테고리 선택</legend>
          <div class="categoryListWrap">
            <button
              type="button"
              v-for="tag in tagList"
              :key="tag.categoryKey"
              @click="toggleSelectTag(tag)"
            >
              {{ tag.categoryNameMtext }}
            </button>
          </div>
        </fieldset>

        <fieldset
          v-if="pOptions.model === 'mamkik' || pOptions.model === 'unibuzzy'"
          id="uploadFile"
        >
          <legend>파일 첨부</legend>
          <AttachFile @setSelectedAttachFileList="setAttachedFile" />
        </fieldset>

        <fieldset>
          <legend>작성 내용</legend>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
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
      toDateStr: 'yyyy-mm-dd',
      fromDateStr: '',
      bodyFullStr: '',
      tagList: [],
      attachFileList: [],
      showCreNameYn: true,
      canReplyYn: false
    })

    // 익명 & 댓글 여부 설정
    const toggleAnonymousYn = () => {
      params.showCreNameYn = !params.showCreNameYn
    }
    const toggleCommentYn = () => {
      params.canReplyYn = !params.canReplyYn
    }

    // Target 선택 기능
    const receiverList = props.pGetReceiverList()
    const showReceiverSelectList = ref(false)
    const toggleReceiverSelectPop = () => {
      showReceiverSelectList.value = !showReceiverSelectList.value
    }
    const selectAllReceivers = () => {
      params.targetList = 'A'
    }
    const setSelectedTargetList = (selectedTargetList) => {
      params.targetList = selectedTargetList
    }

    // Tag(category) 선택 기능
    const tagList = props.pGetTagListFn()
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
        props.pPostContentsFn(params)
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
      tagList,
      toggleSelectTag,
      setAttachedFile,
      postContents
    }
  }
})
</script>

<style lang="scss" scoped>
// 임시 CSS
main {
  height: calc(100% - 120px);
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}
legend {
  display: none;
}
</style>
