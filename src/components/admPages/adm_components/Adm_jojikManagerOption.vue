<template>
  <!-- <td>
    <input type="checkbox"/>
  </td> -->
  <td v-if="pModiYn === false">{{ pIndex + 1 }}</td>
  <td v-if="pModiYn === true">
    <input type="checkbox"/>
  </td>
  <td>{{ pUser.userNameMtext ? $changeText(pUser.userNameMtext) : '이름' }}</td>
  <td style="text-align:left;">{{ pUser.userEmail ? pUser.userEmail : '이메일' }}<br/>{{ pUser.phoneNoEnc ? pUser.phoneNoEnc : '000-0000-0000' }}</td>
  <!-- <td>{{ pUser.info ? pUser.info : '특징: 귀여움' }}</td> -->
  <td>
    <select v-model="mSelectedManage">
      <option v-for="(auth, index) in pSelectedOrg.authList" :key="index">{{ auth.authName ? auth.authName : '권한' }}</option>
    </select>
  </td>
</template>

<script>
export default {
  props: {
    pFilteredPageData: {},
    pSelectedOrg: {},
    pUser: {},
    pIndex: Number,
    pMOrgUserList: {},
    pModiYn: Boolean
  },
  created () {
  },
  data () {
    return {
      mSelectedManage: ''
    }
  },
  mounted () {
    console.log('pFilteredPageData', this.pFilteredPageData)
    console.log('pSelectedOrg', this.pSelectedOrg)
    console.log('pMOrgUserList', this.pMOrgUserList)
    console.log('pUser', this.pUser)
    this.setSelectOption()
  },
  methods: {
    setSelectOption () {
      const index = this.pSelectedOrg.authList.findIndex(org => org.authKey === this.pUser.authKey)
      this.mSelectedManage = this.pSelectedOrg.authList[index].authName
      console.log('this.mSelectedManage', this.mSelectedManage)
    }
  },
  watch: {
  }
}
</script>

<style scoped>

thead th{
  padding:10px 0;
  border-bottom:1px solid #e8e8e8;
}
tbody td{
  padding:10px 0 10px 5px;
  font-size:13px;
  text-align:left;
  /* border-right:1px solid #e8e8e8; */
}
tbody td input{
  width:70%;
}
select{
  width:100%;
  font-size:12px !important;
}
</style>
