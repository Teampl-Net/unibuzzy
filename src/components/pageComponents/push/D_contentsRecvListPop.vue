<template>
    <div style="width: calc(100% - 40px); display: flex; flex-direction: column; height: 400px; position: fixed; border-radius: 0.8rem; z-index: 11; top: 20%; left: 20px; background: #fff;">
        <div style="width: 100%; height: 50px; float: left; padding: 5px 10px; display: flex; align-items: center; position: relative;" class="headerShadow">
            <p class="font22 fontBold textLeft commonColor">{{ $t('COMMON_TODO_RECEIVER') }}</p>
            <img @click.stop="closeXPop(false)"  src="../../../assets/images/common/popup_close.png" style="width: 25px; position: absolute; right: 15px; top: 13px; cursor: pointer;" alt="">
        </div>
        <div style="width: 100%; height: calc(100% - 100px); overflow: hidden scroll; " class="okScrollBar">
            <div v-for="(actor, index) in this.mActorList" style="width: calc(100% - 40px); height: 100%; display: flex; border-bottom: 1px solid #ccc; height: 80px; align-items: center; margin: 10px 20px;" :key="index">
                <template v-if="actor.accessKind === 'C'">
                    <div class="imgCircle middleBgColor fl" @click.stop="clickEvntToParents('open')" >
                        <img src="../../../assets/images/board/icon_book.svg" class="fl content img-w25"/>
                    </div>
                    <div class="fl mleft-05" style="display: flex; align-items: center; width: calc(100% - 100px); ">
                        <div class="textLeft fl textOverdot w-100P" style="" >
                            <p class="fl font16 commonDarkGray fontBold textOverdot w-100P">{{this.$changeText(actor.cabinetNameMtext)}}</p>
                            <p class="fl font14 commonDarkGray textOverdot" v-if="actor.mUserList" style="width: calc(100%)" >{{makeSummaryText(actor.mUserList)}}</p>
                        </div>
                    </div>
                </template>

                <template v-else-if="actor.accessKind === 'M'">
                    <div class="imgCircle middleBgColor fl" @click.stop="clickEvntToParents('open')" >
                        <img src="../../../assets/images/common/memberIcon.svg" class="content img-w30"/>
                    </div>
                    <div class="fl mleft-05" style="display: flex; align-items: center; width: calc(100% - 100px);" @click.stop="clickEvntToParents('open')">
                        <div class="textLeft fl textOverdot w-100P" style="" >
                            <p class="fl font16 commonDarkGray fontBold textOverdot w-100P">{{this.$changeText(actor.memberTypeNameMtext)}}</p>
                            <!-- <p class="fl font14 commonDarkGray textOverdot" style="width: calc(100%)" >{{cabinetNames}}</p> -->
                        </div>
                    </div>
                </template>

                <!-- 유저 영역 -->
                <template v-else-if="actor.accessKind === 'U'">
                    <div class="imgCircle middleBgColor fl" @click.stop="clickEvntToParents('open')" >
                        <div v-if="actor.domainPath || actor.userProfileImg" :style="'background-image: url(' + (actor.domainPath? actor.domainPath + (actor.userProfileImg ? actor.userProfileImg : actor.pathMtext ) : actor.userProfileImg ) + ');'" style="background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap">
                        </div>
                        <div v-else style="background-image: url('/resource/userCommonIcon/userImg01.svg');background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap">
                        </div>
                    </div>
                    <div class="fl w-100P mleft-05" style="display: flex; align-items: center; " @click.stop="clickEvntToParents('open')">
                        <div class="textLeft fl w-100P " style="" >
                            <p class="fl font16 commonDarkGray fontBold w-100P"><img v-if="actor.userKey === GE_USER.userKey" class="img-w20 mright-03" src="../../../assets/images/editChan/icon_self.svg">{{this.$changeText(actor.userDispMtext)}}</p>
                            <p class="fl font14 commonDarkGray " style="" >{{actor.userEmail ? changeDot('email', actor.userEmail) : $t('COMMON_MSG_NO_EMAIL')}}</p>
                            <p class="fl font14 commonDarkGray" style="margin: 0 0.3rem">|</p>
                            <p class="fl font14 commonDarkGray " style="" >{{actor.phoneEnc ? changeDot('phone', actor.phoneEnc) : $t('COMMON_MSG_NO_PHONE')}}</p>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div v-if="initData && initData.jobkindId !== 'TODO'" style="display: flex; width: 100%; justify-content: center; height: 50px;">
            <gBtnSmall @click.stop="sendMsgToRecvList" class="mright-05" :btnTitle="$t('COMM_BTN_SEND_NOTI_AGAIN')"/>
            <gBtnSmall @click.stop="closeXPop(false)" btnThema="light" :btnTitle="$t('COMM_BTN_CLOSE')"/>
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
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
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
      console.log(this.initData)
      this.mActorList = this.replaceArr(this.initData.actorList)
      console.log(this.mActorList)
    }
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'recvListPop' + history.length
    // console.log(history)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  methods: {
    replaceArr (arr) {
      if (!arr || arr.length === 0) return
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ accessKey, accessKind }) => accessKey === current.accessKey && accessKind === current.accessKind) === -1) {
          data.push(current)
        }
        return data
      }, [])
      return uniqueArr
    },
    makeSummaryText (list) {
      console.log(list)
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
      console.log(returnText)
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
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
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

<style>

</style>
