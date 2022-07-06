
<template>
  <div style="width: 100%; height: 100%; position: relative; overflow: hidden; float: left;">
    <div id="boardPageHeader" ref="boardListHeader" class="boardListHeader"  :class="this.scrolledYn? 'boardListHeader--unpinned': 'boardListHeader--pinned'" v-on="handleScroll" >
        <gSearchBox @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
        <gActiveBar :tabList="this.activeTabList" class="fl mbottom-1" @changeTab= "changeTab"  style=" width:calc(100%);"/>
      <transition name="showModal">
        <findContentsList :contentsListTargetType="'boardMain'" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
      </transition>
    </div>
    <div class="commonBoardListWrap">
      <!-- <div style="width: 100%; height: 200px; background: #ccc; position: fixed; bottom: 0;">{{this.firstContOffsetY}}, {{this.scrollDirection}}, {{this.scrollPosition}}</div> -->
      <template id="boardRow" v-for="(board, index) in commonBoardListData" :key="index">
        <div class="commonBoardListContentBox pushMbox" v-if="board.bodyFullStr" >
          <div @click="goDetail(board)" class="pushDetailTopArea">
              <div class="">
                <p class=" font15 fontBold commonBlack">{{resizeText(board.title)}}</p>
              <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
                <!-- <p class="font12 fl lightGray">{{this.changeText(board.nameMtext)}}</p> -->
                <!-- <p class="font12 fl lightGray">{{this.changeText(board.nameMtext)}}{{board.showCreNameYn === 1? '(' + this.$changeText(board.creUserName) + ')': ''}}</p> -->
                <p class="font12 fl lightGray">{{board.showCreNameYn === 1? this.$changeText(board.creUserName): ''}}</p>
                <p class="font12 fr lightGray">{{this.$changeDateFormat(board.creDate)}}</p>
              </div>
          </div>
          <div @click="goDetail(board)" class="font14 mbottom-05 bodyFullStr" v-html="setBodyLength(board.bodyFullStr)"></div>
          <div id="alimCheckArea">
            <div class="alimCheckContents">
              <!-- <div class="pushDetailStickerWrap">
                <div class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in tempAlimList.stickerList " :key="index" >
                  <img :src="value.stickerIcon" alt="">
                </div>
              </div> -->

              <!-- <p v-show="board.bodyFullStr.length > 130" class="font16 textRight mbottom-05" style="">더보기></p>
              <div @click="changeAct(userDo, board.contentsKey)"  class="fr userDoWrap" v-for="(userDo, index) in settingUserDo(board.userDoList)" :key="index">
                <template v-if="userDo.doType === 'ST'">
                  <img class="fl" style="width: 1.5rem" v-if="userDo.doKey > 0" src="../../assets/images/common/colorStarIcon.svg" alt="">
                  <img class="fl" style="width: 1.5rem"  v-else src="../../assets/images/common/starIcon.svg" alt="">
                </template>
                <template v-else-if="userDo.doType === 'LI'">
                  <img class="mright-05 fl" style="margin-top: 2px;width: 1.3rem" v-if="userDo.doKey > 0" src="../../assets/images/common/likeIcon.svg" alt="">
                  <img class="mright-05 fl" style="margin-top: 3px;width: 1.3rem" v-else src="../../assets/images/common/light_likeIcon.svg" alt="">
                </template>
              </div> -->
            </div>
          </div>
        </div>
      </template>
      <gLoadingS ref="sLoadingBoard" class="fl"/>
      <myObserver @triggerIntersected="loadMore" class="fl w-100P"></myObserver>
    </div>
    <div :class="this.scrolledYn || !this.reloadShowYn ? 'reload--unpinned': 'reload--pinned'" v-on="handleScroll" style="position: fixed; width: 50px; height: 50px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); padding: 10px; bottom: 4.5rem; right: calc(50% - 25px);" @click="refreshAll">
      <img src="../../assets/images/common/reload_button.svg" style="width: 30px; height: 30px;">
    </div>
  </div>
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
      currentScroll: 0
    }
  },
  props: {
    resultSearchKeyList: {},
    reloadShowYn: {},
    activeTabList: {},
    clickEvnt: {},
    commonBoardListData: {}
  },
  components: {

  },
  created () {
    // this.boardList = this.commonBoardListData
    console.log(this.commonBoardListData)
  },
  computed: {
  },
  watch: {
    commonBoardListData () {
      this.$refs.sLoadingBoard.hide()
    }
  },
  updated () {
    this.boardListWrap.scrollTop = this.currentScroll
    this.box = document.getElementsByClassName('commonBoardListWrap')[0]
  },
  mounted () {
    this.boardListWrap = document.getElementById('boardListWrap')
    this.boardListWrap.addEventListener('scroll', this.saveScroll)
    this.box = document.getElementsByClassName('commonBoardListWrap')[0]
    this.box.addEventListener('scroll', this.handleScroll)

    if (this.viewTab === 'N') {
      this.$refs.activeBar.switchtab(0)
    } else if (this.viewTab === 'R') {
      this.$refs.activeBar.switchtab(1)
    } else if (this.viewTab === 'L') {
      this.$refs.activeBar.switchtab(2)
    } else if (this.viewTab === 'S') {
      this.$refs.activeBar.switchtab(3)
    }

  },
  unmounted () {
    this.boardListWrap.removeEventListener('scroll', this.saveScroll)
  },
  /* emits: ['goDetail'], */
  methods: {
    getAbsoluteTop(element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var element = document.getElementsByClassName('commonBoardListContentBox')[0]
      // debugger
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
      // debugger
      // this.findPopShowYn = false
    },
    async changeTab(tabName) {
      // this.$emit('openLoading')
      this.viewTab = tabName
      this.mCabContentsList = []
      var resultList = await this.$parent.getContentsList()
      this.mCabContentsList = resultList.content
      this.scrollMove()
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
      param.targetKey = value.contentsKey
      param.value = value
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
    async changeAct (act, contentsKey) {
      console.log(act)
      console.log(contentsKey)
      var result = null
      var saveYn = true
      // this.pushDetail = JSON.parse(this.detailVal).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = contentsKey
      if (param.targetKey === null) { return }
      param.doType = act.doType
      if (saveYn === false) {
        param.doKey = act.doKey
        result = await this.$saveUserDo(param, 'delete')
      } else {
        param.actYn = true
        param.targetKind = 'C'
        result = await this.$saveUserDo(param, 'save')
      }
      if (result === true) {
        await this.$emit('refresh')
      }
    },
    async loadMore () {
      this.$refs.sLoadingBoard.hide()
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
}
.commonListTr, .commonListTr td, .commonListTr th {height: 4rem; }
.listHeader {text-align: center;}
.listBodyRow{width: calc(100% - 60px);}
.commonBoardListWrap{width: 100%; position: relative; float: left; width: 100%; padding-top: 140px; overflow: hidden scroll; height: 100%;}

.pushDetailWrap{height: fit-content;}
.pushDetailTopArea{height: 3.0rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 30px; margin-right: 1px;}
.pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.1rem;}

.alimCheckContents{width: 100%;float: left; min-height: 30px;}
.alimCheckContents > img {margin-top: 3px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}
.chanLogoImgWrap {width: 40px; float: left; display: flex; align-items: center; justify-content: center; height: 40px; border-radius: 40px; margin-right: 0.5rem; border: 2px solid #ccc;}
.pushMbox{margin-bottom: 20px;}
.userDoWrap img {width: 1rem;}

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

</style>
