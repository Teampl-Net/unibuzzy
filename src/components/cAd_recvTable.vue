<template>
  <div style="width: 100%;">
    <table style="width: 100%;">
      <colgroup>
        <col width="30px" />
        <!--<col width="5%" />-->
        <col width="10%" />
        <col width="15%" />
        <col width="calc(25% - 30px)"/>
        <col width="10%" />
        <col width="10%" />
        <col width="20%" />
      </colgroup>

      <tr>
        <th></th>
        <!-- <th>순서</th> -->
        <th>이름</th>
        <th>연락처</th>
        <th>이메일</th>
        <th>그룹명</th>
        <th>상태</th>
        <th>구독일</th>
      </tr>
      <tr v-for="(value, index) in secvMemberList" :key="index" @click="checkRow(value.userKey)">
        <td><input type="checkbox" v-model="selectedUser" :id="'check'+value.userKey" :value="value.userKey" style=""></td>
        <!--<td>{{index + 1}}</td> -->
        <td>{{value.selectedUser}}</td>
        <td>{{value.mobile}}</td>
        <td>{{value.email}}</td>
        <td>{{value.groupName}}</td>
        <td>{{value.recvStatus}}</td>
        <td>{{value.followDate}}</td>
      </tr>
    </table>
    <div style="position: absolute; bottom: 0; height: 3rem; width: 100%; color:#000000; font-size: 14px; font-weight: bold;">
        총 등록인원 {{allCnt}}4427명/구독자{{followCnt}}2218명
    </div>
    <div style="width: 100%; left: 0; position: absolute; border-top: 1px solid #ccc; bottom: 0; height: 4rem; display: flex; justify-content: center; padding-top: 1rem;">
      <div class="pageWrap">
        <img class="cursor: pointer;" src="../resource/images/leftPaginateIcon.svg" alt="">
        <span>{{currentPage}}</span><span>/</span><span>{{totalPage}}</span>
        <img class="cursor: pointer;" src="../resource/images/rightPaginateIcon.svg" alt="">
      </div>
      <div style="background-color: #EFEFF6; min-width: 100px; position: absolute; right: 1rem; height: 30px; border-radius: 3px; text-align: center; padding: 0.3rem 0; font-size: 15px; color: #000000;">보기개수: {{this.pageSize}}</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    checkRow (key) {
      var dupYn = false
      for (var i = 0; i < this.selectedUser.length; i++) {
        if (this.selectedUser[i] === key) {
          this.selectedUser.splice(i, 1)
          dupYn = true
        }
      }
      if (dupYn === false) {
        this.selectedUser.push(key)
      }
    }
  },
  data () {
    return {
      selectedUser: [],
      currentPage: 1,
      totalPage: 10,
      pageSize: 10,
      secvMemberList: [
        { userKey: 0, name: '김철수', mobile: '010-1234-5678', email: 'test@pushmsg.net', groupName: '교직원', recvStatus: '구독', followDate: '2022.02.02' },
        { userKey: 1, name: '김철수', mobile: '010-1234-5678', email: 'test@pushmsg.net', groupName: '교직원', recvStatus: '구독', followDate: '2022.02.02' },
        { userKey: 2, name: '김철수', mobile: '010-1234-5678', email: 'test@pushmsg.net', groupName: '교직원', recvStatus: '구독', followDate: '2022.02.02' },
        { userKey: 3, name: '김철수', mobile: '010-1234-5678', email: 'test@pushmsg.net', groupName: '교직원', recvStatus: '구독', followDate: '2022.02.02' },
        { userKey: 4, name: '김철수', mobile: '010-1234-5678', email: 'test@pushmsg.net', groupName: '교직원', recvStatus: '구독', followDate: '2022.02.02' },
        { userKey: 5, name: '김철수', mobile: '010-1234-5678', email: 'test@pushmsg.net', groupName: '교직원', recvStatus: '구독', followDate: '2022.02.02' },
        { userKey: 6, name: '김철수', mobile: '010-1234-5678', email: 'test@pushmsg.net', groupName: '교직원', recvStatus: '구독', followDate: '2022.02.02' },
        { userKey: 7, name: '김철수', mobile: '010-1234-5678', email: 'test@pushmsg.net', groupName: '교직원', recvStatus: '구독', followDate: '2022.02.02' },
        { userKey: 8, name: '김철수', mobile: '010-1234-5678', email: 'test@pushmsg.net', groupName: '교직원', recvStatus: '구독', followDate: '2022.02.02' },
        { userKey: 9, name: '김철수', mobile: '010-1234-5678', email: 'test@pushmsg.net', groupName: '교직원', recvStatus: '구독', followDate: '2022.02.02' }
      ]
    }
  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table{border-collapse:collapse;}
th{background:#F5F6FA; font-weight: bold; font-size: 14px; height: 2rem; color:#131523;}
td{color: #131523; font-size: 14px; min-height: 3rem; height: 3rem; text-align: center;}
</style>
