<template>
  <div style="width: 100%; height: 100%;">
    <gPageTitle class="pleft-2" titleText="채널메인" @clickEvnt = "previewChan" v-on:click="openPreviewPop()"  />
    <div id="mainChanPage" class="pleft-2 fl" style="">
      <div class="mainPreviewWrap">
        <div class="editBtn">
          <gButton :btnName="this.previewBtn" @click="changeProfileMode"/>
          <gWhiteButton class="mleft-05" v-if="this.previewBtn === '완료'" @click="changeProfileMode" btnName="취소" />
        </div>
        <div class="changeBackgroundImgBtn" v-if="this.previewBtn === '완료'"><img src="../resource/images/changeImgIcon.svg" alt=""></div>
        <div style="position: absolute; top: 220px; z-index: 2; left: 175px;">
          <img src="../resource/images/channer_logo.png" style="width: 10rem; height: 10rem; border-radius: 10rem; " alt="">
          <div class="changeProfileBtn" v-if="this.previewBtn === '완료'"><img src="../resource/images/changeImgIcon.svg" alt=""></div>
        </div>
        <div class="chanInfoWrap">
          <div style="text-align: center;">
            <span class="mright-05 cursorP" v-if="this.editChanNameYn === false" style="color: #303030; font-weight: bold; font-size: 20px;">{{this.chanInfo.chanName}}</span>
            <img v-if="this.previewBtn === '완료' && this.editChanNameYn === false" class="cursorP" src="../resource/images/chanDetail/editIcon.svg"   @click="this.editChanNameYn = true"  alt="">
            <div v-if="this.editChanNameYn === true" style="width: 100%; height: 2rem; display: flex; justify-content: center;">
              <input type="text" name=""  v-model="this.chanInfo.chanName" class="fl commonInput w-60P mright-05" id="">
              <gWhiteButton style="float: left;" btnName="수정"  @click="this.editChanNameYn = false" />
            </div>
            <p class="mtop-05">채널개설일: {{this.chanInfo.creDate}}</p>
          </div>
          <div style="padding: 1.5rem;">
            <div class="detailRow"><img class="mright-05 mtop-05 fl" src="../resource/images/chanDetail/emailIcon.svg" alt="">
              <span class="fl" style="">이메일&nbsp;&nbsp;&nbsp;{{this.chanInfo.email}}</span>
            </div>
            <div class="detailRow"><img class="mright-05 mtop-05 fl" src="../resource/images/chanDetail/mobileIcon.svg" alt="">
              <span class="fl" style="">연락처&nbsp;&nbsp;&nbsp;{{this.chanInfo.mobile}}</span>
            </div>
            <div class="detailRow"><img class="mright-05 mtop-05 fl" src="../resource/images/chanDetail/introduceIcon.svg" alt="">
              <span class="fl" style="" v-if="this.editCommentYn === false" v-html="this.chanInfo.comment"></span>
              <textarea name="" v-model="this.chanInfo.comment" v-if="this.editCommentYn=== true" id="" class="commonInput mtop-02 w-100P" style="min-height: 80px;" cols="30" rows="10"></textarea>
              <img v-if="this.previewBtn === '완료' && this.editCommentYn === false"  @click="this.editCommentYn = true" class="editIcon cursorP" src="../resource/images/chanDetail/editIcon.svg" alt="">
              <gWhiteButton v-if="this.editCommentYn=== true" style="position: absolute; right: 0" btnName="수정"  @click="this.editCommentYn = false" />
            </div>
            <div class="detailRow borderNonIm"><img class="mright-05 mtop-05 fl" src="../resource/images/chanDetail/addressIcon.svg" alt="">
              <span class="fl" style="">주소&nbsp;&nbsp;&nbsp;</span>
              <span v-if="this.editAddress === false" class="fl">{{this.chanInfo.address}}</span>
              <input v-model="this.chanInfo.address" v-if="this.editAddress === true"  type="text" name="" class="commonInput mtop-02000000000" style="width: calc(100% - 80px)!important;" id="">
              <img v-if="this.previewBtn === '완료'" @click="this.editAddress = true"  class="editIcon cursorP" src="../resource/images/chanDetail/editIcon.svg" alt="">
              <gWhiteButton v-if="this.editAddress=== true" style="position: absolute; right: 0" btnName="수정"  @click="this.editAddress = false" />
            </div>
          </div>
        </div>
      </div>
      <div style="float: left; width: calc(100% - 600px); height: 100%; padding: 0 2rem;">
        <p class="mainTitleText">통계</p>
        <div style="width: 100%; height: 8rem; padding: 0.5rem; display: flex; text-align: center; margin-top: 2rem;">
          <div class="statisticEle" style="padding-left: 0;"><p class="statisticTitle">총 구독자 수</p><p class="statisticBody">명</p></div>
          <div class="statisticEle"><p class="statisticTitle">채널 방문자 수(Today)</p><p class="statisticBody">명</p></div>
          <div class="statisticEle" style="padding-right: 0;"><p class="statisticTitle">누적 발송 알림 수</p><p class="statisticBody">명</p></div>
        </div>
        <p class="mainTitleText mtop-1 mbottom-1">최근알림</p>
        <pushCard @openPop="openReadPop" style="" v-for="(value,index) in chanInfo.pushList" :sendListPageYn="true" :key="index" :pushTitle="value.pushTitle" :recvDate="value.recvDate" :sendDate="value.recvDate"  :sendGroup="value.sendGroup" />
      </div>
    </div>
  </div>
</template>

<script>
import pushCard from '../components/cAd_pushCardRow.vue'
// @ is an alias to /src
export default {
  name: 'Home',
  data () {
    return {
      chanInfo: '',
      previewBtn: '편집',
      editChanNameYn: false,
      editCommentYn: false,
      editAddress: false,
      pushList: ''

    }
  },
  mounted () {
    this.getChanInfo()
  },
  components: {
    pushCard
  },
  methods: {
    getChanInfo () {
      this.chanInfo = {
        chanName: '더알림대학교 대외협력처',
        creDate: '2021.12.21',
        email: 'thealimuniv@pushmsg.net',
        mobile: '02-429-1234',
        comment: '나한테 꼭 필요한 알림만 선택해서 구독!<br>보기좋게 잘 정리된 알림목록',
        address: '서울특별시 중구 더알림로 1길',
        statistics: { totalFollower: '1291', visitCnt: '1291', totalSendPushCnt: '1291' },
        pushList: [
          { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
          { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
          { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
          { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
          { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' }
        ]
      }
    },
    openPreviewPop () {
      this.$emit('openPop', 'previewPop')
    },
    changeProfileMode () {
      if (this.previewBtn === '편집') {
        this.previewBtn = '완료'
      } else {
        this.previewBtn = '편집'
      }
    }
  }
}
</script>

<style scoped>
*{color: #303030; font-size: 15px;}
#mainChanPage{width: 100%; height: calc(100% - 50px); padding: 2rem 3rem;}
.editBtn{position: absolute; top: 10px; right: 10px; cursor: pointer; min-width: 50px; text-align: center; display: flex; justify-content: center; align-items: center; height: 30px;}
.mainPreviewWrap{width: 500px; height: 800px; position: relative; border-radius: 10px; margin-right: 2rem; box-shadow: 0 0 9px 0 #00000029; background: #ccc; float: left;}
.changeProfileBtn{cursor: pointer; width: 26px; height: 26px; border-radius: 26px; background:#FFFFFF; position: absolute; top: 125px; left: 125px; box-shadow: 0 0 9px 2px #00000029; z-index: 3; padding-left: 0.35rem; padding-top: 0.1rem;}
.changeBackgroundImgBtn{cursor: pointer; width: 26px; height: 26px; border-radius: 26px; background:#FFFFFF; position: absolute; top: 300px; right: 15px; box-shadow: 0 0 9px 2px #00000029; z-index: 3; padding-left: 0.35rem; padding-top: 0.1rem;}
.chanInfoWrap{width: 100%; padding-top: 5rem;height: 460px; background: #FFFFFF; position: absolute; bottom: 0; border-radius: 0 0 10px 10px;}
.detailRow{ width: 100% ; border-bottom: 1px solid #E1E1E1; min-height: 3.5rem; padding: 0.5rem 0; padding-right: 50px; display: flex; position: relative; align-items: flex-start; }
.detailRow span{line-height: 30px;}
.borderNonIm{border: none!important}
.detailRow .editIcon{position: absolute;right: 10px; top: 15px; cursor: pointer;}
.statisticEle{ width: 33.3%; display: flex; flex-direction: column;}
.statisticEle .statisticTitle{color: #6768A7; font-size: 15px;}
.statisticEle .statisticBody{color:#4A4A4A; font-size: 30px; font-weight: bold; margin-top: 0.5rem;}
.mainTitleText {color: #3A3A3A; font-size: 18px; font-weight: bold;}
</style>
