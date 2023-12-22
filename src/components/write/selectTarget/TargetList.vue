<i18n>
{
  "ko": {
    "EDIT_BOOK_MSG_NOBOOK": "선택 대상이 없습니다.",
    "COMM_MSG_DEL_BOOK" : "주소록을 삭제하시겠습니까?",
    "COMM_MSG_DEL_MEMBER" : "해당 유저를 주소록에서 제외하시겠습니까?"
  },
  "en": {
    "EDIT_BOOK_MSG_NOBOOK": "There is no target.",
    "COMM_MSG_DEL_BOOK" : "Are you sure you want to delete your address book?",
    "COMM_MSG_DEL_MEMBER" : "Do you want to exclude this user from the address book?"
  }
}
</i18n>
<template>
  <div class="w100P h100P">
    <ActiveBar v-if="mTabList.length > 1 " ref="activeBar" :tabList="mTabList" class="activeBarStyle" @changeTab="changeTab" />
    <div @click.stop="goManageTarget" v-if="!mChildShowYn && mSelectedTabIndex !== undefined && mTabList[mSelectedTabIndex] && mTabList[mSelectedTabIndex].name === '내주소록'" style="min-width: 50px; float: right; position: absolute; color: #FFF; font-weight: bold; border-radius: 8px; font-size: 14px; line-height: 28px; height: 28px; right: 0; top: 5px; padding: 0 5px; background: #5F61BD">관리</div>
    <div class="targetListBox" :style="mTabList.length <= 1? 'height: 100%;':'margin-top: 40px;'">
      <gListEmpty v-if="!mNowTargetList || mNowTargetList.length === 0" :title="$t('EDIT_BOOK_MSG_NOBOOK')" :subTitle="$t('EDIT_BOOK_MSG_CREBOOK')" option="SELE" />
      <TargetUnit v-else v-for="target in mNowTargetList" :pReloadList="pReloadList" :class="{dispNone: mChildShowYn}" :pSubOption="pSubOption" @openPop="openPop" @targetEmitFunction="targetEmitFunction" @openSelectTargetPop="openChild" @addTarget="addTarget" :key="target.accessKey" :pTargetData="target" :pSelectedYn="checkSelectedYn(target).result" :pOption="pOption" />
      <transition name="show_left">
        <!-- 자식을 안에 품고 있는 형태(재귀) -->
        <TargetUnitList ref="TargetUniList" :pChildYn="true" :pParentData="mParentData" :pSubOption="pSubOption" @closeXPop="closeXPop" @childCheck="openChild" @addTarget="addTarget" v-if="mChildShowYn" :pSelectedTargetList="pSelectedTargetList" :pSelectData="mSelectedCList" :pOption="pOption" />
      </transition>
    </div>
    <gConfirmPop :confirmText="mConfirmText" @no="closeConfirmPop" v-if="mConfirmPopShowYn" @ok="mConfirmFunction" />
  </div>
</template>

<script>
import TargetUnit from './TargetUnit.vue'
import ActiveBar from './ActiveBar.vue'
export default {
  name: 'TargetUnitList',
  components: {
    TargetUnit,
    ActiveBar
  },
  props: {
    pChildYn: {
      type: Boolean,
      default: false
    },
    pSelectedTargetList: Array,
    pSelectData: Array,
    // 단순히 정보를 보여주는 목적인지, 대상 선택을 목적으로 하는 화면인지 구문해주는 인자
    pOption: String,
    pParentData: String, // 주소록일때, 자식targetList에서 부모가 누군지?
    pSubOption: String,
    pReloadList: Function // 데이터 리프레시 함수
  },
  data () {
    return {
      mParentData: null,
      mNowTargetList: [],
      mSelectedCList: [],
      mTabList: [],
      mSelectedTabIndex: 0,
      popId: '',
      mChildShowYn: false,
      mConfirmPopShowYn: false,
      mConfirmText: '',
      mConfirmFunction: null,
      mEmitParams: null
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pSelectData: {
      immediate: true,
      handler (val) {
        if (!val || val.length === 0) return
        console.log('valval', val)
        if (!this.pChildYn) {
          this.extractTabName()
          this.mNowTargetList = val[this.mSelectedTabIndex].targetList
          console.log('this.mNowTargetList ', this.mNowTargetList)
        } else {
        // 자식일 경우 tab이 없다고 보고 extractTabName을 하지 않음
          this.mNowTargetList = val
        }
      },
      deep: true
    },
    pageUpdate (value, old) {
      this.checkClosePop()
      /* const history = this.$store.getters['D_HISTORY/hStack']
      if (this.popId === history[history.length - 1]) {
        this.closeXPop()
      } */
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  },
  created () {
  },
  methods: {
    goManageTarget () {
      var param = {}
      param.targetType = 'followList'
      param.popHeaderText = this.$t('COMMON_NAME_MY_ADDERSS')
      param.callbackFn = this.pReloadList
      param.selectPopYn = true
      this.openPop(param)
    },
    openPop (params) {
      this.$emit('openPop', params)
    },
    checkClosePop () {
      if (this.mChildShowYn === true) {
        // 현재 가지고 있는 자식 팝업이 있으면, 자식 팝업의 닫기 함수 실행
        if (this.$refs.TargetUniList) {
          this.closeXPop()
        }
      } else {
        // 만약 가지고 있는 자식 팝업이 하나도 없으면 부모의 닫기 실행
        this.$emit('closeXPop')
      }
    },
    // tab을 선택했을 때 각 tabName에 매칭되는 데이터로 바꿔줌
    changeTab (tab) {
      this.mSelectedTabIndex = this.mTabList.findIndex((t) => t.name === tab)
      this.pSelectData.forEach(value => {
        if (value.tabName === tab) {
          this.mNowTargetList = value.targetList
        }
      })
      this.$emit('changeTab', tab)
      this.mChildShowYn = false
    },
    // 품고 있는 자식 팝업을 닫아줌
    closeXPop () {
      this.mSelectedCList = []
      /*
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history) */
      /* this.$checkDeleteHistory(`targetList${this.mNowTargetList.accessKey}`) */
      this.$emit('childCheck', false)
      this.mChildShowYn = false
    },
    // targetList가 품고 있는 자식 데이터를 받아 새로운 리스트를 열어줌
    openChild (params) {
      this.mParentData = params
      this.mSelectedCList = params.cList || params.mUserList
      this.mChildShowYn = true
      console.log(params)
      // 친구 리스트에서 자식 팝업을 열었을 때 대상을 추가할 수 있는 버튼을 나타내기 위해 + 현재 선택된 부모의 accessKey를 전달해주기 위해 실행되는 emit,
      this.$emit('childCheck', params)
    },
    // 해당하는 target이 선택되었는지 아닌지를 판별해주는 함수
    checkSelectedYn (target) {
      const index = this.pSelectedTargetList.findIndex(value => value.accessKey === target.accessKey && value.accessKind === target.accessKind && value.actType === target.actType)
      if (index === -1) {
        return { result: false }
      } else {
        return { result: true, index: index }
      }
    },
    // 각 targetList를 품고 있는 tabName만 추출해내기 위한 함수 (gActiveBar의 형태에 맞추기 위해)
    extractTabName () {
      this.mTabList = this.pSelectData.map(value => {
        if (value.tabName) {
          return { display: value.tabName, name: value.tabName }
        }
      })
      if (!this.mTabList[0]) {
        this.mTabList = []
      }
    },
    addTarget (target) {
      console.log(target)
      if (this.pSelectedTargetList && this.pSelectedTargetList.length > 0 && this.pSelectedTargetList[0].accessKind === 'T') {
        alert('채널은 단독으로만 선택가능합니다.')
        return
      } else if (this.pSelectedTargetList && this.pSelectedTargetList.length > 0 && target && target.accessKind === 'T') {
        alert('채널은 단독으로만 선택가능합니다.')
        return
      }
      this.$emit('addTarget', target)
    },
    // emit 종류에 따라 처리 하는 분기점
    targetEmitFunction (param) {
      console.log(param)
      if (param.emitType === 'DELETEBOOK') {
        // this.mConfirmText = this.$t('COMM_MSG_DEL_BOOK')
        // this.mConfirmPopShowYn = true
        // this.mConfirmFunction = this.deleteDispArray
        this.mEmitParams = param
        this.mConfirmFunction = this.deleteDispArray('C')
      } else if (param.emitType === 'DELETEUSER') {
        // this.mConfirmText = this.$t('COMM_MSG_DEL_MEMBER')
        // this.mConfirmPopShowYn = true
        // this.mConfirmFunction = this.deleteDispArray
        this.mEmitParams = param
        this.mConfirmFunction = this.deleteDispArray('U')
      } else if (param.emitType === 'EDIT') {
        this.$emit('editBook', param)
      }
    },
    closeConfirmPop () {
      this.mConfirmFunction = null
      this.mConfirmText = ''
      this.mConfirmPopShowYn = false
      this.mEmitParams = null
    },
    // 화면에서 해당하는 요소를 삭제해줌
    async deleteDispArray (type) {
      if (type === 'U') {
        const result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.deleteMCabContents',
          param: this.mEmitParams
        })
        console.log(result)
        if (result.data === 'true' || result.data === true) {
        }
      } else if (type === 'C') {
        const result = await this.$deleteCabinet(this.mEmitParams)
        console.log(result)
      }
      if (this.pReloadList) {
        this.pReloadList()
      }
      this.mNowTargetList = this.mNowTargetList.filter((value, index) => {
        if (value.accessKey !== this.mEmitParams.accessKey) {
          return value
        }
      })
      this.openChild({ accessKey: this.pParentData.accessKey, accessKind: this.pParentData.accessKind, cList: this.mNowTargetList })

      // await this.$commonAxiosFunction({
      //   url: this.mEmitParams.axiosUrl,
      //   param: this.mEmitParams
      // })

      this.mConfirmPopShowYn = false
    }
  }
}
</script>

<style scoped>
.dispNone{
  display:none;
}
.targetListBox {
  width: 100%;
  overflow: auto;
  position: absolute;
  background-color: white;
  height: calc(100% - 40px);
}
.activeBarStyle {
  width: 100% !important;
  padding-top: 0 !important;
  margin-top: 0 !important;
  height: 40px !important;
}
</style>
