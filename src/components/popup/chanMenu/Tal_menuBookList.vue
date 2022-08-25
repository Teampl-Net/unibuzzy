<template>

<div v-if="listData.length > 0" style="width: 100%;" class="mtop-05">
  <div v-for="(data, index) in listData" :id="'book'+ index" :key='index' class="cabinetListCard cursorP fl" @click="clickList(data)" >
      <!-- <div v-if="!noIcon" class="fl mleft-1" style="width:30px; min-height:25px;" >
          <img style="padding: 3px;" src="../../../assets/images/channel/channer_addressBook.svg">
      </div> -->
      <div class="fl mleft-2 textLeft font16 textOverdot" style="width: calc(100% - 30px - 3rem)" :style="noIcon ? 'margin: 0 0 0 0; width:100%;' : '' ">
          <span class="commonBlack fontBold mleft-05">{{this.$changeText(data.cabinetNameMtext)}}</span>
      </div>
  </div>
</div>
<p v-else class="fl w-100P textLeft font14 mtop-13">생성된 그룹이 없습니다.</p>
</template>

<script>
// import { VueDraggableNext } from 'vue-draggable-next'
export default {
  props: {
    listData: {},
    editYn: {},
    selectPopYn: {},
    chanAlimListTeamKey: {},
    noIcon: {}
  },
  data () {
    return {
      // cabinetList: [{cabinetNameMtext:'KO$^$SSS'},{cabinetNameMtext:'KO$^$BBB'}],
      editTeamName: '',
      editNameYn: null,
      teamList: {},
      dragging: false
    }
  },
  created () {

  },
  components: {
    // draggable: VueDraggableNext
  },
  methods: {
    clickList (data) {
      this.$emit('openDetail', data)
    }
  }

}
</script>

<style >
.cabinetListCard{
width:100%; overflow: hidden; position: relative;
padding: 10px 0;
border-bottom: 1px solid #eee;
float: left;
}
.fontBold{font-weight: bold;}

</style>
