<template>
  <div class="detailInfos w100P">
    <table class="w100P manageTable">
    <thead>
      <th style="width:50px;">선택</th>
      <th style="width:50px;">No</th>
      <th style="width:28%'">사용자</th>
      <th style="width:27%;">연락처</th>
      <th style="width:25%;">부가정보</th>
      <th style="width:10%;">권한</th>
    </thead>

    <tbody v-if="isLoading===true" >
        <tr v-for="(user, index) in mMOrgUserList.org" :key="index">
            <jojikManagerOption :pUser="user" :pIndex="index" :pMOrgUserList="mMOrgUserList" :pFilteredPageData="pFilteredPageData" :pSelectedOrg="pSelectedOrg"/>
        </tr>
    </tbody>
  </table>
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
      mSelectedManage: {},
      isLoading: false
    }
  },
  methods: {
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
.detailInfos{
  background-color:#fff;
  height:auto;
  padding:10px;
}
.manageTable{
  height:auto;
}

thead th{
  padding:10px 0;
  border-bottom:1px solid #e8e8e8;
}
tbody td{
  padding:10px 0;
}
tbody td input{
  width:70%;
}
</style>
