<template>
    <div @click="closeXPop" class="backModal">
    </div>
    <div ref="popBody" class="stickerPopWrap">
      <p class="font15 textLeft w-100P fontBold mbottom-05 fl">선택 스티커</p>
      <!-- <img style="width: 15px; float: right" src="../../assets/images/common/popup_close.png" @closeXPop="closeXPop" alt=""> -->
      <div class="selectedStickerWrap">
          <div :style="selectedStickerWidth" style="width: var(--selectedStickerWidth); height: 100%;" class="">
              <div :style="'background-color:' + value.picBgPath +'; width:' + this.iconSize + 'px'" style="<!-- box-shadow: inset rgb(0 0 0 / 30%) 0 0 0 9999px; --> ;display: flex;  margin-bottom: 5px; position: relative; flex-direction: column; align-items: center; justify-content: center; min-height: 70px; border-radius: 10px; float: left; margin-right: 10px;" v-for="(value, index) in selectedStickerList " :key="index" >
                  <img :src="value.picPath" style="width: 20px; margin-right: 5px; margin-top: 2px; float: left; " alt="">
                  <span class="font13" style="margin-top: 3.5px; margin-right: 0.5rem;">{{this.$makeMtextMap(value.nameMtext, 'KO')}} </span>
                  <img  @click="removeStickerList(index)" src="../../assets/images/push/minusIcon.svg" style="position: absolute; right: -7px; top: -7px; width: 20px;" alt="">
              </div>
          </div>
      </div>
      <p class="font15 w-100P textLeft fontBold">전체 스티커</p>
      <div class="totalStickerWrap">
          <div @click="this.createStickerPopShowYn = true" class="createStickerBtn" >
          <!-- <div @click="this.createStickerPopShowYn = true" style="display: flex; background: rgb(0 0 0 / 10%); margin-bottom: 5px position: relative; flex-direction: column; align-items: center; justify-content: center; width: calc(33.3% - 10px); min-height: 70px; border-radius: 10px; float: left; margin-right: 10px;" > -->
              +
          </div>
          <div :style="myStickerWidth" style="width: var(--myStickerWidth); height: 100%;" class="mbottom-1">
              <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
              <div :class="value.showYn === false ? 'dispN' : '' " :style="'background-color:' + value.picBgPath +'; width:' + this.iconSize + 'px'" style="display: flex;  margin-bottom: 5px; position: relative; flex-direction: column; align-items: center; justify-content: center; min-height: 70px; border-radius: 10px; float: left; margin-right: 10px;" v-for="(value, index) in setMyStickerList " :key="index" >
                  <img :src="value.picPath" style="width: 20px; margin-right: 5px; margin-top: 2px; float: left; " alt="">
                  <span class="font13" style="margin-top: 3.5px; margin-right: 0.5rem;">{{this.$makeMtextMap(value.nameMtext, 'KO')}} </span>
                  <img  @click="addStickerList(index)" src="../../assets/images/push/plusIcon.svg" style="position: absolute; right: -7px; top: -7px; width: 20px;" alt="">
              </div>
          </div>
      </div>
      <div style="width: 100%; bottom: 0; min-height: 30px">
        <gBtnSmall btnTitle="닫기" class="fl" @click="closeXPop" />
        <gBtnSmall btnTitle="적용" class="fl mright-05" @click="updateStickerList" />
      </div>
  </div> <!--@closeXPop="closeXPop" -->
  <div v-if="this.createStickerPopShowYn" class="createStickerPopWrap ">
      <div class="createStickerPop">
          <p class="font15 w-100p textLeft fontBold mbottom-05">스티커 생성</p> <img @click="this.createStickerPopShowYn = false" src="../../assets/images/common/popup_close.png" style="position: absolute; top:20px; right: 20px; width: 15px;" alt="">
          <div style="width: 100%; height: 25px; display: flex; justify-content: center; align-items: center;">
              <gBtnSmall @click="this.colorPickerShowYn = true" style="float: left; color: #A9AACD; border: 1px solid #A9AACD; line-height: 20px; height: 25px; background: #FFFFFF;" btnTitle="색상"/>
              <gBtnSmall @click="this.stickerPickerShowYn = true" style="float: left; color: #A9AACD; border: 1px solid #A9AACD; line-height: 20px; height: 25px; background: #FFFFFF; margin-left: 10px" btnTitle="아이콘"/>
          </div>
          <div :style="changeColor" style="margin: 0 auto; margin-top: 5px; background-color: var(--selectedColor);width: 130px; height: 130px; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 30px;">
              <img style="width: 90px;" :src="selectCreateStickerImg" alt="">
          </div>
              <input v-model="stickerNameMtext" type="text" class="stickerNameInput">
          <div :class="this.colorPickerShowYn === false ? 'dispN':''" style="overflow: hidden; position: absolute; box-shadow: rgb(64 64 64 / 16%) 0px 0px 7px 4px; border-radius: 15px; top: 0; left: 0; z-index: 99999; width: 100%; height: 300px; ">
              <gColorPicker :colorPick="this.selectedColor" @closePop="closeColorPickerPop" />
          </div>
          <div :class="this.stickerPickerShowYn === false ? 'dispN':''" style="overflow: hidden; position: absolute; box-shadow: rgb(64 64 64 / 16%) 0px 0px 7px 4px; border-radius: 15px; top: 0; left: 0; z-index: 99999; width: 100%; height: 300px; ">
              <iconPicker :stickerPick="this.selectedSticker" @closePop="closeStickerPickerPop" />
          </div>
          <div style="width: 100%; height: 30px; margin-top: 20px; display: flex; justify-content: center; align-items: center;">
              <gBtnSmall @click="createSticker " btnTitle="생성"/>
              <gBtnSmall @click="this.createStickerPopShowYn = false" style="float: left; color: #A9AACD; border: 1px solid #A9AACD; background: #FFFFFF; margin-left: 10px" btnTitle="취소"/>
          </div>
      </div>
  </div>
</template>

<script>
import iconPicker from '../unit/Tal_stickerPicker.vue'
export default {
  components: {
    iconPicker
  },
  data () {
    return {
      myStickerList: [],
      selectedStickerList: [],
      iconSize: 0,
      selectedSticker: 0,
      selectedColor: '#E57373',
      colorPickerShowYn: false, // colorPicker  팝업
      stickerPickerShowYn: false,
      createStickerPopShowYn: false, // 스티커 생성 팝업
      stickerNameMtext: ''
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
      return './resource/stickerIcon/sticker' + this.selectedSticker + '.svg'
    },
    setMyStickerList () {
      var test = this.myStickerList
      for (var k = 0; k < test.length; k++) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.myStickerList[k].showYn = true
        for (var i = 0; i < this.selectedStickerList.length; i++) {
          if (this.myStickerList[k].stickerKey === this.selectedStickerList[i].stickerKey) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.myStickerList[k].showYn = false
            break
          }
        }
      }
      return this.myStickerList
    }
  },
  created () {
    var maxWidth = window.innerWidth * 0.8
    if (maxWidth > 500) { maxWidth = 500 }
    this.iconSize = (maxWidth - 60) / 3 - 10
    this.selectedStickerList = this.stickerList
    this.getStickerList()
    // await this.setMyStickerList(this.stickerList)
  },
  props: {
    stickerList: {}
  },
  methods: {
    async getStickerList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      var resultData = await this.$getStickerList(param)
      this.myStickerList = resultData
    },
    closeXPop () {
      this.$emit('closePop')
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
    },
    closeStickerPickerPop (value) {
      if (value === '0') {
      } else {
        this.selectedSticker = value
      }
      this.stickerPickerShowYn = false
    },
    updateStickerList () {
    },
    async createSticker () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (this.stickerNameMtext !== undefined && this.stickerNameMtext !== null && this.stickerNameMtext !== '') {
        param.nameMtext = 'KO$^$' + this.stickerNameMtext
      } else {
        alert('스티커 이름을 지정해주세요')
        return
      }
      if (this.selectedSticker !== undefined && this.selectedSticker !== null && this.selectedSticker !== '') {
        param.picPath = './resource/stickerIcon/sticker' + this.selectedSticker + '.svg'
      } else {
        alert('스티커 아이콘을 지정해주세요')
        return
      }
      if (this.selectedColor !== undefined && this.selectedColor !== null && this.selectedColor !== '') {
        param.picBgPath = this.selectedColor
      } else {
        alert('스티커 배경색을 지정해주세요')
      }

      var result = await this.$saveSticker(param)
      if (result === true) {
        alert('생성되었습니다!')
        this.getStickerList()
        this.createStickerPopShowYn = false
      }
    }
  }
}
</script>

<style scoped>
.backModal{position: fixed; width: 100%; height: 100%; top:0; left: 0; background: rgb(0 0 0 / 20%); z-index: 99 }
.dispN{display:  none!important;}
.stickerPopWrap{position: fixed; z-index: 999; top: 20%;left: 10%; display: flex; flex-direction: column;max-width: 500px; align-items: center; min-width: 300px; width: 80%; height: 50%; background: #FFFFFF; border-radius: 20px; padding: 20px 30px;}
.selectedStickerWrap{width: 100%; min-height: 100px; padding: 10px 0; overflow-x: auto; overflow-y: hidden; margin-bottom: 15px;}
.totalStickerWrap{width: 100%; min-height: 100px; padding: 10px 0; overflow-x: auto; overflow-y: hidden}
.createStickerBtn{display: flex; background: rgb(0 0 0 / 10%); margin-bottom: 5px; position: relative; flex-direction: column; align-items: center; justify-content: center; width: calc(33.3% - 10px); min-height: 70px; border-radius: 10px; float: left; margin-right: 10px;}
.createStickerPopWrap{position: fixed; width: 100%;  display: flex;  justify-content: center; align-items: center; height: 100%; top:0; left: 0; background: rgb(0 0 0 / 20%); z-index: 999}
.createStickerPop{width: 260px; height: 310px; background: #FFFFFF; position: relative; border-radius: 20px; padding: 20px 30px;}
.stickerNameInput{margin: 0 auto; margin-top: 5px; background: #ffffff7a;width: 60%;border: none; border-bottom: 1px solid #6c5c9d;}
</style>
