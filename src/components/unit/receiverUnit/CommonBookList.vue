<i18n>
{
  "ko": {
    "EDIT_BOOK_MSG_NOBOOK": "주소록이 없어요.",
    "EDIT_BOOK_MSG_CREBOOK": "버튼을 눌러 주소록을 생성해보세요.",
    "EDIT_BOOK_MSG_DELETE": "주소록이 삭제되었습니다.",
    "EDIT_BOOK_MSG_FAILED": "주소록 삭제에 실패했습니다.",
    "EDIT_BOOK_TITLE_EDIT": "주소록 수정"
  },
  "en": {
    "EDIT_BOOK_MSG_NOBOOK": "There is no team.",
    "EDIT_BOOK_MSG_CREBOOK": "Click the button to create an team.",
    "EDIT_BOOK_MSG_DELETE": "The team has been deleted.",
    "EDIT_BOOK_MSG_FAILED": "Failed to delete team.",
    "EDIT_BOOK_TITLE_EDIT": "Edit team"
  }
}
</i18n>
<template>
  <div v-if="mAddressBookList.length > 0" class="fl w100P scrollOn">
    <draggable
      ref="editableArea"
      class="ghostClass fl w100P"
      v-model="mAddressBookList"
      @end="changePosTeamMenu"
      ghost-class="ghost"
      style="--webkit-tap-highlight-color: rgba(0, 0, 0, 0)"
      :disabled="mDragEnabled"
      delay="200"
    >
      <transition-group>
        <template v-for="(data, index) in mAddressBookList" :key="index">
          <gReceiveCard
            :style="
              mAddressBookList.length - 1 === index && index !== 0
                ? 'border-bottom: 0; padding-bottom: 100px;'
                : ''
            "
            :propData="data"
            :option="selectPopYn === true ? 'SELE' : 'EDIT'"
            :compoIdx="index"
            @receiveCardEmit="receiveCardEmit"
          />
        </template>
      </transition-group>
    </draggable>
  </div>

  <gListEmpty
    v-else
    :title="$t('EDIT_BOOK_MSG_NOBOOK')"
    :subTitle="$t('EDIT_BOOK_MSG_CREBOOK')"
    :option="selectPopYn === true ? 'SELE' : 'EDIT'"
  />
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  props: {
    propBookList: {},
    propData: {},
    parentSelectList: {},
    selectPopYn: Boolean
  },
  data() {
    return {
      mAddressBookList: [],
      mPropData: {},
      mDragEnabled: false,
      mSelectedBookList: []
    }
  },
  async mounted() {
    this.mAddressBookList = JSON.parse(JSON.stringify(this.propBookList))

    this.mPropData = this.propData
    if (this.selectPopYn) {
      this.mDragEnabled = true
      if (this.parentSelectList && this.parentSelectList) {
        var this_ = this
        this.$nextTick(() => {
          this_.mSelectedBookList = []
          this_.mSelectedBookList = JSON.parse(
            JSON.stringify(this_.parentSelectList)
          )
          this_.settingCheck()
        })
      }
    }
  },
  watch: {
    parentSelectList() {
      this.mSelectedBookList = []
      this.mSelectedBookList = JSON.parse(JSON.stringify(this.parentSelectList))
      this.settingCheck()
    },
    propBookList() {
      this.setAddressList()
      this.settingCheck()
    },
    mAddressBookList() {
      this.settingCheck()
    }
  },
  components: {
    draggable: VueDraggableNext
  },
  methods: {
    setAddressList() {
      this.mAddressBookList = this.propBookList
      for (let i = 0; i < this.mAddressBookList.length; i++) {
        this.mAddressBookList[i].jobkindId = 'BOOK'
      }
    },
    receiveCardEmit(param) {
      var type = param.targetType
      var data = param.data
      var idx = param.index
      if (type === 'open') {
        this.clickList(data, idx)
      } else if (type === 'edit') {
        this.editAddressBook(data)
      } else if (type === 'deleteList') {
        this.deleteSelectedBook(data, idx)
      } else if (type === 'add') {
        this.addSelectedList(data, idx)
      } else if (type === 'delete') {
        this.deleteCabinetClick(data, idx)
      }
    },
    clickList(data, index) {
      this.$emit('openMCabUserList', data)
    },
    deleteCabinetClick(data, index) {
      var param = {}
      param.data = data
      param.index = index
      param.targetType = 'cabinet'
      this.$emit('delAddress', param)
    },
    async deleteCabinet(data, index) {
      var param = {}
      param.cabinetKey = data.cabinetKey
      param.currentTeamKey = data.teamKey || data.creTeamKey
      param.menuType = data.menuType
      try {
        var result = await this.$commonAxiosFunction({
          url: '/tp.deleteCabinet',
          param: param
        })
        if (result.data === 'true' || result.data === true) {
          this.$emit('refreshList')
          this.$showToastPop(this.$t('EDIT_BOOK_MSG_DELETE'))
        }
      } catch (e) {
        this.$showToastPop(this.$t('EDIT_BOOK_MSG_FAILED'))
      }
    },
    settingCheck() {
      if (this.mSelectedBookList) {
        for (var i = 0; i < this.mAddressBookList.length; i++) {
          this.mAddressBookList[i].selectedYn = false
          for (var s = 0; s < this.mSelectedBookList.length; s++) {
            if (
              this.mSelectedBookList[s].accessKey ===
              (this.mAddressBookList[i].cabinetKey ||
                this.mAddressBookList[i].memberTypeKey)
            ) {
              this.mAddressBookList[i].selectedYn = true
              break
            }
          }
        }
      }
    },
    addSelectedList(data, index) {
      if (!this.mSelectedBookList) {
        this.mSelectedBookList = []
      }
      var aKey = null
      if (data.memberYn) {
        aKey = data.memberTypeKey
      } else {
        aKey = data.cabinetKey
      }
      data.shareSeq = aKey
      if (!data.accessKey) data.accessKey = aKey
      var indexOf = this.mSelectedBookList.findIndex(
        (i) => i.accessKey === aKey
      )
      if (indexOf === -1) {
        this.mSelectedBookList.push(data)
        this.mAddressBookList[index].selectedYn = true
        this.$emit('changeSelectBookList', this.mSelectedBookList)
      } else {
        this.deleteSelectedBook(data)
      }
    },
    deleteSelectedBook(data, idx) {
      var findIdx = this.mSelectedBookList.findIndex(
        (item) => item.accessKey === data.accessKey
      )
      if (findIdx !== -1) {
        this.mSelectedBookList.splice(findIdx, 1)
      }
      this.$emit('changeSelectBookList', this.mSelectedBookList)
    },
    editAddressBook(data) {
      var param = {}
      param.targetType = 'creAddressBook'
      param.popHeaderText = this.$t('EDIT_BOOK_TITLE_EDIT')
      param.newAddressYn = false
      param.cabinet = data
      this.$emit('openPop', param)
    },
    async changePosTeamMenu(event) {
      var paramSet = {}
      var tempList = []
      for (var index = 0; index < this.mAddressBookList.length; index++) {
        var temp = {}
        temp = this.mAddressBookList[index]
        temp.menuType = 'G'
        delete temp.mUserList
        tempList.push(temp)
      }
      paramSet.teamMenuList = [...tempList]
      await this.$commonAxiosFunction({
        url: '/tp.changePosTeamMenu',
        param: paramSet
      })

      this.$emit('getBookList')
    }
  }
}
</script>

<style scoped>
.receiverTeamText {
  height: 40px;
  cursor: pointer;
  line-height: 40px;
}
.receiverTeamSubscImg {
  width: 12px;
}
.foo {
  transition: background-color 0.5s ease-in;
}
.commonBookCard {
  width: 100%;
  cursor: pointer;
  height: 60px;
  border-bottom: 1px solid #ddd;
  padding: 0.7rem 0;
  position: relative;
  overflow: auto;
}

input {
  background: none;
}
</style>
