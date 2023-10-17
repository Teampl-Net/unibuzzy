<i18n>
{
  "ko": {
    "EDIT_BOOK_TITLE_PEOPLE": "인원",
    "EDIT_BOOK_BTN_ADD": "+ 추가하기",
    "EDIT_BOOK_NAME_ME": "나",
    "EDIT_BOOK_MSG_SELECTED": "이미 선택되었습니다.",
    "EDIT_BOOK_MSG_ONEPEOPLE": "담당자는 한 명만 부여 가능합니다!"
  },
  "en": {
    "EDIT_BOOK_TITLE_PEOPLE": "Members",
    "EDIT_BOOK_BTN_ADD": "+ Add",
    "EDIT_BOOK_NAME_ME": "Me",
    "EDIT_BOOK_MSG_SELECTED": "User already selected",
    "EDIT_BOOK_MSG_ONEPEOPLE": "Only one person in charge can be assigned!"
  }
}
</i18n>
<template>
  <div class="w100P fl">
    <div class="CWhiteGrayBgColor addReceiverBtnWrap">
      <p class="textLeft fontBold font13 fl commonDarkGray">{{(teamList.bookList.length > 0 ? teamList.bookList.length + " " + $t('COMMON_NAME_ADDRBOOK') : '') + ((teamList.bookList.length > 0 && teamList.memberList.length > 0) ? ', ' : '') +  (teamList.memberList.length > 0 ? teamList.memberList.length + " " + $t('EDIT_BOOK_TITLE_PEOPLE') : '')}}</p>
      <gBtnSmall class="fr CDeepBgColor borderRadi10" :btnTitle="$t('EDIT_BOOK_BTN_ADD')" @click="sendReceivers" v-if="btnVisible !== false" />
    </div>
    <div class="selecteItemdArea" :class="!isMobile? 'thinScrollBar':''" id="selectedItemWrap" @wheel="horizontalScroll">
      <div v-for="(team, index) in teamList.bookList" :key='index' class="fl mright-1 selectedBookListWrap">
        <div class="w100P fl" v-if="!team.memberYn">
          <div class="middleBgColor fl imgCircle"  >
              <img src="../../../assets/images/channel/channer_addressBook.svg" class="fl img-w20" alt="">
          </div>
          <p class="fl font15 commonBlack textOverdot w100P">{{$changeText(team.cabinetNameMtext)}}</p>
          <span class="fr whiteColor CDeepBgColor selectedItemDeleteBtn" @click="removeSelectedYn('book', index, team.cabinetKey)">x</span>
        </div>
        <div class="w100P fl" v-else-if="team.memberYn">
          <div class="middleBgColor fl imgCircle">
              <img src="../../../assets/images/common/memberIcon.svg" class="fl img-w20" alt="">
          </div>
          <p class="fl font15 commonBlack textOverdot w100P">{{$changeText(team.nameMtext)}}</p>
          <span class="fr whiteColor CDeepBgColor selectedItemDeleteBtn" @click="removeSelectedYn('book', index, team.memberTypeKey)">x</span>
        </div>
      </div>
      <div v-for="(member, index) in teamList.memberList" :key='index'  class=" fl mright-1 selectedBookListWrap">
        <div class="middleBgColor fl imgCircle" >
          <div v-if="member.domainPath || member.userProfileImg" :style="'background-image: url(' + (member.domainPath? member.domainPath + (member.userProfileImg ? $changeUrlBackslash(member.userProfileImg) : $changeUrlBackslash(member.pathMtext)) : member.userProfileImg ) + ');'"  class="memberPicImgWrap selectedMemImgWrap"></div>
          <div v-else class="memberPicImgWrap selectedMemImgWrap noImg"></div>
        </div>
        <p class="fl font15 commonBlack textOverdot w100P">{{GE_USER.userKey === member.userKey ? $t('EDIT_BOOK_NAME_ME') : $changeText(member.userDispMtext)}}</p>
        <span class="fr whiteColor CDeepBgColor selectedMemDeleteBtn" @click="removeSelectedYn('member', index, member.accessKey)">x</span>
      </div>
    </div>
    <gConfirmPop  :confirmText="$t('EDIT_BOOK_MSG_SELECTED')" confirmType='timeout' v-if="showErrorPopYn" @no="showErrorPopYn = false" />
  </div>
</template>

<script>
export default {
  props: {
    listData: {},
    btnVisible: {},
    oneMemberCanAddYn: {}
  },
  data () {
    return {
      teamList: { bookList: [], memberList: [] },
      showErrorPopYn: false,
      isMobile: /Mobi/i.test(window.navigator.userAgent)
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    }
  },
  methods: {
    horizontalScroll (e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 5
      })
    },
    newUpdateMember (data) {
      this.teamList.memberList = data
    },
    newUpdateBook (data) {
      this.teamList.bookList = data
    },
    upDatePage (data) {
      if (data) {
        if (data.bookList !== undefined && data.bookList !== null) {
          this.teamList.bookList = data.bookList
        }
        if (data.memberList !== undefined && data.memberList !== null && data.memberList.length > 0) {
          this.teamList.memberList = data.memberList
        }
      } else {
        if (this.listData !== undefined && this.listData !== null) {
          if (this.listData.bookList !== undefined && this.listData.bookList !== null && this.listData.bookList.length > 0) {
            this.teamList.bookList = JSON.parse(JSON.stringify(this.listData.bookList))
          }
          if (this.listData.memberList !== undefined && this.listData.memberList !== null && this.listData.memberList.length > 0) {
            this.teamList.memberList = []
            this.teamList.memberList = JSON.parse(JSON.stringify(this.listData.memberList))
          }
        }
      }
    },
    sendReceivers () {
      if (this.oneMemberCanAddYn) {
        if (this.teamList.memberList.length > 1) {
          alert(this.$t('EDIT_BOOK_MSG_ONEPEOPLE'))
          return
        }
      }
      this.$emit('btnClick', this.teamList)
    },
    removeSelectedYn (type, index, key) {
      if (type === 'book') {
        this.teamList.bookList.splice(index, 1)
        this.teamList.type = 'C'
        this.$emit('changeSelectBookList', this.teamList.bookList)
      } else if (type === 'member') {
        this.teamList.memberList.splice(index, 1)
        this.teamList.type = 'U'
        this.$emit('changeSelectMemberList', this.teamList.memberList)
      }
      if (key !== undefined && key !== null && key !== '') {
        this.teamList.delKey = key
      }

      this.teamList.index = index
    }
  }
}
</script>

<style >
.receiverTeamText {
  height :40px;
  cursor: pointer;
  line-height: 40px;
}
.receiverTeamSubscImg {
  width: 12px;
}
.fontBold {
  font-weight: bold;
}
.trans90 {
  transform: rotate(270deg)
}
.selecteItemdArea {
  display: flex;
  width: 100%;
  padding: 15px;
  overflow: auto;
  white-space: nowrap;
  flex-direction: row;
  background: #fff;
}
.editmLeft {
    margin-left: 30px;
}
.selPopFl {
  float: left;
  margin-left: 1rem;
}

.mobileMleft {
  margin-left: 0.5rem;
}
.imgCircle {
  overflow: hidden;
}
.memberPicImgWrap {
  width: 100%;
  height: 100%;
}
.addReceiverBtnWrap {
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
}
.borderRadi10 {
  border-radius: 10px !important;
}
.selectedBookListWrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 60px
}
.selectedItemDeleteBtn {
  border-radius: 100%;
  width: 20px;
  height: 20px;
  line-height: 18px;
  position: absolute;
  right: -10px;
  top: -10px;
}
.selectedMemImgWrap {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.noImg {
  /* background-image: url('/resource/userCommonIcon/userImg01.svg'); */
}
.selectedMemDeleteBtn {
  border-radius: 100%;
  width: 20px;
  height: 20px;
  line-height: 18px;
  position: absolute;
  right: -5px;
  top: -5px;
  text-align: center;
}
@media screen and (max-width: 410px) {
  .selfAddArea{
      width: calc(100% - 15px);
      margin: 0.5rem 0rem !important;
  }
  .mobileMleft{
      margin-left: 0.5rem;
      white-space:nowrap
  }
}
</style>
