<template>
  <div v-if="propMemberTypeObj" style="" class="fl w-100P" >
    <p class="textLeft font16 fontBold commonDarkGray">정보</p>
    <draggable class="ghostClass" :v-model="memberTypeItemList" ghost-class="ghost" :dragging="dragging" @end="end" delay="200" handle=".movePoint">
      <transition-group>
        <div v-for="(list, index) in memberTypeItemList" :key="list.itemKey" class="fl w-100P" style="padding: 0.3rem 0">
          <queCard :propData="list" @cardEmit='cardEmit' :compoIdx='index' class="mbottom-05"/>
        </div>
      </transition-group>
      </draggable>

    <div class="w-100P" style="display:flex; align-items: center; justify-content: center;">
        <div @click="addQuestion"  style="width: 100%; height: 25px; border-radius: 5px; border: 1px solid #ccc;"> + </div>
    </div>
  </div>
</template>
<script>
import { VueDraggableNext } from 'vue-draggable-next'
import queCard from './cardUnit/D_cQueCard.vue'
export default {
  components: {
    queCard,
    draggable: VueDraggableNext
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
      memberTypeItemList: []
    }
  },
  updated () {
    // this.readyFunc()
  },
  methods: {
    readyFunc () {
      this.getMemberTypeItemList()
    },
    addQuestion () {
      this.$emit('addQuestion')
    },
    async getMemberTypeItemList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.memberTypeKey = this.propMemberTypeObj.memberTypeKey
      var memberTypeItemList = await this.$commonAxiosFunction({
        url: 'service/tp.getMemberTypeItemList',
        param: param
      })
      console.log(memberTypeItemList)
      this.memberTypeItemList = memberTypeItemList.data.memberTypeItemList
      // eslint-disable-next-line no-debugger
      debugger
    },
    cardEmit (param) {
      console.log(param)
      var type = param.targetType
      var data = param.data
      // var idx = param.index
      console.log(data)
      if (type === 'editQue') {
        this.$emit('editQue', param)
      } else if (type === 'deleteQue') {
        // this.tempDelQue(data, idx)
        this.deleteQue(param)
        // alert(JSON.stringify(this.memberTypeItemList[param.index]))
        // this.$emit('deleteQue', param)
      }
    },
    async deleteQue (deleteData) {
      if (deleteData.targetType === 'deleteQue') {
        console.log(deleteData)

        var deleteParam = {}
        deleteParam.itemKey = parseInt(deleteData.data.itemKey)
        await this.$commonAxiosFunction({
          url: 'service/tp.deteteMemberTypeItem',
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
