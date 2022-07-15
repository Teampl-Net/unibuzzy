<template>
  <div class="addNewBoardWrap pagePaddingWrap" style="">
    <popHeader @closeXPop="this.$emit('closePop')" class="headerShadow" headerTitle="게시판 수정" :chanName='chanName'/>
    <div class="itemWrite" style="">
      <p class="fontBold textLeft font16 fl" style="width: 130px;">게시판명</p>
      <input v-model="boardName" type="text" placeholder="게시판 이름을 입력하세요" class="creChanInput font16 inputBoxThema"  id="channelName" style="">
    </div>
    <div class="itemWrite">
      <p class="fontBold textLeft font16 fl " style="width: 130px;">컬러</p>
      <div v-if="colorPickerShowYn" @click="colorPickerShowYn = false" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgb(0 0 0 / 25%); z-index: 99;"></div>
      <div v-if="colorPickerShowYn" style="overflow: hidden; position: absolute; box-shadow: rgb(64 64 64 / 16%) 0px 0px 7px 4px; border-radius: 15px; top: 20%; left: 20%; z-index: 99999; width: 70%; height: 500px; ">
          <gColorPicker :colorPick="this.selectedColor" @closePop="closeColorPickerPop" />
      </div>
      <div @click="this.colorPickerShowYn = true" class="inputBoxThema textLeft" style=" border: none;" :style="'background:' + this.selectedColor + ';'" >선택</div>
    </div>
    <div class="itemWrite">
      <p class="fontBold textLeft font16 fl " style="width: 130px;">유형</p>
      <!-- <div style="width: 100%; font-size: 14px; border: 1px solid #ccc; text-align: left; padding: 1px 2px;">게시판 유형을 선택해주세요</div> -->
      <!-- <div class="fr font16 inputBoxThema textLeft grayBlack" :class="{fontBlack : selectId !== ''}"  style="margin-top: 10px;" @click="boardTypeClick">{{boardDetail.menuType}}<p class='fr' style="line-height: 25px;">></p></div> -->
      <div class="commonBlack fr font16 inputBoxThema textLeft">자유게시판</div>
    </div>
    <!-- <p class="font20" style="margin-top: 60px; margin-bottom: 25px; text-align: left;"> 공유할 사람/그룹을 선택하세요. </p> -->

    <div class="itemWrite">
      <p class="fontBold textLeft font16 fl " style="width: 130px;">기능 </p>
      <!-- <div style="width: 100%; font-size: 14px; border: 1px solid #ccc; text-align: left; padding: 1px 2px;">게시판 유형을 선택해주세요</div> -->
      <div style="width: calc(100% - 130px); text-align: left;" @click="this.functionPopShowYn = true" class="fl font16 lightGray" >{{okFunctionList}}</div>
    </div>
    <div v-if="showSelectStatusShowYn === true || this.functionPopShowYn === true" style="position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:1; background-color:#ccc; opacity:0" @click="hidePop"></div>
    <div v-if="functionPopShowYn"  style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; background: #00000030; z-index: 99;" @click="this.functionPopShowYn = false"></div>
    <div v-if="functionPopShowYn" class="function" style="width: 80%; position: fixed; z-index: 9999; top: 25%; left: 10%; background: #FFF; min-height: 350px; border-radius: 15px; overflow: hidden; box-shadow: 0px 0px 8px 4px #00000015;">
      <popHeader @closeXPop="this.functionPopShowYn = false" headerTitle="게시판 기능 설정" class="headerShadow" style="position: absolute;top: 0; left: 0;" />
      <div class="pagePaddingWrap" style="width: 100%;">
        <!-- <div class="itemWrite" style="width: 100%;">
          <p style = "width: 80px;" class="textLeft font16 fl toggleLine">진행상태</p>
          <div style="width: calc(100% - 80px);">
            <input style = "" type="checkbox" id="toggle0" hidden>
            <label for="toggle0" class="toggleSwitch fr" @click="click">
              <span class="toggleButton" ></span>
            </label>
            <div v-if="statusSelectShowYn" style=" height: 100%; float: right; margin-right: 10px;" class="dropdown" id="statusBox">
              <button class="dropbtn" style= "float: left; color: black; margin-right: 10px;" @click="showSelectStatus">진행 중</button>
              <div class="dropdown-content" v-if="showSelectStatusShowYn">
                <div style="line-height: 30px;" v-if="showNewYn">
                  <input type="text" style="height: 30px; width: 100%; float: left; border: 1px solid #ccc;" v-model="inputvalue"/>
                </div>

                <div style="width:100%; margin: 0.5rem 0px;" class="fl" v-for="(status, index) in multiStatus" :key="index" >

                  <div style="" class=" fl">{{status}}</div>
                  <button @click="statusDeleteYn(index)" style= "border-radius: 100px;border: none; height: 25px; width: 25px; line-height: 25px; background-color: #6768A7; color: white; float: right;">-</button>
                </div>
              </div>
              <button @click="showSelectStatus('input')" style= "width: 30px; height: 30px; background-color: #ccc; border: none; float: left;">+</button>
            </div>
          </div>
        </div> -->
      <!-- <div class="itemWrite">
        <p style = "width: 150px;" class="textLeft font16 fl toggleLine">작성자 명</p>
        <div class="toggleInputWrap">
          <div style= "width: 100px; height: 30px; border: 1px solid #ccc; border-radius: 5px; overflow: hidden;">
            <div class= "toggleBtn" :class="{selecWriterShow: blindYn === false }" @click="blindYn = false">실명</div>
            <div class= "toggleBtn" :class="{selecWriterShow: blindYn === true }" @click="blindYn = true">익명</div>
          </div>
        </div>
      </div> -->
      <div class="itemWrite">
        <p style = "width: 150px;" class="fontBold textLeft font16 fl toggleLine">댓글 지원</p>
        <div class="toggleInputWrap">
          <input type="checkbox" v-model="replyYnInput" id="toggle1"  @click="replyYnChange"  hidden>
          <label for="toggle1" class="toggleSwitch">
            <span class="toggleButton"></span>
          </label>
        </div>
      </div>
      <!-- <div class="itemWrite">
        <p style = "width: 150px;" class="textLeft font16 fl toggleLine">파일 업로드</p>
        <div class="toggleInputWrap">
          <input type="checkbox" v-model="fileYnInput" id="toggle2" :checked="fileYnInput === true" hidden>
          <label for="toggle2" class="toggleSwitch">
            <span class="toggleButton"></span>
          </label>
        </div>
      </div> -->
      </div>
      <!-- <div style="padding: 0 8px; margin-top: 30px;">
        <div @click="nextStep" class="creChanBigBtn">다음</div>
      </div> -->
    </div>
    <div class="itemWrite fl" style="border-bottom: none;">
      <p class="fontBold textLeft font16 fl" style="width: 150px;">공유대상</p>
      <div style="width: 100%; height: 40px; text-align: left; padding: 5px 0;">
        <input class="h-100P fl" type="radio" :checked="this.shareType === 'all'? true: false" @click="changeShareType('all')" name="shareType" value="all" id="shareAll"><label class="fl mleft-05 mtop-02" for="shareAll">전체</label>
        <input class="h-100P fl mleft-1" type="radio" :checked="this.shareType === 'select'? true: false" @click="changeShareType('select')" name="shareType" value="select" id="shareSelect"><label class="fl mleft-05 mtop-02" for="shareSelect">선택</label>
      </div>
    </div>
    <div class="fl" style="width: 100%;">
      <div v-show="this.shareType === 'select'" @click="showSelectBookPop('select')" class="inputBoxThema textLeft fl" style="width: 100%; margin-bottom: 20px; ">{{selectedReceiver}}</div>
    </div>

    <p class="textRight font12 grayBlack" v-show="selectShareYn" @click="showHidePermission" style="width: 100%;">공유대상 권한설정 ▼</p>
    <div style="width: 100%; min-height: 100px; white-space: nowrap;" class="fl">
      <div class="subItemWrite">
        <p class="textLeft mleft-15 font16 fl" style="flex:1">작성</p>
        <!-- <div @click="selectShareActorItem('W')" class="inputBoxThema textLeft">{{writePermission}}</div> -->
        <div @click="selectShareActorItem('W')" class="inputBoxThema textLeft " style="margin-left:0.8rem" v-if="this.shareType == 'select'">{{writePermission}}</div>
        <div v-if="this.shareType == 'all'" class=" textLeft moidRadioArea" style="display:flex" >
          <div><input class="h-100P fl" type="radio" :checked="this.writePermissionAllYn ===  true ? true : false" @click="changePermission('write',true)" name="writePermissionAllYn" value="use"  id="writeTrue"><label class="fl mleft-05" for="writeTrue">전체</label></div>
          <div><input class="h-100P fl mleft-1" type="radio" :checked="this.writePermissionAllYn ===  false ? true : false" @click="changePermission('write',false)" name="writePermissionAllYn" value="unuse" id="writeFalse"><label class="fl mleft-05" for="writeFalse">사용 안함</label></div>
          <div><input class="h-100P fl mleft-1" type="radio" :checked="this.writePermissionSelectYn ===  true ? true : false " @click="selectPermission('write')" name="writePermissionAllYn" value="unuse" id="writeSelect"><label class="fl mleft-05" for="writeSelect">선택 지정</label></div>
        </div>
        <div @click="showSelectBookPop('write')" v-if="writePermissionSelectYn === true && this.shareType == 'all'" style="margin:0.5rem 0; width:90vw; min-height:30px; float:left; border: 1px solid #ccc; text-align:left; padding-left:10px;">{{writePermission}}</div>
      </div>

      <div class="subItemWrite">
        <p class="textLeft mleft-15 font16 fl " style="flex:1">열람</p>
        <!-- <div @click="selectShareActorItem('V')" class="inputBoxThema textLeft">{{readPermission}}</div> -->
        <div @click="selectShareActorItem('V')" class="inputBoxThema textLeft" style="margin-left:0.8rem" v-if="this.shareType == 'select'">{{readPermission}}</div>
        <div v-if="this.shareType == 'all'" class=" textLeft moidRadioArea" style="display:flex">
          <div><input class="h-100P fl" type="radio" :checked="this.readPermissionAllYn ===  true ? true : false" @click="changePermission('read',true)" name="readPermissionAllYn" value="use" id="readTrue"><label class="fl mleft-05" for="readTrue">전체</label></div>
          <div><input class="h-100P fl mleft-1" type="radio" :checked="this.readPermissionAllYn ===  false ? true : false" @click="changePermission('read',false)" name="readPermissionAllYn" value="unuse" id="readFalse"><label class="fl mleft-05" for="readFalse">사용 안함</label></div>
          <div><input class="h-100P fl mleft-1" type="radio" :checked="this.readPermissionSelectYn ===  true ? true : false" @click="selectPermission('read')" name="readPermissionAllYn" value="unuse" id="readSelect"><label class="fl mleft-05" for="readSelect">선택 지정</label></div>
        </div>
        <div @click="showSelectBookPop('read')" v-if="readPermissionSelectYn === true && this.shareType == 'all'" style="margin:0.5rem 0; width:90vw; min-height:30px; float:left; border: 1px solid #ccc; text-align:left; padding-left:10px;">{{readPermission}}</div>
      </div>
      <div class="subItemWrite" style="">
        <p class="textLeft mleft-15 font16 fl " style="flex:1">댓글</p>
        <!-- <div @click="selectShareActorItem('R')" class="inputBoxThema textLeft" >{{commentPermission}}</div> -->
        <div @click="selectShareActorItem('R')" class="inputBoxThema textLeft" style="margin-left:0.8rem" v-if="this.shareType == 'select'" >{{commentPermission}}</div>
        <div v-if="this.shareType == 'all'" class=" textLeft moidRadioArea" style="">
          <div><input class="h-100P fl" type="radio" :checked="this.commentPermissionAllYn ===  true ? true : false" @click="changePermission('comment',true)" name="commentPermissionAllYn" value="use" id="commentTrue"><label class="fl mleft-05"  for="commentTrue">전체</label></div>
          <div><input class="h-100P fl mleft-1" type="radio" :checked="this.commentPermissionAllYn ===  false ? true : false" @click="changePermission('comment',false)" name="commentPermissionAllYn" value="unuse" id="commentFalse"><label class="fl mleft-05" for="commentFalse">사용 안함</label></div>
          <div><input class="h-100P fl mleft-1" type="radio" :checked="this.commentPermissionSelectYn ===  true ? true : false" @click="selectPermission('comment')" name="commentPermissionAllYn" value="unuse" id="commentSelect"><label class="fl mleft-05" for="commentSelect">선택 지정</label></div>
        </div>
        <div @click="showSelectBookPop('comment')" v-if="commentPermissionSelectYn === true && this.shareType == 'all'" style="width:90vw; min-height:30px; float:left; border: 1px solid #ccc; text-align:left; padding-left:10px;">{{commentPermission}}</div>
      </div>
    </div>
  <div style="width: 100%; float: right; bottom:1.5rem; right:2rem; position: absolute;">
    <gBtnSmall btnThema="light" btnTitle="취소" @click="closePop" />
    <gBtnSmall @click="updateCabinet" class="mright-05" btnTitle="적용" />
  </div>
  </div>
  <selectType :chanInfo="this.chanInfo" v-if="selectTypePopShowYn" @closePop='selectTypePopShowYn = false' @addFinish='addResult' />
  <selectBookList :chanInfo="this.chanInfo" :propData="this.chanProps" :boardDetail="this.boardDetail" :chanAlimListTeamKey="this.modiBoardDetailProps.teamKey" v-if="selectBookListShowYn" @closeXPop='selectBookListShowYn = false' :selectPopYn='true' @sendReceivers='setSelectedList' :pSelectedList="selectedList.data" @openPop='openPop' />

  <receiverAccessList @sendReceivers="setOk" :chanInfo="this.chanInfo" :propData="chanInfo" :itemType="shareActorItemType" v-if="receiverAccessListYn" @closeXPop='receiverAccessListYn=false' :parentList='this.selectedList.data' />
  <gConfirmPop  confirmText='성공적으로 수정되었습니다.' confirmType='timeout' v-if="okPopYn" @no='closePop' />

</template>

<script>
import selectType from './Tal_addChannelMenu.vue'
// import shareSelect from './Tal_shareSelect.vue'
import selectBookList from './receiver/Tal_selectBookList.vue'
import receiverAccessList from './receiver/Tal_selectReceiverAccessList.vue'
export default {
  props: {
    modiBoardDetailProps: {},
    chanInfo: {},
    chanName: {}
  },
  created () {
    var history = this.$store.getters.hStack
    this.popId = 'modiBoardPop' + this.modiBoardDetailProps.cabinetKey
    history.push(this.popId)
    this.$store.commit('updateStack', history)

    this.boardDetail = this.modiBoardDetailProps
    this.getCabinetDetail()

    if (this.chanInfo.value) {
      this.chanProps = this.chanInfo.value
      this.chanProps.teamNameMtext = this.$changeText(this.chanInfo.value.nameMtext)
    } else {
      this.chanProps = this.chanInfo
      this.chanProps.teamNameMtext = this.$changeText(this.chanInfo.nameMtext)
    }

    // console.log(this.boardDetail)
    // console.log(this.chanInfo)

    //
  },
  computed: {
    historyStack () {
      return this.$store.getters.hRPage
    },
    pageUpdate () {
      return this.$store.getters.hUpdate
    }
  },
  watch: {
    pageUpdate (value, old) {
      var hStack = this.$store.getters.hStack
      if (this.popId === hStack[hStack.length - 1]) {
        var history = this.$store.getters.hStack
        var removePage = history[history.length - 1]
        history = history.filter((element, index) => index < history.length - 1)
        this.$store.commit('setRemovePage', removePage)
        this.$store.commit('updateStack', history)
        this.$emit('closePop')
      }
    },
    historyStack (value, old) {
    }
  },
  data () {
    return {
      selectedColor: '#FFCDD2',
      colorPickerShowYn: false,
      chanProps: {},
      okPopYn: false,
      popId: null,
      boardDetail: {},
      selectBoardTypeText: '게시판의 유형을 선택해주세요',
      selectId: '',
      shareType: 'select', // 공유 대상자 (팔로워 전체: all, 대상 선택: select)
      selectTypePopShowYn: false,
      blindYn: false, // 익명게시판
      fileYnInput: false, // 파일업로드 게시판
      replyYnInput: false, // 댓글 지원 게시판
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
      selectBookListShowYn: false,
      count: null,
      sharePermissionShowYn: false,
      statusSelectShowYn: false,
      selectShareYn: false,
      selectedReceiver: '게시판을 공유할 대상을 선택해주세요',
      writePermission: '작성권한',
      readPermission: '열람권한',
      commentPermission: '댓글권한',
      bookList: null,
      selectedList: [],
      receiverAccessListYn: false,
      shareActorItemType: '',
      selectShareList: [],
      selectItemList: [],
      // okFunctionList:'작성자명/댓글지원O/파일업로드O',
      okFunctionList: '댓글 지원 O',
      writePermissionAllYn: true,
      readPermissionAllYn: true,
      commentPermissionAllYn: true,
      writePermissionSelectYn: false,
      readPermissionSelectYn: false,
      commentPermissionSelectYn: false,
      permissionSelectedYn: { W: false, R: false, V: false },
      boardName: '',
      dbSelectedList: { bookList: [], memberList: [] },
      currentPermissionType: '',
      currentSelectBookType: ''

    }
  },
  components: { selectType, selectBookList, receiverAccessList },
  // emits: ['openPop', 'goPage'],
  methods: {
    openPop (param) {
      console.log('param')
      console.log(param)
      this.$emit('openPop', param)
    },
    changePermission (id, type) {
      switch (id) {
        case 'write':
          this.writePermissionAllYn = type
          this.writePermissionSelectYn = false
          break
        case 'read':
          this.readPermissionAllYn = type
          this.readPermissionSelectYn = false
          break
        case 'comment':
          this.commentPermissionAllYn = type
          this.commentPermissionSelectYn = false
          break
      }
    },
    selectPermission (id) {
      switch (id) {
        case 'write':
          this.writePermissionSelectYn = true
          break
        case 'read':
          this.readPermissionSelectYn = true
          break
        case 'comment':
          this.commentPermissionSelectYn = true
          break
      }
    },
    closeColorPickerPop (value) {
      if (value === '0') {
      } else {
        this.selectedColor = value
      }
      this.colorPickerShowYn = false
    },
    async getCabinetDetail () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // var tt = this.propData
      param.currentTeamKey = this.modiBoardDetailProps.teamKey
      param.cabinetKey = this.modiBoardDetailProps.cabinetKey
      param.adminYn = true
      console.log('paramparamparamparamparamparam')
      console.log(param)
      var resultList = await this.$getCabinetDetail(param)
      this.settingCabDetail(resultList)
    },
    async settingCabDetail (data) {
      console.log('settingsettingsettingsetting')
      console.log(data)
      console.log('setting')
      console.log(data.mCabinet)
      if (data.mCabinet) {
        this.boardName = await this.$changeText(data.mCabinet.cabinetNameMtext)
      }

      // 작성자명/댓글지원O/파일업로드O
      this.okFunctionList = ''
      // if(data.mCabinet.blindYn === 1){this.okFunctionList += '익명/'; this.blindYn = true }else{this.okFunctionList += '실명/'; this.blindYn = false}
      if (data.mCabinet.replyYn === 1) { this.replyYnInput = true; this.okFunctionList += '댓글 지원O' } else { this.okFunctionList += '댓글 지원X'; this.replyYnInput = false }
      // if(data.mCabinet.fileYn=== 1){this.okFunctionList += '파일업로드O/'; this.fileYnInput = true}else{this.okFunctionList += '파일업로드X/'; this.fileYnInput = true}
      if (data.mCabinet.picBgPath) {
        this.selectedColor = data.mCabinet.picBgPath
      }
      if (data.mCabinet.mShareItemList.length > 0) {
        var indexOf = data.mCabinet.cabShareList.findIndex(i => i.accessKind === 'T')
        console.log('T가 있나요? ' + indexOf)

        if (data.mCabinet.cabShareList) {
          var tempList = []
          var tempList2 = []
          for (var s = 0; s < data.mCabinet.cabShareList.length; s++) {
            if (data.mCabinet.cabShareList[s].accessKind === 'C') {
              tempList.push({ cabinetKey: data.mCabinet.cabShareList[s].accessKey, cabinetNameMtext: this.$changeText(data.mCabinet.cabShareList[s].cabinetNameMtext) })
            } else if (data.mCabinet.cabShareList[s].accessKind === 'U') {
              var uName = data.mCabinet.cabShareList[s].userDispMtext
              if (!uName) {
                uName = data.mCabinet.cabShareList[s].userNameMtext
              }

              tempList2.push({ userKey: data.mCabinet.cabShareList[s].accessKey, userDispMtext: uName })
            }
          }
          var listData = { bookList: tempList, memberList: tempList2 }
          //
          this.selectedList.data = listData
        }
        if (indexOf !== -1) {
          this.changeShareType('all')
          this.writePermissionAllYn = false
          this.readPermissionAllYn = false
          this.commentPermissionAllYn = false

          // var findPermission = ''
          var findPermissionW = data.mCabinet.mShareItemList.findIndex(i => i.shareType === 'W')
          var findPermissionV = data.mCabinet.mShareItemList.findIndex(i => i.shareType === 'V')
          var findPermissionR = data.mCabinet.mShareItemList.findIndex(i => i.shareType === 'R')

          this.selectedReceiver = '전체에게 공유 중'
          this.writePermission = '전체에게 권한 부여'
          this.readPermission = '전체에게 권한 부여'
          this.commentPermission = '전체에게 권한 부여'

          if (findPermissionW !== -1) {
            var permiAll = false
            for (let i = 0; i < data.mCabinet.mShareItemList.length; i++) {
              if (data.mCabinet.mShareItemList[i].shareType === 'W') {
                if (data.mCabinet.mShareItemList[i].accessKind === 'T') {
                  permiAll = true
                } else {
                  this.writePermissionSelectYn = true
                  const count = data.mCabinet.mShareItemList.filter(i => i.shareType === 'W').length
                  this.writePermission = count + '명(그룹)에게 권한 부여'
                }
              }
            }
            if (permiAll) {
              this.writePermissionAllYn = true
            } else {
              this.writePermissionSelectYn = true
              const count = data.mCabinet.mShareItemList.filter(i => i.shareType === 'W').length
              this.writePermission = count + '명(그룹)에게 권한 부여'
            }
          }
          if (findPermissionV !== -1) {
            permiAll = false
            for (let i = 0; i < data.mCabinet.mShareItemList.length; i++) {
              if (data.mCabinet.mShareItemList[i].shareType === 'V') {
                if (data.mCabinet.mShareItemList[i].accessKind === 'T') {
                  permiAll = true
                } else {
                  this.writePermissionSelectYn = true
                  const count = data.mCabinet.mShareItemList.filter(i => i.shareType === 'V').length
                  this.writePermission = count + '명(그룹)에게 권한 부여'
                }
              }
            }

            if (permiAll) {
              this.readPermissionAllYn = true
            } else {
              this.readPermissionSelectYn = true
              const count = data.mCabinet.mShareItemList.filter(i => i.shareType === 'V').length
              this.readPermission = count + '명(그룹)에게 권한 부여'
            }
          }
          if (findPermissionR !== -1) {
            permiAll = false
            for (let i = 0; i < data.mCabinet.mShareItemList.length; i++) {
              if (data.mCabinet.mShareItemList[i].shareType === 'R') {
                if (data.mCabinet.mShareItemList[i].accessKind === 'T') {
                  permiAll = true
                } else {
                  this.writePermissionSelectYn = true
                  const count = data.mCabinet.mShareItemList.filter(i => i.shareType === 'R').length
                  this.writePermission = count + '명(그룹)에게 권한 부여'
                }
              }
            }
            if (permiAll) {
              this.commentPermissionAllYn = true
            } else {
              this.commentPermissionSelectYn = true
              const count = data.mCabinet.mShareItemList.filter(i => i.shareType === 'R').length
              this.commentPermission = count + '명(그룹)에게 권한 부여'
            }
          }

          // for (let i = 0; i < data.mCabinet.mShareItemList.length; i++) {
          //   switch (data.mCabinet.mShareItemList[i].shareType) {
          //     case 'W':
          //       this.writePermissionAllYn = true
          //       break
          //     case 'V':
          //       this.readPermissionAllYn = true
          //       break
          //     case 'R':
          //       this.commentPermissionAllYn = true
          //       break
          //   }
          // }
        } else {
          this.changeShareType('select')
          this.selectedReceiver = data.mCabinet.cabShareList.length + '명(그룹)에게 공유 중'
          var W = 0; var R = 0; var V = 0
          for (let i = 0; i < data.mCabinet.mShareItemList.length; i++) {
            if (data.mCabinet.mShareItemList[i].shareType === 'W') W += 1
            if (data.mCabinet.mShareItemList[i].shareType === 'V') V += 1
            if (data.mCabinet.mShareItemList[i].shareType === 'R') R += 1
          }
          this.writePermission = W + '명(그룹)에게 권한 부여'
          this.readPermission = V + '명(그룹)에게 권한 부여'
          this.commentPermission = R + '명(그룹)에게 권한 부여'
        }
      } else {
        // 처음 만들었으면 // mShareList.length === 0
        this.changeShareType('all')
        this.writePermissionAllYn = true
        this.readPermissionAllYn = true
        this.commentPermissionAllYn = true
      }
    },
    setOk (data) {
      var text = ''
      var selectLength = 0
      if (data.bookList) {
        if (data.bookList.length > 0) {
          // itemList 중복 제거
          var indexOf = this.selectItemList.findIndex(i => i.shareType === data.bookList[0].shareType)
          while (indexOf !== -1) {
            this.selectItemList.splice(indexOf, 1)
            indexOf = this.selectItemList.findIndex(i => i.shareType === data.bookList[0].shareType)
          }

          for (let i = 0; i < data.bookList.length; i++) {
            var teampItemList = {}
            // if(teampItemList.shareType !== data.bookList[i].shareType ){
            teampItemList.shareType = data.bookList[i].shareType
            teampItemList.shareSeq = data.bookList[i].shareSeq

            this.selectItemList.push(teampItemList)
          }
          text = '그룹: ' + data.bookList[0].cabinetNameMtext
          selectLength += data.bookList.length
        }
      }

      if (data.memberList) {
        if (data.memberList.length > 0) {
          // itemList 중복 제거
          indexOf = this.selectItemList.findIndex(i => i.shareType === data.memberList[0].shareType)
          while (indexOf !== -1) {
            this.selectItemList.splice(indexOf, 1)
            indexOf = this.selectItemList.findIndex(i => i.shareType === data.memberList[0].shareType)
          }

          for (let i = 0; i < data.memberList.length; i++) {
            teampItemList = {}
            teampItemList.shareType = data.memberList[i].shareType
            teampItemList.shareSeq = data.memberList[i].shareSeq
            this.selectItemList.push(teampItemList)
          }
          text = '개인: ' + this.$changeText(data.memberList[0].userDispMtext) || this.$changeText(data.memberList[0].userNameMtext)
          selectLength += data.memberList.length
        }
      }

      if ((selectLength - 1) > 0) {
        text += '외 ' + (selectLength - 1) + '명'
      } else if ((selectLength - 1) === 0) {
        text += ''
      } else {
        text = '권한 대상자가 없습니다.'
      }

      if (this.currentPermissionType === 'W') this.writePermission = text
      if (this.currentPermissionType === 'V') this.readPermission = text
      if (this.currentPermissionType === 'R') this.commentPermission = text

      this.receiverAccessListYn = false
      console.log('this.selectItemList')
      console.log(this.selectItemList)
      console.log('this.selectShareList')
      console.log(this.selectShareList)
    },

    selectShareActorItem (itemType) {
      this.currentPermissionType = itemType
      if (itemType === 'V') { this.permissionSelectedYn.V = true }
      if (itemType === 'R') { this.permissionSelectedYn.R = true }
      if (itemType === 'W') { this.permissionSelectedYn.W = true }
      console.log(this.selectedList)
      if (this.selectedList.data) {
        if (this.selectedList.data.bookList || this.selectedList.data.memberList) {
          this.shareActorItemType = itemType
          this.receiverAccessListYn = true
        }
      }
    },
    async updateCabinet () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // eslint-disable-next-line no-new-object
      var cabinet = new Object()
      cabinet.teamMenuKey = this.modiBoardDetailProps.teamMenuKey
      cabinet.cabinetNameMtext = 'KO$^$' + this.boardName
      cabinet.cabinetKey = this.modiBoardDetailProps.cabinetKey
      cabinet.MenuType = 'C'
      cabinet.blindYn = this.blindYn
      cabinet.fileYn = this.fileYnInput
      cabinet.replyYn = this.replyYnInput
      var shareList = []
      var itemList = []
      // eslint-disable-next-line no-new-object
      var share = new Object()
      // eslint-disable-next-line no-new-object
      var item = new Object()
      share.cabinetKey = this.modiBoardDetailProps.cabinetKey
      // console.log(this.shareType)
      if (this.shareType === 'all') {
        if (this.selectShareList) {
          shareList = this.selectShareList
          itemList = this.selectItemList
        }
        share.accessKind = 'T'
        share.accessKey = this.modiBoardDetailProps.teamKey
        share.shareSeq = 0
        shareList.push(share)

        if (this.writePermissionAllYn === true && this.writePermissionSelectYn !== true) {
          item = {}
          item.shareSeq = 0
          item.shareType = 'W' // 작성
          itemList.push(item)
          console.log(this.writePermissionAllYn)
        }

        if (this.readPermissionAllYn === true && this.readPermissionSelectYn !== true) {
          item = {}
          item.shareSeq = 0
          item.shareType = 'V' // 열람
          itemList.push(item)
          console.log(this.readPermissionAllYn)
        }

        if (this.commentPermissionAllYn === true && this.commentPermissionSelectYn !== true) {
          item = {}
          item.shareSeq = 0
          item.shareType = 'R' // 댓글
          itemList.push(item)
          console.log(this.commentPermissionAllYn)
        }

        cabinet.shareList = shareList
        cabinet.itemList = itemList
      } else if (this.shareType === 'select') {
        if (!this.permissionSelectedYn.W) {
          // 공유대상 선택 시 작성 알림 댓글 itemlist 만들어주기
          if (this.selectedList.data.bookList) {
            for (let i = 0; i < this.selectedList.data.bookList.length; i++) {
              var teampItemList = {}
              teampItemList.shareType = 'W'
              teampItemList.shareSeq = this.selectedList.data.bookList[i].shareSeq
              this.selectItemList.push(teampItemList)
              // if(teampItemList.shareType !== data.bookList[i].shareType ){
            }
          }

          if (this.selectedList.data.memberList) {
            for (let i = 0; i < this.selectedList.data.memberList.length; i++) {
              teampItemList = {}
              teampItemList.shareType = 'W'
              teampItemList.shareSeq = this.selectedList.data.memberList[i].shareSeq
              this.selectItemList.push(teampItemList)
            }
          }
        }
        if (!this.permissionSelectedYn.R) {
          // 공유대상 선택 시 작성 알림 댓글 itemlist 만들어주기
          if (this.selectedList.data.bookList) {
            for (let i = 0; i < this.selectedList.data.bookList.length; i++) {
              teampItemList = {}
              teampItemList.shareType = 'R'
              teampItemList.shareSeq = this.selectedList.data.bookList[i].shareSeq
              this.selectItemList.push(teampItemList)
              // if(teampItemList.shareType !== data.bookList[i].shareType ){
            }
          }

          if (this.selectedList.data.memberList) {
            for (let i = 0; i < this.selectedList.data.memberList.length; i++) {
              teampItemList = {}
              teampItemList.shareType = 'R'
              teampItemList.shareSeq = this.selectedList.data.memberList[i].shareSeq
              this.selectItemList.push(teampItemList)
            }
          }
        }
        if (!this.permissionSelectedYn.V) {
          // 공유대상 선택 시 작성 알림 댓글 itemlist 만들어주기
          if (this.selectedList.data.bookList) {
            for (let i = 0; i < this.selectedList.data.bookList.length; i++) {
              teampItemList = {}
              teampItemList.shareType = 'V'
              teampItemList.shareSeq = this.selectedList.data.bookList[i].shareSeq
              this.selectItemList.push(teampItemList)
              // if(teampItemList.shareType !== data.bookList[i].shareType ){
            }
          }

          if (this.selectedList.data.memberList) {
            for (let i = 0; i < this.selectedList.data.memberList.length; i++) {
              teampItemList = {}
              teampItemList.shareType = 'V'
              teampItemList.shareSeq = this.selectedList.data.memberList[i].shareSeq
              this.selectItemList.push(teampItemList)
            }
          }
        }
        cabinet.shareList = this.selectShareList
        cabinet.itemList = this.selectItemList
      }
      cabinet.creteamkey = this.chanInfo.targetKey
      if (this.chanInfo.value) {
        cabinet.creuserkey = this.chanInfo.value.creUserKey
      } else {
        cabinet.creuserkey = this.chanInfo.creUserKey
      }
      cabinet.picBgPath = this.selectedColor

      /*
      // cabinet.shareList = shareList
      // cabinet.itemList = itemList
      /*

      // 대상 하나하나 > acc
      select *from TpCabinetShare;
      -- shareList : 공유대상 리스트
      -- [{ accessKind / accessKey / cabinetKey / shareSeq }, { U / accessKey / cabinetKey / shareSeq }, { T / accessKey / cabinetKey / shareSeq }]

      select *from TpCabinetShareItem;
      -- itemList : 권한 리스트
      -- [{shareType / shareSeq}, {shareType, shareSeq}] */

      // cabinet.tempKeyList = [0, 1, 2, 3]
      param.cabinet = cabinet
      param.creMenuYn = false

      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(param)
      var result = await this.$saveCabinet(param)
      if (result.result === true && result.cabinetKey !== undefined && result.cabinetKey !== null && result.cabinetKey !== 0) {
        // console.log('@@성공@@')
        this.okPopYn = true
      }
    },
    closePop () {
      this.$emit('closePop')
    },
    showSelectBookPop (type) {
      this.currentSelectBookType = type
      this.selectBookListShowYn = true
    },
    goNo () {
      this.$emit('closePop')
    },
    boardTypeClick () {
      this.selectTypePopShowYn = true
    },
    addResult (data) {
      this.selectBoardTypeText = data.chanMenuTitle

      this.selectId = data.idNum

      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)
      this.selectTypePopShowYn = false
    },
    replyYnChange () {
      if (!this.replyYnInput) {
        this.okFunctionList = '댓글 지원O'
      } else {
        this.okFunctionList = '댓글 지원X'
      }
    },
    click () {
      var toggle0 = document.getElementById('toggle0')
      this.show = !toggle0.checked
      if (!toggle0.checked) {
        this.statusSelectShowYn = true
      } else {
        this.statusSelectShowYn = false
      }
    },
    setSelectedList (datas) {
      // this.selectItemList = []
      // this.selectShareList = []
      var data = datas.data
      this.selectBookListShowYn = false
      var text = ''
      var selectLength = 0
      console.log('#######################')
      console.log(data)
      // console.log(datas);
      // if(this.currentSelectBookType === 'select'){}

      var dataLength = 0
      if (data.bookList) {
        // if(data.bookList !== null && data.bookList !== undefined && data.bookList !== []  ){
        if (data.bookList.length > 0) {
          text = '그룹: ' + data.bookList[0].cabinetNameMtext || data.bookList.cabinetNameMtext
          selectLength += data.bookList.length
          dataLength += data.bookList.length
        }
      }

      if (data.memberList) {
        if (data.memberList.length > 0) {
          text = '개인: ' + this.$changeText(data.memberList[0].userDispMtext) || this.$changeText(data.memberList.userDispMtext)
          selectLength += data.memberList.length
          dataLength += data.memberList.length
        }
      }

      if (selectLength !== 1) { this.selectedReceiver = text + ' 외 ' + (selectLength - 1) + '개' }
      if (selectLength === 1) { this.selectedReceiver = text }

      if (dataLength === 0) {
        this.selectedReceiver = '0명에게 공유중'
      }

      // var shareType = ''
      // if(this.currentSelectBookType === 'write'){this.writePermission = this.selectedReceiver; shareType }
      // if(this.currentSelectBookType === 'read'){this.readPermission = this.selectedReceiver}
      // if(this.currentSelectBookType === 'comment'){this.commentPermission = this.selectedReceiver}

      if (data.bookList) {
        for (let i = 0; i < data.bookList.length; i++) {
          var indexOf = this.selectShareList.findIndex(item => item.shareSeq === data.bookList[i].shareSeq)
          while (indexOf !== -1) {
            this.selectShareList.splice(indexOf, 1)
            indexOf = this.selectShareList.findIndex(item => item.shareSeq === data.bookList[i].shareSeq)
          }

          if (indexOf === -1) {
            var tempList = {}
            tempList.accessKey = data.bookList[i].cabinetKey
            tempList.accessKind = 'C'
            tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            tempList.shareSeq = data.bookList[i].shareSeq
            this.selectShareList.push(tempList)
          }
        }
      }

      if (data.memberList) {
        for (let i = 0; i < data.memberList.length; i++) {
          indexOf = this.selectShareList.findIndex(item => item.shareSeq === data.memberList[0].shareSeq)
          while (indexOf !== -1) {
            this.selectShareList.splice(indexOf, 1)
            indexOf = this.selectShareList.findIndex(item => item.shareSeq === data.memberList[0].shareSeq)
          }
          if (indexOf === -1) {
            tempList = {}
            tempList.accessKey = data.memberList[i].userKey
            tempList.accessKind = 'U'
            tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            tempList.shareSeq = data.memberList[i].shareSeq
            this.selectShareList.push(tempList)
          }
        }
      }
      console.log('selectShareList')
      console.log(this.selectShareList)

      if (this.currentSelectBookType === 'select') {
        this.writePermission = this.selectedReceiver; this.readPermission = this.selectedReceiver; this.commentPermission = this.selectedReceiver
        this.selectedList = datas
      } else {
        var shareType = ''
        if (this.currentSelectBookType === 'write') shareType = 'W'
        if (this.currentSelectBookType === 'read') shareType = 'V'
        if (this.currentSelectBookType === 'comment') shareType = 'R'

        this.currentPermissionType = shareType

        if (data.bookList) {
          for (let i = 0; i < data.bookList.length; i++) {
            data.bookList[i].shareType = shareType
          }
        }

        if (data.memberList) {
          for (let i = 0; i < data.memberList.length; i++) {
            data.memberList[i].shareType = shareType
          }
        }

        this.setOk(data)
      }
    },

    changeShareType (type) {
      this.shareType = type
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
      this.hideSelectStatus()
      this.functionPopShowYn = false
    },
    hideSelectStatus () {
      if (this.inputvalue !== '') {
        this.multiStatus.unshift(this.inputvalue)
        this.inputvalue = ''
      } else if (this.inputvalue === '') {
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
      } else {
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
.inputBoxThema{height: 30px; font-size: 16px; border: 1px solid #ccc;padding:0 10px; width: calc(100% - 130px); float: left; line-height: 30px;white-space: nowrap;}

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
  min-height: 65px;
  border-bottom: 1px solid #ccc;
}
.subItemWrite{
  width: 100vw;
  min-height: 45px;
  float: left;
}
.creChanIntroTextWrap{padding: 10px 0; float: left; }
.creChanIntroTextWrap p{font-size: 20px; }
.creChanBigBtn{width: 100%; height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;}
.activeTypeBox{background: #6768a7; color: #fff;}
.activeTypeBox p {color: #fff;}
.creChanBigBtn{width: 100%; height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;}
.selecWriterShow{background: #6768a7 !important; color: #fff;}

/* @media(height:700px){
  .addNewBoardWrap{
    background-color:#ccc;
  }
} */

@media screen and (max-width:350px){
  .pagePaddingWrap{
    padding: 60px  1rem 9px 1rem;
  }
  .subItemWrite{
    display: flex;
    flex-direction: column;
  }
  .subItemWrite p{
    margin-left:2% !important;
  }
  .moidRadioArea{
    width: 90%;
    justify-content: flex-start;
    flex-direction: row;
    margin-left: 0rem !important;
    padding-left: 1rem !important;
  }
  .moidRadioArea label{
    font-size: 12px;
  }
  .inputBoxThema{
    width: calc(90%);
  }
}

.modilabel{
 line-height: 30px; margin-left: 5px;
}

.moidRadioArea{
  white-space: nowrap; border:none;
  display: flex;
  /* margin-left: 2.1rem; */
  padding-left: 2.7rem;
}
.moidRadioArea label{
  font-size: 14px;
}

</style>
