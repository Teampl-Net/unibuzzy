<template>
    <div class="w-100P" style="height: 100%">
      <pushDetailPop v-if="this.pushDetailPopShowYn" @closeDetailPop="closeDetailPop"/>
        <gPageTitle class="pleft-2" titleText="알림작성" @clickEvnt = "popBtnClick" :btnYn ="false" pageType="writePush"/>
        <div :style="toolBoxWidth" style="padding: 2rem 0; width: calc(100% - var(--width)); float: left; height: calc(100% - 2rem); margin-top: -1rem; float: left; background:#F9F9F9;">
          <div  :style="setColor" style="width: 700px; height: calc(100% - 1rem); position: relative; margin: 0 auto; margin-top: 3rem; padding: 4rem 4rem; box-shadow: 0 0 9px 0px #00000029; border-radius: 10px 10px 0 0;">
            <gButton btnName="편지지 변경" @click="changeOption('2')" class="fr" style=" border: 1px solid #FFFFFF; position: absolute; top: 1.5rem; right: 2rem;" />
            <div class="whitePaper">
              <pushDetailTile :chanName="this.chanInfo.chanName" creDate="2021년 2월 22일" />
                <gButton class="fr" @click="changeOption('1')"  style="float: right!important; position: absolute; right: 1.5rem; margin-top: 0.5rem;" btnName="최근알림<br>불러오기"  />
              <div class="overFlowYScroll" style="padding-right: 1rem; height: 100%; width: 100%;">
                <div class="pageTopArea">
                  <div class=""><p style="">제목</p><input type="text" class="commonInput inputArea fl"  style="" name="" id=""></div>
                  <div class="">
                    <p style="">수신대상</p>
                    <div class="inputArea" style="border: 1px solid #BFBFDA; border-radius: 5px; height: 30px; float: left; position: relative; padding-right: 3rem;">
                      <img style="position: absolute; top: 0.3rem; right: 0.5rem; cursor: pointer;" @click="changeOption(0)" src="../resource/images/organizationIcon.svg" alt="">
                      </div>
                    </div>
                </div>
                <div style="    min-height: 500px; height: calc(100% - 10rem);">
                  <textarea style="resize: none; border-radius: 5px; border: 1px solid #BFBFDA; width: 100%; height: calc(100% - 7rem); padding: 1rem; box-sizing: border-box; color: #010101; font-size: 15px;" name="" id="" cols="30" rows="10"></textarea>
                  <div @click="changeOption(3)" style="cursor: pointer; width: 80px; height: 80px;margin-top: 0.5rem;border-radius: 5px; background: #A9AACD; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <img src="../resource/images/cameraIcon.svg" style="width: 2.5rem;" alt="">
                    <p style="color: #FFFFFF; font-size: 10px; margin-top: 0.5rem;">첨부하기</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--<div id="toolBox" :style="toolBoxWidth"  v-if="this.toolShowYn" style="padding: 1rem; float: left; width: var(--width); height: 100%; background: #FFFFFF;"> -->
        <div id="toolBox" :style="toolBoxWidth" style="margin-top: -1rem; float: left; height: 100%; background: #FFFFFF; display: flex;  width: var(--width); height: 100%;  border-left: none;">
          <div class="editorOption">
            <div class="mtop-1" v-on:click="changeOption(0)" :class="this.selectedTab === 0 ? 'activeColor': '' "> <img src="../resource/images/recvGroupIcon.svg" alt="" v-if="this.selectedTab === 0"><img src="../resource/images/latestPush_lightColor.svg" alt="" v-else> <p style="">수신자</p></div>
            <div v-on:click="changeOption(1)" :class="this.selectedTab === 1 ? 'activeColor': '' "> <img src="../resource/images/latestPush.svg" alt="" v-if="this.selectedTab === 1"><img src="../resource/images/latestPush_lightColor.svg" alt="" v-else> <p style="">최근알림</p></div>
            <div style="" v-on:click="changeOption(2)" :class="this.selectedTab === 2 ? 'activeColor': '' "> <img src="../resource/images/paperIcon.svg" alt="" v-if="this.selectedTab === 2"><img src="../resource/images/paperIcon_lightColor.svg" alt="" v-else><p style="">편지지</p></div>
            <div style="" v-on:click="changeOption(3)" :class="this.selectedTab === 3 ? 'activeColor': '' "> <img src="../resource/images/uploadIcon.svg" alt="" v-if="this.selectedTab === 3"><img src="../resource/images/uploadIcon_lightColor.svg" alt="" v-else><p style="">업로드</p></div>
          </div>
          <div class="toolContentsArea">
            <div class="popFooter" v-if="this.selectedTab != '1'"  style="justify-content: flex-end; position: absolute; right: 0; top: 0rem">
              <gWhiteButton @click="closeToolBox" class="mright-05" btnName="초기화" />
              <gButton @click="closeToolBox" class="mright-05" btnName="적용" />
              <!--<gWhiteButton @click="closeToolBox" btnName="닫기" /> -->
            </div>
            <div id="selectRecvMember"  v-if="this.selectedTab == '0'">
              <p style="color: #6768A7; font-weight: bold; font-size: 15px;margin-bottom: 1rem;">수신자 선택</p>
              <div style="padding: 0.5rem; height: 100%"><organization :chanInfo="this.chanInfo" /></div>
            </div>
            <div style="width: 100%;" v-if="this.selectedTab == '1'" >
              <p style="color: #6768A7; font-weight: bold; font-size: 15px;margin-bottom: 1rem;">최근알림 불러오기</p>
              <gSearchBox class="mbottom-1" style="border: 1px solid #BFBFDA!important; border-radius: 5px;"/>
              <pushCard  @openPushDetail="openPushDetail" style="box-shadow: none; border: 1px solid #E1E1E1" v-for="(value,index) in pushList" :key="index" :sendListPageYn="false" :pushBody="value.pushBody" :pushTitle="value.pushTitle" />
            </div>
            <div style="width: 100%;" v-if="this.selectedTab == '2'" >
              <p style="color: #6768A7; font-weight: bold; font-size: 15px;margin-bottom: 1rem; ">편지지 선택</p>
              <div style="width: 100%; height: 100%; float: left; margin-top: 1rem;">
                <div v-for="(value, index) in this.colorList" :key="index" :class="this.selectedC === index ? 'selectedColor' : ''" class="colorBox cursorP" @click="selectedColor(index)" :style="'background-color: '+ value"></div>
              </div>
            </div>
            <div style="width: 100%; padding: 0.5rem; " v-if="this.selectedTab == '3'" >
              <p style="color: #6768A7; font-weight: bold; font-size: 15px;margin-bottom: 1rem; ">첨부하기</p>
                <gButtonL btnTitle="내 파일 업로드" />
                <gActiveBar :tabList="[{ display: '이미지', name: 'img' },{ display: '동영상', name: 'movie' }]" class="mtop-1"/>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
import pushDetailPop from '../components/cAd_pushDetailPop.vue'
import pushCard from '../components/cAd_pushCardRow.vue'
import pushDetailTile from '../components/cAd_gDetailTitle.vue'
import organization from '../components/cAd_organization.vue'
export default {
  data () {
    return {
      toolWidth: 500,
      // toolShowYn: false,
      selectedTab: 0,
      chanInfo: { chanName: '더알림대학교', group: [{ groupName: '입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처', groupKey: '0' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '학생복지처', groupKey: '2' }, { groupName: '학생', groupKey: '3' }] },
      colorList: ['#6768A7', '#BFBFDA', '#00000029', '#C8C8C8A3', '#E1E1E1', '#BFBFDA', '#EFEFF6', '#6768A7', '#A9AACD', '#A1A1A1', '#0000002E'],
      selectedC: 0,
      pushDetailPopShowYn: false,
      pushList: [
        { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', pushBody: '기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', pushBody: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', pushBody: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', pushBody: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' }
      ]
    }
  },
  computed: {
    toolBoxWidth () {
      return {
        '--width': this.toolWidth + 'px'
      }
    },
    setColor () {
      return {
        'background-color': this.colorList[this.selectedC]
      }
    }
  },
  methods: {
    openToolBox (tool) {
      this.selectedTool = tool
      this.toolShowYn = true
      // this.toolWidth = 400
    },
    closeToolBox () {
      // this.toolShowYn = false
      // this.toolWidth = 0
    },
    selectedColor (index) {
      this.selectedC = index
    },
    openPushDetail () {
      this.pushDetailPopShowYn = true
    },
    closeDetailPop () {
      this.pushDetailPopShowYn = false
      // this.toolShowYn = false
      // this.toolWidth = 0
    },
    changeOption (tab) {
      this.selectedTab = tab
    }
  },
  components: {
    organization,
    pushCard,
    pushDetailTile,
    pushDetailPop
  }
}
</script>
<style scoped>
.whitePaper {
      position: relative;
      width: 100%;
      margin: 0 auto;
      margin-top: 2rem;
      border-radius: 0.8rem;
      height: 100%;
      background-color: #ffffff;
      color: #363c5f;
      padding: 1.5rem;
      text-align: left;
      /* box-shadow: 0 0 9px 0 #ccc; */
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%  , 0 100%);
  }

  .whitePaper:after {
      content: '';
      position: absolute;
      display: block;
      width: 50px;
      height: 50px;
      background-color: #e1e1f2;
      bottom: 0;
      right: 0;
  }
  .whitePaper:before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  border-bottom: 50px solid #7373734f;
  border-right: 50px solid #F9F9F9;
  width: 0;
}
.pageTopArea{
  width: 100%; height: 6rem;
}
.pageTopArea >div{
  width: 100%; min-height: 3rem;
}
.pageTopArea p{width: 100px; font-size: 15px; color: #3A3A3A; float: left; line-height: 30px;}
.pageTopArea .inputArea{width: calc(100% - 100px); box-sizing: border-box}

#toolBox >.toolContentsArea {height: calc(100% - 6rem); width: calc(100% - 100px)}
.toolContentsArea {position: relative; padding: 0.5rem 1rem;  padding-right: 1.5rem;}

.colorBox{float: left; width: 55px; height: 42px; border-radius: 5px; margin-right: 0.5rem; margin-bottom: 0.5rem;}
.selectedColor{border: 2px solid #000}

.editorOption{display: flex; flex-direction: column; border-right: 1px solid #BFBFDA; width: 100px;}
.editorOption > div {height: 50px; text-align: center; padding: 0.5rem; cursor: pointer;}
.activeColor{background: #EFEFF6;}
.activeColor p{color: #6768A7!important;}
.editorOption p{color: #6768A7; color: #BFBFDA; font-size: 11px;}
</style>
