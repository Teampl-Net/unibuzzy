<template>
    <!-- <div v-if="popType !== 'addGroup' && popType !== 'addMember' " class="backDark"></div> -->

    <div class="commonPopWrap">
      <addGroupPop v-if="popType === 'addGroup' || popType === 'editGroup'" @saveGroup="saveGroup" :pPropParams="pPropParams" :pClosePop="pClosePop" :pGetOrgList="pGetOrgList"/>
      <addMemberPop v-if="popType === 'addMember'" :pClosePop="pClosePop" @saveMember="saveMember" :pOrgList="pOrgList" :pPropParams="pPropParams"/>
    </div>
</template>

<script>
import addGroupPop from '@/components/admPages/popUP/Adm_addGroupPop.vue'
import addMemberPop from '@/components/admPages/popUP/Adm_addMemberPop.vue'
import axios from 'axios'

export default {

  components: {
    addGroupPop,
    addMemberPop
  },
  props: {
    pClosePop: Function,
    pPropParams: {},
    pOrgList: [],
    pGetOrgList: Function
  },
  created () {
    this.popType = this.pPropParams.popType
    console.log('commonpPopup this.pPropParams', this.pPropParams)
  },
  data () {
    return {
      popType: {}
    }
  },
  methods: {
    async saveGroup (param) {
      var paramSet = {}
      paramSet = param

      var result = await axios.post('https://www.hybric.net:9443/service/tp.saveOrg', { org: paramSet }, { withCredentials: true, headers: { UserAuthorization: this.$store.getters['D_USER/GE_USER'].userToken, Authorization: this.$APP_CONFIG.appToken } })
      console.log('result', result)
      this.pClosePop()
    },
    async saveMember (param) {
      var paramSet = {}
      paramSet = param

      var result = await axios.post('https://www.hybric.net:9443/service/tp.saveMOrgUser', { mOrgUser: paramSet }, { withCredentials: true, headers: { UserAuthorization: this.$store.getters['D_USER/GE_USER'].userToken, Authorization: this.$APP_CONFIG.appToken } })
      console.log('result', result)
      this.pClosePop()
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
.commonPopWrap{
  box-shadow:0 0 5px rgba(0,0,0,0.2);
  z-index:3;
  /* background-color:#fff; */
  width:100%;
  height:100%;
  padding-top:20px;
}

.backDark{
  position:fixed;
  top:0;
  left:0;
  height:100%;
  width:100%;
  background-color:rgba(0,0,0,0.3);
  z-index:2;
}
</style>
