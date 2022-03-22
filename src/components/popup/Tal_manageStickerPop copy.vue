<template>
    <div style="position: fixed; width: 100%; height: 100%; top:0; left: 0; background: #FFFFFF; z-index: 99 ">
        <popHeader headerTitle="스티커 수정" @closeXPop="closeXPop" style="box-shadow: 0px 7px 9px -9px #00000036;"/>
        <div class="popBody" style="margin-top: 70px; padding: 0 1.5rem">
            <div style="width: 100%; float: left;  height: 150px; margin-bottom: 20px;">
                <p class="font15 textLeft fontBold mbottom-05">선택된 스티커</p>
                <div class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in selectedStickerList " :key="index" style=" margin-bottom: 5px; min-width: 60px; margin-right: 5px; height: 25px; border-radius: 20px; float: left; padding: 0 10px;">
                    <span class="font15">{{value.stickerName}} <span @click="removeStickerList(index)" class="float: right; margin-left: 1rem;">x</span></span>
                </div>
            </div>
            <div style="display: none; position: fixed; width: 100vw; height: 100vh; top: 0; left: 0; z-index: 999; background:rgb(0 0 0 / 17%);<!--  display: flex; --> justify-content: center; align-items: center;">
                <div style="width: 80%; min-height: 150px; background:#FFFFFF; position: absolute; margin-bottom: 100px; border-radius: 20px;<!-- border: 1px solid #6768A7; -->">
                    <div style="width: 100%; padding: 0.3rem 1rem; height: 33px; border-bottom: 2px solid #6768A7;">
                        <p class="font16 fontBold textLeft">스티커 추가</p>
                    </div>
                    <div class="popBody" style="padding: 1rem;">
                        <div style="width: 100%; height: 35px;">
                            <span class="font15 grayBlack fl" style="width: 100px; text-align: left; margin-top: 3px;">스티커 이름</span>
                            <input type="text" style="width: calc(100% - 100px); height: 30px; font-size: 15px; border: 1px solid #505050; border-radius: 5px;">
                        </div>
                        <div style="width: 100%; height: 35px;">
                            <span class="font15 grayBlack fl" style="width: 100px;  text-align: left; margin-top: 3px;">스티커 색상</span>
                            <div style="width: calc(100% - 100px); height: 30px; float: left; background: #ccc; border-radius: 5px; font-size: 14px; padding: 5px 0; ">선택</div>
                        </div>
                    </div>
                    <div class="popFooter" style="padding: 1rem; float: right; padding-top: 0;">
                        <gBtnSmall btnTitle="추가" style="float: left; margin-right: 0.5rem;" class="fl" />
                        <gBtnSmall btnTitle="취소" style="float: left; background: #FFFFFF; color: #6768A7; border: 1px solid #6768A7;" class="fr" />
                    </div>
                </div>
            </div>
            <p class="font15 fl textLeft fontBold mbottom-05">내 스티커</p>
            <gBtnSmall btnTitle="생성" style="height: 20px; line-height: 14px; background: #FFFFFF; color: #6768A7; padding-right: 0; <!-- border: 1px solid #6768A7; -->" class="fr" />
            <gSearchBox class="fl w-100P" />
            <div style="width: 100%; float: left; height: calc(100vh - 350px); margin-top: 10px; overflow-y: auto;">
                <div class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in myStickerList " :key="index" style=" margin-bottom: 5px; min-width: 60px; margin-right: 5px; height: 25px; border-radius: 20px; float: left; padding: 0 10px;">
                    <span class="font15">{{value.stickerName}} <span @click="removeStickerList(index)" class="float: right; margin-left: 1rem;">+</span></span>
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
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#ffc1075e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#0dcaf05e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#0d61f05e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#dc35455e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#b035dc5e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#35dcc55e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#4adc355e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#0d6efd5e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#af0dfd5e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#0d8bfd5e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#fd0d5e5e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#fd0d0d5e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#6c7d185e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' },
        { stickerName: '택배', stickerKey: '0', stickerColor: '#73879c' }
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
