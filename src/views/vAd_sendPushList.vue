<template>
    <div class="w-100P" style="height: 100%">
      <readPop v-if="readPopShowYn" @closePop="closeReadPop"/>
        <gPageTitle class="pleft-2" titleText="보낸알림목록" style="margin-bottom: 0;" @clickEvnt = "previewChan" :btnYn ="false" />
        <div style="width: 100%; height: 100%;">
            <subLeftMenu pageType="sendPushList" title="전체알림" />
            <div class="scrollArea" style="height: calc(100% - 40px); padding: 0;">
                <div class=" pushCardListWrap" style="position: relative; border-right: 1px solid #E1E1E1;     padding: 1rem;">
                  <detailSearchPop v-show="this.searchPopShowYn" />
                    <p class="listTitle fl mtop-05">전체알림</p>
                    <div class="searchFilterWrap">
                      <div class="fl listSearchBtnWrap" style="">
                        <p class="fl deletePushBtn">페이지 전체삭제</p>
                        <gWhiteButton btnName="필터" class="mright-05" v-on:click="openSearchPop"/>
                        <gWhiteSelect defaltText="정렬" class="mright-05" />
                        <gWhiteButton btnName="검색" v-on:click="openSearchPop" class=""/>
                      </div>
                    </div>
                    <searchResult class="" v-if="this.searchList.length > 0" :searchList="this.searchList" @changeSearchList = "changeSearchList" />
                    <div style="width: 100%; height: 1rem;  float: left;" />
                    <div class="overFlowYScroll pushListWrap">
                      <pushCard @openPushDetail="openDetail" @openPop="openReadPop()" :class="this.selectedPushKey === value.pushKey? 'selectedCard':''" style="" v-for="(value,index) in pushList" :pushKey="value.pushKey" :sendListPageYn="true" :key="index" :pushTitle="value.pushTitle" :recvDate="value.recvDate" :sendDate="value.recvDate"  :sendGroup="value.sendGroup" />
                    </div>
                    <div style="width: 100%; position: absolute; left: 0; border-top: 1px solid #ccc; bottom: 0; height: 4rem; display: flex; justify-content: center; padding-top: 1rem;">
                      <div class="pageWrap">
                        <img class="cursor: pointer;" src="../resource/images/leftPaginateIcon.svg" alt="">
                        <span>{{pagination.currentPage}}</span><span>/</span><span>{{pagination.totalPage}}</span>
                        <img class="cursor: pointer;" src="../resource/images/rightPaginateIcon.svg" alt="">
                      </div>
                      <div style="background-color: #EFEFF6; min-width: 100px; position: absolute; right: 1rem; height: 30px; border-radius: 3px; text-align: center; padding: 0.3rem 0; font-size: 15px; color: #000000;">보기개수: {{pagination.pageSize}}</div>
                    </div>
                </div>
                <div v-if="this.selectedPushKey !== ''" class="pushDetailWrap" style="    padding: 1rem 0;">
                    <div class="w-100P" style=" height: 2rem;">
                      <p class="listTitle fl" style="">알림 상세</p>
                      <div class="fr" style="padding-right: 1.5rem">
                        <p class="fl deletePushBtn">삭제</p>
                        <gButton btnType="light" @click="openReadPop" class="detailReadBtn" style="background-color: #EFEFF6!important;" btnName="수신확인"/>
                      </div>
                    </div>
                    <div class="detailBox" style="">
                        <div class="detailTitleWrap">
                            <img class="fl mright-1" src="../resource/images/channer_logo.png" style="width: 3rem" alt="">
                            <div class="fl">
                                <p class="chanName">{{this.detailPushInfo.chanName}}</p>
                                <p style="sendDate">{{this.detailPushInfo.sendDate}}</p>
                            </div>
                            <img src="../resource/images/selectedStarIcon.svg" style="float: right; margin-top: 0.5rem;" alt="">
                        </div>
                        <div class="pushDetailTitle" v-html="this.detailPushInfo.pushTitle"></div>
                        <div class="pushDetailBody" v-html="this.detailPushInfo.pushBody"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import subLeftMenu from '../components/cAd_subLeftMenu.vue'
import pushCard from '../components/cAd_pushCardRow.vue'
import readPop from '../components/cAd_readCheckPop.vue'
export default {
  methods: {
    openSearchPop () {
      if (this.searchPopShowYn === true) { this.searchPopShowYn = false } else { this.searchPopShowYn = true }
    },
    changeSearchList (changeList) { this.searchList = changeList },
    addSearchKey (searchKey) {
      this.searchList.push(searchKey)
      this.searchPopShowYn = false
    },
    openReadPop () { this.readPopShowYn = true },
    closeReadPop () { this.readPopShowYn = false },
    openDetail (key) { this.selectedPushKey = key }
  },
  data () {
    return {
      selectedPushKey: '',
      readPopShowYn: false,
      searchPopShowYn: false,
      selectedSearchKeyIndex: 0,
      pagination: { totalPage: 10, currentPage: 1, pageSize: 10 },
      detailPushInfo: { chanName: '더알림대학교', pushKey: '0', pushTitle: '기숙사 신청일 안내기숙사 신청일 안내기숙사 신청일 안내', pushBody: '기숙사 신청일은 각 학년별로 다릅니다.<br>1학년은 2월 7~11일 2학년은 2월 14~18일 3~4학년은 2월 21~25일 추가모집은 2월 28일 ~ 3월 1~4일입니다.<br><br>각 학년별로 일정을 잘 확인하시어 기숙사 입실을 잘 하실 수 있길 바랍니다.<br><br>더알림 대학교는 여러분의 성공적인 학업과 성취를 위해 최선을 노력을 다할 것입니다.<br><br>감사합니다.', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
      pushList: [
        { pushKey: '0', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '1', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '2', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '3', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '4', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '5', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '6', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '7', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '8', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '9', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '10', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '11', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '12', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' },
        { pushKey: '13', pushTitle: '기숙사 신청일은 각 학년별로 다릅니다', recvDate: '22.1.7.15:32:37', sendDate: '22.1.7.15:32:37', sendGroup: '전체대상' }
      ],
      searchList: []
    }
  },
  components: {
    subLeftMenu,
    pushCard,
    readPop
  }
}
</script>

<style scoped>
.deletePushBtn{font-size: 12px; color: #BFBFDA; line-height: 30px; margin-right: 0.5rem;}

.searchKeyBar{border-left: 1px solid rgb(225, 225, 225) }
.pushCardListWrap{min-width: 400px; width: calc(100% - 500px); float: left; height: 100%; padding: 0 0.5rem; padding-right: 1rem; margin-right: 3rem;}
.activeColor{color: #6768A7;}
.commonColor{color: #131523;}
.detailBox{background-image: url('../resource/images/detail_box.png'); padding: 1rem 2rem; padding-right: 3.5rem; height: 800px; background-size: auto; width: 100%;background-position: left top;background-size: contain;background-repeat: no-repeat;}
.listTitle{color:#6768A7; font-size: 15px; font-weight: bold;}

.pushDetailWrap{width: 450px;height: 100%; float: left;}
.pushDetailTitle{width: 100%; padding: 1rem 1.3rem; color: #010101; font-weight: bold; line-height: 22px; font-size: 15px;}
.selectedCard{background-color: #9196BD66;}
.pushDetailBody{width: 100%; height: calc(100% - 5rem); padding: 1rem 1.3rem; color: #010101; line-height: 22px; font-size: 14px;}
.pushListWrap{height: calc(100% - 10rem);padding: 1rem 1rem;width: 100%;padding-left: 0.5rem;}
.detailTitleWrap{width: 100%; height: 6rem; border-bottom: 0.5px solid #CFCFCF; padding: 1.5rem 0rem;}

.detailTitleWrap .chanName{font-weight: bold; font-size: 20px; margin-bottom: 0.2rem; color: #6768A7;}
.detailTitleWrap .sendDate{font-size: 14px; color: #A1A1A1;}

.detailReadBtn{background-color: #EFEFF6!important; color: #000!important; font-size: 12px!important;}
</style>
