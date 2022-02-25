<template>
  <div style="width: 100%;overflow-y: auto;">
    <table style="width: 100%;">
      <colgroup>
        <col width="10px" />
        <col width="40%" />
        <col width="50%" />
      </colgroup>
      <tr v-for="(value, index) in recvList" :key="index">
        <td><img style="width: 40px; height: 40px; border-radius: 40px; margin-top: 0.5rem;" :src="value.imgUrl" alt=""></td>
        <td class="textLeft"><span style="float: left; text-align: left; font-size: 16px; font-weight: bold; margin-right: 0.5rem;"> {{value.name}} </span><span style="float: left; line-height: 25px; font-size:13px;">{{value.groupName}}</span></td>
        <td>{{value.readDate}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    recvList: {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table{border-collapse:collapse;}
th{background:#F5F6FA; font-weight: bold; font-size: 13px; height: 2rem; color:#131523;}
td{color: #131523; font-size: 13px; min-height: 3rem; height: 3rem; text-align: center; padding: 0 0.5rem;}
</style>
