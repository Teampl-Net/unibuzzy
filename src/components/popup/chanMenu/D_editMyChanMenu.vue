<template>
<div style="padding: 60px 1.5rem 0 1rem ;box-sizing: border-box; width: 100%; height: 100%;" >

  <div class="editMyChanMenuWrap">
    <table class="myChanMenuTable w-100P fl" >

      <tr v-if="this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1" @click="openEditChanPop">
        <th class="font16 w-100P">
          <div class="myChanMenuImgArea editMychanRow mright-05">
            <img class="img-w20 chanImg" src="../../../assets/images/main/icon_channer.png"/>
            <!-- <img style="width:20px;" class="fl" src="../../../assets/images/main/icon_channel.png"> -->
          </div>
          <div class="fl mleft-05" style="height: 80%; width: calc(100% - 100px);">
          <p class="font16 commonDarkGray fontBold">채널 관리</p>
          <p class="font14 commonDarkGray textOverdot" style="width:calc(100%);" >채널정보를 수정할 수 있어요.</p>
          </div>
          <div class="myChanMenuImgAreaRight editMychanRow">
            <img class="btnStyle chanBackImg" src="../../../assets/images/common/icon_backWhitePurple.svg" alt="">
          </div>
        </th>
      </tr>

      <tr v-if="this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1" @click="openEditManagerPop('manager')">
        <th class="font16 w-100P">
          <div class="myChanMenuImgArea editMychanRow mright-05">
            <img class="img-w25 chanImg " src="../../../assets/images/editChan/icon_userEdit.svg">
          </div>
          <div class="fl mleft-05" style="height: 80%; width: calc(100% - 100px);">
            <p class="font16 commonDarkGray fontBold">구독자 관리</p>
            <p class="font14 commonDarkGray textOverdot" style="width:calc(100%);"> 구독자에게 권한을 부여할 수 있어요</p>
          </div>
          <div class="myChanMenuImgAreaRight editMychanRow">
            <img class="btnStyle chanBackImg" src="../../../assets/images/common/icon_backWhitePurple.svg" alt="">
          </div>
        </th>
      </tr>

      <tr v-if="this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1" @click="openEditCabinetPop">
        <th class="font16 w-100P">
          <div class="myChanMenuImgArea editMychanRow mright-05">
            <img class="img-w20 chanImg" src="../../../assets/images/editChan/icon_addressBook.svg">
          </div>
          <div class="fl mleft-05" style="height: 80%; width: calc(100% - 100px);">
            <p class="font16 commonDarkGray fontBold">주소록 관리</p>
            <p class="font14 commonDarkGray textOverdot" style="width:calc(100%);">주소록을 생성, 수정할 수 있어요.</p>
          </div>
          <div class="myChanMenuImgAreaRight editMychanRow">
            <img class="btnStyle chanBackImg" src="../../../assets/images/common/icon_backWhitePurple.svg" alt="">
          </div>
        </th>
      </tr>

      <tr v-if="this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1" @click="openEditBoardPop">
        <th class="font16 w-100P">
          <div class="myChanMenuImgArea editMychanRow mright-05">
            <img class="img-w20 chanImg" src="../../../assets/images/editChan/icon_board.svg">
          </div>
          <div class="fl mleft-05" style="height: 80%; width: calc(100% - 100px);">
            <p class="font16 commonDarkGray fontBold">게시판 관리</p>
            <p class="font14 commonDarkGray textOverdot" style="width:calc(100%);">게시판을 생성, 수정할 수 있어요.</p>
          </div>
          <div class="myChanMenuImgAreaRight editMychanRow">
            <img class="btnStyle chanBackImg" src="../../../assets/images/common/icon_backWhitePurple.svg" alt="">
          </div>
        </th>
      </tr>

      <!-- <tr @click="openEditMemberPop">
        <th class="font16 w-100P">
          <div class="myChanMenuImgArea editMychanRow mright-05">
            <img class="img-w20 chanImg" src="../../../assets/images/editChan/icon_board.svg">
          </div>
          <div class="fl mleft-05" style="height: 80%; width: calc(100% - 100px);">
            <p class="font16 commonDarkGray fontBold">공개신청서 관리</p>
            <p class="font14 commonDarkGray textOverdot" style="width:calc(100%);">게시판을 생성, 수정할 수 있어요.</p>
          </div>
          <div class="myChanMenuImgAreaRight editMychanRow">
            <img class="btnStyle chanBackImg" src="../../../assets/images/common/icon_backWhitePurple.svg" alt="">
          </div>
        </th>
      </tr> -->

      <!-- <tr @click="autoAnswerClick">
        <th class="font16 w-100P">
          <div class="myChanMenuImgArea editMychanRow mright-05">
            <img class="img-w20 chanImg" src="../../../assets/images/editChan/icon_board.svg">
          </div>
          <div class="fl mleft-05" style="height: 80%; width: calc(100% - 100px);">
            <p class="font16 commonDarkGray fontBold">자동 응답</p>
            <p class="font14 commonDarkGray textOverdot" style="width:calc(100%);">채널의 자동 응답을 설정할 수 있어요.</p>
          </div>
          <div class="myChanMenuImgAreaRight editMychanRow">
            <img class="btnStyle chanBackImg" src="../../../assets/images/common/icon_backWhitePurple.svg" alt="">
          </div>
        </th>
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
      mCommonParam: {}
    }
  },
  async created () {
    this.mCommonParam = this.CHANNEL_DETAIL
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
    openEditCabinetPop () {
      this.mCommonParam.targetType = 'editBookList'
      this.mCommonParam.chanName = this.propData.teamNameMtext
      this.mCommonParam.popHeaderText = '주소록 관리'
      this.openPop()
    },
    openEditBoardPop () {
      this.mCommonParam.targetType = 'editBoard'
      this.mCommonParam.popHeaderText = '게시판 관리'
      this.openPop()
    },
    chanDetailClick () {
      this.mCommonParam.targetType = 'chanInfo'
      this.mCommonParam.popHeaderText = '채널 상세'
      this.openPop()
    },
    openEditChanPop () {
      this.mCommonParam.targetType = 'createChannel'
      this.mCommonParam.targetKey = this.propData.teamKey
      this.mCommonParam.popHeaderText = '채널 수정'
      this.mCommonParam.modiYn = true
      this.openPop()
    },
    openEditManagerPop () {
      this.mCommonParam.targetType = 'memberManagement'
      this.mCommonParam.popHeaderText = '구독자 관리'
      this.openPop()
    },
    autoAnswerClick () {
      this.mCommonParam.targetType = 'autoAnswer'
      this.mCommonParam.popHeaderText = '자동 응답'
      this.openPop()
    },
    openEditMemberPop () {
      this.mCommonParam.targetType = 'memberFormList'
      this.mCommonParam.popHeaderText = '공개신청서 목록'
      this.openPop()
    },
    openPop () {
      // this.$emit('openPop', this.CHANNEL_DETAIL)
      this.$emit('openPop', this.mCommonParam)
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
.editMyChanMenuWrap th { color: #6768A7; padding-left: 1rem; font-weight: normal; min-height: 70px;}
.myChanMenuImgArea{
  width: 30px;
  float: left;
}
.myChanMenuImgAreaRight{
  width: 30px;
  float: right;
}
.editMychanRow{
  position:relative; height: 80%;
}
.chanImg{
  height: auto; position:absolute; top:50%; transform:translateY(-50%);
}
.chanBackImg{
  position:absolute; top:40%;
}
/* .editMyChanMenuWrap .btnStyle{ transform: rotate(180deg); width:10px;} */

</style>
