<template>
    <div style="width: 250px; min-height: 150px; background-color: #FFF; box-shadow: 0 0 4px 4px #00000015; padding: 10px 10px; border-radius: 0.4rem; display: flex; padding-top: 10px; flex-direction: column;  justify-content: flex-start;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid #ccc; align-items: flex-start;">
            <p class="commonColor font18 fontBold textLeft">필터</p>
            <img src="@/assets/images/common/grayXIcon.svg" @click="backClick" class="mtop-02 cursorP" alt="">
        </div>
        <div v-for="(filter, index) in test" :key="index" class="filterListRow">
            <p class="filterTitle">{{ filter.title }}</p>
            <div @click="openSelectPop(index)" class="filterValue cursorP filterValueWidth">
                {{filter.value ? $changeText(filter.value.accessName) : '전체'}}
            </div>

            <!-- <select class="filterValue" v-if="filter.type === 'S'" v-model="filter.value"  name="commonSelect" id="commonSelect">
                <option :value="opt.value" v-for="(opt, idx) in filter.selectList" :key="idx">{{ opt.name }}</option>
            </select> -->
        </div>
        <!-- <div style="width: 100%; height: 50px; padding: 0 20px; display: flex; justify-content: center; align-items: flex-end;">
            <gBtnSmall  btnTitle="적용" @click="applyFilters" class="mright-05"/>
            <gBtnSmall  btnTitle="닫기" btnThema="light" @click="backClick" class=""/>
        </div> -->
        <div v-if="mSelectBoxShowYn" class="filterValuePopWidth filterValueSelectBox" :style="`top: ${30 + 42 * (mSelectValueIndex + 1)}px`">
            <div @click="selectOption('A')" class="textLeft cursorP font14 selectOption" >전체</div>
            <div @click="selectOption(opt)"  v-for="(opt, idx) in test[mSelectValueIndex].selectList" class="textLeft cursorP selectOption" :key="idx">
                <p class="font14" :style="opt.accessColor? `color: ${opt.accessColor};` : ''">{{ this.$changeText(opt.accessName) }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    pFilterList: {},
    pCloseFilterPop: {},
    pRequestSearch: {} // 부모에게 검색 요청
  },
  created () {
    this.test = this.pFilterList
    var history = this.$store.getters['D_HISTORY/hStack']
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  data () {
    return {
      popId: 'commonFilterPop',
      mFilterList: [],
      test: [],
      mSelectBoxShowYn: false,
      mSelectValueIndex: 0
    }
  },
  methods: {
    applyFilters () {
      const searchList = []
      /* let searchObj = {
        searchType: null, // SK: 태그, RV: 담당자, PR: 우선순위, ST: 진행상태
        accessKey: null,
        accessName: null,
        accessColor: null,
        accessData: null
      } */
      if (this.mFilterList) {
        this.mFilterList.forEach(filter => {
          if (filter.value) {
            searchList.push(filter.value)
          }
        })
      }
      if (this.pRequestSearch) {
        this.pRequestSearch(searchList)
      }
    },
    selectOption (data) {
      if (data === 'A') {
        this.mFilterList[this.mSelectValueIndex].value = null
      } else {
        this.mFilterList[this.mSelectValueIndex].value = data
      }
      this.mSelectBoxShowYn = false
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        if (this.pCloseFilterPop) {
          this.pCloseFilterPop()
        }
      } else {

      }
    },
    openSelectPop (index) {
      if (this.mSelectBoxShowYn) {
        this.mSelectValueIndex = null
      } else {
        this.mSelectValueIndex = index
      }
      this.mSelectBoxShowYn = !this.mSelectBoxShowYn
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
    pFilterList: {
      immediate: true,
      handler (val) {
        this.mFilterList = val
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
.filterListRow {
    display: flex; align-items: center;
    height: 42px;
    padding: 7px 5px;
    border-bottom: 1px solid #ccc;
}
.filterListRow .filterTitle {
    font-size: 14px;
    text-align: left;
    font-weight: bold;
    width: 60px;
}
.filterListRow .filterValue {
    height: 100%;
    font-size: 14px;
    line-height: 28px;
    background-color: #e7edff;
}
.selectOption:hover {
    background-color: #fffbe2;
}
.filterValueWidth {
    width: calc(100% - 60px);
}
.filterValuePopWidth {
    width: calc(100% - 90px);
}
.filterValueSelectBox {
    position: absolute;
    right: 15px;
    background: #fff;
    /* border-radius: 0.4rem; */
    overflow: hidden auto;
    min-height: 80px;
    max-height: 130px;
    border: 1px solid #00000020;
    /* box-shadow: 0 0 2px 2px #00000010; */
}
.selectOption {
    cursor: pointer;
    padding: 5px 10px;
}
</style>
