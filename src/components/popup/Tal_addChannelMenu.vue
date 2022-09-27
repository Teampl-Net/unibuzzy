<template>

<div class="addChanMenuArea">
    <div class="addChanH" >
        <img v-on:click="this.closeXPop()" class="mleft-1 fl" style="width: 0.8rem; " src="../../assets/images/common/icon_back.png"/>
        <p>추가 게시판 유형</p>
    </div>
    <div class="listArea" style="padding-top:10px;">
        <!-- <div v-for="(data, index) in chanInfo" :key="index" @click="selectItem(data.groupName,data.idNum)" class="channelMenuItem" :class="{noneSelected:index !== selectedItemNum}"> -->
          <div v-for="(data, index) in chanInfo" :key="index" @click="selectItem(data.groupName,data.idNum)" class="channelMenuItem">
                <div class="fl" style="width:50px; height: 50px;"> <img src="../../assets/images/common/Tal_checkImage.svg" style="width:1rem" v-if="selectedItemNum === data.idNum"></div>
                <div class="fl chanImg" ><img src="../../assets/images/main/main_subscriber.png" /></div>

                <p :class="{selectItem: selectedItemNum === data.idNum }">{{data.groupName}}</p>

            </div>

    </div>

    <div style="width: 100%; height:calc(50% - 50px); background-color:white; position: absolute; left:0; box-shadow: 0px -7px 9px -9px #00000036;">
        <!-- 설명 -->
        <p class="channelMenuTitle" style="margin-top:1.6rem; margin-left: calc(1rem + 20px)">설명</p>
        <div class="channelItemExplain" style="" v-html="explainText"></div>
        <div style="position: absolute; right: 2rem; bottom: 2rem;">
            <gBtnSmall class="btnBig  " v-on:click="this.closeXPop()" btnTitle="닫기" style="margin-left:10px"/>
            <gBtnSmall class="btnBig" v-on:click="setResult" btnTitle="적용" style="margin-right:10px"/>
        </div>
    </div>

</div>

</template>
<script>
/* eslint-disable */
// eslint-disable-next-line
export default{
    data(){
        return{
          popId: null,
            chanInfo: [
              {groupName: '공지 게시판', idNum: 0},
              {groupName: '문의 게시판', idNum: 1},
              {groupName: '자유 게시판', idNum: 2},
              {groupName: '대상지정 게시판', idNum: 3},
              {groupName: '익명 게시판', idNum: 4}
          ],
      selectedItemNum: 2,
      explainText: '구독자라면 누구나 자유롭게 소통하는 게시판입니다. <br>' +'*게시글 권한 대상 : 모두 ',
      selectedItemTitle: ''

      // list: [
      // { iconUrl: 'http://placehold.it/25', menuText: '포토게시판', link: '', type: 'page'},
      // { iconUrl: 'http://placehold.it/25', menuText: '새소식', link: 'pushList', type: 'page' },
      // { iconUrl: 'http://placehold.it/25', menuText: '문의사항', link: 'chanList', type: 'page' },
      // ]

    }
  },
computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      if (this.popId === hStack[hStack.length - 1]) {
        this.closeXPop()
      }
    },
    historyStack (value, old) {
    }
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'selectChanTypePop' + history.length
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)

  },
  methods: {
    closeXPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$emit('closePop')
    },
    setResult () {
      // eslint-disable-next-line no-new-object
      var obj = new Object()

      obj.chanMenuTitle = this.selectedItemTitle
      obj.idNum = this.selectedItemNum

      this.$emit('addFinish', obj)
    },
    selectItem (name, idNum) {

      // this.selectedItemNum = idNum
      // this.selectedItemTitle = name

      // switch (this.selectedItemNum) {

      //   case 0 : //공지게시판
      //     this.explainText = '새 소식에 대한 공지를 올립니다. <br>' +
      //               '*게시글 권한 대상 : 매니저 '
      //     break
      //   case 1 : //문의게시판
      //     this.explainText = '구독자가 문의를 할 때, 그에 대한 답을 줄 수 있습니다. <br>' +
      //               '*게시글 권한 대상 : 매니저 '
      //     break
      //   case 2 : //자유게시판
      //     this.explainText = '구독자라면 누구나 자유롭게 소통하는 게시판입니다. <br>' +
      //               '*게시글 권한 대상 : 모두 '
      //     break
      //   case 3 : //대상지정 게시판
      //     this.explainText = '대상을 지정해 업무를 지정하고, 대상자에게 지정 알림을 보냅니다. <br>' +
      //               '*게시글 권한 대상 : 대상지정 '
      //     break
      //   case 4 : // 익명게시판
      //     this.explainText = '구독자가 익명으로 채널 및 타 구독자와 소통합니다. <br>' +
      //               '*게시글 권한 대상 : 모두 '
      //     break
      // }
    }
  }

}
</script>

<style>

.addChanMenuArea{
    width:100% ;
    position: absolute;
    z-index: 9999;
    height: 100vh;
    top: 0;
    right: 0;
    background-color: #f0f0f6;
    padding: 0 20px;

}
.addChanH {padding:0.5rem 0;position: absolute; top: 0rem; left: 0; width: 100%; height: 50px; border-bottom: 1.5px solid #999; background-color: white;}
.addChanH p{color: #6768a7; font-size: 20px; text-align: center; font-weight: bold;}

.listArea{
    margin-top: 50px;
    overflow: auto;
    width: 100%;
    height: 50%;
}

.channelMenuItem{
    border-bottom: 1px solid #d7d7d7;
    background-color: white;
    height: 50px;
    line-height: 50px;

}
.channelMenuItem .chanImg{
    margin: 0 15px;
    height: 50px;
}

.channelMenuItem p{
    font-size: 1rem;
    color:black;
    text-align: left;
}
.channelMenuTitle{
    text-align:left;
    font-size: 1.2rem;
    color:black;
    margin-left: 1rem;
    margin-top: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.channelItemExplain{
    min-height:40%;
    background-color:#6768a735;
    margin: 0 1rem;
    text-align: left;
    padding: 1rem
    /* border-radius: 10px; */

}

.btnBig{
  font-size: 16px !important;
  width: 5rem !important;
  height: 2rem !important;
}

.selectItem{
    color: #6768a7 !important;
    /* color: black !important; */
    font-weight: bold;
    background-color: #6768a710;
}
.noneSelected{
  background-color:#cccccc80
}
</style>
