<template>
  <addPop
    v-if="mAddTodoPopShowYn"
    :pClosePop="closeAddTodoPop"
    :pSelectDate="mSelectDate"
    :pGetTodoFamilyList="mGetTodoFamilyList"
    :pGetTodoListGroupCab="getMyTodoList"
  />
  <detailPop
    v-if="mTodoDetailShowYn"
    :pClosePop="closeTodoDetail"
    :pSelectTodo="mSelectTodo"
    :pGetTodoList="getMyTodoList"
    :pCompleteTodo="completeTodo"
    :pGetTodoListGroupCab="getMyTodoList"
    :pGetTodoFamilyList="mGetTodoFamilyList"
    :pUpdateTodo="updateTodo"
    :pTodoDetail="mTodoDetail"
    :pMemoList="mMemoList"
  />
  <unibDetailPop v-if="mUniBTodoDetailPopShowYn" />
  <div class="popBg" v-if="mDeleteConfirmShowYn" @click="closeDeletePop"></div>
  <gConfirmPop
    v-if="mDeleteConfirmShowYn"
    :confirmText="mConfirmText"
    class=""
    confirmType="two"
    @ok="deleteTodo"
    @no="closeDeletePop"
  />
  <div class="popBg" v-if="mSetPopShowYn" @click="closeUpdatePop"></div>
  <setPop
    v-if="mSetPopShowYn"
    :pClosePop="closeUpdatePop"
    :pSelectTodo="mTodoObj"
    :pUpdateTodo="updateTodo"
    :pFamilyList="mFamilyList"
    :pGetTodoListGroupCab="getMyTodoList"
    style="z-index: 999"
  />
  <CommonAddMemo v-if="memoManagePop" @saveMemos="saveContents" @deleteMemo="deleteMemo" :pMemoIdx="mSelectedMemoIdx" :pClosePop="closeMemoManagePop" :pMemoList="GE_DISP_MEMO_LIST"/>
  <gReport
    v-if="mContMenuShowYn"
    @closePop="mContMenuShowYn = false"
    @report="report"
    @editable="editable"
    @editTodo="toggleEditPop"
    @bloc="bloc"
    :contentsInfo="CONT_DETAIL"
    :contentType="CONT_DETAIL.jobkindId"
    :contentOwner="this.GE_USER.userKey === CONT_DETAIL.creUserKey"
  />
  <div
    class="todoBody" @click="closeActorList()"
    :style="`padding-top: ${this.$STATUS_HEIGHT + 50}px !important;`"
  >
    <div
      style="
        height: 50px;
        border-bottom: 2px solid #6768a7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 5px;
      "
    >
      <!-- <div @click="goMain" class="fl cursorP mainHeaderBack">
        <img
          src="@/assets/images/common/icon_back.png"
          class="fl commonPopBackBtn mleft-05"
          width="12"
          height="20"
        />
      </div> -->
      <div class="commonTitleText dateAreaBox" style="padding: 0.5rem 0.6rem">
        <div class="calBox">
          <div
            class="cursorP"
            style="
              width: 34px;
              height: 44px;
              display: flex;
              align-items: center;
              justify-content: start;
            "
            @click="MoveDate(-1)"
          >
            <img
              src="../../assets/images/todo/purpleArrow.png"
              style="transform: rotateZ(180deg)"
              width="15"
              height="15"
            />
          </div>
          <Datepicker
            class="cursorP fl DatePicker contents"
            v-model:value="mSelectDate"
            :editable="false"
            type="date"
            format="YYYY-MM-DD (dd)"
          ></Datepicker>
          <div
            class="cursorP"
            style="
              width: 34px;
              height: 44px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
            "
            @click="MoveDate(1)"
          >
            <img
              class="cursorP"
              src="../../assets/images/todo/purpleArrow.png"
              width="15"
              height="15"
            />
          </div>
          <div style="min-width: 60px">
            <div
              class="fr fontBold cursorP addBtn"
              style="
                margin-right: -0.5rem;
                border-radius: 10px;
                width: 45px;
                color: #5f61bd;
                background-color: #fbfbfd;
              "
              @click.stop="goToday"
            >
              {{ $t('COMMON_TODO_TODAY') }}
            </div>
          </div>
        </div>
        <div
          class="btnWrap"
          @click="showCalendarView"
          style="display:flex; gap:0.5rem;s"
        >
          <div
            class="fr fontBold cursorP addBtn CDeepBgColor"
            style="
              width: auto;
              padding:0 5px;
              border-radius: 10px;
              color: white;
              background-color: #3d9aff;
            "
          >
          {{ $t('COMMON_TODO_CAL') }}
          </div>
        </div>
      </div>
      <!-- <div
        class="todoFilter"
        style="position: absolute; right: 0"
        :style="`top: ${this.$STATUS_HEIGHT + 55}px;`"
      >
        <div
          class="fr fontBold cursorP addBtn CDeepBgColor"
          @click="openAddTodoPop"
        >
          Add
        </div>
      </div> -->
      <!-- <span class="popHeaderTitleSpan font20 h100P" style="color: #6768A7; font-weight: bold; display: flex; justify-content: center; align-items: center;">Today's Todo</span> -->
    </div>
    <div style="width: 100%; height:calc(100vh - 100px); overflow: hidden auto;">
    <!-- <div style="width: 100%; height: 100%; overflow: hidden auto;"> 메모할떄 살려라-->
      <!-- <div class="dateArea" style="position: relative; ">
      <div class="commonTitleText dateAreaBox " >
        <div class="calBox" >
          <img class="cursorP" src="../../assets/images/todo/commonArrowBack.svg" width="30" height="40" @click="MoveDate(-1)"/>
          <Datepicker class="cursorP fl DatePicker" v-model:value="mSelectDate" :editable="false" type="date" :format="'MMM DD, YYYY'"></Datepicker>
          <img class="cursorP" src="../../assets/images/todo/commonArrowBack.svg" style="transform: rotateZ(180deg)" width="30" height="30" @click="MoveDate(1)"/>
        </div>
      </div>
      <div class="todoFilter " style="position: absolute; top: 10px; right: 0;">
        <div class="fr fontBold cursorP addBtn CDeepBgColor" @click="openAddTodoPop">Add</div>
      </div>
    </div> -->
      <div style="width: 100%; min-height: 30px; float: left; padding: 10px 10px;">
        <div style="width: 100%; min-height: 30px; margin-bottom: 5px; display: flex; align-items: flex-start; ">
          <!-- <img src="@/assets/images/common/DStickyIcon.svg" width="30" class="fl"  style="margin-right: 5px" alt="">
            <p class="fontBold fl h100P" style="line-height: 30px;font-size: 18px; color: #060505 !important">
              {{'메모'}}
            </p> -->
            <div class="okScrollBar" v-if="GE_DISP_MEMO_LIST.content" style="width: calc(100%); overflow: auto hidden; padding-bottom: 5px; padding-top:5px; height: 100%;">
              <!-- <div :style="`width: ${GE_DISP_MEMO_LIST.content && GE_DISP_MEMO_LIST.content.length > 0 ? 50 + GE_DISP_MEMO_LIST.content.length * 110 + 'px' : '100%'};`" style="height: 100%; overflow:auto hidden;"> -->
              <div class="w100P h100P" style="overflow:auto hidden; display:flex; align-items:start;">
                <!-- <template >
                  <commonStickyBox  class="fl mright-05 cursorP" style="width: 30%; " :style="showMemoYn? 'height: 110px;' : 'height: 30px;'" @click="goDetail(memo)" :pContentEle="memo" :pShowMemoYn="showMemoYn"/>
                </template> -->
                <template v-if="GE_DISP_MEMO_LIST.content && GE_DISP_MEMO_LIST.content.length > 0" >
                  <div style="width:calc(100%); padding-left:0; margin-bottom:0; margin-right:10px; text-align:left;">
                    <div class="memoTabWrap w100P" style="display:flex; align-items:center;">
                      <div style="width:100%; overflow-x:scroll; white-space:nowrap;">
                        <div v-for="(memo, mIndex) in GE_DISP_MEMO_LIST.content" :key="mIndex" class="memoTab" @click.stop="selectMemo(mIndex)" :class="{mSelectedMemo : mSelectedMemoIdx !== mIndex}">
                          {{memo.title}}
                          <!-- <span @click="goDetail(memo)" >z</span> -->
                        </div>
                        <div class="memoTab mSelectedMemo" @click="openMemoManagePop()">+</div>
                      </div>
                    </div>
                    <!-- <div v-if="showMemoYn" class="memoBody" @click="openWriteMemoPop(GE_DISP_MEMO_LIST.content[mSelectedMemoIdx])"> -->
                    <!-- <div v-if="showMemoYn" class="memoBody" @click="openWriteMemoPop(mSelectedMemoIdx)">/ -->
                    <div v-if="showMemoYn && this.mSelectedMemoIdx !== null" v-html="decodeContents(this.GE_DISP_MEMO_LIST.content[this.mSelectedMemoIdx].bodyFullStr)" class="memoBody" @click="openMemoManagePop(mSelectedMemoIdx)">
                    </div>
                    <!-- <div v-if="showMemoYn" class="memoBody">
                      <textarea v-model="mMemoBody" @input="memoAutoSave(GE_DISP_MEMO_LIST.content[mSelectedMemoIdx])" class="w100P" style="border:none; height:auto; outline:none;">
                      </textarea>
                    </div> -->
                  </div>
                </template>
                <img v-else-if="GE_DISP_MEMO_LIST.content && GE_DISP_MEMO_LIST.content.length === 0" src="@/assets/images/common/DStickyIcon.svg" width="30" class="fl"  style="margin-right: 5px" alt="">
                <p v-if="GE_DISP_MEMO_LIST.content && GE_DISP_MEMO_LIST.content.length === 0" class="fontBold fl h100P mright-05" style="text-align:left; line-height: 30px;font-size: 18px; color: #060505 !important">
                  {{$t('COMMON_TITLE_MEMO')}}
                </p>

                <div v-if="GE_DISP_MEMO_LIST.content && GE_DISP_MEMO_LIST.content.length === 0" @click="openMemoManagePop" :style="showMemoYn? 'height:110px' : 'height: 30px;'"  class="fl cursorP" style="width: 30px; float: left; border-radius: 10px; background: rgb(197 198 255); justify-content: center; font-size: 24px; font-weight: bold; display: flex; align-items: center;">+</div>
              </div>
            </div>
            <!-- <img v-if="GE_DISP_MEMO_LIST.content && GE_DISP_MEMO_LIST.content.length > 0" @click.stop="openMemoShow" :src="require(`@/assets/images/button/Icon_showMore.png`)" style="width: 30px;" class="cursorP fr" :style="showMemoYn?'transition: all ease 0.5s; transform: rotate( 180deg );' : ''"/> -->
        </div>
      </div>

      <div class="topWrap w100P" style="position:relative;">
        <div class="w100P" style="display:flex; flex-direction:column;">
          <div class="w100P" style="display:flex; align-items:center;">
            <div style="width: 70%">
          <div class="w100P h100P">
            <ul
              class="mainTabWrap w100P"
              style="
                padding: 0;
                background-color: #fff;
                display: flex;
                align-items: center;
                border-radius: 10px;
                margin-bottom: 0;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
              "
            >
              <li
                @click="selectedMainTabIdx(index)"
                :style="`width: ${100/mShowTab.length}%;`"
                :class="{ mainTodoTabSelected: mSelectedMainTabIdx === index }"
                class="mainTodoTab cursorP"
                v-for="(tab, index) in mShowTab"
                :key="index"
              >
                {{ tab.tabName }}
                <span
                  class="countTodo"
                  style="margin-left: -0.2rem; color: #5f61bd"
                  v-if="tab.tabIdx === 1"
                  > {{ mMyTodoCount + mCompleteMyTodoCount + mCheckTodoCount + mCompleteTargetTodoCount + mCompleteRefTodoCount + mRefTodoCount }}</span
                >
                <span
                  class="countTodo"
                  style="margin-left: -0.2rem; color: #5f61bd"
                  v-if="tab.tabIdx === 2"
                  > {{ mMyTodoCount + mCheckTodoCount + mRefTodoCount }}</span
                >
                <span
                  class="countTodo"
                  style="margin-left: -0.2rem; color: #5f61bd"
                  v-if="tab.tabIdx === 4"
                  > {{ mCompleteMyTodoCount + mCompleteTargetTodoCount + mCompleteRefTodoCount }}</span
                >
                <span
                  class="countTodo"
                  style="margin-left: -0.2rem; color: #5f61bd"
                  v-if="tab.tabIdx === 3"
                  >{{ mCompleteTargetTodoCount }}/{{
                    /* mReqTodoList.content? mReqTodoList.content.length + mCompleteTargetTodoCount : 0 */
                    mCheckTodoCount + mCompleteTargetTodoCount
                  }}</span
                >
              </li>
            </ul>
          </div>
            </div>
            <div
          class="functionIcons h100P"
          style="
            width: 30%;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <div class="todoArrange cursorP "  @click="openSearchArea('arrange')" style="width:40%;display:flex; flex-direction: column; justify-content: center; align-items: center;">
            <svg
              style="width: 25px; height: 30px"
              viewBox="0 0 30 25"
              fill="rgb(96, 97, 190);"
            >
              <path
                d="M11.7,9.7c-0.2,0.2-0.4,0.3-0.6,0.3H8v9c0,0.6-0.4,1-1,1s-1-0.4-1-1v-9H2.9C2.4,10,2,9.6,2,9.1c0-0.2,0.1-0.5,0.3-0.6l4.1-4.1C6.7,4,7.3,4,7.6,4.3l0,0l4.1,4.1C12.1,8.8,12.1,9.4,11.7,9.7z M21.7,14.3c-0.2-0.2-0.4-0.3-0.6-0.3H18V5c0-0.6-0.4-1-1-1s-1,0.4-1,1v9h-3.1c-0.5,0-0.9,0.4-0.9,0.9c0,0.2,0.1,0.5,0.3,0.6l4.1,4.1c0.4,0.4,0.9,0.4,1.3,0l0,0l4.1-4.1C22.1,15.2,22.1,14.6,21.7,14.3z"
              ></path>
            </svg>
            <!-- <span class="font12 fl">{{ mArrangeTab[mArrangeTabIdx].tabName }}</span> -->
          </div>
          <div style="width:50%;" class="cursorP"  @click="mFilterPopShowYn = true">
            <svg
              style="width: 25px; height: 25px"
              viewBox="0 0 35 35"
              fill="rgb(96, 97, 190);"
            >
              <path
                d="M25,4c-2.4,0-4.4,1.7-4.9,4H4C3.4,8,3,8.4,3,9s0.4,1,1,1h16.1c0.5,2.3,2.5,4,4.9,4c2.8,0,5-2.2,5-5S27.8,4,25,4z M25,12c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S26.7,12,25,12z M27,20H11.9c-0.5-2.3-2.5-4-4.9-4c-2.8,0-5,2.2-5,5s2.2,5,5,5c2.4,0,4.4-1.7,4.9-4H27c0.6,0,1-0.4,1-1S27.6,20,27,20z M7,24c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S8.7,24,7,24z"
              ></path>
            </svg>
          </div>
          <div v-if="mFilterPopShowYn" class="backgroundShadow" @click="$refs.filterPop.backClick()" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 98;"></div>
          <commonFilterPop :pRequestSearch="reqSearchList" v-if="mFilterPopShowYn" :pCloseFilterPop="closeFilterPop" ref="filterPop" :pFilterList="mTodoFilterList" id="todoFilter" style="position: fixed; z-index: 99; top: 30%;right: calc(50% - 130px);"/>
          <!-- <div class="todoSearch cursorP" @click="openSearchArea('search')" style="width:40%;">
            <svg
              style="width: 25px; height: 25px"
              viewBox="0 0 40 40"
              fill="rgb(96, 97, 190);"
            >
              <path
                d="M29.707,28.293l-8.256-8.256C23.042,18.13,24,15.677,24,13c0-6.075-4.925-11-11-11S2,6.925,2,13s4.925,11,11,11c2.677,0,5.13-0.958,7.037-2.549l8.256,8.256L29.707,28.293z M4,13c0-4.963,4.037-9,9-9c4.963,0,9,4.037,9,9s-4.037,9-9,9C8.037,22,4,17.963,4,13z"
              ></path>
            </svg>
          </div> -->
            </div>
          </div>
        <div v-if="searchAreaYn" class="w100P" style="padding:0 ; justify-content:space-between; display:flex; align-items:center; background-color:#E7EDFF; height:50px;">
          <template v-if="mWhichType === 'arrange'">
            <div class="w100P mtop-05">
              <div style="display:flex; align-items:center; padding:0 ; height:50px;">
                <ul class="w100P cursorP" style="border-radius:10px; height:80%; background-color:#fff; margin-bottom:0; display:flex; align-items:center; justify-content:space-around; padding:0 !important;">
                  <li @click="arrayChange(index)" v-for="(tab, index) in mArrangeTab" :key="index" :class="{selected :mArrangeTabIdx === index }" class="arrangeBtn font13" >{{ tab.tabName }}{{ (index === 0 && !mPriorityDescYn) || (index === 1 && !mSearchDateDescYn) ? '↑' : (index === 0 && mPriorityDescYn) || (index === 1 && mSearchDateDescYn)?  '↓' : ''}}</li>
                </ul>
              </div>
            </div>
          </template>
          <template v-if="mWhichType === 'search'">
            <input type="text" v-model="searchValue" style="width:calc(100% - 40px); cursor:auto;" />
            <div class="cursorP" style="" @click="getSearchResult(searchValue)">
              <svg
                style="width: 25px; height: 25px"
                viewBox="0 0 40 40"
                fill="rgb(96, 97, 190);"
              >
                <path
                  d="M29.707,28.293l-8.256-8.256C23.042,18.13,24,15.677,24,13c0-6.075-4.925-11-11-11S2,6.925,2,13s4.925,11,11,11c2.677,0,5.13-0.958,7.037-2.549l8.256,8.256L29.707,28.293z M4,13c0-4.963,4.037-9,9-9c4.963,0,9,4.037,9,9s-4.037,9-9,9C8.037,22,4,17.963,4,13z"
                ></path>
              </svg>
            </div>
        </template>
        </div>
        </div>
      </div>
      <!-- <div v-if="mDispStickerList && mShowStickerListYn" style="overflow-x: auto; overflow-y: hidden; width: 100%; height: 30px; padding: 5px 10px;">
        <div style="min-width: 100%; " :style="`width: ${mDispStickerList.length * 50}px`">
          <div class="fl mright-05 todoTag" :style="` margin-top: 0px;background: #5F61BD;border: 2.5px solid  #5F61BD;`" :key="index">전체</div>
          <div v-for="(sticker, index) in mDispStickerList" class="fl mright-05 todoTag" :style="(sticker.selectedYn? 'border: 2.5px solid  #5F61BD;' : '') + `line-height: 17px; margin-top: 0px;background: ${sticker.picBgPath}`" :key="index">{{ $changeText(sticker.nameMtext) }}</div>
        </div>
      </div> -->
      <div v-if="GE_DISP_SEARCH_LIST && GE_DISP_SEARCH_LIST.length > 0" style="padding:8px 0; border-bottom: 1px solid rgb(103 104 167); overflow-x: auto; overflow-y: hidden; width: calc(100% - 20px); min-height: 30px; margin: 5px 10px; display:flex; align-items:top;">
        <p class="font14 fl mright-05 fontBold h100P" style="white-space:nowrap;">검색: </p>
        <div style="min-width: calc(100% - 30px); display:flex; align-items:center; gap:0.2rem; flex-wrap:wrap;" :style="`width: ${GE_DISP_SEARCH_LIST.length * 70}px`">
          <template v-for="(search) in GE_DISP_SEARCH_LIST" :key="search.value">
            <div @click="changeSearchList(search)" class="fl todoTag cursorP" style="margin-bottom:0;" :style="search.value.accessColor? `background: ${search.value.accessColor}` : 'background: #5f61bd '">{{ $changeText(search.title)}}: {{ $changeText(search.value.accessName)}} x</div>
          </template>
        </div>
      </div>
      <div v-if="mSkeletonShowYn" style="padding: 15px; float: left; width: 100%;">
        <SkeletonBox
          style="border-radius: 10px"
          v-for="value in [0, 1, 2]"
          :key="value"
        />
      </div>
      <!-- <div
        v-else-if="
          mMyTodoList.length === 0 &&
          mCompleteTodoCount === 0
        "
        class="fontBold"
        style="
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100% - 300px);
          color: #6768a7;
        "
      >
        등록된 일이 없습니다.
      </div> -->
      <div v-else class="contentsBody">
        <template v-for="(group, groupIndex) in GE_DISP_LIST" :key="groupIndex">
        <template v-if="group.list.content.length > 0 && (groupIndex === 3 || (groupIndex === 2 && mRefTodoCount !== 0) || (groupIndex === 0 && mMyTodoCount !== 0) || ((groupIndex === 1 && mCheckTodoCount !== 0)))">
          <div
            :id="`todoGroup${groupIndex}`"
            class="fontBold"
            style="
              text-align: left;
              padding: 5px 15px;
              padding-bottom: 0;
              display: flex;
              align-items: center;
            "
          >
            <img
              src="../../../public/resource/menu/icon_board_color.svg"
              width="20"
              style="margin-right: 5px"
            />
            <p style="font-size: 18px; color: #060505 !important">
              {{group.listName}} ({{ group.list? group.list.content.length : ''}})
            </p>
          </div>
          <div style="padding: 5px 10px;">
            <div
              class="backShadow"
              style="
                padding: 10px;
                background: #fff;
                border-radius: 10px;
                border-left: 10px solid rgb(109 109 109);
              "
              :style="(group.listName === this.$t('COMMON_TODO_MYTODO') ? 'border-left: 10px solid rgb(247 161 120);' : ';') + (group.listName === this.$t('COMMON_TODO_CHECK')? 'border-left: 10px solid rgb(99 203 223);' : ';') + (group.listName === this.$t('COMMON_TODO_PUBLIC')? 'border-left: 10px solid rgb(198, 106, 106);' : ';')"
            >
              <template v-for="(todo, todoIndex) in group.list.content" :key="todo.contentsKey" >
                <todoContentsBox :pGeUser="GE_USER" :pTodoElement="todo" :pTodoIndex="todoIndex" :pClickSticker="clickSticker" :pOpenDetail="goDetail" :pGroupIndex="groupIndex" :pSetCompleteTodo="reqCompleteTodo" :pClickPriority="clickPriority" :pOpenActorList="openActorList" :pGroup="group" :pGoUserProfile="goUserProfile" />
              </template>
              <!-- 한 박스-->
              <!-- // -->
            </div>
          </div>
        </template>
      </template>
      </div>
    </div>
    <div data-v-fa123200="" class="fl" style="width: 40px; height: 40px; border-radius: 100%; position: absolute; bottom: 6rem; right: 50px; z-index: 14;">
      <img id='writeBtn' src="../../assets/images/button/Icon_WriteTodo.png" @click="openAddTodoPop" alt="게시글 작성 버튼" style="width:66px; height:66px; cursor: pointer;">
    </div>
  </div>
  <div class="popBg" v-if="mWritePopShowYn || memoManagePop"></div>
  <!-- <transition name="show_right"> -->
  <CommonAddContentsForm
    style="z-index: 13"
    v-if="mWritePopShowYn"
    :pClosePop="closeWritePop"
    :pPostContentsFn="saveContents"
    :pGetReceiverList="returnTargetData"
    :pGetTagListFn="returnTag"
    :pReloadList="refreshTargetData"
    :pOptions="mOption"
    :pUserInfo="GE_USER"
    :popUpType="mPopupType"
    :pMemoYn="memoYn"
    @deleteMemo="deleteMemo"
    @openPop="openPop"
  />
  <div v-if="mCommentPopShowYn" class="backgroundShadow" @click="$refs.memoCommentTag.backClick()" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 98;"></div>
  <completeTodoPop :pCompleteTodo="setCompleteTodo" :pCloseCompletePop="closeCompletePop" ref="memoCommentTag"  v-if="mCommentPopShowYn && reqCompleteTodoTarget" :pTodoElement="reqCompleteTodoTarget"/>
  <!-- </transition> -->
  <div class="popBg" v-if="mOpenMenuShowYn" @click="closeSubMenu"></div>
  <div v-show="mOpenMenuShowYn" class="reportCompoArea">
    <div class="fl memoFuncArea">
      <p class="fl font16 w100P commonColor rowText" @click="openUpdatePop">
        Edit
      </p>
      <p class="fl font16 w100P menuListBase rowText" @click="openDeletePop">
        Delete
      </p>
    </div>

    <div class="fl mtop-05 closeReportBtn" @click="closeSubMenu">
      <p class="fl font16 w100P commonColor">Cancel</p>
    </div>
  </div>
</template>

<script>
import commonFilterPop from './D_commonFilterPop.vue'
// import commonStickyBox from '../../components/common/D_commonStickyBox.vue'
import addPop from '../../components/pageComponents/todo/addPop.vue'
import unibDetailPop from '../../components/pageComponents/todo/unibDetailPop.vue'
import detailPop from '../../components/pageComponents/todo/detailPop.vue'
import setPop from '../../components/pageComponents/todo/setPop.vue'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import todoContentsBox from './D_todoContentsBox.vue'
import { commonMethods } from '../../assets/js/Tal_common'
import SkeletonBox from '../../components/pageComponents/push/D_contentsSkeleton.vue'
import CommonAddContentsForm from '../../components/write/CommonAddContentsForm.vue'
import completeTodoPop from './D_completeTodoPop.vue'
import CommonAddMemo from '../../components/write/CommonAddMemo.vue'

export default {
  components: {
    Datepicker,
    addPop,
    detailPop,
    setPop,
    unibDetailPop,
    SkeletonBox,
    commonFilterPop,
    // commonStickyBox,
    todoContentsBox,
    completeTodoPop,
    CommonAddContentsForm,
    CommonAddMemo
  },
  props: {
    pNoAuthYn: {},
    setTagFontColor: Function
  },
  data () {
    return {
      mCommentPopShowYn: false,
      reqCompleteTodoTarget: null,
      showMemoYn: false,
      mFilterPopShowYn: false,
      mPopupType: 'TODO',
      mTodoFilterList: [
        { title: '담당자', searchType: 'RV', type: 'S', value: null, selectList: [] },
        { title: '태그', searchType: 'SK', type: 'S', value: null, selectList: [{ accessKey: 1, accessName: '태그' }, { accessKey: 1, accessName: '태그2' }] },
        { title: '우선순위', searchType: 'PR', type: 'S', value: null, selectList: [{ accessKey: '02', accessName: '낮음', accessColor: 'rgb(232, 238, 254)' }, { accessKey: '01', accessName: '보통', accessColor: 'rgb(59, 107, 240)' }, { accessKey: '00', accessName: '높음', accessColor: 'rgb(15, 47, 135)' }] },
        { title: '상태', searchType: 'ST', type: 'S', value: null, selectList: [{ accessKey: '00', accessName: '진행' }, { accessKey: '99', accessName: '완료' }] }
      ],
      mPriorityDescYn: false,
      mSearchDateDescYn: true,
      mAllActorList: [], // {accessName, accessKey, accessKind, iconPath, }
      mShowStickerListYn: false,
      mDispStickerList: [],
      mParamStickerList: [],
      mParamPriority: '',
      mMyTodoList: {},
      mMyMemoList: { totalElements: 0, content: [] },
      mRefTodoList: { totalElements: 0, content: [] },
      mCheckTodoList: { totalElements: 0, content: [] },
      // mReqTodoList: {},
      mCompTodoList: {},
      mSelectDate: '',
      mTodosideMenu: false,
      // mGetTodoGroupList: [],
      mCompleteTodoCount: 0,
      mCompleteMyTodoCount: 0,
      mCompleteRefTodoCount: 0,
      mCompleteTargetTodoCount: 0,
      mAddTodoPopShowYn: false,
      mGetTodoFamilyList: [],
      mTodoDetailShowYn: false,
      mTodoObj: {},
      mOpenMenuShowYn: false,
      mSetPopShowYn: false,
      mFamilyList: [],
      mTodoDetail: {},
      mMemoList: [],
      mUniBTodoDetailPopShowYn: false,
      mActorAfter: [],
      mNewActorList: [],
      mTargetDataList: [],
      mOption: {
        model: 'mankik',
        purpose: 'Add ToDo',
        fileServerURL: 'https://mzoin.com/fileServer/tp.uploadFile'
      },
      mWritePopShowYn: false,
      mOpenActorListYn: false,
      mOpenActorListIndex: -1,
      mGetWhichTodoIndex: -1,
      mIsSameDay: 0,
      mSelectedMainTabIdx: 0,
      mShowTab: [
        { tabIdx: 1, tabVal: 'A', tabName: this.$t('COMMON_TODO_ALL'), todoList: [this.mMyTodoList, this.mCheckTodoList, this.mCompTodoList] },
        { tabIdx: 2, tabVal: 'M', tabName: this.$t('COMMON_TODO_ING'), todoList: [this.mMyTodoList] },
        /* { tabIdx: 3, tabVal: 'R', tabName: this.$t('COMMON_TODO_CHECK'), todoList: [this.mCheckTodoList] }, */
        { tabIdx: 4, tabVal: 'C', tabName: this.$t('COMMON_TODO_COMPLETED'), todoList: [this.mCompTodoList] }
      ],
      innerWidth: window.innerWidth,
      mSkeletonShowYn: true,
      searchAreaYn: false,
      mWhichType: '',
      searchValue: '',
      firstYn: true,
      mArrangeTab: [
        { tabIdx: 1, tabVal: 'PH', tabName: '우선순위' },
        /*  { tabIdx: 2, tabVal: 'PL', tabName: '우선순위' }, */
        { tabIdx: 3, tabVal: 'RE', tabName: '목표일' },
        /* { tabIdx: 4, tabVal: 'OL', tabName: '목표일↓' }, */
        { tabIdx: 5, tabVal: 'TG', tabName: '태그별' }
      ],
      mArrangeTabIdx: 0,
      mSortOrder: 0,
      memoYn: false,
      mSelectedMemoIdx: null,
      // mMemoBody: '',
      autoSaveTimer: null,
      mMemoParams: 0,
      mCheckerYn: Boolean,
      memoManagePop: false
      // geDispList: []
    }
  },
  created () {
    console.log('setTagFontColor', this.setTagFontColor)
    if (this.GE_USER.unknownYn) {
      this.$router.push('/')
    }
    this.$emit('changePageHeader', this.$t('COMMON_NAME_TODOLIST'))
    const todoObject = {
      teamKey: 0
    }
    this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [todoObject])
    this.mSelectDate = new Date()
  },
  mounted () {
    window.addEventListener('resize', this.setTitleThreeLine)
  },
  methods: {
    openMemoManagePop (index) {
      if (index !== undefined) this.mSelectedMemoIdx = index
      else this.mSelectedMemoIdx = null
      this.memoManagePop = true
      this.mPopupType = 'MEMO'
    },
    closeMemoManagePop () {
      this.memoManagePop = false
    },
    async deleteMemo (data) {
      console.log('delete memo data', data)
      var inParam = {}
      inParam.mccKey = data.mccKey
      inParam.contentsKey = data.contentsKey
      inParam.jobkindId = 'MEMO'
      inParam.deleteYn = true
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.deleteContents',
        param: inParam
      })
      if (result) {
        this.$showToastPop(`${this.$t('COMMON_MSG_DELETED_MEMO')}`)
        this.mWritePopShowYn = false
        this.getMyTodoList()
      } else {
        this.$showToastPop(`${this.$t('COMMON_MSG_FAILED')}`)
      }
    },
    selectMemo (index) {
      this.mSelectedMemoIdx = index
      if (this.mSelectedMemoIdx != null) {
        this.showMemoYn = true
        // this.mMemoBody = this.GE_DISP_MEMO_LIST.content[this.mSelectedMemoIdx]
      }
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      console.log('changeText', changeText)
      return changeText
    },
    openMemoShow () {
      this.showMemoYn = !this.showMemoYn
      if (this.showMemoYn === true) {
        this.selectMemo(0)
      } else if (this.showMemoYn === false) {
        this.selectMemo(-1)
      }
    },
    closeCompletePop (updateYn) {
      if (updateYn) {

      } else {
      }
      this.mCommentPopShowYn = !this.mCommentPopShowYn
      this.reqCompleteTodoTarget = null
    },
    reqCompleteTodo (data) {
      if (data.contStatus === '00') {
        this.reqCompleteTodoTarget = data
        this.mCommentPopShowYn = !this.mCommentPopShowYn
      } else {
        this.completeTodo(data)
      }
    },
    openWriteMemoPop (data) {
      if (data) {
        this.mMemoParams = data
        this.mOption.purpose = 'Manage Memo'
      } else {
        this.mOption.purpose = 'Add Memo'
      }
      this.memoYn = true
      this.mPopupType = 'MEMO'
      this.mWritePopShowYn = true
    },
    openPop (params) {
      console.log(params)
      this.$emit('openPop', params)
    },
    reqSearchList (searchList) {
      searchList.forEach(search => {
        const index = this.mTodoFilterList.findIndex((s) => s.searchType === search.searchType)
        if (index !== -1) {
          this.mTodoFilterList[index].value = search
        }
      })
    },
    closeFilterPop () {
      this.mFilterPopShowYn = false
    },
    getSearchResult (value) {
      console.log('searchValue = value', value)
    },
    arrayChange (index) {
      this.mArrangeTabIdx = index
      let orderbyStr = ''
      // let geDispList = JSON.parse(JSON.stringify(this.GE_DISP_LIST))
      if (index === 0) {
        this.mPriorityDescYn = !this.mPriorityDescYn
        // 우선순위 순
        // orderbyStr = 'r.recentKey IS NOT NULL DESC, sk.nameMtext DESC, c.contStatus, c.priority, c.workToDate DESC'
        if (!this.mPriorityDescYn) {
          orderbyStr = ' c.priority, sk.nameMtext DESC, c.contStatus, c.workToDate DESC'
        } else if (this.mPriorityDescYn) {
          orderbyStr = ' c.priority DESC, sk.nameMtext DESC, c.contStatus, c.workToDate DESC'
        }
      } else if (index === 1) {
        this.mSearchDateDescYn = !this.mSearchDateDescYn
        // 최신순 or 오래된 순
        if (!this.mSearchDateDescYn) {
          orderbyStr = 'c.workToDate DESC, sk.nameMtext DESC, c.contStatus, c.priority '
        } else if (this.mSearchDateDescYn) {
          orderbyStr = 'c.workToDate, sk.nameMtext DESC, c.contStatus, c.priority '
        }
        /* const sortedLists = geDispList.map(item => {
          const geDisList = item.list.content
          const sortedList = geDisList.slice().sort((a, b) => {
            return this.sortOrder * (new Date(b.creDate) - new Date(a.creDate))
          })
          return { ...item, list: { ...item.list, content: [...sortedList] } }
        })
        geDispList = sortedLists */
      } else {
        orderbyStr = 'r.recentKey IS NOT NULL DESC, sk.nameMtext DESC, c.contStatus, c.priority, c.workToDate DESC'
      }
      this.getMyTodoList(orderbyStr)
      /* const sortedLists = geDispList.map(item => {
          const geDisList = item.list.content
          const sortedList = geDisList.slice().sort((a, b) => {
            if (this.mArrangeTabIdx === 0) {
              return a.priority.localeCompare(b.priority)
            } else if (this.mArrangeTabIdx === 1) {
              return b.priority.localeCompare(a.priority)
            }
          })
          return { ...item, list: { ...item.list, content: [...sortedList] } } */
      // })
    },
    openSearchArea (type) {
      this.searchAreaYn = !this.searchAreaYn
      this.mWhichType = type
      console.log('this.mWhichType', this.mWhichType)
    },
    closeSearchArea () {
      this.searchAreaYn = false
    },
    changeSearchList (search) {
      const index = this.mTodoFilterList.findIndex((item) => item.searchType === search.searchType)
      if (index !== -1) {
        this.mTodoFilterList[index].value = null
      }
      console.log(this.mTodoFilterList[index])
    },
    clickSticker (data, event) {
      const sIndex = this.GE_STICKER_FILTER_LIST.findIndex((s) => s.accessKey === data.stickerKey)
      console.log(sIndex)
      if (sIndex === -1) return
      const index = this.mTodoFilterList.findIndex((s) => s.searchType === 'SK')
      if (index !== -1) {
        if (this.mTodoFilterList[index]) {
          this.mTodoFilterList[index].value = this.GE_STICKER_FILTER_LIST[sIndex]
        }
      }
      /*
      let addYn = false
      if (this.mParamStickerList.length > 0) {
        if (this.mParamStickerList.findIndex((s) => s.stickerKey === data.stickerKey) === -1) {
          this.mParamStickerList.unshift(data)
          addYn = true
        }
      } else {
        this.mParamStickerList.push(data)
        addYn = true
      }
      if (addYn) {
        this.getMyTodoList()
      }
      console.log('this.mParamStickerListthis.mParamStickerList', this.mParamStickerList) */
    },
    clickPriority (priority) {
      let value = { accessKey: '00', accessName: '높음', accessColor: 'rgb(15, 47, 135)' }
      if (priority === '01') {
        value = { accessKey: '01', accessName: '보통', accessColor: 'rgb(59, 107, 240)' }
      } else if (priority === '02') {
        value = { accessKey: '02', accessName: '낮음', accessColor: 'rgb(232, 238, 254)' }
      }
      const index = this.mTodoFilterList.findIndex((s) => s.searchType === 'PR')
      if (index !== -1) {
        if (this.mTodoFilterList[index]) {
          this.mTodoFilterList[index].value = value
        }
      }
    },
    async showCalendarView () {
      // 기간별 데이터 searchFromDate searchTodDate
      const openPopParam = {}
      openPopParam.targetType = 'iframePop'
      openPopParam.popHeaderText = this.$t('COMMON_TODO_CALENDAR')
      openPopParam.targetUrl = 'https://mankik.com/mkSche'
      openPopParam.id = 'testSumin'
      openPopParam.initData = {
        searchToDateStr: this.getToday(this.mSelectDate)
      }
      this.$emit('openPop', openPopParam)
    },
    listenerFunc (data) {
      console.log(data)
    },
    setTitleThreeLine () {
      var titleElements = document.querySelectorAll('.realTitle')

      titleElements.forEach((titleElement) => {
        var lineHeight = titleElement.getBoundingClientRect()
        var lineHeightNum = parseInt(lineHeight.height)
        var maxHeight = 60

        if (lineHeightNum > maxHeight) {
          titleElement.classList.add('infoTitle')
        } else {
        }

        setTimeout(() => {
          if (titleElement.offsetHeight > 0) {
            var lineHeight = titleElement.getBoundingClientRect()
            var lineHeightNum = parseInt(lineHeight.height)

            var maxHeight = 60

            if (lineHeightNum > maxHeight) {
              titleElement.classList.add('infoTitle')
            }
            if (lineHeightNum < maxHeight) {
              titleElement.classList.remove('infoTitle')
            }
          } else {
            setTimeout(this.setTitleThreeLine, 100)
          }
        }, 100)
      })
    },
    selectedMainTabIdx (index) {
      this.mSelectedMainTabIdx = index
      // this.getMyTodoList()
    },
    goToday () {
      this.mSelectDate = new Date()
    },
    async goUserProfile (targetUserKey) {
      console.log('targetUserKey', targetUserKey)
      if (this.GE_USER.unknownYn) {
        this.$showToastPop(`${this.$t('COMM_MSG_NOPERM')}`)
        return
      }
      if (targetUserKey.accessKind !== 'U') return
      var openPopParam = {}
      openPopParam.targetType = 'bookMemberDetail'
      openPopParam.userKey = targetUserKey.accessKey

      // 댓글의 유저를 클릭 시 댓글의 유저키를 넣어준다.
      if (targetUserKey) openPopParam.userKey = targetUserKey.accessKey
      openPopParam.popHeaderText = this.$t('COMMON_TITLE_PROFILE')
      openPopParam.readOnlyYn = true
      this.$emit('openPop', openPopParam)
    },
    clickFileDownload () {
      return false // 추후 수정
    },
    openActorList (actorIndex, whichTodoIndex) {
      this.mOpenActorListIndex = actorIndex
      this.mGetWhichTodoIndex = whichTodoIndex
      this.mOpenActorListYn = !this.mOpenActorListYn
    },
    closeActorList () {
      this.mOpenActorListYn = false
    },
    getHowLate (toDate, endDate = new Date()) {
      const howLate = new Date(endDate).getTime()
      const toDateNew = new Date(toDate).getTime()
      const timeDifference = howLate - toDateNew
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      return daysDifference
    },
    goDetail (value) {
      var param = {}
      param.targetType = 'contentsDetail'
      param.targetKey = value.contentsKey
      param.popHeaderText = this.$t('COMMON_NAME_TODOLIST')
      param.teamKey = 0
      param.creTeamKey = 0
      param.jobkindId = value.jobkindId
      // param.creTeamKey = value.creTeamKey
      param.value = value
      value.readYn = 1
      param.readYn = value.readYn
      this.$emit('goDetail', param)
    },
    closeXPop (popId) {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$checkDeleteHistory(popId)
    },
    closeWritePop () {
      this.closeXPop('writeContents')
      this.mWritePopShowYn = false
    },
    async saveContents (params) {
      console.log('save Contents params', params)
      if (this.mPopupType === 'MEMO') {
        params.jobkindId = 'MEMO'
      } else {
        params.jobkindId = 'TODO'
        if (params.actorList) {
          const tempList = [...params.actorList]
          const actorList = []
          tempList.forEach((val) => {
            if (val.accessKind === 'F') {
              if (val.cList) {
                val.cList.forEach(val2 => {
                  actorList.push({
                    accessKey: val2.accessKey,
                    accessKind: val2.accessKind,
                    actType: val.actType
                  })
                })
              }
            } else {
              actorList.push({
                accessKey: val.accessKey,
                accessKind: val.accessKind,
                actType: val.actType
              })
            }
          })
          params.actorList = actorList
        }
      }
      params.creUserKey = this.GE_USER.userKey
      params.creUserName = this.$changeText(this.GE_USER.userDispMtext)

      const res = await this.$saveContents(params)
      if (res.result) {
        const newParam = {}
        let nonLoadingYn = false
        newParam.contentsKey = res.contents.contentsKey
        if (this.mPopupType === 'MEMO') {
          newParam.jobkindId = 'MEMO'
          nonLoadingYn = true
        } else {
          newParam.jobkindId = 'TODO'
        }

        await this.$getContentsList(newParam, nonLoadingYn).then(newReslute => {
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', newReslute.content)
          console.log('newReslutenewReslute', newReslute)
        })
        if (res.sticker) {
          await this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', res.sticker)
        }
      }
      this.closeWritePop('WriteContents', this.closeWritePop)
      // this.closeMemoManagePop()
    },
    returnTag () {
      return this.GE_STICKER_LIST
    },
    openUniBTodoDetail () {
      // var param = {}
      // param.targetType = 'contentsDetail'
      // param.targetKey = 1011783
      // this.$emit('openPop', param)
      this.$router.push('/todo/1011783/934/13624')
    },
    closeUniBTodoDetail () {
      this.mUniBTodoDetailPopShowYn = false
    },
    checkTarget (value) {
      if (!value.actorList || value.actorList.length === 0) return 'none'
      if (value.creUserKey !== this.GE_USER.userKey) {
        if (value.contStatus === '00') {
          return 'my'
        } else {
          return 'completedMy'
        }
      } else {
        for (let i = 0; i < value.actorList.length; i++) {
          if (value.actorList[i].mUserList) {
            for (let j = 0; j < value.actorList[i].mUserList.length; j++) {
              if (
                value.actorList[i].mUserList[j].accessKey ===
                this.GE_USER.userKey
              ) {
                if (value.contStatus === '00') {
                  return 'my'
                } else {
                  return 'completedMy'
                }
              }
            }
          } else {
            if (value.actorList[i].accessKey === this.GE_USER.userKey) {
              if (value.contStatus === '00') {
                return 'my'
              } else {
                return 'completedMy'
              }
            }
          }
        }
        if (value.contStatus === '00') {
          return 'check'
        } else {
          return 'completedTarget'
        }
      }
    },
    async setCompleteTodo (value, memoComment) {
      await this.completeTodo(value, memoComment)
      if (this.$refs.memoCommentTag) {
        this.$refs.memoCommentTag.backClick()
      }
      // const tab = this.mShowTab[this.mSelectedMainTabIdx]
      // let target = tab.tabVal
      // if (tab.tabVal === 'A') {
      //   if (groupIndex === 0) {
      //     target = 'M'
      //   } else if (groupIndex === 1) {
      //     target = 'R'
      //   } else if (groupIndex === 2) {
      //     target = 'C'
      //   }
      // }
      // if (target === 'M') {
      //   if (value.contStatus === '00') {
      //     this.mMyTodoList.content[todoIndex].contStatus = '99'
      //     this.mCompTodoList.content.unshift(this.mMyTodoList.content[todoIndex])
      //   } else if (value.contStatus === '99') {
      //     this.mMyTodoList.content[todoIndex].contStatus = '00'
      //   }
      // } else if (target === 'R') {
      //   if (value.contStatus === '00') {
      //     this.mReqTodoList.content[todoIndex].contStatus = '99'
      //     this.mCompTodoList.content.unshift(this.mReqTodoList.content[todoIndex])
      //   } else if (value.contStatus === '99') {
      //     this.mReqTodoList.content[todoIndex].contStatus = '00'
      //   }
      // } else if (target === 'C') {
      //   if (value.contStatus === '00') {
      //     this.mCompTodoList.content[todoIndex].contStatus = '99'
      //   } else if (value.contStatus === '99') {
      //     this.mCompTodoList.content[todoIndex].contStatus = '00'
      //     let index = this.mMyTodoList.content.findIndex((doCont) => doCont.contentsKey === this.mCompTodoList.content[todoIndex].contentsKey)
      //     if (index !== -1) {
      //       this.mMyTodoList.content[index].contStatus = '00'
      //     }
      //     index = this.mReqTodoList.content.findIndex((doCont) => doCont.contentsKey === this.mCompTodoList.content[todoIndex].contentsKey)
      //     if (index !== -1) {
      //       this.mReqTodoList.content[index].contStatus = '00'
      //     }
      //   }
      // }
    },
    MoveDate (value) {
      this.setCountDate += value
      const setDate = this.mSelectDate.setDate(
        this.mSelectDate.getDate() + value
      )
      const returnDate = new Date(setDate)
      this.mSelectDate = returnDate
    },
    async completeTodo (value, memoComment) {
      var param = {}
      param.contentsKey = value.contentsKey
      if (memoComment) {
        param.memoHeaderStr = '[완료메세지]\n'
        param.memoBodyStr = memoComment
      }
      param.workUserName = this.GE_USER.userDispMtext
      param.creUserName = this.GE_USER.userDispMtext
      param.jobkindId = 'TODO'
      param.actorList = value.actorList
      if (param.actorList) {
        const tempList = [...param.actorList]
        const actorList = []
        tempList.forEach((val) => {
          if (val.accessKind === 'F') {
            if (val.cList) {
              val.cList.forEach(val2 => {
                actorList.push({
                  accessKey: val2.accessKey,
                  accessKind: val2.accessKind,
                  actType: val.actType
                })
              })
            }
          } else {
            actorList.push({
              accessKey: val.accessKey,
              accessKind: val.accessKind,
              actType: val.actType
            })
          }
        })
        param.actorList = actorList
      }
      if (value.contStatus === '00') {
        param.contStatus = '99'
      } else {
        param.contStatus = '00'
      }
      param.workUserKey = this.GE_USER.userKey
      await this.$commonAxiosFunction({
        url: '/sUniB/tp.updateTodo',
        param: param
      })
      value.contStatus = param.contStatus
      value.creTeamKey = 0
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [value])
    },
    async getTodoList (loadingYn) {
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var resultList = await this.$getTeamList(paramMap, nonLoading)
      console.log(resultList)
    },
    // target data를 공통 작성 화면에서 원하는 형태로 컨버팅 하는 함수
    convertTargetData (target, followYn, recentYn) {
      console.log(target)
      if (target && target.length > 0) {
        const tempList = []
        target.forEach((value) => {
          const tempObj = {}
          if (recentYn) {
            value.accessKind = value.targetKind
            delete value.targetKind
            value.accessKey = value.targetKey
            if (value.accessKind === 'C') {
              value.cabinetKey = value.targetKey
            } else {
              value.accessName = value.userDispMtext
              value.iconFullYn = true
              value.iconPath = value.userDomainPath
                ? this.$changeUrlBackslash(
                  value.userDomainPath + value.userProfileImg
                )
                : value.userProfileImg
            }
            delete value.targetKey
          }
          if ((!value.cabinetKey && value.userKey) || (value.accessKind && value.accessKind === 'U')) {
            if (followYn) {
              tempList.push({
                accessKind: 'U',
                accessKey: value.targetKey,
                accessName: value.targetDispMtext,
                iconFullYn: true,
                iconPath: value.targetDomainPath
                  ? this.$changeUrlBackslash(
                    value.targetDomainPath + value.targetProfileImg
                  )
                  : value.targetProfileImg
              })
            } else {
              tempList.push(value)
            }
          } else if (value.teamKey && value.nameMtext) {
            tempList.push({
              accessKind: 'T',
              accessKey: value.teamKey,
              accessName: value.nameMtext,
              iconFullYn: true,
              iconPath: value.logoDomainPath
                ? this.$changeUrlBackslash(
                  value.logoDomainPath + value.logoPathMtext
                )
                : value.logoPathMtext
            })
          } else {
            tempObj.accessKind = 'C'
            tempObj.accessKey = value.cabinetKey
            tempObj.iconPath = require('@/assets/images/editChan/icon_addressBook.svg')
            // targetList에 나타나는 아이콘을 원 안에 가득 채울지, 아닐지 결정하는 변수
            tempObj.iconFullYn = false
            tempObj.accessName = value.cabinetNameMtext
            if (value.mCabUserList && value.mCabUserList.length > 0) {
              const childTempList = []
              value.mCabUserList.forEach((value2) => {
                const childTempObj = {}
                childTempObj.accessKind = 'U'
                childTempObj.accessKey = value2.userKey
                childTempObj.iconFullYn = true
                childTempObj.iconPath = value2.domainPath
                  ? this.$changeUrlBackslash(
                    value2.domainPath + value2.userProfileImg
                  )
                  : value2.userProfileImg
                childTempObj.accessName = this.$changeText(value2.userDispMtext)
                childTempList.push(childTempObj)
              })
              tempObj.cList = childTempList
            } else {
              tempObj.cList = []
            }
            tempList.push(tempObj)
          }
        })
        return tempList
      }
    },
    returnTargetData (target) {
      if (target) {
        return this.convertTargetData(target)
      } else {
        return this.mTargetDataList
      }
    },
    splitList (todoList) {
      if (!todoList || todoList.length === 0) return []
      const returnMyTodoList = []
      const returnCheckTodoList = []
      const returnRefTodoList = []
      todoList.forEach(todo => {
        if (todo.contStatus !== '99' && todo.actorList) {
          let myTodoYn = false
          let checkTodoYn = false
          let refTodoYn = false
          for (let i = 0; i < todo.actorList.length; i++) {
            const actor = todo.actorList[i]

            if (actor.accessKind === 'U' && actor.accessKey === this.GE_USER.userKey) {
              if (actor.actType === 'RV') {
                myTodoYn = true
                break
              } else if (actor.actType === 'CK') {
                checkTodoYn = true
              } else if (actor.actType === 'RF') {
                refTodoYn = true
              }
            } else if (actor.accessKind === 'C') {
              let haveYn = false
              if (actor.mUserList) {
                actor.mUserList.forEach(user => {
                  if (user.userKey === this.GE_USER.userKey) {
                    haveYn = true
                  }
                })
                if (haveYn) {
                  if (actor.actType === 'RV') {
                    myTodoYn = true
                    break
                  } else if (actor.actType === 'CK') {
                    checkTodoYn = true
                  } else if (actor.actType === 'RF') {
                    refTodoYn = true
                  }
                }
              }
            }

            // if (actor.actType === 'RV') {
            //   if (actor.accessKind === 'U' && actor.accessKey === this.GE_USER) {
            //     myTodoYn = true
            //     break
            //   } else if (actor.accessKind)
            // }

            // else if (actor.actType === 'CK' && actor.accessKey === this.GE_USER) {
            //   checkTodoYn = true
            // } else if (actor.actType === 'RF' && actor.accessKey === this.GE_USER) {
            //   refTodoYn = true
            // }
          }

          if (myTodoYn) {
            todo.contTarget = 'myTodo'
            returnMyTodoList.push(todo)
          } else if (checkTodoYn) {
            todo.contTarget = 'check'
            returnCheckTodoList.push(todo)
          } else if (refTodoYn) {
            todo.contTarget = 'myRef'
            returnRefTodoList.push(todo)
          }
        }
      })
      console.log({ my: returnMyTodoList, check: returnCheckTodoList, ref: returnRefTodoList })
      return { my: returnMyTodoList, check: returnCheckTodoList, ref: returnRefTodoList }
    },
    async getMyTodoList (orderbyStr) {
      this.mSkeletonShowYn = true
      const param = {
        userKey: this.GE_USER.userKey,
        jobkindId: 'TODO',
        todoType: this.mShowTab[this.mSelectedMainTabIdx].tabVal,
        searchFromDateStr: this.getToday(this.mSelectDate),
        searchToDateStr: this.getToday(this.mSelectDate),
        nowDateStr: this.getToday(new Date()),
        orderbyStr: 'r.recentKey IS NOT NULL DESC, sk.nameMtext DESC, c.contStatus, c.priority, c.workToDate DESC',
        pageSize: 50,
        stickerKeyList: this.mParamStickerList
      }
      if (orderbyStr) {
        param.orderbyStr = orderbyStr
      }
      this.GE_DISP_SEARCH_LIST.forEach(search => {
        if (search.value) {
          if (search.searchType === 'SK') {
            param.stickerKeyList = [search.value.accessKey]
          } else if (search.searchType === 'RV') {
            param.findRecvUserKey = search.value.accessKey
          } else if (search.searchType === 'PR') {
            param.priority = search.value.accessKey
          } else if (search.searchType === 'ST') {
            param.contStatus = search.value.accessKey
          }
        }
      })
      // if (this.mParamStickerList) {
      //   const keyList = []
      //   for (let i = 0; i < this.mParamStickerList.length; i++) {
      //     if (!this.mParamStickerList[i].stickerKey) continue
      //     keyList.push(this.mParamStickerList[i].stickerKey)
      //   }
      //   console.log('keyList', keyList)
      //   param.stickerKeyList = keyList
      // }
      // if (this.mParamPriority !== '') {
      //   param.priority = this.mParamPriority
      // }
      let nonLoadingYn = false
      if (param.jobkindId === 'MEMO') { nonLoadingYn = true }
      this.mCompleteTodoCount = 0
      const myContents = await this.$commonAxiosFunction(
        {
          url: '/sUniB/tp.getMyTodoList',
          param: param
        },
        nonLoadingYn
      )
      this.mListEmptyYn = true
      this.mMyMemoList = { totalElements: 0, content: [] }
      this.mMyTodoList = { totalElements: 0, content: [] }
      this.mCheckTodoList = { totalElements: 0, content: [] }
      this.mCompTodoList = { totalElements: 0, content: [] }
      this.mRefTodoList = { totalElements: 0, content: [] }
      if (!myContents.data) {

      } else {
        this.mListEmptyYn = false
        this.mMyMemoList = myContents.data.memo
        try {
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.mMyMemoList.content)
        } catch (error) {
        }
        // this.mGetTodoGroupList = myContents.data
        const selectedTab = this.mShowTab[this.mSelectedMainTabIdx]
        if (selectedTab.tabVal === 'A' || selectedTab.tabVal === 'M') {
          const conts = this.replaceArr(myContents.data.myTodo && myContents.data.myTodo.content ? myContents.data.myTodo.content : [])
          if (!myContents.data.myTodo) {
            myContents.data.myTodo = {}
          }
          this.mRefTodoList = { totalElements: 0, content: [] }
          if (conts && conts.length > 0) {
            const returnList = this.splitList(conts)
            if (returnList.my) {
              this.mMyTodoList = { content: returnList.my }
            }
            if (returnList.check) {
              this.mCheckTodoList = { content: returnList.check }
            }
            if (returnList.ref) {
              this.mRefTodoList = { content: returnList.ref }
            }
            // for (let i = conts.length - 1; i > -1; i--) {
            //   const refList = conts[i].refList
            //   if (refList && refList.length > 0) {
            //     let checkYn = false
            //     refList.forEach(element => {
            //       if (element.accessKind && element.accessKind === 'U') {
            //         if (element.accessKey === this.GE_USER.userKey) {
            //           checkYn = true
            //         }
            //       } else if (element.accessKind && element.accessKind === 'C') {
            //         if (element.mUserList) {
            //           element.mUserList.forEach(user => {
            //             if (user.userKey === this.GE_USER.userKey) {
            //               checkYn = true
            //             }
            //           })
            //         }
            //       }
            //       if (checkYn) {
            //         conts[i].contTarget = 'myRef'
            //         this.mRefTodoList.content.push(conts[i])
            //         conts.splice(i, 1)
            //         this.mRefTodoList.content = this.replaceArr(this.mRefTodoList.content && this.mRefTodoList.content ? this.mRefTodoList.content : [])
            //       }
            //     })
            //   }
            // }
          }
          // console.log(this.mRefTodoList)
          // myContents.data.myTodo.content = conts
          // this.mMyTodoList = myContents.data.myTodo
          // if (!this.mMyTodoList.totalElements) this.mMyTodoList.totalElements = 0
        }
        // if (selectedTab.tabVal === 'A' || selectedTab.tabVal === 'R') {
        //   const conts = this.replaceArr(myContents.data.reqTodo && myContents.data.reqTodo.content ? myContents.data.reqTodo.content : [])
        //   if (!myContents.data.reqTodo) {
        //     myContents.data.reqTodo = {}
        //   }
        //   myContents.data.reqTodo.content = conts
        //   this.mReqTodoList = myContents.data.reqTodo
        //   if (!this.mReqTodoList.totalElements) this.mReqTodoList.totalElements = 0
        // }
        if (selectedTab.tabVal === 'A' || selectedTab.tabVal === 'C') {
          const conts = this.replaceArr(myContents.data.compTodo && myContents.data.compTodo.content ? myContents.data.compTodo.content : [])
          if (!myContents.data.compTodo) {
            myContents.data.compTodo = {}
          }
          myContents.data.compTodo.content = conts
          this.mCompTodoList = myContents.data.compTodo
          if (!this.mCompTodoList.totalElements) this.mCompTodoList.totalElements = 0
        }
      }
      this.mSkeletonShowYn = false
      const allList = [...this.mMyTodoList.content, ...this.mCheckTodoList.content, ...this.mRefTodoList.content, ...this.mCompTodoList.content]
      this.getAllActorList(allList)
      try {
        this.$store.dispatch(
          'D_CHANNEL/AC_ADD_CONTENTS',
          [...this.mMyTodoList.content, ...this.mCheckTodoList.content, ...this.mRefTodoList.content, ...this.mCompTodoList.content]
        )
      } catch (error) {
        console.log(error)
      }
      // const myContents = await this.$getContentsList(param)
      this.mCompleteMyTodoCount = 0
      this.mCompleteRefTodoCount = 0
      this.mCompleteTargetTodoCount = 0
      //  cabinetList = {}
      // this.mGetTodoGroupList = [cabinetList]
      this.$nextTick(() => {
        this.setTitleThreeLine()
      })
      // }
    },
    getAllActorList (dataList) {
      if (!this.firstYn) return
      this.mAllActorList = []
      const resultList = []
      const allCabinetList = []
      dataList.forEach(todo => {
        const actorList = todo.actorList
        actorList.forEach(actor => {
          if (actor.actType === 'RV') {
            if (actor.accessKind === 'C') {
              if (actor.mUserList && actor.mUserList.length > 0) allCabinetList.push(actor)
            } else {
              const cData = {
                accessKind: actor.accessKind,
                accessKey: actor.accessKey,
                accessName: actor.userDispMtext,
                iconFullYn: true,
                iconPath: actor.domainPath
                  ? this.$changeUrlBackslash(
                    actor.domainPath + actor.pathMtext
                  )
                  : actor.pathMtext
              }

              resultList.push(cData)
            }
          }
        })
      })
      if (allCabinetList && allCabinetList.length > 0) {
        const convertCabList = this.convertTargetData(allCabinetList)
        convertCabList.forEach(cab => {
          const userList = cab.cList
          console.log()
          userList.forEach(user => {
            resultList.push(user)
          })
        })
      }
      const replaceArr = this.replaceActorArr(resultList)
      console.log('actor리스트')
      console.log(replaceArr)
      this.mAllActorList = replaceArr
      this.firstYn = false
    },
    convertActorList (cont) {
      if (!cont.actorList || cont.actorList.length === 0) return []
      if (cont.actorList.length > 3) {
        cont.mNewActorList = cont.actorList.slice(0, 3)
      }
    },
    todosideMenu (todo, value, groupIndex, todoIndex) {
      this.mSelectTodo = todo
      // this.mGetTodoGroupList[groupIndex][value][todoIndex].sideMenuOpenYn =
      //   !this.mGetTodoGroupList[groupIndex][value][todoIndex].sideMenuOpenYn
    },
    getToday (value) {
      var date = value
      var year = date.getFullYear()
      var month = ('0' + (1 + date.getMonth())).slice(-2)
      var day = ('0' + date.getDate()).slice(-2)

      return year + '-' + month + '-' + day
    },
    getDate (value) {
      // -1:day-1, 0:day, 1:day+1
      let todayDate = ''
      // const date = new Date()
      const year = this.mSelectDate.getFullYear()
      let month = this.mSelectDate.getMonth() + 1 + ''
      let day = this.mSelectDate.getDate() + value + ''
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      todayDate = year + '-' + month + '-' + day
      return todayDate
    },
    changeTypeToText (value) {
      let returnData = ''
      if (value === 'H') {
        returnData = 'Memo'
      } else if (value === 'T') {
        returnData = 'Work'
      } else if (value === 'S') {
        returnData = 'Idea'
      } else if (value === 'E') {
        returnData = 'etc'
      }
      return returnData
    },
    async deleteTodo (loadingYn) {
      commonMethods.showAxiosLoading(true)
      var param = {}
      param.todoKey = this.mTodoObj.todoKey
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var result = await this.$deleteTodo(param, nonLoading)
      if (result.result) {
        this.getMyTodoList()
        this.closeDeletePop()
      }
      commonMethods.showAxiosLoading(false)
    },
    async updateTodo (value, loadingYn) {
      this.mShowSkeletonYn = true
      const param = { todo: {} }
      param.todo.title = value.title
      param.todo.comment = value.comment
      param.todo.todoType = value.todoType
      param.todo.todoKey = value.todoKey
      if (value.targetKind === 'U') {
        param.todo.targetKind = 'U'
        param.todo.targetKey = this.GE_USER.userKey
      } else {
        param.todo.targetKind = 'C'
        param.todo.targetKey = this.mSelectFamily
      }
      param.todo.todoDate = this.getDate(1)
      param.todo.todoUserKey = value.todoUserKey
      param.todo.workUserName = this.GE_USER.userDispMtext
      param.todo.creUserName = this.GE_USER.userDispMtext
      param.todo.creUserKey = this.GE_USER.userKey
      var nonLoading = true
      var result = await this.$saveTodo(param, nonLoading)
      if (result.resultMsg === 'OK') {
        const newParam = {}
        newParam.contentsKey = result.contents.contentsKey
        newParam.jobkindId = 'TODO'
        await this.$getContentsList(newParam).then(newReslute => {
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', newReslute.content)
        })
        if (result.sticker) {
          await this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', result.sticker)
        }
        await this.closeUpdatePop()
        this.mShowSkeletonYn = false
      }
    },
    openUpdatePop () {
      if (this.mTodoObj.targetKey !== this.GE_USER.userKey) {
        const cabUserList = []
        for (let i = 0; i < this.mGetTodoFamilyList.length; i++) {
          if (
            this.mTodoObj.targetKey === this.mGetTodoFamilyList[i].cabinetKey
          ) {
            for (
              let j = 0;
              j < this.mGetTodoFamilyList[i].mCabUserList.length;
              j++
            ) {
              if (this.mGetTodoFamilyList[i].mCabUserList[j].ownerYn) {
                if (!this.mGetTodoFamilyList[i].mCabUserList[j].dispMtext) {
                  cabUserList.push({
                    opt: '만끽이',
                    value: this.mGetTodoFamilyList[i].mCabUserList[j].userKey
                  })
                } else {
                  cabUserList.push({
                    opt: this.$changeText(
                      this.mGetTodoFamilyList[i].mCabUserList[j].userDispMtext
                    ),
                    value: this.mGetTodoFamilyList[i].mCabUserList[j].userKey
                  })
                }
              } else {
                cabUserList.push({
                  opt: this.$changeText(
                    this.mGetTodoFamilyList[i].mCabUserList[j].userDispMtext
                  ),
                  value: this.mGetTodoFamilyList[i].mCabUserList[j].userKey
                })
              }
            }
          }
        }
        this.mFamilyList = cabUserList
      } else {
        this.mFamilyList = [
          {
            opt: this.$changeText(this.GE_USER.userDispMtext),
            value: this.GE_USER.userKey
          }
        ]
      }
      this.mSetPopShowYn = true
      this.mOpenMenuShowYn = false
    },
    calPercent (total, com) {
      let returnData = ''
      if (com === 0) {
        returnData = 0
      } else {
        returnData = Math.floor((total / com) * 100) + ''
      }
      return returnData + '%'
    },
    closeUpdatePop () {
      this.mSetPopShowYn = false
    },
    openDeletePop () {
      this.mConfirmText = 'Are you sure you want to delete it?'
      this.mDeleteConfirmShowYn = true
      this.mOpenMenuShowYn = false
    },
    closeDeletePop () {
      this.mDeleteConfirmShowYn = false
    },
    openSubMenu (value) {
      this.mTodoObj = value
      this.mOpenMenuShowYn = true
    },
    closeSubMenu () {
      this.mOpenMenuShowYn = false
    },
    // async openTodoDetail (value) {
    //   const param = {}
    //   param.todoKey = value.todoKey
    //   var result = await this.$commonAxiosFunction(
    //     { url: '/sUniB/mk.getTodoList', param: param },
    //     false
    //   )
    //   }
    //   this.mSelectTodo = value
    //   this.mTodoDetailShowYn = true
    // },
    closeTodoDetail () {
      this.mTodoDetailShowYn = false
    },
    async openAddTodoPop () {
      this.memoYn = false
      this.mPopupType = 'TODO'
      this.mOption.purpose = 'Add Todo'

      this.mTargetDataList = []
      var paramMap = {}
      paramMap.userKey = this.GE_USER.userKey
      // paramMap.searchDate = this.getDate(1)
      paramMap.sysCabinetCode = 'USER'
      // paramMap.pageSize = 30
      var result = await this.$getTodoListGroupCab(paramMap, true)
      if (result.result) {
        let tempList = this.convertTargetData(result.userTeam)
        this.mTargetDataList.push(
          {
            tabIndex: 0,
            tabType: 'TEAM',
            tabName: '채널',
            targetList: tempList
          }
        )
        tempList = this.convertTargetData(result.user)
        const fList = this.convertTargetData(result.follow, true)
        let fDispText = ''
        if (fList && fList.length > 0) {
          fList.forEach((element, index) => {
            fDispText += this.$changeText(element.accessName)
            if (index !== fList.length - 1) fDispText += ', '
          })
        }
        tempList.unshift(
          {
            accessKey: 1,
            accessKind: 'F',
            iconPath: require('@/assets/images/common/DFollowerIcon.svg'),
            accessName: 'KO$^$팔로잉$#$EN$^$following',
            accessDispComment: fDispText,
            cList: fList
          }
        )
        this.mTargetDataList.unshift(
          {
            tabIndex: 1,
            tabType: 'USER',
            tabName: '내주소록',
            targetList: tempList
          }
        )
        if (result.recent && result.recent.length > 0) {
          tempList = this.convertTargetData(result.recent, null, true)
          this.mTargetDataList.unshift(
            {
              tabIndex: 2,
              tabType: 'RECE',
              tabName: '최근선택',
              targetList: tempList
            }
          )
        }

        // tempList = this.convertTargetData(result.follow, true)
        // this.mTargetDataList.push(
        //   {
        //     tabIndex: 2,
        //     tabType: 'FOLLOW',
        //     tabName: '팔로잉',
        //     targetList: tempList
        //   }
        // )
        this.mGetTodoFamilyList = result.team
        this.mWritePopShowYn = true
      }
      console.log('result - mTargetDataList', this.mTargetDataList)
    },
    async refreshTargetData () {
      var paramMap = {}
      this.mTargetDataList = []
      paramMap.userKey = this.GE_USER.userKey
      // paramMap.searchDate = this.getDate(1)
      paramMap.sysCabinetCode = 'USER'
      // paramMap.pageSize = 30
      var result = await this.$getTodoListGroupCab(paramMap, true)
      if (result.result) {
        console.log('result - todoList', result)
        let tempList = this.convertTargetData(result.team)
        this.mTargetDataList.push(
          {
            tabIndex: 0,
            tabType: 'TEAM',
            tabName: '채널주소록',
            targetList: tempList
          }
        )
        tempList = this.convertTargetData(result.user)
        const fList = this.convertTargetData(result.follow, true)
        let fDispText = ''
        if (fList && fList.length > 0) {
          fList.forEach((element, index) => {
            fDispText += this.$changeText(element.accessName)
            if (index !== fList.length - 1) fDispText += ', '
          })
        }
        tempList.unshift(
          {
            accessKey: 1,
            accessKind: 'F',
            iconPath: require('@/assets/images/common/DFollowerIcon.svg'),
            accessName: 'KO$^$팔로잉$#$EN$^$following',
            accessDispComment: fDispText,
            cList: fList
          }
        )
        this.mTargetDataList.unshift(
          {
            tabIndex: 1,
            tabType: 'USER',
            tabName: '내주소록',
            targetList: tempList
          }
        )
        return this.mTargetDataList
      }
    },
    replaceArr (arr) {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (
          data.findIndex(
            (item) => Number(item.contentsKey) === Number(current.contentsKey)
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
    },
    replaceActorArr (arr) {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (current.accessKey &&
          data.findIndex(
            (item) => Number(item.accessKey) === Number(current.accessKey)
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
    },
    changeTodoList (baseList, targetList) {
      // var this_ = this
      if (!targetList && targetList.length === 0) return []
      var uniqueArr = targetList.reduce(function (data, current) {
        if (
          data.findIndex(
            (item) => Number(item.contentsKey) === Number(current.contentsKey)
          ) === -1
        ) {
          /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          if (baseList.findIndex(
            (i) => Number(i.contentsKey) === Number(current.contentsKey)
          ) === -1
          ) {
            data.push(current)
          } else {
            current.dupYn = true
            data.push(current)
          }
        }
        // data = data.sort(function (a, b) {
        //   return b.contentsKey - a.contentsKey
        // })
        return data
      }, [])
      return uniqueArr
    },
    closeAddTodoPop () {
      this.mAddTodoPopShowYn = false
    },
    goMain () {
      this.$router.push('/')
    },
    getReplaceList (data) {
      let idx1, idx2
      const returnAlimList = []
      let chanDetail = null
      let dataList = null
      const contList = data.content
      if (!contList) return data
      var i = 0
      for (i = 0; i < contList.length; i++) {
        if (contList[i].jobkindId === 'TODO') contList[i].creTeamKey = 0
        idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === contList[i].creTeamKey)
        chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
        dataList = chanDetail.ELEMENTS.todoList
        idx2 = dataList.findIndex((item) => item.contentsKey === contList[i].contentsKey)
        if (idx2 !== -1) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          contList[i] = dataList[idx2]
          returnAlimList.push(dataList[idx2])
        } else {
          returnAlimList.push(contList[i])
        }
      }
      data.content = this.replaceArr(returnAlimList)
      return data
    },
    getVuexList (data) {
      let idx1, idx2
      const returnAlimList = []
      let chanDetail = null
      let dataList = null
      const contList = data.content
      if (!contList) return data
      var i = 0
      for (i = 0; i < contList.length; i++) {
        if (contList[i].jobkindId === 'TODO') contList[i].creTeamKey = 0
        idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === contList[i].creTeamKey)
        chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
        dataList = chanDetail.ELEMENTS.todoList
        idx2 = dataList.findIndex((item) => item.contentsKey === contList[i].contentsKey)
        if (idx2 !== -1) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          contList[i] = dataList[idx2]
          returnAlimList.push(dataList[idx2])
        } else {
          returnAlimList.push(contList[i])
        }
      }
      data.content = this.replaceArr(returnAlimList)
      return data
    },
    getVuexMemoList (data) {
      let idx1 = -1
      let idx2 = -1
      const returnAlimList = []
      let chanDetail = null
      let dataList = null
      const contList = data.content
      if (!contList) return data
      var i = 0
      idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === -1)
      if (idx1 === -1) return data
      chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
      dataList = chanDetail.ELEMENTS.memoList
      if (!dataList || dataList.length === 0) {
        return data
      }
      for (i = 0; i < contList.length; i++) {
        idx2 = dataList.findIndex((item) => item.contentsKey === contList[i].contentsKey)
        if (idx2 !== -1) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          contList[i] = dataList[idx2]
          returnAlimList.push(dataList[idx2])
        } else {
          returnAlimList.push(contList[i])
        }
      }
      data.content = this.replaceArr(returnAlimList)
      return data
    },
    replaceMemoArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (
          data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1
        ) {
          data.push(current)
        }
        data = data.sort(function (a, b) {
          // num으로 오름차순 정렬
          return b.memoKey - a.memoKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    }
  },
  computed: {

    GE_DISP_SEARCH_LIST () {
      const returnList = []
      console.log(this.mTodoFilterList)
      this.mTodoFilterList.forEach(element => {
        if (element.value) {
          returnList.push(element)
        }
      })
      console.log(returnList)
      return returnList
    },
    GE_DEL_CONT_LIST () {
      return this.$store.getters['D_CHANNEL/GE_DEL_CONT_LIST']
    },
    mMyTodoCount () {
      if (!this.mMyTodoList.content) return 0
      let count = 0
      this.mMyTodoList.content.forEach(element => {
        if (element.contStatus !== '99') {
          count++
        }
      })
      return count
    },
    mRefTodoCount () {
      if (!this.mRefTodoList.content) return 0
      let count = 0
      this.mRefTodoList.content.forEach(element => {
        if (element.contStatus !== '99') {
          count++
        }
      })
      return count
    },
    mCheckTodoCount () {
      if (!this.mCheckTodoList.content) return 0
      let count = 0
      this.mCheckTodoList.content.forEach(element => {
        if (element.contStatus !== '99') {
          count++
        }
      })
      return count
    },
    GE_STICKER_LIST () {
      return this.$store.getters['D_CHANNEL/GE_STICKER_LIST']
    },
    GE_STICKER_FILTER_LIST () {
      const returnList = []
      this.GE_STICKER_LIST.forEach(element => {
        returnList.push({
          accessKey: element.stickerKey,
          accessColor: element.picBgPath,
          accessName: element.nameMtext,
          accessType: 'K',
          accessData: element
        })
      })
      return returnList
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_NEW_CONT_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_CONT_LIST']
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_DISP_LIST () {
      const tab = this.mShowTab[this.mSelectedMainTabIdx]
      if (tab.tabVal === 'A') {
        // console.log(this.mCheckTodoList)
        return [{ listName: this.$t('COMMON_TODO_MYTODO'), list: this.getReplaceList(this.mMyTodoList) }, { listName: this.$t('COMMON_TODO_CHECK'), list: this.getReplaceList(this.mCheckTodoList) }, { listName: this.$t('COMMON_TODO_PUBLIC'), list: this.getReplaceList(this.mRefTodoList) }, { listName: this.$t('COMMON_TODO_COMPLETED'), list: this.getReplaceList(this.mCompTodoList) }]
      } else if (tab.tabVal === 'M') {
        return [{ listName: this.$t('COMMON_TODO_MYTODO'), list: this.getReplaceList(this.mMyTodoList) }, { listName: this.$t('COMMON_TODO_CHECK'), list: this.getReplaceList(this.mCheckTodoList) }, { listName: this.$t('COMMON_TODO_PUBLIC'), list: this.getReplaceList(this.mRefTodoList) }]
      } else if (tab.tabVal === 'C') {
        return [{ listName: this.$t('COMMON_TODO_COMPLETED'), list: this.getReplaceList(this.mCompTodoList) }]
      } else {
        return []
      }/* else if (tab.tabVal === 'R') {
        return [{ listName: this.$t('COMMON_TODO_CHECK'), list: this.getVuexList(this.mCheckTodoList) }]
      }  */
    },
    GE_DISP_MEMO_LIST () {
      // console.log('ㅁ[머!!]')
      // console.log(this.getVuexMemoList(this.mMyMemoList))
      console.log('GE_DISP_MEMO_LIST', this.getVuexMemoList(this.mMyMemoList))
      return this.getVuexMemoList(this.mMyMemoList)
    },
    /* GE_DISP_LIST () {
      let idx1 = null
      let idx2 = null
      let j = 0
      let chanDetail = null
      let dataList = null
      const returnData = {
        myTodoList: [],
        targetTodoList: [],
        completeTodoList: []
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === 0)
      chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
      dataList = chanDetail.ELEMENTS.todoList
      const group = this.mGetTodoGroupList[0]
      for (j = 0; j < group.length; j++) {
        const todo = group[j]
        idx2 = dataList.findIndex(
          (item) => item.contentsKey === todo.contentsKey
        )
        if (idx2 !== -1) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          returnData.myTodoList.push(dataList[idx2])
        } else {
          returnData.myTodoList.push(dataList[idx2])
        }
      }
      this.replaceArr(returnData.myTodoList)
      for (j = 0; j < group.targetTodoList.length; j++) {
        const todo = group.targetTodoList[j]
        idx2 = dataList.findIndex(
          (item) => item.contentsKey === todo.contentsKey
        )
        if (idx2 !== -1) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          returnData.targetTodoList.push(dataList[idx2])
        } else {
          returnData.targetTodoList.push(dataList[idx2])
        }
      }
      this.replaceArr(returnData.targetTodoList)
      for (j = 0; j < group.completeTodoList.length; j++) {
        const todo = group.completeTodoList[j]
        idx2 = dataList.findIndex(
          (item) => item.contentsKey === todo.contentsKey
        )
        if (idx2 !== -1) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          returnData.completeTodoList.push(dataList[idx2])
        } else {
          returnData.completeTodoList.push(dataList[idx2])
        }
      }
      this.replaceArr(returnData.completeTodoList)

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return [returnData]
    }, */
    CONT_DETAIL () {
      if (!this.contentsEle || !this.contentsEle.contentsKey) return
      let teamKey = null
      if (this.contentsEle.jobkindId === 'TODO') {
        teamKey = 0
      } else if (this.contentsEle.jobkindId === 'MEMO') {
        teamKey = -1
      } else {
        teamKey = this.contentsEle.creTeamKey
      }
      var cont = this.$getContentsDetail(
        null,
        this.contentsEle.contentsKey,
        teamKey,
        this.contentsEle.jobkindId
      )
      if (!cont) {
        cont = [this.contentsEle]
        // this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.contentsEle])
      }
      if (cont && cont.length > 0) {
        if (cont[0].jobkindId === 'BOAR') {
          const viewAuth = this.$checkUserAuth(cont[0].shareItem).V
          /* if (cont[0].shareList) {
          const shareList = cont[0].shareList
          const index = shareList.findIndex((item) => (item.accessKind === 'T' || item.accessKind === 'F'))
          if (index !== -1) {
            viewAuth = true
          }
        } */
          cont[0].VIEW_YN = viewAuth
        }
        return cont[0]
      } else {
        var content = this.contentsEle
        if (this.contentsEle.jobkindId === 'BOAR') {
          const viewAuth = this.$checkUserAuth(this.contentsEle.shareItem).V
          /* if (this.contentsEle.shareList) {
          const shareList = this.contentsEle.shareList
          const index = shareList.findIndex((item) => (item.accessKind === 'T' || item.accessKind === 'F'))
          if (index !== -1) {
            viewAuth = true
          }
        } */
          content.VIEW_YN = viewAuth
        }
        return content
      }
    }
  },
  watch: {
    /* GE_DISP_MEMO_LIST: {
      handler (val, old) {
        if (val !== old) {
          if (val.content && val.content.length > 0) {
            this.mMemoBody = val.content[this.mSelectedMemoIdx]
          }
        }
        if (val.content && val.content.length === 0) {
          this.showMemoYn = false
        }
      },
      deep: true
    }, */
    GE_DISP_SEARCH_LIST: {
      handler (val) {
        if (!val) return
        console.log(val)
        this.getMyTodoList()
        if (this.$refs.filterPop) this.$refs.filterPop.backClick()
      }
    },
    GE_STICKER_FILTER_LIST: {
      immediate: true,
      handler (val) {
        if (!val) return
        this.mTodoFilterList[1].selectList = val
      },
      deep: true
    },
    mAllActorList: {
      immediate: true,
      handler (val) {
        if (!val) return
        console.log(val)
        // val.unshift({ accessKey: null, accessName: '전체' })
        this.mTodoFilterList[0].selectList = val
        // this.mTodoFilterList[0].selectList.unshift({ accessKey: null, accessName: '전체' })
      },
      deep: true
    },
    GE_DEL_CONT_LIST: {
      handler (value, old) {
        if (value) {
          if (value[0] && value[0].jobkindId === 'MEMO') {
            const idx = this.mMyMemoList.content.findIndex((item) => item.contentsKey === value[0].contentsKey)
            if (idx !== -1) {
              this.mMyMemoList.content.splice(idx, 1)
            }
          } else {
            const newList = [...this.mMyTodoList.content, ...this.mRefTodoList.content, ...this.mCheckTodoList.content]
            let index = newList.findIndex((item) => item.contentsKey === value[0].contentsKey)
            if (index !== -1) {
              newList.splice(index, 1)
              const returnList = this.splitList(newList)
              this.mMyTodoList.content = returnList.my
              this.mRefTodoList.content = returnList.ref
              this.mCheckTodoList.content = returnList.check
            } else {
              index = this.mCompTodoList.content.findIndex((item) => item.contentsKey === value[0].contentsKey)
              if (index !== -1) {
                this.mCompTodoList.content.splice(index, 1)
              }
            }
          }
        }
      },
      deep: true
    },
    GE_DISP_LIST: {
      immediate: true,
      handler (value, old) {
        // console.log('value, old', value, old)
      },
      deep: true
    },
    /* GE_STICKER_LIST: {
      immediate: true,
      handler (val) {
        if (val && val.length > 0) {
          const initYn = this.mDispStickerList.length === 0
          for (let i = 0; i < val.length; i++) {
            if (this.mDispStickerList.findIndex((v) => v.stickerKey === val[i].stickerKey) === -1) {
              val[i].selectedYn = true
              if (initYn) {
                this.mDispStickerList.push(val[i])
              } else {
                this.mDispStickerList.unshift(val[i])
              }
            }
          }
        }
        console.log(this.mDispStickerList)
        // this.mDispStickerList = val
      }
    }, */
    mSelectDate: {
      immediate: true,
      handler (val) {
        if (!val) return
        // alert(false)
        this.getMyTodoList()
      },
      deep: true
    },
    mCompTodoList: {
      immediate: true,
      handler (val) {
        this.mCompleteMyTodoCount = 0
        this.mCompleteRefTodoCount = 0
        this.mCompleteTargetTodoCount = 0
        if (!val || !val.content) return
        for (let i = val.content.length - 1; i > -1; i--) {
          const todo = val.content[i]
          /* let idx = this.mMyTodoList.content.findIndex((cont) => cont.contentsKey === todo.contentsKey)
          if (idx !== -1) {
            this.mMyTodoList.content = this.mMyTodoList.content.splice(idx, 1)
          }
          idx = this.mReqTodoList.content.findIndex((cont) => cont.contentsKey === todo.contentsKey)
          if (idx !== -1) {
            this.mReqTodoList.content = this.mReqTodoList.content.splice(idx, 1)
          } */
          if (todo.actorList) {
            for (let index = 0; index < todo.actorList.length; index++) {
              const element = todo.actorList[index]
              if (element.accessKind === 'U' && element.accessKey === this.GE_USER.userKey) {
                todo.contTarget = 'myTodo'
                break
              } else if (element.accessKind === 'C') {
                if (element.mUserList) {
                  element.mUserList.forEach(user => {
                    if (user.userKey === this.GE_USER.userKey) {
                      todo.contTarget = 'myTodo'
                    }
                  })
                }
              }
            }
          }
          if (todo.refList) {
            for (let index = 0; index < todo.refList.length; index++) {
              const element = todo.refList[index]
              if (element.accessKind === 'U' && element.accessKey === this.GE_USER.userKey) {
                todo.contTarget = 'myRef'
                break
              } else if (element.accessKind === 'C') {
                if (element.mUserList) {
                  element.mUserList.forEach(user => {
                    if (user.userKey === this.GE_USER.userKey) {
                      todo.contTarget = 'myRef'
                    }
                  })
                }
              }
            }
          }
          if (todo.contTarget && todo.contTarget === 'myTodo') {
            this.mCompleteMyTodoCount++
          } else if (todo.contTarget && todo.contTarget === 'myRef') {
            this.mCompleteRefTodoCount++
          } else {
            this.mCompleteTargetTodoCount++
          }
        }
      },
      deep: true
    },
    // mMyTodoList: {
    //   immediate: true,
    //   handler (val) {
    //     if (!val || !val.content) return
    //     if (val.content && val.content.length > 0) {
    //       for (let i = val.content.length - 1; i > -1; i--) {
    //         const todo = val.content[i]
    //         todo.contTarget = 'myTodo'
    //         if (!todo) continue
    //         const idx = this.mReqTodoList.content.findIndex((cont) => cont.contentsKey === todo.contentsKey)
    //         console.log(idx)
    //         if (idx !== -1) {
    //           this.mReqTodoList.content.splice(idx, 1)
    //         }
    //       }
    //     }
    //   },
    //   deep: true
    // },
    // mRefTodoList: {
    //   immediate: true,
    //   handler (val) {
    //     if (!val || !val.content) return
    //     if (val.content && val.content.length > 0) {
    //       for (let i = val.content.length - 1; i > -1; i--) {
    //         const todo = val.content[i]
    //         todo.contTarget = 'myRef'
    //         if (!todo) continue
    //         const idx = this.mReqTodoList.content.findIndex((cont) => cont.contentsKey === todo.contentsKey)
    //         console.log(idx)
    //         if (idx !== -1) {
    //           this.mReqTodoList.content.splice(idx, 1)
    //         }
    //       }
    //     }
    //   },
    //   deep: true
    // },
    GE_NEW_MEMO_LIST: {
      async handler (value, old) {
        var newArr = []
        // eslint-disable-next-line no-debugger
        debugger
        if (!value || value.length === 0) return
        if (value[0].jobkindId !== 'TODO') return
        const newTodo = value[0]
        // var memoContents = value[0]
        var content = null
        let index
        let listType = 'my' // target // completedMy // completedTarget

        if (
          this.mMyTodoList.content.findIndex(
            (todo) => todo.contentsKey === newTodo.targetKey
          ) !== -1 ||
          this.mCheckTodoList.content.findIndex(
            (todo) => todo.contentsKey === newTodo.targetKey
          ) !== -1 ||
          this.mRefTodoList.content.findIndex(
            (todo) => todo.contentsKey === newTodo.targetKey
          ) !== -1
        ) {
          const myIndex = this.mMyTodoList.content.findIndex(
            (todo) => todo.contentsKey === newTodo.targetKey
          )
          const targetIndex =
            this.mCheckTodoList.content.findIndex(
              (todo) => todo.contentsKey === newTodo.targetKey
            )
          const refIndex =
          this.mRefTodoList.content.findIndex(
            (todo) => todo.contentsKey === newTodo.targetKey
          )
          if (refIndex !== -1) {
            content = this.mRefTodoList.content[myIndex]
            index = myIndex
            listType = 'myRef'
          } else if (myIndex !== -1) {
            content = this.mMyTodoList.content[myIndex]
            index = myIndex
          } else if (targetIndex !== -1) {
            content = this.mCheckTodoList.content[targetIndex]
            listType = 'check'
            index = targetIndex
          }
        } else if (
          this.mCompTodoList.content.findIndex(
            (todo) => todo.contentsKey === newTodo.targetKey
          ) !== -1
        ) {
          index = this.mCompTodoList.content.findIndex(
            (todo) => todo.contentsKey === newTodo.targetKey
          )
          if (index !== -1) {
            content = this.mCompTodoList.content[index]
            listType = 'complete'
          }
        }

        if (!content) return

        var memoAleadyIdx = content.D_MEMO_LIST.findIndex(
          (item) => Number(item.memoKey) === Number(value[0].memoKey)
        )
        if (memoAleadyIdx !== -1) {
          content.D_MEMO_LIST[memoAleadyIdx] = value[0]
          newArr = content.D_MEMO_LIST
        } else {
          newArr = [value[0], ...content.D_MEMO_LIST]
        }
        if (listType === 'my') {
          this.mMyTodoList.content[index].D_MEMO_LIST =
            this.replaceMemoArr(newArr)
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [
            this.mMyTodoList.content[index]
          ])
        } else if (listType === 'check') {
          this.mCheckTodoList.content[index].D_MEMO_LIST =
            this.replaceMemoArr(newArr)
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [
            this.mCheckTodoList.content[index]
          ])
        } else if (listType === 'myRef') {
          this.mRefTodoList.content[index].D_MEMO_LIST =
            this.replaceMemoArr(newArr)
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [
            this.mRefTodoList.content[index]
          ])
        } else if (listType === 'complete') {
          this.mCompTodoList.content[index].D_MEMO_LIST =
            this.replaceMemoArr(newArr)
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [
            this.mCompTodoList.content[index]
          ])
        }
      },
      deep: true
    },
    GE_NEW_CONT_LIST: {
      handler (value, old) {
        if (!value || !value[0]) return
        console.log(value)
        if (value[0].jobkindId !== 'TODO' && value[0].jobkindId !== 'MEMO') return
        const newTodo = value[0]
        // let oriList = []
        if (value[0].jobkindId === 'TODO') {
          newTodo.strikeOnOff = false
          newTodo.sideMenuOpenYn = false
          if (this.mMyTodoList && this.mMyTodoList.content && this.mCheckTodoList && this.mCheckTodoList.content && this.mRefTodoList && this.mRefTodoList.content && (this.mMyTodoList.content.findIndex(
            (todo) => todo.contentsKey === newTodo.contentsKey
          ) !== -1 ||
            this.mCheckTodoList.content.findIndex(
              (todo) => todo.contentsKey === newTodo.contentsKey
            ) !== -1 ||
            this.mRefTodoList.content.findIndex(
              (todo) => todo.contentsKey === newTodo.targetKey
            ) !== -1)
          ) {
            if (newTodo.contStatus === '99') {
              this.mCompTodoList.content.unshift(newTodo)
            }
            const returnList = this.splitList([...this.mMyTodoList.content, ...this.mCheckTodoList.content, ...this.mRefTodoList.content])
            if (returnList) {
              if (returnList.my) {
                this.mMyTodoList = { content: returnList.my }
              }
              if (returnList.check) {
                this.mCheckTodoList = { content: returnList.check }
              }
              if (returnList.ref) {
                this.mRefTodoList = { content: returnList.ref }
              }
            }
            // const myIndex = this.mMyTodoList.content.findIndex(
            //   (todo) => todo.contentsKey === newTodo.contentsKey
            // )
            // const targetIndex =
            //   this.mReqTodoList.content.findIndex(
            //     (todo) => todo.contentsKey === newTodo.contentsKey
            //   )
            // const refIndex =
            // this.mRefTodoList.content.findIndex(
            //   (todo) => todo.contentsKey === newTodo.targetKey
            // )
            // if (newTodo.contStatus === '99') {
            //   if (this.mCompTodoList.content.findIndex(
            //     (todo) => todo.contentsKey === newTodo.contentsKey
            //   ) === -1
            //   ) { this.mCompTodoList.content.unshift(newTodo) }
            //   if (refIndex !== -1) {
            //     this.mRefTodoList.content.splice(myIndex, 1)
            //   } else if (myIndex !== -1) {
            //     this.mMyTodoList.content.splice(myIndex, 1)
            //   } else if (targetIndex !== -1) {
            //     this.mReqTodoList.content.splice(targetIndex, 1)
            //   }
            // }
          } else {
            const returnList = this.splitList([newTodo, ...this.mMyTodoList.content, ...this.mCheckTodoList.content, ...this.mRefTodoList.content])
            if (returnList) {
              if (returnList.my) {
                this.mMyTodoList = { content: returnList.my }
              }
              if (returnList.check) {
                this.mCheckTodoList = { content: returnList.check }
              }
              if (returnList.ref) {
                this.mRefTodoList = { content: returnList.ref }
              }
            }
          }
        } else if (value[0].jobkindId === 'MEMO') {
          const memIndex = this.mMyMemoList.content.findIndex(
            (memo) => memo.contentsKey === newTodo.contentsKey
          )
          if (memIndex === -1) { this.mMyMemoList.content.unshift(newTodo) } else this.mMyMemoList.content[memIndex] = newTodo
        }
        /*  else if (
          this.mCompTodoList.content.findIndex(
            (todo) => todo.contentsKey === newTodo.contentsKey
          ) !== -1
        ) {
          const index = this.mCompTodoList.content.findIndex(
            (todo) => todo.contentsKey === newTodo.contentsKey
          )
          if (newTodo.contStatus === '00') {
            if (
              this.mCompTodoList.content[index]
                .contTarget === 'myTodo'
            ) {
              this.mMyTodoList.content.unshift(newTodo)
            } else if (
              this.mCompTodoList.content[index]
                .contTarget === 'myTodo'
            ) {
              this.mReqTodoList.content.unshift(newTodo)
            }
            if (index !== -1) {
              this.mCompTodoList.content.splice(index, 1)
            }
          }
        } */
      },
      deep: true
    }
  }
}
</script>

<style>

.todoTag {
  color: white;
  height: 19px;
  margin-bottom: 3px;
  line-height: 19px;
  padding: 0px 5px;
  border-radius: 5px;
  font-size: 11px;
  width: auto;
  display: inline-block;
  vertical-align: middle;
  white-space:nowrap;
}
.memoTab{
  width:33.3%;
  height:35px;
  line-height:33px;
  border-radius:20px 20px 0 0;
  background-color:#fff;
  border:2px solid #fff;
  color:#5f61bd !important;
  font-weight:bold;
  display:inline-block;
  text-align:center;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  padding:0 10px;
}
.mSelectedMemo{
  background-color:#5f61bd !important;
  color:#fff !important;
}
.memoBody{
  background-color:#fff;
  padding:10px 20px;
  width:99.9%;
  height:75px;
  margin-top:-10px;
}

svg > path {
  fill: rgba(96, 97, 190);
}
.completedTodoColor{
  color:rgb(151, 151, 151) !important;
}
.delayedTodo {
  color: red !important;
}
.mainTodoTab {
  padding: 0.5rem 0;
  list-style-type: none;
  text-align: center;
  height: 100%;
  white-space: nowrap;
  border-right: 1px solid rgba(94, 96, 189, 0.3);
  font-weight: bold;
  line-height:24px
}
.mainTodoTab:last-child {
  border-right: none;
}
.mainTodoTab:first-child {
  border-radius: 10px 0 0 10px;
}
.mainTodoTab:last-child {
  border-radius: 0 10px 10px 0;
}
.mainTodoTabSelected {
  background-color: #5f61bd !important;
  font-weight: bold !important;
  color: #fff !important;
}
.mainTodoTabSelected > span {
  color: #fff !important;
}

.arrangeBtn{
  width:25%;
  list-style-type: none;
}
.arrangeBtn:first-child{
  border-radius:10px 0 0 10px;
}
.arrangeBtn:last-child{
  border-radius:0 10px 10px 0;
}
.arrangeBtn.selected {
  font-weight:bold;
}
.totalInfo {
  font-size: 13px !important;
  white-space: nowrap;
}
.topWrap {
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  min-height: 40px;
  float: left;
  padding: 0 0.6rem;
  margin-bottom:10px;
}
.contents .mx-input-wrapper i {
  visibility: hidden !important;
  display: none !important;
}
.mx-table-date .today {
  color: #ff9f32 !important;
}
.mx-calendar-panel-date {
  width: 100% !important;
  border-bottom: 1px solid #ccc;
}
.mx-calendar-content .cell.active {
  background-color: #6768a7 !important;
}
.mx-calendar-content .hover-in-range {
  background-color: #cdceff56 !important;
}
.mx-datepicker input:hover {
  border: 1px solid #8183d6;
}
.mx-datepicker {
  font-size: 30px !important;
  width: 100% !important;
  max-width: 210px !important;
  min-width: 120px !important;
}

.mx-datepicker-popup {
  position: absolute;
  top: 300px;
  right: 2rem;
  z-index: 999999 !important;
}
.mx-datepicker-range {
  width: calc(100%) !important;
  float: left;
}

.mx-icon-calendar {
  top: 20px !important;
  color: #6768a7 !important;
  display: none !important;
}
.mx-icon-clear svg {
  display: none !important;
}
.mx-icon-calendar svg {
  width: 1.5em !important;
  height: 1.5em !important;
}

.mx-input {
  height: 40px !important;
  border-radius: 5px !important;
  padding: 1px 5px !important;
  box-shadow: none !important;
  float: left;
  box-sizing: border-box !important;
  border: none !important;
  background-color: #e7edff !important;
  text-align: Center;
  font-weight: bold;
  font-size: 30px;
  color: #6768a7 !important;
}
.todoBody {
  width: 100%;
  height: 100%;
  /* margin-top: 50px !important; */
}
.DatePicker {
  font-size: 18px;
  float: left;
  border-radius: 5px;
}
.dateArea {
  height: 50px;
  padding: 5px;
  margin: 0 10px;
}
.dateAreaBox {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.calBox {
  width: 40%;
  min-width: 263px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todoFilter {
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 5px;
  margin: 0 10px;
}
.addBtn {
  width: 50px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  border-radius: 20px;
}
.todoCateBox {
  border: 2px solid #acacac;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: white;
}
.contentsBody {
  /* height: calc(100% - 110px); */
  /* overflow: hidden auto; */
   padding-bottom: 120px;
   height:auto;
   float: left;
   width: 100%;
}
.cabiName {
  padding: 10px 15px;
}
.appUserPhotoBack {
  border-radius: 30px;
  background-color: rgb(223, 224, 226);
  min-width: 30px;
  min-height: 30px;
  margin-right: 5px;
}
.appUserPhoto {
  overflow: hidden;
  border-radius: 50%;
}
.strikeLine {
  position: absolute;
  background-color: #b8b5b5;
  height: 2px;
  width: 0;
  top: 50%;
  transform: translateY(-50%);
}
.extraInfoWrap {
  display: flex;
  align-items: center;
}
.todoListBox {
  width: 100%;
  padding: 5px;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.todoList {
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 0.5rem;
  border: 2px solid #acacac;
  padding: 0px 5px;
}
.countTodo {
  font-size: 14px;
}
.todoOtherInfos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.todoOtherInfosDueDate {
  display: flex;
  flex-direction: column;
  align-items: end;
  text-align: right;
}
.todoOtherInfosAsignee {
  width: 25%;
  display: flex;
  justify-content: end;
  align-items: center;
}

.mainTabWrap {
  padding: 0 !important;
}

.todoCabBox {
  background-color: white;
  border: 2px solid #acacac;
  padding: 5px;
  margin: 5px 10px 10px;
  border-radius: 20px;
}
.cabiName {
  padding: 10px 15px;
}
.w70 {
  width: 70px;
}
.scroll::-webkit-scrollbar {
  display: none;
}
.scroll {
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
}
.fade-out-box {
  animation: fadeout 1s;
  -moz-animation: fadeout 1s; /* Firefox */
  -webkit-animation: fadeout 1s; /* Safari and Chrome */
  -o-animation: fadeout 1s; /* Opera */
  animation-fill-mode: forwards;
}
@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@-webkit-keyframes fadeout {
  /* Safari and Chrome */
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@media screen and (max-width: 500px) {
  .topContainer {
    height: 130px !important;
  }
  .mainTabWrap {
    height: 34px !important;
    padding: 0 !important;
  }
  .mainTodoTab {
    font-size: 15px !important;
    line-height: 17px;
  }
  .countTodo {
    font-size: 12px !important;
  }
  .commonSubTitleTextBold {
    font-size: 14px;
  }
}
.commonSubTitleTextBold {
  font-size: 20px;
  font-weight: bold;
}
.popBg {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #00000026;
  z-index: 12;
  top: 0;
  left: 0;
}
.reportCompoArea {
  width: 95%;
  position: absolute;
  bottom: 0;
  left: 2.5%;
  z-index: 100000;
  margin: 1rem 0rem;
}
.memoFuncArea {
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mainHeaderBack {
  min-width: 25px;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left: 1rem;
}
/* .picImgWrap {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  background-color: #fff;
} */
/* .picWrapReal {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
} */
.MKAppUserPhotoBack {
  border-radius: 30px;
  background-color: rgb(223, 224, 226);
  min-width: 25px;
  min-height: 25px;
  margin-right: 5px;
}
.MKAppUserPhoto {
  overflow: hidden;
  border-radius: 50%;
}

@media screen and (max-width: 360px) {
  /* .todoOtherInfos{
    flex-direction:column;
    align-items:start;
  }
  .todoOtherInfosDueDate{
    width:100% !important;
    text-align:left !important;
    align-items:start !important;
  }
  .todoOtherInfosAsignee{
    width:100% !important;
    text-align:right;
  } */
}
ul li {
  list-style: none;
}
</style>
