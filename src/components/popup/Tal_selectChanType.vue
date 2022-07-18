<template>
  <div style="width: 100%; height: 100%; padding: 0 20px;">
      <div class="creChanIntroTextWrap" style="width: 100%; min-height: 50px; text-align: left;">
          <p class="mbottom-1 fontBold font18">어떤 종류의 채널을 만들고 싶으신가요?</p>
          <p class="font18">채널 종류를 선택해주시면<br>필요한 서류를 알려드릴게요!</p>
      </div>
      <div style="width: 100%; height: calc(100% - 350px); margin-top: 20px; float: left;">
          <div :class="{activeTypeBox: selectedType ===value.teamType}" @click="selectChanType(value.teamType)" v-for="(value,index) in businessTypeList" :key="index" :style="getChanBoxSize" style=" float: left; width: var(--chanBoxSize);margin-right: 10px; height: var(--chanBoxSize); margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc; ">
              <p>{{value.teamNameMtext}}</p>
          </div>
      </div>
      <div style="width: 100%; height: 80px; background: rgb(103 104 167 / 22%); float: left;"></div>
      <div @click="setParam" class="creChanBigBtn font18 fl mtop-1">신청서 작성하기</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedType: '',
      businessTypeList: [
        { teamNameMtext: '기업', teamType: 'C' },
        { teamNameMtext: '정부', teamType: 'G' },
        { teamNameMtext: '학교', teamType: 'S' },
        { teamNameMtext: '종교 단체', teamType: 'H' },
        { teamNameMtext: '동호회', teamType: 'D' }
      ]
    }
  },
  methods: {
    setParam () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (this.selectedType !== '') {
        param.teamType = this.selectedType
      } else {
        alert('채널 종류를 선택해주세요!')
      }
      param.pageType = 0
      this.$emit('makeParam', param)
    },
    selectChanType (type) {
      this.selectedType = type
    }
  },
  computed: {
    getChanBoxSize () {
      return {
        '--chanBoxSize': window.innerWidth / 4 - 20 + 'px'
      }
    }
  }
}
</script>
<style scoped>
.creChanIntroTextWrap{padding: 10px 0; float: left; border-bottom: 1px solid #ccc;}

.creChanBigBtn{width: 100%; height: 50px; line-height: 50px; background: #6768a7; color: #fff; border-radius: 8px;}
.activeTypeBox{background: #6768a7; color: #fff;}
.activeTypeBox p {color: #fff;}
</style>
