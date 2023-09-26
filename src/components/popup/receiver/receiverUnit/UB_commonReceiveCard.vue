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
  <div class="fl w100P receiverItemWrap" :class="{ CWhiteGrayBgColor: (option === 'SELE' && propData.selectedYn === true) }" >
    <div class="fl w100P rowBaseCss">
      <img v-if="searchYn === true" class="img-w15 fl" src="../../../../assets/images/common/icon_searchGray.svg" alt="">
      <!-- 주소록 영역 -->
      <template v-if="propData.jobkindId === 'BOOK' && !propData.memberYn">
        <div class="imgCircle middleBgColor fl" @click="clickEvntToParents('open')" >
          <img src="../../../../assets/images/board/icon_book.svg" class="content img-w25"/>
        </div>
        <div class="fl flexAlignCenter" :style="option === 'EDIT' ? 'width: calc(100% - 150px);' : 'width: calc(100% - 100px);' " @click="clickEvntToParents('open')">
          <div class="textLeft fl textOverdot w100P">
            <p class="fl font16 commonDarkGray fontBold textOverdot w100P">{{$changeText(propData.cabinetNameMtext)}}</p>
            <p class="fl font14 commonDarkGray textOverdot w100P">{{cabinetNames}}</p>
          </div>
        </div>
      </template>
      <template v-else-if="propData.jobkindId === 'BOOK' && propData.memberYn">
        <div class="imgCircle middleBgColor fl" @click="clickEvntToParents('open')" >
          <img src="../../../../assets/images/common/memberIcon.svg" class="content img-w30"/>
        </div>
        <div class="fl cabinetNameWrap" @click="clickEvntToParents('open')">
          <div class="textLeft fl textOverdot w100P">
            <p class="fl font16 commonDarkGray fontBold textOverdot w100P">{{$changeText(propData.nameMtext)}}</p>
            <p class="fl font14 commonDarkGray textOverdot w100P">{{cabinetNames}}</p>
          </div>
        </div>
      </template>
      <!-- 유저 영역 -->
      <template v-else-if="propData.jobkindId === 'USER'">
        <div class="imgCircle middleBgColor fl" @click="clickEvntToParents('open')" >
          <div v-if="propData.domainPath || propData.userProfileImg" :style="'background-image: url(' + (propData.domainPath? propData.domainPath + ($changeUrlBackslash(propData.userProfileImg) ? $changeUrlBackslash(propData.userProfileImg) : propData.pathMtext ) : propData.userProfileImg ) + ');'" class="memberPicImgWrap">
          </div>
          <div v-else class="memberPicImgWrap imgPholder"></div>
        </div>
        <div class="fl w100P flexAlignCenter" @click="clickEvntToParents('open')">
          <div class="textLeft fl w100P">
            <p class="fl font16 commonDarkGray fontBold w100P"><img v-if="propData.userKey === GE_USER.userKey" class="img-w20 mright-03" src="../../../../assets/images/editChan/icon_self.svg">{{this.$changeText(propData.userDispMtext)}}</p>
            <p class="fl font14 commonDarkGray">{{propData.userEmail ? changeDot('email', propData.userEmail) : $t('NONE_MSG_REGIST_EMAIL')}}</p>
            <p class="fl font14 commonDarkGray divideLine">|</p>
            <p class="fl font14 commonDarkGray">{{propData.phoneEnc ? changeDot('phone', propData.phoneEnc) : $t('NONE_MSG_REGIST_NUM')}}</p>
          </div>
        </div>
      </template>
      <!-- 공통 -->
      <div v-if="option === 'EDIT'" class="fr cursorP flexAlignCenter">
        <img v-if="propData.jobkindId === 'BOOK'" src="../../../../assets/images/board/icon_edit.svg" class="img-w20 fl editImg" @click="clickEvntToParents('edit')" >
        <img src="../../../../assets/images/board/icon_trash.svg" class="img-w20 fl deleteImg" @click="clickEvntToParents('delete')" >
      </div>

      <div v-if="option === 'SELE'" class="fr cursorP flexAlignCenter" @click="clickEvntToParents('editList', compoIdx)">
        <div class="fl mright-03 selectImgWrap" :class="{ 'CDeepBgColor' : propData.selectedYn === true}">
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
      mSelectedInfo: []
    }
  },
  props: {
    propData: {},
    option: { type: String, default: 'EDIT' },
    selectedYn: { type: Boolean, default: false },
    compoIdx: {}
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
      return this.$store.getters['UB_USER/GE_USER']
    }
  }
}

</script>

<style scoped>
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
  justify-content: space-between;
  padding: 0px;
  gap: 10px;
  width: 100%;
  min-height: 70px;
  left: 0px;
}
.receiverItemWrap {
  border-bottom: 1px solid #BDBDBD50;
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
}
</style>
