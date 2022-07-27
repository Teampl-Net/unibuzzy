<template>
<div style="margin-top:calc(50px); width:100%;" >
 <!-- <div v-for="(data, index) in editMenuList" :key="index" class="fl" style="width:100%; height:3rem; padding: 0 2rem; border-bottom:1px solid #ccc; ">
   <p class="fl commonBlack font16" style="line-height:3rem;">{{data.menuName}}</p>
 </div> -->
 <div class="editMyChanMenuWrap">
  <table>

    <tr @click="addressEditClick">
      <th class="font16">주소록</th>
      <td class="">
        <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt="">
      </td>
    </tr>

    <tr @click="boardEditClick">
      <th class="font16">게시판 관리</th>
      <td class="">
        <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt="">
        <!-- <gBtnSmall @click="addressEdit"  btnTitle="멤버 신청하기" /> -->
      </td>
    </tr>

    <tr @click="chanDetailClick">
      <th class="font16">채널 상세</th>
      <td class="">
        <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt="">
        <!-- <gBtnSmall @click="addressEdit"  btnTitle="멤버 신청하기" /> -->
      </td>
    </tr>

    <tr @click="editChanDetaillClick">
      <th class="font16">채널 수정</th>
      <td class="">
        <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt="">
        <!-- <gBtnSmall @click="addressEdit"  btnTitle="멤버 신청하기" /> -->
      </td>
    </tr>

    <tr @click="managerEditClick">
      <th class="font16">매니저 관리</th>
      <td class="">
        <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt="">
        <!-- <gBtnSmall @click="addressEdit"  btnTitle="멤버 신청하기" /> -->
      </td>
    </tr>
    <tr @click="autoAnswerClick">
      <th class="font16">자동응답</th>
      <td class="">
        <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt="">
        <!-- <gBtnSmall @click="addressEdit"  btnTitle="멤버 신청하기" /> -->
      </td>
    </tr>

    <!-- <tr><th class="font16"> 버전정보 <p class="font10">최신버전: 1.0</p></th>
    <td class="textRight font16"></td></tr> -->


  </table>
 </div>

</div>

</template>

<script>
export default {
  props:{
    propData:{}
  },
  data (){
    return {
      editMenuList : [{ menuName:'주소록 관리'},{menuName: '게시판 관리'},{menuName: '채널 상세'},{menuName: '매니저 관리'}, {menuName: '자동응답'}],
      param: {},
      teamInfo: {}

    }
  },
  async created () {
    console.log(this.propData)
    if (this.propData) {
      await this.getTeamInfo()
      this.param = {}
      this.param.teamKey = this.propData.teamKey
      this.param.currentTeamKey = this.propData.currentTeamKey
      this.param.teamNameMtext = this.propData.teamNameMtext
      this.param.value = this.teamInfo
    }
  },
  methods: {
    async getTeamInfo () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.teamKey)
      var result = await this.$getTeamList(paramMap)
      this.teamInfo = result.data.content[0]
      console.log(this.teamInfo);
    },
    addressEditClick () {
      this.param.targetType = 'editBookList'
      this.param.value = this.teamInfo
      this.openPop()
    },
    boardEditClick () {
      this.param.targetType = 'editBoard'
      this.openPop()
    },
    chanDetailClick () {
      this.param.targetType = 'chanInfo'
      this.param.value = this.teamInfo
      this.openPop()
    },
    editChanDetaillClick () {
      this.param.targetType = 'createChannel'
      this.param.targetKey = this.propData.teamKey
      this.param.modiYn = true
      this.param.ownerYn = (JSON.parse(localStorage.getItem('sessionUser')).userKey === this.teamInfo.creUserKey)
      this.openPop()
    },
    managerEditClick () {
      this.param.targetType = 'memberManagement'
      this.param.ownerYn = (JSON.parse(localStorage.getItem('sessionUser')).userKey === this.teamInfo.creUserKey)
      this.openPop()
    },
    autoAnswerClick () {
      this.param.targetType = 'autoAnswer'
      this.openPop()
    },
    openPop () {
      this.$emit('openPop', this.param)
    }
  }

}
</script>

<style >
.editMyChanMenuWrap{padding: 0.7rem 0 ; box-sizing: border-box; width: 100%; }
.editMyChanMenuWrap table{text-align: left; width: 100%; padding: 0 10px}
.editMyChanMenuWrap tr, .editMyChanMenuWrap td, .editMyChanMenuWrap th {
  height: 4rem;
  margin-bottom: 1rem;
}
.editMyChanMenuWrap td {
  border-bottom: none !important;
  padding-right: 2rem;
}
.editMyChanMenuWrap tr{border-bottom: 1px solid #F3F3F3;
}
.editMyChanMenuWrap th {color: #6768A7;
padding-left: 3rem;
}
.editMyChanMenuWrap .btnStyle{
  transform: rotate(180deg); width:10px;

}

</style>
