<i18n>
  {
  "ko": {
    "SELECT_GROUP_DROP_NAME": "그룹 선택",
    "SELECT_MEMBER_TYPE": "멤버유형",
    "SELECT_MANA_MEMBER": "구성원 관리",
    "SELECT_TARGET_SELECTION": "대상 선택"
  },
  "en": {
    "SELECT_GROUP_DROP_NAME": "Group Selection",
    "SELECT_MEMBER_TYPE": "Member Type",
    "SELECT_MANA_MEMBER": "Member Management",
    "SELECT_TARGET_SELECTION": "Target Selection"
  }
}
</i18n>
<template>
  <div class="selectBookListWrap">
    <gPopHeader
      @closeXPop="backClick"
      class="headerShadow"
      :headerTitle="receiverTitle"
      :managerBtn="true"
    />
    <div
      class="pagePaddingWrap selectBookListContents"
      :style="'padding-top:' + ($STATUS_HEIGHT + 60) + 'px'"
    >
      <gActiveBar
        ref="activeBar"
        :tabList="activeTabList"
        class="fl"
        @changeTab="changeTab"
        style="width: 100%; padding-top: 0; margin-top: 0"
      />
      <div class="bookListStyle">
        <gBookList
          :propBookList="bookList"
          :teamInfo="propData"
          :parentSelectList="pSelectedBookList"
          :selectPopYn="true"
          @changeSelectBookList="changeSelectBookList"
          :propData="propData"
          :selectBookDetail="selectBookDetail"
          ref="teamListRef"
          @openMCabUserList="openMCabUserList"
          v-if="!detailOpenYn"
        />
        <transition name="showGroup">
          <gBookMemberList
            :propMemberList="memberList"
            :parentSelectList="pSelectedMemberList"
            :selectPopYn="true"
            @changeSelectMemberList="changeSelectMemberList"
            :teamInfo="propData"
            :propData="selectBookDetail"
            class="memberListStyle"
            transition="showGroup"
            ref="memberListRef"
            v-if="detailOpenYn"
          />
        </transition>
      </div>
      <selectedListCompo
        class="selectedListStyle"
        :selectShareTargetYn="true"
        @addMemberList="addMe"
        :currentTeamKey="propData.teamKey"
        @changeSelectedList="changeSelectedList"
        @changeSelectBookList="changeSelectBookList"
        @changeSelectMemberList="changeSelectMemberList"
        ref="selectedListCompo"
        style=""
        transition="showGroup"
        :listData="selectedList"
        @btnClick="sendReceivers"
      />
    </div>
  </div>
</template>

<script>
import selectedListCompo from '../../../../popup/receiver/SelectedReceiverList.vue'
export default {
  props: {
    selectPopYn: {},
    selectedListYn: {},
    propData: {},
    pSelectedList: {},
    pClosePop: Function
  },
  data() {
    return {
      memberList: [],
      bookList: [],
      selectedYn: false,
      detailOpenYn: false,
      receiverTitle: this.$t('SELECT_GROUP_DROP_NAME'),
      selectReceivers: [],
      selectedTeamList: [],
      selectedMemberList: [],
      selectedList: {},
      selectBookDetail: null,
      pSelectedBookList: {},
      pSelectedMemberList: {},
      activeTabList: [{ display: this.$t('COMMON_NAME_ADDRBOOK'), name: 'B' }],
      activeTab: 'B'
    }
  },
  created() {
    console.log(this.selectedListYn)
    console.log(this.propData)
    if (this.selectedListYn) {
      this.selectedTeamList = this.selectedList.selectedTeamList
      this.selectedMemberList = this.selectedList.selectedMemberList
    }
    if (this.propData.initData) {
      this.bookList = this.propData.initData
    }
    this.editBookSelectedList()
    this.$addHistoryStack('modiPopReceiverSelecPop')
  },
  beforeUnmount() {
    this.$checkDeleteHistory('modiPopReceiverSelecPop')
  },
  mounted() {
    if (this.pSelectedList) {
      this.selectedList = []
      this.selectedList = JSON.parse(JSON.stringify(this.pSelectedList))

      this.pSelectedBookList = this.selectedList.bookList
        ? this.selectedList.bookList
        : []
      this.pSelectedMemberList = this.selectedList.memberList
        ? this.selectedList.memberList
        : []
      var param = {}
      if (this.selectedList.bookList) {
        var test1 = this.selectedList.bookList
        for (let i = 0; i < test1.length; i++) {
          test1[i].selectedYn = true
        }
        param.bookList = test1
      }

      if (this.selectedList.memberListst) {
        var test2 = this.selectedList.memberListst
        for (let i = 0; i < test2.length; i++) {
          test2[i].selectedYn = true
        }
        param.memberList = test2
      }
      localStorage.setItem('ori', JSON.stringify(param))
      localStorage.setItem('ori', JSON.stringify(this.selectedList))
      var this_ = this
      if (
        this.selectedList.bookList.length > 0 ||
        this.selectedList.memberList.length > 0
      ) {
        this.$nextTick(() => {
          this_.$refs.selectedListCompo.upDatePage()
        })
      }
    }
  },
  components: { selectedListCompo },
  methods: {
    changeTab(type) {
      this.activeTab = type
      this.detailOpenYn = false
      if (this.activeTab === 'B') {
        this.getBookList()
      } else if (this.activeTab === 'M') {
        this.getMemberTypeList()
      }
    },
    async getMemberTypeList() {
      var param = {}
      param.teamKey = this.propData.teamKey
      var result = await this.$commonAxiosFunction({
        url: '/tp.getMemberTypeList',
        param: param
      })
      if (result.status === 200) {
        this.bookList = result.data.memberTypeList
        for (var i = 0; i < this.bookList.length; i++) {
          this.bookList[i].memberYn = true
        }
        console.log(this.bookList)
      }
    },
    async getBookList() {
      var paramMap = new Map()
      paramMap.set(
        'teamKey',
        this.propData.currentTeamKey ||
          this.propData.teamKey ||
          this.propData.targetKey
      )
      paramMap.set('sysCabinetCode', 'USER')
      paramMap.set('adminYn', true)
      var result = await this.$commonAxiosFunction({
        url: '/tp.getTeamMenuList',
        param: Object.fromEntries(paramMap)
      })
      this.bookList = result.data
      for (var i = 0; i < this.bookList.length; i++) {
        var changeT = this.bookList[i].cabinetNameMtext
        this.bookList[i].cabinetNameMtext = this.$changeText(changeT)
      }
      this.editBookSelectedList()
    },
    async getBookMemberList() {
      var paramMap = new Map()
      paramMap.set('cabinetKey', this.selectBookDetail.cabinetKey)
      paramMap.set('jobkindId', 'USER')
      var result = await this.$commonAxiosFunction({
        url: '/tp.getMCabContentsList',
        param: Object.fromEntries(paramMap)
      })
      this.memberList = result.data
      if (this.memberList) {
        // dispName이 없을시 userName으로 대체
        for (var i = 0; i < this.memberList.length; i++) {
          if (
            this.memberList[i].userDispMtext !== undefined &&
            this.memberList[i].userDispMtext !== null &&
            this.memberList[i].userDispMtext !== ''
          ) {
          } else {
            this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
          }
        }
      }
      this.editMemberSelectedList()
    },
    sendReceivers(data) {
      this.$emit('sendReceivers', data)
    },
    addMe(data) {
      if (this.selectedList.memberList) {
        this.selectedList.memberList.unshift(data)
      } else {
        this.selectedList.memberList = []
        this.selectedList.memberList.unshift(data)
      }
      this.changeSelectMemberList(this.selectedList.memberList)
    },
    changeSelectMemberList(data) {
      if (data.accessKey !== undefined) {
        for (let i = 0; i < data.length; i++) {
          this.selectedList.memberList.push(data.params.memberList[i])
        }
      } else {
        this.selectedList.memberList = []
        for (let i = 0; i < data.length; i++) {
          this.selectedList.memberList.push(data[i])
        }
      }
      this.pSelectedMemberList = []
      this.pSelectedMemberList = this.selectedList.memberList
      this.$refs.selectedListCompo.newUpdateMember(this.selectedList.memberList)
      this.$refs.memberListRef.deleteSelectedMember(
        this.selectedList.memberList,
        true
      )
    },
    changeSelectBookList(data) {
      this.selectedList.bookList = []
      for (let i = 0; i < data.length; i++) {
        this.selectedList.bookList.push(data[i])
      }
      this.pSelectedBookList = []
      this.pSelectedBookList = this.selectedList.bookList
      this.$refs.selectedListCompo.newUpdateBook(this.selectedList.bookList)
    },
    changeSelectedList(selectedListData) {
      if (selectedListData.type === 'C') {
        this.$refs.teamListRef.deleteSelectedBook(
          selectedListData.type,
          selectedListData.delKey
        )
        delete selectedListData.type
        delete selectedListData.delKey
      } else {
        if (this.$refs.memberListRef) {
          this.$refs.memberListRef.deleteSelectedMember(
            selectedListData.type,
            selectedListData.delKey
          )
        }
        delete selectedListData.type
        delete selectedListData.delKey
      }

      this.pSelectedBookList = selectedListData.bookList
      this.pSelectedMemberList = selectedListData.memberList
      this.selectedList = selectedListData

      this.editMemberSelectedList()
      this.editBookSelectedList()
    },
    editMemberSelectedList() {
      if (this.selectedList.memberList) {
        var changeList = this.selectedList.memberList
        for (var m = 0; m < this.memberList.length; m++) {
          this.memberList[m].selectedYn = false
          for (var c = 0; c < changeList.length; c++) {
            if (changeList[c].userKey === this.memberList[m].userKey) {
              this.memberList[m].selectedYn = true
            }
          }
        }
      }
    },
    editBookSelectedList() {
      if (this.selectedList.bookList) {
        var changeList = this.selectedList.bookList
        for (var m = 0; m < this.bookList.length; m++) {
          this.bookList[m].selectedYn = false
          for (var c = 0; c < changeList.length; c++) {
            if (
              (this.bookList[m].memberYn &&
                changeList[c].cabinetKey === this.bookList[m].cabinetKey) ||
              (this.bookList[m].memberYn &&
                changeList[c].memberTypeKey === this.bookList[m].memberTypeKey)
            ) {
              this.bookList[m].selectedYn = true
            }
          }
        }
      }
    },
    addMemberList(obj) {
      this.selectReceivers.unshift(obj)
    },
    backClick() {
      if (this.detailOpenYn === true) {
        var removePage = this.historyStack[this.historyStack.length - 1]
        if (removePage === 'commonBookMemberList') {
          this.$removeHistoryStack()
        }
        this.memberEditYn = false
        this.receiverTitle = this.$t('SELECT_GROUP_DROP_NAME')
        this.detailOpenYn = false
      } else {
        this.$checkDeleteHistory('modiPopReceiverSelecPop')
        this.$emit('closeXPop')
      }
    },
    async openMemberUserList() {
      var paramMap = new Map()
      paramMap.set('memberTypeKey', this.selectBookDetail.memberTypeKey)
      var result = await this.$commonAxiosFunction({
        url: '/tp.getFollowerMemberList',
        param: Object.fromEntries(paramMap)
      })
      var userList = result.data.userList
      for (var i = 0; i < userList.length; i++) {
        userList[i].jobkindId = 'USER'
      }
      this.memberList = userList
      console.log(userList)
    },
    async openMCabUserList(data) {
      if (!this.teamEditYn) {
        this.selectBookDetail = data
        if (data.memberYn) {
          await this.openMemberUserList(data)
        } else {
          await this.getBookMemberList()
        }
        this.detailOpenYn = true

        this.selectBookDetail = data
        this.$addHistoryStack('commonBookMemberList')

        this.receiverTitle = this.$t('SELECT_MANA_MEMBER')
        if (this.selectPopYn) {
          this.receiverTitle = this.$t('SELECT_TARGET_SELECTION')
        }
      }
    }
  },
  computed: {
    historyStack() {
      return this.$store.getters['UB_HISTORY/hStack']
    },
    pageUpdate() {
      return this.$store.getters['UB_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate() {
      this.backClick()
    }
  }
}
</script>

<style>
.selectBookListWrap {
  height: 100vh;
  background-color: white;
  width: 100%;
  z-index: 99999999;
  position: absolute;
  top: 0;
  left: 0;
}
.bookListStyle {
  width: 100%;
  position: relative;
  float: left;
  height: calc(100% - 150px);
  overflow: hidden auto;
  padding-bottom: 60px;
}
.memberListStyle {
  position: absolute;
  top: 0;
  overflow: hidden scroll;
  background: #fff;
  padding-bottom: 60px;
}
.selectBookListContents {
  position: absolute;
  overflow: auto;
}
.selectedListStyle {
  float: left;
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  min-height: 150px;
  height: 150px;
  max-height: 150px;
}
</style>
