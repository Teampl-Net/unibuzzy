<template>
<div style="padding: 60px 1.5rem 0 1rem ;box-sizing: border-box; width: 100%; height: 100%;" >
<!-- <div v-for="(data, index) in editMenuList" :key="index" class="fl" style="width:100%; height:3rem; padding: 0 2rem; border-bottom:1px solid #ccc; ">
  <p class="fl commonBlack font16" style="line-height:3rem;">{{data.menuName}}</p>
</div> -->
  <div class="editMyChanMenuWrap">
    <table class="myChanMenuTable">

      <tr>
        <th class="font16">
          <div class="myChanMenuImgArea">
            <img class="fl img-w23" src="../../../assets/images/main/chanIcon.svg"/>
            <!-- <img style="width:20px;" class="fl" src="../../../assets/images/main/icon_channel.png"> -->
          </div>
          <p class="font16 fl mleft-05">채널</p>
        </th>
        <td class="">
          <gBtnSmall class="fr" @click="editChanDetaillClick" btnTitle="편집" />
          <!-- <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt=""> -->
        </td>
      </tr>

      <tr >
        <th class="font16">
          <div class="myChanMenuImgArea">
            <img class="fl img-w25" src="../../../assets/images/common/icon_manager.svg">
            <!-- <img class="fl img-w25" src="../../../assets/images/common/icon_user_unlock.svg"> -->
          </div>
          <p class="font16 fl mleft-05">멤버</p>
          <!-- <p class="font16 fl mleft-05">공개{{managerYn ? '/매니저' : ''}}</p> -->
        </th>
        <td class="">
          <gBtnSmall class="fr" @click="followerEditClick('manager')" btnTitle="관리" />
          <!-- <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt=""> -->
        </td>
      </tr>
      <!-- <tr >
        <th class="font16">
          <div class="myChanMenuImgArea">
            <img class="fl img-w25" src="../../../assets/images/common/icon_user_unlock.svg">
          </div>
          <p class="font16 fl mleft-05">공개대상</p>
        </th>
        <td class="">
          <gBtnSmall class="fr" @click="managerEditClick('member')" btnTitle="관리" />
        </td>
      </tr> -->

      <tr >
        <th class="font16">
          <div class="myChanMenuImgArea">
            <img class="fl img-w25" src="../../../assets/images/channel/channer_addressBook.svg">
          </div>
          <p class="font16 fl mleft-05">주소록</p>
          </th>
        <td class="">
          <gBtnSmall class="fr" @click="addressEditClick" btnTitle="관리" />
          <!-- <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt=""> -->
        </td>
      </tr>

      <tr >
        <th class="font16">
          <div class="myChanMenuImgArea">
            <img src="../../../assets/images/channel/channer_board_color.png" class="fl img-w25" >
          </div>
          <p class="font16 fl mleft-05">게시판</p>
          </th>
        <td class="">
          <gBtnSmall class="fr" @click="boardEditClick" btnTitle="관리" />
          <!-- <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt=""> -->
        </td>
      </tr>

      <!-- <tr @click="autoAnswerClick">
        <th class="font16">자동 응답</th>
        <td class="">
          <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt="">
        </td>
      </tr> -->

      <!-- <tr @click="memberFormEditClick">
        <th class="font16">공개신청서 관리</th>
        <td class="">
          <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt="">
        </td>
      </tr> -->

      <!-- <tr @click="chanDetailClick">
        <th class="font16">채널 상세</th>
        <td class="">
          <img class="fr btnStyle" src="../../../assets/images/common/icon_back.png" alt="">
        </td>
      </tr> -->
    </table>
  </div>
</div>

</template>
<script>
export default {
  props: {
    propData: {}
  },
  data () {
    return {
      editMenuList: [{ menuName: '주소록 관리' }, { menuName: '게시판 관리' }, { menuName: '채널 상세' }, { menuName: '매니저 관리' }, { menuName: '자동 응답' }],
      param: {},
      managerYn: false

    }
  },
  async created () {
    this.param = this.CHANNEL_DETAIL
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    CHANNEL_DETAIL () {
      var detailList = this.$getDetail('TEAM', this.propData.teamKey)
      if (detailList) {
        return detailList[0]
      } else {
        return null
      }
    }
  },
  methods: {
    /* async getTeamInfo () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.teamKey)
      var result = await this.$getTeamList(paramMap)
      this.teamInfo = result.data.content[0]
      // console.log(this.teamInfo)
      // if (this.teamInfo) if (this.teamInfo.userTeamInfo) if (this.teamInfo.userTeamInfo.managerKey) this.managerYn = true
    }, */
    addressEditClick () {
      this.param.targetType = 'editBookList'
      this.openPop()
    },
    boardEditClick () {
      this.param.targetType = 'editBoard'
      this.openPop()
    },
    chanDetailClick () {
      this.param.targetType = 'chanInfo'
      this.openPop()
    },
    editChanDetaillClick () {
      this.param.targetType = 'createChannel'
      this.param.targetKey = this.propData.teamKey
      this.param.modiYn = true
      this.openPop()
    },
    followerEditClick () {
      this.param.targetType = 'followerManagement'
      this.openPop()
    },
    managerEditClick () {
      this.param.targetType = 'managerManagement'
      this.openPop()
    },
    autoAnswerClick () {
      this.param.targetType = 'autoAnswer'
      this.openPop()
    },
    memberFormEditClick () {
      this.param.targetType = 'memberFormList'
      this.openPop()
    },
    openPop () {
      // this.$emit('openPop', this.CHANNEL_DETAIL)
      this.$emit('openPop', this.param)
    }
  }

}
</script>

<style >
.editMyChanMenuWrap{
  /* padding: 0.7rem 0 ; */
  box-sizing: border-box; width: 100%; }
.editMyChanMenuWrap table{text-align: left; width: 100%; padding: 0 10px}
.editMyChanMenuWrap tr, .editMyChanMenuWrap td, .editMyChanMenuWrap th { height: 4rem; margin-bottom: 1rem; }
.editMyChanMenuWrap td { border-bottom: none !important; padding-right: 1rem; }
.editMyChanMenuWrap tr { border-bottom: 1px solid #F3F3F3; }
.editMyChanMenuWrap th { color: #6768A7; padding-left: 1rem; }
.myChanMenuImgArea{
  width: 30px;
  float: left;
}

.editMyChanMenuWrap .btnStyle{ transform: rotate(180deg); width:10px;}

</style>
