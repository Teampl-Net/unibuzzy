<i18n>
  {
    "ko":{
      "COMM_ERR_DATE" : "목표 날짜를 지정해주세요.",
      "COMM_ERR_TAG" : "태그를 선택해주세요.",
      "COMM_ERR_TITLE" :"제목 또는 내용을 작성해주세요.",
      "COMM_ERR_TITLE_COUNT" : "제목은 256자 이내로 작성해주세요.",
      "COMM_ERR_FILL_CONTENT" : "공유하고자 하는 내용을 작성하거나 파일을 첨부해주세요.",
      "COMM_ERR_NO_TITLE": "제목을 작성해주세요."
    },
    "en": {
      "COMM_ERR_DATE" : "Please specify the target date.",
      "COMM_ERR_TAG" : "Please select tag.",
      "COMM_ERR_TITLE" :"Please write title or content.",
      "COMM_ERR_TITLE_COUNT" : "Please write the title within 256 characters.",
      "COMM_ERR_FILL_CONTENT" : "Please write what you want to share or attach a file.",
      "COMM_ERR_NO_TITLE": "Please write title."
    }
  }
</i18n>
<template>
  <div id="layout">
    <header>
      <!-- Popup Title -->
      <p class="commonColor fontBold" style="font-size:20px;">{{ pOptions.purpose }}</p>
      <div class="HeaderbtnWrap">
        <button @click="postContents" class="saveBtn" style="font-size:14px;">
          {{ pContentsData ? $t('COMM_BTN_EDIT2') : $t('COMMON_BTN_SAVE') }}
        </button>
        <!-- <button @click="closePop">Cancel</button> -->
        <button @click="closePop" type="button" class="closeBtn">
          <img
            src="../../assets/images/common/popup_close.png"
            alt="close button"
          />
        </button>
<<<<<<< .mine
||||||| .r2488
      <div class="HeaderbtnWrap">
        <!-- <div @click="postContents" class="saveBtn fontBold"> -->
        <div @click="sendLetter" class="saveBtn fontBold">
          {{ pContentsData ? $t('COMM_BTN_EDIT2') : $t('COMMON_BTN_SAVE') }}
        </div>
        <!-- <button @click="closePop">Cancel</button> -->
=======
      <div class="HeaderbtnWrap">
        <!-- <div @click="postContents" class="saveBtn fontBold"> -->
        <div @click="postContents" class="saveBtn fontBold">
          {{ pContentsData ? $t('COMM_BTN_EDIT2') : $t('COMMON_BTN_SAVE') }}
        </div>
        <!-- <button @click="closePop">Cancel</button> -->
>>>>>>> .r2489
      </div>
    </header>
    <main>
      <form>
        <!-- neccessary post values -->
<<<<<<< .mine
||||||| .r2488
        <!-- TITLE -->
        <fieldset v-if="$route.path === '/todo' || hasTitleYn" id="postTitle">
            <textarea
              id="title"
              type="text"
              :placeholder="this.$t('COMM_MSG_PUT_TITLE')"
              v-model="params.title" @input="countLines"
              class="titleInput"
              :style="{}"
            />
        </fieldset>
        <div class="w100P mtop-05" style="border-bottom:1px solid #EBEBEB;"></div>
        <!-- DATE -->
        <fieldset v-if="pOptions.model === 'mankik'" id="dateSelect">
            <legend>날짜 선택</legend>
            <label for="">{{$t('COMMON_TITLE_DATE')}}</label>
            <div class="dateBoxWrap">
              <input
                v-if="pOptions.model === 'mankik'" type="date"
                id="fromDate"
                v-model="params.workFromDateStr"
                style="min-height:20px;"
              />
              <input id="toDate" type="date" v-model="params.workToDateStr" style="min-height:20px;"/>
            </div>
          </fieldset>
        <div class="w100P mtop-05" style="border-bottom:1px solid #EBEBEB;"></div>
        <!-- RECEIVER -->
=======
        <!-- TITLE -->
        <fieldset v-if="$route.path === '/todo' || hasTitleYn" id="postTitle">
            <textarea
              id="title"
              type="text"
              :placeholder="this.$t('COMM_MSG_PUT_TITLE')"
              v-model="params.title" @input="countLines"
              class="titleInput"
              :style="{}"
            />
        </fieldset>
        <div class="w100P mtop-05" style="border-bottom:1px solid #EBEBEB;"></div>
        <!-- Select Board -->
        <fieldset v-if="contentType === 'BOAR'" id="postTitle">
          <legend>게시판 선택</legend>
            <label for="" style="line-height:30px;">{{$t('COMMON_NAME_BOARD')}}</label>
          <div class="w100P" style="display:flex; align-items:center; gap:0.5rem;">
            <div v-for="(board, index) in propParams.initData" :key="index" @click="selectBoard(board, index)" class="cursorP"  style=" border-radius:10px; padding:0px 10px;" :style="{background: board.picBgPath, border: selectBoardIndex === index ? '2px solid #7678E2' : `2px solid ${board.picBgPath}`}">
              <label class="font14" style="white-space:nowrap;"  :class="{'commonColor selectBoardBorder' : selectBoardIndex === index}" :for="'selectBoardCheckBox'+index">{{this.$changeText(board.cabinetNameMtext)}}</label>
            </div>
          </div>
        </fieldset>
        <div v-if="contentType === 'BOAR'" class="w100P mtop-05" style="border-bottom:1px solid #EBEBEB;"></div>
        <!-- DATE -->
        <fieldset v-if="pOptions.model === 'mankik'" id="dateSelect">
            <legend>날짜 선택</legend>
            <label for="">{{$t('COMMON_TITLE_DATE')}}</label>
            <div class="dateBoxWrap">
              <input
                v-if="pOptions.model === 'mankik'" type="date"
                id="fromDate"
                v-model="params.workFromDateStr"
                style="min-height:20px;"
              />
              <input id="toDate" type="date" v-model="params.workToDateStr" style="min-height:20px;"/>
            </div>
          </fieldset>
        <div class="w100P mtop-05" style="border-bottom:1px solid #EBEBEB;"></div>
        <!-- ACTOR -->
>>>>>>> .r2489
        <fieldset id="neccessaryOptions">
          <legend>기본 정보 설정</legend>
          <fieldset id="postReceivers">
            <div class="selectReceiverBox">
              <legend>받는 사람 지정</legend>
              <label for="">{{ $t('COMMON_TODO_RECEIVER') }}</label>
              <div class="btnWrap">
                <button
                  type="button"
                  @click="selectAllReceivers"
                  :class="{ activeBtn: selectMeYn }"
                  style="font-size: 13px"
                >
                  <img
                    v-if="selectMeYn"
                    src="../../assets/images/common/icon_check_commonColor.svg"
                    alt="check image"
                    class="checkImg"
                  />
                  {{$t('COMMON_TODO_ME')}}
                </button>
                <button
                  type="button"
                  style="font-size: 13px"
                  @click="toggleReceiverSelectPop"
                  :class="{
                    activeBtn:
                      showReceiverSelectList ||
                      (params.actorList.length && !selectMeYn)
                  }"
                >
                  <img
                    v-if="
                      showReceiverSelectList ||
                      (params.actorList.length && !selectMeYn)
                    "
                    src="../../assets/images/common/icon_check_commonColor.svg"
                    alt="check image"
                    class="checkImg"
                  />
                  {{ $t('COMMON_BTN_SELECT') }}
                </button>
              </div>
            </div>
            <!-- target선택 팝업 -->
            <transition name="show_left">
              <SelectTargetPop
                v-if="showReceiverSelectList"
                :pSelectData="receiverList"
                :pSelectedTargetList="params.actorList"
                :pSelectOnlyYn="pSelectOnlyYn"
                @saveTarget="setSelectedTargetList"
                @closeXPop="toggleReceiverSelectPop"
              />
            </transition>
            <!-- 선택된 target -->
            <div
              @click="toggleReceiverSelectPop"
              v-if="params.actorList.length && !selectMeYn"
              class="selectedTargetList"
            >
              <div
                style="
                  width: calc(100% - 40px);
                  max-height: 52px;
                  overflow-y: scroll;
                "
              >
                <div
                  style="
                    width: 100%;
                    display: flex;
                    gap: 1px 10px;
                    flex-wrap: wrap;
                  "
                >
                  <div
                    v-for="target in params.actorList"
                    :key="target.accessKey"
                    class="eachTarget"
                    style="white-space: nowrap"
                  >
                    <img
                      v-if="
                        target.accessKind === 'U'
                      "
                      src="../../assets/images/footer/icon_people.svg"
                      alt="person image"
                    />
                    <img
                      v-else-if="target.accessKind === 'C'"
                      src="../../assets/images/channel/channer_addressBook.svg"
                      alt="address book image"
                    />
                    {{
                      $changeText(target.accessName)
                    }}
                  </div>
                </div>
              </div>
              <div class="plusImgWrap" style="">
                <img
                  class="plusImg"
                  src="../../assets/images/formEditor/icon_formEditPlus.svg"
                  alt="plus image"
                />
              </div>
            </div>
          </fieldset>
          <fieldset id="postCheck">
            <div class="selectReceiverBox">
              <legend>검토자 지정</legend>
              <label for="">{{ $t('COMMON_TODO_REVIEWER') }}</label>
              <div class="btnWrap">
                <button
                  type="button"
                  @click="selectNoCheck"
                  :class="{ activeBtn: !selectCheckYn }"
                  style="font-size: 13px"
                >
                  <img
                    v-if="!selectCheckYn"
                    src="../../assets/images/common/icon_check_commonColor.svg"
                    alt="check image"
                    class="checkImg"
                  />
                  {{ $t('COMMON_TODO_NOT_REVIEW') }}
                </button>
                <button
                  type="button"
                  style="font-size: 13px"
                  @click="toggleCheckSelectPop"
                  :class="{
                    activeBtn:
                    showCheckSelectList ||
                      (params.checkList && params.checkList.length && selectCheckYn)
                  }"
                >
                  <img
                    v-if="
                      showCheckSelectList ||
                      (params.checkList && params.checkList.length && selectCheckYn)
                    "
                    src="../../assets/images/common/icon_check_commonColor.svg"
                    alt="check image"
                    class="checkImg"
                  />
                  {{ $t('COMMON_TODO_REVIEW') }}
                </button>
              </div>
            </div>
            <!-- target선택 팝업 -->
            <transition name="show_left">
              <SelectTargetPop
                v-if="showCheckSelectList"
                :pSelectData="receiverList"
                :pSelectedTargetList="params.checkList"
                :pSelectOnlyYn="pSelectOnlyYn"
                @saveTarget="setSelectedCheckList"
                @closeXPop="toggleCheckSelectPop"
              />
            </transition>
            <!-- 선택된 target -->
            <div
              @click="toggleCheckSelectPop"
              v-if="params.checkList && params.checkList.length && selectCheckYn"
              class="selectedTargetList"
            >
              <div
                style="
                  width: calc(100% - 40px);
                  max-height: 52px;
                  overflow-y: scroll;
                "
              >
                <div
                  style="
                    width: 100%;
                    display: flex;
                    gap: 1px 10px;
                    flex-wrap: wrap;
                  "
                >
                  <div
                    v-for="target in params.checkList"
                    :key="target.accessKey"
                    class="eachTarget"
                    style="white-space: nowrap"
                  >
                    <img
                      v-if="
                        target.accessKind === 'U'
                      "
                      src="../../assets/images/footer/icon_people.svg"
                      alt="person image"
                    />
                    <img
                      v-else-if="target.accessKind === 'C'"
                      src="../../assets/images/channel/channer_addressBook.svg"
                      alt="address book image"
                    />
                    {{
                      $changeText(target.accessName)
                    }}
                  </div>
                </div>
              </div>
              <div class="plusImgWrap" style="">
                <img
                  class="plusImg"
                  src="../../assets/images/formEditor/icon_formEditPlus.svg"
                  alt="plus image"
                />
              </div>
            </div>
          </fieldset>
          <fieldset id="postRefs">
            <div class="selectReceiverBox">
              <legend>참조자 지정</legend>
              <label for="">{{ $t('COMMON_TODO_PUBORPRI') }}</label>
              <div class="btnWrap">
                <button
                  type="button"
                  @click="selectNoRefs"
                  :class="{ activeBtn: !selectRefsYn }"
                  style="font-size: 13px"
                >
                  <img
                    v-if="!selectRefsYn"
                    src="../../assets/images/common/icon_check_commonColor.svg"
                    alt="check image"
                    class="checkImg"
                  />
                  {{ $t('COMMON_TODO_PRIVATE') }}
                </button>
                <button
                  type="button"
                  style="font-size: 13px"
                  @click="toggleRefsSelectPop"
                  :class="{
                    activeBtn:
                    showRefsSelectList ||
                      (params.refList && params.refList.length && selectRefsYn)
                  }"
                >
                  <img
                    v-if="
                      showRefsSelectList ||
                      (params.refList && params.refList.length && selectRefsYn)
                    "
                    src="../../assets/images/common/icon_check_commonColor.svg"
                    alt="check image"
                    class="checkImg"
                  />
                  {{ $t('COMMON_TODO_PUBLIC') }}
                </button>
              </div>
            </div>
            <!-- target선택 팝업 -->
            <transition name="show_left">
              <SelectTargetPop
                v-if="showRefsSelectList"
                :pSelectData="receiverList"
                :pSelectedTargetList="params.refList"
                :pSelectOnlyYn="pSelectOnlyYn"
                @saveTarget="setSelectedRefList"
                @closeXPop="toggleRefsSelectPop"
              />
            </transition>
            <!-- 선택된 target -->
            <div
              @click="toggleRefsSelectPop"
              v-if="params.refList && params.refList.length && selectRefsYn"
              class="selectedTargetList"
            >
              <div
                style="
                  width: calc(100% - 40px);
                  max-height: 52px;
                  overflow-y: scroll;
                "
              >
                <div
                  style="
                    width: 100%;
                    display: flex;
                    gap: 1px 10px;
                    flex-wrap: wrap;
                  "
                >
                  <div
                    v-for="target in params.refList"
                    :key="target.accessKey"
                    class="eachTarget"
                    style="white-space: nowrap"
                  >
                    <img
                      v-if="
                        target.accessKind === 'U'
                      "
                      src="../../assets/images/footer/icon_people.svg"
                      alt="person image"
                    />
                    <img
                      v-else-if="target.accessKind === 'C'"
                      src="../../assets/images/channel/channer_addressBook.svg"
                      alt="address book image"
                    />
                    {{
                      $changeText(target.accessName)
                    }}
                  </div>
                </div>
              </div>
              <div class="plusImgWrap" style="">
                <img
                  class="plusImg"
                  src="../../assets/images/formEditor/icon_formEditPlus.svg"
                  alt="plus image"
                />
              </div>
            </div>
          </fieldset>
          <fieldset
            id="optionToggleBtnWrap"
            v-if="!pContentsData"
            v-show="$route.path !== '/todo'"
          >
            <label for="">옵션</label>
            <div class="btnWrap">
              <button
                type="button"
                @click="toggleAnonymousYn"
                :class="{ activeBtn: params.showCreNameYn }"
              >
                <img
                  v-if="params.showCreNameYn"
                  src="../../assets/images/common/icon_check_commonColor.svg"
                  alt="check image"
                  class="checkImg"
                />
                {{ $t('COMMON_NAME_UNKNOWN') }}
              </button>
              <button
                type="button"
                @click="toggleCommentYn"
                :class="{ activeBtn: params.canReplyYn }"
              >
                <img
                  v-if="params.canReplyYn"
                  src="../../assets/images/common/icon_check_commonColor.svg"
                  alt="check image"
                  class="checkImg"
                />
                {{ $t('COMMON_TODO_COMMENT') }}
              </button>
              <button
                type="button"
                @click="toggleTitleYn"
                :class="{ activeBtn: hasTitleYn }"
              >
                <img
                  v-if="hasTitleYn"
                  src="../../assets/images/common/icon_check_commonColor.svg"
                  alt="check image"
                  class="checkImg"
                />
                {{ $t('COMMON_TITLE_TITLE') }}
              </button>
            </div>
          </fieldset>
          <fieldset v-if="$route.path === '/todo' || hasTitleYn" id="postTitle">
            <label for="">{{ $t('COMMON_TITLE_TITLE') }}</label>
            <textarea
              id="title"
              type="text"
              :placeholder="this.$t('COMM_MSG_PUT_TITLE')"
              v-model="params.title" @input="countLines"
              style="overflow-y:scroll; white-space:wrap; padding:10px 15px 15px;"
              :style="{}"
            />
          </fieldset>
        </fieldset>
        <!-- optional post values -->
        <fieldset id="optionalOptions">
          <legend>선택정 정보 설정</legend>
          <fieldset v-if="pOptions.model === 'mankik'" id="dateSelect">
            <legend>날짜 선택</legend>
            <label for="">{{$t('COMMON_TITLE_DATE')}}</label>
            <div class="dateBoxWrap">
              <input
                v-if="pOptions.model === 'mankik'"
                id="fromDate"
                type="date"
                v-model="params.workFromDateStr"
                style="min-height:20px;"
              />
              <span>~</span>
              <input id="toDate" type="date" v-model="params.workToDateStr" style="min-height:20px;"/>
            </div>
          </fieldset>
          <fieldset v-if="pOptions.model === 'mankik'" id="categoryTag">
            <legend>우선순위 선택</legend>
            <label for="">{{$t('COMMON_TODO_PRIORITY')}}</label>
            <div
              class=""
              style="
                width: calc(100% - 72px);
                display: flex;
                align-items: start;
                gap:0.1rem;
              "
            >
              <div
                class="btnWrap tagBtnWrap"
              >
                <button
                  type="button"
                  @click="changePriority(priority.value)"
                  v-for="priority in priorityList"
                  :key="priority.value"
                  :class="{ activeBtn: priority.value === params.priority }"
                  style="font-size: 13px"
                >
                  <img
                    v-if="priority.value === params.priority"
                    src="../../assets/images/common/icon_check_commonColor.svg"
                    alt="check image"
                    class="checkImg"
                  />
                  {{ priority.dispText }}
                </button>
              </div>
            </div>
          </fieldset>

          <fieldset v-if="pOptions.model === 'mankik'" id="categoryTag">
            <legend>태그 선택</legend>
            <label for="">{{ $t('COMMON_TODO_TAG') }}</label>
<<<<<<< .mine
            <div class="w100P" style="width:calc(100% - 72px); min-height: 2rem; float: left; display:flex; align-items:start; justify-content:space-between;">
              <div :class="{selfTagOpenFlex : mSelfAddTagShowYn}" class="w100P" style=" width: calc(100% - 25px); display: flex; align-items: start; flex-wrap:wrap;">
                <div v-if="mSelfAddTagShowYn" class="w100P" style="display:flex; align-items:center;">
||||||| .r2488
            <!-- :class="{selfTagOpenFlex : mSelfAddTagShowYn}"  -->
            <div class="w100P" style="width:calc(100% - 52px); min-height: 2rem; float: left; display:flex; align-items:start; justify-content:space-between;">
              <div class="w100P" style="display: flex; align-items: start; gap:0.3rem; flex-wrap:wrap; justify-content:space-between;">
                <div
                @click="openSelfAddTag"
                class="openSelfAddTagBtn cursorP"
                :style="{width: mSelfAddTagShowYn ? '20px' : '100%'}"
                style="text-align:left; height:25px;"
                >
                <img :src="require(`@/assets/images/button/Icon_AddTag.png`)" style="width:20px;"/>
                </div>
                <div v-if="mSelfAddTagShowYn" style="width:calc(100% - 30px); display:flex; align-items:center;">
=======
            <!-- :class="{selfTagOpenFlex : mSelfAddTagShowYn}"  -->
            <div class="w100P" style="width:calc(100% - 62px); min-height: 2rem; float: left; display:flex; align-items:start; justify-content:space-between;">
              <div class="w100P" style="display: flex; align-items: start; gap:0.3rem; flex-wrap:wrap; justify-content:space-between;">
                <div
                @click="openSelfAddTag"
                class="openSelfAddTagBtn cursorP"
                :style="{width: mSelfAddTagShowYn ? '20px' : '100%'}"
                style="text-align:left; height:25px;"
                >
                <img :src="require(`@/assets/images/button/Icon_AddTag.png`)" style="width:20px;"/>
                </div>
                <div v-if="mSelfAddTagShowYn" style="width:calc(100% - 30px); display:flex; align-items:center;">
>>>>>>> .r2489
                    <input type="text" v-model="selfAddTag" class="" >
                    <div class="selfAddSaveBtn mleft-03" @click="addSelfTag(selfAddTag)">
                      {{ $t('COMMON_BTN_SAVE') }}
                    </div>
                  </div>
                <div class="btnWrap tagBtnWrap" style="width:auto;">
                  <button
                    type="button"
                    @click="toggleSelectTag(sticker, index)"
                    v-for="(sticker, index) in tagListForDom"
                    :key="sticker.stickerKey"
                    :class="{ activeBtn: sticker.isSelected }"
                    style="font-size: 13px;"
                    class="tagButton"
                  >
                    <img v-if="sticker.isSelected" src="../../assets/images/common/icon_check_commonColor.svg" alt="check image" class="checkImg" />
                    {{ $changeText(sticker.nameMtext) }}
                  </button>
                </div>
              </div>
              <div
                @click="openSelfAddTag"
                class="openSelfAddTagBtn cursorP mleft-03"
                style=""
              >
              {{ mSelfAddTagShowYn===true ? '-' : '+' }}
              </div>
            </div>
          </fieldset>

<<<<<<< .mine
          <fieldset
            v-if="(pOptions.model === 'mankik' || pOptions.model === 'unibuzzy') "
            id="uploadFile"
          >
            <legend>파일 첨부</legend>
            <label for="">{{$t('COMMON_TITLE_FILE')}}</label>
            <TalAttachFile
              @delAttachFile="delAttachFile"
              @setSelectedAttachFileList="setAttachedFile"
              :attachTrueAddFalseList="propAttachFileList"
            />
||||||| .r2488
          <fieldset v-if="pOptions.model === 'mankik'" id="categoryTag" style="height:70px;">
            <legend>우선순위 선택</legend>
            <label for="">{{$t('COMMON_TODO_PRIORITY')}}</label>
            <div class="" style=" width: calc(100% - 52px); text-align:left; position:relative;">
              <div class="tagBtnWrap" style="position:absolute; z-index:3;">
                <select class="selectPriority" id="prioritySelect" v-model="selectedPriority">
                  <option value="01">{{ $t('COMMON_TODO_MID') }}</option>
                  <option value="00">{{ $t('COMMON_TODO_HIGH') }}</option>
                  <option value="02">{{ $t('COMMON_TODO_LOW') }}</option>
                </select>
                  <!-- <button
                    type="button"
                    @click="changePriority(priority.value)"
                    v-for="priority in priorityList"
                    :key="priority.value"
                    :class="{ activeBtn: priority.value === params.priority }"
                    style="font-size: 13px"
                  >
                    <img
                      v-if="priority.value === params.priority"
                      src="../../assets/images/common/icon_check_commonColor.svg"
                      alt="check image"
                      class="checkImg"
                    />
                    {{ priority.dispText }}
                  </button> -->
              </div>
            <div class="w100P" style="position:absolute; top:0; right:0;">
              <TalAttachFile
                @delAttachFile="delAttachFile"
                @setSelectedAttachFileList="setAttachedFile"
                :attachTrueAddFalseList="propAttachFileList"
              />
            </div>
            </div>
=======
          <fieldset v-if="pOptions.model === 'mankik'" id="categoryTag" style="height:70px;">
            <legend>중요도 선택</legend>
            <label for="">{{$t('COMMON_TODO_PRIORITY')}}</label>
            <div class="" style=" width: calc(100% - 62px); text-align:left; position:relative;">
              <div class="tagBtnWrap" style="position:absolute; z-index:3;">
                <select class="selectPriority" id="prioritySelect" v-model="selectedPriority">
                  <option value="01">{{ $t('COMMON_TODO_MID') }}</option>
                  <option value="00">{{ $t('COMMON_TODO_HIGH') }}</option>
                  <option value="02">{{ $t('COMMON_TODO_LOW') }}</option>
                </select>
              </div>
            <div class="w100P" style="position:absolute; top:0; right:0;">
              <TalAttachFile
                @delAttachFile="delAttachFile"
                @setSelectedAttachFileList="setAttachedFile"
                :attachTrueAddFalseList="propAttachFileList"
              />
            </div>
            </div>
>>>>>>> .r2489
          </fieldset>
          <fieldset style="height: 60%">
            <legend>작성 내용</legend>
            <TalFormEditor
              ref="complexEditor"
              @changeUploadList="changeUploadList"
              @setParamInnerHtml="setParamInnerHtml"
              @postToolBox="postToolBox"
            />
<<<<<<< .mine
||||||| .r2488
            <div class="msgArea" id="msgBox"></div>

=======
            <div v-show="previewContentsShowYn" class="msgArea" id="msgBox"></div>

>>>>>>> .r2489
          </fieldset>
        </fieldset>
      </form>
    </main>
    <commonConfirmPop v-if="failPopYn" @no="failPopYn = false" confirmType="timeout" :confirmText="errorText" />
  </div>
  <gToolBox
    :propTools="mToolBoxOptions"
    @changeTextStyle="changeFormEditorStyle"
    style="z-index: 15 !important"
  />
</template>

<script>
// system settings
import { defineComponent, ref, reactive, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import dayjs from 'dayjs'

// components
import SelectTargetPop from './selectTarget/SelectTargetPop.vue'
import TalFormEditor from '../unit/formEditor/Tal_formEditor.vue'
import TalAttachFile from '../unit/formEditor/Tal_attachFile.vue'
import commonConfirmPop from '../popup/confirmPop/Tal_commonConfirmPop.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  props: [
    'pOptions',
    'pUserInfo',
    'pGetTagListFn',
    'pGetReceiverList',
    'pPostContentsFn',
    'pSelectOnlyYn',
    'pClosePop',
    // edit mode props
    'pContentsData'
  ],
  components: {
    SelectTargetPop,
    TalFormEditor,
    TalAttachFile,
    commonConfirmPop
  },
  data () {
    return {
      popId: '',
<<<<<<< .mine
      mSelfAddTagShowYn: false
||||||| .r2488
      mSelfAddTagShowYn: false,
      openTargetsYn: false,
      //
      confirmText: '',
      progressShowYn: false,
      uploadFileList: [],
      okPopYn: false,
      allRecvYn: true,
      showCreNameYn: true, // 작성자 명 공개
      canReplyYn: true, // 댓글 허용
      titleShowYn: false, // 제목 공개 허용
      writePushTitle: '',
      // receiverList: { memberList: [], bookList: [] },
      bodyString: '',
      requestPushYn: false,
      addFalseList: [],
      propFormData: [],
      editorType: 'text',
      complexOkYn: false,
      selectedReceiverList: [],
      receiverText: '',
      checkPopYn: false,
      modiYn: false,
      selectBoardList: [],
      selectBoardYn: false,
      selectBoardIndex: null,
      selectBoardCabinetKey: null,
      writeBoardPlaceHolder: '',
      cabBlindYn: false,
      gCertiPopShowYn: false,
      mCanWriteYn: true,
      isMobile: /Mobi/i.test(window.navigator.userAgent),
      mIsDraggedYn: false,
      enterTarget: null,
      mSelectedTagList: [],
      mTagListForDom: []
=======
      mSelfAddTagShowYn: false,
      openTargetsYn: false,
      //
      confirmText: '',
      progressShowYn: false,
      uploadFileList: [],
      okPopYn: false,
      allRecvYn: true,
      showCreNameYn: true, // 작성자 명 공개
      canReplyYn: true, // 댓글 허용
      titleShowYn: false, // 제목 공개 허용
      writePushTitle: '',
      // receiverList: { memberList: [], bookList: [] },
      bodyString: '',
      requestPushYn: false,
      addFalseList: [],
      propFormData: [],
      editorType: 'text',
      complexOkYn: false,
      selectedReceiverList: [],
      receiverText: '',
      checkPopYn: false,
      selectBoardList: [],
      selectBoardYn: false,
      // selectBoardIndex: null,
      selectBoardCabinetKey: null,
      // writeBoardPlaceHolder: '',
      // gCertiPopShowYn: false,
      // mCanWriteYn: true,
      isMobile: /Mobi/i.test(window.navigator.userAgent),
      mIsDraggedYn: false,
      enterTarget: null,
      mSelectedTagList: [],
      mTagListForDom: []
>>>>>>> .r2489
    }
  },
  created () {
<<<<<<< .mine
||||||| .r2488
    if (!this.popUpType) {
      this.contentType = 'TODO'
      console.log('this.contentType', this.contentType)
    } else if (this.popUpType) {
      this.contentType = this.popUpType
      console.log('this.contentType', this.contentType)
    }
=======
    console.log('props.propData / props.propParams', this.propData, this.propParams)
    if (!this.popUpType) {
      this.contentType = 'TODO'
    } else if (this.popUpType) {
      this.contentType = this.popUpType
      console.log('this.contentType', this.contentType)
    }
>>>>>>> .r2489
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'writeContents' + history.length
    // console.log(history)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  mounted () {
    if (document.querySelector('#eContentsWrap')) {
      document.querySelector('#eContentsWrap').addEventListener('paste', (e) => {
        var items = (e.clipboardData || e.originalEvent.clipboardData).items

        for (const i of items) {
          var item = i
          if (item.type.indexOf('image') !== -1) {
          /* this.editorType = 'complex' */
            var file = item.getAsFile()
            this.handleImageUpload(file)
          // console.log(file);
          // uploadFile(file);
          } else {}
        }
        e.preventDefault()
        var textData = (e.originalEvent || e).clipboardData.getData('Text')
        document.execCommand('insertHTML', false, textData)
      })
    }
<<<<<<< .mine
||||||| .r2488

    // var screenSize = document.querySelector('#alimWrap')
    var textArea = document.querySelector('#textMsgBoxPush')
    if (textArea) {
      textArea.addEventListener('focus', () => {
        document.querySelector('#alimWrap').style.height = this.screenInnerHeight
        document.querySelector('#alimWrap').style.width = this.screenInnerWidth
      })
      textArea.addEventListener('blur', () => {
        document.querySelector('#alimWrap').style.height = this.screenInnerHeight
        document.querySelector('#alimWrap').style.width = this.screenInnerWidth
      })
    }
    if (this.answerRequsetYn) {
      this.$refs.textAreaRequestTitle.style.backgroundColor = '#00000010'
      this.$refs.textAreaRequestTitle.readOnly = true
    }

    if (this.contentType === 'BOAR') {
      var temp = document.createElement('div')
      temp.innerHTML = this.bodyString
      if (temp.getElementsByClassName('formCard').length > 0) {
        // this.$refs.activeBar.switchtab(1)
        var innerHtml = ''
        var newArr = []
        var formC = temp.getElementsByClassName('formCard')
        // eslint-disable-next-line no-new-object
        var jsonObj = new Object()
        var imgYn = true
        for (var i = 0; i < formC.length; i++) {
          // eslint-disable-next-line no-new-object
          jsonObj = new Object()
          imgYn = true
          innerHtml += formC[i].outerHTML
          jsonObj.innerHtml = formC[i].innerHTML
          jsonObj.type = 'image'
          jsonObj.targetKey = i - 1
          for (var c = 0; c < formC[i].classList.length; c++) {
            // // eslint-disable-next-line no-debugger
            // debugger
            if (formC[i].classList[c] === 'formText') {
              jsonObj.innerHtml = this.$findATagDelete(formC[i].innerHTML)
              jsonObj.type = 'text'
              imgYn = false
              break
            } else if (formC[i].classList[c] === 'formLine') {
              jsonObj.type = 'line'
              imgYn = false
            } else if (formC[i].classList[c] === 'formDot') {
              jsonObj.type = 'dot'
              imgYn = false
            } else if (formC[i].classList[c] === 'formBlock') {
              jsonObj.type = 'block'
              imgYn = false
            }
          }
          if (imgYn) {
            jsonObj.pSrc = formC[i].querySelector('img').src
            jsonObj.pFilekey = formC[i].querySelector('img').attributes.filekey.value
          }
          newArr.push(jsonObj)
        }
        this.propFormData = newArr
        this.$refs.complexEditor.setFormCard(this.propFormData)
        document.getElementById('msgBox').innerHTML = ''
        document.getElementById('msgBox').innerHTML = innerHtml
        this.addFalseList = document.querySelectorAll('.msgArea .formCard .addFalse')
      }
      if (this.propData && this.propData.selectBoardYn === true) {
        this.selectBoardYn = true
        if (!this.propData.initData) {
          this.getTeamMenuList()
        } else {
          // initData <- selectBoard에서도 구분하고 있음 수정 시 같이 봐야함!
          this.selectBoardList = this.propData.initData
          if (this.selectBoardList.length > 0) {
            this.selectBoard(this.selectBoardList[0], 0)
          }
        }
      }
    }
=======

    // var screenSize = document.querySelector('#alimWrap')
    var textArea = document.querySelector('#textMsgBoxPush')
    if (textArea) {
      textArea.addEventListener('focus', () => {
        document.querySelector('#alimWrap').style.height = this.screenInnerHeight
        document.querySelector('#alimWrap').style.width = this.screenInnerWidth
      })
      textArea.addEventListener('blur', () => {
        document.querySelector('#alimWrap').style.height = this.screenInnerHeight
        document.querySelector('#alimWrap').style.width = this.screenInnerWidth
      })
    }
    if (this.answerRequsetYn) {
      this.$refs.textAreaRequestTitle.style.backgroundColor = '#00000010'
      this.$refs.textAreaRequestTitle.readOnly = true
    }

    if (this.contentType === 'BOAR') {
      var temp = document.createElement('div')
      temp.innerHTML = this.bodyString
      if (temp.getElementsByClassName('formCard').length > 0) {
        // this.$refs.activeBar.switchtab(1)
        var innerHtml = ''
        var newArr = []
        var formC = temp.getElementsByClassName('formCard')
        // eslint-disable-next-line no-new-object
        var jsonObj = new Object()
        var imgYn = true
        for (var i = 0; i < formC.length; i++) {
          // eslint-disable-next-line no-new-object
          jsonObj = new Object()
          imgYn = true
          innerHtml += formC[i].outerHTML
          jsonObj.innerHtml = formC[i].innerHTML
          jsonObj.type = 'image'
          jsonObj.targetKey = i - 1
          for (var c = 0; c < formC[i].classList.length; c++) {
            // // eslint-disable-next-line no-debugger
            // debugger
            if (formC[i].classList[c] === 'formText') {
              jsonObj.innerHtml = this.$findATagDelete(formC[i].innerHTML)
              jsonObj.type = 'text'
              imgYn = false
              break
            } else if (formC[i].classList[c] === 'formLine') {
              jsonObj.type = 'line'
              imgYn = false
            } else if (formC[i].classList[c] === 'formDot') {
              jsonObj.type = 'dot'
              imgYn = false
            } else if (formC[i].classList[c] === 'formBlock') {
              jsonObj.type = 'block'
              imgYn = false
            }
          }
          if (imgYn) {
            jsonObj.pSrc = formC[i].querySelector('img').src
            jsonObj.pFilekey = formC[i].querySelector('img').attributes.filekey.value
          }
          newArr.push(jsonObj)
        }
        this.propFormData = newArr
        this.$refs.complexEditor.setFormCard(this.propFormData)
        if (document.getElementById('msgBox') && document.getElementById('msgBox').innerHTML) {
          document.getElementById('msgBox').innerHTML = innerHtml
          document.getElementById('msgBox').innerHTML = ''
        }
        this.addFalseList = document.querySelectorAll('.msgArea .formCard .addFalse')
      }
      if (this.propData && this.propData.selectBoardYn === true) {
        this.selectBoardYn = true
        if (!this.propData.initData) {
          // this.getTeamMenuList()
        } else {
          // initData <- selectBoard에서도 구분하고 있음 수정 시 같이 봐야함!
          this.selectBoardList = this.propParams.initData
          if (this.selectBoardList.length > 0) {
            this.selectBoard(this.selectBoardList[0], 0)
          }
        }
      }
    }
>>>>>>> .r2489
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
      const history = this.$store.getters['D_HISTORY/hStack']
      if (this.popId === history[history.length - 1]) {
        this.closePop()
      }
    }
  },
  methods: {
<<<<<<< .mine
    async handleImageUpload (selectFile) {
||||||| .r2488
    //
    findUrlChangeAtag (inputText) {
      const rplcdPttrn1 = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig
      var rplcdTxt = inputText.replace(rplcdPttrn1, '<a href="$1" target="_blank">$1</a>')
      return rplcdTxt
    },
    onDragenter (event) {
      // class 넣기
      this.mIsDraggedYn = true
      this.enterTarget = event.target
    },
    onDragleave (event) {
      // class 삭제
      if (this.enterTarget === event.target) {
        event.stopPropagation()
        event.preventDefault()
        this.mIsDraggedYn = false
      }
    },
    onDragover (event) {
      // 드롭을 허용하도록 prevetDefault() 호출
      event.preventDefault()
    },
    onDrop (event) {
      event.preventDefault()
      this.mIsDraggedYn = false
      const files = event.dataTransfer.files
      const fileRef = this.$refs.attachFileRef
      if (fileRef) {
        fileRef.onDrop(files)
      }
    },
    horizontalScroll (e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 10
      })
    },
    goSavePhonePop () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'changePhone'
      this.gCertiPopShowYn = false
      this.openPop(param)
      // this.openPop(param)
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    },
    async getCabinetDetail (cabinetKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.currentTeamKey)
      paramMap.set('currentTeamKey', this.propData.currentTeamKey)
      paramMap.set('cabinetKey', cabinetKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('shareType', 'W')
      paramMap.set('userKey', this.GE_USER.userKey)
      var response = await this.$commonAxiosFunction({
        // url: '/sUniB/tp.getCabinetDetail',
        url: '/sUniB/tp.getCabinetListForMyShareType',
        param: Object.fromEntries(paramMap)
      }, true)
      var mCabinet = response.data.mCabinet
      if (mCabinet && mCabinet.fileYn) {
        this.fileYn = mCabinet.fileYn
      }
      return mCabinet
    },
    async selectBoard (data, index) {
      // eslint-disable-next-line no-debugger
      debugger
      this.selectBoardIndex = index
      this.mCanWriteYn = true
      var mCabinet
      if (!this.propData.initData) {
        mCabinet = await this.getCabinetDetail(data.cabinetKey)
        var mCabinetShare = mCabinet.mShareItemList
        if (mCabinetShare[0]) {
          if (mCabinetShare[0].shareType) {
            this.selectBoardCabinetKey = mCabinetShare[0].cabinetKey
            this.cabinetName = data.cabinetNameMtext
            this.writeBoardPlaceHolder = ''
          } else {
            this.selectBoardCabinetKey = null
            this.writeBoardPlaceHolder = this.$t('FORM_MSG_NOPERM')
            return
          }
        } else {
          this.selectBoardCabinetKey = null
          this.writeBoardPlaceHolder = this.$t('FORM_MSG_NOPERM')
          return
        }
      } else {
        mCabinet = data
        if (this.contentType === 'BOAR' && (!this.GE_USER.certiDate) && (mCabinet.blindYn === 1 || mCabinet.blindYn === true)) {

          // 익명게시판일 떄
          this.mCanWriteYn = false
          this.gCertiPopShowYn = true
          return
        }
        this.selectBoardCabinetKey = mCabinet.cabinetKey
        this.cabinetName = mCabinet.cabinetNameMtext
      }
      // var cardList = document.querySelectorAll('.commonFormCard')
      if (mCabinet.guideFullStr) {
        this.$refs.complexEditor.addFormCard('text', this.decodeContents(mCabinet.guideFullStr))
      }
      if (mCabinet.blindYn) {
        this.cabBlindYn = true
      }
    },
    async getTeamMenuList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.currentTeamKey)
      paramMap.set('currentTeamKey', this.propData.currentTeamKey || this.propData.creTeamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('shareType', 'W')
      paramMap.set('userKey', this.GE_USER.userKey)
      // console.log(paramMap)
      await this.$getTeamMenuList(paramMap).then((result) => {
        this.selectBoardList = result
        if (this.selectBoardList.length > 0) {
          // this.$nextTick(() => {
          // document.getElementById('selectBoardCheckBox0').checked = true
          console.log(this.selectBoardList[0])
          this.selectBoard(this.selectBoardList[0], 0)
          // })
        }
      })
      // console.log(result)
    },
    setSelectedList (obj) {
      // var mList = []
      // var bList = []
      // var myMList = []
      // var myBList = []
      console.log('2!@#!@#!@@@@@2222')
      console.log(obj)
      // if (this.receiverList.memberList !== undefined && this.receiverList.memberList !== null && this.receiverList.memberList.length > 0) {
      //   myMList = this.receiverList.memberList
      // }
      // if (this.receiverList.bookList !== undefined && this.receiverList.bookList !== null && this.receiverList.bookList.length > 0) {
      //   myBList = this.receiverList.bookList
      // }
      this.receiverList = obj
      // if (obj.bookList && obj.bookList.length > 0) {
      //   this.receiverList.bookList = obh
      // }
      console.log('-----------------------------------')
      console.log(this.receiverList)
      this.receiverList.list = []
      for (let i = 0; i < this.receiverList.memberList.length; i++) {
        var temp = {}
        temp.type = 'USER'
        temp.name = this.$changeText(this.receiverList.memberList[i].userDispMtext)
        this.receiverList.list.push(temp)
      }
      for (let i = 0; i < this.receiverList.bookList.length; i++) {
        temp = {}
        temp.type = 'BOOK'
        temp.memberYn = this.receiverList.bookList[i].memberYn
        if (!this.receiverList.bookList[i].memberYn) {
          temp.name = this.$changeText(this.receiverList.bookList[i].cabinetNameMtext)
        } else {
          temp.name = this.$changeText(this.receiverList.bookList[i].nameMtext)
        }
        this.receiverList.list.push(temp)
      }
      this.list = []
      this.selectedReceiverList = []
      // this.receiverTotalNum = myMList.length + mList.length + myBList.length + bList.length
      // this.receiverText = ''
      this.setRecvText()
    },
    setRecvText () {
      var list = this.receiverList.list
      var uCount = 0
      var bCount = 0
      console.log(list)
      for (var i = 0; i < list.length; i++) {
        if (list[i].type === 'USER') uCount += 1
        if (list[i].type === 'BOOK') bCount += 1
      }
      var a = (bCount > 0) ? this.$t('COMMON_NAME_ADDRBOOK') + bCount : ''
      var b = (bCount > 0 && uCount > 0) ? ', ' : ''
      var c = (uCount > 0) ? this.$t('COMMON_TITLE_USER') + uCount : ''
      this.receiverText = a + b + c
    },

    onReady (editor) {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      )
    },

    encodeUTF8 (str) { //  특수문자도 포함할 경우 encodeURIComponent(str)를 사용.
      return encodeURI(str)
    },
    openPop (param) {
      this.$emit('openPop', param)
    },
    setParamInnerText (innerText) {
      if (innerText !== undefined && innerText !== null && innerText !== '') {
        document.getElementById('msgBox').innerHTML = ''
        document.getElementById('msgBox').innerHTML = innerText
        this.editorType = 'text'
        this.formEditorShowYn = false
        this.propFormData = innerText
      }
    },
    settingAlim () {
      console.log('settingAlim 들어왔다')
      var temp = document.createElement('div')
      temp.innerHTML = this.bodyString
      var innerHtml = ''
      var newArr = []
      var formC = temp.getElementsByClassName('formCard')
      // eslint-disable-next-line no-new-object
      var jsonObj = new Object()
      var imgYn = true
      for (var i = 0; i < formC.length; i++) {
        // eslint-disable-next-line no-new-object
        jsonObj = new Object()
        imgYn = true
        innerHtml += formC[i].outerHTML
        jsonObj.innerHtml = formC[i].innerHTML
        jsonObj.type = 'image'
        jsonObj.targetKey = i
        for (var c = 0; c < formC[i].classList.length; c++) {
          // // eslint-disable-next-line no-debugger
          // debugger
          if (formC[i].classList[c] === 'formText') {
            jsonObj.innerHtml = this.$findATagDelete(formC[i].innerHTML)
            jsonObj.type = 'text'
            imgYn = false
            break
          } else if (formC[i].classList[c] === 'formLine') {
            jsonObj.type = 'line'
            imgYn = false
          } else if (formC[i].classList[c] === 'formDot') {
            jsonObj.type = 'dot'
            imgYn = false
          } else if (formC[i].classList[c] === 'formBlock') {
            jsonObj.type = 'block'
            imgYn = false
          }
        }
        if (imgYn) {
          jsonObj.pSrc = formC[i].querySelector('img').src
          jsonObj.pFilekey = formC[i].querySelector('img').attributes.filekey.value
        }
        newArr.push(jsonObj)
      }
      if (formC && formC.length === 0) {
        var firstSettingDiv = document.createElement('div')
        firstSettingDiv.classList.add('formText')
        firstSettingDiv.classList.add('editableContent')
        firstSettingDiv.classList.add('formCardTextid')
        firstSettingDiv.classList.add('formCard')
        firstSettingDiv.attributes.formidx = 0
        firstSettingDiv.attributes.creTeamKey = this.propData.currentTeamKey || this.propData.creTeamKey
        firstSettingDiv.id = 'formEditText'
        firstSettingDiv.attributes.contentEditable = false
        firstSettingDiv.style.padding = '0px 20px'
        firstSettingDiv.style.display = 'inline-block'
        firstSettingDiv.style.width = '100%'
        firstSettingDiv.style.borderRight = 'rgb(204, 204, 204)'
        firstSettingDiv.style.wordBreak = 'break-all'
        firstSettingDiv.innerHTML = this.bodyString
        jsonObj.innerHtml = this.$findATagDelete(firstSettingDiv.innerHTML)
        jsonObj.type = 'text'
        imgYn = false
        newArr.push(jsonObj)
      }
      this.propFormData = newArr
      this.$refs.complexEditor.setFormCard(this.propFormData)
      document.getElementById('msgBox').innerHTML = ''
      document.getElementById('msgBox').innerHTML = innerHtml
      // this.viewTab = 'complex'
      this.addFalseList = document.querySelectorAll('.msgArea .formCard .addFalse')
      // console.log('this.propData.parentAttachTrueFileList')
      // // console.log(this.propData.parentAttachTrueFileList)
      // this.formEditorShowYn = true
    },
    // async sendBoard () {
    //   var param = {}
    //   this.sendLoadingYn = true
    //   this.checkPopYn = false
    //   try {
    //     if (this.uploadFileList.length > 0) {
    //       this.progressShowYn = true
    //       // await this.uploadFile()
    //       await this.formSubmit()
    //       setTimeout(() => {
    //         this.progressShowYn = false
    //       }, 2000)
    //     }
    //     param.attachFileList = await this.setAttachFileList()
    //     var innerHtml = ''
    //     param.bodyHtmlYn = true
    //     var formList = document.querySelectorAll('#msgBox .formCard')
    //     if (formList) {
    //       for (var f = 0; f < formList.length; f++) {
    //         formList[f].contentEditable = false
    //         // formlist중 Text component만 찾아서 http로 시작하는 url에 a태그 넣어주기
    //         if (formList[f].id === 'formEditText') {
    //           if (formList[f].innerText === '') {
    //             formList[f].remove()
    //           } else {
    //             formList[f].classList.remove('formEditorTextPadding')
    //             innerHtml = formList[f].innerHTML
    //             formList[f].innerHTML = this.$findUrlChangeAtag(innerHtml)
    //           }
    //         }
    //       }
    //       param.getBodyHtmlYn = true
    //     }
    //     innerHtml = document.getElementById('msgBox').innerHTML

    //     param.bodyFullStr = innerHtml.replaceAll('width: calc(100% - 30px);', 'width: 100%;')
    //     // param.bodyFullStr = innerHtml.replaceAll('formEditorTextPadding', '')
    //     param.jobkindId = 'BOAR'
    //     param.prioirty = this.mSelectedPriorityforDom.value
    //     param.stickerList = this.mSelectedTagList
    //     if (this.selectBoardYn === true) {
    //       param.cabinetKey = this.selectBoardCabinetKey
    //       param.actorList = []
    //     } else {
    //       param.cabinetKey = this.propData.cabinetKey
    //       param.actorList = this.propData.actorList
    //     }
    //     param.onlyManagerYn = false
    //     if (param.cabinetKey === this.$DALIM_MUN_CAB_KEY) {
    //       param.onlyManagerYn = true
    //     }
    //     param.creTeamKey = this.propData.currentTeamKey || this.propData.creTeamKey
    //     if (this.propData.attachMfilekey) {
    //       param.attachMfilekey = this.propData.attachMfilekey
    //     }
    //     if (this.propData.nonMemYn) {
    //       param.creUserName = this.nonMemUserName
    //       param.creUserKey = 0
    //     } else {
    //       param.creUserName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
    //       param.creUserKey = this.GE_USER.userKey
    //     }
    //     param.cabinetName = this.propData.cabinetNameMtext || this.cabinetName

    //     if (this.writePushTitle.length > 256) {
    //       this.errorText = this.$t('COMM_TITLE_COUNT')
    //       this.failPopYn = true
    //       return
    //     }
    //     param.title = this.writePushTitle
    //     param.showCreNameYn = true

    //     if (this.cabBlindYn) {
    //       param.showCreNameYn = false
    //     }
    //     if (this.modiYn) {
    //       param.contentsKey = this.propData.modiContentsKey
    //     } else {
    //       param.workStatCodeKey = 40
    //     }
    //     var result = await this.$saveContents(param)
    //     if (result.result === true) {
    //       var newParam = {}
    //       newParam.contentsKey = result.contents.contentsKey
    //       newParam.jobkindId = 'BOAR'
    //       await this.$getContentsList(newParam).then(newReslute => {
    //         this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', newReslute.content)
    //       })

    //       var newP = {}
    //       newP.targetKey = result.contents.contentsKey
    //       newP.teamKey = result.contents.creTeamKey
    //       newP.contentsKey = result.contents.contentsKey
    //       newP.targetType = 'contentsDetail'
    //       newP.cabinetNameMtext = result.contents.cabinetName
    //       newP.popHeaderText = result.contents.cabinetName
    //       newP.jobkindId = 'BOAR'
    //       newP.value = this.propData
    //       newP.cabinetKey = result.contents.cabinetKey
    //       this.progressShowYn = false
    //       if (!this.modiYn && !this.UseAnOtherYn) {
    //         this.$emit('successWrite', newP)
    //       }
    //     }
    //     // this.$showToastPop('게시되었습니다.')
    //     if (!this.modiYn) {
    //       this.$showToastPop(this.$t('FORM_MSG_SUCCESS_POST'))
    //     } else {
    //       this.$showToastPop(this.$t('FORM_MSG_SUCCESS_EDIT'))
    //     }
    //   } catch (error) {
    //     this.$showToastPop(this.$t('FORM_MSG_FAIL_EDIT'))
    //     console.error(error)
    //   } finally {
    //     this.closeXPop(true)
    //     this.sendLoadingYn = false
    //   }
    // },

    // 선택한 수신리스트를 서비스에 보내 전 데이터 전처리
    settingRecvList () {
      var shareItemBookObject = {}
      if (this.receiverList.bookList) {
        for (let i = 0; i < this.receiverList.bookList.length; i++) {
          var selectedBookList = this.receiverList.bookList[i]
          if (!selectedBookList.memberYn) {
            shareItemBookObject = {}
            shareItemBookObject.accessKind = 'C'
            shareItemBookObject.accessKey = selectedBookList.cabinetKey
          } else {
            shareItemBookObject = {}
            shareItemBookObject.accessKind = 'M'
            shareItemBookObject.accessKey = selectedBookList.memberTypeKey
          }
          /* this.list.push(this.receiverList.bookList[i].cabinetKey) */
          // this.receiverText += ', ' + selectedBookList.cabinetNameMtext
          // this.list.push(shareItemBookObject)
          // this.receiverText += selectedBookList.cabinetNameMtext + ', '
          this.selectedReceiverList.push(shareItemBookObject)
        }
        /* this.selectedReceiverList.push(this.receiverList.bookList[i].cabinetKey) */
      }
      // var shareItemMemberList = []
      // eslint-disable-next-line no-new-object
      var shareItemMemberObject = {}
      if (this.receiverList.memberList) {
        for (let i = 0; i < this.receiverList.memberList.length; i++) {
          var selectedMemberList = this.receiverList.memberList[i]
          shareItemMemberObject = {}
          shareItemMemberObject.accessKind = 'U'
          shareItemMemberObject.accessKey = selectedMemberList.userKey
          /* this.selectedReceiverList.push(this.receiverList.bookList[i].cabinetKey) */
          // this.receiverText += this.$changeText(selectedMemberList.userDispMtext || selectedMemberList.userNameMtext) + ', '
          this.selectedReceiverList.push(shareItemMemberObject)
        }
      }
    },
    async openPushReceiverSelect () {
      var param = {}
      param.targetType = 'selectBookList'
      param.targetKey = this.propParams.targetKey
      param.teamKey = this.propParams.targetKey
      param.teamNameMtext = this.propParams.teamNameMtext
      var selectListParamMap = new Map()
      selectListParamMap.set('teamKey', this.propParams.targetKey)
      param.param = selectListParamMap
      var initData = await this.$getGPopData(param)
      param.initData = initData
      var selectedList = this.receiverList
      param.pSelectedList = selectedList

      this.$emit('openPop', param)
      // this.receiverPopYn = true
    },
    async handleImageUpload (file) {
      this.selectFile = null
=======
    //
    findUrlChangeAtag (inputText) {
      const rplcdPttrn1 = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig
      var rplcdTxt = inputText.replace(rplcdPttrn1, '<a href="$1" target="_blank">$1</a>')
      return rplcdTxt
    },
    onDragenter (event) {
      // class 넣기
      this.mIsDraggedYn = true
      this.enterTarget = event.target
    },
    onDragleave (event) {
      // class 삭제
      if (this.enterTarget === event.target) {
        event.stopPropagation()
        event.preventDefault()
        this.mIsDraggedYn = false
      }
    },
    onDragover (event) {
      // 드롭을 허용하도록 prevetDefault() 호출
      event.preventDefault()
    },
    onDrop (event) {
      event.preventDefault()
      this.mIsDraggedYn = false
      const files = event.dataTransfer.files
      const fileRef = this.$refs.attachFileRef
      if (fileRef) {
        fileRef.onDrop(files)
      }
    },
    horizontalScroll (e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 10
      })
    },
    goSavePhonePop () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'changePhone'
      this.gCertiPopShowYn = false
      this.openPop(param)
      // this.openPop(param)
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    },
    async getCabinetDetail (cabinetKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.currentTeamKey)
      paramMap.set('currentTeamKey', this.propData.currentTeamKey)
      paramMap.set('cabinetKey', cabinetKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('shareType', 'W')
      paramMap.set('userKey', this.GE_USER.userKey)
      var response = await this.$commonAxiosFunction({
        // url: '/sUniB/tp.getCabinetDetail',
        url: '/sUniB/tp.getCabinetListForMyShareType',
        param: Object.fromEntries(paramMap)
      }, true)
      var mCabinet = response.data.mCabinet
      if (mCabinet && mCabinet.fileYn) {
        this.fileYn = mCabinet.fileYn
      }
      return mCabinet
    },
    async selectBoards (data, index) {
      // eslint-disable-next-line no-debugger
      debugger
      console.log('selected board', data, index)
      this.selectBoardIndex = index
      this.mCanWriteYn = true
      var mCabinet
      if (!this.propData.initData) {
        mCabinet = await this.getCabinetDetail(data.cabinetKey)
        var mCabinetShare = mCabinet.mShareItemList
        if (mCabinetShare[0]) {
          if (mCabinetShare[0].shareType) {
            this.selectBoardCabinetKey = mCabinetShare[0].cabinetKey
            this.cabinetName = data.cabinetNameMtext
            this.writeBoardPlaceHolder = ''
          } else {
            this.selectBoardCabinetKey = null
            this.writeBoardPlaceHolder = this.$t('FORM_MSG_NOPERM')
            return
          }
        } else {
          this.selectBoardCabinetKey = null
          this.writeBoardPlaceHolder = this.$t('FORM_MSG_NOPERM')
          return
        }
      } else {
        mCabinet = data
        if (this.contentType === 'BOAR' && (!this.$store.getters['D_USER/GE_USER'].certiDate) && (mCabinet.blindYn === 1 || mCabinet.blindYn === true)) {
          // 익명게시판일 떄
          this.mCanWriteYn = false
          this.gCertiPopShowYn = true
          return
        }
        this.selectBoardCabinetKey = mCabinet.cabinetKey
        this.cabinetName = mCabinet.cabinetNameMtext
        console.log('data === ', this.selectBoardCabinetKey, this.cabinetName)
      }
      if (mCabinet.guideFullStr) {
        this.$refs.complexEditor.addFormCard('text', this.decodeContents(mCabinet.guideFullStr))
      }
      if (mCabinet.blindYn) {
        this.cabBlindYn = true
      }
    },
    async getTeamMenuList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.currentTeamKey)
      paramMap.set('currentTeamKey', this.propData.currentTeamKey || this.propData.creTeamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('shareType', 'W')
      paramMap.set('userKey', this.GE_USER.userKey)
      // console.log(paramMap)
      await this.$getTeamMenuList(paramMap).then((result) => {
        this.selectBoardList = result
        if (this.selectBoardList.length > 0) {
          // this.$nextTick(() => {
          // document.getElementById('selectBoardCheckBox0').checked = true
          console.log(this.selectBoardList[0])
          this.selectBoard(this.selectBoardList[0], 0)
          // })
        }
      })
      // console.log(result)
    },
    setSelectedList (obj) {
      console.log('2!@#!@#!@@@@@2222')
      console.log(obj)
      this.receiverList = obj
      console.log('-----------------------------------')
      console.log(this.receiverList)
      this.receiverList.list = []
      for (let i = 0; i < this.receiverList.memberList.length; i++) {
        var temp = {}
        temp.type = 'USER'
        temp.name = this.$changeText(this.receiverList.memberList[i].userDispMtext)
        this.receiverList.list.push(temp)
      }
      for (let i = 0; i < this.receiverList.bookList.length; i++) {
        temp = {}
        temp.type = 'BOOK'
        temp.memberYn = this.receiverList.bookList[i].memberYn
        if (!this.receiverList.bookList[i].memberYn) {
          temp.name = this.$changeText(this.receiverList.bookList[i].cabinetNameMtext)
        } else {
          temp.name = this.$changeText(this.receiverList.bookList[i].nameMtext)
        }
        this.receiverList.list.push(temp)
      }
      this.list = []
      this.selectedReceiverList = []
      // this.receiverTotalNum = myMList.length + mList.length + myBList.length + bList.length
      // this.receiverText = ''
      this.setRecvText()
    },
    setRecvText () {
      var list = this.receiverList.list
      var uCount = 0
      var bCount = 0
      console.log(list)
      for (var i = 0; i < list.length; i++) {
        if (list[i].type === 'USER') uCount += 1
        if (list[i].type === 'BOOK') bCount += 1
      }
      var a = (bCount > 0) ? this.$t('COMMON_NAME_ADDRBOOK') + bCount : ''
      var b = (bCount > 0 && uCount > 0) ? ', ' : ''
      var c = (uCount > 0) ? this.$t('COMMON_TITLE_USER') + uCount : ''
      this.receiverText = a + b + c
    },

    onReady (editor) {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      )
    },

    encodeUTF8 (str) { //  특수문자도 포함할 경우 encodeURIComponent(str)를 사용.
      return encodeURI(str)
    },
    openPop (param) {
      this.$emit('openPop', param)
    },
    setParamInnerText (innerText) {
      if (innerText !== undefined && innerText !== null && innerText !== '') {
        document.getElementById('msgBox').innerHTML = ''
        document.getElementById('msgBox').innerHTML = innerText
        this.editorType = 'text'
        this.formEditorShowYn = false
        this.propFormData = innerText
      }
    },
    settingAlim () {
      console.log('settingAlim 들어왔다')
      var temp = document.createElement('div')
      temp.innerHTML = this.bodyString
      var innerHtml = ''
      var newArr = []
      var formC = temp.getElementsByClassName('formCard')
      // eslint-disable-next-line no-new-object
      var jsonObj = new Object()
      var imgYn = true
      for (var i = 0; i < formC.length; i++) {
        // eslint-disable-next-line no-new-object
        jsonObj = new Object()
        imgYn = true
        innerHtml += formC[i].outerHTML
        jsonObj.innerHtml = formC[i].innerHTML
        jsonObj.type = 'image'
        jsonObj.targetKey = i
        for (var c = 0; c < formC[i].classList.length; c++) {
          // // eslint-disable-next-line no-debugger
          // debugger
          if (formC[i].classList[c] === 'formText') {
            jsonObj.innerHtml = this.$findATagDelete(formC[i].innerHTML)
            jsonObj.type = 'text'
            imgYn = false
            break
          } else if (formC[i].classList[c] === 'formLine') {
            jsonObj.type = 'line'
            imgYn = false
          } else if (formC[i].classList[c] === 'formDot') {
            jsonObj.type = 'dot'
            imgYn = false
          } else if (formC[i].classList[c] === 'formBlock') {
            jsonObj.type = 'block'
            imgYn = false
          }
        }
        if (imgYn) {
          jsonObj.pSrc = formC[i].querySelector('img').src
          jsonObj.pFilekey = formC[i].querySelector('img').attributes.filekey.value
        }
        newArr.push(jsonObj)
      }
      if (formC && formC.length === 0) {
        var firstSettingDiv = document.createElement('div')
        firstSettingDiv.classList.add('formText')
        firstSettingDiv.classList.add('editableContent')
        firstSettingDiv.classList.add('formCardTextid')
        firstSettingDiv.classList.add('formCard')
        firstSettingDiv.attributes.formidx = 0
        firstSettingDiv.attributes.creTeamKey = this.propData.currentTeamKey || this.propData.creTeamKey
        firstSettingDiv.id = 'formEditText'
        firstSettingDiv.attributes.contentEditable = false
        firstSettingDiv.style.padding = '0px 20px'
        firstSettingDiv.style.display = 'inline-block'
        firstSettingDiv.style.width = '100%'
        firstSettingDiv.style.borderRight = 'rgb(204, 204, 204)'
        firstSettingDiv.style.wordBreak = 'break-all'
        firstSettingDiv.innerHTML = this.bodyString
        jsonObj.innerHtml = this.$findATagDelete(firstSettingDiv.innerHTML)
        jsonObj.type = 'text'
        imgYn = false
        newArr.push(jsonObj)
      }
      this.propFormData = newArr
      this.$refs.complexEditor.setFormCard(this.propFormData)
      document.getElementById('msgBox').innerHTML = ''
      document.getElementById('msgBox').innerHTML = innerHtml
      // this.viewTab = 'complex'
      this.addFalseList = document.querySelectorAll('.msgArea .formCard .addFalse')
      // console.log('this.propData.parentAttachTrueFileList')
      // // console.log(this.propData.parentAttachTrueFileList)
      // this.formEditorShowYn = true
    },

    // 선택한 수신리스트를 서비스에 보내 전 데이터 전처리
    settingRecvList () {
      var shareItemBookObject = {}
      if (this.receiverList.bookList) {
        for (let i = 0; i < this.receiverList.bookList.length; i++) {
          var selectedBookList = this.receiverList.bookList[i]
          if (!selectedBookList.memberYn) {
            shareItemBookObject = {}
            shareItemBookObject.accessKind = 'C'
            shareItemBookObject.accessKey = selectedBookList.cabinetKey
          } else {
            shareItemBookObject = {}
            shareItemBookObject.accessKind = 'M'
            shareItemBookObject.accessKey = selectedBookList.memberTypeKey
          }
          /* this.list.push(this.receiverList.bookList[i].cabinetKey) */
          // this.receiverText += ', ' + selectedBookList.cabinetNameMtext
          // this.list.push(shareItemBookObject)
          // this.receiverText += selectedBookList.cabinetNameMtext + ', '
          this.selectedReceiverList.push(shareItemBookObject)
        }
        /* this.selectedReceiverList.push(this.receiverList.bookList[i].cabinetKey) */
      }
      // var shareItemMemberList = []
      // eslint-disable-next-line no-new-object
      var shareItemMemberObject = {}
      if (this.receiverList.memberList) {
        for (let i = 0; i < this.receiverList.memberList.length; i++) {
          var selectedMemberList = this.receiverList.memberList[i]
          shareItemMemberObject = {}
          shareItemMemberObject.accessKind = 'U'
          shareItemMemberObject.accessKey = selectedMemberList.userKey
          /* this.selectedReceiverList.push(this.receiverList.bookList[i].cabinetKey) */
          // this.receiverText += this.$changeText(selectedMemberList.userDispMtext || selectedMemberList.userNameMtext) + ', '
          this.selectedReceiverList.push(shareItemMemberObject)
        }
      }
    },
    async openPushReceiverSelect () {
      var param = {}
      param.targetType = 'selectBookList'
      param.targetKey = this.propParams.targetKey
      param.teamKey = this.propParams.targetKey
      param.teamNameMtext = this.propParams.teamNameMtext
      var selectListParamMap = new Map()
      selectListParamMap.set('teamKey', this.propParams.targetKey)
      param.param = selectListParamMap
      var initData = await this.$getGPopData(param)
      param.initData = initData
      var selectedList = this.receiverList
      param.pSelectedList = selectedList

      this.$emit('openPop', param)
      // this.receiverPopYn = true
    },
    async handleImageUpload (file) {
      this.selectFile = null
>>>>>>> .r2489
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1500,
        useWebWorker: true
      }

      let fileExt = selectFile.name.substring(
        selectFile.name.lastIndexOf('.') + 1
      )
      // 소문자로 변환
      fileExt = fileExt.toLowerCase()
      if (
        ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
      ) {
        console.log(selectFile)
        console.log('originalFile instanceof Blob', selectFile instanceof Blob) // true
        console.log(`originalFile size ${selectFile.size / 1024 / 1024} MB`)

        try {
          // eslint-disable-next-line no-undef
          var compressedFile = await this.$imageCompression(selectFile, options)
          console.log(compressedFile)
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob) // true
          var src = null
          if (compressedFile instanceof Blob) {
            src = await this.$imageCompression.getDataUrlFromFile(compressedFile)
            const decodImg = atob(src.split(',')[1])
            const array = []
            for (let i = 0; i < decodImg.length; i++) {
              array.push(decodImg.charCodeAt(i))
            }
            const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
            var newFile = new File([Bfile], compressedFile.name)
          } else {
            src = await this.$imageCompression.getDataUrlFromFile(compressedFile)
          }

          // var image = new Image()
          // image.src = src

          // image.onload = function () {
          //   // Resize image
          //   console.log(image.width + ' // ' + image.height)
          // }

          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
          // console.log(`compressedFile preview url: ${src}`) // smaller than maxSizeMB
          // this.changeUploadList({ previewImgUrl: src, addYn: true, file: newFile })
          this.$refs.complexEditor.addFormCard('image', src, true, true)
          this.$refs.complexEditor.successImgPreview({ targetKey: document.querySelectorAll('#eContentsWrap .formDiv').length - 1, selectFileList: { previewImgUrl: src, addYn: true, file: newFile, targetKey: newFile.name }, originalType: 'image' })
          /* await uploadToServer(compressedFile) */ // write your own logic
        } catch (error) {
          console.log(error)
        }
      }
    },
<<<<<<< .mine
||||||| .r2488

    async previewFile (file) {
      let fileExt = file.name.substring(
        file.name.lastIndexOf('.') + 1
      )
      // 소문자로 변환
      fileExt = fileExt.toLowerCase()
      if (
        ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
      ) {
        // FileReader 를 활용하여 파일을 읽는다
        var reader = new FileReader()
        var thisthis = this
        reader.onload = e => {
          var image = new Image()
          image.onload = async function () {
            var result = await thisthis.$saveFileSize(image, file)
            thisthis.$refs.complexEditor.addFormCard('image', result.path, true)
            thisthis.$refs.complexEditor.successImgPreview({ targetKey: document.querySelectorAll('#eContentsWrap .formDiv').length - 1, selectFileList: { previewImgUrl: result.path, addYn: true, file: result.file, targetKey: result.file.name }, originalType: 'image' })
            // this.$emit('updateImgForm', this.previewImgUrl)
            // editorImgResize1(canvas.toDataURL('image/png', 0.8))
            // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
          }
          image.onerror = function () {

          }
          image.src = e.target.result
          // this.previewImgUrl = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    async formSubmit () {
      // eslint-disable-next-line no-debugger
      debugger
      if (this.uploadFileList.length > 0) {
        var iList = document.querySelectorAll('.formCard .addTrue')
        // Form 필드 생성
        // if (!this.selectFileList.length) return
        var form = new FormData()
        var thisthis = this
        for (var i = 0; i < this.uploadFileList.length; i++) {
          // var selFile = this.selectFileList[i].file
          form = new FormData()
          // Here we create unique key 'files[i]' in our response dictBase64.decode(data)
          // thisthis.uploadFileList[i].previewImgUrl = Base64.decode(thisthis.uploadFileList[i].previewImgUrl.replaceAll('data:image/png;base64,', ''))
          const oldFile = thisthis.uploadFileList[i].file
          const newFile = new File([oldFile], oldFile.name.normalize('NFC'), { type: oldFile.type })
          form.append('files[0]', newFile)
          await this.$axios
          // 파일서버 fileServer fileserver FileServer Fileserver
            .post('https://mzoin.com/fileServer/tp.uploadFile', form,
              /* {
                onUploadProgress: (progressEvent) => {
                  var percentage = (progressEvent.loaded * 100) / progressEvent.total
                  thisthis.uploadFileList[i].percentage = Math.round(percentage)
                }
              }, */
              {
                headers: {
                  'Content-Type': 'multipart/form-data; charset: UTF-8;'
                }
              })
            .then(res => {
              console.log(res)
              if (res.data.length > 0) {
                var path = res.data[0].domainPath + res.data[0].pathMtext
                this.uploadFileList[i].successSave = true
                this.uploadFileList[i].filePath = path
                this.uploadFileList[i].fileSizeKb = res.data[0].fileSizeKb
                this.uploadFileList[i].fileKey = res.data[0].fileKey
              }
            })
            .catch(error => {
              this.response = error
              this.isUploading = false
            })
        }
        // console.log(this.uploadFileList)
        iList = document.querySelectorAll('.msgArea .formCard .addTrue')
        if (iList.length > 0) {
          for (var s = 0; s < this.uploadFileList.length; s++) {
            var uploadFile = this.uploadFileList[s]
            if (uploadFile.successSave) {
              for (var il = 0; il < iList.length; il++) {
                // console.log('여기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                // console.log(uploadFile[0].previewImgUrl)
                // console.log(iList[il].src)
                // console.log('여기!!!!!!!!!끝!!!!!!!!!!!!!!!!!!!!!!')
                if (!uploadFile.attachYn && (iList[il].attributes.filekey === undefined || iList[il].attributes.filekey === null || iList[il].attributes.filekey === '')) {
                  if (iList[il].src === uploadFile.previewImgUrl) {
                    iList[il].src = uploadFile.filePath
                    // eslint-disable-next-line no-unused-vars
                    iList[il].setAttribute('fileKey', uploadFile.fileKey)
                    iList[il].setAttribute('fileSizeKb', uploadFile.fileSizeKb)
                    iList[il].classList.remove('addTrue')
                    iList[il].classList.add('addFalse')
                    break
                  } else {

                  }
                }
              }
            } else {
              this.uploadFileList.splice(s, 1)
            }
          }
        }
      } else {
        this.$showToastPop(this.$t('COMMON_MSG_NOFILE'))
      }
      return true
    },
    setSelectedAttachFileList (sFile) {
      if (sFile.addYn === true) {
        this.uploadFileList.push(sFile)
      }
      // console.log(this.uploadFileList)
    },

    // 원래데이터
    closeXPop (reloadYn) {
      console.log('??')
      if (this.pClosePop) {
        this.pClosePop()
      }
      console.log('/>>>')
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$emit('closeXPop')
    },
    toggleTargetsArea () {
      this.openTargetsYn = !this.openTargetsYn
    },
    // async handleImageUpload (selectFile) {
    //   const options = {
    //     maxSizeMB: 1,
    //     maxWidthOrHeight: 1500,
    //     useWebWorker: true
    //   }

    //   let fileExt = selectFile.name.substring(
    //     selectFile.name.lastIndexOf('.') + 1
    //   )
    //   // 소문자로 변환
    //   fileExt = fileExt.toLowerCase()
    //   if (
    //     ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
    //   ) {
    //     console.log(selectFile)
    //     console.log('originalFile instanceof Blob', selectFile instanceof Blob) // true
    //     console.log(`originalFile size ${selectFile.size / 1024 / 1024} MB`)

    //     try {
    //       // eslint-disable-next-line no-undef
    //       var compressedFile = await this.$imageCompression(selectFile, options)
    //       console.log(compressedFile)
    //       console.log('compressedFile instanceof Blob', compressedFile instanceof Blob) // true
    //       var src = null
    //       if (compressedFile instanceof Blob) {
    //         src = await this.$imageCompression.getDataUrlFromFile(compressedFile)
    //         const decodImg = atob(src.split(',')[1])
    //         const array = []
    //         for (let i = 0; i < decodImg.length; i++) {
    //           array.push(decodImg.charCodeAt(i))
    //         }
    //         const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
    //         var newFile = new File([Bfile], compressedFile.name)
    //       } else {
    //         src = await this.$imageCompression.getDataUrlFromFile(compressedFile)
    //       }

    //       // var image = new Image()
    //       // image.src = src

    //       // image.onload = function () {
    //       //   // Resize image
    //       //   console.log(image.width + ' // ' + image.height)
    //       // }

    //       console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
    //       // console.log(`compressedFile preview url: ${src}`) // smaller than maxSizeMB
    //       // this.changeUploadList({ previewImgUrl: src, addYn: true, file: newFile })
    //       this.$refs.complexEditor.addFormCard('image', src, true, true)
    //       this.$refs.complexEditor.successImgPreview({ targetKey: document.querySelectorAll('#eContentsWrap .formDiv').length - 1, selectFileList: { previewImgUrl: src, addYn: true, file: newFile, targetKey: newFile.name }, originalType: 'image' })
    //       /* await uploadToServer(compressedFile) */ // write your own logic
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    // },
=======

    async previewFile (file) {
      let fileExt = file.name.substring(
        file.name.lastIndexOf('.') + 1
      )
      // 소문자로 변환
      fileExt = fileExt.toLowerCase()
      if (
        ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
      ) {
        // FileReader 를 활용하여 파일을 읽는다
        var reader = new FileReader()
        var thisthis = this
        reader.onload = e => {
          var image = new Image()
          image.onload = async function () {
            var result = await thisthis.$saveFileSize(image, file)
            thisthis.$refs.complexEditor.addFormCard('image', result.path, true)
            thisthis.$refs.complexEditor.successImgPreview({ targetKey: document.querySelectorAll('#eContentsWrap .formDiv').length - 1, selectFileList: { previewImgUrl: result.path, addYn: true, file: result.file, targetKey: result.file.name }, originalType: 'image' })
            // this.$emit('updateImgForm', this.previewImgUrl)
            // editorImgResize1(canvas.toDataURL('image/png', 0.8))
            // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
          }
          image.onerror = function () {

          }
          image.src = e.target.result
          // this.previewImgUrl = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    async formSubmit () {
      // eslint-disable-next-line no-debugger
      debugger
      if (this.uploadFileList.length > 0) {
        var iList = document.querySelectorAll('.formCard .addTrue')
        // Form 필드 생성
        // if (!this.selectFileList.length) return
        var form = new FormData()
        var thisthis = this
        for (var i = 0; i < this.uploadFileList.length; i++) {
          // var selFile = this.selectFileList[i].file
          form = new FormData()
          // Here we create unique key 'files[i]' in our response dictBase64.decode(data)
          // thisthis.uploadFileList[i].previewImgUrl = Base64.decode(thisthis.uploadFileList[i].previewImgUrl.replaceAll('data:image/png;base64,', ''))
          const oldFile = thisthis.uploadFileList[i].file
          const newFile = new File([oldFile], oldFile.name.normalize('NFC'), { type: oldFile.type })
          form.append('files[0]', newFile)
          await this.$axios
          // 파일서버 fileServer fileserver FileServer Fileserver
            .post('https://mzoin.com/fileServer/tp.uploadFile', form,
              /* {
                onUploadProgress: (progressEvent) => {
                  var percentage = (progressEvent.loaded * 100) / progressEvent.total
                  thisthis.uploadFileList[i].percentage = Math.round(percentage)
                }
              }, */
              {
                headers: {
                  'Content-Type': 'multipart/form-data; charset: UTF-8;'
                }
              })
            .then(res => {
              console.log(res)
              if (res.data.length > 0) {
                var path = res.data[0].domainPath + res.data[0].pathMtext
                this.uploadFileList[i].successSave = true
                this.uploadFileList[i].filePath = path
                this.uploadFileList[i].fileSizeKb = res.data[0].fileSizeKb
                this.uploadFileList[i].fileKey = res.data[0].fileKey
              }
            })
            .catch(error => {
              this.response = error
              this.isUploading = false
            })
        }
        // console.log(this.uploadFileList)
        iList = document.querySelectorAll('.msgArea .formCard .addTrue')
        if (iList.length > 0) {
          for (var s = 0; s < this.uploadFileList.length; s++) {
            var uploadFile = this.uploadFileList[s]
            if (uploadFile.successSave) {
              for (var il = 0; il < iList.length; il++) {
                // console.log('여기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                // console.log(uploadFile[0].previewImgUrl)
                // console.log(iList[il].src)
                // console.log('여기!!!!!!!!!끝!!!!!!!!!!!!!!!!!!!!!!')
                if (!uploadFile.attachYn && (iList[il].attributes.filekey === undefined || iList[il].attributes.filekey === null || iList[il].attributes.filekey === '')) {
                  if (iList[il].src === uploadFile.previewImgUrl) {
                    iList[il].src = uploadFile.filePath
                    // eslint-disable-next-line no-unused-vars
                    iList[il].setAttribute('fileKey', uploadFile.fileKey)
                    iList[il].setAttribute('fileSizeKb', uploadFile.fileSizeKb)
                    iList[il].classList.remove('addTrue')
                    iList[il].classList.add('addFalse')
                    break
                  } else {

                  }
                }
              }
            } else {
              this.uploadFileList.splice(s, 1)
            }
          }
        }
      } else {
        this.$showToastPop(this.$t('COMMON_MSG_NOFILE'))
      }
      return true
    },
    setSelectedAttachFileList (sFile) {
      if (sFile.addYn === true) {
        this.uploadFileList.push(sFile)
      }
      // console.log(this.uploadFileList)
    },

    // 원래데이터
    closeXPop (reloadYn) {
      if (this.pClosePop) {
        this.pClosePop()
      }
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$emit('closeXPop', true)
    },
    toggleTargetsArea () {
      this.openTargetsYn = !this.openTargetsYn
    },
>>>>>>> .r2489
    openSelfAddTag () {
      this.mSelfAddTagShowYn = !this.mSelfAddTagShowYn
    },
    getMonthDate (date) {
      var format = 'MM/DD'
      return this.$dayjs(date).add(9, 'hour').format(format)
    },
    closePop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$checkDeleteHistory('selectTargetPop')
      if (this.pClosePop) {
        this.pClosePop()
      }
    }
  },
  setup (props) {
    const store = useStore()
    const failPopYn = ref(false)
    const errorText = ref('')
    // submit params 세팅
    const params = reactive({
      title: '',
      actorList: [],
      checkList: [],
      refList: [],
      attachMfilekey: '',
      workToDateStr: '',
      workFromDateStr: null,
      nowDateStr: dayjs(new Date()).format('YYYY-MM-DD'),
      bodyFullStr: '',
      stickerList: [],
      attachFileList: [],
      showCreNameYn: false,
      workStatCreUserName: '',
      canReplyYn: true,
      priority: '01',
      mLoadingYn: false,
      mSelfTag: '',
      lineCount: 0,
      selectBoardCabinetKey: 0
    })

    // 게시판 선택
    var selectBoardIndex = ref(0)
    var mCanWriteYn = reactive(false)
    var writeBoardPlaceHolder = reactive('')
    var gCertiPopShowYn = reactive(false)
    var cabinetName = reactive('')

    const selectBoard = async (data, index) => {
      // eslint-disable-next-line no-debugger
      debugger
      selectBoardIndex.value = index
      mCanWriteYn = true
      var mCabinet
      if (!props.propData.initData) {
        mCabinet = await this.getCabinetDetail(data.cabinetKey)
        var mCabinetShare = mCabinet.mShareItemList
        if (mCabinetShare[0]) {
          if (mCabinetShare[0].shareType) {
            params.selectBoardCabinetKey = mCabinetShare[0].cabinetKey
            cabinetName = data.cabinetNameMtext
            writeBoardPlaceHolder = ''
          } else {
            params.selectBoardCabinetKey = null
            writeBoardPlaceHolder = this.$t('FORM_MSG_NOPERM')
            return
          }
        } else {
          params.selectBoardCabinetKey = null
          writeBoardPlaceHolder = this.$t('FORM_MSG_NOPERM')
          return
        }
      } else {
        mCabinet = data
        if (contentType.value === 'BOAR' && (!store.getters['D_USER/GE_USER'].certiDate) && (mCabinet.blindYn === 1 || mCabinet.blindYn === true)) {
          // 익명게시판일 떄
          mCanWriteYn = false
          gCertiPopShowYn = true
          return
        }
        params.selectBoardCabinetKey = mCabinet.cabinetKey
        cabinetName = mCabinet.cabinetNameMtext
      }
      if (mCabinet.guideFullStr) {
        this.$refs.complexEditor.addFormCard('text', this.decodeContents(mCabinet.guideFullStr))
      }
      if (mCabinet.blindYn) {
        cabBlindYn = true
      }
    }

    // 제목 입력 란 높이 수정
    const countLines = () => {
      const textarea = document.querySelector('textarea')
      textarea.style.minHeight = '45px'
      textarea.style.maxHeight = '90px'
      if (textarea.scrollHeight > 95) {
        textarea.style.height = textarea.scrollHeight + 'px'
      }
    }

    // ------------------- 기본값 설정
    let receiverList = reactive([])
    if (props.pGetReceiverList) {
      receiverList = props.pGetReceiverList()
    }
    let stickerList = reactive([])
    if (props.pGetTagListFn) {
      stickerList = props.pGetTagListFn()
      console.log('stickerList', stickerList)
    }

    var gOldFromDate = null
    var gOldToDate = null

    // ------------------- edit 관련 함수
    // * 주소록(타겟) 이름 값만 추출
    const propsTargetNameEditing = (text) => {
      let changeTxt = ''
      if (text) {
        changeTxt = text
        let indexOf = text.indexOf('KO$^$')

        if (indexOf === -1) {
          indexOf = text.indexOf('EN$^$')
          if (indexOf === -1) {
            return changeTxt
          } else {
            const returnMap = new Map()
            const splitMtext = text.split('$#$')
            // split if ~> $$가 없다면?
            for (let i = 0; i < splitMtext.length; i++) {
              const splitMtextDetail = splitMtext[i].split('$^$')
              // split if ~> $$가 없다면?
              returnMap.set(splitMtextDetail[0], splitMtextDetail[1])
            }
            changeTxt = returnMap.get('EN')
          }
        } else {
          const returnMap = new Map()
          const splitMtext = text.split('$#$')
          // split if ~> $$가 없다면?
          for (let i = 0; i < splitMtext.length; i++) {
            const splitMtextDetail = splitMtext[i].split('$^$')
            // split if ~> $$가 없다면?
            returnMap.set(splitMtextDetail[0], splitMtextDetail[1])
          }
          changeTxt = returnMap.get('KO')
        }
      }
      return changeTxt
    }

    // * bodyFullStr decoding 함수
    const setBodyLength = (str, completeYn) => {
      if (!str) return
      // eslint-disable-next-line no-undef
      str = Base64.decode(str)
      str.replace('contenteditable= true', '')
      str = str.replaceAll('<pre', '<div')
      str = str.replaceAll('</pre', '</div')
      if (completeYn) {
        str = str.replaceAll(
          'formCard formText ',
          'formCard formText completeWork '
        )
      }
      return str
    }

    // * 편집 데이터로 formCard생성하기
    const replaceTargetInChild = (stringHTML) => {
      const parser = new DOMParser()
      const parsedHTML = parser.parseFromString(stringHTML, 'text/html')

      // 기존 코드 활용해서 formCard삽입
      var temp = document.createElement('div')
      temp.innerHTML = stringHTML
      // var innerHtml = ''
      var newArr = []
      var formC = temp.getElementsByClassName('formCard')
      // eslint-disable-next-line no-new-object
      var jsonObj = new Object()
      var imgYn = true
      for (var i = 0; i < formC.length; i++) {
        // eslint-disable-next-line no-new-object
        jsonObj = new Object()
        imgYn = true
        // innerHtml += formC[i].outerHTML
        jsonObj.innerHtml = formC[i].innerHTML
        jsonObj.type = 'image'
        jsonObj.targetKey = i
        for (var c = 0; c < formC[i].classList.length; c++) {
          // // eslint-disable-next-line no-debugger
          // debugger
          if (formC[i].classList[c] === 'formText') {
            // jsonObj.innerHtml = this.$findATagDelete(formC[i].innerHTML)
            jsonObj.type = 'text'
            imgYn = false
            break
          } else if (formC[i].classList[c] === 'formLine') {
            jsonObj.type = 'line'
            imgYn = false
          } else if (formC[i].classList[c] === 'formDot') {
            jsonObj.type = 'dot'
            imgYn = false
          } else if (formC[i].classList[c] === 'formBlock') {
            jsonObj.type = 'block'
            imgYn = false
          }
        }
        if (imgYn) {
          jsonObj.pSrc = formC[i].querySelector('img').src
          jsonObj.pFilekey =
            formC[i].querySelector('img').attributes.filekey.value
        }
        newArr.push(jsonObj)
      }
      if (formC && formC.length === 0) {
        var firstSettingDiv = document.createElement('div')
        firstSettingDiv.classList.add('formText')
        firstSettingDiv.classList.add('editableContent')
        firstSettingDiv.classList.add('formCardTextid')
        firstSettingDiv.classList.add('formCard')
        firstSettingDiv.attributes.formidx = 0
        firstSettingDiv.attributes.creTeamKey = 0
        firstSettingDiv.id = 'formEditText'
        firstSettingDiv.attributes.contentEditable = false
        firstSettingDiv.style.padding = '0px 20px'
        firstSettingDiv.style.display = 'inline-block'
        firstSettingDiv.style.width = '100%'
        firstSettingDiv.style.borderRight = 'rgb(204, 204, 204)'
        firstSettingDiv.style.wordBreak = 'break-all'
        firstSettingDiv.innerHTML = parsedHTML.body
        // jsonObj.innerHtml = this.$findATagDelete(firstSettingDiv.innerHTML)
        jsonObj.type = 'text'
        imgYn = false
        newArr.push(jsonObj)
      }
      complexEditor.value.setFormCard(newArr)

      // ************************************ [수정] 이미 있는 파일 리스트 따로 보관하고 있어야 함
      // this.addFalseList = document.querySelectorAll('.dragCompp .formCard .addFalse')
    }
    // --------------------------------------------------------------

    // 첨부파일 관련 리스트
    const addFalseAttachFalseFileList = reactive([])
    const addFalseAttachTrueFileList = []
    const propAttachFileList = reactive([])
    // ------------------- DOM 생성 후 실행될 로직
    onMounted(() => {
      // fromDate
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const currentDate = `${year}-${month}-${day}`
      const fromDateInput = document.getElementById('fromDate')
      const toDateInput = document.getElementById('fromDate')
      if (fromDateInput) {
        params.workFromDateStr = currentDate
      }
      if (toDateInput) {
        params.workToDateStr = currentDate
      }
      gOldFromDate = currentDate
      gOldToDate = currentDate

      const route = useRoute()

      if (route.path === '/todo') {
        hasTitleYn.value = true
      }
      // >---- 편집 상태일 때 세팅 ----<
      if (props.pContentsData) {
        // --- 수정일때, attachMfilekey 데이터 연결
        if (props.pContentsData.attachMfilekey) {
          params.attachMfilekey = props.pContentsData.attachMfilekey
        }
        // --- title 데이터 연결
        params.title = props.pContentsData.title
        // --- 기간 데이터 연결
        params.workFromDateStr = props.pContentsData.workFromDate
        params.workToDateStr = props.pContentsData.workToDate

        if (params.title) {
          hasTitleYn.value = true
        }
        // 선택된 주소록(target) 데이터 연결

        const format = 'YYYY-MM-DD'
        // --- 날짜 데이터 연결
        if (props.pContentsData.workFromDate) {
          params.workFromDateStr = dayjs(props.pContentsData.workFromDate).add(9, 'hour').format(format)
          console.log(params.workFromDateStr)
          const fromDateInput = document.getElementById('fromDate')
          if (fromDateInput) {
            fromDateInput.value = params.workFromDateStr
          }
        }
        if (props.pContentsData.workToDate) {
          params.workToDateStr = dayjs(props.pContentsData.workToDate).add(9, 'hour').format(format)
          const toDateInput = document.getElementById('toDate')
          if (toDateInput) {
            toDateInput.value = params.workToDateStr
          }
        }
        // 선택된 주소록(target) 데이터 연결

        params.actorList.length = 0
        let addMeYn = false
        params.refList.length = 0
        params.checkList.length = 0

        for (const editingTarget of props.pContentsData.actorList) {
          // params.actorList.length = 0
          if (editingTarget.accessKind === 'U' && editingTarget.accessKey === store.getters['D_USER/GE_USER'].userKey) {
            addMeYn = true
          }
          console.log(editingTarget)
          const actorObj = {
            accessKey: editingTarget.accessKey,
            contentsKey: editingTarget.contentsKey,
            accessKind: editingTarget.accessKind
          }
          if (editingTarget.accessKind === 'U') {
            actorObj.iconPath = editingTarget.domainPath + editingTarget.pathMtext
            actorObj.accessName = editingTarget.userDispMtext
            actorObj.userKey = editingTarget.userKey
            actorObj.actType = editingTarget.actType
          } else if (editingTarget.accessKind === 'C') {
            actorObj.iconPath = require('@/assets/images/editChan/icon_addressBook.svg')
            actorObj.accessName = editingTarget.cabinetNameMtext
            actorObj.cabinetKey = editingTarget.accessKey
            actorObj.actType = editingTarget.actType
          }

          if (editingTarget.actType === 'RV') {
            params.actorList.push(actorObj)
          } else if (editingTarget.actType === 'RF') {
            params.refList.push(actorObj)
          } else if (editingTarget.actType === 'CK') {
            if (editingTarget.accessKind === 'U' && editingTarget.accessKey === store.getters['D_USER/GE_USER'].userKey) {

            } else {
              params.checkList.push(actorObj)
            }
          }
        }
        if (params.actorList.length > 0) {
          selectMeYn.value = true
          if (params.actorList.length === 1 && addMeYn) {
            selectMeYn.value = true
          } else {
            selectMeYn.value = false
          }
        }

        if (params.refList && params.refList.length > 0) {
          selectRefsYn.value = true
        }

        if (params.checkList && params.checkList.length > 0) {
          selectCheckYn.value = true
        }
        console.log(params)

        // bodyFullStr 디코딩 후 formCard 생성
        params.bodyFullStr = setBodyLength(props.pContentsData.bodyFullStr)
        if (params.bodyFullStr) {
          replaceTargetInChild(params.bodyFullStr) // DOM tree에서 원하는 대상 찾아 교체
        }

        // ------------------- edit상태에서 첨부 파일 관련 로직
        if (props.pContentsData.attachFileList) {
          console.log(props.pContentsData.attachFileList)
          for (let i = 0; i < props.pContentsData.attachFileList.length; i++) {
            const file = props.pContentsData.attachFileList[i]
            tempFileList.push(file)
            if (file.attachYn) {
              propAttachFileList.push(file)
              addFalseAttachTrueFileList.push(file)
            } else {
              addFalseAttachFalseFileList.push(file)
            }
          }
          console.log(propAttachFileList)
        }
        console.log(tempFileList)
      }
    })
    const delAttachFile = (val) => {
      if (tempFileList.findIndex(f => f.fileKey === val.fileKey) !== -1 || tempFileList.findIndex(f => f.attachKey === val.attachKey) !== -1) {
        let index = tempFileList.findIndex(f => f.fileKey === val.fileKey)
        if (index !== -1) {
          tempFileList[index].addYn = false
        } else {
          index = tempFileList.findIndex(f => f.attachKey === val.attachKey)
          if (index !== -1) {
            tempFileList.splice(index, 1)
          }
        }
      }
      console.log(tempFileList)
    }
    // eslint-disable-next-line no-unused-vars
    const setAttachFileList = () => {
      // 계획
      // 1. 이미 있던 사진을 삭제해서 수정(업데이트 하는경우): addYn: false // 삭제한 파일도 포함해야함
      // 2. 이미 있던 사진을 포함해서 수정: 서버에서 중복저장 되지 않게
      // const delFileList = []
      const iList = document.querySelectorAll('.formCard .addFalse')
      let delYn = true
      // 1. 이미 있던 사진을 삭제해서 수정(업데이트 하는경우): addYn: false // 삭제한 파일도 포함해야함
      for (let i = tempFileList.length - 1; i > -1; i--) {
        const tempFile = tempFileList[i]
        for (let j = 0; addFalseAttachTrueFileList.length; j++) {
          const propAttachFile = addFalseAttachTrueFileList[j]
          // let deleteYn = true
          if (!propAttachFile) break
          if (tempFile.fileKey && tempFile.fileKey === propAttachFile.file) {
            // tempFileList[i].addYn = false
            delYn = false
          }
          /*
          if (deleteYn) {
            tempFileList[i].addYn = false
            delFileList.push(tempFileList[i])
            tempFileList.splice(i, 1)
          } */
        }
        for (let s = 0; s < iList.length; s++) {
          const img = iList[s]
          console.log(img)
          if (tempFile.fileKey && Number(tempFile.fileKey) === Number(img.attributes.filekey.value)) {
            delYn = false
          }
        }
        if (delYn && !tempFileList[i].addYn) {
          tempFileList[i].addYn = false
        }
      }
    }

    // 날짜 변화 체크 로직
    watch(
      () => [params.workFromDateStr, params.workToDateStr],
      (newP) => {
        console.log('============== param changed check', newP)
        const newFromDate = newP[0]
        const newToDate = newP[1]

        let changeType = 'N'
        if (newFromDate !== gOldFromDate) {
          changeType = 'F'
        } else if (newToDate !== gOldToDate) {
          changeType = 'T'
        }

        // from변경시, to보다 이후면 to를 from으로 변경
        // to변경시, to보다 이후면 to를 to으로 변경
        if (newFromDate > newToDate) {
          if (changeType === 'F') {
            params.workToDateStr = newP[0]
          } else if (changeType === 'T') {
            params.workFromDateStr = newP[1]
          } else {
          }
        }
        gOldFromDate = newP[0]
        gOldToDate = newP[1]
      }
    )

    // 익명 & 댓글 & 제목 여부 설정
    const toggleAnonymousYn = () => {
      params.showCreNameYn = !params.showCreNameYn
    }
    const toggleCommentYn = () => {
      params.canReplyYn = !params.canReplyYn
    }
    const hasTitleYn = ref(false)
    const toggleTitleYn = () => {
      hasTitleYn.value = !hasTitleYn.value
    }

    // Target 선택 기능
    const showReceiverSelectList = ref(false)
    const toggleReceiverSelectPop = () => {
      showReceiverSelectList.value = !showReceiverSelectList.value
      if (
        showReceiverSelectList.value &&
        params.actorList[0].accessKey === store.getters['D_USER/GE_USER'].userKey
      ) {
        params.actorList = []
        /* if (params.checkList.findIndex((check) => (check.accessKey = store.getters['D_USER/GE_USER'].userKey && check.accessKind === 'U')) !== -1) {
          const index = params.checkList.findIndex((check) => (check.accessKey = store.getters['D_USER/GE_USER'].userKey && check.accessKind === 'U'))
          params.checkList.splice(index, 1)
        } */
      } else if (!showRefsSelectList.value) {
        /* if (params.checkList.findIndex((check) => (check.accessKey = store.getters['D_USER/GE_USER'].userKey && check.accessKind === 'U')) === -1) {
          params.checkList.push({
            accessKey: store.getters['D_USER/GE_USER'].userKey,
            accessKind: 'U',
            actType: 'CK',
            accessName: store.getters['D_USER/GE_USER'].userDispMtext
          })
        }
        selectCheckYn.value = true */
      }
    }

    // 검토자 선택 기능
    const showCheckSelectList = ref(false)
    const toggleCheckSelectPop = () => {
      showCheckSelectList.value = !showCheckSelectList.value
    }

    const selectCheckYn = ref(false)
    const selectNoCheck = () => {
      selectCheckYn.value = false
    }
    selectNoCheck()

    const setSelectedCheckList = (selectedTargetList) => {
      for (let i = 0; i < selectedTargetList.length; i++) {
        selectedTargetList[i].actType = 'CK'
      }
      params.checkList = selectedTargetList
      selectCheckYn.value = true
    }

    // 참조자 선택 기능
    const showRefsSelectList = ref(false)
    const toggleRefsSelectPop = () => {
      showRefsSelectList.value = !showRefsSelectList.value
    }

    const selectRefsYn = ref(false)
    const selectNoRefs = () => {
      selectRefsYn.value = false
    }
    selectNoRefs()

    const setSelectedRefList = (selectedTargetList) => {
      for (let i = 0; i < selectedTargetList.length; i++) {
        selectedTargetList[i].actType = 'RF'
      }
      params.refList = selectedTargetList
      selectRefsYn.value = true
    }
    const replaceStickerArr = (arr) => {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (
          data.findIndex(
            (item) => item.nameMtext.trim() === current.nameMtext.trim()
          ) === -1
        ) {
          /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          data.push(current)
        }
        // data = data.sort(function (a, b) {
        //   return b.contentsKey - a.contentsKey
        // })
        return data
      }, [])
      return uniqueArr
    }

    const replaceActorArr = (arr) => {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (
          data.findIndex(
            (item) => item.accessKind === current.accessKind && item.accessKey === current.accessKey && item.actType === current.actType
          ) === -1
        ) {
          /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          data.push(current)
        }
        // data = data.sort(function (a, b) {
        //   return b.contentsKey - a.contentsKey
        // })
        return data
      }, [])
      return uniqueArr
    }
    const selectMeYn = ref(false)
    const selectTargetOnlyMe = () => {
      params.actorList.length = 0
      params.actorList.push({
        accessKey: store.getters['D_USER/GE_USER'].userKey,
        accessKind: 'U'
      })
      selectMeYn.value = true
    }
    selectTargetOnlyMe()

    const setSelectedTargetList = (selectedTargetList) => {
      console.log(selectedTargetList)
      params.actorList = selectedTargetList
      selectMeYn.value = false
    }

    const changePriority = priorityValue => {
      params.priority = priorityValue
    }

    // Tag(category) 선택 기능
    const tagListForDom = reactive([]) // 원본 유지를 위한 복사
    if (stickerList.length) {
      stickerList.forEach((sticker, index) => {
        const stickerObj = {
          stickerKey: sticker.stickerKey,
          nameMtext: sticker.nameMtext,
          picBgPath: sticker.picBgPath
        }
        stickerObj.isSelected = false
        /* if (index === 0) {
          stickerObj.isSelected = true
          params.stickerList.push(stickerObj)
        } else {
          stickerObj.isSelected = false
        } */
        tagListForDom.push(stickerObj)
      })
    }
    const selfAddTag = ref('')
    const addSelfTag = (selfAddTag) => {
      if (selfAddTag.trim() !== '') {
        console.log('KO$^$' + selfAddTag)
        tagListForDom.unshift({ nameMtext: 'KO$^$' + selfAddTag, stickerKey: null, picBgPath: '#CCC', creUserKey: store.getters['D_USER/GE_USER'].userKey, isSelected: true })
        removeSelfTag()
      }
      params.stickerList.unshift({ nameMtext: 'KO$^$' + selfAddTag, stickerKey: null, picBgPath: '#CCC', creUserKey: store.getters['D_USER/GE_USER'].userKey, isSelected: true })
      console.log('params.stickerList', params.stickerList)
    }
    const removeSelfTag = () => {
      selfAddTag.value = ''
    }

    const toggleSelectTag = (selectedTag, index) => {
      console.log('params.stickerList', params.stickerList)
      const indexToRemove = params.stickerList.findIndex((st) => st.nameMtext === selectedTag.nameMtext)
      console.log(params.stickerList)
      if (indexToRemove !== -1) {
        params.stickerList.splice(indexToRemove, 1)
        tagListForDom[index].isSelected = false
      } else {
        const stickerObj = {
          stickerKey: selectedTag.stickerKey,
          nameMtext: selectedTag.nameMtext,
          picBgPath: selectedTag.picBgPath
        }
        params.stickerList.push(stickerObj)
        tagListForDom[index].isSelected = true
      }
      params.stickerList = replaceStickerArr(params.stickerList)
    }
    // 편집 상태일 때는 데이터 비교후 선택된 tag 체크
    if (props.pContentsData) {
      for (let i = 0; i < tagListForDom.length; i++) {
        for (let j = 0; j < props.pContentsData.stickerList.length; j++) {
          if (
            // eslint-disable-next-line vue/no-setup-props-destructure
            tagListForDom[i].nameMtext ===
            props.pContentsData.stickerList[j].nameMtext
          ) {
            toggleSelectTag(tagListForDom[i], i)
            // const stickerObj = {
            //   stickerKey: props.pContentsData.stickerList[j].stickerKey,
            //   nameMtext: props.pContentsData.stickerList[j].nameMtext,
            //   picBgPath: props.pContentsData.stickerList[j].picBgPath
            // }
            // params.stickerList.push(stickerObj)
            tagListForDom[i].isSelected = true
            break
          }
        }
      }
    }

    // attach file 설정
    const tempFileList = reactive([])
    // ------ 업로드한 파일 변수에 담기
    const setAttachedFile = (fileList) => {
      if (fileList.addYn === true) {
        tempFileList.push(fileList)
      }
      if (hasTitleYn.value && !params.title) {
        params.title = fileList.file.name
      }
    }
    // formEditor 사용 업로드 시
    const changeUploadList = (upList) => {
      if (tempFileList.length > 0) {
        console.log(
          tempFileList.findIndex((item) => item.targetKey === upList.targetKey)
        )
        const index = tempFileList.findIndex(
          (item) => item.targetKey === upList.targetKey
        )
        if (index === -1) {
          const temp = []
          for (const file of tempFileList) {
            temp.push(file)
          }
          tempFileList.length = 0
          for (const file of temp) {
            tempFileList.push(file)
          }
          tempFileList.push(upList)
          // tempFileList = [...temp, upList]
        } else if (index !== -1) {
          tempFileList.splice(index, 1, upList)
        }
      } else {
        tempFileList.push(upList)
      }
    }
    // ------ 파일 서버에 업로드j
    const fileDataUploadToServer = async () => {
      if (tempFileList.length > 0) {
        let iList = document.querySelectorAll('.formCard .addTrue')
        let form = new FormData()
        for (var i = 0; i < tempFileList.length; i++) {
          form = new FormData()
          if (tempFileList[i].fileKey) continue
          const oldFile = tempFileList[i].file
          const newFile = new File([oldFile], oldFile.name.normalize('NFC'), {
            type: oldFile.type
          })
          form.append('files[0]', newFile)
          await axios
            // 파일서버 fileServer fileserver FileServer Fileserver
            .post(props.pOptions.fileServerURL, form, {
              headers: {
                'Content-Type': 'multipart/form-data; charset: UTF-8;'
              }
            })
            .then((res) => {
              console.log(res)
              if (res.data.length > 0) {
                if (tempFileList[i].attachYn === true) {
                  tempFileList[i].attachYn = true
                } else {
                }
                var path = res.data[0].domainPath + res.data[0].pathMtext
                tempFileList[i].successSave = true
                tempFileList[i].filePath = path
                tempFileList[i].fileSizeKb = res.data[0].fileSizeKb
                tempFileList[i].fileKey = res.data[0].fileKey
              }
            })
            .catch((error) => {
              // this.response = error
              // this.isUploading = false
              console.log(error)
            })
        }
        iList = document.querySelectorAll('.formCard .addTrue')
        if (iList.length > 0) {
          for (let s = 0; s < tempFileList.length; s++) {
            const uploadFile = tempFileList[s]
            if (uploadFile.successSave) {
              for (var il = 0; il < iList.length; il++) {
                if (
                  !uploadFile.attachYn &&
                  (iList[il].attributes.filekey === undefined ||
                    iList[il].attributes.filekey === null ||
                    iList[il].attributes.filekey === '')
                ) {
                  if (iList[il].src === uploadFile.previewImgUrl) {
                    iList[il].src = uploadFile.filePath
                    tempFileList[s].attachYn = false
                    // eslint-disable-next-line no-unused-vars
                    iList[il].setAttribute('fileKey', uploadFile.fileKey)
                    iList[il].setAttribute('fileSizeKb', uploadFile.fileSizeKb)
                    iList[il].classList.remove('addTrue')
                    iList[il].classList.add('addFalse')
                    break
                  }
                }
              }
            } else {
              tempFileList.splice(s, 1)
            }
          }
        }
      } else {
      }
      return true
    }
    // ------ 서버에 업로드된 파일 정보로 데이터 재가공
    const handleFileListForUpload = () => {
      const newAttachFileList = []
      for (let i = 0; i < tempFileList.length; i++) {
        // if (tempFileList[i].fileKey) continue
        const fileObj = {}
        fileObj.addYn = true
        fileObj.attachYn = true
        fileObj.fileName = 'dAlimImg'
        if (tempFileList[i].addYn !== undefined && tempFileList[i].addYn !== null) {
          fileObj.addYn = tempFileList[i].addYn
        }
        if (tempFileList[i].attachYn !== undefined && tempFileList[i].attachYn !== null) {
          fileObj.attachYn = tempFileList[i].attachYn
        }
        fileObj.fileKey = tempFileList[i].fileKey
        if (tempFileList[i].file) {
          fileObj.fileName = tempFileList[i].file.name.normalize('NFC')
        }
        newAttachFileList.push(fileObj)
      }
      return newAttachFileList
    }

    // 제목이 없을 경우 내용을 제목으로 넣어주는 함수
    const titleToBody = (inHtml) => {
    // eslint-disable-next-line no-debugger
      debugger
      var titleText = ''
      var childNodes = inHtml.childNodes
      var valueTextIdx = 0
      for (var i = 0; i < childNodes.length; i++) {
        titleText += childNodes[i].textContent + ' '
        titleText = titleText.trimLeft()
        if (titleText === '') valueTextIdx += 1
        if (titleText.length >= 6 && i === valueTextIdx) {
          titleText = titleText.length > 256 ? titleText.substring(0, 254) + '..' : titleText.substring(0, 254)
          break
        }
        if (titleText.length > 254) {
          titleText = titleText.substring(0, 254) + '..'
          break
        }
      }
      return titleText
    }
    // 최종 Submit
    const postContents = async () => {
<<<<<<< .mine
||||||| .r2488
      if (!props.popUpType) {
        console.log('herererr')
        try {
          if (params.mLoadingYn) return
          if (tempFileList.length > 0) {
            await fileDataUploadToServer()
          }
          await setAttachFileList()
          params.attachFileList = handleFileListForUpload()

          // formEditor 작성 내용 추출
          boardDataCheck()

          // 제목 옵션 false일 때 자동 제목 생성
          if (!hasTitleYn.value) {
            if (!params.title && extractedInnerHtml) {
              params.title = extractedInnerHtml
            } else if (
              !params.title &&
              !extractedInnerHtml &&
              params.attachFileList.length
            ) {
              params.title = params.attachFileList[0].fileName
            }
          }
          params.workStatCreUserName = store.getters['D_USER/GE_USER'].userDispMtext
          // 참조자 처리 추가
          if (params.refList) {
            if (!params.actorList)params.actorList = []
            params.actorList = [
              ...params.actorList,
              ...params.refList
            ]
            delete params.refList
          }
          // 검토자 처리 추가
          if (params.checkList) {
            if (!params.actorList)params.actorList = []
            params.actorList = [
              ...params.actorList,
              ...params.checkList
            ]
            delete params.checkList
          }

          params.actorList = replaceActorArr(params.actorList)
          // 나는 무조건 검토자로 추가
          if (params.actorList.findIndex((check) => (check.accessKey === store.getters['D_USER/GE_USER'].userKey && check.accessKind === 'U' && check.actType === 'CK')) === -1) {
            params.actorList.push({
              accessKey: store.getters['D_USER/GE_USER'].userKey,
              accessKind: 'U',
              actType: 'CK',
              accessName: store.getters['D_USER/GE_USER'].userDispMtext
            })
          }
          if (params.stickerList) {
            params.stickerList = replaceStickerArr(params.stickerList)
          }
          // params value 체크
          if (props.pOptions.model === 'mankik') {
            if (params.actorList.length === 0 && selectMeYn) {
              params.actorList.push({
                accessKind: 'U',
                accessKey: store.getters['D_USER/GE_USER'].userKey
              })
            }
            if (!params.workToDateStr) {
              failPopYn.value = true
              errorText.value = this.$t('COMM_ERR_DATE')
              // } else if (route.path !== '/todo' && (!params.bodyFullStr && !params.attachFileList.length)) {
            } else {
              // eslint-disable-next-line no-unreachable
              const parser = new DOMParser()
              const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
              const tempTitle = titleToBody(doc)
              // 제목이 작성되지 않았을 때는 작성된 내용을 제목으로 할 수 있도록
              if (hasTitleYn.value && !params.title) {
                if (tempTitle) {
                  params.title = titleToBody(doc)
                  params.mLoadingYn = true
                  console.log('params', params)
                  // props.pPostContentsFn(params)
                } else {
                  // 만약 제목과 내용 둘 다 작성되지 않았을 경우 경고창
                  failPopYn.value = true
                  errorText.value = this.$t('COMM_ERR_TITLE')
                }
              } else {
                // 제목은 있고, 내용이 없을 경우에는 저장됨
                if (params.title.length > 256) {
                  failPopYn.value = true
                  errorText.value = this.$t('COMM_ERR_TITLE_COUNT')
                } else {
                  params.mLoadingYn = true
                  // props.pPostContentsFn(params)
                  console.log('params', params)
                }
              }
            }
          } else if (props.pOptions.model === 'unibuzzy') {
            const parser = new DOMParser()
            const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
            const tempText = titleToBody(doc)
            if (!tempText && !params.attachFileList.length) {
              failPopYn.value = true
              errorText.value = this.$t('COMM_ERR_FILL_CONTENT')
            } else {
              if (hasTitleYn.value && !params.title) {
                if (params.bodyFullStr) {
                  params.title = titleToBody(doc)
                  params.mLoadingYn = true
                  // props.pPostContentsFn(params)
                  console.log('params', params)
                } else {
                  failPopYn.value = true
                  errorText.value = this.$t('COMM_ERR_NO_TITLE')
                }
              } else {
                params.mLoadingYn = true
                // props.pPostContentsFn(params)
                console.log('params', params)
              }
            }
          }
        } catch (error) {
          params.mLoadingYn = false
          console.log('send todo error error error', error)
        }
      } else if (contentType.value === 'ALIM') {
        // sendLetter()
      } else if (contentType.value === 'BOAR') {
      // sendBoard ()
      }
    }

    const sendLetter = async () => {
      console.log('props.propParams', props.propParams)
=======
      if (!props.popUpType) {
        console.log('herererr')
        try {
          if (params.mLoadingYn) return
          if (tempFileList.length > 0) {
            await fileDataUploadToServer()
          }
          await setAttachFileList()
          params.attachFileList = handleFileListForUpload()

          // formEditor 작성 내용 추출
          boardDataCheck()

          // 제목 옵션 false일 때 자동 제목 생성
          if (!hasTitleYn.value) {
            if (!params.title && extractedInnerHtml) {
              params.title = extractedInnerHtml
            } else if (
              !params.title &&
              !extractedInnerHtml &&
              params.attachFileList.length
            ) {
              params.title = params.attachFileList[0].fileName
            }
          }
          params.workStatCreUserName = store.getters['D_USER/GE_USER'].userDispMtext
          // 참조자 처리 추가
          if (params.refList) {
            if (!params.actorList)params.actorList = []
            params.actorList = [
              ...params.actorList,
              ...params.refList
            ]
            delete params.refList
          }
          // 검토자 처리 추가
          if (params.checkList) {
            if (!params.actorList)params.actorList = []
            params.actorList = [
              ...params.actorList,
              ...params.checkList
            ]
            delete params.checkList
          }

          params.actorList = replaceActorArr(params.actorList)
          // 나는 무조건 검토자로 추가
          if (params.actorList.findIndex((check) => (check.accessKey === store.getters['D_USER/GE_USER'].userKey && check.accessKind === 'U' && check.actType === 'CK')) === -1) {
            params.actorList.push({
              accessKey: store.getters['D_USER/GE_USER'].userKey,
              accessKind: 'U',
              actType: 'CK',
              accessName: store.getters['D_USER/GE_USER'].userDispMtext
            })
          }
          if (params.stickerList) {
            params.stickerList = replaceStickerArr(params.stickerList)
          }
          // params value 체크
          if (props.pOptions.model === 'mankik') {
            if (params.actorList.length === 0 && selectMeYn) {
              params.actorList.push({
                accessKind: 'U',
                accessKey: store.getters['D_USER/GE_USER'].userKey
              })
            }
            if (!params.workToDateStr) {
              failPopYn.value = true
              errorText.value = this.$t('COMM_ERR_DATE')
              // } else if (route.path !== '/todo' && (!params.bodyFullStr && !params.attachFileList.length)) {
            } else {
              // eslint-disable-next-line no-unreachable
              const parser = new DOMParser()
              const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
              const tempTitle = titleToBody(doc)
              // 제목이 작성되지 않았을 때는 작성된 내용을 제목으로 할 수 있도록
              if (hasTitleYn.value && !params.title) {
                if (tempTitle) {
                  params.title = titleToBody(doc)
                  params.mLoadingYn = true
                  props.pPostContentsFn(params)
                } else {
                  // 만약 제목과 내용 둘 다 작성되지 않았을 경우 경고창
                  failPopYn.value = true
                  errorText.value = this.$t('COMM_ERR_TITLE')
                }
              } else {
                // 제목은 있고, 내용이 없을 경우에는 저장됨
                if (params.title.length > 256) {
                  failPopYn.value = true
                  errorText.value = this.$t('COMM_ERR_TITLE_COUNT')
                } else {
                  params.mLoadingYn = true
                  props.pPostContentsFn(params)
                }
              }
            }
          } else if (props.pOptions.model === 'unibuzzy') {
            const parser = new DOMParser()
            const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
            const tempText = titleToBody(doc)
            if (!tempText && !params.attachFileList.length) {
              failPopYn.value = true
              errorText.value = this.$t('COMM_ERR_FILL_CONTENT')
            } else {
              if (hasTitleYn.value && !params.title) {
                if (params.bodyFullStr) {
                  params.title = titleToBody(doc)
                  params.mLoadingYn = true
                  props.pPostContentsFn(params)
                } else {
                  failPopYn.value = true
                  errorText.value = this.$t('COMM_ERR_NO_TITLE')
                }
              } else {
                params.mLoadingYn = true
                props.pPostContentsFn(params)
              }
            }
          }
        } catch (error) {
          params.mLoadingYn = false
          console.log('send todo error error error', error)
        }
      } else if (contentType.value === 'ALIM') {
        sendLetter()
      } else if (contentType.value === 'BOAR') {
        sendBoard()
      }
    }

    const sendLetter = async () => {
>>>>>>> .r2489
      try {
        if (params.mLoadingYn) return
        if (tempFileList.length > 0) {
          await fileDataUploadToServer()
        }
        await setAttachFileList()
        params.attachFileList = handleFileListForUpload()

        // formEditor 작성 내용 추출
        boardDataCheck()

        // 제목 옵션 false일 때 자동 제목 생성
        if (!hasTitleYn.value) {
          if (!params.title && extractedInnerHtml) {
            params.title = extractedInnerHtml
          } else if (
            !params.title &&
            !extractedInnerHtml &&
            params.attachFileList.length
          ) {
            params.title = params.attachFileList[0].fileName
          }
        }
        params.workStatCreUserName = store.getters['D_USER/GE_USER'].userDispMtext
        // 참조자 처리 추가
        if (params.refList) {
          if (!params.actorList)params.actorList = []
          params.actorList = [
            ...params.actorList,
            ...params.refList
          ]
          delete params.refList
        }
        // 검토자 처리 추가
        if (params.checkList) {
          if (!params.actorList)params.actorList = []
          params.actorList = [
            ...params.actorList,
            ...params.checkList
          ]
          delete params.checkList
        }

        params.actorList = replaceActorArr(params.actorList)
        // 나는 무조건 검토자로 추가
        if (params.actorList.findIndex((check) => (check.accessKey === store.getters['D_USER/GE_USER'].userKey && check.accessKind === 'U' && check.actType === 'CK')) === -1) {
          params.actorList.push({
            accessKey: store.getters['D_USER/GE_USER'].userKey,
            accessKind: 'U',
            actType: 'CK',
            accessName: store.getters['D_USER/GE_USER'].userDispMtext
          })
        }

<<<<<<< .mine
||||||| .r2488
        // params value 체크
        if (props.pOptions.model === 'mankik') {
          if (params.actorList.length === 0 && selectMeYn) {
            params.actorList.push({
              accessKind: 'U',
              accessKey: store.getters['D_USER/GE_USER'].userKey
            })
          }
          if (!params.workToDateStr) {
            failPopYn.value = true
            errorText.value = this.$t('COMM_ERR_DATE')
            // } else if (route.path !== '/todo' && (!params.bodyFullStr && !params.attachFileList.length)) {
          } else {
            // eslint-disable-next-line no-unreachable
            const parser = new DOMParser()
            const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
            const tempTitle = titleToBody(doc)
            // 제목이 작성되지 않았을 때는 작성된 내용을 제목으로 할 수 있도록
            if (hasTitleYn.value && !params.title) {
              if (tempTitle) {
                params.title = titleToBody(doc)
                params.mLoadingYn = true
                console.log('params', params)
                // props.pPostContentsFn(params)
              } else {
                // 만약 제목과 내용 둘 다 작성되지 않았을 경우 경고창
                failPopYn.value = true
                errorText.value = this.$t('COMM_ERR_TITLE')
              }
            } else {
              // 제목은 있고, 내용이 없을 경우에는 저장됨
              if (params.title.length > 256) {
                failPopYn.value = true
                errorText.value = this.$t('COMM_ERR_TITLE_COUNT')
              } else {
                params.mLoadingYn = true
                // props.pPostContentsFn(params)
                console.log('params', params)
              }
            }
          }
        } else if (props.pOptions.model === 'unibuzzy') {
          const parser = new DOMParser()
          const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
          const tempText = titleToBody(doc)
          if (!tempText && !params.attachFileList.length) {
            failPopYn.value = true
            errorText.value = this.$t('COMM_ERR_FILL_CONTENT')
          } else {
            if (hasTitleYn.value && !params.title) {
              if (params.bodyFullStr) {
                params.title = titleToBody(doc)
                params.mLoadingYn = true
                // props.pPostContentsFn(params)
                console.log('params', params)
              } else {
                failPopYn.value = true
                errorText.value = this.$t('COMM_ERR_NO_TITLE')
              }
            } else {
              params.mLoadingYn = true
              // props.pPostContentsFn(params)
              console.log('params', params)
            }
          }
        }

        var saveResults = props.pPostContentsFn(params)
        console.log('saveResults', saveResults)
      } catch (error) {
        params.mLoadingYn = false
        console.log('send letter error error error error', error)
      }
    }

    const sendBoard = async () => {
      confirmPopVariable.checkPopYn = false
      try {
        if (params.mLoadingYn) return

        if (tempFileList.length > 0) {
          await fileDataUploadToServer()
        }
        await setAttachFileList()
        params.attachFileList = handleFileListForUpload()

        // formEditor 작성 내용 추출
        boardDataCheck()

        params.bodyHtmlYn = true
        params.cabinetKey = props.propData.cabinetKey
        params.actorList = props.propData.actorList

        params.onlyManagerYn = false
        if (params.cabinetKey === 11188) {
          params.onlyManagerYn = true
        }

        params.creTeamKey = props.propData.currentTeamKey || props.propData.creTeamKey
        if (props.propData.attachMfilekey) {
          params.attachMfilekey = props.propData.attachMfilekey
        }

        if (props.propData.nonMemYn) {
          params.creUserName = '비회원유저'
          params.creUserKey = 0
        } else {
          params.creUserName = store.getters['D_USER/GE_USER'].userDispMtext || store.getters['D_USER/GE_USER'].userNameMtext
          params.creUserKey = store.getters['D_USER/GE_USER'].userKey
        }
        params.cabinetName = this.propData.cabinetNameMtext || this.cabinetName

        if (this.cabBlindYn) {
          params.showCreNameYn = false
        }
        if (this.modiYn) {
          params.contentsKey = props.propData.modiContentsKey
        } else {
          params.workStatCodeKey = 40
        }

        // 제목 옵션 false일 때 자동 제목 생성
        if (!hasTitleYn.value) {
          if (!params.title && extractedInnerHtml) {
            params.title = extractedInnerHtml
          } else if (
            !params.title &&
              !extractedInnerHtml &&
              params.attachFileList.length
          ) {
            params.title = params.attachFileList[0].fileName
          }
        }

        // 나는 무조건 actorLIist에
        if (props.propParams.userKey) {
          params.actorList = [{ accessKind: 'U', accessKey: props.propParams.userKey }]
        }

        // 참조자 처리 추가
        if (params.refList) {
          if (!params.actorList)params.actorList = []
          params.actorList = [
            ...params.actorList,
            ...params.refList
          ]
          delete params.refList
        }
        // 검토자 처리 추가
        if (params.checkList) {
          if (!params.actorList)params.actorList = []
          params.actorList = [
            ...params.actorList,
            ...params.checkList
          ]
          delete params.checkList
        }
        params.actorList = replaceActorArr(params.actorList)

        // 스티커
=======
        // params value 체크
        if (props.pOptions.model === 'mankik') {
          if (params.actorList.length === 0 && selectMeYn) {
            params.actorList.push({
              accessKind: 'U',
              accessKey: store.getters['D_USER/GE_USER'].userKey
            })
          }
          if (!params.workToDateStr) {
            failPopYn.value = true
            errorText.value = this.$t('COMM_ERR_DATE')
            // } else if (route.path !== '/todo' && (!params.bodyFullStr && !params.attachFileList.length)) {
          } else {
            // eslint-disable-next-line no-unreachable
            const parser = new DOMParser()
            const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
            const tempTitle = titleToBody(doc)
            // 제목이 작성되지 않았을 때는 작성된 내용을 제목으로 할 수 있도록
            if (hasTitleYn.value && !params.title) {
              if (tempTitle) {
                params.title = titleToBody(doc)
                params.mLoadingYn = true
                console.log('params', params)
                // props.pPostContentsFn(params)
              } else {
                // 만약 제목과 내용 둘 다 작성되지 않았을 경우 경고창
                failPopYn.value = true
                errorText.value = this.$t('COMM_ERR_TITLE')
              }
            } else {
              // 제목은 있고, 내용이 없을 경우에는 저장됨
              if (params.title.length > 256) {
                failPopYn.value = true
                errorText.value = this.$t('COMM_ERR_TITLE_COUNT')
              } else {
                params.mLoadingYn = true
                // props.pPostContentsFn(params)
                console.log('params', params)
              }
            }
          }
        } else if (props.pOptions.model === 'unibuzzy') {
          const parser = new DOMParser()
          const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
          const tempText = titleToBody(doc)
          if (!tempText && !params.attachFileList.length) {
            failPopYn.value = true
            errorText.value = this.$t('COMM_ERR_FILL_CONTENT')
          } else {
            if (hasTitleYn.value && !params.title) {
              if (params.bodyFullStr) {
                params.title = titleToBody(doc)
                params.mLoadingYn = true
                // props.pPostContentsFn(params)
                console.log('params', params)
              } else {
                failPopYn.value = true
                errorText.value = this.$t('COMM_ERR_NO_TITLE')
              }
            } else {
              params.mLoadingYn = true
              // props.pPostContentsFn(params)
              console.log('params', params)
            }
          }
        }

        var saveResults = props.pPostContentsFn(params)
        console.log('saveResults', saveResults)
      } catch (error) {
        params.mLoadingYn = false
        console.log('send letter error error error error', error)
      }
    }

    var cabBlindYn = reactive(false)
    var modiYn = reactive(false)
    const sendBoard = async () => {
      console.log('props.propParams', props.propParams)

      confirmPopVariable.checkPopYn = false
      try {
        if (params.mLoadingYn) return

        if (tempFileList.length > 0) {
          await fileDataUploadToServer()
        }
        await setAttachFileList()
        params.attachFileList = handleFileListForUpload()

        // formEditor 작성 내용 추출
        boardDataCheck()

        params.bodyHtmlYn = true
        params.cabinetKey = params.selectBoardCabinetKey
        params.actorList = props.propParams.actorList

        params.onlyManagerYn = false
        if (params.cabinetKey === 11188) {
          params.onlyManagerYn = true
        }

        params.creTeamKey = props.propParams.currentTeamKey || props.propParams.creTeamKey
        if (props.propParams.attachMfilekey) {
          params.attachMfilekey = props.propParams.attachMfilekey
        }

        if (props.propParams.nonMemYn) {
          params.creUserName = 'nonMemUserName'
          params.creUserKey = 0
        } else {
          params.creUserName = store.getters['D_USER/GE_USER'].userDispMtext || store.getters['D_USER/GE_USER'].userNameMtext
          params.creUserKey = store.getters['D_USER/GE_USER'].userKey
        }
        params.cabinetName = cabinetName

        if (cabBlindYn) {
          params.showCreNameYn = false
        }
        if (modiYn) {
          params.contentsKey = props.propParams.modiContentsKey // 추후 게시판 선택하는 함수 만들어 대체
        } else {
          params.workStatCodeKey = 40
        }

        // 제목 옵션 false일 때 자동 제목 생성
        if (!hasTitleYn.value) {
          if (!params.title && extractedInnerHtml) {
            params.title = extractedInnerHtml
          } else if (
            !params.title &&
              !extractedInnerHtml &&
              params.attachFileList.length
          ) {
            params.title = params.attachFileList[0].fileName
          }
        }

        // 나는 무조건 actorLIist에
        if (props.propParams.userKey) {
          params.actorList = [{ accessKind: 'U', accessKey: props.propParams.userKey }]
        }

        // 참조자 처리 추가
        if (params.refList) {
          if (!params.actorList)params.actorList = []
          params.actorList = [
            ...params.actorList,
            ...params.refList
          ]
          delete params.refList
        }
        // 검토자 처리 추가
        if (params.checkList) {
          if (!params.actorList)params.actorList = []
          params.actorList = [
            ...params.actorList,
            ...params.checkList
          ]
          delete params.checkList
        }
        params.actorList = replaceActorArr(params.actorList)

        // 스티커
>>>>>>> .r2489
        if (params.stickerList) {
          params.stickerList = replaceStickerArr(params.stickerList)
        }
        // params value 체크
        if (props.pOptions.model === 'mankik') {
          if (params.actorList.length === 0 && selectMeYn) {
            params.actorList.push({
              accessKind: 'U',
              accessKey: store.getters['D_USER/GE_USER'].userKey
            })
          }
          if (!params.workToDateStr) {
            failPopYn.value = true
            errorText.value = this.$t('COMM_ERR_DATE')
            // } else if (route.path !== '/todo' && (!params.bodyFullStr && !params.attachFileList.length)) {
          } else {
            // eslint-disable-next-line no-unreachable
            const parser = new DOMParser()
            const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
            const tempTitle = titleToBody(doc)
            // 제목이 작성되지 않았을 때는 작성된 내용을 제목으로 할 수 있도록
            if (hasTitleYn.value && !params.title) {
              if (tempTitle) {
                params.title = titleToBody(doc)
                params.mLoadingYn = true
                props.pPostContentsFn(params)
              } else {
                // 만약 제목과 내용 둘 다 작성되지 않았을 경우 경고창
                failPopYn.value = true
                errorText.value = this.$t('COMM_ERR_TITLE')
              }
            } else {
              // 제목은 있고, 내용이 없을 경우에는 저장됨
              if (params.title.length > 256) {
                failPopYn.value = true
                errorText.value = this.$t('COMM_ERR_TITLE_COUNT')
              } else {
                params.mLoadingYn = true
                props.pPostContentsFn(params)
              }
            }
          }
        } else if (props.pOptions.model === 'unibuzzy') {
          const parser = new DOMParser()
          const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
          const tempText = titleToBody(doc)
          if (!tempText && !params.attachFileList.length) {
            failPopYn.value = true
            errorText.value = this.$t('COMM_ERR_FILL_CONTENT')
          } else {
            if (hasTitleYn.value && !params.title) {
              if (params.bodyFullStr) {
                params.title = titleToBody(doc)
                params.mLoadingYn = true
                props.pPostContentsFn(params)
              } else {
                failPopYn.value = true
                errorText.value = this.$t('COMM_ERR_NO_TITLE')
              }
            } else {
              params.mLoadingYn = true
              props.pPostContentsFn(params)
            }
          }
        }
<<<<<<< .mine
||||||| .r2488

        var saveResults = props.pPostContentsFn(params)
        console.log('saveResults', saveResults)
=======

        // console.log('send Board params', params)
        var saveResults = props.pPostContentsFn(params)
        console.log('saveResults', saveResults)
>>>>>>> .r2489
      } catch (error) {
        params.mLoadingYn = false
        console.log('error error error', error)
      }
    }

    console.log('params', params)
    const openBtnWrapYn = ref(false)
    const openBtnWrap = () => {
      openBtnWrapYn.value = !openBtnWrapYn.value
    }

    // Regacy: 기존 FormEditor 컴포넌트 사용을 위한 레거시 코드들입니다. --------- 일부는 compositionAPI에 맞춰 수정
    // ============ 변수설정 ===========
    const contentType = ref('BOAR')
    const complexEditor = ref(null)
    const propFormData = reactive([])
    const mToolBoxOptions = ref({})
    const complexOkYn = ref(false)

    // Regacy: confirm pop
    const confirmPopVariable = reactive({
      errorText: '',
      failPopYn: false,
      checkPopYn: false
    })
    const confirmNo = () => {
      confirmPopVariable.checkPopYn = false
      complexOkYn.value = false
    }

    // ============ Regacy 함수 ===========
    const postToolBox = (toolBoxOption) => {
      // Regacy comment: toolbox에 들어간 option들을 formEditor에서 watch로 계속 넘겨받고 prop으로 넘겨주고 있습니다
      mToolBoxOptions.value = toolBoxOption
    }
    const changeFormEditorStyle = (changeParam) => {
      // Regacy Comment: toolbox에 기능 전부, 선택된 formEditor에 드레그 한 text로 처리를 하기에 ref로 접근해서 함수를 실행하고 있습니다.
      // Regacy Comment: bold, italic, underLine은 text만 넘겨줘도 기능이 작동하기에 따로 구분을 하지 않았습니다.
      const targetType = changeParam.type
      if (targetType === 'font') {
        complexEditor.value.changeFontSize(changeParam.size)
      } else if (targetType === 'delFormCard') {
        complexEditor.value.delFormCard()
      } else {
        complexEditor.value.changeTextStyle(targetType)
      }
    }
    let extractedInnerHtml = ''
    const setParamInnerHtml = (formCard) => {
      // console.log('=========== forCard whole body ===========', formCard)
      let extractedOuterHtml = ''
      for (let i = 0; i < formCard.length; i++) {
        extractedOuterHtml += formCard[i].outerHtml
        extractedInnerHtml += formCard[i].innerHtml
      }
      console.log(
        `=========== forCard Data =========== \n - inner: ${extractedInnerHtml}\n - outer: ${extractedOuterHtml}`
      )

      // 문자열을 파싱하여 DOM 요소로 만듭니다.
      const parser = new DOMParser()
      const doc = parser.parseFromString(extractedOuterHtml, 'text/html')

      // "contenteditable" 속성을 삭제합니다.
      const elements = doc.querySelectorAll(
        '[contenteditable], [placeholder], [autofocus], [formidx]'
      )
      for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('contenteditable')
        elements[i].removeAttribute('placeholder')
        elements[i].removeAttribute('autofocus')
        elements[i].removeAttribute('formidx')
      }

      // 수정된 HTML 문자열을 얻습니다.
      const modifiedHtmlString = doc.body.innerHTML
      console.log(modifiedHtmlString)

      params.bodyFullStr = modifiedHtmlString
      propFormData.length = 0
      propFormData.push(...formCard)
      // document.getElementById('msgBox').innerHTML = extractedInnerHtml
      // this.editorType = 'complex'
      complexOkYn.value = true
      if (contentType.value === 'ALIM') clickPageTopBtn()
      if (contentType.value === 'BOAR') boardDataCheck()
    }
    const clickPageTopBtn = async () => {
      // 취소를 누르거나 유효성 검사 (이 함수)에 통과하지 못하면 값을 다시 가져와야함. 그러므로 --> complexOkYn.value = false
      if (complexOkYn.value === false) {
        complexOkYn.value = true
        await complexEditor.value.setParamInnerHtml()
      } else {
        let titleValue = params.title
        titleValue = titleValue.trim()
        if (hasTitleYn.value) {
          if (
            titleValue !== undefined &&
            titleValue !== null &&
            titleValue !== ''
          ) {
          } else {
            // confirmPopVariable.errorText = this.$t('FORM_MSG_TITLE')
            confirmPopVariable.failPopYn = true
            complexOkYn.value = false
            return
          }
        }

        let msgData = ''
        msgData = document.getElementById('msgBox').innerText
        if (msgData) {
          msgData = msgData.trim()
        }
        if (
          (msgData !== undefined && msgData !== null && msgData !== '') ||
          tempFileList.length > 0
        ) {
        } else {
          // confirmPopVariable.errorText = this.$t('FORM_MSG_NOTI_NOCONT')
          confirmPopVariable.failPopYn = true
          complexOkYn.value = false
          return
        }
        confirmPopVariable.checkPopYn = true
      }
    }
    const boardDataCheck = () => {
      if (complexOkYn.value === false) {
        complexOkYn.value = true
        complexEditor.value.setParamInnerHtml()
      } else {
        let title = params.title
        title = title.trim()
        if (title !== undefined && title !== null && title !== '') {
        } else {
          // confirmPopVariable.errorText = this.$t('FORM_MSG_TITLE')
          confirmPopVariable.failPopYn = true
          complexOkYn.value = false
          return
        }
        var msgData = ''
        msgData = document.getElementById('msgBox').innerText
        if (msgData) {
          msgData = msgData.trim()
        }
        if (
          (msgData !== undefined && msgData !== null && msgData !== '') ||
          tempFileList.length > 0
        ) {
        } else {
          // confirmPopVariable.errorText = this.$t('FORM_MSG_POST_NOCONT')
          confirmPopVariable.failPopYn = true
          complexOkYn.value = false
          return
        }

        confirmPopVariable.checkPopYn = true
      }
    }
    const setTodoPageValue = () => {
      params.showCreNameYn = true
      params.canReplyYn = true
      hasTitleYn.value = true
    }
    setTodoPageValue()

    return {
      params,
      receiverList,
      showReceiverSelectList,
      toggleReceiverSelectPop,
      toggleRefsSelectPop,
      setSelectedRefList,
      selectNoRefs,
      toggleCheckSelectPop,
      setSelectedCheckList,
      selectNoCheck,
      selectAllReceivers: selectTargetOnlyMe,
      setSelectedTargetList,
      toggleAnonymousYn,
      toggleCommentYn,
      hasTitleYn,
      showRefsSelectList,
      showCheckSelectList,
      toggleTitleYn,
      stickerList,
      toggleSelectTag,
      tagListForDom,
      setAttachedFile,
      changeUploadList,
      postContents,
      mToolBoxOptions,
      postToolBox,
      changeFormEditorStyle,
      complexEditor,
      setParamInnerHtml,
      clickPageTopBtn,
      boardDataCheck,
      contentType,
      confirmNo,
      propsTargetNameEditing,
      openBtnWrap,
      delAttachFile,
      openBtnWrapYn,
      propAttachFileList,
      setTodoPageValue,
      selectMeYn,
      selectRefsYn,
      selectCheckYn,
      errorText,
      failPopYn,
      changePriority,
      addSelfTag,
      selfAddTag,
<<<<<<< .mine
      countLines
||||||| .r2488
      countLines,
      sendLetter,
      sendBoard,
      selectedPriority
=======
      countLines,
      sendLetter,
      sendBoard,
      selectedPriority,
      cabBlindYn,
      modiYn,
      selectBoard,
      selectBoardIndex,
      mCanWriteYn,
      writeBoardPlaceHolder,
      gCertiPopShowYn,
      cabinetName
>>>>>>> .r2489
    }
  }
})
</script>

<style lang="scss" scoped>
<<<<<<< .mine
||||||| .r2488

.titleInput{
  overflow-y:scroll; white-space:wrap;
  padding:10px 15px 15px;
  border:none;
  outline:none;
  background-color:#F1F1FF;
  outline:none;
  font-size:21px;
  height:50px;
  border-radius:10px;
}
.selectInput{
  height:35px;
  width:calc(100% - 52px);
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.selectPriority{
  padding:5px 10px !important;
  background-color:#F1F1FF !important;
  border-radius:5px !important;
  border:none !important;
}
=======

.titleInput{
  overflow-y:scroll; white-space:wrap;
  padding:10px 15px 15px;
  border:none;
  outline:none;
  background-color:#F1F1FF;
  outline:none;
  font-size:21px;
  height:50px;
  border-radius:10px;
}
.selectInput{
  height:35px;
  width:calc(100% - 62px);
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.selectPriority{
  padding:5px 10px !important;
  background-color:#F1F1FF !important;
  border-radius:5px !important;
  border:none !important;
}
>>>>>>> .r2489
.selfTagOpenFlex{
  flex-direction:column !important;
  align-items:start !important;
  gap:0.3rem;
}
.selfAddSaveBtn{
  word-break:keep-all;
  min-width:45px;
  height:25px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#7a7a7a;
  background-color:#f1f1ff;
  font-size:11px;
  border-radius:8px;
  border:2px solid #ccc;
}
.openSelfAddTagBtn{
  color:#7a7a7a;
  background-color:#f1f1ff;
  border-radius:8px;
  border:2px solid #ccc;
  padding:0;
  text-align:center;
  height:25px;
  min-width:20px;
}
// Common CSS
#layout {
  width: 90%;
  height: calc(100% - 120px);
  // padding: 16px 24px;
  overflow: hidden;
  min-height:500px;

  position: absolute;
  left: 50%;
  top: 5%;
  transform: translateX(-50%);

  z-index: 15;
  background-color: #f5f5f5;
  border-radius: 0.8rem;
}
button {
  min-width: 40px;
  min-height: 25px;
  padding: px 15px;

  color: #7a7a7a;
  word-wrap: break-word;

  background-color: #f1f1ff;
  border: 2px solid #ccc;
  border-radius: 8px;
  // & + button {
  // margin-left: 8px;
  // }
  &.activeBtn {
    border: 2.5px solid #5f61bd;
    color: #5f61bd;
    font-weight:bold !important;
    height:25px;
    line-height:20px;
  }
  &.closeBtn {
    border: none;
    background-color: none;
  }
}
h1,
label {
<<<<<<< .mine
  min-width: 72px;
||||||| .r2488
  min-width: 52px;
=======
  min-width: 62px;
>>>>>>> .r2489
  color: #5f61bd;
  font-weight: bold;
  text-align: start;
}
legend {
  display: none;
}
input,
textarea {
  border: 1px solid rgba(103, 104, 167, 0.27);
}
textarea {
  resize: none;
  width: 100%;
  padding: 15px;
  &::placeholder {
    margin: 20px;
  }
}
.btnWrap img {
  width: 16px;
}
// header & footer
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:1rem 1.5rem 0.5rem;
  border-bottom:1px solid #ccc;
  .HeaderbtnWrap{
    .saveBtn{
      font-size: 16px;
      padding: 7px 20px !important;
      margin-right:10px;
      line-height:1;
      border:none;
      &:first-child {
        background-color: #5f61bd;
        color: #fff;
      }
    }
    .closeBtn{
    padding: 3px;
    background-color: none;
    border: none;
    img {
      width: 18px;
    }
    }
  }
}
footer {
  border-top: 1px solid #ccc;
  width: 100%;
  text-align:center;
  // position:absolute;
  // bottom:30px;
  // left:50%;
  // transform:translateX(-50%);
  .footerBtnWrap {
    padding-top: 20px;
    button {
      font-size: 16px;
      padding: 3px 10px !important;
      font-weight: bold;
      &:first-child {
        background-color: #5f61bd;
        color: #fff;
      }
    }
  }
}

// Form CSS
main {
  height: calc(100% - 57px);
  overflow-y: auto;
  margin-top: 0.5rem;
  padding:0 1.5rem;

  form {
    height: auto;
  }
  form fieldset > fieldset {
    margin-top: 10px;
  }
  form > fieldset:nth-child(3) {
    margin-top: 10px;
    height: 60%;
    textarea {
      height: 100%;
    }
  }
  // fieldset > fieldset {
  //   margin-top: 10px;
  // }

  .selectReceiverBox,
  #optionToggleBtnWrap,
  #dateSelect,
  #categoryTag,
  #uploadFile {
    display: flex;
    justify-content: space-between;
    .tagBtnWrap {
      flex-wrap: wrap;
      // height: 30px;
      height:auto;
      overflow-y: hidden;
      flex-wrap: wrap;

      &.opened {
        height: auto !important;
      }
    }
    .openBtn {
      height: 25px;
      width: 25px;
      background-color: #f1f1ff;
      border: 2px solid #ccc;
      color: #7a7a7a;
      padding: 3px;
      border-radius: 8px;
      text-align: center;
      line-height: 17px;
      cursor: pointer;
    }
    .btnWrap,
    .dateBoxWrap {
      flex-grow: 1;
      display: flex;
      align-items: center;
<<<<<<< .mine
      justify-content: flex-start;
      width: calc(100% - 72px);
||||||| .r2488
      justify-content: space-between;
      width: calc(100% - 52px);
=======
      justify-content: space-between;
      width: calc(100% - 62px);
>>>>>>> .r2489
      gap: 3px;
      input {
        min-height: 30px;
        flex: 0 1 45%;
      }
      span {
        margin: 0 8px;
        flex-grow: 1;
      }
    }
  }
  #postReceivers, #postRefs, #postCheck {
    .selectedTargetList {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 35px;
      padding: 0 0 0 8px;
      margin-top: 5px;
<<<<<<< .mine
      margin-left: 72px;
||||||| .r2488
      margin-left: 52px;
=======
      margin-left: 62px;
>>>>>>> .r2489
      cursor: pointer;

      background-color: #fff;
      border: 1px solid rgb(204, 204, 204);
      border-radius: 8px;
      & > div {
        margin-right: 16px;
        img {
          width: 15px;
        }
      }
      .plusImgWrap {
        // position: absolute;
        // top: 50%;
        // right: 8px;
        // transform: translateY(-50%);
        width: 30px;
        height: 100%;
        background-color: #fff;
        margin-right: 0;
      }
      .plusImg {
        width: 20px;
      }
    }
  }
  #postTitle {
    display: flex;
    input {
      flex-grow: 1;
    }
  }
}

@media screen and (max-width: 850px) {
  .dateBoxWrap {
    // justify-content: space-between !important;
    input {
      flex: 0 1 40% !important;
    }
    span {
      flex-grow: 0.5 !important;
    }
  }
}

@media screen and (max-width: 650px) {
}

@media screen and (max-width: 600px) {
  label {
    font-size: 14px !important;
  }
  button {
    font-size: 11px !important;
  }
  .checkImg{
    width:10px !important;
  }
  .dateBoxWrap {
    gap: 0 !important;
    flex-grow: 0 !important;
    justify-content: space-between;
    input {
      flex: 0 1 44% !important;
    }
    span {
      flex-grow: 0 !important;
      font-size: 13px !important;
      // margin:0 !important;
    }
  }
}
</style>
