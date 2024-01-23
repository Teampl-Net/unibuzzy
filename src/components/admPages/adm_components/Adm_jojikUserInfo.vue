<template>
    <table class="w100P manageTable">
    <thead>
      <th style="width:50px;">선택</th>
      <th style="width:50px;">No</th>
      <th style="width:28%'">사용자</th>
      <th style="width:27%;">연락처</th>
      <th style="width:25%;">부가정보</th>
      <th style="width:10%;">권한</th>
    </thead>

    <tbody>
        <tr v-for="(user, index) in pFilteredPageData" :key="index">
            <jojikManagerOption :pUser="user" :pIndex="index" :pFilteredPageData="pFilteredPageData" :pSelectedApp="pSelectedApp"/>
        </tr>
    </tbody>
  </table>
</template>

<script>
import jojikManagerOption from '@/components/admPages/adm_components/Adm_jojikManagerOption.vue'
export default {
  components: {
    jojikManagerOption
  },
  props: {
    pSelectedApp: Object,
    pFilteredPageData: {},
    pAddUser: Boolean,
    pCloseAddUser: Function,
    pFromWhere: String,
    pFilterBySelectedManage: {}
  },
  created () {
    console.log('pFilteredPageData', this.pFilteredPageData)
    console.log('pSelectedApp', this.pSelectedApp)
  },
  data () {
    return {
      mSelectedManage: {}
    }
  },
  methods: {
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
tbody td input{
  width:70%;
}
</style>
