<template>
  <div class="addNewBoardWrap pagePaddingWrap" style="">
    <popHeader @closeXPop="this.$emit('closePop')" class="headerShadow" headerTitle="게시판 수정" />
    <div class="itemWrite" style="">
      <p class="textLeft font16 fl" style="width: 150px;">게시판 이름</p>
      <input v-model="inputChannelName" type="text" placeholder="게시판 이름을 입력해주세요" class="creChanInput font16 inputBoxThema"  id="channelName" style="">
    </div>
    <div class="itemWrite">
      <p class="textLeft font16 fl " style="width: 150px;">유형</p>
      <!-- <div style="width: 100%; font-size: 14px; border: 1px solid #ccc; text-align: left; padding: 1px 2px;">게시판 유형을 선택해주세요</div> -->
      <div class="fr font16 inputBoxThema textLeft grayBlack" :class="{fontBlack : selectId !== ''}"  style="" @click="boardTypeClick">{{selectBoardTypeText}}<p class='fr' style="line-height: 25px;">{{rightBtn}}</p></div>
    </div>
    <!-- <p class="font20" style="margin-top: 60px; margin-bottom: 25px; text-align: left;"> 공유할 사람/그룹을 선택하세요. </p> -->

    <div class="itemWrite">
      <p class="textLeft font16 fl " style="width: 40%;">기능 </p>
      <!-- <div style="width: 100%; font-size: 14px; border: 1px solid #ccc; text-align: left; padding: 1px 2px;">게시판 유형을 선택해주세요</div> -->
      <div style="float: right; width: calc(100% - 150px); " @click="this.functionPopShowYn = true" class=" font14 textRight lightGray" >진행상태O/실명/댓글지원O/파일업로드O</div>
    </div>
    <div v-if="showSelectStatusShowYn === true || this.functionPopShowYn === true" style="position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:1; background-color:#ccc; opacity:0" @click="hidePop"></div>
    <div v-if="functionPopShowYn" class="function" style="width: 80%; position: fixed; z-index: 9999; top: 25%; left: 10%; background: #FFF; min-height: 350px; border-radius: 15px; overflow: hidden; box-shadow: 0px 0px 8px 4px #00000015;">
      <popHeader @closeXPop="this.functionPopShowYn = false" headerTitle="게시판 기능설정" class="headerShadow" style="position: absolute;top: 0; left: 0;" />
      <div class="pagePaddingWrap" style="width: 100%;">
        <div class="itemWrite" style="width: 100%;">
        <p style = "width: 80px;" class="textLeft font16 fl toggleLine">진행상태</p>
        <div style="width: calc(100% - 80px);">
          <input style = "" type="checkbox" id="toggle0" hidden>
          <label for="toggle0" class="toggleSwitch fr" @click="click">
            <span class="toggleButton" ></span>
          </label>
            <!-- <div v-if="show" class="dropdown"> -->
          <div v-if="statusSelectShowYn" style=" height: 100%; float: right; margin-right: 10px;" class="dropdown" id="statusBox">
            <button class="dropbtn" style= "float: left; color: black; margin-right: 10px;" @click="showSelectStatus">진행 중</button>
            <div class="dropdown-content" v-if="showSelectStatusShowYn">
              <div style="line-height: 30px;" v-if="showNewYn">
                <input type="text" style="height: 30px; width: 100%; float: left; border: 1px solid #ccc;" v-model="inputvalue"/>
              </div>

              <div style="width:100%; margin: 0.5rem 0px;" class="fl" v-for="(status, index) in multiStatus" :key="index" >

                <div style="" class=" fl">{{status}}</div>
                <!-- {{status}} -->

                <button @click="statusDeleteYn(index)" style= "border-radius: 100px;border: none; height: 25px; width: 25px; line-height: 25px; background-color: #6768A7; color: white; float: right;">-</button>
              </div>
            </div>
            <button @click="showSelectStatus('input')" style= "width: 30px; height: 30px; background-color: #ccc; border: none; float: left;">+</button>
          </div>
        </div>
      </div>
      <div class="itemWrite">
        <p style = "width: 150px;" class="textLeft font16 fl toggleLine">작성자 명</p>
        <div class="toggleInputWrap">
          <div style= "width: 100px; height: 30px; border: 1px solid #ccc; border-radius: 5px; overflow: hidden;">
            <div class= "toggleBtn" :class="{selecWriterShow: selectItem === '실명' }" @click="selectItem = '실명'">실명</div>
            <div class= "toggleBtn" :class="{selecWriterShow: selectItem === '익명' }" @click="selectItem = '익명'">익명</div>
          </div>
        </div>
      </div>
      <div class="itemWrite">
        <p style = "width: 150px;" class="textLeft font16 fl toggleLine">댓글 지원</p>
        <div class="toggleInputWrap">
          <input type="checkbox" id="toggle1" hidden>
          <label for="toggle1" class="toggleSwitch">
            <span class="toggleButton"></span>
          </label>
        </div>
      </div>
      <div class="itemWrite">
        <p style = "width: 150px;" class="textLeft font16 fl toggleLine">파일 업로드</p>
        <div class="toggleInputWrap">
          <input type="checkbox" id="toggle2" hidden>
          <label for="toggle2" class="toggleSwitch">
            <span class="toggleButton"></span>
          </label>
        </div>
      </div>
      </div>
      <!-- <div style="padding: 0 8px; margin-top: 30px;">
        <div @click="nextStep" class="creChanBigBtn">다음</div>
      </div> -->
    </div>
    <div class="itemWrite" style="border-bottom: none;">
      <p class="textLeft font16 fl" style="width: 150px;">공유대상</p>
      <div @click="showChanMenu" class="inputBoxThema textLeft" >{{selectedReceiver}}</div>
    </div>
    <p class="textRight font12 grayBlack" v-show="selectShareYn" @click="showHidePermission" style="width: 100%;">공유대상 권한설정 ▼</p>
    <div style="width: 100%; min-height: 100px;" v-show="sharePermissionShowYn">
      <div class="subItemWrite">
        <p class="textLeft mleft-1 font16 fl" style="width: 150px;">작성</p>
        <div @click="showChanMenu" class="inputBoxThema textLeft" >{{writePermission}}</div>
      </div>
      <div class="subItemWrite">
        <p class="textLeft mleft-1 font16 fl " style="width: 150px;">열람</p>
        <div @click="showChanMenu" class="inputBoxThema textLeft" >{{readPermission}}</div>
      </div>
      <div class="subItemWrite" style="">
        <p class="textLeft mleft-1 font16 fl " style="width: 150px;">댓글</p>
        <div @click="showChanMenu" class="inputBoxThema textLeft" >{{commentPermission}}</div>
      </div>
    </div>
  <div style="background: #ccc; margin-bottom: 10px; width: 100%; height: 0.5px; margin-top: 10px;"></div>
  <gBtnSmall btnThema="light" btnTitle="취소" />
  <gBtnSmall class="mright-05" btnTitle="적용" />
  </div>
  <selectType v-if="selectTypeYn" @closePop='selectTypeYn = false' @addFinish='addResult' />
  <managerReceiver v-if="managerReceiverYn" @closePop='managerReceiverYn = false' :selectPopYn='true' @selectedReceiver='setSelectedList' />
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import selectType from './Tal_addChannelMenu.vue'
import shareSelect from './Tal_shareSelect.vue'

import managerReceiver from './receiver/Tal_managerReceiver.vue'
export default {
  props:{
    modiBoardDetailProps: {}
  },
  mounted () {
  },
  data () {
    return {
      rightBtn: '>',
      menuHeaderTitle: '새 게시판 추가',
      newBoardName: '',
      selectBoardTypeText:'게시판의 유형을 선택해주세요',
      selectId:'',
      selectTypeYn:false,
      selectItem: '실명',
      show: false,
      multiStatus: [
        '진행 중',
        '진행 완료',
        '미해결'
      ],
      showNewYn: false,
      functionPopShowYn: false,
      inputvalue: '',
      showSelectStatusShowYn: false,
      managerReceiverYn: false,
      count: null,
      sharePermissionShowYn: false,
      statusSelectShowYn: false,
      selectShareYn: false,
      selectedReceiver : '게시판을 공유할 대상을 선택해주세요',
      writePermission: '작성권한',
      readPermission: '열람권한',
      commentPermission: '댓글권한'
    }
  },
  components: {selectType, shareSelect, managerReceiver
  },
  // emits: ['openPop', 'goPage'],
  methods: {
    /* nextStep () {
      this.shareSelectYn = true
    }, */
    showChanMenu () {
        this.managerReceiverYn = true
    },
    goNo (){
      this.$emit('closePop')
    },
    boardTypeClick () {
      this.selectTypeYn = true
    },
    addResult (data) {
      this.selectBoardTypeText = data.chanMenuTitle

      this.selectId = data.idNum
      this.selectTypeYn = false

    },
    click () {
      var toggle0 = document.getElementById('toggle0')
      this.show = !toggle0.checked
      if(!toggle0.checked){
        this.statusSelectShowYn = true
      }else{
        this.statusSelectShowYn = false
      }

    },
    setSelectedList (data) {
        this.managerReceiverYn = false
        this.selectShareYn = true
        if(data[0].data.reveiverTeamName){
            this.selectedReceiver =data[0].data.reveiverTeamName + ' 그룹'
        }else{
            this.selectedReceiver = data[0].data.name
        }
        if(data.length === 1){
            this.selectedReceiver
        }else{
            this.selectedReceiver += ' 외 '+(data.length - 1) + ' 개의 그룹/사람'
        }



    },
    changed () {
      this.multiStatus += this.inputvalue
    },
    statusDeleteYn (index) {
      // this.multiStatus.removeItem(index)
      this.multiStatus.splice(index, 1)
    },
    showSelectStatus (input) {
      this.showSelectStatusShowYn = true
      if (input === 'input') {
        this.showNewYn = true
        this.count = 2
      } else {
        this.showNewYn = false
        this.count = 1
      }
    },
    hidePop () {
      this.hideSelectStatus ()
      this.functionPopShowYn = false
    },
    hideSelectStatus () {
      if (this.inputvalue !== '') {
        this.multiStatus.unshift(this.inputvalue)
        this.inputvalue = ''
      }else if (this.inputvalue === ''){
        this.showSelectStatusShowYn = false
      }

      this.count -= 1
      if (this.count === 0) {
        this.showSelectStatusShowYn = false
      } else if (this.count === 1) {
        this.showNewYn = false
      }
    },
    showHidePermission () {
      if (this.sharePermissionShowYn) {
        this.sharePermissionShowYn = false
      }
       else {
         this.sharePermissionShowYn = true
       }
    }
  }

}
</script>

<style scoped>
.menuHeader { padding:0.5rem 0;position: fixed; top: 0rem; left: 0; width: 100%; height: 50px; border-bottom: 1px solid #fff; background-color:#6768a7 ;}
.menuHeader p{color: #FFFFFF; font-size: 20px; text-align: center;}

.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%); color: #FFFFFF; }
.toggleBtn{width: 50%; height: 100%;background-color: #fff; float: left; line-height: 25px;}
.addNewBoardWrap{
  /* width:100% ;
  position: fixed; z-index: 999;
  height: 100vh;
  top: 0;
  right: 0; */

  width:100vw ;
  position: fixed; z-index: 999;
  height: 100vh;
  top: 0;
  right: 0;

  background-color: white;
  overflow: auto;
  }
.btnBig{
  font-size: 16px;
  width: 5rem;
  height: 2rem;
}
.inputBoxThema{height:26px; font-size: 14px; border: 1px solid #ccc;padding:0 10px; width: calc(100% - 150px); float: left;}
.editWrap{
  background-color: #F9F9F9;

}
.editmenuHeader{
border-bottom: 1.5px solid #999;
}
.editColor{
  color: #6768a7 !important;
}
.fontBlack{color: black !important;}

.editRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid #ccc; }
.boardNameText{
  /* font-size: ; */
  font-weight: bold;
  line-height: 2.5rem;
  margin-left: 2rem;
}
.boardPlusBtn{
  color:white;
  font-size:20px;
  font-weight:bold;
}
/* 드롭다운 박스 */
.dropdown {

  position: relative;
  display: inline-block;
  min-width: 140px;
}

.dropdown-content {
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
  top: 30px;
  text-align: left;
}
input:-internal-autofill-selected {
  background-color: #FFF!important;
}
/* .dropdown:hover .dropdown-content {
  display: block;
} */
/* Style The Dropdown Button */
.dropbtn {
  width: 100px;
  height: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: black;
  font-size: 16px;
  cursor: pointer;
}

.toggleInputWrap {
  width: calc(100% - 150px); float: left; display: flex; justify-content: flex-end;
}
/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

.toggleSwitch {
  width: 60px;
  height: 30px;
  display: block;
  float: right;
  position: relative;
  border-radius: 2rem;
  background-color: #fff;
  box-shadow: 0 0 1rem 3px rgba(0 0 0 / 15%);
  cursor: pointer;
}

 /* 토글 버튼 */
.toggleSwitch .toggleButton {
  /* 버튼은 토글보다 작아야함  */
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: .2rem;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #6768A7;
}
/* 체크박스가 체크될 시 변경되는 요소 */
/* 첫번째 토글 */
#toggle0:checked ~ .toggleSwitch {
  background: #6768A7;
}

#toggle0:checked ~ .toggleSwitch .toggleButton {
  /* 100% -> 끝위치, 2.8rem -> 버튼 크기 */
  left: calc(100% - 25px);
  background: #fff;
}
/* 두 번째 토글 */
#toggle1:checked ~ .toggleSwitch {
  background: #6768A7;
}

#toggle1:checked ~ .toggleSwitch .toggleButton {
  /* 100% -> 끝위치, 2.8rem -> 버튼 크기 */
  left: calc(100% - 25px);
  background: #fff;
}

/* 세 번째 토글 */
#toggle2:checked ~ .toggleSwitch {
  background: #6768A7;
}

#toggle2:checked ~ .toggleSwitch .toggleButton {
  /* 100% -> 끝위치, 2.8rem -> 버튼 크기 */
  left: calc(100% - 25px);
  background: #fff;
}

.toggleSwitch, .toggleButton {
  transition: all 0.2s ease-in;
}
.toggleLine{width: 100%; float: left;}
.itemWrite{
  display: flex; align-items: center;
  min-height: 50px;
  border-bottom: 1px solid #ccc;
}
.subItemWrite{
  display: flex; align-items: center;
  min-height: 35px;
}
.creChanIntroTextWrap{padding: 10px 0; float: left; }
.creChanIntroTextWrap p{font-size: 20px; }
.creChanBigBtn{width: 100%; height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;}
.activeTypeBox{background: #6768a7; color: #fff;}
.activeTypeBox p {color: #fff;}
.creChanBigBtn{width: 100%; height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;}
.selecWriterShow{background: #6768a7 !important; color: #fff;}

@media(height:700px){
  .addNewBoardWrap{
    background-color:#ccc;
  }
}
</style>
