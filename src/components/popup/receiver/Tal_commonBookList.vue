<template>
  <!-- <pageTopCompo :btnTitle="pageTopBtnTitle" :titleText="propObject.teamNameMtext || propObject.nameMtext" @btnClick="editClick" :selectPopYn="selectPopYn" /> -->
  <div v-if="addressBookList.length > 0" style=" height: calc(100% - 60px); overflow: hidden scroll;">
    <draggable  ref="editableArea" class="ghostClass" v-model="addressBookList" @end="changePosTeamMenu" ghost-class="ghost" style=" --webkit-tap-highlight-color: rgba(0,0,0,0);" :disabled='enabled' delay="200"    >
      <transition-group>
        <template  v-for="(data, index) in addressBookList" :key='index'>
          <div :class="{foo:index === 0}" :id="'book'+ index" class="commonBookCard fl" :index="index" :style="selectPopYn === true ? 'width:100%;':'' " >
            <div v-show="editIndex === index" class="fl" style="width: calc(100% - 100px); height: 100%;">
              <div style="width:40px; height:100%; line-height:40px" class="fl mright-05">
                <img src="../../../assets/images/channel/channer_addressBook.svg" class="img-w23" alt="">
              </div>
              <input :ref="'commonBookInput'+index" @blur="inputFocusOut(data, null)" :id="'commonBookInput'+index" v-model="cabinetInputText" style="border:none; width:calc(100% - 150px); min-width:70px; float: left; height: 100%; border-bottom: 0.5px solid #ccc; position: relative;"/>
              <div class="fl" style="height: 100%; display: flex; flex-direction: row; justify-content: space-around; align-items: center;" v-if="editIndex === index" >
                <!-- <p class="fl font14 cursorP" style=" margin: 0 5px;" @click="updateCabinet(data,index)">확인</p> -->
                <!-- <p class="fl font14 cursorP" style=" margin: 0 5px;" @click="changedText(data,null)" >취소</p> -->
              </div>
            </div>
            <div v-show="editIndex !== index" @click="data.selectedYn !== true ? clickList(data,index) : ''" style="height: 100%;" :style="!selectPopYn ? 'width: calc(100% - 100px);' : 'width: calc(100% - 50px);' " class="fl" >
              <img src="../../../assets/images/channel/channer_addressBook.svg"  class="fl img-w23" style="margin-left: 10px; margin-top: 10px;" >
              <p v-if="editIndex !== index" class="fl font16 commonBlack textOverdot receiverTeamText textLeft mleft-1" style="width: calc(100% - 33px - 1rem);" >{{this.$changeText(data.cabinetNameMtext)}}</p>
            </div>
            <div v-if="!selectPopYn" class="fl cursorP" style="width:100px; height: 100%;position:absolute; top:0; right: 0; display: flex;flex-direction: row; justify-content: space-around; align-items: center;">
              <!-- <img v-if="editIndex !== index" src="../../../assets/images/push/noticebox_edit.png" class="img-w20 fr" style="margin: 0 10px;" @click="changedText(data,index)" > -->
              <img v-if="editIndex !== index" src="../../../assets/images/push/noticebox_edit.png" class="img-w20 fr" style="margin: 0 10px;" @click="editAddressBook(data)" >
              <!-- <p v-else class="fl font14 cursorP" style=" margin: 0 5px;" @click="updateCabinet(data,index)">확인</p> -->

              <!-- <img src="../../../assets/images/formEditor/trashIcon_gray.svg" class="img-w20 fr" style="width: 20px; margin: 0 10px;" @click="deleteCabinet(data,index)" > -->
              <img src="../../../assets/images/formEditor/trashIcon_gray.svg" class="img-w20 fr" style="width: 20px; margin: 0 10px;" @click="deleteCabinetClick(data,index)" >

            </div>
            <div @click="addSelectedList(data, index)" v-if="selectPopYn" class="fr mright-1 cursorP" style="position: relative; height: 100%;">
              <img class="img-w30" src="../../../assets/images/common/plusoutline.svg" alt="" v-if="!data.selectedYn">
              <img class="img-w30" src="../../../assets/images/common/Tal_checkImage.svg" alt="" v-else>
            </div>
          </div>
        </template>
      </transition-group>
    </draggable>
  </div>
  <div v-else>
      <p class="textLeft font15 textCenter mtop-1">{{'주소록이 없습니다.'}}</p>
  </div>
  <!-- <creAddressPop v-if="creAddressPopYn" @closePop="creAddressPopYn = false" /> -->
</template>

<script>
// import creAddressPop from './Tal_creAddressBook.vue'
// import loadingCompo from '../../../components/Tal_loading.vue'
// import pageTopCompo from './Tal_commonBookTitle.vue'
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
      addressBookList: [],
      propObject: {},
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
    this.addressBookList = this.listData
    this.propObject = this.propData
    // 임시
    // this.enabled = true
    if (this.selectPopYn) {
      this.enabled = true
      console.log('this.parentSelectList')
      console.log(this.parentSelectList)
      if (this.parentSelectList && this.parentSelectList.bookList) {
        this.selectedBookList = this.parentSelectList.bookList
        console.log('this.selectedBookList')
        console.log(this.selectedBookList)
      }
    }
    await this.getTeamCabList()
    this.changeSelectedList()
    this.settingCheck()
    console.log('===== Created CommmonBookList ====')
    console.log(this.addressBookList)
  },
  updated () {
    /* this.changeSelectedList()
        this.addressBookList = this.listData */
  },
  watch: {
    // selectedBookList: {
    // this.parentSelectList.bookList: {

    //     immediate: true,
    //     handler (value, old){
    //         console.log('book : 2')
    //         // console.log('value: ')
    //         // console.log(value)
    //         // console.log('-----')
    //         this.settingCheck()
    //     },
    //     deep: true
    // },
    listData () {
      this.addressBookList = this.listData
      this.settingCheck()
    }
    // addressBookList: {
    //     immediate: true,
    //     handler (value, old){
    //         console.log('book : 4')
    //         this.settingCheck()
    //     },
    //     deep: true
    // },
  },
  components: {
    // loadingCompo,
    draggable: VueDraggableNext
    // creAddressPop
    // pageTopCompo
  },
  computed: {
    setTotalHeight () {
      return {
        '--scrollHeight': this.cabinetList.length * 70 + 20 + 'px'
      }
    }
  },

  methods: {
    settingCheck () {
      if (this.selectedBookList) {
        for (var i = 0; i < this.addressBookList.length; i++) {
          this.addressBookList[i].selectedYn = false
          for (var s = 0; s < this.selectedBookList.length; s++) {
            if (this.selectedBookList[s].accessKey === this.addressBookList[i].cabinetKey) {
              this.addressBookList[i].selectedYn = true
              // if (this.addressBookList[i].accessKey === undefined || this.addressBookList[i].accessKey === null || this.addressBookList[i].accessKey === '') {
              //     this.addressBookList[i].accessKey = this.selectedBookList[s].accessKey
              // }
              break
            }
          }
        }
      }
    },
    inputFocusOut (data, index) {
      if (data.cabinetNameMtext !== this.cabinetInputText) {
        this.updateCabinet(data)
      }
      // this.changedText(data,index)
      this.editIndex = null
    },
    async changedText (data, index) {
      // this.editYn = true
      this.cabinetInputText = await data.cabinetNameMtext
      this.editIndex = await index
      // setTimeout(()=>{
      return new Promise(() => {
        this.focusInput(index)
      })
      // },1000)
    },
    focusInput (index) {
      if (index !== null) {
        this.$nextTick(() => {
          this.$refs['commonBookInput' + index][0].focusInput()
        })
        // document.getElementById('commonBookInput' + index).focus()
        // this.$refs["commonBookInput" + index].focus()
      }
    },
    changeSelectedList () {
      if (this.parentSelectList) {
        if (this.parentSelectList.bookList) {
          for (var i = 0; i < this.cabinetList.length; i++) {
            this.cabinetList[i].selectedYn = false
            for (var s = 0; s < this.parentSelectList.bookList.length; s++) {
              if (this.parentSelectList.bookList[s].cabinetKey === this.cabinetList[i].cabinetKey) {
                this.cabinetList[i].selectedYn = true
                break
              }
            }
          }
        }
      }
    },
    editClick () {
      if (this.editYn) {
        this.editYn = false
        this.pageTopBtnTitle = '편집'
        this.$emit('editYn', this.editYn)
      } else {
        this.editYn = true
        this.pageTopBtnTitle = '닫기'
        this.$emit('editYn', this.editYn)
      }
    },
    async getTeamCabList () {
      var paramMap = new Map()
      // var te = this.propObject
      paramMap.set('teamKey', this.propObject.currentTeamKey || this.propObject.teamKey || this.propObject.targetKey)
      paramMap.set('sysCabinetCode', 'USER')
      paramMap.set('adminYn', true)
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getTeamMenuList',
        param: Object.fromEntries(paramMap)
      })
      this.cabinetList = result.data
      for (var i = 0; i < this.cabinetList.length; i++) {
        var changeT = this.cabinetList[i].cabinetNameMtext
        this.cabinetList[i].cabinetNameMtext = this.$changeText(changeT)
      }
    },
    clickList (data, index) {
      if (this.editIndex !== index) { // if(this.editIndex === null){
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
        // this.cabinetList.splice(index, 1)
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.deleteCabinet',
          param: param
        })
        if (result.data === 'true' || result.data === true) {
          this.addressBookList.splice(index, 1)
          if (this.addressBookList.length === 0) {
            this.cabinetList.length = 0
          }
          this.$showToastPop('주소록이 삭제되었습니다.')
        }
      } catch (e) {
        this.$showToastPop('주소록 삭제에 실패했습니다.')
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
        this.addressBookList[index].selectedYn = true
        this.$emit('changeSelectBookList', this.selectedBookList)
      } else {
        this.$showToastPop('중복 선택입니다.')
      }
    },
    editAddressBook (data) {
      var param = {}
      param.targetType = 'creAddressBook'
      param.popHeaderText = '주소록 수정'
      param.newAddressYn = false
      param.cabinet = data
      this.$emit('openPop', param)
    },
    async creAddressPop () {
      var cabinet = {}
      var param = {}
      param.targetType = 'creAddressBook'
      param.popHeaderText = '주소록 생성'
      param.newAddressYn = true
      cabinet.cabinetNameMtext = await this.$checkSameName(this.addressBookList, '주소록')
      cabinet.currentTeamKey = this.propObject.currentTeamKey || this.propObject.teamKey || this.propObject.value.targetKey
      cabinet.sysCabinetCode = 'USER'
      cabinet.creTeamKey = this.propObject.currentTeamKey || this.propObject.teamKey || this.propObject.value.targetKey
      cabinet.menuType = 'G'
      param.cabinet = cabinet
      this.$emit('openPop', param)
      // this.creAddressPopYn = tru
    },
    async addNewBook () {
      var param = {}
      param.creMenuYn = true
      var cabinet = {}
      var defaultAddBoardName = await this.$checkSameName(this.addressBookList, '주소록')
      cabinet.cabinetNameMtext = 'KO$^$' + defaultAddBoardName
      cabinet.currentTeamKey = this.propObject.currentTeamKey || this.propObject.teamKey || this.propObject.value.targetKey
      cabinet.sysCabinetCode = 'USER'
      // cabinet.creTeamKey = this.propObject.currentTeamKey
      cabinet.creTeamKey = this.propObject.currentTeamKey || this.propObject.teamKey || this.propObject.value.targetKey
      cabinet.menuType = 'G'
      param.cabinet = cabinet
      var result = null
      result = await this.$saveCabinet(param)
      if (result != null) {
        // var addBoard = {'cabinetNameMtext': defaultAddBoardName, 'idNum':2, 'cabinetKey': result.cabinetKey}
        this.$emit('')
        // if(this.addressBookList.length > 0){
        // this.anima()
        // }

        // await this.getTeamCabList()
        // if(!document.getElementsByClassName('foo')[0]){
        //     setTimeout(() => {
        //         this.anima()
        //     },200)
        // }else{
        //     this.anima()
        // }
      }
      // this.anima()
    },
    anima () {
      document.getElementsByClassName('foo')[0].style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
      setTimeout(() => {
        document.getElementsByClassName('foo')[0].style.backgroundColor = ''
        //     // document.getElementsByClassName('foo')[0].classList.remove('foo')
      }, 800)
    },
    async updateCabinet (data, index) {
      var cabinet = {}
      cabinet.cabinetNameMtext = 'KO$^$' + this.cabinetInputText
      cabinet.currentTeamKey = data.currentTeamKey
      cabinet.sysCabinetCode = data.sysCabinetCode
      cabinet.cabinetKey = data.cabinetKey
      var paramSet = {}
      paramSet.creMenuYn = false
      paramSet.cabinet = cabinet

      var result = null
      var response = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveCabinet',
        param: paramSet
      })
      result = response.data
      data.cabinetNameMtext = this.cabinetInputText
      this.editIndex = null
      console.log('---- upDateCabinet ----')
      console.log(result)
    },
    async changePosTeamMenu (event) {
      // var oldIndex = event.oldIndex
      // var newIndex = event.newIndex
      console.log('----------')
      console.log(this.addressBookList)

      var paramSet = {}
      // var teamMenuList = new Array()
      // var menu = new Object()
      // var cardList = document.getElementsByClassName('commonBookCard')
      // var index = null
      // for (var s = cardList.length - 1 ; s >=0; s--) {
      //     index = Number(cardList[s].getAttribute('index'))
      //     for (var i = 0; i < this.addressBookList.length; i ++) {
      //     if(index === i) {
      //         menu = {}
      //         var tt = this.addressBookList[i]
      //         menu.teamKey = this.addressBookList[i].creTeamKey
      //         if(this.addressBookList[i].menuType) menu.menuType = 'G'
      //         if(this.addressBookList[i].parentMenuKey) menu.parentMenuKey = this.addressBookList[i].parentMenuKey
      //         if(this.addressBookList[i].cabinetKey) menu.cabinetKey = this.addressBookList[i].cabinetKey
      //         if(this.addressBookList[i].cabinetNameMtext) menu.cabinetNameMtext = this.addressBookList[i].cabinetNameMtext
      //         if(this.addressBookList[i].sysCabinetCode) menu.sysCabinetCode = this.addressBookList[i].sysCabinetCode
      //         // console.log(menu);
      //         // console.log(menu)
      //         teamMenuList.push(menu)
      //         break
      //     }
      //     }
      // }

      // var tempList = this.addressBookList
      // if (oldIndex < newIndex) {
      //     // 선택한 값이 아래로 이동 (인덱스가 큰 쪽으로)
      //     tempList.splice(newIndex + 1, 0, tempList[oldIndex])
      //     tempList.splice(oldIndex, 1)
      // } else if (oldIndex > newIndex) {
      //     // 선택한 값이 위로 이동 (인덱스가 작은 쪽으로)
      //     tempList.splice(newIndex, 0, tempList[oldIndex])
      //     tempList.splice(oldIndex + 1, 1)
      // }
      // this.addressBookList = []
      // this.addressBookList = tempList
      // console.log(tempList)
      // paramSet.teamMenuList = tempList
      var tempList = []
      for (var index = 0; index < this.addressBookList.length; index++) {
        var temp = {}
        temp = this.addressBookList[index]
        temp.menuType = 'G'
        tempList.push(temp)
      }
      console.log(' ----- teamMenuList -----')
      console.log([...tempList])
      paramSet.teamMenuList = [...tempList]
      var result = await this.$commonAxiosFunction(
        {
          url: '/sUniB/tp.changePosTeamMenu',
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
