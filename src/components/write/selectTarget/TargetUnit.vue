<i18n>
  {
    "ko": {
      "EMPT_MSG_NONE_ADDR": "비어있는 주소록",
      "EMPT_MSG_NONE_MEMB": "비어있는 멤버",
      "NONE_MSG_REGIST_EMAIL": "등록된 이메일이 없습니다.",
      "NONE_MSG_REGIST_NUM": "등록된 번호가 없습니다.",
      "EDIT_BOOK_TITLE_EDIT": "주소록 수정"
    },
    "en": {
      "EMPT_MSG_NONE_ADDR": "Empty team",
      "EMPT_MSG_NONE_MEMB": "Empty member list",
      "NONE_MSG_REGIST_EMAIL": "No registered email found.",
      "NONE_MSG_REGIST_NUM": "No registered phone number found.",
      "EDIT_BOOK_TITLE_EDIT": "Edit Address Books"
    }
  }
</i18n>
<template>
  <div class="receiverItemWrap" :class="{ CWhiteGrayBgColor: (pOption === 'SELECT' && pSelectedYn === true) }" >
    <div @click="selectTarget(false)" class="rowBaseCss"  :class="{hide: $changeText(pTargetData.accessName) === '본인'}">
      <img v-if="searchYn === true" class="img-w15" src="@/assets/images/common/icon_searchGray.svg" alt="">
      <div class="middleBgColor fl imgCircle" style="background-repeat: no-repeat; background-position: center center;" :style="`background-image: url('${pTargetData.iconPath}'); background-size: ${pTargetData.iconFullYn? 'cover':'50%'};`"></div>
      <div class="fl flexAlignCenter" :style="pOption === 'EDIT' || pOption === 'FOLLOW' ? 'width: calc(100% - 150px);' : 'width: calc(100% - 100px);'">
        <div class="textLeft fl textOverdot w100P">
          <p class="fl font16 commonDarkGray fontBold textOverdot w100P">{{$changeText(pTargetData.accessName)}}{{ pTargetData.cListCount? ` (${pTargetData.cListCount})` : '' }}</p>
          <span v-if="pTargetData.accessDispComment" class="fl commonDarkGray font14">{{pTargetData.accessDispComment}}</span>
          <template v-else-if="!pTargetData.accessDispComment && pTargetData.accessKind !== 'F' && pTargetData.cList && pTargetData.cList.length > 0">
            <div class="w100P textOverdot" style="height: 20px;">
              <span v-for="target, index in pTargetData.cList" :key="target.accessKey" class="font14 commonDarkGray">{{target.accessName}}{{ pTargetData.cList.length - 1 === index? '':', ' }} </span>
            </div>
          </template>
          <span v-else-if="!pTargetData.accessDispComment && pTargetData.accessKind !== 'F' && pTargetData.cList && pTargetData.cList.length === 0" class="fl commonDarkGray font14">빈주소록</span>
          <span v-else-if="!pTargetData.accessDispComment && pTargetData.accessKind !== 'F' && pTargetData.cListCount" class="fl commonDarkGray font14">빈주소록</span>
        </div>
        </div>
      <div v-if="pOption === 'SELECT' && (!pSubOption || (pSubOption && pSubOption === 'USER' && pTargetData.accessKind === 'U'))" class="fr cursorP flexAlignCenter">
        <div @click.stop="selectTarget(true)" class="fl mright-03 selectImgWrap" :class="{ 'CDeepBgColor' : pSelectedYn === true}">
          <img class="fl img-w13" src="@/assets/images/common/icon_check_white.svg" alt="선택 아이콘">
        </div>
      </div>
      <div v-if="pOption === 'FOLLOW' && pTargetData.accessKind === 'U'" class="fr cursorP flexAlignCenter">
        <template v-if="pSubOption === 'EDIT'">
          <img @click.stop="deleteUser" src="@/assets/images/board/icon_trash.svg" class="img-w20 fl deleteImg">
        </template>
        <template v-else>
          <gBtnSmall v-if="pTargetData.accessType && pTargetData.accessType === 1" btnThema="light"  btnTitle="Following" class="font16 mright-05"/>
          <gBtnSmall v-else-if="pTargetData.accessType !== undefined && pTargetData.accessType === 0" btnTitle="Follow" class="font16 mright-05"/>
          <!-- <img @click="sendPushAlim" class="fl img-w20" src="@/assets/images/common/icon_message_solid.svg" alt="선택 아이콘"> -->
        </template>
      </div>
      <div v-if="pOption === 'FOLLOW' && pTargetData.accessKind === 'C'" class="fr cursorP flexAlignCenter">
        <img @click.stop="editAddressBook" src="@/assets/images/board/icon_edit.svg" class="img-w20 fl editImg">
        <img @click.stop="deleteBook" src="@/assets/images/board/icon_trash.svg" class="img-w20 fl deleteImg">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    pTargetData: Array,
    pSelectedYn: Boolean,
    pReloadList: Function,
    pOption: String,
    pSubOption: String
  },
  created () {
    console.log('pSelectData', this.pSelectData)
  },
  data () {
    return {
      isChangeNameYn: false
    }
  },
  methods: {
    sendPushAlim () {
      var param = {}
      param.targetType = 'writeContents'
      param.contentsJobkindId = 'ALIM'
      param.teamKey = this.pTargetData.teamKey
      param.targetKey = this.pTargetData.teamKey
      param.currentTeamKey = this.pTargetData.teamKey
      param.userName = this.pTargetData.accessName
      param.userDispMtext = this.pTargetData.accessName
      param.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      param.userKey = this.GE_USER.userKey
      param.creUserKey = this.GE_USER.userKey
      param.targetUserKey = this.pTargetData.accessKey
      param.replyPopYn = true
      this.$emit('openPop', param)
    },
    editAddressBook () {
      var param = {}
      param.targetType = 'creAddressBook'
      param.popHeaderText = this.$t('EDIT_BOOK_TITLE_EDIT')
      param.newAddressYn = false
      param.cabinet = { cabinetKey: this.pTargetData.accessKey, cabinetNameMtext: this.$changeText(this.pTargetData.accessName) }
      param.callbackFn = this.pReloadList
      this.$emit('openPop', param)
    },
    async selectTarget (selectYn) {
      console.log(this.pTargetData)
      let result = null
      // 자식 list가 없거나, 체크박스를 클릭한 경우에는 addTarget이 되도록 selectYn을 파라미터로 받습니다
      if (!selectYn && this.pTargetData.cList && this.pTargetData.accessKind !== 'F') {
        this.$emit('openSelectTargetPop', this.pTargetData)
      } else if (!selectYn && (this.pTargetData.accessKind === 'F' || this.pTargetData.accessKind === 'T')) {
        const param = new Map()
        if (this.pTargetData.accessKind === 'F') {
          if (this.pTargetData.accessKey === 0) {
            param.set('targetKind', 'U')
            param.set('targetKey', this.GE_USER.userKey)
          } else if (this.pTargetData.accessKey === 1) {
            param.set('targetKind', 'U')
            param.set('userKey', this.GE_USER.userKey)
          }

          result = await this.$gGetOnlyFollowerList(param)
          if (!result.content) {
            this.$showToastPop('오류가 발생하였습니다. 다시 시도해주세요.')
          } else {
            const resultData = result.content
            const tempList = resultData.map(value => {
              console.log(value.userKey)
              if (this.pTargetData.accessKey === 0) {
                return {
                  accessKey: value.userKey,
                  accessKind: 'U',
                  accessType: value.followingYn ? 1 : this.pTargetData.accessKey,
                  accessDispComment: value.followingYn ? '서로 팔로우하는 사람' : '나를 팔로우하는 사람',
                  accessName: this.$changeText(value.userDispMtext),
                  iconPath: value.domainPath ? this.$changeUrlBackslash(value.domainPath + value.userProfileImg) : value.userProfileImg,
                  iconFullYn: true
                }
              } else if (this.pTargetData.accessKey === 1) {
                return {
                  accessKey: value.targetKey,
                  accessKind: 'U',
                  accessType: this.pTargetData.accessKey,
                  accessDispComment: value.followerYn ? '서로 팔로우하는 사람' : '내가 팔로우하는 사람',
                  accessName: this.$changeText(value.targetDispMtext),
                  iconPath: value.domainPath ? this.$changeUrlBackslash(value.targetDomainPath + value.targetProfileImg) : value.targetProfileImg,
                  iconFullYn: true
                }
              }
            })
            const returnData = this.pTargetData
            returnData.cList = tempList
            this.$emit('openSelectTargetPop', returnData)
          }
        } else {
          param.set('targetKind', 'T')
          param.set('targetKey', this.pTargetData.accessKey)
          param.set('pageSize', 1000)

          result = await this.$getFollowerList(param)
          if (!result) {
            this.$showToastPop('오류가 발생하였습니다. 다시 시도해주세요.')
          } else {
            const resultData = result
            const tempList = resultData.map(value => {
              console.log(value.userKey)
              return {
                accessKey: value.userKey,
                accessKind: 'U',
                accessType: this.pTargetData.accessKey,
                accessName: this.$changeText(value.userDispMtext),
                iconPath: value.domainPath ? this.$changeUrlBackslash(value.domainPath + value.userProfileImg) : value.userProfileImg,
                iconFullYn: true
              }
            })

            const returnData = this.pTargetData
            returnData.cList = tempList
            this.$emit('openSelectTargetPop', returnData)
          }
        }
      } else {
        console.log(this.pTargetData)
        this.$emit('addTarget', this.pTargetData)
      }
    },
    editBook () {
      const params = {}
      params.accessKey = this.pTargetData.accessKey
      params.accessName = this.pTargetData.accessName
      params.emitType = 'EDIT'
      this.$emit('targetEmitFunction', params)
    },
    deleteBook () {
      const params = {}
      params.cabinetKey = this.pTargetData.accessKey
      params.accessKey = this.pTargetData.accessKey
      params.emitType = 'DELETEBOOK'
      params.axiosUrl = '/sUniB/tp.deleteCabinet'
      this.$emit('targetEmitFunction', params)
    },
    deleteUser () {
      const params = {}
      params.jobkindId = 'USER'
      params.mccKey = this.pTargetData.mccKey
      params.accessKey = this.pTargetData.accessKey
      params.axiosUrl = '/sUniB/tp.deleteMCabContents'
      params.emitType = 'DELETEUSER'
      this.$emit('targetEmitFunction', params)
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>

<style scoped>
.hide {
  display: none !important;
}
.cursorP {
  cursor: pointer;
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.w100P {
  width: 100%;
}
.textOverdot{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.fontBold {
  font-weight: bold;
}

.textLeft {
  text-align: left;
}
.commonDarkGray {
  color: #6D6D6D;
}
.selectedSpan {
  width: 20px;
  height: 20px;
  left: 330px;
  top: 25px;
  background: #5F61BD;
  border: 1.5px solid #5F61BD;
  border-radius: 50%;
}
.rowBaseCss {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  gap: 10px;
  width: 100%;
  min-height: 70px;
  left: 0px;
  width: 100%;
  float: left;
}
.receiverItemWrap {
  border-bottom: 1px solid #BDBDBD50;
  width: 100%;
  float: left;
}
.cabinetNameWrap {
  display: flex;
  align-items: center;
  width: calc(100% - 100px);
}
.memberPicImgWrap {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
}
.imgPholder {
  background-image: url('/resource/userCommonIcon/userImg01.svg');
}
.divideLine {
  margin: 0 0.3rem;
}
.editImg {
  margin: 0 10px;
}
.deleteImg {
  width: 20px;
  margin: 0 10px;
}
.selectImgWrap {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 1px solid #5F61BD;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgCircle {
  overflow: hidden;
  float: left;
}
.img-w25 {
  width: 25px;
}
.img-w20 {
  width: 20px;
}
.img-w15 {
  width: 15px;
}
.img-w13 {
  width: 13px;
}
.flexAlignCenter {
  display: flex;
  align-items: center;
}
.font16 {
  font-size: 16px;
}
.font14 {
  font-size: 14px;
}
.mright-03 {
  margin-right: 0.3rem;
}
@media screen and (max-width: 300px) {
  .img-w25 {
    width: 23px !important;
  }
  .img-w20 {
    width: 18px !important;
  }
  .img-w15 {
    width: 13px !important;
  }
  .img-w13 {
    width: 11px !important;
  }
  .font16 {
    font-size: 14px !important;
  }
  .font14 {
    font-size: 12px !important;
  }
}
</style>
