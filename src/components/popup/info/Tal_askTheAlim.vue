<template>
<div class="pagePaddingWrap" style="display: flex; flex-direction: column; text-align: left; height: 100vh;">
  <div style="width: 100%; height: calc(100% - 4rem); ">
    <!-- <select class="askBoxWrap">
      <option class="askCommonFont">문의 유형</option>
    </select> -->
    <input type="text" class="askBoxWrap askCommonFont mtop-1" v-model="askTitle" placeholder="제목"/>

    <gActiveBar :tabList="this.activeTabList" style="" ref="activeBar" class="mbottom-05 fl mtop-1" @changeTab= "changeTab" />
    <div id="textMsgAskBox" class="pageMsgArea" style="">
      <!-- <p class="">내용</p> -->
      <pre id="textMsgBox" class="editableContent"  v-if="viewTab === 'text'" style="padding:7px; overflow: hidden scroll; width: 100%; height: 100%; border-radius: 5px; border: 1px solid #6768a745; text-align: left; background: #fff; " contenteditable=true></pre>
      <!-- <div @click="formEditorShowYn = true" v-else-if="viewTab === 'complex'" class="msgArea" style="padding:7px; overflow: hidden scroll;" id="msgBox">클릭하여 내용을 작성해주세요</div> -->
      <formEditor ref="complexEditor" v-show="viewTab === 'complex'" @changeUploadList="changeUploadList" :editorType="this.editorType" :propFormData="propFormData" @setParamInnerHtml="setParamInnerHtml" @setParamInnerText="setParamInnerText"/>
      <div @click="formEditorShowYn = true" v-show="previewContentsShowYn" class="msgArea" id="msgBox"></div>

    </div>

    <!-- <textarea class="askBoxWrap askCommonFont mtop-1 ptop-1" v-model="askBody" style="padding-top: 0.5rem;" name="" id="" cols="30" rows="10" placeholder="내용을 입력해 주세요."></textarea> -->
    <!-- <div style="background-color: #A9AACD; width: 80px; height: 80px; margin-top: 0.5rem; padding: 0.7rem 0; border-radius: 5px; position: relative; text-align: center;">
      <img style="width: 2.5rem;" src="../../../assets/images/common/icon_attach.png" alt="">
      <p style="color: #FFFFFF; font-size: 15px; margin-top: 0.5rem">첨부하기</p>
    </div> -->
  </div>
  <gBtnLarge v-on:click="clickPageTopBtn"  :btnTitle="this.completeBtnTitle" style="width:90%; position: absolute; bottom:2%; left:50%; transform: translateX(-50%);" :style="viewTab === 'complex' ? 'bottom: 7.5%;' : ''" />
</div>
<div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
<gConfirmPop confirmText='문의글을 저장하시겠습니까?' @no='checkPopYn=false, complexOkYn = false' v-if="checkPopYn" @ok='sendMsg(), checkPopYn=false' />
<gConfirmPop @click="this.$emit('closeXPop', true)" confirmText='저장 되었습니다.' confirmType='timeout' v-if="okPopYn" />
<commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
 <!-- <div v-if="formEditorShowYn" style="position: absolute; top: 0; left: 0; width: 100%; background: #fff; height: 100vh; z-index: 99999999999999999999">
  <popHeader @closeXPop="this.formEditorShowYn = false" class="commonPopHeader" headerTitle="게시글작성" />
  <formEditor :propFormData="propFormData" @setParamInnerHtml="setParamInnerHtml" @setParamInnerText="setParamInnerText"/>
</div> -->
</template>

<script>
import commonConfirmPop from '../confirmPop/Tal_commonConfirmPop.vue'
import formEditor from '../../unit/formEditor/Tal_formEditor.vue'
export default {
  components: { commonConfirmPop, formEditor },
  data () {
    return {
      completeBtnTitle: '완료',
      askTitle: '',
      askBody: '',
      checkPopYn: false,
      sendLoadingYn: false,
      failPopYn: false,
      errorText: '',
      formEditorShowYn: false,

      viewTab: 'text',
      activeTabList: [{ display: '텍스트형', name: 'text' }, { display: '블로그형', name: 'complex' }],
      uploadFileList: [],
      addFalseList: [],
      selectFileList: [],
      complexOkYn: false
    }
  },
  mounted () {
    document.querySelector('#textMsgAskBox').addEventListener('paste', (e) => {
      var items = (e.clipboardData || e.originalEvent.clipboardData).items
      for (const i of items) {
        var item = i
        if (item.type.indexOf('image') !== -1) {
          this.$refs.activeBar.switchtab(1)
          this.viewTab = 'complex'
          /* this.editorType = 'complex' */
          var file = item.getAsFile()
          this.previewFile(file)
          console.log(file)
          // uploadFile(file);
        } else {

        }
      }
      e.preventDefault()
      var textData = (e.originalEvent || e).clipboardData.getData('Text')
      document.execCommand('insertHTML', false, textData)
    })
    var temp = document.createElement('div')
    temp.innerHTML = this.bodyString
    if (temp.getElementsByClassName('formCard').length > 0) {
      this.$refs.activeBar.switchtab(1)
      var innerHtml = ''
      var newArr = []
      var formC = temp.getElementsByClassName('formCard')
      // eslint-disable-next-line no-new-object
      var jsonObj = new Object()
      var imgYn = true
      for (var i = 0; i < formC.length; i++) {
        // eslint-disable-next-line no-new-object
        jsonObj = new Object()
        imgYn = true
        innerHtml += formC[i].outerHTML
        jsonObj.innerHtml = formC[i].innerHTML
        jsonObj.type = 'image'
        jsonObj.targetKey = i
        for (var c = 0; c < formC[i].classList.length; c++) {
          if (formC[i].classList[c] === 'formText') {
            jsonObj.type = 'text'
            imgYn = false
            break
          }
        }
        if (imgYn) {
          jsonObj.pSrc = formC[i].querySelector('img').src

          jsonObj.pFilekey = formC[i].querySelector('img').attributes.filekey.value
        }
        newArr.push(jsonObj)
      }
      this.propFormData = newArr
      this.$refs.complexEditor.setFormCard(this.propFormData)
      document.getElementById('msgBox').innerHTML = ''
      document.getElementById('msgBox').innerHTML = innerHtml
      this.viewTab = 'complex'
      this.addFalseList = document.querySelectorAll('.msgArea .formCard .addFalse')
    }

    console.log(this.addFalseList)
  },
  props: {
  },
  methods: {
    async previewFile (file) {
      let fileExt = file.name.substring(
        file.name.lastIndexOf('.') + 1
      )
      // 소문자로 변환
      fileExt = fileExt.toLowerCase()
      if (
        ['jpeg', 'jpg', 'png', 'gif', 'bmp'].includes(fileExt)
      ) {
        // FileReader 를 활용하여 파일을 읽는다
        var reader = new FileReader()
        var thisthis = this
        reader.onload = e => {
          var image = new Image()
          image.onload = async function () {
            var result = await thisthis.$saveFileSize(image, file)
            thisthis.$refs.complexEditor.addFormCard('image', result.path, true)
            thisthis.$refs.complexEditor.successImgPreview({ selectFileList: [{ previewImgUrl: result.path, addYn: true, file: result.file }], originalType: 'image' })
            // this.$emit('updateImgForm', this.previewImgUrl)
            // editorImgResize1(canvas.toDataURL('image/png', 0.8))
            // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
          }
          image.onerror = function () {

          }
          image.src = e.target.result
          // this.previewImgUrl = e.target.result
        }
        reader.readAsDataURL(file)
        // await this.$editorImgResize(this.selectFile)
      }
      // var result = await this.$previewFile(file)
      // if (result !== undefined && result !== null && result !== ''){
      //   this.$refs.complexEditor.addFormCard('image', result.url, true)
      //   this.$refs.complexEditor.successImgPreview({ selectFileList: [{ previewImgUrl: result.url, addYn: true, file: result.file }], originalType: 'image' })
      // }
      /* if (thisthis.$refs.selectFile.files.length > 1) {
        thisthis.$emit('setMultiFile', thisthis.selectFileList)
      } */
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    },
    changeUploadList (upList) {
      if (this.uploadFileList.length > 0) {
        var temp = this.uploadFileList
        this.uploadFileList = []
        this.uploadFileList = [
          ...temp,
          upList
        ]
      } else {
        this.uploadFileList.push(upList)
      }
    },
    changeTab (tab) {
      this.viewTab = tab
    },
    setParamInnerHtml (formCard) {
      var innerHtml = ''
      for (var i = 0; i < formCard.length; i++) {
        innerHtml += formCard[i].outerHtml
      }
      this.propFormData = formCard
      document.getElementById('msgBox').innerHTML = ''
      document.getElementById('msgBox').innerHTML = innerHtml
      /* this.formEditorShowYn = false */
      this.complexOkYn = true
      this.clickPageTopBtn()
    },
    setParamInnerText (innerText) {
      if (innerText !== undefined && innerText !== null && innerText !== '') {
        document.getElementById('msgBox').innerHTML = ''
        document.getElementById('msgBox').innerHTML = innerText
        this.formEditorShowYn = false
        this.propFormData = innerText
      }
    },
    deleteFile (idx) {
      this.selectFileList.splice(idx, 1)
    },
    async clickPageTopBtn () {
      if (this.viewTab === 'complex' && this.complexOkYn === false) {
        this.complexOkYn = true
        this.$refs.complexEditor.setParamInnerHtml()
      } else {
        var title = this.askTitle
        title = title.trim()
        if (title !== undefined && title !== null && title !== '') {
        } else {
          this.errorText = '제목을 입력해주세요'
          this.failPopYn = true
          return
        }
        var msgData = ''
        if (this.viewTab === 'complex') {
          msgData = document.getElementById('msgBox').innerText
        } else if (this.viewTab === 'text') {
          msgData = document.getElementById('textMsgBox').innerText
        }
        msgData = msgData.trim()
        // if ((msgData !== undefined && msgData !== null && msgData !== '') || this.uploadFileList.length > 0) {
        if (msgData !== undefined && msgData !== null && msgData !== '') {
        } else {
          this.errorText = '게시글의 내용을 입력해주세요'
          this.failPopYn = true
          this.complexOkYn = false
          return
        }
        this.checkPopYn = true
      }
    },
    delAttachFile (dFile) {
      if (dFile.addYn) {
        for (var d = 0; d < this.uploadFileList.length; d++) {
          if (this.uploadFileList[d].attachYn === true && this.uploadFileList[d].attachKey === dFile[0].attachKey) {
            this.uploadFileList.splice(d, 1)
          }
        }
      } else {
        this.delAddFalseFileList.push(dFile)
      }
    },
    setSelectedAttachFileList (sFile) {
      if (sFile[0].addYn === true) {
        this.uploadFileList.push(sFile)
      }
      console.log(this.uploadFileList)
    },
    async setAttachFileList () {
      var imgItemList = document.querySelectorAll('.msgArea .formCard .editorImg')
      console.log(imgItemList)
      console.log(this.addFalseList)
      console.log(this.delAddFalseFileList)
      // eslint-disable-next-line no-undef
      var delList = []
      for (var f = this.addFalseList.length - 1; f > -1; f--) {
        if (this.addFalseList[f].attachYn) {
          for (var af = 0; af < this.delAddFalseFileList.length; af++) {
            if (this.addFalseList[f].fileKey === this.delAddFalseFileList[af].fileKey) {
              delList.push(this.addFalseList[f])
              break
            }
          }
        } else {
          var delYn = true
          for (var t = 0; t < imgItemList.length; t++) {
            if (Number(this.addFalseList[f].attributes.filekey.value) === Number(imgItemList[t].attributes.filekey.value)) {
              delYn = false
              break
            }
          }
          if (delYn) {
            delList.push(this.addFalseList[f])
          }
        }
      }
      console.log(delList)
      // eslint-disable-next-line no-array-constructor
      var newAttachFileList = new Array()
      // eslint-disable-next-line no-new-object
      var setObj = new Object()
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@')
      console.log(this.addFalseList)
      if (delList.length > 0) {
        for (var a = 0; a < delList.length; a++) {
          // eslint-disable-next-line no-new-object
          setObj = new Object()
          setObj.addYn = false
          setObj.attachYn = false
          if (delList[a].attachYn) {
            setObj.fileKey = delList[a].fileKey
          } else {
            setObj.fileKey = Number(delList[a].attributes.filekey.value)
          }
          newAttachFileList.push(setObj)
        }
      }
      for (var i = 0; i < this.uploadFileList.length; i++) {
        // eslint-disable-next-line no-new-object
        setObj = new Object()
        if (this.uploadFileList[i].successSave) {
          setObj.addYn = true
          if (this.uploadFileList[i].attachYn) {
            setObj.attachYn = this.uploadFileList[i].attachYn
          } else {
            setObj.attachYn = false
          }
          setObj.fileKey = this.uploadFileList[i].fileKey
          setObj.fileName = (this.uploadFileList[i])[0].file.name
          newAttachFileList.push(setObj)
        }
      }
      console.log(newAttachFileList)
      return newAttachFileList
    },
    async sendMsg () {
      // eslint-disable-next-line no-debugger
      debugger
      // eslint-disable-next-line no-new-object
      var param = new Object()
      console.log('업로드할 개수는!!!' + this.uploadFileList.length)
      if (this.uploadFileList.length > 0) {
        this.checkPopYn = false
        this.progressShowYn = true
        await this.uploadFile()
        setTimeout(() => {
          this.progressShowYn = false
        }, 2000)
        this.sendLoadingYn = true
      } else {
        this.sendLoadingYn = true
      }
      param.attachFileList = await this.setAttachFileList()
      var innerHtml = ''
      if (this.viewTab === 'complex') {
        param.bodyHtmlYn = true
        var formList = document.querySelectorAll('#msgBox .formCard')
        if (formList) {
          for (var f = 0; f < formList.length; f++) {
            formList[f].contentEditable = false
          }
          param.getBodyHtmlYn = true
        }
        innerHtml = document.getElementById('msgBox').innerHTML
      } else if (this.viewTab === 'text') {
        param.bodyHtmlYn = false
        document.querySelectorAll('#textMsgBox')[0].contentEditable = false
        innerHtml = document.getElementById('textMsgBox').innerHTML
      }
      param.bodyFullStr = innerHtml.replaceAll('width: calc(100% - 30px);', 'width: 100%;')

      param.jobkindId = 'BOAR'
      param.creTeamKey = 377 // 더알림 공식 채널 teamKey
      param.cabinetKey = 11015 // 더알림 공식 채널의 문의 게시판 키
      param.onlyManagerYn = true
      // param.creTeamKey = JSON.parse(localStorage.getItem('sessionTeam')).teamKey
      // param.creTeamNameMtext = JSON.parse(localStorage.getItem('sessionTeam')).nameMtext
      param.creUserName = JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext
      param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      param.cabinetName = 'KO$^$문의하기게시판'
      param.title = this.askTitle
      param.showCreNameYn = true

      var result = await this.$saveContents(param)

      if (result.result === true) {
        // this.$emit('successSave')
        this.$emit('closeXPop', true)
      }
      this.sendLoadingYn = false
    },
    async uploadFile () {
      if (this.uploadFileList.length > 0) {
        console.log('this.uploadFileList')
        console.log(this.uploadFileList)
        var form = new FormData()
        var thisthis = this
        for (var i = 0; i < this.uploadFileList.length; i++) {
          thisthis.uploadFileList[i].percentage = 0
          form = new FormData()
          // Here we create unique key 'files[i]' in our response dictBase64.decode(data)
          // thisthis.uploadFileList[i].filePath = Base64.decode(thisthis.uploadFileList[i].filePath.replaceAll('data:image/png;base64,', ''))
          form.append('files[0]', (thisthis.uploadFileList[i])[0].file)
          await this.$axios
          // 파일서버 fileServer fileserver FileServer Fileserver
            .post('http://222.233.118.96:19091/tp.uploadFile', form,
              {
                onUploadProgress: (progressEvent) => {
                  var percentage = (progressEvent.loaded * 100) / progressEvent.total
                  thisthis.uploadFileList[i].percentage = Math.round(percentage)
                }
              },
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
            .then(res => {
              console.log(res)
              if (res.data.length > 0) {
                if ((this.uploadFileList[i])[0].attachYn === true) {
                  this.uploadFileList[i].attachYn = true
                } else {
                }
                var path = res.data[0].domainPath + res.data[0].pathMtext
                this.uploadFileList[i].successSave = true
                this.uploadFileList[i].filePath = path
                this.uploadFileList[i].fileSizeKb = res.data[0].fileSizeKb
                this.uploadFileList[i].fileKey = res.data[0].fileKey
              }
            })
            .catch(error => {
              console.log(error)
            })
          /* } */
          // var selFile = this.selectFileList[i].file
        }
        console.log(this.uploadFileList)
        var iList = document.querySelectorAll('.msgArea .formCard .addTrue')
        if (iList.length > 0) {
          for (var s = 0; s < this.uploadFileList.length; s++) {
            var uploadFile = this.uploadFileList[s]
            console.log('여기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            console.log(uploadFile)
            if (uploadFile.successSave) {
              for (var il = 0; il < iList.length; il++) {
                if (!uploadFile[0].attachYn && (iList[il].attributes.filekey === undefined || iList[il].attributes.filekey === null || iList[il].attributes.filekey === '')) {
                  iList[il].src = uploadFile.filePath
                  // eslint-disable-next-line no-unused-vars
                  iList[il].setAttribute('fileKey', uploadFile.fileKey)
                  iList[il].setAttribute('fileSizeKb', uploadFile.fileSizeKb)
                  iList[il].classList.remove('addTrue')
                  iList[il].classList.add('addFalse')
                  break
                }
              }
            } else {
              this.uploadFileList.splice(s, 1)
            }
          }
        }
      } else {
        alert('파일을 선택해 주세요.')
      }
      return true
    }
  }
}
</script>
<style scoped>
.askCommonFont{color: #303030; font-size: 15px;}
.askBoxWrap{width: 100%; min-height: 40px; border-radius: 5px; border: 1px solid #CFCFCF; padding: 0 0.7rem}
.pageMsgArea{ height: 100px; height: calc(100% - 10rem); width: 100%; overflow: hidden auto;
    float: left;
    overflow: hidden auto;}
/* .pageMsgArea{ min-height: 500px; height: calc(100% - 10rem);width: 100%; } */
.pageMsgArea p{font-size: 15px; color: #3A3A3A;  line-height: 30px; }
.pageMsgArea .msgArea{ width:100%; min-height: 300px; height:100%; border:1px solid #BFBFDA; border-radius: 5px; background-color: white;font-size: 15px;}
</style>
