<template>
    <div class="w-100P" style="height: 100%">
        <!-- <pushDetailPop v-if="this.pushDetailPopShowYn" @closeDetailPop="closeDetailPop"/> -->
        <writePushPageTitle class="pleft-2" titleText="알림작성"  @clickEvnt="clickPageTopBtn" :btnYn ="false" pageType="writePush"/>
        <div :style="toolBoxWidth" class="writeArea">
          <div  :style="setColor" class="paperBackground">
            <div class="fr changePaperBtn font13" style="color:white; border-radius:0.3em; padding: 4px 10px;">편지지 변경</div>
            <div class="whitePaper">
              <div class="overFlowYScroll pushInputArea">
                <div class="pageTopArea">
                  <div class=""><p style="">제목</p><input type="text" id="pushTitleInput" class="recvUserArea inputArea fl" v-model="writePushTitle" style="background-color:white" name="" ></div>
                  <div class="">
                    <p style="">수신대상</p>
                    <div class="inputArea recvUserArea">
                      {{organizationText}}
                      <!-- <img class="orgaIcon" @click="changeOption(0)" src="../../assets/images/organizationIcon.svg" alt=""> -->
                    </div>
                  </div>
                </div>
                <div class="pageMsgArea" style="">
                  <p  class="">내용</p>
                  <textarea class="msgArea" style="padding:7px;" v-model="msgData"></textarea>
                  <!-- <div class="msgArea" @click="messageAreaClick" style="padding:5px; overflow: auto;">
                    {{msgData}}
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--<div id="toolBox" :style="toolBoxWidth"  v-if="this.toolShowYn" style="padding: 1rem; float: left; width: var(--width); height: 100%; background: #FFFFFF;"> -->
        <!-- <msgPop @no='popNo' v-if="msgPopYn" @save='popSave' :propMsgData='msgData'/> -->
    </div>
</template>
<script>
// import msgPop from '../admPages/TalAdm_writePush/TalAdm_msgPopup.vue'
import writePushPageTitle from '../admPages/TalAdm_writePush/TalAdm_writePushTop.vue'
// import gPageTitle from '../../../components/unit/admUnit/TalAdm_gPageTitle.vue'

export default {

  data () {
    return {
      // msgPopYn:false,
      msgData:'',
      organizationText:'구독자 전원',
      writePushTitle:'팀플 앱 사용 안내',

      myProgress: 55.5,
      closeAutoPopCnt: 5,
      selectFile: null, // 파일 객체
      previewImgUrl: null, // 미리보기 이미지 URL
      selectFileList: [],
      isUploading: false, // 파일 업로드 체크
      response: null, // 파일 업로드후 응답값
      // The configuration of the editor.
      toolWidth: 500,
      // toolShowYn: false,
      selectedTab: 0,
      chanInfo: { chanName: '더알림대학교', group: [{ groupName: '입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처', groupKey: '0' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '학생복지처', groupKey: '2' }, { groupName: '학생', groupKey: '3' }] },
      colorList: ['#6768A7', '#BFBFDA', '#00000029', '#C8C8C8A3', '#E1E1E1', '#BFBFDA', '#EFEFF6', '#6768A7', '#A9AACD', '#A1A1A1', '#0000002E'],
      selectedC: 0,
      pushDetailPopShowYn: true,
      pushList: [
        { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', pushBody: '기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', pushBody: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', pushBody: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', pushBody: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' }
      ],
      progressShowYn: false
    }
  },
  computed: {
    // toolBoxWidth () {
    //   return {
    //     '--width': this.toolWidth + 'px'
    //   }
    // },
    setColor () {
      return {
        'background-color': this.colorList[this.selectedC]
      }
    }
  },
  methods: {
    messageAreaClick(){
      this.msgPopYn = true
    },
    popNo(){
      this.msgPopYn = false
    },
    popSave(obj){
      this.msgData = obj.admMsg
      this.msgPopYn = false
    },


    /* allBlur () {
      this.$refs.formEditor.focus()
      // this.$ref.formEditor.allBlur()
    }, */
    setParamInnerHtml (innerHtml) {
      var param = new Object()
      param.bodyMinStr = innerHtml
      param.creTeamKey = 10
      param.creUserKey = 1
      var title = document.getElementById('pushTitleInput').value
      if(title){
        param.title = document.getElementById('pushTitleInput').value
      } else {
        alert('제목을 입력해주세요')
        return
      }
      this.$saveContents(param)
    },
    clickPageTopBtn (btn) {
      if(btn === 'sendPushMsg') {
        if(this.writePushTitle && this.msgData){
          alert('제목 : ' + this.writePushTitle
          +'\n수신대상 : '+this.organizationText
          +'\n내용 : '+this.msgData)

        }else{
          alert('제목과 내용 모두 입력해주세요')
        }


        // this.setParamInnerHtml()
      }
    },
    onReady (editor) {
      // alert(true)
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      )
    },
    openToolBox (tool) {
      this.selectedTool = tool
      this.toolShowYn = true
      // this.toolWidth = 400
    },
    closeToolBox () {
      // this.toolShowYn = false
      // this.toolWidth = 0
    },
    selectedColor (index) {
      this.selectedC = index
    },
    openPushDetail () {
      this.pushDetailPopShowYn = true
    },
    closeDetailPop () {
      this.pushDetailPopShowYn = false
      // this.toolShowYn = false
      // this.toolWidth = 0
    },
    changeOption (tab) {
      this.selectedTab = tab
    },
    previewFile () {
      var tselectFile = null
      this.previewImgUrl = null
      // 선택된 파일이 있는가?
      if (this.$refs.selectFile.files.length > 0) {
        // 0 번째 파일을 가져 온다.
        // eslint-disable-next-line no-debugger
        for (var k = 0; k < this.$refs.selectFile.files.length; k++) {
          tselectFile = this.$refs.selectFile.files[k]
          // 마지막 . 위치를 찾고 + 1 하여 확장자 명을 가져온다.
          let fileExt = tselectFile.name.substring(
            tselectFile.name.lastIndexOf('.') + 1
          )
          let fileSize = niceBytes(tselectFile.size)
          // 소문자로 변환
          fileExt = fileExt.toLowerCase()
          if (
            ['jpeg', 'jpg', 'png', 'gif', 'bmp'].includes(fileExt)
          ) {
            this.previewImgUrl = window.URL.createObjectURL(tselectFile)
            this.selectFileList.push({ previewImgUrl: this.previewImgUrl, file: tselectFile , percentage: 0, size: fileSize })
          // FileReader 를 활용하여 파일을 읽는다
            /* var reader = new FileReader()
            reader.onload = e => {
              // base64
              this.previewImgUrl = e.target.result
              this.selectFileList.push({ previewImgUrl: this.previewImgUrl, file: tselectFile })
            // eslint-disable-next-line no-debugger
            }
            reader.readAsDataURL(tselectFile) */
          } else {
            this.selectFileList.push({ previewImgUrl: null, file: tselectFile, percentage: 0, size: fileSize })
          }
          //   else if (this.selectFile.size > 1048576) {
          //   // 이미지외 파일
          //     this.previewImgUrl = null
          //   }
          // else {
          //   alert('파일을 다시 선택해 주세요.')
          //   this.selectFile = null
          //   this.previewImgUrl = null
          // }
          // this.selectFileList.push({ previewImgUrl: this.previewImgUrl, file: this.selectFile })
          // this.selectFile = null
          // this.previewImgUrl = null
          // this.uploadPreviewArea += 1
        }
      } else {
        // 파일을 선택하지 않았을때
        this.selectFile = null
        this.previewImgUrl = null
      }
      console.log(this.selectFileList)
    },
    deleteFile (idx) {
      this.selectFileList.splice(idx, 1)
    },
    openSelectFilePop () {
      this.$refs.selectFile.click()
    },
    async formSubmit () {
      this.progressShowYn = true
      if (this.selectFileList.length > 0) {

        for (var i = 0; i < this.selectFileList.length; i++) {
          // var selFile = this.selectFileList[i].file
          // Here we create unique key 'files[i]' in our response dict
          var form = new FormData()
          form.append('file', this.selectFileList[i].file)

          await this.$axios
          .post('/uploadFile', form, {
              onUploadProgress: (ProgressEvent) => {
              const percentage = (ProgressEvent.loaded * 100) / ProgressEvent.total
              const percentCompleted = Math.round(percentage)
              this.selectFileList[i].percentage = percentCompleted
              // alert(this.activePer[i])
              // eslint-disable-next-line no-undef
            }
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            this.response = res
            this.isUploading = false
            // eslint-disable-next-line no-debugger
            /* if(this.selectFileList.length - 1 === i) {
              let play = setInterval(this.countDown(),1000)
            } */
          })
          .catch(error => {
            this.response = error
            this.isUploading = false
            /* if(this.selectFileList.length - 1 === i) {
              let play = setInterval(this.countDown(),1000)

            } */
          })
        }
        this.isUploading = true
        setTimeout(() => {

          this.selectFileList = []
          this.progressShowYn =false
        }, 3000);
      } else {
        alert('파일을 선택해 주세요.')
      }

      return true
    },
    /* countDown () {
      this.closeAutoPopCnt --
      if(this.closeAutoPopCnt === 0)
                clearInterval(play)
    } */
  },

  components: {
    // msgPop,
    writePushPageTitle
  }
}
</script>
<style scoped>
.whitePaper {
      position: relative;
      width: 100%;
      margin: 0 auto;
      margin-top: 1rem;
      border-radius: 0.8rem;
      height: 100%;
      /* background-color: #fafafa; */
      background-color: #f9f9f9;
      color: #363c5f;
      padding: 1.5rem;
      text-align: left;
      /* box-shadow: 0 0 9px 0 #ccc; */
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%  , 0 100%);
  }

  .whitePaper:after {
      content: '';
      position: absolute;
      display: block;
      width: 50px;
      height: 50px;
      background-color: #e1e1f2;
      bottom: 0;
      right: 0;
  }
  .whitePaper:before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  border-bottom: 50px solid #7373734f;
  border-right: 50px solid #F9F9F9;
  width: 0;
}

/* add by_jeong */
.pageMsgArea{ min-height: 500px; height: calc(100% - 10rem);width: 100%; }
.pageMsgArea p{ width: 100px; font-size: 15px; color: #3A3A3A;  line-height: 30px; }
.pageMsgArea .msgArea{ width:100%; border:1px solid #ccc; height:450px; border-radius: 0.8rem; background-color: white;}


.pageTopArea{
  width: 100%; height: 5rem;
}
.pageTopArea >div{
  width: 100%; min-height: 2.5rem;
}
.pageTopArea p{width: 100px; font-size: 15px; color: #3A3A3A; float: left; line-height: 30px;}
.pageTopArea .inputArea{width: calc(100% - 100px); box-sizing: border-box; }

#toolBox{margin-top: -1rem; float: left; height: 100%; background: #FFFFFF; display: flex;  width: var(--width); height: 100%;  border-left: none;}
#toolBox >.toolContentsArea {height: calc(100% - 6rem); width: calc(100% - 100px)}
.toolContentsArea {position: relative; padding: 0.5rem 1rem;  padding-right: 1.5rem;}

.colorBox{float: left; width: 55px; height: 42px; border-radius: 5px; margin-right: 0.5rem; margin-bottom: 0.5rem;}
.selectedColor{border: 2px solid #000}

.editorOption{display: flex; flex-direction: column; border-right: 1px solid #BFBFDA; width: 100px;}
.editorOption > div {height: 50px; text-align: center; padding: 0.5rem; cursor: pointer;}
.activeColor{background: #EFEFF6;}
.activeColor p{color: #6768A7!important;}
.editorOption p{color: #6768A7; color: #BFBFDA; font-size: 11px;}

.writeArea{padding: 2rem 0; width: 100%; float: left; height: calc(100% - 2rem); margin-top: 0rem; float: left; background:#F9F9F9; padding-top: 0;}
/* .writeArea{padding: 2rem 0; width: calc(100% - var(--width)); float: left; height: calc(100% - 2rem); margin-top: 0rem; float: left; background:#F9F9F9; padding-top: 0;} */
.paperBackground{width: 700px; height: calc(100% - 1rem); position: relative; margin: 0 auto; margin-top: 2rem; padding: 4rem 4rem; box-shadow: 0 0 9px 0px #00000029; border-radius: 10px 10px 0 0;}
.changePaperBtn{border: 1px solid #FFFFFF; position: absolute; top: 1.5rem; right: 2rem;}
.latestPushBtn{float: right!important; position: absolute; right: 1.5rem; margin-top: 0.5rem;}
.pushInputArea{padding-right: 1rem; height: 100%; width: 100%;}

.pushInputArea .recvUserArea{border: 1px solid #BFBFDA; border-radius: 5px; height: 30px; float: left; position: relative; padding-right: 3rem;}
.orgaIcon{position: absolute; top: 0.3rem; right: 0.5rem; cursor: pointer;}

.pushBodyInput{resize: none; border-radius: 5px; border: 1px solid #BFBFDA; width: 100%; height: calc(100% - 7rem); padding: 1rem; box-sizing: border-box; color: #010101; font-size: 15px;}
.attatchFileBtn{cursor: pointer; width: 80px; height: 80px;margin-top: 0.5rem;border-radius: 5px; background: #A9AACD; display: flex; flex-direction: column; justify-content: center; align-items: center;}
.attatchFileBtn p{color: #FFFFFF; font-size: 10px; margin-top: 0.5rem;}

.toolBtnArea{justify-content: flex-end; position: absolute; right: 0; top: 0rem}
.toolLeftTab{color: #6768A7; font-weight: bold; font-size: 15px;margin-bottom: 1rem;}

.toolSearchBox{border: 1px solid #BFBFDA!important; border-radius: 5px!important;}
.toolPushCard{box-shadow: none !important; border: 1px solid #E1E1E1 !important;}
.selectPaperWrap{width: 100%; height: 100%; float: left; margin-top: 1rem;}
</style>
