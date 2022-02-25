<template>
    <div class="w-100P" style="height: 100%">
      <recvPop v-if="this.recvPopShowYn" :regiType="this.popType" @closePop="this.recvPopShowYn = false"/>
      <selectGroupPop v-if="movePopShowYn" :type="this.moveType" :popHeaderTitle="this.popHeaderTitle" @closeMovePop="closeMovePop" />
      <div class="searchBalloon" v-show="this.searchPopShowYn">
        <gSearchBox style="width: 100%;" @searchKey="addSearchKey" />
        <div id="filterWrap" style="padding: 1rem 0; ">
          <img src="../resource/images/filter.svg" class="fl mright-05" style="margin-top: 0.1rem;" alt=""><p style="color: #3A3A3A; font-size: 12px; float: left;">필터</p>
        </div>
      </div>
        <gPageTitle class="pleft-2" titleText="수신대상관리" style="margin-bottom: 0;" @clickEvnt = "previewChan" :btnYn ="false" />
        <div style="width: 100%; height: 100%;">
            <subLeftMenu pageType="recvUserList" title="그룹관리" />
            <div class="overFlowYScroll scrollArea" style="height: calc(100% - 3rem)">
                <p style="color: #6768A7; font-size: 16px; float: left; font-weight: bold; margin: 0.5rem 0; margin-top: 0.5rem;">대상그룹: {{selectedGroup}}</p>
                <div style="height: 2rem; float: right;">
                    <gWhiteButton @click="openRegiPop('P')" btnName="수신대상등록" class="mright-05"/>
                    <gWhiteButton @click="openRegiPop('G')" btnName="수신대상 엑셀업로드" class="mright-05"/>
                    <gWhiteButton @click="openMoveGroupPop('copy')" btnName="복사" class="mright-05"/>
                    <gWhiteButton @click="openMoveGroupPop('move')" btnName="이동" class="mright-05"/>
                </div>
                <div style="border-top: 1px solid #E1E1E1; float: left; width: 100%; min-height: 3rem; padding-top: 1rem;">
                  <div style="width: calc(100% - 200px); height: 2rem; float: left;">
                    <div v-for="(value,index) in searchKey" class="fl" :class="index !== 0 ? 'searchKeyBar': ''" style="min-width: 2rem; padding: 0 0.5rem " :key="index">
                        <span v-on:click="changeSearchText(value.display)" :idx="index" class="font14 cursorP" :class="value.display === this.searchText ? 'activeColor': 'commonColor'">{{value.display}}</span>
                    </div>
                  </div>
                  <div class="searchFilterWrap">
                    <gSelect class="fl" defaltText="정렬" />
                    <div class="fl listSearchBtnWrap" style="">
                      <!--<img src="../resource/images/searchIcon.svg" class="fl" style="margin-top: 0.1rem; margin-right: 0.3rem;" alt=""> -->
                      <p v-on:click="openSearchPop" style="">검색</p>
                    </div>
                  </div>
                </div>
                <searchResult v-if="this.searchList.length > 0" :searchList="this.searchList" @changeSearchList = "changeSearchList" />
                <recvTable style="margin-bottom: 3rem;" />
            </div>
        </div>
    </div>
</template>

<script>

import recvPop from '../components/cAd_regiRecvUserPop.vue'
import selectGroupPop from '../components/cAd_gSelectGroupPop.vue'
import subLeftMenu from '../components/cAd_subLeftMenu.vue'
import recvTable from '../components/cAd_recvTable.vue'
export default {
  methods: {
    openRegiPop (type) {
      this.popType = type
      this.recvPopShowYn = true
    },
    openSearchPop () {
      if (this.searchPopShowYn === true) { this.searchPopShowYn = false } else { this.searchPopShowYn = true }
    },
    changeSearchList (changeList) {
      this.searchList = changeList
    },
    addSearchKey (searchKey) {
      this.searchList.push(searchKey)
      this.searchPopShowYn = false
    },
    changeSearchText (text) {
      this.searchText = text
    },
    openMoveGroupPop (type) {
      this.moveType = type
      if (type === 'copy') {
        this.popHeaderTitle = '그룹복사'
      } else if (type === 'move') {
        this.popHeaderTitle = '그룹이동'
      }
      this.movePopShowYn = true
    },
    closeMovePop () {
      this.movePopShowYn = false
    }
  },
  data () {
    return {
      recvPopShowYn: false,
      popHeaderTitle: '',
      movePopShowYn: false,
      moveType: '',
      popType: '',
      selectedGroupName: '',
      searchKey: [
        { display: '전체', key: '' },
        { display: 'ㄱ', key: 'ㄱ' },
        { display: 'ㄴ', key: 'ㄴ' },
        { display: 'ㄷ', key: 'ㄷ' },
        { display: 'ㄹ', key: 'ㄹ' },
        { display: 'ㅁ', key: 'ㅁ' },
        { display: 'ㅂ', key: 'ㅂ' },
        { display: 'ㅅ', key: 'ㅅ' },
        { display: 'ㅇ', key: 'ㅇ' },
        { display: 'ㅈ', key: 'ㅈ' },
        { display: 'ㅊ', key: 'ㅊ' },
        { display: 'ㅋ', key: 'ㅋ' },
        { display: 'ㅌ', key: 'ㅌ' },
        { display: 'ㅍ', key: 'ㅍ' },
        { display: 'ㅎ', key: 'ㅎ' },
        { display: 'A-Z', key: 'en' },
        { display: '0-9', key: 'num' },
        { display: '기타', key: 'other' }
      ],
      searchList: [],
      searchText: '',
      searchPopShowYn: false
    }
  },
  components: {
    recvTable,
    subLeftMenu,
    recvPop,
    selectGroupPop
  }
}
</script>

<style scoped>
.searchKeyBar{border-left: 1px solid rgb(225, 225, 225) }
.activeColor{color: #6768A7; font-weight: bold;}
.commonColor{color: #131523;}

</style>
