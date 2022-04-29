<template>
    <div style="position: fixed; width: 100%; display: flex; justify-content: center; align-items: center; height: 100%; top:0; left: 0; background: rgb(0 0 0 / 20%); z-index: 99 ">
        <div ref="popBody" style="display: flex; flex-direction: column;max-width: 500px; align-items: center; min-width: 300px; width: 80%; height: 50%; background: #FFFFFF; border-radius: 20px; padding: 20px 30px;">
            <p class="font15 textLeft w-100P fontBold mbottom-05 fl">선택 스티커</p>
            <!-- <img style="width: 15px; float: right" src="../../assets/images/common/popup_close.png" @closeXPop="closeXPop" alt=""> -->
            <div style="width: 100%; min-height: 100px; padding: 10px 0; overflow-x: auto; overflow-y: hidden; margin-bottom: 15px;">
                <div :style="selectedStickerWidth" style="width: var(--selectedStickerWidth); height: 100%;" class="">
                    <div :style="'background-color:' + value.stickerColor +'; width:' + this.iconSize + 'px'" style="<!-- box-shadow: inset rgb(0 0 0 / 30%) 0 0 0 9999px; --> ;display: flex;  margin-bottom: 5px; position: relative; flex-direction: column; align-items: center; justify-content: center; min-height: 70px; border-radius: 10px; float: left; margin-right: 10px;" v-for="(value, index) in selectedStickerList " :key="index" >
                        <img :src="value.stickerIcon" style="width: 20px; margin-right: 5px; margin-top: 2px; float: left; " alt="">
                        <span class="font13" style="margin-top: 3.5px; margin-right: 0.5rem;">{{value.stickerName}} </span>
                        <img  @click="removeStickerList(index)" src="../../assets/images/push/minusIcon.svg" style="position: absolute; right: -7px; top: -7px; width: 20px;" alt="">
                    </div>
                </div>
            </div>
            <p class="font15 w-100P textLeft fontBold">전체 스티커</p>
            <div style="width: 100%; min-height: 100px; padding: 10px 0; overflow-x: auto; overflow-y: hidden">
                <div style="display: flex; background: rgb(0 0 0 / 10%); margin-bottom: 5px position: relative; flex-direction: column; align-items: center; justify-content: center; width: calc(33.3% - 10px); min-height: 70px; border-radius: 10px; float: left; margin-right: 10px;" >
                <!-- <div @click="this.createStickerPopShowYn = true" style="display: flex; background: rgb(0 0 0 / 10%); margin-bottom: 5px position: relative; flex-direction: column; align-items: center; justify-content: center; width: calc(33.3% - 10px); min-height: 70px; border-radius: 10px; float: left; margin-right: 10px;" > -->
                    +
                </div>
                <div :style="myStickerWidth" style="width: var(--myStickerWidth); height: 100%;" class="mbottom-1">
                    <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
                    <div :class="value.showYn === false ? 'dispN' : '' " :style="'background-color:' + value.stickerColor +'; width:' + this.iconSize + 'px'" style="display: flex;  margin-bottom: 5px; position: relative; flex-direction: column; align-items: center; justify-content: center; min-height: 70px; border-radius: 10px; float: left; margin-right: 10px;" v-for="(value, index) in setMyStickerList(this.selectedStickerList) " :key="index" >
                        <img :src="value.stickerIcon" style="width: 20px; margin-right: 5px; margin-top: 2px; float: left; " alt="">
                        <span class="font13" style="margin-top: 3.5px; margin-right: 0.5rem;">{{value.stickerName}} </span>
                        <img  @click="addStickerList(index)" src="../../assets/images/push/plusIcon.svg" style="position: absolute; right: -7px; top: -7px; width: 20px;" alt="">
                    </div>
                </div>
            </div>
            <gBtnSmall btnTitle="닫기" @click="closeXPop" />
        </div> <!--@closeXPop="closeXPop" -->
        <div v-if="this.createStickerPopShowYn" style="position: fixed; width: 100%;  display: flex;  justify-content: center; align-items: center; height: 100%; top:0; left: 0; background: rgb(0 0 0 / 20%); z-index: 999 ">
            <div style="width: 260px; height: 310px; background: #FFFFFF; position: relative; border-radius: 20px; padding: 20px 30px;">
                <p class="font15 w-100p textLeft fontBold mbottom-05">스티커 생성</p> <img @click="this.createStickerPopShowYn = false" src="../../assets/images/common/popup_close.png" style="position: absolute; top:20px; right: 20px; width: 15px;" alt="">
                <div style="width: 100%; height: 25px; display: flex; justify-content: center; align-items: center;">
                    <gBtnSmall @click="this.colorPickerShowYn = true" style="float: left; color: #A9AACD; border: 1px solid #A9AACD; line-height: 20px; height: 25px; background: #FFFFFF;" btnTitle="색상"/>
                    <gBtnSmall @click="this.colorPickerShowYn = true" style="float: left; color: #A9AACD; border: 1px solid #A9AACD; line-height: 20px; height: 25px; background: #FFFFFF; margin-left: 10px" btnTitle="아이콘"/>
                </div>
                <div :style="changeColor" style="margin: 0 auto; margin-top: 5px; background-color: var(--selectedColor);width: 130px; height: 130px; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 30px;">
                    <img style="width: 120px;" :src="selectCreateStickerImg" alt="">
                </div>
                    <input type="text" style="margin: 0 auto; margin-top: 5px; background: #ffffff7a;width: 60%;border: none; border-bottom: 1px solid #6c5c9d; ">
                <div :class="this.colorPickerShowYn === false ? 'dispN':''" style="overflow: hidden; position: absolute; box-shadow: rgb(64 64 64 / 16%) 0px 0px 7px 4px; border-radius: 15px; top: 0; left: 0; z-index: 99999; width: 100%; height: 300px; ">
                    <gColorPicker :colorPick="this.selectedColor" @closePop="closeColorPickerPop" />
                </div>
                <div style="width: 100%; height: 30px; margin-top: 20px; display: flex; justify-content: center; align-items: center;">
                    <gBtnSmall @click="createSticker           " btnTitle="생성"/>
                    <gBtnSmall @click="this.createStickerPopShowYn = false" style="float: left; color: #A9AACD; border: 1px solid #A9AACD; background: #FFFFFF; margin-left: 10px" btnTitle="취소"/>
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
        { stickerName: '온라인 쇼핑몰', stickerKey: '1', stickerColor: '#0dcaf05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '공연 및 예술', stickerKey: '2', stickerColor: '#0d61f05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '3', stickerColor: '#dc35455e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '4', stickerColor: '#b035dc5e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '택배', stickerKey: '5', stickerColor: '#73879c', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' }
      ],
      tempStickerList: [
        { stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerIcon: '/resource/stickerIcon/sticker_robot.svg' }
      ],
      selectedStickerList: [],
      iconSize: 0,
      selectedTempSticker: 0,
      selectedColor: '#E57373',
      colorPickerShowYn: false, // colorPicker  팝업
      createStickerPopShowYn: false // 스티커 생성 팝업
    }
  },
  computed: {
    selectedStickerWidth () {
      return {
        '--selectedStickerWidth': this.iconSize * this.selectedStickerList.length + (this.selectedStickerList.length * 10) + 'px'
      }
    },
    changeColor () {
      return {
        '--selectedColor': this.selectedColor
      }
    },
    myStickerWidth () {
      var showCnt = 0
      for (var i = 0; i < this.myStickerList.length; i++) {
        if (this.myStickerList[i].showYn === true) { showCnt += 1 }
      }
      return {
        '--myStickerWidth': this.iconSize * showCnt + (showCnt * 10) + this.iconSize + 30 + 'px'
      }
    },
    selectCreateStickerImg () {
      return this.tempStickerList[this.selectedTempSticker].stickerIcon
    }
  },
  created () {
    // this.setMyStickerList(this.stickerList)
    var maxWidth = window.innerWidth * 0.8
    if (maxWidth > 500) { maxWidth = 500 }
    this.iconSize = (maxWidth - 60) / 3 - 10
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
      for (var k = 0; k < this.myStickerList.length; k++) {
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
      var removeKey = this.selectedStickerList[idx].stickerKey
      for (var i = 0; i < this.myStickerList.length; i++) {
        if (this.myStickerList[i].stickerKey === removeKey) {
          this.myStickerList[i].showYn = true
          break
        }
      }
      this.selectedStickerList.splice(idx, 1)
    },
    addStickerList (idx) {
      this.selectedStickerList.push(this.myStickerList[idx])
      this.myStickerList[idx].showYn = false
    },
    closeColorPickerPop (value) {
      if (value === '0') {
      } else {
        this.selectedColor = value
      }
      this.colorPickerShowYn = false
    }
  }
}
</script>

<style scoped>
.dispN{display:  none!important;;}
</style>
