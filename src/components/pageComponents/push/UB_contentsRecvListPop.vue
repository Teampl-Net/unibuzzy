<template>
    <div class="contentsRecvPopWrap">
        <div class="headerShadow contentsRecvPopHeader">
            <p class="font22 fontBold textLeft commonColor">수신자 목록</p>
            <img @click="closeXPop(false)"  src="../../../assets/images/common/popup_close.png" alt="">
        </div>
        <div class="okScrollBar contentsRecvPopBody">
            <div v-for="(actor, index) in this.mActorList" class="contentsRecvPopListWrap" :key="index">
                <template v-if="actor.accessKind === 'C'">
                    <div class="imgCircle middleBgColor fl" @click="clickEvntToParents('open')" >
                        <img src="../../../assets/images/board/icon_book.svg" class="fl content img-w25"/>
                    </div>
                    <div class="fl mleft-05 recvBookItem">
                        <div class="textLeft fl textOverdot w100P">
                            <p class="fl font16 commonDarkGray fontBold textOverdot w100P">{{this.$changeText(actor.cabinetNameMtext)}}</p>
                            <p class="fl font14 commonDarkGray textOverdot w100P" v-if="actor.mUserList" >{{makeSummaryText(actor.mUserList)}}</p>
                        </div>
                    </div>
                </template>

                <template v-else-if="actor.accessKind === 'M'">
                    <div class="imgCircle middleBgColor fl" @click="clickEvntToParents('open')" >
                        <img src="../../../assets/images/common/memberIcon.svg" class="content img-w30"/>
                    </div>
                    <div class="fl mleft-05 recvBookItem" @click="clickEvntToParents('open')">
                        <div class="textLeft fl textOverdot w100P">
                            <p class="fl font16 commonDarkGray fontBold textOverdot w100P">{{this.$changeText(actor.memberTypeNameMtext)}}</p>
                            <!-- <p class="fl font14 commonDarkGray textOverdot" style="width: calc(100%)" >{{cabinetNames}}</p> -->
                        </div>
                    </div>
                </template>

                <!-- 유저 영역 -->
                <template v-else-if="actor.accessKind === 'U'">
                    <div class="imgCircle middleBgColor fl" @click="clickEvntToParents('open')" >
                        <div v-if="actor.domainPath || actor.userProfileImg" :style="'background-image: url(' + (actor.domainPath? actor.domainPath + (actor.userProfileImg ? actor.userProfileImg : actor.pathMtext ) : actor.userProfileImg ) + ');'"  class="memberPicImgWrap recvUserIcon">
                        </div>
                        <div v-else  class="memberPicImgWrap recvUserIcon noIcon">
                        </div>
                    </div>
                    <div class="fl w100P mleft-05 flexAlignCenter" @click="clickEvntToParents('open')">
                        <div class="textLeft fl w100P " style="" >
                            <p class="fl font16 commonDarkGray fontBold w100P"><img v-if="actor.userKey === GE_USER.userKey" class="img-w20 mright-03" src="../../../assets/images/editChan/icon_self.svg">{{this.$changeText(actor.userDispMtext)}}</p>
                            <p class="fl font14 commonDarkGray " style="" >{{actor.userEmail ? changeDot('email', actor.userEmail) : '등록된 이메일이 없습니다.'}}</p>
                            <p class="fl font14 commonDarkGray recvInfoDivideLine">|</p>
                            <p class="fl font14 commonDarkGray " style="" >{{actor.phoneEnc ? changeDot('phone', actor.phoneEnc) : '등록된 번호가 없습니다.'}}</p>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="contentsRecvPopFooter">
            <gBtnSmall @click="sendMsgToRecvList" class="mright-05" btnTitle="알림 또 보내기"/>
            <gBtnSmall @click="closeXPop(false)" btnThema="light" btnTitle="닫기"/>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    initData: {}
  },
  data () {
    return {
      mActorList: [],
      popId: null
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.closeXPop(false)
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  },
  created () {
    if (this.initData) {
      this.mActorList = this.initData.actorList
    }
    var history = this.$store.getters['UB_HISTORY/hStack']
    this.popId = 'recvListPop' + history.length
    history.push(this.popId)
    this.$store.commit('UB_HISTORY/updateStack', history)
  },
  methods: {
    makeSummaryText (list) {
      if (!list || list.length === 0) return []
      var returnText = ''
      for (var i = 0; i < list.length; i++) {
        if (i > 4) break
        if (i > 0) {
          returnText += ', '
        }
        returnText += this.$changeText(list[i].userDispMtext)
      }
      if (list.length > 4) returnText += '외 ' + (list.length - 5) + '명'
      return returnText
    },
    sendMsgToRecvList () {
      var selectedList = { memberList: [], bookList: [] }
      for (let index = 0; index < this.mActorList.length; index++) {
        var actor = this.mActorList[index]
        if (actor.accessKind === 'C') {
          selectedList.bookList.push(this.mActorList[index])
        } else if (actor.accessKind === 'M') {
          this.mActorList[index].memberYn = true
          selectedList.bookList.push(this.mActorList[index])
        } else if (actor.accessKind === 'U') {
          selectedList.memberList.push(this.mActorList[index])
        }
      }
      this.closeXPop(selectedList)
    },
    closeXPop (data) {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', hStack)
        if (data === false) {
          this.$emit('closeXPop')
        }
        this.$emit('closeXPop', data)
      } else {

      }
    },
    changeDot (type, data) {
      return this.$changeFollowerInfo(type, data)
    }
  }
}
</script>

<style scoped>
.contentsRecvPopWrap {
  width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  height: 400px;
  position: fixed;
  border-radius: 0.8rem;
  z-index: 11;
  top: 20%;
  left: 20px;
  background: #fff;
}
.contentsRecvPopHeader {
  width: 100%;
  height: 50px;
  float: left;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  position: relative;
}
.contentsRecvPopHeader > img {
  width: 25px;
  position: absolute;
  right: 15px;
  top: 13px;
  cursor: pointer;
}
.contentsRecvPopBody {
  width: 100%;
  height: calc(100% - 100px);
  overflow: hidden scroll;
}
.contentsRecvPopListWrap {
  width: calc(100% - 40px);
  height: 100%;
  display: flex;
  border-bottom: 1px solid #ccc;
  height: 80px;
  align-items: center;
  margin: 10px 20px;
}
.recvBookItem {
  display: flex;
  align-items: center;
  width: calc(100% - 100px);
}
.recvUserIcon {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.noIcon {
  background-image: url('/resource/userCommonIcon/userImg01.svg');
}
.recvInfoDivideLine {
  margin: 0 0.3rem;
}
.contentsRecvPopFooter {
  display: flex;
  width: 100%;
  justify-content: center;
  height: 50px;
}
</style>
