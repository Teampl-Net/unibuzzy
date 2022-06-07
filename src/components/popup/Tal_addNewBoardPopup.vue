<template>
<div style="width: 100vw; height: 100vh; position: fixed;z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>

  <div class="addNewBoardWrap" >
    <div class="menuHeader">
      <img v-on:click="this.$emit('closePop')" class="mtop-05 mleft-1 fl" style="width: 0.8rem; " src="../../assets/images/main/icon_back_white.png"/>
      <p style="color:white">{{menuHeaderTitle}}</p>
    </div>

    <div class="body" style="width: 100%; height: 25%; min-height:170px; margin-top: 60px; padding: 0 24px; border-bottom: 1px solid #ccc;">
      <div class="nameType">
        <p class="font20 fontBold" style="margin-top: 60px; margin-bottom: 25px; text-align: left;">게시판의 이름과 유형을 선택하세요.</p>
        <div class="itemWrite" style="height: 60px !important;">
          <p class="textLeft font16 fl " style="width: 40%; line-height: 60px;">게시판 명</p>
          <input v-model="inputChannelName" type="text" placeholder="게시판 이름을 입력해주세요" class="creChanInput font16"  id="channelName" style="height:26px; width: 100%; font-size: 14px; border: 1px solid #ccc;padding:0 10px; min-width:220px;">
        </div>
        <div class="itemWrite" style="height: 60px !important;">
          <p class="textLeft font16 fl fontBlack" style="width: 40%; line-height: 60px;">게시판 유형</p>
          <!-- <div style="width: 100%; font-size: 14px; border: 1px solid #ccc; text-align: left; padding: 1px 2px;">게시판 유형을 선택해주세요</div> -->
          <div class="fr font16" :class="{fontBlack : selectId !== ''}"  style="color:#ccc; text-align:left; border:1px solid #ccc; width:100%; padding:0 10px;min-width:220px;" @click="boardTypeClick">{{selectBoardTypeText}}<l class='fr'>{{rightBtn}}</l></div>
        </div>
      </div>
    </div>

    <div class="function" style="width: 100%; height: 60%; margin-top: 32px; padding: 0 24px;">
      <p class="font20 fontBold" style="width: 100%; margin-top: 30px; margin-bottom: 25px; text-align: left;">원하시는 기능을 선택하세요.</p>
      <div class="itemWrite">
        <p style = "width: 30%;" class="textLeft font16 fl toggleLine">진행상태</p>
        <input style = "width: 100%;" type="checkbox" id="toggle0" hidden>
        <label for="toggle0" class="toggleSwitch" style = "margin-right: 30px;" @click="click">
          <span class="toggleButton" ></span>
        </label>
        <div v-if="openPopYn" style="position:absolute; top:0; left:0; width:100vw; height:100vh; z-index:1; background-color:#111; opacity:0" @click="closePop"></div>
        <!-- <div v-if="show" class="dropdown"> -->
        <div style="visibility: hidden" class="dropdown" id="statusBox">
          <button class="dropbtn" style= "float: left; color: black; margin-right: 10px;" @click="openPop">진행 중</button>
          <div class="dropdown-content" v-if="openPopYn">
            <div style="line-height: 30px;" v-if="showNewYn">
              <input type="text" style="height: 30px; width: 100%; float: left; border: 1px solid #ccc;" v-model="inputvalue"/>
            </div>

            <div style="width:100%; margin: 0.5rem 0px;" class="fl" v-for="(status, index) in multiStatus" :key="index" >

              <div style="" class=" fl">{{status}}</div>
              <!-- {{status}} -->

              <button @click="statusDeleteYn(index)" style= "border-radius: 100px;border: none; height: 25px; width: 25px; line-height: 25px; background-color: #6768A7; color: white; float: right;">-</button>
            </div>
          </div>
          <button @click="openPop('input')" style= "width: 30px; height: 30px; background-color: #ccc; border: none; float: left;">+</button>
        </div>
      </div>
      <div class="itemWrite">
        <p class="textLeft font16 fl toggleLine">작성자 명</p>
        <div style= "width: 100px; height: 30px; border: 1px solid #ccc;">
          <div style= "width: 50%; height: 100%; border: 1px solid #ccc; background-color: #fff; float: left; line-height: 30px;" :class="{selecWriterShow: selectItem === '실명' }" @click="selectItem = '실명'">실명</div>
          <div style= "width: 50%; height: 100%; border: 1px solid #ccc; background-color: #fff; float: left; line-height: 30px;" :class="{selecWriterShow: selectItem === '익명' }" @click="selectItem = '익명'">익명</div>
        </div>
      </div>
      <div class="itemWrite">
        <p class="textLeft font16 fl toggleLine">댓글 지원</p>
        <input type="checkbox" id="toggle1" hidden>
        <label for="toggle1" class="toggleSwitch">
          <span class="toggleButton"></span>
        </label>
      </div>
      <div class="itemWrite">
        <p class="textLeft font16 fl toggleLine">파일 업로드</p>
        <input type="checkbox" id="toggle2" hidden>
        <label for="toggle2" class="toggleSwitch">
          <span class="toggleButton"></span>
        </label>
      </div>
      <div style="padding: 0 8px; margin-top: 30px;">
        <div @click="nextStep" class="creChanBigBtn">다음</div>
      </div>
    </div>
  </div>

  <selectType v-if="selectTypeYn" @closePop='selectTypeYn = false' @addFinish='addResult' />
  <shareSelect v-if="shareSelectYn" @closePop='shareSelectYn= false' />

</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import selectType from './Tal_addChannelMenu.vue'
import shareSelect from './Tal_shareSelect.vue'
export default {
  props:{
  },
  mounted () {
  },
  data () {
    return {
      rightBtn: '>',
      menuHeaderTitle: '새 게시판 추가',
      newBoardName: '',
      selectBoardTypeText:'게시판의 유형을 선택하세요.',
      selectId:'',
      selectTypeYn:false,
      shareSelectYn: false,
      selectItem: '실명',
      show: false,
      multiStatus: [
        '진행 중',
        '진행 완료',
        '미해결'
      ],
      showNewYn: false,
      inputvalue: '',
      openPopYn: false,
      count: null,
    }
  },
  components: {selectType, shareSelect
  },
  // emits: ['openPop', 'goPage'],
  methods: {
    nextStep () {
      this.shareSelectYn = true
    },
    goNo (){
      this.$emit('closePop')
    },
    testalert (text) {
      alert(this.newBoardName)
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
        document.getElementById('statusBox').style.visibility = 'visible'
      }else{
        document.getElementById('statusBox').style.visibility = 'hidden'
      }


    },
    changed () {
      this.multiStatus += this.inputvalue
    },
    statusDeleteYn (index) {
      // this.multiStatus.removeItem(index)
      this.multiStatus.splice(index, 1)
    },
    openPop (input) {
      this.openPopYn = true
      if (input === 'input') {
        this.showNewYn = true
        this.count = 2
      } else {
        this.showNewYn = false
        this.count = 1
      }
    },
    closePop () {
      if (this.inputvalue !== '') {
        this.multiStatus.unshift(this.inputvalue)
        this.inputvalue = ''
      }else if (this.inputvalue === ''){
        this.openPopYn = false
      }

      this.count -= 1
      if (this.count === 0) {
        this.openPopYn = false
      } else if (this.count === 1) {
        this.showNewYn = false
      }
    }
  }

}
</script>

<style scoped>
.menuHeader { padding:0.5rem 0;position: fixed; top: 0rem; left: 0; width: 100%; height: 50px; border-bottom: 1px solid #fff; background-color:#6768a7 ;}
.menuHeader p{color: #FFFFFF; font-size: 20px; text-align: center;}

.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%); color: #FFFFFF; }

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

  box-shadow: 0 0 9px 2px #b8b8b8;
  padding: 0 1rem;
  background-color: white;
  overflow: auto;
  }
.addNewBoardWrap p {
  color:black;
}
.btnBig{
  font-size: 16px;
  width: 5rem;
  height: 2rem;
}

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

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

.toggleSwitch {
  width: 60px;
  height: 30px;
  display: block;
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
.toggleLine{width: 30%; line-height: 80px; float: left;}
.itemWrite{
  height: 15%; display: flex; align-items: center;
  min-height: 60px;
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
