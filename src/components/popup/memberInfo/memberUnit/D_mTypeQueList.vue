<template>
    <div v-if="propMemberTypeObj" style="" class="fl w-100P" >
        <p class="textLeft font15 fontBold commonColor">부가정보</p>
        <div v-if="memberTypeItemList && memberTypeItemList.length === 0">
            <p class="font15 fontBold grayBlack textCenter mtop-1">설정된 값이 없습니다. 지금바로 추가해보세요!</p>
            <div @click="addQuestion(0)" style="width: 100%; float: left; display: flex; align-items: center; justify-content: center;" class="mtop-1 cursorP">
                <div style="width: 40px; height: 40px; border-radius: 100%; border: 1px solid #5F61BD; font-size: 25px" class="commonColor"> + </div>
            </div>
        </div>
        <template v-else>
            <draggable class="ghostClass" :v-model="memberTypeItemList" ghost-class="ghost" :dragging="dragging" @end="end" delay="200" handle=".itemMovePoint">
                <transition-group>
                    <div v-for="(list, index) in memberTypeItemList" :reloadKey="mReloadListKey" :key="list.itemKey" :listIndex="index" class="fl w-100P" style="padding: 0.3rem 0; padding-left: 10px;">
                        <queCard v-if="!list.deleteYn" :propData="list" @cardEmit='cardEmit' :compoIdx='index' :listIndex="index"  class="memTypeItemListRow mbottom-05"/>
                    </div>
                </transition-group>
            </draggable>
        </template>

        <!-- <div class="w-100P cursorP fl" style="display:flex; margin: 0 auto; align-items: center; justify-content: center; margin-top: 30px;">
            <div @click="addQuestion"  class="commonColor font30" style="width: 40px; height: 40px;line-height: 39px; border-radius: 100%; border: 2px solid #5F61BD;"> + </div>
        </div> -->
        <memInfoCreEditPop @changeMemberItem="changeMemberItem" v-if="mEditMemInfoPopShowYn"  :propData="this.mMemInfoData" @openPop="openPop" @closeXPop="closeMemInfoPop" />
    </div>
</template>
<script>
import { VueDraggableNext } from 'vue-draggable-next'
import memInfoCreEditPop from '../D_memInfoCreEditPop.vue'
import queCard from './cardUnit/D_cQueCard.vue'
export default {
  components: {
    queCard,
    draggable: VueDraggableNext,
    memInfoCreEditPop
  },
  props: {
    propMemberTypeObj: {}
  },
  created () {
    this.readyFunc()
    // 추후 back버튼을 위해 history관리가 들어와야함
  },
  data () {
    return {
      memberTypeItemList: [],
      mMemInfoData: {},
      mEditMemInfoPopShowYn: false,
      mDelItemList: []
    }
  },
  updated () {
    // this.readyFunc()
  },
  methods: {
    closeMemInfoPop () {
      this.mEditMemInfoPopShowYn = false
    },
    readyFunc () {
      console.log(this.propMemberTypeObj)
      if (this.propMemberTypeObj.itemList) {
        this.memberTypeItemList = this.propMemberTypeObj.itemList
        if (this.memberTypeItemList.length === 0) {
          // this.addQuestion(0)
        }
      } else {
        this.getMemberTypeItemList(true)
      }
    },
    sendListToParents () {
      console.log(this.memberTypeItemList)
      var sendList = null
      console.log(this.memberTypeItemList)
      console.log(this.mDelItemList)
      sendList = this.memberTypeItemList
      if (this.mDelItemList.length > 0) {
        sendList = [
          ...this.memberTypeItemList,
          ...this.mDelItemList
        ]
      }
      this.$emit('sendListToParents', sendList)
    },
    changeMemberItem (changeItemData) {
      for (var i = 0; i < this.memberTypeItemList.length; i++) {
        if (changeItemData.itemKey) {
          if (changeItemData.itemKey === this.memberTypeItemList[i].itemKey) {
            this.memberTypeItemList[i] = changeItemData
            break
          }
        } else if (changeItemData.newDate) {
          if (changeItemData.newDate === this.memberTypeItemList[i].newDate) {
            this.memberTypeItemList[i] = changeItemData
            break
          }
        }
      }
    },
    deleteQueList (index) {
      if (this.memberTypeItemList[index].addYn === false) {
        this.memberTypeItemList[index].deleteYn = true
        this.mDelItemList.push(this.memberTypeItemList[index])
      }
      this.memberTypeItemList.splice(index, 1)
    },
    addQuestion (index) {
      var newObj = { itemNameMtext: '새로운 정보', itemType: 'T', newYn: true }
      newObj.newDate = new Date()
      newObj.memberTypeKey = this.propMemberTypeObj.memberTypeKey
      this.memberTypeItemList.splice(index + 1, 0, newObj)
      // this.memberTypeItemList.push(newObj)
      // this.$emit('addQuestion')
    },
    async getMemberTypeItemList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.memberTypeKey = this.propMemberTypeObj.memberTypeKey
      var memberTypeItemList = await this.$commonAxiosFunction({
        url: 'https://mo.d-alim.com:9443/service/tp.getMemberTypeItemList',
        param: param
      })
      console.log(memberTypeItemList)
      this.memberTypeItemList = memberTypeItemList.data.memberTypeItemList
      for (var i = 0; i < this.memberTypeItemList.length; i++) {
        this.memberTypeItemList[i].addYn = false
      }
      if (this.memberTypeItemList.length === 0) {
        // this.addQuestion(0)
      }
      // eslint-disable-next-line no-debugger
      debugger
    },
    cardEmit (param) {
      console.log(param)
      param.selectedMemberType = param.data
      var type = param.targetType
      var data = param.data
      // var idx = param.index
      console.log(data)
      if (type === 'editQue') {
        this.mMemInfoData = param
        this.mEditMemInfoPopShowYn = true
      } else if (type === 'delete') {
        // this.tempDelQue(data, idx)
        this.deleteQueList(param.index)
        // alert(JSON.stringify(this.memberTypeItemList[param.index]))
        // this.$emit('deleteQue', param)
      } else if (type === 'add') {
        this.addQuestion(param.index)
      }
    },
    async deleteQue (deleteData) {
      if (deleteData.targetType === 'deleteQue') {
        console.log(deleteData)

        var deleteParam = {}
        deleteParam.itemKey = parseInt(deleteData.data.itemKey)
        await this.$commonAxiosFunction({
          url: 'https://mo.d-alim.com:9443/service/tp.deteteMemberTypeItem',
          param: deleteParam
        })
        this.getMemberTypeItemList()
      }

      // this.reloadKey += 1
    },
    // tempDelQue (data, index) {
    //   console.log(data)
    //   this.memberTypeItemList.splice(index, 1)
    // },
    closePop () {
    // 추후 back버튼을 위해 history관리가 들어와야함
      this.$emit('closePop')
    }
  }
}
</script>
<style>

</style>
