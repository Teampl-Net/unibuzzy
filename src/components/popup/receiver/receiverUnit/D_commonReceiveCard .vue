<i18n>
  {
    "ko": {
      "EMPT_MSG_NONE_ADDR": "비어있는 주소록",
      "EMPT_MSG_NONE_MEMB": "비어있는 멤버",
      "NONE_MSG_REGIST_EMAIL": "등록된 이메일이 없습니다.",
      "NONE_MSG_REGIST_NUM": "등록된 번호가 없습니다.",
    },
    "en": {
      "EMPT_MSG_NONE_ADDR": "Empty team",
      "EMPT_MSG_NONE_MEMB": "Empty member list",
      "NONE_MSG_REGIST_EMAIL": "No registered email found.",
      "NONE_MSG_REGIST_NUM": "No registered phone number found."
    }
  }
</i18n>
<template>
  <div class="fl w100P" style="border-bottom: 1px solid; border-color: #BDBDBD50" :class="{ CWhiteGrayBgColor: (option === 'SELE' && propData.selectedYn === true) }" >
    <div class="fl w100P rowBaseCss"  style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
      <img v-if="searchYn === true" class="img-w15 fl" src="../../../../assets/images/common/icon_searchGray.svg" alt="">
      <!-- 주소록 영역 -->
      <template v-if="propData.jobkindId === 'BOOK' && !propData.memberYn">
        <div class="imgCircle middleBgColor fl" @click="clickEvntToParents('open')" >
          <img src="../../../../assets/images/board/icon_book.svg" class="content img-w25"/>
        </div>
        <div class="fl" style="display: flex; align-items: center;" :style="option === 'EDIT' ? 'width: calc(100% - 150px);' : 'width: calc(100% - 100px);' " @click="clickEvntToParents('open')">
          <div class="textLeft fl textOverdot w100P" style="" >
            <p class="fl font16 commonDarkGray fontBold textOverdot w100P">{{this.$changeText(propData.cabinetNameMtext)}}</p>
            <p class="fl font14 commonDarkGray textOverdot" style="width: calc(100%)" >{{cabinetNames}}</p>
          </div>
        </div>
      </template>

      <template v-else-if="propData.jobkindId === 'BOOK' && propData.memberYn">
        <div class="imgCircle middleBgColor fl" @click="clickEvntToParents('open')" >
          <img src="../../../../assets/images/common/memberIcon.svg" class="content img-w30"/>
        </div>
        <div class="fl" style="display: flex; align-items: center; width: calc(100% - 100px);" @click="clickEvntToParents('open')">
          <div class="textLeft fl textOverdot w100P" style="" >
            <p class="fl font16 commonDarkGray fontBold textOverdot w100P">{{this.$changeText(propData.nameMtext)}}</p>
            <p class="fl font14 commonDarkGray textOverdot" style="width: calc(100%)" >{{cabinetNames}}</p>
          </div>
        </div>
      </template>

      <!-- 유저 영역 -->
      <template v-else-if="propData.jobkindId === 'USER'">
        <div class="imgCircle middleBgColor fl" @click="clickEvntToParents('open')" >
          <div v-if="propData.domainPath || propData.userProfileImg" :style="'background-image: url(' + (propData.domainPath? propData.domainPath + (propData.userProfileImg ? propData.userProfileImg : propData.pathMtext ) : propData.userProfileImg ) + ');'" style="background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap">
          </div>
          <div v-else style="background-image: url('/resource/userCommonIcon/userImg01.svg');background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap">
          </div>
        </div>
        <div class="fl w100P" style="display: flex; align-items: center; " @click="clickEvntToParents('open')">
          <div class="textLeft fl w100P " style="" >
            <p class="fl font16 commonDarkGray fontBold w100P"><img v-if="propData.userKey === GE_USER.userKey" class="img-w20 mright-03" src="../../../../assets/images/editChan/icon_self.svg">{{this.$changeText(propData.userDispMtext)}}</p>
            <p class="fl font14 commonDarkGray " style="" >{{propData.userEmail ? changeDot('email', propData.userEmail) : this.$t('NONE_MSG_REGIST_EMAIL')}}</p>
            <p class="fl font14 commonDarkGray" style="margin: 0 0.3rem">|</p>
            <p class="fl font14 commonDarkGray " style="" >{{propData.phoneEnc ? changeDot('phone', propData.phoneEnc) : this.$t('NONE_MSG_REGIST_NUM')}}</p>
          </div>
        </div>
      </template>

      <!-- 공통 -->
      <div v-if="option === 'EDIT'" class="fr cursorP" style="display: flex; align-items: center;">
        <img v-if="propData.jobkindId === 'BOOK'" src="../../../../assets/images/board/icon_edit.svg" class="img-w20 fl" style="margin: 0 10px;" @click="clickEvntToParents('edit')" >
        <img src="../../../../assets/images/board/icon_trash.svg" class="img-w20 fl" style="width: 20px; margin: 0 10px;" @click="clickEvntToParents('delete')" >
      </div>

      <div v-if="option === 'SELE'" class="fr cursorP" style="display: flex; align-items: center;" @click="clickEvntToParents('editList', compoIdx)">
        <div class="fl mright-03" style="width:20px; height:20px; border-radius:100%; border:1px solid #5F61BD; display: flex; justify-content: center; align-items: center;" :class="{ 'CDeepBgColor' : propData.selectedYn === true}">
          <!-- <img v-if="propData.selectedYn === true" class="fl img-w13" src="../../../../assets/images/common/icon_check_white.svg" alt="선택 아이콘"> -->
          <img class="fl img-w13" src="../../../../assets/images/common/icon_check_white.svg" alt="선택 아이콘">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      cabinetNames: {},
      mSelectedMemberIdx: 0,
      mSelectedMembers: [],
      mSelectedInfo: [],
      pPropMemberList: [],
      pFollowerMemList: []
    }
  },
  props: {
    propData: {},
    option: { type: String, default: 'EDIT' },
    selectedYn: { type: Boolean, default: false },
    compoIdx: {},
    subTitleHidden: { type: Boolean, default: false },
    pSelectedList: {}
  },
  methods: {
    clickEvntToParents (type, index) {
      this.mSelectedMemberIdx = index
      const existingIndex = this.mSelectedMembers.indexOf(index)
      if (existingIndex === -1) {
        this.mSelectedMembers.push(index)
      } else {
        this.mSelectedMembers.splice(existingIndex, 1)
      }
      // console.log('this.mSelectedMembers', this.mSelectedMembers)

      var param = {}
      if (type === 'editList') {
        if (this.propData.selectedYn) {
          param.targetType = 'deleteList'
        } else {
          param.targetType = 'add'
        }
      } else {
        param.targetType = type
      }
      param.data = this.propData
      param.index = this.compoIdx
      param.selectedIdx = this.mSelectedMembers
      this.mSelectedInfo = param
      console.log('param', param)
      this.$emit('receiveCardEmit', param)
    },
    setCabinetNames () {
      if (this.propData.mUserList && this.propData.mUserList.length > 0) {
        var list = this.propData.mUserList
        var name = ''
        for (let i = 0; i < list.length; i++) {
          name += this.$changeText(list[i].userDispMtext) + ','
        }
        this.cabinetNames = name.substring(0, name.length - 1)
      } else {
        this.cabinetNames = this.$t('EMPT_MSG_NONE_ADDR')
      }
    },
    setMemberNames () {
      if (this.propData.muserList && this.propData.muserList.length > 0) {
        var list = this.propData.muserList
        var name = ''
        for (let i = 0; i < list.length; i++) {
          name += this.$changeText(list[i].userDispMtext) + ','
        }
        this.cabinetNames = name.substring(0, name.length - 1)
      } else {
        this.cabinetNames = this.$t('EMPT_MSG_NONE_MEMB')
      }
    },
    changeDot (type, data) {
      if (this.propData.memberNameMtext) {
        return data
      } else {
        return this.$changeFollowerInfo(type, data)
      }
    }
  },
  created () {
    console.log('pSelectedList', this.pSelectedList)
    console.log('propData', this.propData)
    if (this.propData.jobkindId === 'BOOK') {
      if (!this.propData.memberYn) {
        this.setCabinetNames()
      } else if (this.propData.memberYn) {
        this.setMemberNames()
      }
    }
  },
  updated () {
    if (this.propData.jobkindId === 'BOOK') {
      if (!this.propData.memberYn) {
        this.setCabinetNames()
      } else if (this.propData.memberYn) {
        this.setMemberNames()
      }
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
.selectedSpan{
  width: 20px;
  height: 20px;
  left: 330px;
  top: 25px;
  background: #5F61BD;
  border: 1.5px solid #5F61BD;
  border-radius: 50%;
}
.rowBaseCss{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  gap: 10px;

  width: 100%;
  min-height: 70px;
  left: 0px;
}
</style>
