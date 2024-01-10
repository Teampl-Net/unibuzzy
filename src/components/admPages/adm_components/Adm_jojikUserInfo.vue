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
            <!-- 세로 첫 열에 사용자 이름을 표시합니다. -->
            <td>
              <input type="checkbox"/>
            </td>
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td style="text-align:left;">{{ user.mail }}<br/>{{ user.tel }}</td>
            <td>{{ user.info ? user.info : '특징: 귀여움' }}</td>
            <td>{{ user.manage ? user.manage : '일반' }}</td>
        </tr>
        <tr v-if="pAddUser === true">
          <td>
              <p @click="pCloseAddUser">X</p>
            </td>
            <td>
              {{ pFilteredPageData.length + 1 }}
            </td>
            <td>
              <input type="text"/>
            </td>
            <td style="text-align:left;">
              <input type="text"/>
              <input type="text"/>
            </td>
            <td>
              <input type="text"/>
            </td>
            <td>
              <select>
                <option>일반</option>
                <option>매니저</option>
                <option>관리자</option>
              </select>
            </td>
        </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    pFilteredPageData: {},
    pAddUser: Boolean,
    pCloseAddUser: Function
  },
  created () {
    console.log('pFilteredPageData', this.pFilteredPageData)
  },
  data () {
    return {}
  },
  methods: {

  },
  watch: {
    pAddUser: {
      immediate: true,
      handler (value) {
        console.log('pAddUser', value)
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
