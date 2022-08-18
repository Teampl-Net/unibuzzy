<template>

<div v-if="listData.length > 0" style="width: 100%; margin-top:0.5rem;" class="">
    <div v-for="(data, index) in listData" :id="'book'+ index" :key='index' class="cabinetListCard cursorP fl" @click="clickList(data)">
        <div style="width:100%; min-height:30px;" class="fl">
            <!-- <img src="" /> -->
            <div v-if="!noIcon" class="fl mleft-1" style="width:30px;height:30px;" >
                <img style="padding: 3px;" src="../../../assets/images/channel/channer_addressBook.svg">
            </div>
            <div class="fl mleft-2 textLeft font15 textOverdot" style="line-height: 30px; width: calc(100% - 30px - 3rem)" :style="noIcon ? 'margin: 0 0 0 0; width:100%;' : '' ">
                <span style="color: black;">{{this.$changeText(data.cabinetNameMtext)}}</span>
                <!-- <span class="mleft-05 fontBold fl commonColor">{{data}}</span> -->
            </div>
        </div>
    </div>

</div>
<div v-else class="textLeft mtop-05" style="margin-left: calc(2rem + 20px);"><p class="textLeft font14">생성된 그룹이 없습니다.</p></div>

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
