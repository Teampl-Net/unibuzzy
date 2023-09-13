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
  <!-- <div style="width: 100%; ; background: white; padding: 10px; box-shadow:-3px -2px 14px 0px #ccc" class=""> -->
  <div class="w100P fl">
    <div class="CWhiteGrayBgColor addReceiverBtnWrap">
      <p class="textLeft fontBold font13 fl commonDarkGray">{{(teamList.bookList.length > 0 ? teamList.bookList.length + " " + $t('COMMON_NAME_ADDRBOOK') : '') + ((teamList.bookList.length > 0 && teamList.memberList.length > 0) ? ', ' : '') +  (teamList.memberList.length > 0 ? teamList.memberList.length + " " + $t('EDIT_BOOK_TITLE_PEOPLE') : '')}}</p>
      <gBtnSmall class="fr CDeepBgColor borderRadi10" :btnTitle="$t('EDIT_BOOK_BTN_ADD')" @click="sendReceivers" v-if="btnVisible !== false" />
    </div>
    <div class="selecteItemdArea" :class="!isMobile? 'thinScrollBar':''" id="selectedItemWrap" @wheel="horizontalScroll">
      <!-- <div v-for="(data, index) in receiverList" :key="index" class=" fl mright-1"  style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <template v-if="data.jobkindId === 'BOOK'">
          <img src="../../../assets/images/channel/channer_addressBook.svg" class="fl mright-05" style="width:20px" alt="">
          <p class="fl font15 commonBlack">{{this.$changeText(data.cabinetNameMtext)}}</p>
        </template>
        <template v-else-if="data.jobkindId === 'USER'">
          <div class="middleBgColor fl" >
            <div v-if="data.userProfileImg" :style="'background-image: url(' + (data.domainPath? data.domainPath + data.userProfileImg : data.userProfileImg ) + ');'" style="background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap"></div>
            <div v-else style="background-image: url('../../../../assets/images/main/main_subscriber.png');background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap"></div>
          </div>
          <p class="fl font15 commonBlack">{{this.GE_USER.userKey === data.userKey ? '나' : this.$changeText(data.userDispMtext)}}</p>
        </template>
        <span class="fr whiteColor CDeepBgColor" @click="removeSelectedYn((data.jobkindId === 'BOOK' ? 'book' : 'user'),index, team.cabinetKey)" style="border-radius: 100%; width:20px; height:20px; line-height:18px; position:absolute; right: -10px; top:-10px;">x</span>
      </div> -->
      <div v-for="(team, index) in teamList.bookList" :key='index' class="fl mright-1 selectedBookListWrap">
        <div class="w100P fl" v-if="!team.memberYn">
          <div class="middleBgColor fl imgCircle"  >
              <img src="../../../assets/images/channel/channer_addressBook.svg" class="fl img-w20" alt="">
          </div>
          <p class="fl font15 commonBlack textOverdot w100P">{{this.$changeText(team.cabinetNameMtext)}}</p>
          <span class="fr whiteColor CDeepBgColor selectedItemDeleteBtn" @click="removeSelectedYn('book', index, team.cabinetKey)">x</span>
        </div>
        <div class="w100P fl" v-else-if="team.memberYn">
          <div class="middleBgColor fl imgCircle">
              <img src="../../../assets/images/common/memberIcon.svg" class="fl img-w20" alt="">
          </div>
          <p class="fl font15 commonBlack textOverdot w100P">{{this.$changeText(team.nameMtext)}}</p>
          <span class="fr whiteColor CDeepBgColor selectedItemDeleteBtn" @click="removeSelectedYn('book', index, team.memberTypeKey)">x</span>
        </div>
      </div>
      <div v-for="(member, index) in teamList.memberList" :key='index'  class=" fl mright-1 selectedBookListWrap">
        <div class="middleBgColor fl imgCircle" >
          <div v-if="member.domainPath || member.userProfileImg" :style="'background-image: url(' + (member.domainPath? member.domainPath + (member.userProfileImg ? member.userProfileImg : member.pathMtext) : member.userProfileImg ) + ');'"  class="memberPicImgWrap selectedMemImgWrap"></div>
          <div v-else class="memberPicImgWrap selectedMemImgWrap noImg"></div>
        </div>
        <p class="fl font15 commonBlack textOverdot w100P">{{this.GE_USER.userKey === member.userKey ? $t('EDIT_BOOK_NAME_ME') : this.$changeText(member.userDispMtext)}}</p>
        <span class="fr whiteColor CDeepBgColor selectedMemDeleteBtn" @click="removeSelectedYn('member', index, member.accessKey)">x</span>
      </div>
      <!-- <div v-for="(team, index) in teamList.bookList" :key='index' class=" fl"  style="padding: 5px 10px; margin-right: 1.5rem; margin-bottom: 5px; background: #fff;  border-radius: 5px; position:relative; margin-bottom:1.3rem" >
        <img src="../../../assets/images/channel/channer_addressBook.svg" class="fl mright-05" style="width:20px" alt="">
        <p class="fl font15 commonBlack">{{this.$changeText(team.cabinetNameMtext)}}</p>
        <span class="fr commonColor" @click="removeSelectedYn('book',index, team.cabinetKey)" style="border-radius: 100%; border: 1px solid #6768A7; background-color:white; width:20px; height:20px; line-height:18px; position:absolute; right: -10px; top:-10px;">x</span>
      </div>

      <div v-for="(member, index) in teamList.memberList" :key='index' class=" fl"   style="padding: 5px 10px; margin-right: 1.5rem; margin-bottom: 5px; background: #fff;  border-radius: 5px; position:relative; margin-bottom:1.3rem"  >
        <img src="../../../assets/images/main/main_subscriber.png" style="float: left; width: 20px; " />
        <p class="fl font15 commonBlack">{{this.$changeText(member.userDispMtext || member.userNameMtext) }}</p>
        <span class="fr commonColor" @click="removeSelectedYn('member',index, member.userKey)" style="border-radius: 100%; border: 1px solid #6768A7; background-color:white; width:20px; height:20px; line-height:18px; position:absolute; right: -10px; top:-10px;">x</span>
      </div> -->

    </div>
    <gConfirmPop  :confirmText="$t('EDIT_BOOK_MSG_SELECTED')" confirmType='timeout' v-if="showErrorPopYn" @no='this.showErrorPopYn = false' />
  </div>
</template>

<script>
export default {
  props: {
    listData: {},
    itemType: {},
    btnVisible: {},
    currentTeamKey: {},
    selectMemberPopYn: {},
    selectShareTargetYn: {},
    oneMemberCanAddYn: {}
  },
  data () {
    return {
      upTxt: '>',
      downTxt: '<',
      editTeamName: '',
      editNameYn: null,
      teamList: { bookList: [], memberList: [] },
      dragging: false,
      showErrorPopYn: false,
      receiverList: [],
      isMobile: /Mobi/i.test(window.navigator.userAgent)
    }
  },
  created () {
    // this.upDatePage(this.listData)
  },
  watch: {
    listData () {
      // this.upDatePage(this.listData)
    }
  },
  components: {
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  methods: {
    // setReceiverData () {
    //   var selectedReceiverList = []
    //   var temp = {}
    //   if (this.listData !== undefined && this.listData !== null) {
    //     if (this.listData.bookList !== undefined && this.listData.bookList !== null && this.listData.bookList.length > 0) {
    //       for (let i = 0; i < this.listData.bookList.length; i++) {
    //         temp = {}
    //         temp = this.listData.bookList[i]
    //         temp.jobkindId = 'BOOK'
    //         selectedReceiverList.push(temp)
    //       }
    //     }
    //     if (this.listData.memberList !== undefined && this.listData.memberList !== null && this.listData.memberList.length > 0) {
    //       for (let i = 0; i < this.listData.memberList.length; i++) {
    //         temp = {}
    //         temp = this.listData.memberList[i]
    //         temp.jobkindId = 'USER'
    //         selectedReceiverList.push(temp)
    //       }
    //     }
    //   }
    //   this.receiverList = selectedReceiverList
    // },
    horizontalScroll (e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 5
      })
    },
    addNewMember () {
      this.$emit('openAddPop')
    },
    newUpdateMember (data) {
      this.teamList.memberList = data
    },
    newUpdateBook (data) {
      this.teamList.bookList = data
    },
    // 유민참고
    upDatePage (data) {
      // var temp
      // this.setReceiverData()

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
            // for (let i = 0; i < this.listData.bookList.length; i++) {
            //   temp = {}
            //   temp = this.listData.bookList[i]
            //   this.teamList.bookList.push(temp)
            // }
            this.teamList.bookList = JSON.parse(JSON.stringify(this.listData.bookList))
          }
          if (this.listData.memberList !== undefined && this.listData.memberList !== null && this.listData.memberList.length > 0) {
            this.teamList.memberList = []
            // for (let i = 0; i < this.listData.memberList.length; i++) {
            //   temp = {}
            //   temp = this.listData.memberList[i]
            //   this.teamList.memberList.push(temp)
            // }
            this.teamList.memberList = JSON.parse(JSON.stringify(this.listData.memberList))
          }
        }
      }
    },
    sendReceivers () {
      // this.teamList.itemType = this.itemType
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
        // var accessKey = this.teamList.memberList[index].accessKey
        this.teamList.memberList.splice(index, 1)
        this.teamList.type = 'U'
        this.$emit('changeSelectMemberList', this.teamList.memberList)
      }
      if (key !== undefined && key !== null && key !== '') {
        this.teamList.delKey = key
      }

      this.teamList.index = index
    },
    teamPlusClick (data, index) {
      // const obj = new Object();
      // obj.data = data;
      // obj.index = index
      // this.teamList.splice(index, 1)
      // this.$emit('selectTeam', obj);
    },
    clickList (data) {
      // if(this.selectPopYn !== true)
      // this.$emit('openDetail',data)
    },
    deleteTeamClick (data, index) {
      // this.teamList.splice(index, 1)
    },
    editClick (data, index) {

    },
    newAddTeam () {
    }
  }
}
</script>

<style >
/* .receiverTeamListCard{display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom:1px solid #eee;  padding: 0.7rem 0} */
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
/* .movePointerArea{
    transform: scaleY(1.7);
        margin-top: 0.1rem;
} */

/* .widthPop{
    width:80% !important;
} */
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
  background-image: url('/resource/userCommonIcon/userImg01.svg');
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
  /* .selecteItemdArea{
      height:calc(100% - 3rem - 30px) !important;
  } */
}
</style>
