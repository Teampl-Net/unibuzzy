<template>
  <p class="font13" style="text-align:right;"> 최종 업데이트 : {{ pSelectedApp.upDated ? pSelectedApp.upDated : '오늘' }}</p>

  <!-- 조직 기본 데이터들 -->
  <div class="jojikInfoWrap w100P">
    <div class="defaultInfos w100P">
      <div style="display:flex; align-items:center;">
        <div class="imgInfo"></div>
        <div class="textInfo">
          <p class="font15">{{ pSelectedApp.orgName ? pSelectedApp.orgName : '"조직명"' }}</p>
          <p class="font13">{{ pSelectedApp.orgKey ? pSelectedApp.orgKey : '00' }}</p>
        </div>
      </div>
      <div>
        <p class="font14">{{ pSelectedApp.orgType && pSelectedApp.orgType === 'C' ? '회사' : pSelectedApp.orgType === 'A' ? '아파트' : '학교' }}</p>
        <p class="font13">🙍🏻‍♂️{{ pSelectedApp.allCount ? pSelectedApp.allCount : '미측정' }}</p>
      </div>
    </div>

    <div class="w100P detailInfos">
      <div class="w100P" style="padding-bottom:10px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #ccc;">
        <p class="font15" style="width:calc(100% - 20px)' text-align:left;">{{ pSelectedApp.orgDesc ? pSelectedApp.orgDesc : '안녕하세요, 우리 조직을 소개합니다.' }}</p>
        <div v-if="moreOpen===false" @click="showMore" style="width:20px;">➕</div>
        <div v-if="moreOpen===true" @click="showMore" style="width:20px;">➖</div>
      </div>
      <div v-if="moreOpen" class="w100P" style="padding-top:10px;">
        <div style="display:flex; align-items:center; justify-content:space-between; text-align:left;">
          <p class="font14">📫{{ pSelectedApp.address ? pSelectedApp.address : pSelectedApp.orgName + '의 주소입니다.' }}</p>
          <p class="font14">👜***-***-****</p>
        </div>
        <div class="w100P" style="display:flex; align-items:center; justify-content:space-between; text-align:left;">
          <p class="font14" style="calc(100% - 20px);">🤵🏻‍♂️{{ pSelectedApp.founder ? pSelectedApp.founder : '대표명 (010-1111-1111)' }}</p>
          <p @click="openPop" class="font16 cursorP" style="width:20px;">⚙️</p>
        </div>
      </div>
    </div>
  </div>

    <!-- 조직 권한 설정 -->
    <div class="w100P manageInfos">
      <div class="w100P manageAreaTitle">
        <p class="font20 fontBold">권한 관리</p>
        <div class="managerBtns">
          <div class="font25">
            <span class="cursorP">⬆️</span>
            <span class="cursorP">⬇️</span>
          </div>
          <div>
            <span v-if="addManagerTypeYn === false" @click="addManage" class="btnAdd cursorP">추가</span>
            <span v-if="addManagerTypeYn === true" @click="saveManage" class="btnAdd cursorP">저장</span>
            <span class="btnDel cursorP">삭제</span>
            <span class="btnEdit cursorP">수정</span>
          </div>
        </div>
      </div>

      <div class="w100P manageTable">
        <jojikManageTable :pPageData="pPageData" @openUserInfo="openUserInfo" :pSelectedApp="pSelectedApp" :pCloseAddManage="closeAddManage" :pAddManagerTypeYn="addManagerTypeYn"/>
      </div>

    </div>
</template>

<script>
import jojikManageTable from '@/components/admPages/adm_components/Adm_jojikManageTable.vue'
export default {
  components: {
    jojikManageTable
  },
  props: {
    pSelectedApp: Object,
    pPageData: {}
  },
  created () {
    console.log('jojikDetailInfo pSelectedApp', this.pSelectedApp)
  },
  data () {
    return {
      moreOpen: false,
      addManagerTypeYn: false
    }
  },
  methods: {
    addManage () {
      this.addManagerTypeYn = true
    },
    closeAddManage () {
      this.addManagerTypeYn = false
    },
    saveManage () {
      return false
    },
    showMore () {
      this.moreOpen = !this.moreOpen
    },
    openPop () {
      this.$emit('openPop')
    },
    openUserInfo (param) {
      console.log('jojnikDetailInfo emit param', param)
      this.$emit('openUserInfo', param)
    }
  }

}
</script>

<style scoped>

.jojikInfoWrap{
  border:1px solid gray;
  padding:20px;
}
.defaultInfos{
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.imgInfo{
  width:70px;
  height:70px;
  border-radius:50%;
  border:1px solid gray;
  background-color:#ebebeb;
}
.textInfo{
  text-align:left;
  margin-left:0.5rem;
}
.detailInfos{
  height:auto;
  display:flex;
  flex-direction:column;
  align-items:start;
  justify-content:center;
  padding-top:30px;
}

.manageInfos{
  padding-top:30px;
  height:auto;
}
.manageAreaTitle{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding-bottom:5px;
  border-bottom:1px solid #ccc;
}
.managerBtns{
  width:auto;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1rem;
}
.btnDel, .btnAdd, .btnEdit{
  padding:5px 10px;
  border:1px solid #ccc;
  background-color:#fff;
  margin-right:0.3rem;

}
.btnDel{
  background-color:#eee !important;
}

.manageTable{
  height:auto;
}
</style>
