<i18n>
  {
    "ko": {
      "COMM_SELECT_TARGET" : "대상 선택"
    },
    "en": {
      "COMM_SELECT_TARGET" : "Select target"
    }
  }
</i18n>
<template>
  <div class="accessListPop">
    <PopHeader
      @closeXPop="checkClosePop"
      class="headerShadow"
      :headerTitle="this.$t('COMM_SELECT_TARGET')"
    />
    <div
      class="pagePaddingWrap accessPopBody"
      :style="'padding-top:' + ($STATUS_HEIGHT + 60) + 'px'"
    >
      <TargetList
        class="targetListWrap"
        ref="targetList"
        @closeXPop="closeXPop"
        @addTarget="addTarget"
        @openPop="openPop"
        pOption="SELECT"
        :pChildYn="pChildYn"
        :pSubOption="pSubOption"
        :pSelectData="pSelectData"
        :pSelectedTargetList="mSelectedTargetList"
        :pReloadList="pReloadList"
      />
      <SelectedTargetList
        class="selectedListCompo"
        ref="selectedListCompo"
        @saveTarget="saveTarget"
        @addTarget="addTarget"
        :pSelectedTargetList="mSelectedTargetList"
      />
    </div>
    <!-- 선택팝업에서 개인주소록(팔로우) 관리로 이어지도록 -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import PopHeader from './PopHeader.vue'
import TargetList from './TargetList.vue'
import SelectedTargetList from './SelectedTargetList.vue'

export default defineComponent({
  components: {
    SelectedTargetList,
    TargetList,
    PopHeader
  },
  props: {
    pSelectData: Array,
    pSelectedTargetList: Array,
    pSelectOnlyYn: Boolean,
    pSubOption: String,
    pChildYn: Boolean,
    pReloadList: Function
  },
  data () {
    return {
      mSelectedTargetList: [], // 선택된 targetList,
      popId: null
    }
  },
  created () {
    console.log('pSelectData', this.pSelectData)
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'selectTargetPop' + history.length
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)

    if (this.pSelectedTargetList && this.pSelectedTargetList.length > 0) {
      this.mSelectedTargetList = [...this.pSelectedTargetList]
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
    pageUpdate (value, old) {
      const history = this.$store.getters['D_HISTORY/hStack']
      if (this.popId === history[history.length - 1]) {
        if (this.$refs.targetList) {
          this.$refs.targetList.checkClosePop()
        } else {
          this.closeXPop()
        }
      }
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  },
  methods: {
    openPop (params) {
      this.$emit('openPop', params)
    },
    checkClosePop () {
      if (this.$refs.targetList) {
        this.$refs.targetList.checkClosePop()
      }
    },
    saveTarget () {
      this.$emit('saveTarget', this.mSelectedTargetList)
      console.log(this.mSelectedTargetList)
      this.closeXPop()
    },
    addTarget (target) {
      // 선택 여부를 판별하여 추가할지 삭제할지 선택
      const result = this.checkSelectedYn(target)
      if (result.result) {
        this.mSelectedTargetList.splice(result.index, 1)
      } else {
        if (this.pSelectOnlyYn) {
          this.mSelectedTargetList = [target]
        } else {
          this.mSelectedTargetList.push(target)
        }
      }
    },
    checkSelectedYn (target) {
      // 해당하는 target이 선택되었는지 아닌지를 판별해주는 함수
      const index = this.mSelectedTargetList.findIndex(
        (value) =>
          value.accessKey === target.accessKey &&
          value.accessKind === target.accessKind
      )
      if (index === -1) {
        return { result: false }
      } else {
        return { result: true, index: index }
      }
    },
    closeXPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$checkDeleteHistory('selectTargetPop')
      this.$emit('closeXPop')
    }
  }
})
</script>

<style scoped>
.pagePaddingWrap {
  padding: 0px 1.5rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 50px;
}
.longHeight {
  height: 100% !important;
}
.selectedReceiverBox {
  height: calc(100% - 100px);
  width: 100%;
  margin-top: 5px;
  overflow-y: scroll;
  padding: 10px;
  background-color: white;
  text-align: left;
}
[contenteditable='true'] {
  outline: none;
}
input:focus {
  outline: none;
}
.accessListPop {
  height: 100%;
  background-color: white;
  width: 100%;
  z-index: 9999999;
  position: fixed;
  border-radius: 8px;
  overflow: hidden;
  top: 0;
  left: 0;
}
.accessPopBody {
  position: absolute;
  overflow: auto;
  padding-top: 50px;
  width: 100%;
}
.accessPopBody > div:first-child {
  width: 100%;
  position: relative;
  float: left;
  height: calc(100% - 95px);
  overflow: auto;
}
.selectedListCompo {
  float: left !important;
  width: 100% !important;
  position: absolute !important;
  bottom: 0px !important;
  left: 0px !important;
  min-height: 150px !important;
}
.targetListWrap {
  height: calc(100% - 150px) !important;
}
@media screen and (max-width: 300px) {
  .pagePaddingWrap {
    padding: 0 1rem !important;
  }
}
</style>
