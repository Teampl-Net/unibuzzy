<i18n>
  {
    "ko": {
      "TODO_COMPLETE_CONFIRM_MSG": "완료하시겠습니까?",
      "TODO_COMPLETE_NO_COMMENT_CONFIRM_MSG": "완료메세지를 작성하지 않았습니다. 그래도 완료하시겠습니까?",
    },
    "en": {
      "TODO_COMPLETE_CONFIRM_MSG": "Would you like to complete the Todo with a message?",
      "TODO_COMPLETE_CONFIRM_MSG": "You haven't written a completion message. Would you still like to proceed with the completion?",
    }
  }
  </i18n>
<template>
    <div style="width: calc(100% - 60px); height: 300px; padding: 10px 20px; background: #FFF; border-radius: 0.8rem; box-shadow: 0 0 4px 4px #00000036; position: absolute; z-index: 99; left: 30px; top:25%;">
      <div style="display: flex; justify-content: space-between; height: 40px; border-bottom: 1.5px solid #ccc; align-items: flex-start;">
          <p class="commonColor font20 fontBold textLeft">{{$t('COMMON_NAME_TODOLIST')}} 완료</p>
          <img src="@/assets/images/common/grayXIcon.svg" @click="backClick" class="mtop-02 cursorP" alt="">
      </div>
      <div style="padding: 10px 0px; width: 100%; height: calc(100% - 80px);" >
        <p class="font15 textLeft fontBold mbottom-05">"{{ CONT_DETAIL.title }}"일을 완료합니다<br>완료 메세지를 남겨주세요!</p>
        <pre placeholder="완료 설명을 작성해주세요."  id="memoCommentTag" class="editableContent memoCardTextid memoTextPadding " style="width: 100%; height: calc(100% - 50px); min-height: 100px;transition:all 0.3s;  "  contenteditable=true  @input="inputTextCheck"/>
      </div>
      <div class="" style="width: 100%; display: flex; justify-content: center; height: 40px; align-items: center;">
          <gBtnSmall btnTitle="완료" class="mright-05"  @click="openConfirmPop"/>
          <gBtnSmall btnTitle="취소" btnThema="light" @click="backClick"/>
      </div>
      <gConfirmPop :confirmText="confirmText" confirmType="two" @no="confirmPopShowYn = !confirmPopShowYn"  @ok="completeTodo" v-if="confirmPopShowYn"/>
        <!-- <div style="width: 100vw; height: 100vh; position: fixed; background: #00000026; left: 0; top: 0; z-index:100;"></div>
        <div style="width: calc(100% - 60px); height: 400px; background: #FFF; border-radius: 0.8rem; box-shadow: 0 0 4px 4px #00000036; position: absolute; z-index: 101; left: 30px; top:35%;"></div> -->
    </div>
</template>

<script>
export default {
  props: {
    pTodoElement: {},
    pCloseCompletePop: Function,
    pCompleteTodo: Function
  },
  data () {
    return {
      popId: 'completeTodoPop',
      mWatchInputData: '',
      confirmPopShowYn: false,
      confirmText: this.$t('TODO_COMPLETE_CONFIRM_MSG')

    }
  },
  created () {
    this.test = this.pFilterList
    var history = this.$store.getters['D_HISTORY/hStack']
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  methods: {
    completeTodo () {
      this.confirmPopShowYn = false
      if (this.pCompleteTodo) {
        this.pCompleteTodo(this.CONT_DETAIL, this.mWatchInputData)
      }
    },
    openConfirmPop () {
      this.confirmPopShowYn = true
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        if (this.pCloseCompletePop) {
          this.pCloseCompletePop()
        }
      } else {

      }
    },
    inputTextCheck (e) {
      this.mWatchInputData = e.target.innerText
    }
  },
  computed: {
    CHANNEL_DETAIL () {
      var detail = this.$getDetail('TEAM', 0)
      if (detail && detail.length > 0) {
        if (
          !detail[0].D_CHAN_AUTH ||
            detail[0].D_CHAN_AUTH === true ||
            (detail[0].D_CHAN_AUTH.followYn && !detail[0].D_CHAN_AUTH.settingYn)
        ) {
          return this.CHANNEL_DETAIL
        } else {
          return detail[0]
        }
      } else {
        if (this.CHANNEL_DETAIL) {
          return this.CHANNEL_DETAIL
        } else {
          return null
        }
      }
    },
    CONT_DETAIL () {
      if (!this.pTodoElement) return
      var cont = this.$getContentsDetail(
        null,
        this.pTodoElement.contentsKey,
        0,
        this.pTodoElement.jobkindId
      )
      if (!cont) {
        cont = [this.pTodoElement]
      }
      if (cont && cont.length > 0) {
        return cont[0]
      } else {
        return this.pTodoElement
      }
    },
    GE_NEW_CONT_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_CONT_LIST']
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    CONT_DETAIL: {
      immediate: true,
      deep: true,
      handler (value, index) {
        if (value && value.contStatus === '99') {}
      }
    },
    GE_NEW_CONT_LIST: {
      handler (value, old) {
        if (!value || !value[0]) return
        if (value[0].jobkindId !== 'TODO') return
        const newTodo = value[0]
        // let oriList = []
        newTodo.strikeOnOff = false
        newTodo.sideMenuOpenYn = false
        if (newTodo.contStatus === '99' && newTodo.contentsKey === this.CONT_DETAIL.contentsKey) {

        }
      },
      deep: true
    },
    pageUpdate (value, old) {
      this.backClick()
    }

  }
}
</script>

<style scoped>
.memoCardTextid:empty:before {
  content: attr(placeholder);
  color:#AFAFAF;
}

.memoCardTextid {
  border: 1px solid #aaa;
  border-radius: 5px;
  min-width: 50px;
  width: 50px;
  height: 35px;
  box-sizing: border-box;
}
</style>
