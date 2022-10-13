<template>
  <div class="addNewBoardWrap pagePaddingWrap jjjPaddingWrap" style="">
    <popHeader @closeXPop="this.$emit('closePop')" class="headerShadow" headerTitle="게시판 수정" :chanName='chanName' />
    <div class="itemWrite">
      <p class="fontBold textLeft font16 fl" style="width: 100px;">게시판명</p>
      <input v-model="boardName" type="text" placeholder="게시판 이름을 입력하세요" class="creChanInput font16 inputBoxThema"  id="channelName" style="">
    </div>
    <div class="itemWrite">
      <p class="fontBold textLeft font16 fl " style="width: 100px;">배경지</p>
      <div v-if="colorPickerShowYn" @click="colorPickerShowYn = false" style="position: absolute; top: 0; left: 0; width: 100%; height: 100vh; background: rgb(0 0 0 / 25%); z-index: 99;"></div>
      <div v-if="colorPickerShowYn" style="overflow: hidden; position: absolute; box-shadow: rgb(64 64 64 / 16%) 0px 0px 7px 4px; border-radius: 15px; top: 20%; left: 20%; z-index: 99999; width: 70%; height: 500px; ">
          <gColorPicker :colorPick="this.selectedColor" @closePop="closeColorPickerPop" />
      </div>
      <div @click="this.colorPickerShowYn = true" class="inputBoxThema textLeft" style=" border: none;" :style="'background:' + this.selectedColor + ';'" >선택</div>
    </div>
    <div class="itemWrite">
      <p class="fontBold textLeft font16 fl " style="width: 100px;">유형</p>
      <!-- <div style="width: 100%; font-size: 14px; border: 1px solid #ccc; text-align: left; padding: 1px 2px;">게시판 유형을 선택해주세요</div> -->
      <!-- <div class="fr font16 inputBoxThema textLeft grayBlack" :class="{fontBlack : selectId !== ''}"  style="margin-top: 10px;" @click="boardTypeClick">{{boardDetail.menuType}}<p class='fr' style="line-height: 25px;">></p></div> -->
      <div style="border-radius: 0 !important; border: none; padding: 1px;" class="commonBlack fr font16 inputBoxThema textLeft">자유게시판</div>
    </div>
    <!-- <p class="font20" style="margin-top: 60px; margin-bottom: 25px; text-align: left;"> 공유할 사람/그룹을 선택하세요. </p> -->

    <div class="itemWrite">
      <p class="fontBold textLeft font16 fl " style="width: 100px;">기능 </p>
      <!-- <div style="width: 100%; font-size: 14px; border: 1px solid #ccc; text-align: left; padding: 1px 2px;">게시판 유형을 선택해주세요</div> -->
      <div style="text-align: left;" @click="this.functionPopShowYn = true" class="fl inputBoxThema font16 lightGray" >{{okFunctionList}}</div>
    </div>
    <div v-if="showSelectStatusShowYn === true || this.functionPopShowYn === true" style="position:absolute; top:0; left:0; width:100%; height:100vh; z-index:1; background-color:#ccc; opacity:0" @click="hidePop"></div>
    <div v-if="functionPopShowYn"  style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; background: #00000030; z-index: 99;" @click="closeFuncPop"></div>
    <div v-if="functionPopShowYn" class="function" style="width: 80%; position: absolute; z-index: 9999; top: 25%; left: 10%; background: #FFF; min-height: 350px; border-radius: 15px; overflow: hidden; box-shadow: 0px 0px 8px 4px #00000015;">
      <popHeader @closeXPop="closeFuncPop" headerTitle="게시판 기능 설정" class="headerShadow" style="position: absolute;top: 0; left: 0;" />
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
          <input type="checkbox" v-model="replyYnInput" id="toggle1" hidden>
          <label for="toggle1" class="toggleSwitch">
            <span class="toggleButton"></span>
          </label>
        </div>
      </div>
      <div class="itemWrite">
        <p style = "width: 150px;" class="fontBold textLeft font16 fl toggleLine">파일 업로드</p>
        <div class="toggleInputWrap">
          <input type="checkbox" v-model="fileYnInput" id="toggle2" hidden>
          <label for="toggle2" class="toggleSwitch">
            <span class="toggleButton"></span>
          </label>
        </div>
      </div>
      <div class="itemWrite">
        <p style = "width: 150px;" class="fontBold textLeft font16 fl toggleLine">실명/익명</p>
        <div class="toggleInputWrap">
          <input type="checkbox" v-model="blindYn" id="toggle3" hidden>
          <label for="toggle3" class="toggleSwitch">
            <span class="toggleButton"></span>
          </label>
        </div>
      </div>
      </div>
      <!-- <div style="padding: 0 8px; margin-top: 30px;">
        <div @click="nextStep" class="creChanBigBtn">다음</div>
      </div> -->
    </div>
    <div class="itemWrite fl" style="border-bottom: none;">
      <p class="fontBold textLeft font16 fl" style="width: 150px;">공유대상
        <!-- {{1111 + this.shareGroup.type}} -->
        </p>
      <div style="width: 100%; height: 40px; text-align: left; padding: 5px 0;">
        <input v-model="this.shareGroup.type" @change="changeSelectType" class="h-100P fl" type="radio" name="shareTypeRadio" value="A" id="shareAll"><label class="fl font14 mleft-05 mtop-02" for="shareAll">전체</label>
        <input v-model="this.shareGroup.type" @change="changeSelectType" class="h-100P fl mleft-1" type="radio"  name="shareTypeRadio" value="S" id="shareSelect"><label class="fl font14 mleft-05 mtop-02" for="shareSelect">선택</label>
      </div>
    </div>
    <div class="fl" style="width: 100%;">
      <div v-show="this.shareGroup.type === 'S'" @click="showSelectBookPop('select')" class="inputBoxThema textLeft fl" style="width: 100%; margin-bottom: 20px; padding:5px;">
        <p class="font16 commonBlack" v-if="selectedShareList.length === 0">{{selectedReceiver}}</p>
        <template v-if="selectedShareList.length > 0">
          <div v-for="(data, index) in selectedShareList" class="fl" :class="{'mleft-05' : index !== 0}" :key="index" style="display:flex;align-items: center; padding: 0 5px; border: 1px solid #ccc; border-radius: 10px;">
            <img v-if="data.type === 'person'" class="fl " style="width:15px" src="../../assets/images/main/main_subscriber.png" alt="">
            <img v-else class="fl " style="width:15px; margin-right:5px;" src="../../assets/images/channel/channer_addressBook.svg" alt="">
            {{data.name}}
          </div>
        </template>
        </div>
    </div>

    <p class="textRight font12 grayBlack" v-show="selectShareYn" @click="showHidePermission" style="width: 100%;">공유대상 권한설정 ▼</p>
    <div style="width: 100%; min-height: 100px; white-space: nowrap;" class="fl">
      <div class="subItemWrite" :style="writePermissionSelectYn === true && this.shareType == 'all' ? 'display: block' : '' ">
        <p class="textLeft mleft-15 font16 fl" :style="this.shareGroup.type === 'S' ? 'line-height: 42px;' : ''">작성</p>
        <!-- <div @click="selectShareActorItem('W')" class="inputBoxThema textLeft">{{writePermission}}</div> -->
        <div @click="selectShareActorItem('W')" class="inputBoxThema textLeft " style="margin-left:0.8rem; padding:5px;" v-if="this.shareGroup.type == 'S'">
          <p class="font16 commonBlack" v-if="selectedWriteList.length === 0">{{writePermission}}</p>
          <template v-if="selectedWriteList.length > 0">
            <div v-for="(data, index) in selectedWriteList" class="fl" :class="{'mleft-05' : index !== 0}" :key="index" style="display:flex;align-items: center; padding: 0 5px; border: 1px solid #ccc; border-radius: 10px;">
              <img v-if="data.type === 'person'" class="fl " style="width:15px" src="../../assets/images/main/main_subscriber.png" alt="">
              <img v-else class="fl " style="width:15px; margin-right:5px;" src="../../assets/images/channel/channer_addressBook.svg" alt="">
              {{data.name}}
            </div>
          </template>
        </div>
        <div v-if="this.shareGroup.type == 'A'" class=" textLeft moidRadioArea" style="display:flex; align-items: center;" >
            <input v-model="permissionWGroup.type" class="h-100P fl mleft-1" type="radio" name="perWRadio"  @click="changePermission('W', 'A')"  value="A"  id="perWA"><label class="fl font14 mleft-05" for="perWA">전체</label>
            <input v-model="permissionWGroup.type" class="h-100P fl mleft-1" type="radio" name="perWRadio"  @click="changePermission('W', 'N')"  value="N"  id="perWN"><label class="fl font14 mleft-05" for="perWN">사용안함</label>
            <input v-model="permissionWGroup.type" class="h-100P fl mleft-1" type="radio" name="perWRadio" @click="changePermission('W', 'S')" value="S"  id="perWS"><label class="fl font14 mleft-05" for="perWS">선택지정</label>
        </div>
        <div @click="showSelectBookPop('W')" v-if="this.shareGroup.type == 'A' && this.permissionWGroup.type === 'S'" style="margin:0.5rem 0; width:90vw; min-height:30px; float:left; border: 1px solid #ccc; text-align:left; padding-left:10px; padding:5px;">
          <p class="font16 commonBlack" v-if="selectedWriteList.length === 0">{{writePermission}}</p>
          <template v-if="selectedWriteList.length > 0">
            <div v-for="(data, index) in selectedWriteList" class="fl" :class="{'mleft-05' : index !== 0}" :key="index" style="display:flex;align-items: center; padding: 0 5px; border: 1px solid #ccc; border-radius: 10px;">
              <img v-if="data.type === 'person'" class="fl " style="width:15px" src="../../assets/images/main/main_subscriber.png" alt="">
              <img v-else class="fl " style="width:15px; margin-right:5px;" src="../../assets/images/channel/channer_addressBook.svg" alt="">
              {{data.name}}
            </div>
          </template>
        </div>
      </div>
      <div class="subItemWrite" :style="readPermissionSelectYn === true && this.shareGroup.type == 'A' ? 'display: block' : '' ">
        <p class="textLeft mleft-15 font16 fl " :style="this.shareGroup.type === 'S' ? 'line-height: 42px;' : ''">열람</p>
        <!-- <div @click="selectShareActorItem('V')" class="inputBoxThema textLeft">{{readPermission}}</div> -->
        <div @click="selectShareActorItem('V')" class="inputBoxThema textLeft" style="margin-left:0.8rem; padding:5px;" v-if="this.shareGroup.type == 'S'">
          <!-- 공유 대상이 선택이면서  -->
          <p class="font16 commonBlack" v-if="selectedReadList.length === 0">{{readPermission}}</p>
          <template v-if="selectedReadList.length > 0">
            <div v-for="(data, index) in selectedReadList" class="fl" :class="{'mleft-05' : index !== 0}" :key="index" style="display:flex;align-items: center; padding: 0 5px; border: 1px solid #ccc; border-radius: 10px;">
              <img v-if="data.type === 'person'" class="fl " style="width:15px" src="../../assets/images/main/main_subscriber.png" alt="">
              <img v-else class="fl " style="width:15px; margin-right:5px;" src="../../assets/images/channel/channer_addressBook.svg" alt="">
              {{data.name}}
            </div>
          </template>
        </div>
        <div v-if="this.shareGroup.type == 'A'" class=" textLeft moidRadioArea" style="display:flex; align-items: center;">
          <input v-model="permissionVGroup.type" class="h-100P fl mleft-1" type="radio" name="perVRadio" @click="changePermission('V', 'A')" value="A" id="perVA"><label class="fl font14 mleft-05" for="perVA">전체</label>
          <input v-model="permissionVGroup.type" class="h-100P fl mleft-1" type="radio" name="perVRadio" @click="changePermission('V', 'N')" value="N" id="perVN"><label class="fl font14 mleft-05" for="perVN">사용안함</label>
          <input v-model="permissionVGroup.type" class="h-100P fl mleft-1" type="radio" name="perVRadio" @click="changePermission('V', 'S')" value="S" id="perVS"><label class="fl font14 mleft-05" for="perVS">선택지정</label>
        </div>
        <div @click="showSelectBookPop('V')" v-if=" this.permissionVGroup.type === 'S' && this.shareGroup.type == 'A'" style="margin:0.5rem 0; width:90vw; min-height:30px; float:left; border: 1px solid #ccc; text-align:left; padding-left:10px; padding:5px; display: block">
          <p class="font16 commonBlack" v-if="selectedReadList.length === 0">{{readPermission}}</p>
          <template v-if="selectedReadList.length > 0">
            <div v-for="(data, index) in selectedReadList" class="fl" :class="{'mleft-05' : index !== 0}" :key="index" style="display:flex;align-items: center; padding: 0 5px; border: 1px solid #ccc; border-radius: 10px;">
              <img v-if="data.type === 'person'" class="fl " style="width:15px" src="../../assets/images/main/main_subscriber.png" alt="">
              <img v-else class="fl " style="width:15px; margin-right:5px;" src="../../assets/images/channel/channer_addressBook.svg" alt="">
              {{data.name}}
            </div>
          </template>
        </div>
      </div>
      <div class="subItemWrite" :style="commentPermissionSelectYn === true && this.shareGroup.type == 'A' ? 'display: block' : '' ">
        <p class="textLeft mleft-15 font16 fl " :style="this.shareGroup.type === 'S' ? 'line-height: 42px;' : ''">댓글</p>
        <!-- <div @click="selectShareActorItem('R')" class="inputBoxThema textLeft" >{{commentPermission}}</div> -->
        <div @click="selectShareActorItem('R')" class="inputBoxThema textLeft" style="margin-left:0.8rem; padding:5px;" v-if="this.shareGroup.type == 'S'" >
          <p class="font16 commonBlack" v-if="selectedCommentList.length === 0">{{commentPermission}}</p>
          <template v-if="selectedCommentList.length > 0">
            <div v-for="(data, index) in selectedCommentList" class="fl" :class="{'mleft-05' : index !== 0}" :key="index" style="display:flex;align-items: center; padding: 0 5px; border: 1px solid #ccc; border-radius: 10px;">
              <img v-if="data.type === 'person'" class="fl " style="width:15px" src="../../assets/images/main/main_subscriber.png" alt="">
              <img v-else class="fl " style="width:15px; margin-right:5px;" src="../../assets/images/channel/channer_addressBook.svg" alt="">
              {{data.name}}
            </div>
          </template>
        </div>

        <div v-if="this.shareGroup.type == 'A'" class=" textLeft moidRadioArea" style="display:flex; align-items: center;">
          <input v-model="permissionRGroup.type" class="h-100P fl mleft-1" type="radio" name="perRRadio"  @click="changePermission('R', 'A')" value="A" id="perRA"><label class="fl font14 mleft-05" for="perRA">전체</label>
          <input v-model="permissionRGroup.type" class="h-100P fl mleft-1" type="radio" name="perRRadio"  @click="changePermission('R', 'N')" value="N" id="perRN"><label class="fl font14 mleft-05" for="perRN">사용안함</label>
          <input v-model="permissionRGroup.type" class="h-100P fl mleft-1" type="radio" name="perRRadio"  @click="changePermission('R', 'S')" value="S" id="perRS"><label class="fl font14 mleft-05" for="perRS">선택지정</label>
        </div>
        <div @click="showSelectBookPop('R')" v-if="this.shareGroup.type == 'A'  && this.permissionRGroup.type === 'S'" style="width:90vw; min-height:30px; float:left; border: 1px solid #ccc; text-align:left; padding-left:10px; padding:5px; display: block !important;">
          <p class="font16 commonBlack" v-if="selectedCommentList.length === 0">{{commentPermission}}</p>
          <template v-if="selectedCommentList.length > 0">
            <div v-for="(data, index) in selectedCommentList" class="fl" :class="{'mleft-05' : index !== 0}" :key="index" style="display:flex;align-items: center; padding: 0 5px; border: 1px solid #ccc; border-radius: 10px;">
              <img v-if="data.type === 'person'" class="fl " style="width:15px" src="../../assets/images/main/main_subscriber.png" alt="">
              <img v-else class="fl " style="width:15px; margin-right:5px;" src="../../assets/images/channel/channer_addressBook.svg" alt="">
              {{data.name}}
            </div>
          </template>
        </div>
      </div>
    </div>
  <div style="width: 100%; float: right; bottom:1.5rem; right:2rem; position: absolute;">
    <gBtnSmall btnThema="light" btnTitle="취소" @click="closePop" />
    <gBtnSmall @click="updateCabinet" class="mright-05" btnTitle="적용" />
  </div>
  </div>
  <selectType :chanInfo="this.CHANNEL_DETAIL" v-if="selectTypePopShowYn" @closePop='selectTypePopShowYn = false' @addFinish='addResult' />
  <selectBookList :chanInfo="this.CHANNEL_DETAIL" :propData="this.chanProps" :boardDetail="this.boardDetail" :chanAlimListTeamKey="this.modiBoardDetailProps.teamKey" v-if="selectBookListShowYn" @closeXPop='selectBookListShowYn = false' :selectPopYn='true' @sendReceivers='setSelectedList' :pSelectedList="selectedList" @openPop='openPop' />
<!-- @sendReceivers="setOk" -->
  <receiverAccessList :chanInfo="this.CHANNEL_DETAIL" :propData="CHANNEL_DETAIL" :itemType="shareActorItemType" v-if="receiverAccessListYn" @closeXPop='receiverAccessListYn=false' :parentList='selectedList.data' :selectList='permissionSelectedList'  @sendReceivers='receiverPoolInSetting'/>
  <gConfirmPop  confirmText='성공적으로 수정되었습니다.' confirmType='timeout' v-if="okPopYn" @no='closePop' />

</template>

<script>
import selectType from './Tal_addChannelMenu.vue'
// import shareSelect from './Tal_shareSelect.vue'
import selectBookList from './receiver/Tal_selectBookList.vue'
// import selectBookList from './receiver/Tal_selectBookList.vue'
import receiverAccessList from './receiver/Tal_selectReceiverAccessList.vue'
export default {
  props: {
    modiBoardDetailProps: {},
    chanInfo: {},
    chanName: {}
  },
  created () {
    /* var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'modiBoardPop' + this.modiBoardDetailProps.cabinetKey
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history) */

    this.boardDetail = this.modiBoardDetailProps
    this.getCabinetDetail()
    if (this.shareGroup.type === 'S') {
      this.changeSelectType()
    }
    this.chanProps = this.modiBoardDetailProps
    this.chanProps.teamNameMtext = this.$changeText(this.CHANNEL_DETAIL.nameMtext)

    // // console.log(this.boardDetail)
    // // console.log(this.chanInfo)

    //
  },
  computed: {
    CHANNEL_DETAIL () {
      var team = this.$getDetail('TEAM', this.modiBoardDetailProps.teamKey)
      if (team) {
        return team[0]
      } else {
        return null
      }
    },
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
        var history = this.$store.getters['D_HISTORY/hStack']
        var removePage = history[history.length - 1]
        history = history.filter((element, index) => index < history.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', history)
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
      selectBoardTypeText: '게시판의 유형을 선택해주세요.',
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
      selectedReceiver: '게시판을 공유할 대상을 선택해주세요.',
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
      // currentPermissionType: '',
      currentSelectBookType: '',
      selectedShareList: [],
      selectedWriteList: [],
      selectedReadList: [],
      selectedCommentList: [],
      shareGroup: { type: 'A', selectedList: [] },
      permissionWGroup: { type: 'A', selectedList: [] },
      permissionRGroup: { type: 'A', selectedList: [] },
      permissionVGroup: { type: 'A', selectedList: [] },
      permissionSelectedList: []

    }
  },
  components: {
    selectType,
    selectBookList,
    receiverAccessList
  },
  // emits: ['openPop', 'goPage'],
  methods: {
    changeSelectType () {
      // debugger
      if (this.shareGroup.type === 'S') {
        // alert(true)
        this.permissionWGroup.type = 'S'
        this.permissionVGroup.type = 'S'
        this.permissionRGroup.type = 'S'
      } else if (this.shareGroup.type === 'A') {
        this.permissionWGroup.type = 'A'
        this.permissionVGroup.type = 'A'
        this.permissionRGroup.type = 'A'
      }
      this.permissionWGroup.selectedList = {}
      this.permissionVGroup.selectedList = {}
      this.permissionRGroup.selectedList = {}
      this.shareGroup.selectedList = {}
      this.selectedReceiver = '게시판을 공유할 대상을 선택해주세요.'
      this.writePermission = '클릭하여 권한을 설정해주세요.'
      this.readPermission = '클릭하여 권한을 설정해주세요.'
      this.commentPermission = '클릭하여 권한을 설정해주세요.'
    },
    closeFuncPop () {
      this.changeFunc()
      this.functionPopShowYn = false
    },
    openPop (param) {
      this.$emit('openPop', param)
    },
    changePermission (id, type) {
      switch (id) {
        case 'W':
          this.permissionWGroup.type = type
          break
        case 'V':
          this.permissionVGroup.type = type
          break
        case 'R':
          this.permissionRGroup.type = type
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
      var resultList = await this.$getCabinetDetail(param)
      this.settingCabDetail(resultList)
    },
    async settingCabDetail (data) {
      if (data.mCabinet) {
        this.boardName = await this.$changeText(data.mCabinet.cabinetNameMtext)
      }
      // console.log(data)
      // 작성자명/댓글지원O/파일업로드O
      this.okFunctionList = ''
      // if(data.mCabinet.blindYn === 1){this.okFunctionList += '익명/'; this.blindYn = true }else{this.okFunctionList += '실명/'; this.blindYn = false}
      if (data.mCabinet.replyYn === 1) { this.replyYnInput = true; this.okFunctionList += '댓글 지원O' } else { this.okFunctionList += '댓글 지원X'; this.replyYnInput = false }
      if (data.mCabinet.fileYn === 1) { this.okFunctionList += '/파일업로드O'; this.fileYnInput = true } else { this.okFunctionList += '/파일업로드X'; this.fileYnInput = false }
      if (data.mCabinet.blindYn === 1) { this.okFunctionList += '/익명'; this.blindYn = true } else { this.okFunctionList += '/실명'; this.blindYn = false }
      if (data.mCabinet.picBgPath) {
        this.selectedColor = data.mCabinet.picBgPath
      }
      var mCabinet = data.mCabinet
      console.log('------------------ mCabinet, ShareList, ItemList -----------------')
      var cabShareList = mCabinet.cabShareList
      var mShareItemList = mCabinet.mShareItemList
      console.log(mCabinet)
      console.log(cabShareList)
      console.log(mShareItemList)
      // 공유 리스트에서 공유 대상이 전체(T)인지 선택인지 구분
      var findListInT = cabShareList.findIndex(i => i.accessKind === 'T')
      if (findListInT !== -1) {
        this.shareGroup.type = 'A'
        this.selectedReceiver = '전체에게 공유 중'
      } else {
        this.shareGroup.type = 'S'
        this.shareGroup.selectedList = { bookList: [], memberList: [] }
        var shareMemCount = 0
        var shareBookCount = 0
        if (cabShareList) {
          for (let i = 0; i < cabShareList.length; i++) {
            if (cabShareList[i].accessKind === 'C') {
              shareBookCount += 1
              cabShareList[i].cabinetKey = cabShareList[i].accessKey
              this.shareGroup.selectedList.bookList.push(cabShareList[i])
            }
            if (cabShareList[i].accessKind === 'U') {
              shareMemCount += 1
              this.shareGroup.selectedList.memberList.push(cabShareList[i])
            }
          }
          // this.selectedList = {}
          console.log('------------------ this.shareGroup.selectedList -----------------')
          console.log(this.shareGroup.selectedList)
          // this.selectedList.data = this.shareGroup.selectedList
          this.selectedReceiver = shareBookCount + '개 그룹, ' + shareMemCount + '명 에게 공유 중'
        }
        /* this.permissionWGroup.type = 'S'
        this.permissionRGroup.type = 'S'
        this.permissionVGroup.type = 'S' */
        // var cabinetCount = mShareItemList.filter(i => i.shareType === 'W' && i.accessKind === 'C').length
        // var userCount = mShareItemList.filter(i => i.shareType === 'W' && i.accessKind === 'U').length
        // this.selectedReceiver = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      }
      // this.selectShareList = data.mCabinet.cabShareList
      // this.selectItemList = data.mCabinet.mShareItemList

      // 권한을 사용하는지 안하는지 체크하기 위해 한개라도 W,V,R 값이 있으면 ture로 변환 없으면 type = 'N' 처리
      var w = false
      var v = false
      var r = false

      this.permissionWGroup = { type: 'A', selectedList: { bookList: [], memberList: [] } }
      this.permissionVGroup = { type: 'A', selectedList: { bookList: [], memberList: [] } }
      this.permissionRGroup = { type: 'A', selectedList: { bookList: [], memberList: [] } }
      // 공유 아이템 중 W, V, R을 찾아 Radio버튼 setting
      for (let i = 0; i < mShareItemList.length; i++) {
        var cIndex = null

        cIndex = cabShareList.findIndex(item => item.accessKey === mShareItemList[i].accessKey)
        if (mShareItemList[i].accessKind === 'C') {
          mShareItemList[i].cabinetKey = mShareItemList[i].accessKey
          mShareItemList[i].cabinetNameMtext = cabShareList[cIndex].cabinetNameMtext
        }
        if (mShareItemList[i].accessKind === 'U') {
          mShareItemList[i].userDispMtext = cabShareList[cIndex].userDispMtext
          mShareItemList[i].userNameMtext = cabShareList[cIndex].userNameMtext
        }
        // // eslint-disable-next-line no-debugger
        // debugger
        if (mShareItemList[i].shareType === 'W') {
          if (mShareItemList[i].accessKind === 'T') {
            this.permissionWGroup.type = 'A'
          } else {
            this.permissionWGroup.type = 'S'
            if (mShareItemList[i].accessKind === 'C') {
              // this.permissionWGroup.selectedList.bookList = []
              this.permissionWGroup.selectedList.bookList.push(mShareItemList[i])
            }
            if (mShareItemList[i].accessKind === 'U') {
              // this.permissionWGroup.selectedList.memberList = []
              this.permissionWGroup.selectedList.memberList.push(mShareItemList[i])
            }
          }
          w = true
          //
        } else if (mShareItemList[i].shareType === 'V') {
          if (mShareItemList[i].accessKind === 'T') {
            this.permissionVGroup.type = 'A'
          } else {
            this.permissionVGroup.type = 'S'
            if (mShareItemList[i].accessKind === 'C') {
              // this.permissionVGroup.selectedList.bookList = []
              this.permissionVGroup.selectedList.bookList.push(mShareItemList[i])
            }
            if (mShareItemList[i].accessKind === 'U') {
              // this.permissionVGroup.selectedList.memberList = []
              this.permissionVGroup.selectedList.memberList.push(mShareItemList[i])
            }
          }
          v = true
          //
        } else if (mShareItemList[i].shareType === 'R') {
          if (mShareItemList[i].accessKind === 'T') {
            this.permissionRGroup.type = 'A'
          } else {
            this.permissionRGroup.type = 'S'
            if (mShareItemList[i].accessKind === 'C') {
              // this.permissionRGroup.selectedList.bookList = []
              this.permissionRGroup.selectedList.bookList.push(mShareItemList[i])
            }
            if (mShareItemList[i].accessKind === 'U') {
              // this.permissionRGroup.selectedList.memberList = []
              this.permissionRGroup.selectedList.memberList.push(mShareItemList[i])
            }
          }
          r = true
        }
      }
      if (w === false && this.shareGroup.type !== 'S') this.permissionWGroup.type = 'N'
      if (v === false && this.shareGroup.type !== 'S') this.permissionVGroup.type = 'N'
      if (r === false && this.shareGroup.type !== 'S') this.permissionRGroup.type = 'N'
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@')
      console.log(this.permissionWGroup.selectedList)
      console.log(this.permissionVGroup.selectedList)
      console.log(this.permissionRGroup.selectedList)
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@')

      // var cabinetCount = mShareItemList.filter(i => i.shareType === 'W' && i.accessKind === 'C').length
      // var userCount = mShareItemList.filter(i => i.shareType === 'W' && i.accessKind === 'U').length
      // this.writePermission = cabinetCount + '개 그룹, ' + userCount + '명 에게 권한 부여'

      // cabinetCount = mShareItemList.filter(i => i.shareType === 'V' && i.accessKind === 'C').length
      // userCount = mShareItemList.filter(i => i.shareType === 'V' && i.accessKind === 'U').length
      // this.readPermission = cabinetCount + '개 그룹, ' + userCount + '명 에게 권한 부여'

      // cabinetCount = mShareItemList.filter(i => i.shareType === 'R' && i.accessKind === 'C').length
      // userCount = mShareItemList.filter(i => i.shareType === 'R' && i.accessKind === 'U').length
      // this.commentPermission = cabinetCount + '개 그룹, ' + userCount + '명 에게 권한 부여'
      this.setTextPermission()

      console.log(this.permissionWGroup.type)
      console.log(this.permissionVGroup.type)
      console.log(this.permissionRGroup.type)

      console.log(this.permissionWGroup.selectedList)
      console.log(this.permissionVGroup.selectedList)
      console.log(this.permissionRGroup.selectedList)
    },
    selectShareActorItem (itemType) {
      console.log('selectShareActorItem')
      console.log(itemType)
      this.currentSelectBookType = itemType
      if (itemType === 'V') {
        this.permissionSelectedYn.V = true
      }
      if (itemType === 'R') {
        this.permissionSelectedYn.R = true
      }
      if (itemType === 'W') {
        this.permissionSelectedYn.W = true
      }
      console.log(this.shareGroup.type)
      if (this.shareGroup.type === 'S') {
        console.log('*************************')
        console.log(this.shareGroup.selectedList)
        this.permissionSelectedList = []
        if (itemType === 'V') {
          this.permissionSelectedList = this.permissionVGroup.selectedList
        }
        if (itemType === 'R') {
          this.permissionSelectedList = this.permissionRGroup.selectedList
        }
        if (itemType === 'W') {
          this.permissionSelectedList = this.permissionWGroup.selectedList
        }
        console.log('ㅅㅄㅄㅄㅄ')
        console.log(this.shareGroup.selectedList)
        this.selectedList = {}
        if (this.shareGroup.selectedList && ((this.shareGroup.selectedList.bookList && this.shareGroup.selectedList.bookList.length > 0) || (this.shareGroup.selectedList.memberList && this.shareGroup.selectedList.memberList.length > 0))) {
          this.selectedList.data = this.shareGroup.selectedList
          this.shareActorItemType = itemType
          this.receiverAccessListYn = true
        } else {
          this.$showToastPop('먼저 공유대상을 선택해주세요.')
        }
      }
      // if (this.selectedList.data) {
      //   if (this.selectedList.data.bookList || this.selectedList.data.memberList) {
      //     this.shareActorItemType = itemType
      //     this.receiverAccessListYn = true
      //   }
      // }
    },
    async updateCabinet () {
      // console.log(this.permissionWGroup.selectedList)
      // console.log(this.permissionVGroup.selectedList)
      // console.log(this.permissionRGroup.selectedList)

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
      // // console.log(this.shareType)
      var teampItemList = {}
      var shareSeqList = null
      // eslint-disable-next-line no-debugger
      debugger
      if (this.shareGroup.type === 'A') {
        share = {}
        share.accessKind = 'T'
        share.accessKey = this.modiBoardDetailProps.teamKey
        share.cabinetKey = this.modiBoardDetailProps.cabinetKey
        share.shareSeq = 0
        shareList.push(share)
      } else if (this.shareGroup.type === 'S') {
        console.log('this.shareGroup.selectedList')
        console.log(this.shareGroup.selectedList)
        shareSeqList = this.shareGroup.selectedList.bookList
        for (var i = 0; i < shareSeqList.length; i++) {
          share = {}
          share.accessKind = 'C'
          share.accessKey = shareSeqList[i].accessKey
          share.cabinetKey = this.modiBoardDetailProps.cabinetKey
          share.shareSeq = shareSeqList[i].accessKey
          if (shareSeqList[i].cabinetNameMtext) share.cabinetNameMtext = this.$changeText(shareSeqList[i].cabinetNameMtext)
          var index = shareList.findIndex(item => item.shareSeq === shareSeqList[i].accessKey)
          if (index === -1) {
            shareList.push(share)
          }
        }
        shareSeqList = this.shareGroup.selectedList.memberList
        for (i = 0; i < shareSeqList.length; i++) {
          share = {}
          share.accessKind = 'U'
          share.cabinetKey = this.modiBoardDetailProps.cabinetKey
          if (shareSeqList[i].userDispMtext) share.userDispMtext = this.$changeText(shareSeqList[i].userDispMtext)
          if (shareSeqList[i].userNameMtext) share.userNameMtext = this.$changeText(shareSeqList[i].userNameMtext)
          share.accessKey = shareSeqList[i].accessKey
          // hare.accessKey = shareSeqList[i].cabinetKey
          share.shareSeq = shareSeqList[i].accessKey
          index = shareList.findIndex(item => item.shareSeq === shareSeqList[i].accessKey)
          if (index === -1) {
            shareList.push(share)
          }
        }
      }
      console.log(this.permissionWGroup)
      // eslint-disable-next-line no-debugger
      debugger
      /* W 권한 처리 */
      if (this.permissionWGroup.type === 'A') {
        for (var sh = 0; sh < shareList.length; sh++) {
          item = {}
          // item.shareSeq = shareList[sh].accessKey
          item.shareSeq = 0
          item.shareType = 'W' // 작성
          itemList.push(item)
        }
      } else if (this.permissionWGroup.type === 'N') {
        // itemList = []
      } else if (this.permissionWGroup.type === 'S') {
        if (this.permissionWGroup.selectedList.bookList) {
          for (let i = 0; i < this.permissionWGroup.selectedList.bookList.length; i++) {
            index = shareList.findIndex(item => item.shareSeq === this.permissionWGroup.selectedList.bookList[i].accessKey)
            if (index === -1) {
              share = {}
              share.accessKind = 'C'
              share.accessKey = this.permissionWGroup.selectedList.bookList[i].accessKey
              share.cabinetKey = this.modiBoardDetailProps.cabinetKey
              share.shareSeq = this.permissionWGroup.selectedList.bookList[i].accessKey
              if (this.permissionWGroup.selectedList.bookList[i].cabinetNameMtext) share.cabinetNameMtext = this.$changeText(this.permissionWGroup.selectedList.bookList[i].cabinetNameMtext)

              shareList.push(share)
            }
            teampItemList = {}
            teampItemList.shareType = 'W'
            teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            teampItemList.shareSeq = this.permissionWGroup.selectedList.bookList[i].accessKey
            if (this.permissionWGroup.selectedList.bookList[i].cabinetNameMtext) teampItemList.cabinetNameMtext = this.$changeText(this.permissionWGroup.selectedList.bookList[i].cabinetNameMtext)
            itemList.push(teampItemList)
            // if(teampItemList.shareType !== data.bookList[i].shareType ){
          }
        }

        if (this.permissionWGroup.selectedList.memberList) {
          for (let i = 0; i < this.permissionWGroup.selectedList.memberList.length; i++) {
            index = shareList.findIndex(item => item.shareSeq === this.permissionWGroup.selectedList.memberList[i].accessKey)
            if (index === -1) {
              share = {}
              share.accessKind = 'U'
              share.accessKey = this.permissionWGroup.selectedList.memberList[i].accessKey
              share.cabinetKey = this.modiBoardDetailProps.cabinetKey
              share.shareSeq = this.permissionWGroup.selectedList.memberList[i].accessKey
              if (this.permissionWGroup.selectedList.memberList[i].userDispMtext) share.userDispMtext = this.$changeText(this.permissionWGroup.selectedList.memberList[i].userDispMtext)
              if (this.permissionWGroup.selectedList.memberList[i].userNameMtext) share.userNameMtext = this.$changeText(this.permissionWGroup.selectedList.memberList[i].userNameMtext)
              shareList.push(share)
            }
            teampItemList = {}
            teampItemList.shareType = 'W'
            teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            teampItemList.shareSeq = this.permissionWGroup.selectedList.memberList[i].accessKey
            if (this.permissionWGroup.selectedList.memberList[i].userDispMtext) teampItemList.userDispMtext = this.$changeText(this.permissionWGroup.selectedList.memberList[i].userDispMtext)
            if (this.permissionWGroup.selectedList.memberList[i].userNameMtext) teampItemList.userNameMtext = this.$changeText(this.permissionWGroup.selectedList.memberList[i].userNameMtext)
            itemList.push(teampItemList)
          }
        }
      }

      console.log(this.permissionVGroup)
      // eslint-disable-next-line no-debugger
      debugger
      /* V 권한 처리 */
      if (this.permissionVGroup.type === 'A') {
        for (sh = 0; sh < shareList.length; sh++) {
          item = {}
          // item.shareSeq = shareList[sh].accessKey
          item.shareSeq = 0
          item.shareType = 'V' // 작성
          itemList.push(item)
        }
      } else if (this.permissionVGroup.type === 'N') {
        // itemList = []
      } else if (this.permissionVGroup.type === 'S') {
        if (this.permissionVGroup.selectedList.bookList) {
          for (let i = 0; i < this.permissionVGroup.selectedList.bookList.length; i++) {
            index = shareList.findIndex(item => item.shareSeq === this.permissionVGroup.selectedList.bookList[i].accessKey)
            if (index === -1) {
              share = {}
              share.accessKind = 'C'
              share.cabinetKey = this.modiBoardDetailProps.cabinetKey
              share.accessKey = this.permissionVGroup.selectedList.bookList[i].accessKey
              share.shareSeq = this.permissionVGroup.selectedList.bookList[i].accessKey
              if (this.permissionVGroup.selectedList.bookList[i].cabinetNameMtext) share.cabinetNameMtext = this.$changeText(this.permissionVGroup.selectedList.bookList[i].cabinetNameMtext)
              shareList.push(share)
            }
            teampItemList = {}
            teampItemList.shareType = 'V'
            teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            teampItemList.shareSeq = this.permissionVGroup.selectedList.bookList[i].accessKey
            if (this.permissionVGroup.selectedList.bookList[i].cabinetNameMtext) teampItemList.cabinetNameMtext = this.$changeText(this.permissionVGroup.selectedList.bookList[i].cabinetNameMtext)
            itemList.push(teampItemList)
            // if(teampItemList.shareType !== data.bookList[i].shareType ){
          }
        }

        if (this.permissionVGroup.selectedList.memberList) {
          for (let i = 0; i < this.permissionVGroup.selectedList.memberList.length; i++) {
            index = shareList.findIndex(item => item.shareSeq === this.permissionVGroup.selectedList.memberList[i].accessKey)
            if (index === -1) {
              share = {}
              share.accessKind = 'U'
              share.accessKey = this.permissionVGroup.selectedList.memberList[i].accessKey
              share.cabinetKey = this.modiBoardDetailProps.cabinetKey
              share.shareSeq = this.permissionVGroup.selectedList.memberList[i].accessKey
              if (this.permissionVGroup.selectedList.memberList[i].userDispMtext) share.userDispMtext = this.$changeText(this.permissionVGroup.selectedList.memberList[i].userDispMtext)
              if (this.permissionVGroup.selectedList.memberList[i].userNameMtext) share.userNameMtext = this.$changeText(this.permissionVGroup.selectedList.memberList[i].userNameMtext)
              shareList.push(share)
            }

            teampItemList = {}
            teampItemList.shareType = 'V'
            teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            teampItemList.shareSeq = this.permissionVGroup.selectedList.memberList[i].accessKey
            if (this.permissionVGroup.selectedList.memberList[i].userDispMtext) teampItemList.userDispMtext = this.$changeText(this.permissionVGroup.selectedList.memberList[i].userDispMtext)
            if (this.permissionVGroup.selectedList.memberList[i].userNameMtext) teampItemList.userNameMtext = this.$changeText(this.permissionVGroup.selectedList.memberList[i].userNameMtext)
            itemList.push(teampItemList)
          }
        }
      }

      console.log(this.permissionRGroup)
      // eslint-disable-next-line no-debugger
      debugger
      /* R 권한 처리 */
      if (this.permissionRGroup.type === 'A') {
        for (sh = 0; sh < shareList.length; sh++) {
          item = {}
          // item.shareSeq = shareList[sh].accessKey
          item.shareSeq = 0
          item.shareType = 'R' // 작성
          itemList.push(item)
        }
      } else if (this.permissionRGroup.type === 'N') {
        // itemList = []
      } else if (this.permissionRGroup.type === 'S') {
        if (this.permissionRGroup.selectedList.bookList) {
          for (let i = 0; i < this.permissionRGroup.selectedList.bookList.length; i++) {
            index = shareList.findIndex(item => item.shareSeq === this.permissionRGroup.selectedList.bookList[i].accessKey)
            if (index === -1) {
              share = {}
              share.accessKind = 'C'
              share.accessKey = this.permissionRGroup.selectedList.bookList[i].accessKey
              share.cabinetKey = this.modiBoardDetailProps.cabinetKey
              share.shareSeq = this.permissionRGroup.selectedList.bookList[i].accessKey
              if (this.permissionRGroup.selectedList.bookList[i].cabinetNameMtext) share.cabinetNameMtext = this.$changeText(this.permissionRGroup.selectedList.bookList[i].cabinetNameMtext)
              shareList.push(share)
            }
            teampItemList = {}
            teampItemList.shareType = 'R'
            teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            teampItemList.shareSeq = this.permissionRGroup.selectedList.bookList[i].accessKey
            if (this.permissionRGroup.selectedList.bookList[i].cabinetNameMtext) teampItemList.cabinetNameMtext = this.$changeText(this.permissionRGroup.selectedList.bookList[i].cabinetNameMtext)
            itemList.push(teampItemList)
            // if(teampItemList.shareType !== data.bookList[i].shareType ){
          }
        }

        if (this.permissionRGroup.selectedList.memberList) {
          for (let i = 0; i < this.permissionRGroup.selectedList.memberList.length; i++) {
            index = shareList.findIndex(item => item.shareSeq === this.permissionRGroup.selectedList.memberList[i].accessKey)
            if (index === -1) {
              share = {}
              share.accessKind = 'U'
              share.accessKey = this.permissionRGroup.selectedList.memberList[i].accessKey
              share.cabinetKey = this.modiBoardDetailProps.cabinetKey
              share.shareSeq = this.permissionRGroup.selectedList.memberList[i].accessKey
              if (this.permissionRGroup.selectedList.memberList[i].userDispMtext) share.userDispMtext = this.$changeText(this.permissionRGroup.selectedList.memberList[i].userDispMtext)
              if (this.permissionRGroup.selectedList.memberList[i].userNameMtext) share.userNameMtext = this.$changeText(this.permissionRGroup.selectedList.memberList[i].userNameMtext)
              shareList.push(share)
            }

            teampItemList = {}
            teampItemList.shareType = 'R'
            teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            teampItemList.shareSeq = this.permissionRGroup.selectedList.memberList[i].accessKey
            if (this.permissionRGroup.selectedList.memberList[i].userDispMtext) teampItemList.userDispMtext = this.$changeText(this.permissionRGroup.selectedList.memberList[i].userDispMtext)
            if (this.permissionRGroup.selectedList.memberList[i].userNameMtext) teampItemList.userNameMtext = this.$changeText(this.permissionRGroup.selectedList.memberList[i].userNameMtext)
            itemList.push(teampItemList)
          }
        }
      }
      cabinet.creteamkey = this.CHANNEL_DETAIL.teamKey
      cabinet.picBgPath = this.selectedColor
      cabinet.shareList = shareList
      cabinet.itemList = itemList

      param.cabinet = cabinet
      param.creMenuYn = false

      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(param)
      var result = await this.$saveCabinet(param)
      if (result.result === true && result.cabinetKey !== undefined && result.cabinetKey !== null && result.cabinetKey !== 0) {
        // // console.log('@@성공@@')
        this.okPopYn = true
      }
    },
    closePop () {
      this.$emit('closePop')
    },
    showSelectBookPop (type) {
      console.log(type)
      this.currentSelectBookType = type
      if (type === 'select') {
        this.selectedList = this.shareGroup.selectedList
      } else {
        if (type === 'W') {
          this.selectedList = this.permissionWGroup.selectedList
        } else if (type === 'V') {
          this.selectedList = this.permissionVGroup.selectedList
        } else if (type === 'R') {
          this.selectedList = this.permissionRGroup.selectedList
        }
      }
      console.log('prop selectedList 값')
      console.log(this.selectedList)
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
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.selectTypePopShowYn = false
    },
    changeFunc () {
      // console.log(this.blindYn)
      this.okFunctionList = (this.replyYnInput === true ? '댓글O' : '댓글X') + (this.fileYnInput === true ? '/파일O' : '/파일X') + (this.blindYn === true ? '/익명' : '/실명')
    },
    // replyYnChange () {
    // if (!this.replyYnInput) {
    //   this.okFunctionList = '댓글 지원O'
    // } else {
    //   this.okFunctionList = '댓글 지원X'
    // }
    // },
    click () {
      var toggle0 = document.getElementById('toggle0')
      this.show = !toggle0.checked
      if (!toggle0.checked) {
        this.statusSelectShowYn = true
      } else {
        this.statusSelectShowYn = false
      }
    },
    receiverPoolInSetting (datas) {
      console.log('%%%%%%%%%%%%%%%')
      console.log(datas)
      // eslint-disable-next-line no-debugger
      debugger
      console.log(this.currentSelectBookType)
      // var bookCount, memberCount
      if (datas.bookList) {
        var settingBookList = []
        const books = datas.bookList
        // bookCount = books.length
        for (var i = 0; i < books.length; i++) {
          var tempList = {}
          tempList.cabinetNameMtext = this.$changeText(books[i].cabinetNameMtext)
          tempList.accessKey = books[i].shareSeq
          tempList.accessKind = 'C'
          tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          tempList.shareSeq = books[i].shareSeq
          settingBookList.push(tempList)
        }
        if (this.currentSelectBookType === 'W') {
          if (!this.permissionWGroup.selectedList.bookList) {
            this.permissionWGroup.selectedList.bookList = []
          }
          // this.permissionWGroup.selectedList.bookList = []
          this.permissionWGroup.selectedList.bookList = settingBookList
        } else if (this.currentSelectBookType === 'V') {
          if (!this.permissionVGroup.selectedList.bookList) {
            this.permissionVGroup.selectedList.bookList = []
          }
          // this.permissionVGroup.selectedList.bookList = []
          this.permissionVGroup.selectedList.bookList = settingBookList
        } else if (this.currentSelectBookType === 'R') {
          if (!this.permissionRGroup.selectedList.bookList) {
            this.permissionRGroup.selectedList.bookList = []
          }
          // this.permissionRGroup.selectedList.bookList = []
          this.permissionRGroup.selectedList.bookList = settingBookList
        }
      }
      if (datas.memberList) {
        const members = datas.memberList
        var settingMemList = []
        // memberCount = members.length
        for (let i = 0; i < members.length; i++) {
          tempList = {}
          tempList.userDispMtext = this.$changeText(members[i].userDispMtext)
          tempList.userNameMtext = this.$changeText(members[i].userNameMtext)
          tempList.accessKey = members[i].accessKey
          tempList.accessKind = 'U'
          tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          tempList.shareSeq = members[i].shareSeq
          settingMemList.push(tempList)
        }

        if (this.currentSelectBookType === 'W') {
          if (!this.permissionWGroup.selectedList.memberList) {
            this.permissionWGroup.selectedList.memberList = []
          }
          // this.permissionWGroup.selectedList.memberList = []
          this.permissionWGroup.selectedList.memberList = settingMemList
        } else if (this.currentSelectBookType === 'V') {
          if (!this.permissionVGroup.selectedList.memberList) {
            this.permissionVGroup.selectedList.memberList = []
          }
          // this.permissionVGroup.selectedList.memberList = []
          this.permissionVGroup.selectedList.memberList = settingMemList
        } else if (this.currentSelectBookType === 'R') {
          if (!this.permissionRGroup.selectedList.memberList) {
            this.permissionRGroup.selectedList.memberList = []
          }
          // this.permissionRGroup.selectedList.memberList = []
          this.permissionRGroup.selectedList.memberList = settingMemList
        }
      }
      // console.log('---- setTextPermission -----')
      // console.log(bookCount + ' ' + memberCount)
      // console.log(this.currentSelectBookType)

      // if (this.currentSelectBookType === 'W') {
      //   this.writePermission = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      // } else if (this.currentSelectBookType === 'V') {
      //   this.readPermission = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      // } else if (this.currentSelectBookType === 'R') {
      //   this.commentPermission = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      // }
      this.setTextPermission()
    },
    setSelectedList (datas) {
      // 권한 선택시 실행
      console.log('-------------------------------------')
      this.selectedShareList = []
      var data = datas
      this.selectBookListShowYn = false
      // var bookCount, memberCount
      console.log(datas)
      if (data.bookList) {
        var settingBookList = []
        // bookCount = data.bookList.length
        const books = datas.bookList
        for (var i = 0; i < books.length; i++) {
          var tempList = {}
          // tempList.cabinetNameMtext = this.$changeText(books[i].cabinetNameMtext)
          // tempList.accessKey = books[i].shareSeq
          // tempList.accessKind = 'C'
          // tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          // tempList.shareSeq = books[i].shareSeq
          tempList.cabinetNameMtext = this.$changeText(books[i].cabinetNameMtext)
          tempList.accessKey = books[i].accessKey
          tempList.accessKind = 'C'
          // tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          tempList.cabinetKey = books[i].accessKey
          // mShareItemList[i].cabinetKey = mShareItemList[i].accessKey
          tempList.shareSeq = books[i].shareSeq

          settingBookList.push(tempList)
        }
        if (this.currentSelectBookType === 'select') {
          if (!this.shareGroup.selectedList.bookList) {
            this.shareGroup.selectedList.bookList = []
          }
          this.shareGroup.selectedList.bookList = settingBookList
        } else {
          if (this.currentSelectBookType === 'W') {
            if (!this.permissionWGroup.selectedList.bookList) {
              this.permissionWGroup.selectedList.bookList = []
            }
            this.permissionWGroup.selectedList.bookList = settingBookList
          } else if (this.currentSelectBookType === 'V') {
            if (!this.permissionVGroup.selectedList.bookList) {
              this.permissionVGroup.selectedList.bookList = []
            }
            this.permissionVGroup.selectedList.bookList = settingBookList
          } else if (this.currentSelectBookType === 'R') {
            if (!this.permissionRGroup.selectedList.bookList) {
              this.permissionRGroup.selectedList.bookList = []
            }
            this.permissionRGroup.selectedList.bookList = settingBookList
          }
        }
      }
      if (data.memberList) {
        var settingMemList = []
        // memberCount = data.memberList.length
        for (let i = 0; i < data.memberList.length; i++) {
          tempList = {}
          tempList.userDispMtext = this.$changeText(data.memberList[i].userDispMtext)
          tempList.userNameMtext = this.$changeText(data.memberList[i].userNameMtext)
          tempList.accessKey = data.memberList[i].userKey
          tempList.accessKind = 'U'
          tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          tempList.shareSeq = data.memberList[i].shareSeq
          settingMemList.push(tempList)
        }
        if (this.currentSelectBookType === 'select') {
          if (!this.shareGroup.selectedList.memberList) {
            this.shareGroup.selectedList.memberList = []
          }
          this.shareGroup.selectedList.memberList = settingMemList
        } else {
          if (this.currentSelectBookType === 'W') {
            if (!this.permissionWGroup.selectedList.memberList) {
              this.permissionWGroup.selectedList.memberList = []
            }
            this.permissionWGroup.selectedList.memberList = settingMemList
          } else if (this.currentSelectBookType === 'V') {
            if (!this.permissionVGroup.selectedList.memberList) {
              this.permissionVGroup.selectedList.memberList = []
            }
            this.permissionVGroup.selectedList.memberList = settingMemList
          } else if (this.currentSelectBookType === 'R') {
            if (!this.permissionRGroup.selectedList.memberList) {
              this.permissionRGroup.selectedList.memberList = []
            }
            this.permissionRGroup.selectedList.memberList = settingMemList
          }
        }
      }
      // console.log('---- setTextPermission -----')
      // console.log(bookCount + ' ' + memberCount)
      // console.log(this.currentSelectBookType)
      // if (bookCount === undefined) bookCount = 0
      // if (memberCount === undefined) memberCount = 0
      // if (this.currentSelectBookType === 'select') {
      //   this.selectedReceiver = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      // } else {
      //   if (this.currentSelectBookType === 'W') {
      //     this.writePermission = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      //   } else if (this.currentSelectBookType === 'V') {
      //     this.readPermission = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      //   } else if (this.currentSelectBookType === 'R') {
      //     this.commentPermission = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      //   }
      // }
      this.setTextPermission()
      // this.setTextPermission(bookCount, memberCount)
    },
    // // 작성, 열람, 댓글의 텍스트를 셋팅해준다.
    setTextPermission () {
      console.log('---- setTextPermission -----')
      var sharMem, sharBook, WMem, WBook, VMem, VBook, RMem, RBook
      if (this.shareGroup.selectedList.bookList) { sharBook = this.shareGroup.selectedList.bookList.length !== 0 ? this.shareGroup.selectedList.bookList.length + '개 그룹' : '' } else { sharBook = '' }
      if (this.shareGroup.selectedList.memberList) { sharMem = this.shareGroup.selectedList.memberList.length !== 0 ? this.shareGroup.selectedList.memberList.length + '명' : '' } else { sharMem = '' }

      if (this.permissionWGroup.selectedList.bookList) { WBook = this.permissionWGroup.selectedList.bookList.length !== 0 ? this.permissionWGroup.selectedList.bookList.length + '개 그룹' : '' } else { WBook = '' }
      if (this.permissionWGroup.selectedList.memberList) { WMem = this.permissionWGroup.selectedList.memberList.length !== 0 ? this.permissionWGroup.selectedList.memberList.length + '명' : '' } else { WMem = '' }

      if (this.permissionVGroup.selectedList.bookList) { VBook = this.permissionVGroup.selectedList.bookList.length !== 0 ? this.permissionVGroup.selectedList.bookList.length + '개 그룹' : '' } else { VBook = '' }
      if (this.permissionVGroup.selectedList.memberList) { VMem = this.permissionVGroup.selectedList.memberList.length !== 0 ? this.permissionVGroup.selectedList.memberList.length + '명' : '' } else { VMem = '' }

      if (this.permissionRGroup.selectedList.bookList) { RBook = this.permissionRGroup.selectedList.bookList.length !== 0 ? this.permissionRGroup.selectedList.bookList.length + '개 그룹' : '' } else { RBook = '' }
      if (this.permissionRGroup.selectedList.memberList) { RMem = this.permissionRGroup.selectedList.memberList.length !== 0 ? this.permissionRGroup.selectedList.memberList.length + '명' : '' } else { RMem = '' }

      if (sharBook === '' && sharMem === '') { this.selectedReceiver = '게시판을 공유할 대상을 선택해주세요.' } else {
        this.selectedReceiver = sharBook + (sharBook !== '' ? sharMem !== '' ? ', ' : '' : '') + sharMem + ' 에게 권한 부여 중'
      }

      if (WBook === '' && WMem === '') { this.writePermission = '클릭하여 권한을 설정해주세요.' } else {
        this.writePermission = WBook + (WBook !== '' ? WMem !== '' ? ', ' : '' : '') + WMem + ' 에게 권한 부여 중'
      }

      if (VBook === '' && VMem === '') { this.readPermission = '클릭하여 권한을 설정해주세요.' } else {
        this.readPermission = VBook + (VBook !== '' ? VMem !== '' ? ', ' : '' : '') + VMem + ' 에게 권한 부여 중'
      }

      if (RBook === '' && RMem === '') { this.commentPermission = '클릭하여 권한을 설정해주세요.' } else {
        this.commentPermission = RBook + (RBook !== '' ? RMem !== '' ? ', ' : '' : '') + RMem + ' 에게 권한 부여 중'
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

.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%); color: #FFFFFF; }
.toggleBtn{width: 50%; height: 100%;background-color: #fff; float: left; line-height: 25px;}
.addNewBoardWrap{
  /* width:100% ;
  position: absolute; z-index: 999;
  height: 100vh;
  top: 0;
  right: 0; */

  width:100% ;
  position: absolute; z-index: 999;
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
.inputBoxThema{min-height: 30px; font-size: 16px; border: 1px solid #ccc; border-radius: 5px; padding:0px 10px; width: calc(100% - 130px); float: left; line-height: 30px;white-space: nowrap;}

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
/* 세 번째 토글 */
#toggle3:checked ~ .toggleSwitch {
  background: #6768A7;
}

#toggle3:checked ~ .toggleSwitch .toggleButton {
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
  width: 100%;
  min-height: 45px;
  float: left;
  /* display: flex; */
  align-items: center;
}
.creChanIntroTextWrap{padding: 10px 0; float: left; }
.creChanIntroTextWrap p{font-size: 20px; }
.activeTypeBox{background: #6768a7; color: #fff;}
.activeTypeBox p {color: #fff;}
.selecWriterShow{background: #6768a7 !important; color: #fff;}

/* @media(height:700px){
  .addNewBoardWrap{
    background-color:#ccc;
  }
} */

@media screen and (max-width:350px){
  .jjjPaddingWrap{
    padding: 60px 1rem 9px 1rem !important
  }
  .subItemWrite{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
  .inputBoxThema{
    width: calc(90%);
    margin-left:0 !important;
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

</style>
