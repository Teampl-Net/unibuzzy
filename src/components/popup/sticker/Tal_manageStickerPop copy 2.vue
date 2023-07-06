<template>
    <div style="position: absolute; width: 100%; height: 100%; top:0; left: 0; background: rgb(0 0 0 / 15%); z-index: 99 ">
        <div></div>
        <popHeader headerTitle="스티커 선택" @closeXPop="closeXPop" style="box-shadow: 0px 7px 9px -9px #00000036;"/>
        <div class="popBody" style="margin-top: 70px; padding: 0 1rem">
            <div style="width: 100%; float: left;  height: 150px; margin-bottom: 20px;">
                <p class="font15 textLeft fontBold mbottom-05">선택된 스티커</p>
                <div class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in selectedStickerList " :key="index" style=" margin-bottom: 5px; min-width: 60px; margin-right: 5px; height: 25px; border-radius: 20px; float: left; padding: 0 10px;">
                    <!-- <span class="font15">{{value.stickerName}} <span @click="removeStickerList(index)" class="float: right; margin-left: 1rem;">x</span></span> -->
                    <img :src="value.stickerIcon" style="width: 20px; margin-right: 5px; margin-top: 2px; float: left; " alt=""><span class="font15 fl" style="margin-top: 3.5px; margin-right: 0.5rem;">{{value.stickerName}} </span><span @click="removeStickerList(index)" class="float: right; margin-left: 1rem;">x</span>
                </div>
            </div>
            <p class="font15 fl textLeft fontBold mbottom-05">내 스티커</p>
            <gBtnSmall btnTitle="관리" style="height: 20px; line-height: 14px;" class="fr" />
            <gSearchBox class="fl w100P" />
            <div style="width: 100%; float: left; height: calc(100vh - 350px); margin-top: 10px; overflow-y: auto;">
                <div v-for="(value, index) in myStickerList " :key="index" style="width: 100%; height: 40px;">
                    <div :style="'background-color:' + value.stickerColor"  style="width: 30px; height: 30px; padding: 0 3px; border-radius: 15px; float: left; margin-top: 5px;">
                        <img :src="value.stickerIcon" style="width: 25px; margin-right: 5px; float: left; " alt="">
                    </div>
                    <span class="font15" style="min-width: 60px; text-align: left; float: left; margin-top: 10px; margin-left: 10px;">{{value.stickerName}}</span>
                    <img src="../../assets/images/common/edit.png" style="width: 1rem" class="fr mleft-1" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      myStickerList: [
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#ffc1075e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#0dcaf05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#0d61f05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#dc35455e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#b035dc5e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#35dcc55e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#4adc355e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#0d6efd5e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#af0dfd5e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#0d8bfd5e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#fd0d5e5e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#fd0d0d5e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#6c7d185e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '택배', stickerKey: '0', stickerColor: '#73879c', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' }
      ],
      selectedStickerList: []
    }
  },
  created () {
    this.selectedStickerList = this.stickerList
  },
  props: {
    stickerList: {}
  },
  methods: {
    closeXPop () {
      this.$emit('closePop')
    },
    setMyStickerList (sList) {
      for (var k = 0; k < this.myStickerList; k++) {
        this.myStickerList[k].showYn = true
        for (var i = 0; i < sList.length; i++) {
          if (this.myStickerList[k].stickerKey === sList[i].stickerKey) {
            this.myStickerList[k].showYn = false
            break
          }
        }
      }
      return this.myStickerList
    },
    removeStickerList (idx) {
      this.selectedStickerList.splice(idx, 1)
      this.myStickerList[idx].showYn = true
    }
  }
}
</script>

<style scoped>

</style>
