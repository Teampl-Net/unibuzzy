<template>
  <td>
    <input type="checkbox"/>
  </td>
  <td>{{ pIndex + 1 }}</td>
  <td>{{ pUser.userNameMtext ? $changeText(pUser.userNameMtext) : '이름' }}</td>
  <td style="text-align:left;">{{ pUser.userEmail ? pUser.userEmail : '이메일' }}<br/>{{ pUser.phoneNoEnc ? pUser.phoneNoEnc : '000-0000-0000' }}</td>
  <td>{{ pUser.info ? pUser.info : '특징: 귀여움' }}</td>
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
    pMOrgUserList: {}
  },
  created () {

  },
  data () {
    return {
      mSelectedManage: this.pUser.manage
    }
  },
  mounted () {
    console.log('pFilteredPageData', this.pFilteredPageData)
    console.log('pSelectedOrg', this.pSelectedOrg)
    console.log('pMOrgUserList', this.pMOrgUserList)
    console.log('pUser', this.pUser)
  },
  watch: {
    mSelectedManage: {
      handler (value) {
      }
    },
    pUser: {
      handler (value) {
        this.mSelectedManage = this.pUser.authKey // findIndex 써서 이름 추출하기
      }
    }
  }
}
</script>

<style scoped>

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
