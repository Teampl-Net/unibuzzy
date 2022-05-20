<template>
  <!-- <div style="width: 100%; height: 100%; padding: 0 20px; > -->

<selecTypePopup  v-if="typePopYn" @no='typePopYn=false' @makeParam='setTypeData' />
<seleciconBgPopup v-if="iconBgPopupYn=='iconPop' || iconBgPopupYn=='bgPop'"  @no='iconBgPopupYn=false' @makeParam='setIconOrBGData' :opentype="iconBgPopupYn" />
  <div style="width: 100%; height: 100%;  overflow: auto; position:absolute; top:50px;" >
    <!-- <input type="file" id="input-Logoimgfile" style="display:none" />
    <input type="file" id="input-Backimgfile" style="display:none" /> -->
    <div style="width: 100%; position: absolute; left:0; min-height: 300px; height: calc(100% - 110px); ">
      <img :src="selectBg" style="width:100%"/>
      <form @submit.prevent="formSubmit" method="post" style="position: absolute; right: 1.5rem; top: 12.5rem;" >
          <label @click="iconBgPopupYn='bgPop'" for="input-Backimgfile" style=" color: white; padding: 0.25rem 0.5rem;background-color: black; opacity: 0.5; font-size:14px">배경편집</label>
      </form>

      <!-- <div id='chboxtest' style="font-size:14px; position: absolute; width: 100%; min-height: 100px; background: #FFF; top: 10rem ; box-shadow: rgb(189 189 189) 0px -1px 12px -4px; padding: 0 2rem; height: calc(100% - 50px);"> -->
              <div id='chboxtest' style="font-size:14px; position: absolute; width: 100%; min-height: 100px; background: #FFF; top: 15rem; padding: 0 2rem;    height: calc(100% - 140px); ">

        <div style="border:1px solid #ccc; width: 120px; height: 120px; border-radius: 120px; margin: 0 auto; margin-top: -80px; background: #ffffff66; position: relative;display:flex; flex-direction: column; justify-content: center; align-items: center;">
          <img :src="selectIcon" style="width:90%"/>
          <form @submit.prevent="formSubmit" method="post" style="position: absolute; left:40%; bottom:0; transform: translate(-30%)" >
              <label @click="iconBgPopupYn='iconPop'" for="input-Logoimgfile" style=" color: white; padding: 0.25rem 0.5rem;background-color:black; opacity: 0.5; font-size:14px">로고편집</label>
          </form>
        </div>

        <!-- <div style="display: flex; align-items: center; justify-content: space-around;"> -->
        <div style="width:100%; height: 30px" class="mtop-1">
          <p class="textLeft font14 fl" style="line-height: 30px;">채널명</p>
          <input v-model="inputChannelName" type="text" placeholder="채널명을 입력해주세요" class="creChanInput"  id="channelName" style="width: 80%; height: 25px; float: right; border: none;border-bottom: 1px solid #ccc; ">
        </div>
        <div style="width:100%; height: 50px" class="mtop-1">
          <p class="textLeft font14 fl" style="line-height: 30px;">설명</p>
          <!-- <input type="text" placeholder="간단한 소개글을 입력해주세요." name="" value="" class="creChanInput"  id="channelName" style="width: 80%; height: 50px; float: right; padding-right: 10px; border: none;border-bottom: 1px solid #ccc;"> -->
          <textarea v-model="inputChannelMemo" style="width: 80%; height: 50px; float: right;  border: none;border: 1px solid #ccc;resize:none; " placeholder="간단한 설명을 입력해주세요."/>
        </div>
        <div style="width:100%; height: 30px" class="mtop-1" >
          <p class="textLeft font14 fl" style="line-height: 30px;">산업군</p>
          <div style="width: 80%; height: 100%; float: right; border: none;border: 1px solid #ccc;" @click="channelTypeClick">
            <p class="textLeft font14 fl mleft-05" style="line-height:30px;" >{{selectTypeText}}</p>
          </div>
        </div>
        <div style="width:100%; height: 30px" class="mtop-1">
          <p class="textLeft font14 fl" style="line-height: 30px;">키워드</p>
          <div style="width: 80%; height: 100%; float: right; border: none; display:flex; overflow: auto; ">
            <!-- <input v-for="(input, index) in 3" :key="index" class="categoryBox" style="border: 1px solid #ccc; flex:1" @change="setKeyword(index,text)" /> -->
            <input class="categoryBox" style="border: 1px solid #ccc; flex:1" v-model="keyWord0" />
            <input class="categoryBox" style="border: 1px solid #ccc; flex:1" v-model="keyWord1" />
            <input class="categoryBox" style="border: 1px solid #ccc; flex:1" v-model="keyWord2" />
          </div>
        </div>

      </div>
    </div>
  </div>
<gConfirmPop confirmText='정말로 생성 하시겠습니까?' @no='okPop=false' v-if="okPop"  />



  <div @click="setParam" class="creChanBigBtn fl mtop-1;">채널 만들기</div>
</template>

<script>
import selecTypePopup from './Tal_selectChanTypePopup.vue'
import seleciconBgPopup from './Tal_selectChaniconBgPopup.vue'
export default {

  mounted () {
    this.loadingClose()
  },
  data () {
    return {
      typePopYn: false,
      iconBgPopupYn: '',
      inputChannelName:'팀플',
      inputChannelMemo:'안녕하세요. 팀플입니다.',
      selectTypeText:'클릭해서 산업군을 선택해주세요.',
      selectType:'',
      selectIcon:'/resource/channeliconbg/CHAR01.png',
      selectBg:'/resource/channeliconbg/BG01.jpg',
      keyWord0:'',
      keyWord1:'',
      keyWord2:'',

      okPop:false,

    }
  },
  methods: {
    channelTypeClick(){
      if (this.typePopYn == false){
        this.typePopYn = true
      }
    },
    setTypeData(param){
      // alert(param.teamType)
      this.selectType = param.teamType
      switch (param.teamType){
        case 'C':
          this.selectTypeText = '기업'
          break;
        case 'G':
          this.selectTypeText = '정부'
          break;
        case 'S':
          this.selectTypeText = '학교'
          break;
        case 'H':
          this.selectTypeText = '종교'
          break;
        case 'D':
          this.selectTypeText = '동호회'
          break;
        case 'Q':
          this.selectTypeText = '병원'
          break;
        case 'V':
          this.selectTypeText = '약국'
          break;
        case 'A':
          this.selectTypeText = '매장'
          break;
        case 'P':
          this.selectTypeText = '식당'
          break;

      }

      this.typePopYn = false
    },
    setIconOrBGData(param){
      if(this.iconBgPopupYn === 'iconPop'){
        this.selectIcon = param.selectedId
      }else if(this.iconBgPopupYn === 'bgPop'){
        this.selectBg = param.selectedId
      }
      this.iconBgPopupYn = false
    },

    setParam(){
      var g_param = new Object()
      if (this.selectedType !== '') {
          g_param.nameMtext = this.inputChannelName
          g_param.teamMemo = this.inputChannelMemo
          g_param.teamType = this.selectType
          g_param.teamIcon = this.selectIcon
          g_param.teamBack = this.selectBg
          g_param.teamkeyword = this.keyWord0+','+this.keyWord1+','+this.keyWord2
        // alert(param.teamType+'\n' + param.teamIcon+'\n'+param.teamBack+'\n'+param.teamkeyword)
        try{

          this.$requestCreChan(g_param)
          this.$emit('successCreChan')

        }catch(e){
          alert('채널 생성 오류입니다.')
        }
        // this.$emit('makeParam', param)
      } else {
        alert('채널 종류를 선택해주세요!')
      }

    },

    loadingClose () {

      // this.$emit('closeLoading')
    },

  },
  computed: {
  },

  components:{
    selecTypePopup,seleciconBgPopup
  },

}
</script>
<style scoped>
.creChanIntroTextWrap{padding: 10px 0; float: left; border-bottom: 1px solid #ccc;}
.creChanIntroTextWrap p{font-size: 18px; }

.creChanBigBtn{
  height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;
  /* width: 100%;  */

  /* add Jeong */
  width: 90%;
  position: fixed;
  bottom: 10px;
  left: 5%;
}
.activeTypeBox{background: #6768a7; color: #fff;}
.activeTypeBox p {color: #fff;}


.categoryBox{min-width: 70px; margin-right: 5px; height: 25px;float: left; border-radius: 5px;}
</style>
