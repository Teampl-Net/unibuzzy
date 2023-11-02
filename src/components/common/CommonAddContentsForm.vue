<template>
  <div id="layout" style="overflow: hidden">
    <header>
      <!-- Popup Title -->
      <h1>{{ pOptions.purpose }}</h1>
      <button @click="closePop" type="button">
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
                  @click="selectTargetOnlyMe"
                  :class="{ activeBtn: selectMeYn }"
                  style="font-size: 13px"
                >
                  <img
                    v-if="selectMeYn"
                    src="../../assets/images/common/icon_check_commonColor.svg"
                    alt="check image"
                  />
                  ME
                </button>
                <button
                  type="button"
                  style="font-size: 13px"
                  @click="toggleReceiverSelectPop"
                  :class="{
                    activeBtn:
                      showReceiverSelectList ||
                      (params.actorList.length && !selectMeYn)
                  }"
                >
                  <img
                    v-if="
                      showReceiverSelectList ||
                      (params.actorList.length && !selectMeYn)
                    "
                    src="../../assets/images/common/icon_check_commonColor.svg"
                    alt="check image"
                  />
                  Select
                </button>
              </div>
            </div>
            <!-- target선택 팝업 -->
            <transition name="show_left">
              <SelectTargetPop
                v-if="showReceiverSelectList"
                :pSelectData="receiverList"
                :pSelectedTargetList="params.actorList"
                :pSelectOnlyYn="pSelectOnlyYn"
                @saveTarget="setSelectedTargetList"
                @closeXPop="toggleReceiverSelectPop"
              />
            </transition>
            <!-- 선택된 target -->
            <div
              @click="toggleReceiverSelectPop"
              v-if="params.actorList.length && !selectMeYn"
              class="selectedTargetList"
            >
              <div
                style="
                  width: calc(100% - 40px);
                  max-height: 52px;
                  overflow-y: scroll;
                "
              >
                <div
                  style="
                    width: 100%;
                    display: flex;
                    gap: 1px 10px;
                    flex-wrap: wrap;
                  "
                >
                  <div
                    v-for="target in params.actorList"
                    :key="target.accessKey"
                    class="eachTarget"
                    style="white-space: nowrap"
                  >
                    <img
                      v-if="
                        target.accessKind === 'U' || target.accessKind === 'C'
                      "
                      src="../../assets/images/footer/icon_people.svg"
                      alt="person image"
                    />
                    <img
                      v-else
                      src="../../assets/images/channel/channer_addressBook.svg"
                      alt="address book image"
                    />
                    {{ target.accessName || $changeText(target.userDispMtext) }}
                  </div>
                </div>
              </div>
              <div class="plusImgWrap" style="">
                <img
                  class="plusImg"
                  src="../../assets/images/formEditor/icon_formEditPlus.svg"
                  alt="plus image"
                />
              </div>
            </div>
          </fieldset>
          <fieldset
            id="optionToggleBtnWrap"
            v-if="!pContentsData"
            v-show="$route.path !== '/todo'"
          >
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
          <fieldset v-if="$route.path === '/todo' || hasTitleYn" id="postTitle">
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
                v-model="params.workFromDateStr"
              />
              <span>~</span>
              <input id="toDate" type="date" v-model="params.workToDateStr" />
            </div>
          </fieldset>
          <fieldset v-if="pOptions.model === 'mankik'" id="categoryTag">
            <legend>카테고리 선택</legend>
            <label for="">Tag</label>
            <div
              class=""
              style="
                width: calc(100% - 72px);
                display: flex;
                align-items: start;
              "
            >
              <div
                class="btnWrap tagBtnWrap"
                :class="{ opened: openBtnWrapYn === true }"
              >
                <button
                  type="button"
                  @click="toggleSelectTag(tag, index)"
                  v-for="(tag, index) in tagListForDom"
                  :key="tag.categoryKey"
                  :class="{ activeBtn: tag.isSelected }"
                  style="font-size: 13px"
                >
                  <img
                    v-if="tag.isSelected"
                    src="../../assets/images/common/icon_check_commonColor.svg"
                    alt="check image"
                  />
                  {{ tag.categoryNameMtext }}
                </button>
              </div>
              <div
                v-if="openBtnWrapYn === false"
                @click="openBtnWrap"
                class="openBtn"
              >
                +
              </div>
              <div
                v-if="openBtnWrapYn === true"
                @click="openBtnWrap"
                class="openBtn"
              >
                -
              </div>
            </div>
          </fieldset>
          <fieldset
            v-if="pOptions.model === 'mankik' || pOptions.model === 'unibuzzy'"
            id="uploadFile"
          >
            <legend>파일 첨부</legend>
            <label for="">File</label>
            <!--  @delAttachFile="delAttachFile" -->
            <TalAttachFile
              @setSelectedAttachFileList="setAttachedFile"
              :attachTrueAddFalseList="propAttachFileList"
            />
          </fieldset>
          <fieldset style="height: 60%">
            <legend>작성 내용</legend>
            <TalFormEditor
              ref="complexEditor"
              @changeUploadList="changeUploadList"
              @setParamInnerHtml="setParamInnerHtml"
              @postToolBox="postToolBox"
            />
          </fieldset>
        </fieldset>
      </form>
    </main>
    <footer>
      <div class="footerBtnWrap">
        <button @click="postContents" style="margin-right: 10px">
          {{ pContentsData ? 'Edit' : 'Save' }}
        </button>
        <button @click="closePop">Cancel</button>
      </div>
    </footer>
  </div>
  <gToolBox
    :propTools="mToolBoxOptions"
    @changeTextStyle="changeFormEditorStyle"
  />
</template>

<script>
// system settings
import { defineComponent, ref, reactive, onMounted, watch } from 'vue'
import { Base64 } from 'js-base64'
import { useStore } from 'vuex'
import axios from 'axios'

// components
import SelectTargetPop from './selectTarget/SelectTargetPop.vue'
import TalFormEditor from '../unit/formEditor/FormEditor.vue'
import TalAttachFile from '../unit/formEditor/AttachFile.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  props: [
    'pOptions',
    'pUserInfo',
    'pGetTagListFn',
    'pGetReceiverList',
    'pPostContentsFn',
    'pSelectOnlyYn',
    'pClosePop',
    // edit mode props
    'pContentsData'
  ],
  components: {
    SelectTargetPop,
    TalFormEditor,
    TalAttachFile
  },
  data () {
    return {
      popId: ''
    }
  },
  created () {
    var history = this.$store.getters['UB_HISTORY/hStack']
    this.popId = 'writeContents' + history.length
    // console.log(history)
    history.push(this.popId)
    this.$store.commit('UB_HISTORY/updateStack', history)
  },
  computed: {
    historyStack () {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      const history = this.$store.getters['UB_HISTORY/hStack']
      if (this.popId === history[history.length - 1]) {
        this.closePop()
      }
    }
  },
  methods: {
    closePop () {
      var history = this.$store.getters['UB_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('UB_HISTORY/setRemovePage', removePage)
      this.$store.commit('UB_HISTORY/updateStack', history)
      this.$checkDeleteHistory('selectTargetPop')
      if (this.pClosePop) {
        this.pClosePop()
      }
    }
  },
  setup(props) {
    const store = useStore()

    // submit params 세팅
    const params = reactive({
      title: '',
      actorList: [],
      workToDateStr: null,
      workFromDateStr: null,
      bodyFullStr: '',
      tagTextList: [],
      attachFileList: [],
      showCreNameYn: false,
      canReplyYn: true,
      mLoadingYn: false
    })
    console.log(props.pContentsData, 'data ================---=========---=========---===')

    // ------------------- 기본값 설정
    let receiverList = reactive([])
    if (props.pGetReceiverList) {
      receiverList = props.pGetReceiverList()
    }
    let tagTextList = reactive([])
    if (props.pGetTagListFn) {
      tagTextList = props.pGetTagListFn()
    }

    var gOldFromDate = null
    var gOldToDate = null

    // ------------------- edit 관련 함수
    // * 주소록(타겟) 이름 값만 추출
    const propsTargetNameEditing = (text) => {
      let changeTxt = ''
      if (text) {
        changeTxt = text
        let indexOf = text.indexOf('KO$^$')

        if (indexOf === -1) {
          indexOf = text.indexOf('EN$^$')
          if (indexOf === -1) {
            return changeTxt
          } else {
            const returnMap = new Map()
            const splitMtext = text.split('$#$')
            // split if ~> $$가 없다면?
            for (let i = 0; i < splitMtext.length; i++) {
              const splitMtextDetail = splitMtext[i].split('$^$')
              // split if ~> $$가 없다면?
              returnMap.set(splitMtextDetail[0], splitMtextDetail[1])
            }
            changeTxt = returnMap.get('EN')
          }
        } else {
          const returnMap = new Map()
          const splitMtext = text.split('$#$')
          // split if ~> $$가 없다면?
          for (let i = 0; i < splitMtext.length; i++) {
            const splitMtextDetail = splitMtext[i].split('$^$')
            // split if ~> $$가 없다면?
            returnMap.set(splitMtextDetail[0], splitMtextDetail[1])
          }
          changeTxt = returnMap.get('KO')
        }
      }
      return changeTxt
    }

    // * bodyFullStr decoding 함수
    const setBodyLength = (str, completeYn) => {
      if (!str) return
      // eslint-disable-next-line no-undef
      str = Base64.decode(str)
      str.replace('contenteditable= true', '')
      str = str.replaceAll('<pre', '<div')
      str = str.replaceAll('</pre', '</div')
      if (completeYn) {
        str = str.replaceAll(
          'formCard formText ',
          'formCard formText completeWork '
        )
      }
      return str
    }

    // * 편집 데이터로 formCard생성하기
    const replaceTargetInChild = (stringHTML) => {
      const parser = new DOMParser()
      const parsedHTML = parser.parseFromString(stringHTML, 'text/html')

      // 기존 코드 활용해서 formCard삽입
      var temp = document.createElement('div')
      temp.innerHTML = stringHTML
      // var innerHtml = ''
      var newArr = []
      var formC = temp.getElementsByClassName('formCard')
      // eslint-disable-next-line no-new-object
      var jsonObj = new Object()
      var imgYn = true
      for (var i = 0; i < formC.length; i++) {
        // eslint-disable-next-line no-new-object
        jsonObj = new Object()
        imgYn = true
        // innerHtml += formC[i].outerHTML
        jsonObj.innerHtml = formC[i].innerHTML
        jsonObj.type = 'image'
        jsonObj.targetKey = i
        for (var c = 0; c < formC[i].classList.length; c++) {
          // // eslint-disable-next-line no-debugger
          // debugger
          if (formC[i].classList[c] === 'formText') {
            // jsonObj.innerHtml = this.$findATagDelete(formC[i].innerHTML)
            jsonObj.type = 'text'
            imgYn = false
            break
          } else if (formC[i].classList[c] === 'formLine') {
            jsonObj.type = 'line'
            imgYn = false
          } else if (formC[i].classList[c] === 'formDot') {
            jsonObj.type = 'dot'
            imgYn = false
          } else if (formC[i].classList[c] === 'formBlock') {
            jsonObj.type = 'block'
            imgYn = false
          }
        }
        if (imgYn) {
          jsonObj.pSrc = formC[i].querySelector('img').src
          jsonObj.pFilekey =
            formC[i].querySelector('img').attributes.filekey.value
        }
        newArr.push(jsonObj)
      }
      if (formC && formC.length === 0) {
        var firstSettingDiv = document.createElement('div')
        firstSettingDiv.classList.add('formText')
        firstSettingDiv.classList.add('editableContent')
        firstSettingDiv.classList.add('formCardTextid')
        firstSettingDiv.classList.add('formCard')
        firstSettingDiv.attributes.formidx = 0
        firstSettingDiv.attributes.creTeamKey = 0
        firstSettingDiv.id = 'formEditText'
        firstSettingDiv.attributes.contentEditable = false
        firstSettingDiv.style.padding = '0px 20px'
        firstSettingDiv.style.display = 'inline-block'
        firstSettingDiv.style.width = '100%'
        firstSettingDiv.style.borderRight = 'rgb(204, 204, 204)'
        firstSettingDiv.style.wordBreak = 'break-all'
        firstSettingDiv.innerHTML = parsedHTML.body
        // jsonObj.innerHtml = this.$findATagDelete(firstSettingDiv.innerHTML)
        jsonObj.type = 'text'
        imgYn = false
        newArr.push(jsonObj)
      }
      complexEditor.value.setFormCard(newArr)

      // ************************************ [수정] 이미 있는 파일 리스트 따로 보관하고 있어야 함
      // this.addFalseList = document.querySelectorAll('.dragCompp .formCard .addFalse')
    }
    // --------------------------------------------------------------

    // 첨부파일 관련 리스트
    const addFalseAttachFalseFileList = reactive([])
    const addFalseAttachTrueFileList = reactive([])
    const propAttachFileList = reactive([])
    // ------------------- DOM 생성 후 실행될 로직
    onMounted(() => {
      // fromDate
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const currentDate = `${year}-${month}-${day}`
      const fromDateInput = document.getElementById('fromDate')
      const toDateInput = document.getElementById('fromDate')
      if (fromDateInput) {
        params.workFromDateStr = currentDate
      }
      if (toDateInput) {
        params.workToDateStr = currentDate
      }
      gOldFromDate = currentDate
      gOldToDate = currentDate

      const route = useRoute()

      if (route.path === '/todo') {
        hasTitleYn.value = true
      }
      // >---- 편집 상태일 때 세팅 ----<
      if (props.pContentsData) {
        // --- title 데이터 연결
        params.title = props.pContentsData.title
        if (params.title) {
          hasTitleYn.value = true
        }
        // --- 날짜 데이터 연결
        if (props.pContentsData.workFromDateStr) {
          params.workFromDateStr =
            props.pContentsData.workFromDateStr.split('T')[0]
        }
        if (props.pContentsData.workToDateStr) {
          params.workToDateStr = props.pContentsData.workToDateStr.split('T')[0]
        }
        // 선택된 주소록(target) 데이터 연결
        for (const editingTarget of props.pContentsData.actorList) {
          params.actorList.length = 0
          params.actorList.push({
            accessKey: editingTarget.accessKey,
            accessKind: editingTarget.accessKind,
            contentskey: editingTarget.contentskey,
            iconPath: editingTarget.domainPath + editingTarget.pathMtext,
            useKey: editingTarget.userKey,
            accessName: propsTargetNameEditing(editingTarget.userDispMtext)
          })
        }

        // bodyFullStr 디코딩 후 formCard 생성
        params.bodyFullStr = setBodyLength(props.pContentsData.bodyFullStr)
        if (params.bodyFullStr) {
          replaceTargetInChild(params.bodyFullStr) // DOM tree에서 원하는 대상 찾아 교체
        }

        // ------------------- edit상태에서 첨부 파일 관련 로직
        if (props.pContentsData.attachFileList) {
          for (let i = 0; i < props.pContentsData.attachFileList.length; i++) {
            const file = props.pContentsData.attachFileList[i]
            propAttachFileList.push(file)
            tempFileList.push(file)
            if (file.attachYn) {
              addFalseAttachTrueFileList.push(file)
            } else {
              addFalseAttachFalseFileList.push(file)
            }
          }
          console.log(propAttachFileList)
        }
        console.log(tempFileList)
      }
    })

    // eslint-disable-next-line no-unused-vars
    const setAttachFileList = () => {
      // 계획
      // 1. 이미 있던 사진을 삭제해서 수정(업데이트 하는경우): addYn: false // 삭제한 파일도 포함해야함
      // 2. 이미 있던 사진을 포함해서 수정: 서버에서 중복저장 되지 않게
      const delFileList = []

      // 1. 이미 있던 사진을 삭제해서 수정(업데이트 하는경우): addYn: false // 삭제한 파일도 포함해야함
      for (let i = tempFileList.length - 1; i > -1; i--) {
        const tempFile = tempFileList[i]
        for (let j = 0; propAttachFileList.length; j++) {
          const propAttachFile = propAttachFileList[j]
          let deleteYn = true
          if (tempFile.fileKey && tempFile.fileKey === propAttachFile.file) {
            deleteYn = false
          }
          if (deleteYn) {
            tempFileList[i].addYn = false
            delFileList.push(tempFileList[i])
            tempFileList.splice(i, 1)
          }
        }
      }
    }

    // 날짜 변화 체크 로직
    watch(
      () => [params.workFromDateStr, params.workToDateStr],
      (newP) => {
        // console.log('============== param changed check', newP)
        const newFromDate = newP[0]
        const newToDate = newP[1]

        let changeType = 'N'
        if (newFromDate !== gOldFromDate) {
          changeType = 'F'
        } else if (newToDate !== gOldToDate) {
          changeType = 'T'
        }

        // from변경시, to보다 이후면 to를 from으로 변경
        // to변경시, from보다 이전이면 from을 to으로 변경
        if (newFromDate > newToDate) {
          if (changeType === 'F') {
            // alert('case From ')
            params.workToDateStr = newP[0]
          } else if (changeType === 'T') {
            // alert('case To ')
            params.workFromDateStr = newP[1]
          } else {
            // alert('case Else')
          }
        }
        gOldFromDate = newP[0]
        gOldToDate = newP[1]
      }
    )

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
    }

    // Target 선택 기능
    const showReceiverSelectList = ref(false)
    const toggleReceiverSelectPop = () => {
      showReceiverSelectList.value = !showReceiverSelectList.value
      if (
        showReceiverSelectList.value &&
        params.actorList.accessKey === store.getters['UB_USER/GE_USER'].userKey
      ) {
        params.actorList = []
      }
    }
    const selectMeYn = ref(false)
    const selectTargetOnlyMe = () => {
      params.actorList.length = 0
      params.actorList.push({
        accessKey: store.getters['UB_USER/GE_USER'].userKey,
        accessKind: 'U'
      })
      selectMeYn.value = true
    }
    if (!props.pContentsData) {
      selectTargetOnlyMe()
    }
    const setSelectedTargetList = (selectedTargetList) => {
      params.actorList = selectedTargetList
      selectMeYn.value = false
    }

    // Tag(category) 선택 기능
    const tagListForDom = reactive([]) // 원본 유지를 위한 복사
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
    }
    // 편집 상태일 때는 데이터 비교후 선택된 tag 체크
    if (props.pContentsData) {
      for (let i = 0; i < tagListForDom.length; i++) {
        for (let j = 0; j < props.pContentsData.tagList.length; j++) {
          if (
            // eslint-disable-next-line vue/no-setup-props-destructure
            tagListForDom[i].categoryNameMtext ===
            props.pContentsData.tagList[j].tagText
          ) {
            tagListForDom[i].isSelected = true
            toggleSelectTag(tagListForDom[i], i)
          }
        }
      }
    }

    // attach file 설정
    const tempFileList = reactive([])
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
            .post(props.pOptions.fileServerURL, form, {
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
        // alert(this.$t('COMMON_MSG_NOFILE'))
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
        if (params.mLoadingYn) return
        if (tempFileList.length > 0) {
          await fileDataUploadToServer()
        }
        params.attachFileList = handleFileListForUpload()

        // formEditor 작성 내용 추출
        boardDataCheck()

        // 제목 옵션 false일 때 자동 제목 생성
        if (!hasTitleYn.value) {
          if (!params.title && extractedInnerHtml) {
            params.title = extractedInnerHtml
          } else if (
            !params.title &&
            !extractedInnerHtml &&
            params.attachFileList.length
          ) {
            params.title = params.attachFileList[0].fileName
          }
        }

        // params value 체크
        if (props.pOptions.model === 'mankik') {
          if (hasTitleYn.value && !params.title) {
            alert('제목을 작성해주세요.')
          } else if (!params.workToDateStr) {
            alert('목표 날짜를 지정해주세요.')
            // } else if (route.path !== '/todo' && (!params.bodyFullStr && !params.attachFileList.length)) {
            //   alert('공유하고자 하는 내용을 작성하거나, 파일을 첨부해주세요.')
          } else {
            params.mLoadingYn = true
            props.pPostContentsFn(params)
          }
        } else if (props.pOptions.model === 'unibuzzy') {
          if (hasTitleYn.value && !params.title) {
            alert('제목을 작성해주세요.')
          } else if (!params.bodyFullStr && !params.attachFileList.length) {
            alert('공유하고자 하는 내용을 작성하거나, 파일을 첨부해주세요.')
          } else {
            params.mLoadingYn = true
            props.pPostContentsFn(params)
          }
        }
      } catch (error) {
        params.mLoadingYn = false
        console.log('error', error)
      }
    }
    const openBtnWrapYn = ref(false)
    const openBtnWrap = () => {
      openBtnWrapYn.value = !openBtnWrapYn.value
    }

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

    // ============ Regacy 함수 ===========
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
    let extractedInnerHtml = ''
    const setParamInnerHtml = (formCard) => {
      // console.log('=========== forCard whole body ===========', formCard)
      let extractedOuterHtml = ''
      for (let i = 0; i < formCard.length; i++) {
        extractedOuterHtml += formCard[i].outerHtml
        extractedInnerHtml += formCard[i].innerHtml
      }
      console.log(
        `=========== forCard Data =========== \n - inner: ${extractedInnerHtml}\n - outer: ${extractedOuterHtml}`
      )

      // 문자열을 파싱하여 DOM 요소로 만듭니다.
      const parser = new DOMParser()
      const doc = parser.parseFromString(extractedOuterHtml, 'text/html')

      // "contenteditable" 속성을 삭제합니다.
      const elements = doc.querySelectorAll(
        '[contenteditable], [placeholder], [autofocus], [formidx]'
      )
      for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('contenteditable')
        elements[i].removeAttribute('placeholder')
        elements[i].removeAttribute('autofocus')
        elements[i].removeAttribute('formidx')
      }

      // 수정된 HTML 문자열을 얻습니다.
      const modifiedHtmlString = doc.body.innerHTML
      console.log(modifiedHtmlString)

      params.bodyFullStr = modifiedHtmlString
      propFormData.length = 0
      propFormData.push(...formCard)
      // document.getElementById('msgBox')?.innerHTML = extractedInnerHtml
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
            // confirmPopVariable.errorText = this.$t('FORM_MSG_TITLE')
            confirmPopVariable.failPopYn = true
            complexOkYn.value = false
            return
          }
        }

        let msgData = ''
        if (document.getElementById('msgBox')) {
          msgData = document.getElementById('msgBox').innerText
        }
        if (msgData) {
          msgData = msgData.trim()
        }
        if (
          (msgData !== undefined && msgData !== null && msgData !== '') ||
          tempFileList.length > 0
        ) {
        } else {
          // confirmPopVariable.errorText = this.$t('FORM_MSG_NOTI_NOCONT')
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
          // confirmPopVariable.errorText = this.$t('FORM_MSG_TITLE')
          confirmPopVariable.failPopYn = true
          complexOkYn.value = false
          return
        }
        var msgData = ''
        if (document.getElementById('msgBox')) {
          msgData = document.getElementById('msgBox').innerText
        }
        if (msgData) {
          msgData = msgData.trim()
        }
        if (
          (msgData !== undefined && msgData !== null && msgData !== '') ||
          tempFileList.length > 0
        ) {
        } else {
          // confirmPopVariable.errorText = this.$t('FORM_MSG_POST_NOCONT')
          confirmPopVariable.failPopYn = true
          complexOkYn.value = false
          return
        }

        confirmPopVariable.checkPopYn = true
      }
    }
    const setTodoPageValue = () => {
      params.showCreNameYn = true
      params.canReplyYn = true
      hasTitleYn.value = true
    }
    setTodoPageValue()

    return {
      params,
      receiverList,
      showReceiverSelectList,
      toggleReceiverSelectPop,
      selectTargetOnlyMe,
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
      confirmNo,
      propsTargetNameEditing,
      openBtnWrap,
      openBtnWrapYn,
      propAttachFileList,
      setTodoPageValue,
      selectMeYn
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

  z-index: 15;
  background-color: #f5f5f5;
  border-radius: 0.8rem;
}
button {
  min-width: 40px;
  min-height: 25px;
  padding: px 15px;

  color: #7a7a7a;
  word-wrap: break-word;

  background-color: #f1f1ff;
  border: 2px solid #ccc;
  border-radius: 8px;
  & + button {
    // margin-left: 8px;
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
  align-items: center;
  // margin-bottom: 8px;
  h1 {
    font-size: 20px;
    margin: 0 !important;
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
      font-size: 16px;
      padding: 3px 10px !important;
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
  height: calc(100% - 110px);
  overflow-y: auto;
  margin-top: 8px;
  // padding-top: 16px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  form {
    height: 100%;
  }
  form fieldset > fieldset {
    margin-top: 10px;
  }
  form > fieldset:nth-child(3) {
    margin-top: 10px;
    height: 60%;
    textarea {
      height: 100%;
    }
  }
  // fieldset > fieldset {
  //   margin-top: 10px;
  // }

  .selectReceiverBox,
  #optionToggleBtnWrap,
  #dateSelect,
  #categoryTag,
  #uploadFile {
    display: flex;
    justify-content: space-between;
    .tagBtnWrap {
      flex-wrap: wrap;
      height: 30px;
      overflow-y: hidden;
      flex-wrap: wrap;

      &.opened {
        height: auto !important;
      }
    }
    .openBtn {
      height: 25px;
      width: 25px;
      background-color: #f1f1ff;
      border: 2px solid #ccc;
      color: #7a7a7a;
      padding: 3px;
      border-radius: 8px;
      text-align: center;
      line-height: 17px;
      display: none;
      cursor: pointer;
    }
    .btnWrap,
    .dateBoxWrap {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: calc(100% - 72px);
      gap: 8px;
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
      padding: 0 0 0 8px;
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
      .plusImgWrap {
        // position: absolute;
        // top: 50%;
        // right: 8px;
        // transform: translateY(-50%);
        width: 30px;
        height: 100%;
        background-color: #fff;
        margin-right: 0;
      }
      .plusImg {
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

@media screen and (max-width: 850px) {
  .dateBoxWrap {
    // justify-content: space-between !important;
    input {
      flex: 0 1 40% !important;
    }
    span {
      flex-grow: 0.5 !important;
    }
  }
}

@media screen and (max-width: 750px) {
  .openBtn {
    display: block !important;
  }
}

@media screen and (max-width: 600px) {
  label {
    font-size: 14px !important;
  }
  button {
    font-size: 13px !important;
  }
  .dateBoxWrap {
    gap: 0 !important;
    flex-grow: 0 !important;
    justify-content: space-between;
    input {
      flex: 0 1 44% !important;
    }
    span {
      flex-grow: 0 !important;
      font-size: 13px !important;
      // margin:0 !important;
    }
  }
}
</style>
