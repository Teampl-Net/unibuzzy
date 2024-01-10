<template>
  <p class="font13" style="text-align:right; margin-top:30px;"> 최종 업데이트 : {{ pSelectedApp.upDated ? pSelectedApp.upDated : '오늘' }}</p>

  <!-- 조직 기본 데이터들 -->
  <div class="jojikInfoWrap w100P">
    <div class="defaultInfos w100P">
      <div style="display:flex; align-items:center;">
        <div class="imgInfo"></div>
        <div class="textInfo">
          <p class="font15">{{ pSelectedApp.name }}</p>
          <p class="font13">{{ pSelectedApp.code }}</p>
        </div>
      </div>
      <div>30</div>
    </div>

    <div class="w100P detailInfos">
      <div class="w100P" style="padding-bottom:10px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #ccc;">
        <p class="font15" style="width:calc(100% - 20px)' text-align:left;">{{ pSelectedApp.desc ? pSelectedApp.desc : '안녕하세요, 우리 조직을 소개합니다.' }}</p>
        <div @click="showMore" style="width:20px;">➕</div>
      </div>
      <div v-if="moreOpen" class="w100P" style="padding-top:10px;">
        <div style="text-align:left;">
          <p class="font14">{{ pSelectedApp.address ? pSelectedApp.address : pSelectedApp.name + '의 주소입니다.' }}</p>
          <p class="font14">***-***-****</p>
        </div>
        <div class="w100P" style="display:flex; align-items:center; justify-content:space-between; text-align:left;">
          <p class="font14" style="calc(100% - 20px);">{{ pSelectedApp.founder ? pSelectedApp.founder : '대표명 (010-1111-1111)' }}</p>
          <p class="font14" style="width:20px;">⚙️</p>
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
            <span class="btnDel cursorP">삭제</span>
            <span @click=addManage class="btnAdd cursorP">추가</span>
          </div>
        </div>
      </div>

      <div class="w100P manageTable">
        <jojikManageTable :pPageData="pPageData" :pCloseAddManage="closeAddManage"/>
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
    pSelectedApp: {},
    pPageData: {}
  },
  created () {

  },
  data () {
    return {
      moreOpen: false
    }
  },
  methods: {
    addManage () {
      this.mAddManageYn = true
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
.btnDel, .btnAdd{
  padding:5px 10px;
  border:1px solid #ccc;
  background-color:#fff;
}
.btnDel{
  background-color:#eee !important;
  margin-right:10px;
}

.manageTable{
  height:auto;
}
</style>
