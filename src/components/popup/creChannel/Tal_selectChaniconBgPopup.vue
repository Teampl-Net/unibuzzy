<template>
  <!-- <div style="width: 100%; height: 100%; padding: 0 20px; > -->
  <div style="width: 100%; height: 100vh; position: absolute; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; z-index: 9999;" @click="this.$emit('no')"></div>
  <div class="confirmPopWrap" >
  <!-- <div style="width: 50%; height: 50%; padding: 0 20px; overflow: auto;" > -->
      <div class="creChanIntroTextWrap" style="width: 100%; min-height: 50px; text-align: left;">
          <p class="fontBold font18">{{msgTitle}}</p>
          <!-- <p style="font-size:14px">채널 종류를 선택해주세요</p> -->
          <!-- <p>채널 종류를 선택해주시면<br>필요한 서류를 알려드릴게요!</p> -->
      </div>
      <!-- <div style="width: 100%; height: calc(100% - 350px); margin-top: 20px; float: left;">  /* change Jeong */ -->
      <div style="width: 100%; margin-top: 20px; float: left; display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between ">
          <div class="createChannelSelectBox" :class="{activeTypeBox: selectedId ===value.imageFilekey}" @click="selectChanInfo(value)" v-for="(value,index) in teamImgList" :key="index" :style="getChanBoxSize" style="">
            <!-- <img v-if="opentype =='iconPop'" src='/resource/channeliconbg/CHAR01.png' style="width: calc(var(--chanBoxSize) - 20px)"/> -->
            <img v-if="opentype =='iconPop'" :src="value.pathMtext"  style="width: calc(var(--chanBoxSize) - 20px)"/>
            <p class="font15"  v-if="opentype =='iconPop'" >{{this.$changeText(value.codeNameMtext)}}</p>

            <img v-if="opentype =='bgPop'" :src='value.pathMtext' style="width: 100%; height: 100%;" >
            <!-- <img v-if="opentype =='bgPop'" :src='value.pathMtext' style="width: calc(var(--chanBoxSize) + 10px);" > -->

          </div>
      </div>

      <div @click="setParam" class="creChanBigBtn font18 fl mtop-2 mbottom-05">선택완료</div>

  </div>
</template>

<script>
// import a from ' resource/channeliconbg/CHAR01.png'\
export default {
  props: { opentype: {} },
  created () {
    this.getCodeList()
    this.setDefaultData()
  },
  data () {
    return {
      selectedId: '',
      selectedBack: '',
      teamImgList: [],
      selectPath: '',
      msgTitle: '',
      msgError: ''
    }
  },
  methods: {
    async getCodeList () {
      var resultList = null
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (this.opentype === 'bgPop') {
        param.groupCode = 'T_BG__'
      } else if (this.opentype === 'iconPop') {
        param.groupCode = 'T_LOGO'
      }
      resultList = await this.$getCodeList(param)
      this.teamImgList = resultList
      // var a = this.teamImgList
    },
    setDefaultData () {
      if (this.opentype === 'iconPop') {
        this.msgTitle = '채널을 대표할 아이콘을 선택해주세요.'
        this.msgError = '대표 아이콘을 선택해주세요!'
      } else if (this.opentype === 'bgPop') {
        this.msgTitle = '채널의 배경 사진을 선택해주세요.'
        this.msgError = '배경 사진을 선택해주세요!'
      }
    },
    setParam () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (this.selectedId !== '') {
        param.selectedId = this.selectedId
        param.selectPath = this.selectPath
        this.$emit('makeParam', param)
      } else {
      }
    },
    selectChanInfo (value) {
      this.selectedId = value.imageFilekey
      this.selectPath = value.pathMtext
    }
  },
  computed: {
    getChanBoxSize () {
      return {
        // '--chanBoxSize': window.innerWidth / 4 - 20 + 'px'
        '--chanBoxSize': window.innerWidth / 4 - 30 + 'px'
      }
    }
  }
}
</script>
<style scoped>

.confirmPopWrap{width: 90%; position: absolute; z-index: 9999; top: 50%; border-radius: 10px; background: #FFFFFF;
  padding: 1rem 2rem;
  overflow: auto;
  left: 5%;
  /* height: 70%; */
  max-height:700px ;
  box-shadow: 2px 3px 6px 3px #ccc;
  transform: translateY(-50%);
}
.creChanIntroTextWrap{padding: 10px 0; float: left; border-bottom: 1px solid #ccc;}

.creChanBigBtn{
  height: 50px; line-height: 50px; background: #6768a7; color: #fff; border-radius: 8px;
  width: 100%;

  margin-top: 10px;
  /* bottom: 10px;
  left: 5%; */
}
/* .activeTypeBox{background: #6768a7; color: #fff; opacity: 0.5;}*/
.activeTypeBox{ color: black; opacity: 0.4;}
.activeTypeBox p {color: black;}

.createChannelSelectBox{
  float: left;
  width: var(--chanBoxSize);
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>
