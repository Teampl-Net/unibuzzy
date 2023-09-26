<i18n>
{
  "ko": {
    "MANA_NAME_CAHN": "채널 관리",
    "MANA_MSG_CAHN": "채널정보를 수정할 수 있어요.",
    "MANA_NAME_FOLLOW": "구독자 관리",
    "MANA_MSG_FOLLOW": "구독자에게 권한을 부여할 수 있어요.",
    "MANA_NAME_ADDRBOOK": "주소록 관리",
    "MANA_MSG_ADDRBOOK": "주소록을 생성, 수정할 수 있어요.",
    "MANA_NAME_BOARD": "게시판 관리",
    "MANA_MSG_BOARD": "게시판을 생성, 수정할 수 있어요.",
    "MANA_MSG_FAILED": "죄송합니다. 잠시 후 다시 시도해주세요.",
    "MANA_TITLE_CHANDETAIL": "채널 상세",
    "MANA_TITLE_EDITCHAN": "채널 수정"
  },
  "en": {
    "MANA_NAME_CAHN": "Manage Channel",
    "MANA_MSG_CAHN": "Modify channel information.",
    "MANA_NAME_FOLLOW": "Manage Members",
    "MANA_MSG_FOLLOW": "Grant permissions to members.",
    "MANA_NAME_ADDRBOOK": "Manage Team",
    "MANA_MSG_ADDRBOOK": "Create and Edit Team.",
    "MANA_NAME_BOARD": "Manage Board",
    "MANA_MSG_BOARD": "Create and Edit Board.",
    "MANA_MSG_FAILED": "Sorry. Please try again in a moment.",
    "MANA_TITLE_CHANDETAIL": "Channel Detail",
    "MANA_TITLE_EDITCHAN": "Edit a Channel"
  }
}
</i18n>
<template>
<div class="editChanWrap">
  <transition name="show_left">
    <manageFollowerList v-if="mPopType === 'memberManagement'" :propData="mCommonParam" style="padding-top: 0;" @memberInfo="openMemberInfo" @openPop="openPop" :pClosePop="closePop" />
  </transition>
  <transition name="show_left">
    <editBookListPop v-if="mPopType === 'editBookList'" @memberInfo="openMemberInfo" :propData="mCommonParam" :pClosePop="closePop" />
  </transition>
  <createBoardChannel @successCreChan="successCreChan" v-if="mPopType === 'createChannel'" :channelModiYn="channelModiYn=true" :chanDetail="mCommonParam" :pClosePop="closePop" />
  <editBoardListPop v-if="mPopType === 'editBoard'" :propData="mCommonParam" :pClosePop="closePop" />
  <div class="userDetailShadow" v-if="mUserDetailPopShowYn" @click="mSelectedMemberInfo"></div>
  <userDetailPop v-if="mUserDetailPopShowYn" :propData="mSelectedMemberInfo" :pClosePop="closeMemberInfo" />
  <gPopHeader :headerTitle="$t('MANA_TITLE_CHANDETAIL')" :pClosePop="pClosePop" />
  <div class="editMyChanMenuWrap" :style="`padding-top: ${Number($STATUS_HEIGHT + 70)}px`">
    <table class="myChanMenuTable w100P fl" >
      <tr v-if="CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1" @click="openEditChanPop" style="">
        <th class="font16 w100P padding10">
          <div class="myChanMenuImgArea editMychanRow mright-05">
            <img class="img-w20 chanImg" src="../../../assets/images/main/icon_channel.png"/>
          </div>
          <div class="fl mleft-05 mngChanRow">
            <p class="font16 commonDarkGray fontBold">{{ $t('MANA_NAME_CAHN') }}</p>
            <p class="font14 commonDarkGray textOverdot w100P">{{ $t('MANA_MSG_CAHN') }}</p>
          </div>
          <div class="myChanMenuImgAreaRight editMychanRow">
            <img class="btnStyle chanBackImg" src="../../../assets/images/common/icon_backWhitePurple.svg" alt="">
          </div>
        </th>
      </tr>

      <tr v-if="CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1 || CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1" @click="openEditManagerPop('manager')">
        <th class="font16 w100P padding10">
          <div class="myChanMenuImgArea editMychanRow mright-05">
            <img class="img-w25 chanImg " src="../../../assets/images/editChan/icon_userEdit.svg">
          </div>
          <div class="fl mleft-05 mngChanRow">
            <p class="font16 commonDarkGray fontBold">{{ $t('MANA_NAME_FOLLOW') }}</p>
            <p class="font14 commonDarkGray textOverdot w100P">{{ $t('MANA_MSG_FOLLOW') }}</p>
          </div>
          <div class="myChanMenuImgAreaRight editMychanRow">
            <img class="btnStyle chanBackImg" src="../../../assets/images/common/icon_backWhitePurple.svg" alt="">
          </div>
        </th>
      </tr>

      <tr v-if="CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1" @click="openEditCabinetPop">
        <th class="font16 w100P padding10">
          <div class="myChanMenuImgArea editMychanRow mright-05">
            <img class="img-w20 chanImg" src="../../../assets/images/editChan/icon_addressBook.svg">
          </div>
          <div class="fl mleft-05 mngChanRow">
            <p class="font16 commonDarkGray fontBold">{{ $t('MANA_NAME_ADDRBOOK') }}</p>
            <p class="font14 commonDarkGray textOverdot w100P">{{ $t('MANA_MSG_ADDRBOOK') }}</p>
          </div>
          <div class="myChanMenuImgAreaRight editMychanRow">
            <img class="btnStyle chanBackImg" src="../../../assets/images/common/icon_backWhitePurple.svg" alt="">
          </div>
        </th>
      </tr>

      <tr v-if="CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1" @click="openEditBoardPop">
        <th class="font16 w100P padding10">
          <div class="myChanMenuImgArea editMychanRow mright-05">
            <img class="img-w20 chanImg" src="../../../assets/images/editChan/icon_board.svg">
          </div>
          <div class="fl mleft-05 mngChanRow">
            <p class="font16 commonDarkGray fontBold">{{ $t('MANA_NAME_BOARD') }}</p>
            <p class="font14 commonDarkGray textOverdot" style="width:calc(100%);">{{ $t('MANA_MSG_BOARD') }}</p>
          </div>
          <div class="myChanMenuImgAreaRight editMychanRow">
            <img class="btnStyle chanBackImg" src="../../../assets/images/common/icon_backWhitePurple.svg" alt="">
          </div>
        </th>
      </tr>
    </table>
  </div>
</div>

</template>
<script>
import manageFollowerList from './UB_manageFollowerList.vue'
import editBookListPop from './UB_editBookListPop.vue'
import userDetailPop from './UB_userDetailPop.vue'
import editBoardListPop from './UB_editBoardListPop.vue'
import createBoardChannel from '@/components/UB/popup/UB_createBoardChannel'

export default {
  components: {
    manageFollowerList,
    editBookListPop,
    editBoardListPop,
    createBoardChannel,
    userDetailPop
  },
  props: {
    propData: {},
    pClosePop: Function
  },
  data () {
    return {
      mCommonParam: {},
      mPopType: '',
      channelModiYn: true,
      mSelectedMemberInfo: {},
      mUserDetailPopShowYn: false
    }
  },
  async created () {
    this.mCommonParam = this.CHANNEL_DETAIL
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
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
    openMemberInfo (member) {
      this.mSelectedMemberInfo = member
      this.mUserDetailPopShowYn = true
    },
    closeMemberInfo () {
      this.mUserDetailPopShowYn = false
      this.mSelectedMemberInfo = {}
    },
    closePop () {
      this.mPopType = ''
    },
    successCreChan (param) {
      if (param.deleteYn) {
        this.$router.push({ name: 'main' })
      }
    },
    async openEditCabinetPop () {
      this.mCommonParam.targetType = 'editBookList'
      delete this.mCommonParam.param
      var paramMap = new Map()
      paramMap.set('adminYn', true)
      paramMap.set('teamKey', this.propData.teamKey)
      paramMap.set('pageSize', 100)
      paramMap.set('sysCabinetCode', 'USER')
      this.mCommonParam.param = paramMap
      var initData = await this.$getManagingPageData(this.mCommonParam)
      if (!initData) {
        this.$showToastPop(this.$t('MANA_MSG_FAILED'))
        return
      }
      this.mCommonParam.initData = initData

      this.mCommonParam.chanName = this.propData.teamNameMtext
      this.mCommonParam.popHeaderText = this.$t('MANA_NAME_ADDRBOOK')
      this.mPopType = 'editBookList'
    },
    async openEditBoardPop () {
      this.mCommonParam.targetType = 'editBoard'
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.teamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', this.GE_USER.userKey)
      paramMap.set('adminYn', true)
      this.mCommonParam.param = paramMap
      var initData = await this.$getManagingPageData(this.mCommonParam)
      if (!initData) {
        this.$showToastPop(this.$t('MANA_MSG_FAILED'))
        return
      }
      this.mCommonParam.initData = initData

      this.mCommonParam.popHeaderText = this.$t('MANA_NAME_BOARD')
      this.mCommonParam.targetKey = this.propData.teamKey
      this.mPopType = 'editBoard'
    },
    openEditChanPop () {
      this.mCommonParam.targetType = 'createChannel'
      this.mCommonParam.targetKey = this.propData.teamKey
      this.mCommonParam.popHeaderText = this.$t('MANA_TITLE_EDITCHAN')
      this.mCommonParam.modiYn = true
      this.mPopType = 'createChannel'
    },
    async openEditManagerPop () {
      this.mCommonParam.targetType = 'memberManagement'
      delete this.mCommonParam.param
      var paramMap = new Map()
      paramMap.set('adminYn', true)
      paramMap.set('teamKey', this.propData.teamKey)
      paramMap.set('pageSize', 1000)
      this.mCommonParam.param = paramMap
      var initData = await this.$getManagingPageData(this.mCommonParam)
      this.mCommonParam.popHeaderText = this.$t('MANA_NAME_FOLLOW')
      this.mCommonParam.initData = initData
      this.mPopType = 'memberManagement'
    },
    openPop () {
      this.$emit('openPop', this.mCommonParam)
    }
  }

}
</script>

<style >
.editChanWrap {
  padding: 0 1.5rem 0 1rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  z-index: 10;
}
.createChanContentsWrap{
  width: 100%;
  left:0;
  height: auto;
  margin: 80px 0;
  float: left;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  margin-bottom: 0;
}
.editMyChanMenuWrap {
  padding-top: 60px;
  box-sizing: border-box;
  width: 100%;
}
.editMyChanMenuWrap table {
  text-align: left;
  width: 100%;
  padding: 0 10px;
}
.editMyChanMenuWrap tr, .editMyChanMenuWrap td, .editMyChanMenuWrap th {
  height: 4rem;
  margin-bottom: 1rem;
}
.editMyChanMenuWrap td {
  border-bottom: none !important;
  padding-right: 1rem;
}
.editMyChanMenuWrap tr {
  border-bottom: 1px solid #F3F3F3;
}
.editMyChanMenuWrap th {
  color: #6768A7;
  padding-left: 1rem;
  font-weight: normal;
  min-height: 70px;
}
.myChanMenuImgArea {
  width: 30px;
  float: left;
}
.myChanMenuImgAreaRight {
  width: 30px;
  float: right;
}
.editMychanRow {
  position:relative;
  height: 80%;
}
.chanImg {
  height: auto;
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
}
.chanBackImg {
  position: absolute; top:40%;
}
.userDetailShadow {
  width:100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  background: #00000050;
}
.padding10 {
  padding: 10px;
}
.mngChanRow {
  height: 80%;
  width: calc(100% - 100px);
}
</style>
