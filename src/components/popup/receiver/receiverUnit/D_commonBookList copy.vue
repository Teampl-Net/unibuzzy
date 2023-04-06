<template>
  <div v-if="mAddressBookList.length > 0" class="fl w-100P" style="overflow: hidden scroll;">
    <draggable  ref="editableArea" class="ghostClass fl w-100P" v-model="mAddressBookList" @end="changePosTeamMenu" ghost-class="ghost" style=" --webkit-tap-highlight-color: rgba(0,0,0,0);" :disabled='enabled' delay="200"    >
      <transition-group>
        <template  v-for="(data, index) in mAddressBookList" :key='index'>
          <gReceiveCard :propData="data" :option="selectPopYn === true ? 'SELE' : 'EDIT'"  :compoIdx='index' @receiveCardEmit="receiveCardEmit"/>
        </template>
      </transition-group>
    </draggable>
  </div>

  <gListEmpty v-else title="주소록이 없어요." subTitle="버튼을 눌러 주소록을 생성해보세요." :option="selectPopYn === true ? 'SELE' : 'EDIT'" />
</template>

<script>
import gReceiveCard from './D_commonReceiveCard .vue'
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  props: {
    listData: {},
    propData: {},
    chanAlimListTeamKey: {},
    parentSelectList: {},
    selectPopYn: Boolean
  },
  data () {
    return {
      mAddressBookList: [],
      mPropData: {},
      cabinetList: [],
      dragging: false,
      enabled: false,
      editYn: false,
      pageTopBtnTitle: '편집',
      selectedBookList: [],
      selectedMemberList: [],
      editIndex: null,
      cabinetInputText: '',
      creAddressPopYn: false
    }
  },
  async created () {
    this.mAddressBookList = this.listData

    this.mPropData = this.propData
    // 임시
    // this.enabled = true
    if (this.selectPopYn) {
      this.enabled = true
      console.log('this.parentSelectList')
      console.log(this.parentSelectList)
      if (this.parentSelectList && this.parentSelectList) {
        var this_ = this
        this.$nextTick(() => {
          this_.selectedBookList = []
          this_.selectedBookList = JSON.parse(JSON.stringify(this_.parentSelectList))
          console.log('this.selectedBookList')
          console.log(this_.selectedBookList)
          this_.changeSelectedList()
          this_.settingCheck()
        })
      }
    }
    await this.getTeamCabList()

    console.log('===== Created CommmonBookList ====')
    console.log(this.mAddressBookList)
  },
  watch: {
    parentSelectList () {
      console.log('!!! reset !!!')
      this.selectedBookList = []
      this.selectedBookList = JSON.parse(JSON.stringify(this.parentSelectList))
      console.log('!!! end !!!')
      console.log(this.selectedBookList)
      this.settingCheck()
    },
    listData () {
      this.setAddressList()
      this.settingCheck()
    },
    mAddressBookList () {
      this.settingCheck()
    }
  },
  components: {
    gReceiveCard,
    draggable: VueDraggableNext
  },
  computed: {
    setTotalHeight () {
      return {
        '--scrollHeight': this.cabinetList.length * 70 + 20 + 'px'
      }
    }
  },

  methods: {
    setAddressList () {
      this.mAddressBookList = this.listData
      for (let i = 0; i < this.mAddressBookList.length; i++) {
        this.mAddressBookList[i].jobkindId = 'BOOK'
      }
    },
    receiveCardEmit (param) {
      console.log(param)
      var type = param.targetType
      var data = param.data
      var idx = param.index
      if (type === 'open') {
        this.clickList(data, idx)
      } else if (type === 'edit') {
        this.editAddressBook(data)
      } else if (type === 'delete') {
        this.deleteCabinetClick(data, idx)
      } else if (type === 'add') {
        this.addSelectedList(data, idx)
      }
    },
    clickList (data, index) {
      if (this.editIndex !== index) {
        this.$emit('openMCabUserList', data)
      }
    },
    deleteCabinetClick (data, index) {
      var param = {}
      param.data = data
      param.index = index
      param.targetType = 'cabinet'
      this.$emit('delAddress', param)
    },
    async deleteCabinet (data, index) {
      var param = {}
      param.cabinetKey = data.cabinetKey
      param.currentTeamKey = data.teamKey || data.creTeamKey
      param.menuType = data.menuType
      try {
        var result = await this.$commonAxiosFunction({
          url: 'https://mo.d-alim.com:9443/service/tp.deleteCabinet',
          param: param
        })
        if (result.data === 'true' || result.data === true) {
          this.$emit('refreshList')
          this.$showToastPop('주소록이 삭제되었습니다.')
        }
      } catch (e) {
        this.$showToastPop('주소록 삭제에 실패했습니다.')
      }
    },
    settingCheck () {
      if (this.selectedBookList) {
        for (var i = 0; i < this.mAddressBookList.length; i++) {
          this.mAddressBookList[i].selectedYn = false
          for (var s = 0; s < this.selectedBookList.length; s++) {
            if (this.selectedBookList[s].accessKey === this.mAddressBookList[i].cabinetKey) {
              this.mAddressBookList[i].selectedYn = true
              break
            }
          }
        }
      }
    },
    changeSelectedList () {
      if (this.selectedBookList) {
        if (this.selectedBookList) {
          for (var i = 0; i < this.cabinetList.length; i++) {
            this.cabinetList[i].selectedYn = false
            for (var s = 0; s < this.selectedBookList.length; s++) {
              if (this.cabinetList[i].cabinetKey === this.selectedBookList[s].cabinetKey) {
                this.cabinetList[i].selectedYn = true
                break
              }
            }
          }
        }
      }
    },
    async getTeamCabList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.mPropData.currentTeamKey || this.mPropData.teamKey || this.mPropData.targetKey)
      paramMap.set('sysCabinetCode', 'USER')
      paramMap.set('adminYn', true)
      var result = await this.$commonAxiosFunction({
        url: 'https://mo.d-alim.com:9443/service/tp.getTeamMenuList',
        param: Object.fromEntries(paramMap)
      })
      this.cabinetList = result.data
      for (var i = 0; i < this.cabinetList.length; i++) {
        var changeT = this.cabinetList[i].cabinetNameMtext
        this.cabinetList[i].cabinetNameMtext = this.$changeText(changeT)
      }
    },
    addSelectedList (data, index) {
      if (!this.selectedBookList) {
        this.selectedBookList = []
      }
      data.shareSeq = data.cabinetKey
      if (!data.accessKey) data.accessKey = data.cabinetKey
      var indexOf = this.selectedBookList.findIndex(i => i.accessKey === data.cabinetKey)
      if (indexOf === -1) {
        this.selectedBookList.push(data)
        this.mAddressBookList[index].selectedYn = true
        this.$emit('changeSelectBookList', this.selectedBookList)
      } else {
        this.$showToastPop('중복 선택입니다.')
      }
    },
    deleteSelectedBook (type, key) {
      var findIdx = this.selectedBookList.findIndex(item => item.accessKey === key)
      if (findIdx !== -1) {
        this.selectedBookList.splice(findIdx, 1)
      }
      console.log('delSelectedList')
      console.log(this.selectedBookList)
    },
    editAddressBook (data) {
      var param = {}
      param.targetType = 'creAddressBook'
      param.popHeaderText = '주소록 수정'
      param.newAddressYn = false
      param.cabinet = data
      this.$emit('openPop', param)
    },
    anima () {
      document.getElementsByClassName('foo')[0].style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
      setTimeout(() => {
        document.getElementsByClassName('foo')[0].style.backgroundColor = ''
      }, 800)
    },
    async changePosTeamMenu (event) {
      console.log('----------')
      console.log(this.mAddressBookList)
      var paramSet = {}
      var tempList = []
      for (var index = 0; index < this.mAddressBookList.length; index++) {
        var temp = {}
        temp = this.mAddressBookList[index]
        temp.menuType = 'G'
        delete temp.mUserList
        tempList.push(temp)
      }
      console.log(' ----- teamMenuList -----')
      console.log([...tempList])
      paramSet.teamMenuList = [...tempList]
      var result = await this.$commonAxiosFunction(
        {
          url: 'https://mo.d-alim.com:9443/service/tp.changePosTeamMenu',
          param: paramSet
        }
      )
      console.log(' ----- changePosTeamMenu result -----')
      console.log(result)

      this.$emit('getBookList')
    }
  }

}
</script>

<style >
/* .receiverTeamListCard{display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom:1px solid #eee;  padding: 0.7rem 0} */
.receiverTeamText{ height:40px; cursor: pointer;line-height:40px;}
.receiverTeamSubscImg{width: 12px;}
.foo {
    transition : background-color 0.5s ease-in;
}
.commonBookCard {
    /* width: 100%; padding: 10px; overflow: hidden; height:60px; position: relative; margin-bottom:10px; */
    width: 100%;
    cursor: pointer;
    height:60px;
    border-bottom:1px solid #ddd; padding: 0.7rem 0;
    position: relative;

    overflow: auto;
    /* transition : background-color 0.5s ease-in !important; */
}

input {
    background: none;
}
</style>
