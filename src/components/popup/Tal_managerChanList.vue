<template>
    <div style="width: 100vw; height: 100vh; position: fixed; z-index: 9999; top: 0; left: 0; background: #fff; ">
        <popHeader :headerTitle="this.headerTitle" @closeXPop="closeXPop" :thisPopN="this.thisPopN" class="commonPopHeader"/>
        <div style="width: 100%; height: calc(100vh - 60px); margin-top: 60px;">
            <!-- <div v-if="creChanResultYn === 'tt'"  style="width: 60%; height: 100%; margin: 0 auto; margin-top: 40%;">
             -->
             <div v-if="chanList.length === 0" style="width: 60%; height: 100%; margin: 0 auto; margin-top: 40%;">
                <div id="noneChanPage">
                  <img class="mbottom-2" src="../../assets/images/main/message_logo.png" alt="">
                  <p class="mbottom-1 font15" >현재 생성된 채널이 없습니다!</p>
                  <div class="creChanBigBtn" @click="this.creChanPopYn = true">채널 생성하기</div>
                </div>
            </div>
            <div  style="width: 100%; height: 100%; padding: 0 1.5rem;">
<!--               <div style="background: #ccc; width: 150px; height: 150px; border-radius: 15px;" v-for="(value) in chanList" :key="value.teamKey">

              </div> -->
              <div  v-for="(value, index) in chanList" :key="index" style="width: 150px; float: left; display: flex; flex-direction: column; height: 150px; ">
                <div style="width: 130px; height: 130px; border-radius: 10px; border: 1px solid #ccc;" @click="this.goAdmPage(value)"></div>
                <span v-html="changeText(value.nameMtext)"></span>
              </div>
            </div>

            <div v-if="creChanPopYn" style="width: 100vw; height: 100vh; position: fixed; z-index: 99999; top: 0; left: 0; background: #fff; ">
                <creChanPop @successCreChan="successCreChan"  @closePop="this.creChanPopYn = false"/>
            </div>
            <div v-if="creChanResultYn" style="width: 100%; height: calc(100vh - 60px); margin-top: 60px;">
                <div style="width: 60%; height: 100%; margin: 0 auto; margin-top: 40%;">
                    <img class="mbottom-2" src="../../assets/images/main/message_logo.png" alt="">
                    <p class="mbottom-1 font15" >채널이 성공적으로 생성되었습니다!</p>
                    <div @click="creChanResultYn = false" class="creChanBigBtn">내 채널 둘러보기</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import creChanPop from './creChannel/Tal_creChannelPop.vue'
export default {
  data () {
    return {
      creChanPopYn: false,
      creChanResultYn: false,
      headerTitle: '내 채널',
      chanList: []
    }
  },
  components: {
    creChanPop
  },
  computed: {
  },
  async created () {
    await this.getManagerChanList()
  },
  methods: {
    closeXPop () {
      this.$emit('closePop')
    },
    successCreChan () {
      this.creChanPopYn = false
      this.creChanResultYn = true
    },
    async getManagerChanList () {
      var paramMap = new Map()
      var userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      paramMap.set('userKey', userKey)
      paramMap.set('followerType', 'A')
      var resultList = await this.$getTeamList(paramMap)
      this.chanList = resultList.content
      // alert(JSON.stringify(this.chanList))
      // this.$emit('closeLoading')
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      if (changeTxt) { return changeTxt }
      // if (changeTxt !== undefined) { return changeTxt }
    },
    goAdmPage (value) {
      localStorage.setItem('sessionTeam', JSON.stringify(value))
      this.$router.replace({ name: 'admChanMain' })
    }
  }
}
</script>
<style scoped>
.commonPopHeader{box-shadow: 0px 7px 9px -9px #00000036;}

.creChanIntroTextWrap{padding: 10px 0; float: left; border-bottom: 1px solid #ccc;}
.creChanIntroTextWrap p{font-size: 18px; }

.creChanBigBtn{width: 100%; height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;}
</style>
