
<template>
  <!-- <div style="width: 100%; height: 100%; position: relative; overflow: hidden; float: left;"> -->
    <!-- <div id="boardPageHeader" ref="boardListHeader" class="boardListHeader"  :class="this.scrolledYn? 'boardListHeader--unpinned': 'boardListHeader--pinned'" v-on="handleScroll" >
        <gSearchBox @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
        <gActiveBar :tabList="this.activeTabList" class="fl mbottom-1" @changeTab= "changeTab"  style=" width:calc(100%);"/>
      <transition name="showModal">
        <findContentsList :contentsListTargetType="'boardMain'" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
      </transition>
    </div> -->
      <!-- <div style="width: 100%; height: 200px; background: #ccc; position: absolute; bottom: 0;">{{this.firstContOffsetY}}, {{this.scrollDirection}}, {{this.scrollPosition}}</div> -->
      <template id="boardRow" v-for="(board, index0) in commonBoardListData" :key="index0">
        <div class="commonBoardListContentBox pushMbox" v-if="board.bodyFullStr" :class="{creatorBoardContentBox: board.creUserKey === this.creUser}">
        <!-- :class="{top5MyChanColor : value.ownerYn} -->
        <!-- <div v-if="board.readYn === 0" class="readYnArea"></div> -->
          <div class="pushDetailTopArea">
            <div class="boardChanLogoImgWrap fl" :style="'background-image: url(' + (board.domainPath ? board.domainPath + board.logoPathMtext : board.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center;">
            </div>
            <img class="fr mright-03 mleft-03 cursorP" style="width:4.5px;" @click="contentMenuClick('board', board.creUserKey === creUser, board)" src="../../assets/images/common/icon_menu_round_vertical.svg"  alt="">
            <!-- <p @click="goDetail(board)" class="fl cursorP font15 fontBold commonBlack" :class="{commonBlue : board.readYn === 0}" style="width:calc(100% - (0.3rem + 0.3rem + 4.5px)); float: left;"> -->
            <p @click="goDetail(board)" class="fl cursorP font15 fontBold commonBlack" style="width:calc(100% - (0.3rem + 0.3rem + 4.5px + 48px)); float: left;">
              <!-- <img src="../../assets/images/board/readFalse.png" v-if="board.readYn === 0" class="fl mright-05" style="width: 20px;" alt="">
              <img src="../../assets/images/board/readTrue.svg" v-else class="fl mright-05" style="width: 20px;" alt=""> -->
              <pp v-if="board.jobkindId === 'ALIM'" class="font14 fl contentTypeTextArea fontNomal" style="background:#6768A7; color: #FFF;">{{'알림'}}</pp>
              <pp v-else-if="board.jobkindId === 'BOAR'" class="font14 fl contentTypeTextArea" style="background:#FFF; color: #6768A7; font-weight: bold; border: 1px solid #6768A7  ">{{'게시'}}</pp>
              {{resizeText(board.title)}}
            </p>
          <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
            <!-- <p class="font12 fl lightGray">{{this.changeText(board.nameMtext)}}</p> -->
            <!-- <p class="font12 fl lightGray">{{this.changeText(board.nameMtext)}}{{board.showCreNameYn === 1? '(' + this.$changeText(board.creUserName) + ')': ''}}</p> -->
            <p class="font12 fl lightGray" @click="userNameClick(board.creUserKey, board.creTeamKey, board.blindYn === 1)" >{{blindYn === true ? '익명' : (board.showCreNameYn === 1? this.$changeText(board.creUserName): '')}}</p>
            <p class="font12 fr lightGray">{{this.$changeDateFormat(board.creDate)}}</p>
          <!-- </div> -->
          </div>
          <div v-if="(shareAuth && shareAuth.V === false) && board.creUserKey !== userKey" @click="goDetail(board)" class="font14 cursorP mbottom-05 bodyFullStr" v-html="'열람 권한이 없는 컨텐츠 입니다.'"></div>
          <div v-else @click="goDetail(board)" class="font14 cursorP mbottom-05 bodyFullStr" v-html="setBodyLength(board.bodyFullStr)"></div>
          <div id="alimCheckArea">
            <div class="alimCheckContents">
              <!-- <div class="pushDetailStickerWrap">
                <div class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in tempAlimList.stickerList " :key="index" >
                  <img :src="value.stickerIcon" alt="">
                </div>
              </div> -->

              <p v-show="board.bodyFullStr.length > 130" @click="goDetail(board)" class="font16 textRight mbottom-05 cursorP" style="">더보기></p>
              <template v-if="nonMemYn !== true">
                <div @click="changeAct(userDo, board.contentsKey, index0)"  class="fl userDoWrap" v-for="(userDo, index) in settingUserDo(board.userDoList)" :key="index">
                  <template v-if="userDo.doType === 'ST'">
                    <img class="mright-05 fl img-w20" v-if="userDo.doKey > 0" src="../../assets/images/common/colorStarIcon.svg" alt="">
                    <img class="mright-05 fl img-w20" v-else src="../../assets/images/common/starIcon.svg" alt="">
                  </template>
                  <template v-else-if="userDo.doType === 'LI'">
                    <img class="fl img-w20" style="margin-top: 2px;" v-if="userDo.doKey > 0" src="../../assets/images/common/likeIcon.svg" alt="">
                    <img class="fl img-w20" style="margin-top: 3px;" v-else src="../../assets/images/common/light_likeIcon.svg" alt="">
                  </template>
                </div>
              </template>
              <div v-if="nonMemYn !== true" class="fr">
                  <p class="commonBlack font12"  style="float: right;">좋아요 {{board.likeCount}}개</p>
                  <p class="commonBlack font12" style="float: right; margin-right: 10px;">댓글 {{board.memoCount}}개</p>
              </div>
              <div v-else class="commonBlack font12" style="float: right; padding: 2px 10px; background: rgb(0 0 0 / 21%); border-radius: 5px;">{{board.memoCount > 0? '답변완료' : '답변대기'}}</div>
            </div>
          </div>
        </div>
      </template>
      <myObserver @triggerIntersected="loadMore" class="fl w-100P"></myObserver>
      <div class="w-100P fl mtop-1" style="position: relative; width:100%; height:30px;">
        <gLoadingS ref="sLoadingBoard" class="fl"/>
      </div>
      <!-- <gLoadingS ref="sLoadingBoard" class="fl"/> -->

    <!-- <div :class="this.scrolledYn || !this.reloadShowYn ? 'reload--unpinned': 'reload--pinned'" v-on="handleScroll" style="position: absolute; width: 50px; height: 50px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); padding: 10px; bottom: 4.5rem; right: calc(50% - 25px);" @click="refreshAll">
      <img src="../../assets/images/common/reload_button.svg" style="width: 30px; height: 30px;">
    </div> -->
  <!-- </div> -->
</template>

<script>
/* eslint-disable */
export default {
  data: function () {
    return { // 데이터 정의
      findPopShowYn: false,
      firstContOffsetY: null,
      scrollDirection: null,
      box: null,
      scrolledYn: false,
      offsetInt: 0,
      endListYn: false,
      scrollPosition: 0,
      mainYn: false,
      boardListWrap: null,
      boardList: {},
      currentScroll: 0,
      creUser: null,
      systemName: localStorage.getItem('systemName'),
      userKey: localStorage.getItem('sessionUser')? JSON.parse(localStorage.getItem('sessionUser')).userKey : null
    }
  },
  props: {
    resultSearchKeyList: {},
    reloadShowYn: {},
    activeTabList: {},
    clickEvnt: {},
    commonBoardListData: {},
    nonMemYn: {}, //비회원 문의 게시판,
    blindYn: {},
    shareAuth: {}
  },
  components: {

  },
  created () {
    // this.boardList = this.commonBoardListData

    // 비회원 문의하기에서 로컬데이터에 데이터가 없으므로 에러가 나서 if처리를 해둠
    if(localStorage.getItem('sessionUser')){
      this.creUser = JSON.parse(localStorage.getItem('sessionUser')).userKey
    }

  },
  computed: {
  },
  watch: {
    commonBoardListData() {
      this.loadingRefHide()
    }
  },
  updated () {
    // this.boardListWrap.scrollTop = this.currentScroll
    // this.box = document.getElementsByClassName('commonBoardListWrap')[0]
    this.settingAtag()
  },
  mounted () {
    this.boardListWrap = document.getElementById('boardListWrap')
    this.boardListWrap.addEventListener('scroll', this.saveScroll)
    // this.settingAtag()
    // this.box = document.getElementsByClassName('commonBoardListWrap')[0]
    // this.box.addEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    this.boardListWrap.removeEventListener('scroll', this.saveScroll)
  },
  /* emits: ['goDetail'], */
  methods: {
    userNameClick ( userKey, teamKey, blindYn) {
      if(blindYn === false){
        var param = {}
        param.targetType = 'bookMemberDetail'
        param.readOnlyYn = true
        param.userKey = userKey
        param.teamKey = teamKey
        if (userKey === this.creUser) {
          param.selfYn = true
        } else {
          param.contentOpenYn = true
        }
        this.$emit('openPop',param)
      } else {
        this.$showToastPop('익명의 게시글로 유저 정보를 볼 수 없습니다.')
      }
    },
    settingAtag () {
        if (this.systemName !== 'Android' && this.systemName !== 'android') {
            return
        }
        if (this.commonBoardListData) {
            var contentsATagList = document.querySelectorAll('#boardListWrap a')
            if (contentsATagList && contentsATagList.length > 0) {
                for (var i = 0; i < contentsATagList.length; i++) {
                contentsATagList[i].target = '_blank'
                }
            }
        }
    },
    contentMenuClick (type, ownerYn, board) {
      var param = {}
      param.type = type
      param.ownerYn = ownerYn
      param.tempData = board
      this.$emit('contentMenuClick', param)
    },
    getAbsoluteTop (element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var element = document.getElementsByClassName('commonBoardListContentBox')[0]
      //
      var parentElement = element.parentElement
      this.firstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)

      // var test = document.getElementById('boardPageHeader')
      // parentElement = element.parentElement
      // this.headerTop = this.getAbsoluteTop(test) - this.getAbsoluteTop(parentElement)

      if (this.firstContOffsetY < 0) {
        if (this.box.scrollTop > this.scrollPosition) {
          this.scrollDirection = 'down'
          this.scrolledYn = true
        } else if (this.box.scrollTop <= this.scrollPosition) {
          this.scrollDirection = 'up'
          this.scrolledYn = false
        }
      }
      this.scrollPosition = this.box.scrollTop
    },
    async changeSearchList(type) {
      if (type === 'searchKey') {
        delete this.findKeyList.searchKey
      } else if (type === 'creTeamNameMtext') { delete this.findKeyList.creTeamNameMtext } else if (type === 'creDate') {
        delete this.findKeyList.toCreDateStr
        delete this.findKeyList.fromCreDateStr
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      // await this.getCabinetDetail()
      // var resultList = await this.getCabinetDetail()
      await this.getCabinetDetail()
      //
      // this.findPopShowYn = false
    },

    loadingRefShow(){
      this.$refs.sLoadingBoard.show()
    },
    loadingRefHide(){
      this.$refs.sLoadingBoard.hide()
    },
    resizeText (text) {
      if (text.length > 20) {
        text = text.substr(0, 20)
      }
      return text
    },
    saveScroll () {
      this.currentScroll = this.boardListWrap.scrollTop
      this.$emit('currentScroll', this.currentScroll)
    },

    goDetail (value) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'boardDetail'
      param.contentsKey = value.contentsKey
      param.creUserKey = value.creUserKey
      param.targetKey = value.contentsKey
      param.value = value
      value.readYn = 1
      param.readYn = value.readYn
      this.$emit('goDetail', param)
    },
    cutStickerName (value) {
      var cutName = value.substr(0, 1)
      return cutName
    },
    settingUserDo (userDo) {
      // var userDoList = { LI: { doKey: 0 }, ST: { doKey: 0 } }
      var userDoList = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }]
      this.readYn = false
      if (userDo !== undefined && userDo !== null && userDo !== '') {
        for (var i = 0; i < userDo.length; i++) {
          if (userDo[i].doType === 'LI') {
            userDoList[1].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'ST') {
            userDoList[0].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'RE') {
            this.readYn = true
          }
        }
      }
      return userDoList
    },
async changeAct (act, contentsKey, idx) {
      var result = null
      var saveYn = true
      var temp = []
      console.log(this.commonBoardListData)
      if (!this.commonBoardListData[idx].userDoList) {
        this.commonBoardListData[idx].userDoList = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }]
      }
      if (this.commonBoardListData[idx].userDoList) {
        temp = this.commonBoardListData[idx].userDoList
      }
      var doList =this.commonBoardListData[idx].userDoList

      for (var i = 0; i < doList.length; i ++) {
        if (doList[i].doType === act.doType) {
            if (doList[i].doKey === 1) return
        }
      }
      // this.pushDetail = JSON.parse(this.detailVal).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = contentsKey
      if (param.targetKey === null) { return }
      param.doType = act.doType
      param.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
      if (saveYn === false) {
        param.doKey = act.doKey
        result = this.$saveUserDo(param, 'delete')
        if (act.doType === 'LI') {
          this.commonBoardListData[idx].likeCount -= 1
        }
        for (var i = 0; i < temp.length; i++) {
          if(temp[i].doType === act.doType) {
            temp[i].doKey = 0
          }
        }
        this.commonBoardListData[idx].userDoList = temp
        this.changeData += 1
      } else {
        param.actYn = true
        param.targetKind = 'C'
        this.$saveUserDo(param, 'save').then(result => {
          // debugger
        for (var d = temp.length - 1; d >= 0 ; d--) {
            if (temp[d].doKey === 1 && temp[d].doType === act.doType) {
                temp[d].doKey = result.doKey
            }
        }
          // temp.push({ doType: act.doType, doKey: result.doKey })
          this.commonBoardListData[idx].userDoList = temp
          this.changeData += 1
        })
        temp.push({ doType: act.doType, doKey: 1 })
        if (act.doType === 'LI') {
            this.commonBoardListData[idx].likeCount += 1
        }

        // }
      }
      /* if (result === true) {
        await this.$emit('refresh')
      } */
    },
    /* async changeAct (act, contentsKey, idx) {
      var result = null
      var saveYn = true
      // this.pushDetail = JSON.parse(this.detailVal).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = contentsKey
      param.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
      if (param.targetKey === null) { return }
      param.doType = act.doType
      if (saveYn === false) {
        param.doKey = act.doKey
        result = this.$saveUserDo(param, 'delete')

        var temp = this.commonBoardListData[idx].userDoList
        for (var i = 0; i < temp.length; i++) {
          if(temp[i].doType === act.doType) {
            temp.splice(i, 1)
          }
        }
        this.commonBoardListData[idx].userDoList = temp
        this.changeData += 1
      } else {
        param.actYn = true
        param.targetKind = 'C'
        result = this.$saveUserDo(param, 'save')
        // if (result.result === true) {
          var temp = this.commonBoardListData[idx].userDoList
          if (!temp) {
            temp = []
          }
          temp.push({ doType: act.doType, doKey: result.doKey })
          this.commonBoardListData[idx].userDoList = temp
          this.changeData += 1
          console.log(JSON.stringify(act.doType === 'LI'))
          this.commonBoardListData[idx].likeCount += 1
        // }
      }
    }, */
    async loadMore () {
      this.loadingRefShow()
      this.$emit('moreList', 10)
      /* const newArr = [
        ...this.commonBoardListData,
        ...resultList.content
      ]
      this.commonBoardListData = newArr */
    },
    setBodyLength (str) {
      // eslint-disable-next-line no-undef
      str = Base64.decode(str)
      // str = atob(str)
      if (str.length > 130) {
        str.substring(0, 130)
      }
      return str
    }
  }
}
</script>
<style scoped>
.creatorBoardContentBox {
  background-color: #6768a712 !important;
  box-shadow: 0 0 7px 3px #6768a740 !important;
}
.reload--pinned {
    transform: translateY(0%);
    transition: .3s;
}
.reload--unpinned {
    transform: translateY(10rem);
    transition: .5s;
}
.boardListHeader {
    width: 100%;
    min-height: 132px;
    position: absolute;
    background-color: #FFF;
    top: 0;
    left: 0;
    z-index: 9;
    will-change: transform;
    transition: transform 0.3s linear;
}
.boardListHeader--pinned {
    transform: translateY(0%);
}
.boardListHeader--unpinned {
    transform: translateY(-100%);
}
.bodyFullStr {
  max-height: 400px;
  overflow: hidden;
  word-break: break-word;
}
.commonListTr, .commonListTr td, .commonListTr th {height: 4rem; }
.listHeader {text-align: center;}
.listBodyRow{width: calc(100% - 60px);}

.pushDetailWrap{height: fit-content;}
.pushDetailTopArea{min-height: 3.0rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 30px; margin-right: 1px;}
.pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.1rem;}

.alimCheckContents{width: 100%;float: left; min-height: 30px;     position: relative}
.alimCheckContents > img {margin-top: 3px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100% - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}
.chanLogoImgWrap {width: 40px; float: left; display: flex; align-items: center; justify-content: center; height: 40px; border-radius: 40px; margin-right: 0.5rem; border: 2px solid #ccc;}
.pushMbox{margin-bottom: 20px;}

.commonBoardListContentBox{
    position: relative;
    width: calc(100% - 1rem);
    margin: 0.5rem 0.5rem;
    float: left;
    border-radius: 0.8rem;
    background-color: #ffffff;
    color: #363c5f;
    padding: 0.8rem 1rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 7px 3px #b7b4b440;
    animation-name: fadein;
    animation-duration: 0.3s;
    }
.boardChanLogoImgWrap {width: 40px; float: left; display: flex; align-items: center; justify-content: center; height: 40px; border-radius: 40px; margin-right: 0.5rem; border: 2px solid #ccc; position: relative;;}

</style>
