<i18n>
{
  "ko": {
    "EDIT_BOOK_MSG_NOBOOK": "선택 대상이 없습니다."
  },
  "en": {
    "EDIT_BOOK_MSG_NOBOOK": "There is no target."
  }
}
</i18n>
<template>
  <div class="w100P h100P">
    <ActiveBar v-if="mTabList.length > 0 " ref="activeBar" :tabList="mTabList" class="activeBarStyle" @changeTab="changeTab" />
    <div class="w100P targetListBox" :style="mTabList.length === 0? 'height: 100%;':'margin-top: 40px;'">
      <gListEmpty v-if="!mNowTargetList || mNowTargetList.length === 0" :title="$t('EDIT_BOOK_MSG_NOBOOK')" :subTitle="$t('EDIT_BOOK_MSG_CREBOOK')" option="SELE" />
      <TargetUnit v-else v-for="target in mNowTargetList" :class="{dispNone: mChildShowYn}" @openSelectTargetPop="openChild" @addTarget="addTarget" :key="target.accessKey" :pTargetData="target" :pSelectedYn="checkSelectedYn(target).result" pOption="SELECT" />
      <transition name="show_left">
        <!-- 자식을 안에 품고 있는 형태(재귀) -->
        <TargetUnitList ref="TargetUniList" :pChildYn="true" @closeXPop="closeXPop" @addTarget="addTarget" v-if="mChildShowYn" :pSelectedTargetList="pSelectedTargetList" :pSelectData="mSelectedCList" />
      </transition>
    </div>
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
    pSelectData: Array
  },
  data () {
    return {
      mNowTargetList: [],
      mSelectedCList: [],
      mTabList: [],
      mChildShowYn: false
    }
  },
  created () {
    if (this.pSelectData && this.pSelectData.length > 0) {
      if (!this.pChildYn) {
        this.extractTabName()
        this.mNowTargetList = this.pSelectData[0].targetList
      } else {
        // 자식일 경우 tab이 없다고 보고 extractTabName을 하지 않음
        this.mNowTargetList = this.pSelectData
      }
      this.$addHistoryStack(`targetList${this.mNowTargetList.accessKey}`)
    }
  },
  methods: {
    checkClosePop () {
      if (this.mChildShowYn === true) {
        // 현재 가지고 있는 자식 팝업이 있으면, 자식 팝업의 닫기 함수 실행
        if (this.$refs.TargetUniList) {
          this.$refs.TargetUniList.checkClosePop()
        }
      } else {
        // 만약 가지고 있는 자식 팝업이 하나도 없으면 부모의 닫기 실행
        this.$emit('closeXPop')
      }
    },
    // tab을 선택했을 때 각 tabName에 매칭되는 데이터로 바꿔줌
    changeTab (tab) {
      this.pSelectData.forEach(value => {
        if (value.tabName === tab) {
          this.mNowTargetList = value.targetList
        }
      })
      this.mChildShowYn = false
    },
    // 품고 있는 자식 팝업을 닫아줌
    closeXPop () {
      this.mSelectedCList = []
      var history = this.$store.getters['UB_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$checkDeleteHistory(`targetList${this.mNowTargetList.accessKey}`)
      this.mChildShowYn = false
    },
    // targetList가 품고 있는 자식 데이터를 받아 새로운 리스트를 열어줌
    openChild (cTarget) {
      this.mSelectedCList = cTarget
      this.mChildShowYn = true
    },
    // 해당하는 target이 선택되었는지 아닌지를 판별해주는 함수
    checkSelectedYn (target) {
      const index = this.pSelectedTargetList.findIndex(value => value.accessKey === target.accessKey && value.accessKind === target.accessKind)
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
      this.$emit('addTarget', target)
    }
  }
}
</script>

<style scoped>
.dispNone{
  display:none;
}
.targetListBox {
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
