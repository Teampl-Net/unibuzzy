<template>
    <div style="background-color: #FFFFFF; width: 100%; height: 100%;  padding: 20px 10px; ">
        <div :style="'background-color:' + this.selectedColor" style=" width: calc(100% - 100px); margin-left: 10px; float: left; height: 50px; margin-bottom: 20px;">{{this.selectedColor}}</div>
          <gBtnSmall @click="selectColor" style="float: left; height: 23px; margin-bottom: 5px; line-height: 23px;margin-left: 10px" btnTitle="선택"/>
          <gBtnSmall @click="closePop" style="float: left; height: 23px; color: #A9AACD; border: 1px solid #A9AACD; line-height: 23px; background: #FFFFFF; margin-left: 10px" btnTitle="닫기"/>
        <div style="width: 100%; height:calc(100% - 50px); overflow-y: auto; overflow-x: hidden;">
          <div v-for="(value, index) in colorList" :key="index" style="width: 100%;">
            <div style="width: 50%; float: left; ">
              <div style="width: 100%; height: 50px; display: flex; justify-content: center;" v-for="(color1, index) in value" :key="index" >
                <div style="width: calc(100% - 30px); margin-right: 10px; height: 40px; float: left; margin-bottom: 7px;" @click="pickColor(color1[1])"  :style="'background:' + color1[1]"></div>
                <!-- <div style="width: calc(50% - 15px); height: 40px; float: left; margin-bottom: 7px;" @click="pickColor(color1[0])" :style="'background:' + color1[0]"></div> -->
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      selectedColor: '#FFCDD2',
      colorList: [[
        ['#E57373', '#FFCDD2'],
        ['#F06292', '#F8BBD0'],
        ['#BA68C8', '#E1BEE7'],
        ['#9575CD', '#D1C4E9'],
        ['#7986CB', '#C5CAE9'],
        ['#64B5F6', '#BBDEFB'],
        ['#4FC3F7', '#B3E5FC'],
        ['#4DD0E1', '#B2EBF2']],
      [
        ['#FF8A65', '#FFCCBC'],
        ['#FFB74D', '#FFE0B2'],
        ['#FFD54F', '#FFECB3'],
        ['#FFF176', '#FFF9C4'],
        ['#DCE775', '#F0F4C3'],
        ['#AED581', '#DCEDC8'],
        ['#81C784', '#C8E6C9'],
        ['#4DB6AC', '#B2DFDB']
      ]]
    }
  },
  methods: {
    pickColor (color) {
      this.selectedColor = color
    },
    selectColor () {
      this.$emit('closePop', this.selectedColor)
    },
    closePop () {
      this.$emit('closePop', '0')
    }
  },
  props: {
    colorPick: {}
  },
  created () {
    this.selectedColor = this.colorPick
  },
  components: {
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
