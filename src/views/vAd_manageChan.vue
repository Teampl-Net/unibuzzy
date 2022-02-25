<template>
  <div style="width: 100%; height: 100%;">
    <gPageTitle class="pleft-2" titleText="채널관리" @clickEvnt = "previewChan" pageType="manageChan" />
    <div id="" class="pleft-2">
      <div style="width: 100%; height: calc(100% - 3rem); overflow-auto;">
        <table style="width: 100%; height: calc(100% - 3rem);">
          <colgroup>
            <col width="5%">
            <col width="10%">
            <col width="10%">
            <col width="10%">
            <col width="10%">
            <col width="15%">
            <col width="15%">
            <col width="25%">
          </colgroup>
          <tr>
            <th><input type="checkbox" name="" id=""></th>
            <th>상태</th>
            <th>신청일</th>
            <th>신청 기관명</th>
            <th>관리자명</th>
            <th>관리자 정보</th>
            <th>첨부서류</th>
            <th>정보</th>
          </tr>
          <tr v-for="(value, index) in requestChanList" :key="index">
            <td><input type="checkbox" name="" v-model="selectedChan" :value="value.requestKey" :id="'request'+ value.requestKey"></td>
            <td><select name="" id="">
              <!-- <option :selected="value.status === '00' ? 'selected': ''">생성대기</option>
              <option :selected="value.status === '99' ? 'selected': ''">생성완료</option> -->
              <option>생성대기</option>
              <option>생성완료</option>
            </select></td>
            <td>{{value.requestDate}}</td>
            <td class="cursorP font16Im fontBold"  @click="checkRow(value.requestKey)"> {{value.chanInfo.chanName}}</td>
            <td>{{value.managerInfo.name}}</td>
            <td>
              <p>{{value.managerInfo.mobile}}</p>
              <p>{{value.managerInfo.email}}</p>
            </td>
            <td id="chanFile" class="multiRow">
              <div class=""><img class="mright-03" src="../resource/images/fileIcon.svg" alt=""><span>기관증명서</span></div>
              <div class=""><img class="mright-03" src="../resource/images/fileIcon.svg" alt=""><span>사용신청서</span></div>
              <div class=""><img class="mright-03" src="../resource/images/fileIcon.svg" alt=""><span>이용동의서</span></div>
            </td>
            <td id="chanInfo" class="multiRow">
              <p>대표자: {{value.chanInfo.masterName}}</p>
              <p>등록번호: {{value.chanInfo.businessResiNum}}</p>
              <p>(전화: {{value.chanInfo.call}})</p>
              <p>주소: {{value.chanInfo.address}}</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data () {
    return {
      selectedChan: [],
      requestChanList: [
        { requestKey: '0', status: '00', chanInfo: { chanName: '삼성생명', masterName: '이재용', businessRegiNum: '111111', call: '00000000000', address: '서울특별시' }, requestDate: '2022.02.21', managerInfo: { name: '이재용', mobile: '010-3434-3434', email: 'jy34@samsung.com' }, file: [{ fileName: '기관증명서', fileUrl: '' }, { fileName: '사용신청서', fileUrl: '' }, { fileName: '이용동의서', fileUrl: '' }] },
        { requestKey: '1', status: '99', chanInfo: { chanName: '삼성생명', masterName: '이재용', businessRegiNum: '111111', call: '00000000000', address: '서울특별시' }, requestDate: '2022.02.21', managerInfo: { name: '이재용', mobile: '010-3434-3434', email: 'jy34@samsung.com' }, file: [{ fileName: '기관증명서', fileUrl: '' }, { fileName: '사용신청서', fileUrl: '' }, { fileName: '이용동의서', fileUrl: '' }] },
        { requestKey: '2', status: '00', chanInfo: { chanName: '삼성생명', masterName: '이재용', businessRegiNum: '111111', call: '00000000000', address: '서울특별시' }, requestDate: '2022.02.21', managerInfo: { name: '이재용', mobile: '010-3434-3434', email: 'jy34@samsung.com' }, file: [{ fileName: '기관증명서', fileUrl: '' }, { fileName: '사용신청서', fileUrl: '' }, { fileName: '이용동의서', fileUrl: '' }] },
        { requestKey: '3', status: '99', chanInfo: { chanName: '삼성생명', masterName: '이재용', businessRegiNum: '111111', call: '00000000000', address: '서울특별시' }, requestDate: '2022.02.21', managerInfo: { name: '이재용', mobile: '010-3434-3434', email: 'jy34@samsung.com' }, file: [{ fileName: '기관증명서', fileUrl: '' }, { fileName: '사용신청서', fileUrl: '' }, { fileName: '이용동의서', fileUrl: '' }] }
      ]
    }
  },
  components: {
  },
  methods: {
    checkRow (key) {
      var dupYn = false
      for (var i = 0; i < this.selectedChan.length; i++) {
        if (this.selectedChan[i] === key) {
          this.selectedChan.splice(i, 1)
          dupYn = true
        }
      }
      if (dupYn === false) {
        this.selectedChan.push(key)
      }
    }
  }
}
</script>

<style scoped>
p{line-height: 23px;}
table{border-collapse:collapse;}
#chanInfo p{text-align: left; color:#131523;padding-left: 1rem;}
#chanFile >div{width: 100%; min-height: 1.5rem; display: flex; justify-content: center; }
#chanFile span{line-height: 23px; float: left}
#chanFile img{float: left; margin-top: 0.3rem;}
th{background-color:#F5F6FA; height: 40px;}
td {padding: 0.5rem 0.2rem; border-bottom: 1px solid #E1E1E1;}
*{text-align: center; font-size: 14px;}
select {border: 1px solid #BFBFDA; padding: 0.1rem 0.7rem;}

.multiRow p, .multiRow span {font-size: 12.5+px!important;}
</style>
