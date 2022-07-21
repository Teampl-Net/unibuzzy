<template>
<div class="pagePaddingWrap" style="display: flex; flex-direction: column; text-align: left; height: 100vh;">
  <div style="width: 100%; height: 80%; margin-bottom: 3rem;">
    <!-- <select class="askBoxWrap">
      <option class="askCommonFont">문의 유형</option>
    </select> -->
    <input type="text" class="askBoxWrap askCommonFont mtop-1" v-model="askTitle" placeholder="제목"/>

    <gActiveBar :tabList="this.activeTabList" style="" class="mbottom-05 fl mtop-1" @changeTab= "changeTab" />
    <div class="pageMsgArea" style="">
      <!-- <p class="">내용</p> -->
      <div id="textMsgBox" class="editableContent"  v-if="viewTab === 'text'" style="padding:7px; overflow: hidden scroll; width: 100%; height: 100%; border-radius: 5px; border: 1px solid #6768a745; text-align: left; background: #fff; " contenteditable=true></div>
      <div @click="formEditorShowYn = true" v-else-if="viewTab === 'complex'" class="msgArea" style="padding:7px; overflow: hidden scroll;" id="msgBox">클릭하여 내용을 작성해주세요</div>

    </div>

    <!-- <textarea class="askBoxWrap askCommonFont mtop-1 ptop-1" v-model="askBody" style="padding-top: 0.5rem;" name="" id="" cols="30" rows="10" placeholder="내용을 입력해 주세요."></textarea> -->
    <!-- <div style="background-color: #A9AACD; width: 80px; height: 80px; margin-top: 0.5rem; padding: 0.7rem 0; border-radius: 5px; position: relative; text-align: center;">
      <img style="width: 2.5rem;" src="../../../assets/images/common/icon_attach.png" alt="">
      <p style="color: #FFFFFF; font-size: 15px; margin-top: 0.5rem">첨부하기</p>
    </div> -->
  </div>
  <gBtnLarge v-on:click="clickPageTopBtn" :btnTitle="this.completeBtnTitle" />
</div>
<div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
<gConfirmPop confirmText='게시글을 저장하시겠습니까?' @no='checkPopYn=false' v-if="checkPopYn" @ok='sendMsg' />
<gConfirmPop @click="this.$emit('closeXPop', true)" confirmText='저장 되었습니다.' confirmType='timeout' v-if="okPopYn" />
<commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
 <div v-if="formEditorShowYn" style="position: fixed; top: 0; left: 0; width: 100vw; background: #fff; height: 100vh; z-index: 99999999999999999999">
  <popHeader @closeXPop="this.formEditorShowYn = false" class="commonPopHeader" headerTitle="게시글작성" />
  <formEditor :propFormData="propFormData" @setParamInnerHtml="setParamInnerHtml" @setParamInnerText="setParamInnerText"/>
</div>
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
      activeTabList: [{ display: '기본 문의', name: 'text' }, { display: '복합 문의', name: 'complex' }]

    }
  },
  mounted () {
  },
  props: {
  },
  methods: {
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
      this.formEditorShowYn = false
    },
    setParamInnerText (innerText) {
      if (innerText !== undefined && innerText !== null && innerText !== '') {
        document.getElementById('msgBox').innerHTML = ''
        document.getElementById('msgBox').innerHTML = innerText
        this.formEditorShowYn = false
        this.propFormData = innerText
      }
    },
    async clickPageTopBtn () {
      var title = this.askTitle
      title.trim()
      if (title !== undefined && title !== null && title !== '') {
      } else {
        this.errorText = '제목을 입력해주세요'
        this.failPopYn = true
        return
      }
      var msgData = ''
      if (this.viewTab === 'complex') {
        msgData = document.getElementById('msgBox').innerHTML
      } else if (this.viewTab === 'text') {
        msgData = document.getElementById('textMsgBox').innerHTML
      }
      if (msgData !== undefined && msgData !== null && msgData !== '') {
      } else {
        this.errorText = '알림 내용을 입력해주세요'
        this.failPopYn = true
        return
      }
      this.checkPopYn = true
    },
    async sendMsg () {
      this.sendLoadingYn = true
      // eslint-disable-next-line no-new-object
      var param = new Object()

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
        // debugger
        innerHtml = document.getElementById('textMsgBox').innerHTML
      }
      param.bodyFullStr = innerHtml.replaceAll('width: calc(100% - 30px);', 'width: 100%;')

      param.jobkindId = 'BOAR'
      param.creTeamKey = 377 // 더알림 공식 채널 teamKey
      param.cabinetKey = 11015 // 더알림 공식 채널의 문의 게시판 키
      // param.actorList = this.propData.actorList
      // param.creTeamKey = JSON.parse(localStorage.getItem('sessionTeam')).teamKey
      // param.creTeamNameMtext = JSON.parse(localStorage.getItem('sessionTeam')).nameMtext
      param.creUserName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
      param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      param.title = this.askTitle
      param.showCreNameYn = true

      var result = await this.$saveContents(param)

      if (result.result === true) {
        // this.$emit('successSave')
        this.$emit('closeXPop', true)
      }
      this.sendLoadingYn = false
    }

  }
}
</script>
<style scoped>
.askCommonFont{color: #303030; font-size: 15px;}
.askBoxWrap{width: 100%; min-height: 40px; border-radius: 5px; border: 1px solid #CFCFCF; padding: 0 0.7rem}
.pageMsgArea{ height: 100px; height: calc(100% - 10rem); width: 100%; }
/* .pageMsgArea{ min-height: 500px; height: calc(100% - 10rem);width: 100%; } */
.pageMsgArea p{font-size: 15px; color: #3A3A3A;  line-height: 30px; }
.pageMsgArea .msgArea{ width:100%; min-height: 300px; height:100%; border:1px solid #BFBFDA; border-radius: 5px; background-color: white;font-size: 15px;}
</style>
