<template>
  <td>
    <input type="checkbox"/>
  </td>
  <td>{{ pIndex + 1 }}</td>
  <td>{{ pUser.name }}</td>
  <td style="text-align:left;">{{ pUser.mail }}<br/>{{ pUser.tel }}</td>
  <td>{{ pUser.info ? pUser.info : '특징: 귀여움' }}</td>
  <td>
    <select v-model="mSelectedManage">
      <option v-for="(data, index) in pSelectedApp.manage" :key="index">{{ data.name }}</option>
    </select>
  </td>
</template>

<script>
export default {
  props: {
    pFilteredPageData: {},
    pSelectedApp: {},
    pUser: {},
    pIndex: Number
  },
  data () {
    return {
      mSelectedManage: this.pUser.manage
    }
  },
  mounted () {
    console.log('pFilteredPageData', this.pFilteredPageData)
  },
  watch: {
    mSelectedManage: {
      handler (value) {
      }
    },
    pUser: {
      handler (value) {
        this.mSelectedManage = this.pUser.manage
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
