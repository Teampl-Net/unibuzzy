<template>
<div class="receiveCardWrap">
    <div v-for="(data, index) in bookList" :key="index">
        <gReceiveCard :propData="data" option="SELE" :compoIdx='index' @receiveCardEmit="receiveCardEmit"/>
    </div>
    <div v-for="(data, index) in memberList" :key="index">
        <gReceiveCard :propData="data" option="SELE"  :compoIdx='index' @receiveCardEmit="receiveCardEmit"/>
    </div>
</div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
export default {
    props: {
        propData: {},
        selectBookNList: {},
        itemType: {},
        selectList: {},
        simplePop: false
    },
    created () {
        if (!this.simplePop) {
            var history = this.$store.getters['UB_HISTORY/hStack']
            this.popId = 'selectBookNMemPop' + history.length
            history.push(this.popId)
            this.$store.commit('UB_HISTORY/updateStack', history)
        }
        if (this.selectBookNList.memberList !== undefined && this.selectBookNList.memberList !== null && this.selectBookNList.memberList !== []) {
            if (this.selectBookNList.memberList.length > 0) {
                this.memberList = [...this.selectBookNList.memberList]
                for (var i = 0; i < this.memberList.length; i++) {
									this.memberList[i].jobkindId = 'USER'
									this.memberList[i].selectedYn = false
                }
            }
        }
        if (this.selectBookNList.bookList !== undefined && this.selectBookNList.bookList !== null && this.selectBookNList.bookList !== []) {
            if (this.selectBookNList.bookList.length > 0) {
                this.bookList = [...this.selectBookNList.bookList]
                for (var i = 0; i < this.bookList.length; i++) {
									this.bookList[i].jobkindId = 'BOOK'
									this.bookList[i].selectedYn = false
                }
            }
        }
        if (this.selectList) {
            if (this.selectList.bookList){
                this.selectedBookList = this.selectList.bookList
            }
            if (this.selectList.memberList){
                this.selectedMemberList = this.selectList.memberList
            }
        }
        this.$nextTick(() => {
            this.setParentSelectList()
        })
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
      selectBookNList: {
        immediate: true,
        handler (val) {
          if (this.selectBookNList.memberList) {
              if (this.selectBookNList.memberList.length > 0) {
                  this.memberList = [...this.selectBookNList.memberList]
                  for (var i = 0; i < this.memberList.length; i++) {
                    this.memberList[i].jobkindId = 'USER'
                    this.memberList[i].selectedYn = false
                  }
              }
          }
          if (this.selectBookNList.bookList) {
              if (this.selectBookNList.bookList.length > 0) {
                  this.bookList = [...this.selectBookNList.bookList]
                  for (var i = 0; i < this.bookList.length; i++) {
                    this.bookList[i].jobkindId = 'BOOK'
                    this.bookList[i].selectedYn = false
                  }
              }
          }
        },
        deep: true
      },
      historyStack (value, old) {
          var hStack = this.$store.getters['UB_HISTORY/hStack']
          if (this.popId === hStack[hStack.length - 1]) {
          var history = this.$store.getters['UB_HISTORY/hStack']
          var removePage = history[history.length - 1]
          history = history.filter((element, index) => index < history.length - 1)
          this.$store.commit('UB_HISTORY/setRemovePage', removePage)
          this.$store.commit('UB_HISTORY/updateStack', history)
          this.closeXPop()
          }
      }
    },
    data () {
        return {
            popId: null,
            bookList:[],
            memberList: [],
            itemList: [],
            setSelectedList: { bookList: [], memberList: [] },
            selectedBookList: {},
            selectedMemberList: {}
        }
    },
    methods: {
			receiveCardEmit (param) {
				var type = param.targetType
				var data = param.data
				var idx = param.index

				if (type === 'add') {
					this.addSelectedList(data, idx)
				} else if (type === 'open') {
            if (data.jobkindId === 'BOOK') this.$emit('detail', data)
        } else if (type === 'deleteList') {
            this.delSelectList(data.accessKey, 'U')
            this.$emit('delectClick', idx)
        }
      },
        setParentSelectList () {
            if (this.memberList) {
                for (var i = 0; i < this.memberList.length; i++) {
                    this.memberList[i].selectedYn = false

                    for (var s = 0; s < this.selectedMemberList.length; s++) {
                        if (!this.memberList[i].accessKey && this.memberList[i].shareSeq) {
                            this.memberList[i].accessKey = this.memberList[i].shareSeq
                        }
                        if (this.selectedMemberList[s].accessKey === this.memberList[i].accessKey) {
                        this.memberList[i].selectedYn = true
                        this.memberList[i].shareSeq = this.memberList[i].accessKey
                        this.setSelectedList.memberList.push(this.memberList[i])
                        break
                        }
                    }
                }
            }
            if(this.bookList) {
                for (var i = 0; i < this.bookList.length; i ++) {
                    this.bookList[i].selectedYn = false
                    for (var s = 0; s < this.selectedBookList.length; s ++) {
                        if (this.selectedBookList[s].accessKey === this.bookList[i].accessKey) {
                            this.bookList[i].selectedYn = true
                            this.bookList[i].shareSeq = this.bookList[i].accessKey
                            this.setSelectedList.bookList.push(this.bookList[i])
                            break
                        }
                    }
                }
            }
            this.$emit('addSelectList', this.setSelectedList)
        },
        addSelectedList(data, index, type) {
            data.shareType = this.itemType
            if (type === undefined){
                type = data.jobkindId === 'BOOK' ? 'C' : 'U'
            }
            if (type === 'U') {
                var indexOf = this.setSelectedList.memberList.findIndex(i => (i.accessKey === data.accessKey && i.selectedYn === true))
                if (indexOf === -1) {
                    data.selectedYn = true
                    this.setSelectedList.memberList.push(data)
                }else{
                    this.$showToastPop('Duplicate selected.')
                }
            }else if (type === 'C') {
                var indexOf = this.setSelectedList.bookList.findIndex(i => (i.cabinetKey === data.cabinetKey && i.selectedYn === true))
                if (indexOf === -1) {
                    data.selectedYn = true
                    this.setSelectedList.bookList.push(data)
                } else{
                    this.$showToastPop('Duplicate selected.')
                }

            }
            this.$emit('addSelectList', this.setSelectedList)
        },
        delSelectList (key, type) {
            if (type === 'U') {
                var indexOf = this.memberList.findIndex(i => i.accessKey === key && i.selectedYn === true);
                if (indexOf !== -1) {
                    this.memberList[indexOf].selectedYn = false
                }
            }else if (type === 'C') {
                var indexOf = this.bookList.findIndex(i => i.accessKey === key && i.selectedYn === true);
                if (indexOf !== -1) {
                    this.bookList[indexOf].selectedYn = false
                }
            }
        }
    }
}
</script>

<style scoped>
.receiveCardWrap {
  width: 100%;
  float: left;
  padding-bottom: 60px;
}
</style>
