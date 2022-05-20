<template>
  <!-- <div style="width: 100%; height: 100%; padding: 0 20px; > -->
  <div style="width: 100vw; height: 100vh; position: fixed; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; z-index: 9999;" @click="this.$emit('no')"></div>
  <div class="confirmPopWrap" >
  <!-- <div style="width: 50%; height: 50%; padding: 0 20px; overflow: auto;" > -->
      <div class="creChanIntroTextWrap" style="width: 100%; min-height: 50px; text-align: left;">
          <p class="fontBold">{{msgTitle}}</p>
          <!-- <p style="font-size:14px">채널 종류를 선택해주세요</p> -->
          <!-- <p>채널 종류를 선택해주시면<br>필요한 서류를 알려드릴게요!</p> -->
      </div>
      <!-- <div style="width: 100%; height: calc(100% - 350px); margin-top: 20px; float: left;">  /* change Jeong */ -->
      <div style="width: 100%; margin-top: 20px; float: left; display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between ">
          <div class="createChannelSelectBox" :class="{activeTypeBox: selectedId ===value.teamCharImg}" @click="selectChanInfo(value.teamCharImg)" v-for="(value,index) in teamImgList" :key="index" :style="getChanBoxSize" style="">
            <!-- <img v-if="opentype =='iconPop'" src='/resource/channeliconbg/CHAR01.png' style="width: calc(var(--chanBoxSize) - 20px)"/> -->
            <img v-if="opentype =='iconPop'" :src="value.teamCharImg"  style="width: calc(var(--chanBoxSize) - 20px)"/>
            <p v-if="opentype =='iconPop'" >{{value.teamChartext}}</p>

            <img v-if="opentype =='bgPop'" :src='value.teamCharImg' style="width: 100%;" >
            <!-- <img v-if="opentype =='bgPop'" :src='value.teamCharImg' style="width: calc(var(--chanBoxSize) + 10px);" > -->


          </div>
      </div>

      <div @click="setParam" class="creChanBigBtn fl mtop-2 mbottom-05">선택완료</div>

  </div>
</template>

<script>
// import a from ' resource/channeliconbg/CHAR01.png'\
export default {
  props:{opentype:{}},
  created(){
    this.setDefaultData()
  },
  data () {
    return {
      selectedId: '',
      selectedBack:'',
      teamImgList: [],
      msgTitle:'',
      msgError:''
    }
  },
  methods: {
    setDefaultData(){
      if(this.opentype == 'iconPop'){
        this.msgTitle = '채널를 대표할 아이콘을 선택해주세요.'
        this.msgError = '대표 아이콘을 선택해주세요!'
        this.teamImgList = [
          {teamChartext:'황구', teamCharImg:'/resource/channeliconbg/CHAR01.png', charId: '01'},
          {teamChartext:'양', teamCharImg:'/resource/channeliconbg/CHAR02.png', charId: '02'},
          {teamChartext:'숫사슴', teamCharImg:'/resource/channeliconbg/CHAR03.png', charId: '03'},
          {teamChartext:'병아리', teamCharImg:'/resource/channeliconbg/CHAR04.png',charId:'04'},
          {teamChartext:'쥐', teamCharImg:'/resource/channeliconbg/CHAR05.png',charId:'05'},
          {teamChartext:'늑대', teamCharImg:'/resource/channeliconbg/CHAR06.png',charId:'06'},
          {teamChartext:'암사슴', teamCharImg:'/resource/channeliconbg/CHAR07.png',charId:'07'},
          {teamChartext:'강아지', teamCharImg:'/resource/channeliconbg/CHAR08.png',charId:'08'},
          {teamChartext:'너구리', teamCharImg:'/resource/channeliconbg/CHAR09.png',charId:'09'}
        ]
      }else if(this.opentype == 'bgPop'){
        this.msgTitle = '채널의 배경 사진을 선택해주세요.'
        this.msgError = '배경 사진을 선택해주세요!'
        this.teamImgList = [
          {teamChartext:'젖은 나뭇잎', teamCharImg:'/resource/channeliconbg/BG01.jpg', charId: '01'},
          {teamChartext:'파도', teamCharImg:'/resource/channeliconbg/BG02.jpg', charId: '02'},
          {teamChartext:'돌', teamCharImg:'/resource/channeliconbg/BG03.jpg', charId: '03'},
          {teamChartext:'나이테', teamCharImg:'/resource/channeliconbg/BG04.jpg',charId:'04'},
          {teamChartext:'키위', teamCharImg:'/resource/channeliconbg/BG05.jpg',charId:'05'},
          {teamChartext:'검정', teamCharImg:'/resource/channeliconbg/BG06.jpg',charId:'06'},
          {teamChartext:'유리구술', teamCharImg:'/resource/channeliconbg/BG07.jpg',charId:'07'},
          {teamChartext:'벽돌', teamCharImg:'/resource/channeliconbg/BG08.jpg',charId:'08'},
          {teamChartext:'나뭇잎', teamCharImg:'/resource/channeliconbg/BG09.jpg',charId:'09'}
        ]

      }
    },
    setParam () {
      var param = new Object()
        if (this.selectedId !== '') {
          param.selectedId = this.selectedId
          this.$emit('makeParam', param)
        } else {
          alert(this.msgError)
        }
    },
    selectChanInfo (id) {
      this.selectedId = id
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

.confirmPopWrap{width: 90%; position: fixed; z-index: 9999; top: 50%; border-radius: 10px; background: #FFFFFF; transform: translate(0,-50%);
  padding: 1rem 2rem;
  overflow: auto;
  left: 5%;
  /* height: 70%; */
  max-height:700px ;
}
.creChanIntroTextWrap{padding: 10px 0; float: left; border-bottom: 1px solid #ccc;}
.creChanIntroTextWrap p{font-size: 18px; }

.creChanBigBtn{
  height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;
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

