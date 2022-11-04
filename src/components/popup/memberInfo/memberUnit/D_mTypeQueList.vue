<template>
  <div class="fl w-100P" :key="queListReloadKey" >
    <draggable class="ghostClass" :v-model="queList" ghost-class="ghost" :dragging="dragging" @end="end" delay="200" handle=".movePoint">
      <transition-group>
        <div v-for="(list, index) in queList" :key="index" class="fl w-100P" style="padding: 0.3rem 0">
          <queCard :propData="list" @cardEmit='cardEmit' :compoIdx='index' class="mbottom-05"/>
        </div>
        </transition-group>
      </draggable>

    <div class="w-100P" style="display:flex; align-items: center; justify-content: center;">
      <gBtnSmall :btnTitle="'추가'" @click="addQuestion" class="mleft-05 mtop-05" style="float:left !important;"/>
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
    questionList: {}
  },
  created () {
    this.readyFunc()
    // 추후 back버튼을 위해 history관리가 들어와야함
  },
  data () {
    return {
      queListReloadKey: 0
    }
  },
  methods: {
    readyFunc () {
      this.queList = JSON.parse(JSON.stringify(this.questionList))
      // this.changeTab(this.queList[0], 0)
      console.log(this.queList)
    },
    addQuestion () {
      this.$emit('addQuestion')
    },
    cardEmit (param) {
      console.log(param)
      var type = param.targetType
      var data = param.data
      var idx = param.index
      console.log(data)
      if (type === 'editQue') {
        this.$emit('editQue', param)
      } else if (type === 'deleteQue') {
        this.tempDelQue(data, idx)
        // this.$emit('deleteQue', param)
      }
    },
    tempDelQue (data, index) {
      console.log(data)
      this.queList.splice(index, 1)
      this.queListReloadKey += 1
    },
    closePop () {
    // 추후 back버튼을 위해 history관리가 들어와야함
      this.$emit('closePop')
    }
  }
}
</script>
<style>

</style>
