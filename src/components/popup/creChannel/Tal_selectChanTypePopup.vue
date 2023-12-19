<template>

  <!-- <div style="width: 100%; height: 100%; padding: 0 20px; > -->
  <div style="width: 100%; float: left;">
    <div style="width: 100%; height: 100vh; position: absolute; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; z-index: 9999;" @click="this.$emit('no')"></div>
    <commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" confirmText="채널종류를 선택해주세요" />

    <div class="confirmPopWrap" >
    <!-- <div style="width: 50%; height: 50%; padding: 0 20px; overflow: auto;" > -->
        <div class="creChanIntroTextWrap" style="width: 100%; min-height: 50px; text-align: left;">
            <!-- <p class="mbottom-1 fontBold">어떤 종류의 채널을 만들고 싶으신가요?</p> -->
            <p class="fontBold">채널 종류를 선택해주세요</p>
            <!-- <p style="font-size:14px">채널 종류를 선택해주세요</p> -->
            <!-- <p>채널 종류를 선택해주시면<br>필요한 서류를 알려드릴게요!</p> -->
        </div>
        <!-- <div style="width: 100%; height: calc(100% - 350px); margin-top: 20px; float: left;">  /* change Jeong */ -->
        <div style="width: 100%; margin: 1rem 0px; margin-bottom: 0rem; float: left; display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between ">
            <!-- <div :class="{activeTypeBox: selectedType ===value.teamType}" @click="selectChanType(value.teamType)" v-for="(value,index) in businessTypeList" :key="index" :style="getChanBoxSize" style=" float: left; width: var(--chanBoxSize);margin-right: 10px; height: calc(var(--chanBoxSize)); margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc;"> -->
            <div :class="{activeTypeBox: selectedType ===value.teamType}" @click="selectChanType(value.teamType)" v-for="(value,index) in businessTypeList" :key="index" :style="getChanBoxSize" style="display:;  width: var(--chanBoxSize);margin-right: 10px;height:3rem; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc;display: flex; align-items: center; justify-content: center; ">
                <p class="font15" >{{value.teamNameMtext}}</p>
            </div>
        </div>
        <div :class="{activeTypeBox: selectedType === 'E'}" @click="selectChanType('E')" :style="getChanBoxSize" style="display:;  width: var(--chanBoxSize);margin-right: 10px; float: left; height:3rem; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc;display: flex; align-items: center; justify-content: center; ">
            <p class="font15" >기타</p>
        </div>
        <!-- <input type="text" v-model="inputTypeTeam" name="" :style="getChanBoxSize" class="fl" style="border: 1px solid rgb(204, 204, 204); border-radius: 5px; height: 46px; box-sizing: border-box; padding: 0 10px; margin-top: 1px; width: calc(100% - var(--chanBoxSize) - 20px)" placeholder="채널 종류를 입력해주세요" id=""> -->
        <!-- <p style="font-size: 1rem; float: left; width: 100px; height: 35px; line-height: 35px; text-align: left; padding: 0 5px;">직접 입력</p>
        -->
        <!-- <div style="width: 100%; height: 80px; background: rgb(103 104 167 / 22%); float: left;"> </div> -->

        <div @click="setParam" class="creChanBigBtn fl mtop-2 mbottom-05">선택완료</div>

    </div>
  </div>
</template>

<script>
import commonConfirmPop from '../../popup/confirmPop/Tal_commonConfirmPop.vue'
export default {
  data () {
    return {
      selectedType: '',
      // inputTypeTeam: '',
      failPopYn: false,
      businessTypeList: [
        { teamNameMtext: '기업', teamType: 'C' },
        { teamNameMtext: '정부', teamType: 'G' },
        { teamNameMtext: '학교', teamType: 'S' },
        { teamNameMtext: '종교 단체', teamType: 'H' },
        { teamNameMtext: '동호회', teamType: 'D' },
        { teamNameMtext: '병원', teamType: 'Q' },
        { teamNameMtext: '약국', teamType: 'V' },
        { teamNameMtext: '매장', teamType: 'A' },
        { teamNameMtext: '식당', teamType: 'P' }
      ]
    }
  },
  components: {
    commonConfirmPop
  },
  methods: {
    setParam () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (this.selectedType !== '') {
      //   if (this.selectedType === 'inputType') {
      //     if (this.inputTypeTeam === '') {
      //       this.failPopYn = true
      //       return
      //     } else {
      //       param.teamType = this.inputTypeTeam
      //     }
      //   } else {
        param.teamType = this.selectedType
        // }
        this.$emit('makeParam', param)
      } else {
        this.failPopYn = true
      }
      // param.pageType = 0
      // this.$emit('makeParam', param)
    },
    selectChanType (type) {
      this.selectedType = type
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
.confirmPopWrap{width: 90%; position: absolute; z-index: 9999; top: 50%; ; border-radius: 10px; background: #FFFFFF;
padding: 0.5rem 2rem;
left: 5%;
overflow: auto;
/* height: 70%; */
max-height: 600px;
box-shadow: 2px 3px 6px 3px #ccc;
transform: translateY(-50%);
}
.creChanIntroTextWrap{padding: 10px 0; float: left; }
.creChanIntroTextWrap p{font-size: 18px; }

.creChanBigBtn{
  height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;
  width: 100%;

  margin-top: 10px;
  /* bottom: 10px;
  left: 5%; */
}
.activeTypeBox{background: #6768a7; color: #fff;}
.activeTypeBox p {color: #fff;}
</style>
