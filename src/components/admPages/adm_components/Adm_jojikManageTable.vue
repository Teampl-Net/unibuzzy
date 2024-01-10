<template>
  <table class="w100P manageTable">
    <thead>
      <th style="width:50px;">선택</th>
      <th style="width:50px;">No</th>
      <th style="width:40%'">권한명</th>
      <th style="width:25%;">사용자 관리(권한)</th>
      <th style="width:25%;">조직 관리</th>
    </thead>

    <tbody>
        <tr v-for="(manage, index) in pPageData.manage" :key="index">
            <td>
              <input type="checkbox" />
            </td>
            <td>{{ index }}</td>
            <td>{{ manage.name ? manage.name : ''}} ({{ manage.count ? manage.count + '명': '0명' }})</td>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <input type="checkbox" />
            </td>
        </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    pPageData: {}
  },
  created () {
    console.log('pPageData', this.pPageData)
  },
  data () {

  },
  methods: {

  }
}
</script>

<style scoped>
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
</style>
