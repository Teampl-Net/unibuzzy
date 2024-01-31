<template>
    <div class="searchArea">
     <div class="inputWrap">
        <input type="text" v-model="mSearchData" class="w100P searchInput" style="cursor:auto;"/>
        <div class="cursorP searchBtn font12" style="padding:0px 20px; white-space:nowrap;">검색</div>
      </div>
      <select class="selectBtn" v-model="selectedManage" @change="handleSelectAuth">
        <option value="all">전체</option>
        <option v-for="(auth, index) in pSelectedOrg.authList" :key="index" :value="auth.authKey">{{ auth.authName }}</option>
      </select>
      <div class="sendMsg cursorP">✉️</div>
    </div>

  <div class="detailInfos w100P">
    <table class="w100P manageTable">
    <thead>
      <!-- <th style="width:50px;">선택</th> -->
      <th style="width:20px;"></th>
      <th style="width:27%">사용자</th>
      <th style="width:43%;">연락처</th>
      <!-- <th style="width:25%;">부가정보</th> -->
      <th style="width:30%;">권한</th>
    </thead>

    <tbody v-if="isLoading===true" >
        <tr v-for="(user, index) in mMOrgUserList.org" :key="index">
            <jojikManagerOption :pModiYn="modiYn" :pUser="user" :pIndex="index" :pMOrgUserList="mMOrgUserList" :pFilteredPageData="pFilteredPageData" :pSelectedOrg="pSelectedOrg"/>
        </tr>
    </tbody>
  </table>

  </div>

  <div class="btnWraps alignCenter">
    <span @click="gotoAddMember" class="btnAdd cursorP h100P">추가</span>
    <span class="btnDel cursorP h100P">삭제</span>
    <span @click="setToModi" class="btnAdd cursorP h100P">{{ modiYn === false ? '편집' : '편집 완료' }}</span>
  </div>
</template>

<script>
import axios from 'axios'
import jojikManagerOption from '@/components/admPages/adm_components/Adm_jojikManagerOption.vue'
export default {
  components: {
    jojikManagerOption
  },
  props: {
    pSelectedOrg: Object,
    pFilteredPageData: {},
    pAddUser: Boolean,
    pCloseAddUser: Function,
    pFromWhere: String,
    pFilterBySelectedManage: {},
    orgKey: Number
  },
  created () {
    console.log('orgKey', this.orgKey)
    this.getMOrgUserList()
    console.log('pFilteredPageData', this.pFilteredPageData)
    console.log('pSelectedOrg', this.pSelectedOrg)
  },
  data () {
    return {
      mSelectedManage: '',
      isLoading: false,
      mSearchData: '',
      selectedManage: 'all',
      modiYn: false
    }
  },
  methods: {
    handleSelectAuth (value) {
      this.mSelectedManage = this.selectedManage
      console.log('this.mSelectedManage', this.mSelectedManage)
    },
    gotoAddMember () {
      this.$router.push(`/addMember/${this.orgKey}`)
    },
    setToModi () {
      this.modiYn = !this.modiYn
    },
    async getMOrgUserList () {
      var paramSet = {}
      paramSet.orgKey = Number(this.orgKey)
      var result = await axios.post('/sUniB/tp.getMOrgUserList', paramSet, { withCredentials: true, headers: { UserAuthorization: this.$store.getters['D_USER/GE_USER'].userToken, Authorization: this.$APP_CONFIG.appToken } })
      if (result && result.data) {
        this.isLoading = true
        this.mMOrgUserList = result.data
      }
      console.log('mMOrgUserList', this.mMOrgUserList)
    }
  },
  mounted () {
  },
  watch: {
    pAddUser: {
      immediate: true,
      handler (value) {
        console.log('pAddUser', value)
      }
    },
    pFilteredPageData: {
      immediate: true,
      handler (value) {
        console.log('pFilteredPageData changed value', value)
      }
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>

<style scoped>

.searchArea{
  display:flex;
  align-items:center;
  width:100%;
  background-color:#fff;
  padding:10px;
  justify-content:space-between;
  gap:1rem;
}
.inputWrap{
  width:70%;
  display:flex;
  align-items:center;
  position:relative;
  height:auto;
  box-shadow:0 0 3px rgba(0,0,0,0.3);
  border-radius:20px;
  padding:5px;
}
.searchInput{
  width:calc(100% - 100px);
  border:none !important;
}
.searchBtn{
  position:absolute;
  right:0;
  top:50%;
  transform:translateY(-50%);
}

.selectBtn{
  border-radius:20px !important;
  padding:5px !important;
  width:25%;
  height:33px;
  box-shadow:0 0 3px rgba(0,0,0,0.3);
  border:none !important;
  min-width:100px;
}
.sendMsg{
  width:50px;
  min-width:50px;
  border-radius:20px;
  height:33px;
  line-height:33px;
  box-shadow:0 0 3px rgba(0,0,0,0.3);
}
.managerBtns{
  width:auto;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:0.5rem;
}
.btnDel, .btnAdd{
  padding:5px 10px;
  background-color:#fff;
}
.btnDel{
  background-color:#eee;
}
.detailInfos{
  background-color:#fff;
  height:auto;
}
.manageTable{
  height:auto;
}
.btnWraps{
  width:100%;
  height:60px;
  position:absolute;
  bottom:0;
  left:0;
  box-shadow:0 -2px 10px 0px rgba(228, 228, 228, 0.1)}
.btnWraps > span{
  width:33.3%;
  line-height:50px;
}
thead th{
  padding:10px 0;
  border-bottom:1px solid #e8e8e8;
  font-size:13px;
}
tbody td{
  padding:10px 0;
}
tbody td input{
  width:70%;
}
</style>
