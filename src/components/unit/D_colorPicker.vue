<template>

<!-- box-shadow: rgb(64 64 64 / 16%) 0px 0px 7px 4px; border-radius: 15px; max-height:50px; -->
    <div v-if="inLineYn !== false" class="colorPickerBox" id="colorPickerWrap" :style="isTag === true ? 'background-color : #d1e1f2; border:none; white-space:wrap; margin-top:0.3rem; flex-wrap:wrap; gap: 0.6rem; padding:20px 10px; min-width: 290px; max-width:310px; justify-content:center;' : 'background-color : #ECECF570; white-space:nowrap; padding: 5px 10px;'" style="border-radius: 8px; overflow: auto; display: flex; flex-direction: row; align-items: center;" :class="!isMobile? 'thinScrollBar':''" @wheel="horizontalScroll">
        <!-- <div :style="'background-color:' + this.selectedColor" style=" width: calc(100% - 100px); margin-left: 10px; float: left; height: 50px; margin-bottom: 20px;">{{this.selectedColor}}</div>
        <gBtnSmall @click="selectColor" style="float: left; height: 23px; margin-bottom: 5px; line-height: 23px;margin-left: 10px" btnTitle="선택"/>
        <gBtnSmall @click="closePop" style="float: left; height: 23px; color: #A9AACD; border: 1px solid #A9AACD; line-height: 23px; background: #FFFFFF; margin-left: 10px" btnTitle="닫기"/> -->
        <!-- <div style="width: 100%; height:calc(100% - 50px); overflow-y: auto; overflow-x: hidden;">
          <div v-for="(value, index) in colorList" :key="index" style="width: 100%;">
            <div style="width: 50%; float: left; ">
              <div style="width: 100%; height: 50px; display: flex; justify-content: center;" v-for="(color1, index) in value" :key="index" >
                <div style="width: calc(100% - 30px); margin-right: 10px; height: 40px; float: left; margin-bottom: 7px;" @click="pickColor(color1[1])"  :style="'background:' + color1[1]"></div>
              </div>
            </div>
          </div>
        </div> -->
        <template v-if="isTag === true">
          <div v-for="(value, index) in vividColorList" :key="index" class="mright-03" @click="pickColor(value, index)" :style="'background:' + value" style="line-height:25px; min-width:30px; width:40px; max-height: 25px; min-height: 25px; border-radius:25px; display: flex; justify-content: center; align-items: center;">
            <p class="fontBold font12" :style="{color : index === 3 || index ===4 || index ===8 || index ===9|| index ===13 || index ===14 || index ===18 || index ===19 || index ===23 || index ===24 || index === 28 || index === 29 || index === 33 || index === 34 ? '#222' : '#fff'}">Tag</p>
          </div>
        </template>
        <template v-else>
          <div v-for="(value, index) in colorList" :key="index" class="mright-03" @click="pickColor(value)" :style="'background:' + value" style="min-width:30px; max-width:30px; max-height: 30px; min-height: 30px; border-radius:100%; display: flex; justify-content: center; align-items: center;">
            <img src="../../assets/images/common/icon_check_white.svg" class="fl img-w20" v-show="selectedColor === value" alt="">
          </div>
        </template>
    </div>
    <div v-else class="" style="background-color: #ECECF570; min-height: 50px; height: 100%; padding: 5px 10px; border-radius: 8px; white-space: nowrap; flex-direction: row; align-items: center;">

          <div v-for="(value, index) in colorList" :key="index" class="mright-03" @click="pickColor(value)" :style="'background:' + value" style="min-width:30px; max-width:30px; max-height: 30px; min-height: 30px; float: left; border-radius:100%; display: flex; justify-content: center; align-items: center; margin-bottom: 5px;">
            <img src="../../assets/images/common/icon_check_white.svg" class="fl img-w20" v-show="selectedColor === value" alt="">
          </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isMobile: /Mobi/i.test(window.navigator.userAgent),
      selectedColor: '#FFCDD2',
      colorList: [
        '#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2', '#FFCCBC', '#FFE0B2', '#FFECB3', '#FFF9C4', '#F0F4C3', '#DCEDC8', '#C8E6C9', '#B2DFDB'
      // [
      //   ['#E57373', '#FFCDD2'],
      //   ['#F06292', '#F8BBD0'],
      //   ['#BA68C8', '#E1BEE7'],
      //   ['#9575CD', '#D1C4E9'],
      //   ['#7986CB', '#C5CAE9'],
      //   ['#64B5F6', '#BBDEFB'],
      //   ['#4FC3F7', '#B3E5FC'],
      //   ['#4DD0E1', '#B2EBF2']],
      // [
      //   ['#FF8A65', '#FFCCBC'],
      //   ['#FFB74D', '#FFE0B2'],
      //   ['#FFD54F', '#FFECB3'],
      //   ['#FFF176', '#FFF9C4'],
      //   ['#DCE775', '#F0F4C3'],
      //   ['#AED581', '#DCEDC8'],
      //   ['#81C784', '#C8E6C9'],
      //   ['#4DB6AC', '#B2DFDB']
      // ]]
      ],
      vividColorList: [
        '#00388B', '#0061F2', '#408DFF', '#91BDFF', '#C2DAFF', '#5F2E00', '#964800', '#FF7A00', '#FFC58F', '#FFE0C4', '#086600', '#0DA500', '#11D800', '#A8FFA1', '#CDFFC9', '#3B0076', '#6A00D4', '#942AFF', '#DAB5FF', '#EAD5FF', '#003D50', '#00698B', '#00B6DE', '#95E6FF', '#C8F5FF', '#7F0045', '#C30069', '#FF1794', '#FF96CF', '#FFC3E4', '#222222', '#717171', '#A6A6A6', '#CCCCCC', '#E3E3E3'
      ],
      mselectedColorIdx: 0,
      mBlackYn: false
    }
  },
  methods: {
    horizontalScroll (e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 10
      })
    },
    pickColor (color, index) {
      this.selectedColor = color
      this.mselectedColorIdx = index
      if (index === 3 || index === 4 || index === 8 || index === 9 || index === 13 || index === 14 || index === 18 || index === 19 || index === 23 || index === 24 || index === 28 || index === 29 || index === 33 || index === 34) {
        this.mBlackYn = true
      }
      this.$emit('choiceColor', this.selectedColor, this.mBlackYn)
    },
    selectColor () {
      this.$emit('closePop', this.selectedColor)
    },
    closePop () {
      this.$emit('closePop', '0')
    },
    setColor (color) {
      this.selectedColor = color
    }
  },
  props: {
    colorPick: {},
    inLineYn: {},
    deepYn: {},
    isTag: Boolean
  },
  created () {
    console.log('isTag', this.isTag)
    this.selectedColor = this.colorPick
    if (this.deepYn) {
      this.colorList = ['#c98276', '#E57373', '#ff5252', '#BA68C8', '#9575CD', '#7986CB', '#6497b1', '#005b96', '#6e7f80', '#36454f', '#000000', '#011f4b', '#a70000', '#ff0000', '#ff4d00', '#ff9a00', '#4DB6AC']
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
    // colorPick () {
    //   console.log(this.selectedColor)
    //   this.selectedColor = this.colorPick
    // }
  }
}
</script>

<style scoped>
</style>
