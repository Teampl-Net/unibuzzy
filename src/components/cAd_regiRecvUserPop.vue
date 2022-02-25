<template>
    <div class="modalBack">
        <div class="commonPopCard" :class="this.regiType === 'P' ? 'smallSize': 'bigSize'" style="">
          <popHeader :headerTitleText="this.popHeaderT" @closePop="closePop"/>
            <div class="popBody" style="padding: 1.5rem 2rem; overflow-y: hidden;">
              <div id="Parea" v-if="this.regiType === 'P'">
                <div class="inputRow"><p class="fl inputLabel" style="">이름</p><input type="text" class="fl commonInput" name="" id=""></div>
                <div class="inputRow"><p class="fl inputLabel" style="">휴대폰 번호</p><input type="text" class="fl commonInput" name="" id=""></div>
                <div class="inputRow"><p class="fl inputLabel" style="">이메일</p><input type="text" class="fl commonInput" name="" id=""></div>
                <div class="inputRow"><p class="fl inputLabel" style="">그룹명</p><input type="text" class="fl commonInput" style="padding-right: 2rem;" name="" id="">
                  <img src="../resource/images/organizationIcon.svg" @click="this.subPopShowYn = true" class="fl orgaIcon cursorP" style="" alt="">
                </div>
            </div>
            <div id="Garea" v-if="this.regiType === 'G'">
              <div id="step1" style="width: 100%; min-height: 2rem; margin-bottom: 1rem;">
                <p style="color: #3A3A3A; font-size: 15px; margin-bottom: 0.8rem; float: left; margin-right: 0.5rem; line-height: 30px;"><span class="fontBold">STEP1.</span> 수신대상 엑셀파일을 다운로드하여 양식에 맞게 채워줍니다.</p>
                <gButton btnName="템플릿 다운로드"  btnType="light" class="fl"/>
              </div>
              <div id="step2" style="width: 100%; min-height: 4.5rem; margin-bottom: 1rem;">
                <p style="color: #3A3A3A; font-size: 15px; margin-bottom: 0.8rem;"><span class="fontBold">STEP2.</span> 수신대상 엑셀파일을 업로드합니다</p>
                <gButton btnName="파일선택" btnType="light" /><div style="border: 1px solid #BFBFDA; width: 350px; height: 30px; border-radius: 5px; float: left; margin-left: 0.5rem;"></div>
              </div>
              <div id="step3" style="width: 100%; min-height: 2rem; margin-bottom: 1rem; position: relative;">
                <p style="color: #3A3A3A; font-size: 15px; margin-bottom: 0.8rem; line-height: 30px; float: left; margin-right: 0.5rem;'">
                  <span class="fontBold">STEP3.</span> 정합성 확인 버튼 클릭을 통해 업로드한 데이터 정보를 확인합니다</p>
                <gButton btnName="정합성 확인" btnType="light" class="fl" />
              </div>
              <div id="step4" style="width: 100%; height: 500px; margin-bottom: 1rem; position: relative;">
                <p style="color: #6768A7; font-size: 12px;">*이름+전화번호+이메일은 반드시 입력해야 하는 정보입니다.</p>
                <table style="width: 100%; margin-top: 0.5rem;">
                  <colgroup><col width="15%" ><col width="40%" ><col width="30%" ><col width="calc(100% - 10px)" ><col width="10px" ></colgroup>
                  <tr><th>이름</th><th>이메일</th><th>전화번호</th><th>그룹</th></tr>
                </table>
                <div style="width: 100%; height: 450px; overflow-y: auto; border-bottom: 1px solid #BFBFDA;">
                  <table style="width: 100%; height: 480px; margin-bottom: 1rem ; ">
                    <colgroup><col width="15%" ><col width="40%" ><col width="30%" ><col width="15%" ></colgroup>
                    <tr v-for="(value, index) in regiUserList" :key="index">
                      <td>{{value.name}}</td><td>{{value.email}}</td><td>{{value.mobile}}</td><td>{{value.group}}</td>
                    </tr>
                  </table>
                </div>
                <p class="bodyText"><span class="fontBold">STEP4.</span> 등록 버튼을 클릭하면 수신대상관리에 등록됩니다.</p>
              </div>
            </div>
          </div>
          <div class="popFooter">
            <gButton class="mright-05" @click="closePop" btnName="등록" />
            <gWhiteButton @click="closePop" btnName="닫기" />
          </div>
        </div>
        <selectGroupPop popHeaderTitle="그룹지정" v-if="subPopShowYn" @closePop="closeSubPop" />
    </div>
</template>
<script>
import selectGroupPop from './cAd_gSelectGroupPop.vue'
export default {
  data () {
    return {
      popHeaderT: '등록하기',
      chanInfo: { chanName: '더알림대학교', group: [{ groupName: '입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처', groupKey: '0' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '학생복지처', groupKey: '2' }, { groupName: '학생', groupKey: '3' }] },
      subPopShowYn: false,
      selectedList: [],
      regiUserList: [{ name: '김민석', email: 'kms123@gmail.com', mobile: '01012345678', group: '학생' }, { name: '김민석', email: 'kms123@gmail.com', mobile: '01012345678', group: '학생' }, { name: '김민석', email: 'kms123@gmail.com', mobile: '01012345678', group: '학생' }, { name: '김민석', email: 'kms123@gmail.com', mobile: '01012345678', group: '학생' }, { name: '김민석', email: 'kms123@gmail.com', mobile: '01012345678', group: '학생' }, { name: '김민석', email: 'kms123@gmail.com', mobile: '01012345678', group: '학생' }, { name: '김민석', email: 'kms123@gmail.com', mobile: '01012345678', group: '학생' }, { name: '김민석', email: 'kms123@gmail.com', mobile: '01012345678', group: '학생' }, { name: '김민석', email: 'kms123@gmail.com', mobile: '01012345678', group: '학생' }, { name: '김민석', email: 'kms123@gmail.com', mobile: '01012345678', group: '학생' }]
    }
  },
  methods: {
    closeSubPop () {
      this.subPopShowYn = false
      this.selectedList = []
    },
    closePop () {
      this.$emit('closePop')
    }
  },
  props: {
    regiType: {}
  },
  mounted () {
    if (this.regiType === 'P') { this.popHeaderT = '수신대상 등록하기' } else if (this.regiType === 'G') { this.popHeaderT = '수신대상 엑셀업로드' }
  },
  components: {
    selectGroupPop
  }
}
</script>
<style scoped>

.inputLabel{width: 100px; color: #3A3A3A; font-size: 15px; line-height: 30px;}
.popBody .inputRow{width: 100%; min-height: 2rem; margin-bottom: 0.5rem; position: relative;}
.inputRow input{width: calc(100% - 130px); box-sizing: border-box;}
.orgaIcon{position: absolute; right: 2.3rem; top: 0.3rem;}
.selectedGroup{min-width: 80px; margin-right: 0.3rem; margin-bottom: 0.3rem; min-height: 22px; border-radius: 15px; border: 1px solid #BFBFDA; float: left; color: #000000; font-size: 11px; padding: 0.2rem 0.5rem; }
.selectedGroup img{float: right; margin-left: 0.5rem; margin-top: 0.25rem;}
.smallSize{width: 466px !important; height: 300px;}

.bigSize{width: 1200px !important; height: 900px; top: 10%!important;}
#step4 th{color: #3A3A3A; font-size: 15px; background:#F5F6FA; height: 1.5rem;}
#step4 td{text-align: center; min-height: 2.5rem; height: 2.5rem; color: #3A3A3A; font-size: 15px;}
#step4 .bodyText{color: #3A3A3A; font-size: 15px; margin-top: 1rem; margin-bottom: 0.8rem; line-height: 30px; float: left; margin-right: 3rem;}
</style>
