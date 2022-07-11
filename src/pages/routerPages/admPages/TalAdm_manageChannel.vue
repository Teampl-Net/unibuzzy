<template>
  <div style="width: 100%; height: 100%;">
    <div id="" class="pleft-2">
      <gPageTitle class="pleft-2"  titleText="채널관리" @clickEvnt="creChan" pageType="manageChan" @getSearchKey="addSearchKey"/>
      <searchResult v-if="this.searchList.length" :searchList="this.searchList" @changeSearchList = "changeSearchList"/>
      <div style="width: 100%; height: calc(100% - 3rem); overflow: auto;">
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
            <td><input type="checkbox" @click="checkRow(index)" name="" v-model="selectedChan" :value="value.reqKey" :id="'request'+ value.reqKey"></td>
            <td>
              <select v-if="value.editable" @change="selectStatus(index, $event)" name="" id="">
                <option :selected="value.reqStatus === '01'" value="01">신청</option>
                <option :selected="value.reqStatus === '02'" value="02">진행중</option>
                <option :selected="value.reqStatus === '09'" value="09">진행거절</option>
                <option :selected="value.reqStatus === '10'" value="10">생성완료</option>
                <option :selected="value.reqStatus === '18'" value="18">진행중지</option>
                <option :selected="value.reqStatus === '19'" value="19">채널탈퇴</option>
                <!-- <option>생성대기</option>
                <option>생성완료</option> -->
              </select>
              <template  v-else>
                <p v-if="value.reqStatus === '01'">신청</p>
                <p v-else-if="value.reqStatus === '02'">진행중</p>
                <p v-else-if="value.reqStatus === '09'">진행거절</p>
                <p v-else-if="value.reqStatus === '10'">생성완료</p>
                <p v-else-if="value.reqStatus === '18'">진행중지</p>
                <p v-else-if="value.reqStatus === '19'">채널탈퇴</p>
              </template>
            </td>
            <td>{{this.$changeDateFormat(value.creDate)}}</td>
            <td class="cursorP font16Im fontBold"  @click="checkRow(index)"> {{this.$makeMtextMap(value.nameMtext, 'KO')}}</td>
            <td>{{this.$makeMtextMap(value.managerNameMtext, 'KO')}}</td>
            <td>
              <p>{{value.managerTel}}</p>
              <p>{{value.managerEmail}}</p>
            </td>
            <td id="chanFile" class="multiRow">
              <div class=""><img class="mright-03" src="../../../assets/images/common/fileIcon.svg" alt=""><span>기관증명서</span></div>
              <div class=""><img class="mright-03" src="../../../assets/images/common/fileIcon.svg" alt=""><span>사용신청서</span></div>
              <div class=""><img class="mright-03" src="../../../assets/images/common/fileIcon.svg" alt=""><span>이용동의서</span></div>
            </td>
            <td id="chanInfo" class="multiRow">
              <p>대표자: {{this.$makeMtextMap(value.masterNameMtext, 'KO')}}</p>
              <p>등록번호: {{value.legacyId}}</p>
              <p>(전화: {{value.teamTel}})</p>
              <p>주소: {{value.teamAddress}}</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import gPageTitle from '../../../components/unit/admUnit/TalAdm_gPageTitle.vue'
// @ is an alias to /src
export default {
  name: 'Home',
  data () {
    return {
      selectedChan: [],
      selectedChanIdx: [],
      searchList: [],
      requestChanList: [
        /*  { requestKey: '0', status: '00', chanInfo: { chanName: '삼성생명', masterName: '이재용', businessRegiNum: '111111', call: '00000000000', address: '서울특별시' }, requestDate: '2022.02.21', managerInfo: { name: '이재용', mobile: '010-3434-3434', email: 'jy34@samsung.com' }, file: [{ fileName: '기관증명서', fileUrl: '' }, { fileName: '사용신청서', fileUrl: '' }, { fileName: '이용동의서', fileUrl: '' }] },
        { requestKey: '1', status: '99', chanInfo: { chanName: '삼성생명', masterName: '이재용', businessRegiNum: '111111', call: '00000000000', address: '서울특별시' }, requestDate: '2022.02.21', managerInfo: { name: '이재용', mobile: '010-3434-3434', email: 'jy34@samsung.com' }, file: [{ fileName: '기관증명서', fileUrl: '' }, { fileName: '사용신청서', fileUrl: '' }, { fileName: '이용동의서', fileUrl: '' }] },
        { requestKey: '2', status: '00', chanInfo: { chanName: '삼성생명', masterName: '이재용', businessRegiNum: '111111', call: '00000000000', address: '서울특별시' }, requestDate: '2022.02.21', managerInfo: { name: '이재용', mobile: '010-3434-3434', email: 'jy34@samsung.com' }, file: [{ fileName: '기관증명서', fileUrl: '' }, { fileName: '사용신청서', fileUrl: '' }, { fileName: '이용동의서', fileUrl: '' }] },
        { requestKey: '3', status: '99', chanInfo: { chanName: '삼성생명', masterName: '이재용', businessRegiNum: '111111', call: '00000000000', address: '서울특별시' }, requestDate: '2022.02.21', managerInfo: { name: '이재용', mobile: '010-3434-3434', email: 'jy34@samsung.com' }, file: [{ fileName: '기관증명서', fileUrl: '' }, { fileName: '사용신청서', fileUrl: '' }, { fileName: '이용동의서', fileUrl: '' }] } */
      ]
    }
  },
  async created () {
    this.getTeamReqList()
  },
  components: {
    gPageTitle
  },
  methods: {
    selectStatus (i, evnt) {
      this.requestChanList[i].selectValue = evnt.target.value
    },
    async getTeamReqList () {
      var result = await this.$getTeamReqList()
      this.requestChanList = result.content
      for (var i = 0; i < this.requestChanList.length; i++) {
        this.requestChanList[i].editable = false
      }
    },
    checkRow (idx) {
      if (this.requestChanList[idx].editable === false) {
        this.requestChanList[idx].editable = true
      } else if (this.requestChanList[idx].editable === true) {
        this.requestChanList[idx].editable = false
      }
      var dupYn = false
      for (var i = 0; i < this.selectedChan.length; i++) {
        if (this.selectedChan[i] === this.requestChanList[idx].reqKey) {
          this.selectedChan.splice(i, 1)
          this.selectedChanIdx.splice(i, 1)
          dupYn = true
        }
      }
      if (dupYn === false) {
        this.selectedChan.push(this.requestChanList[idx].reqKey)
        this.selectedChanIdx.push(idx)
      }
    },
    changeSearchList (changeList) { this.searchList = changeList },
    addSearchKey (searchKey) {
      this.searchList.push(searchKey)
    },
    async creChan () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // eslint-disable-next-line no-new-object
      var paramObj = new Object()
      // eslint-disable-next-line no-array-constructor
      var reqList = new Array()
      for (var i = 0; i < this.selectedChanIdx.length; i++) {
        var index = this.selectedChanIdx[i]
        paramObj.reqKey = this.requestChanList[index].reqKey
        paramObj.reqStatus = this.requestChanList[index].selectValue
        reqList.push(paramObj)
      }
      param.reqKeyList = reqList
      var result = await this.$createTeamForReq(param)
      if (result === true) {
        this.selectedChan = []
        this.getTeamReqList()
      } else {
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
