<template>
  <addPop
    v-if="mAddTodoPopShowYn"
    :pClosePop="closeAddTodoPop"
    :pSelectDate="mSelectDate"
    :pGetTodoFamilyList="mGetTodoFamilyList"
    :pGetTodoListGroupCab="getTodoListGroupCab"
  />
  <detailPop
    v-if="mTodoDetailShowYn"
    :pClosePop="closeTodoDetail"
    :pSelectTodo="mSelectTodo"
    :pGetTodoList="getTodoListGroupCab"
    :pCompleteTodo="completeTodo"
    :pGetTodoListGroupCab="getTodoListGroupCab"
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
    :pGetTodoListGroupCab="getTodoListGroupCab"
    style="z-index: 999"
  />
  <!-- <transition name="show_right"> -->
  <!-- <CommonAddContentsForm
    style="z-index: 13"
    v-if="mWritePopShowYn"
    :pClosePop="closeWritePop"
    :pPostContentsFn="saveContents"
    :pGetReceiverList="returnTargetData"
    :pGetTagListFn="returnTag"
    :pOptions="mOption"
  /> -->
  <!-- </transition> -->
  <template v-if="mShowSkeletonYn" style="height: 100px">
    <SkeletonBox
      v-for="value in [0, 1, 2]"
      :key="value"
      style="height: 100px"
    />
  </template>
  <div
    class="todoBody"
    :style="`padding-top: ${this.$STATUS_HEIGHT}px !important;`"
  >
    <div
      style="
        height: 50px;
        border-bottom: 2px solid #6768a7;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
      "
    >
      <div @click="goMain" class="fl cursorP mainHeaderBack">
        <img
          src="@/assets/images/common/icon_back.png"
          class="fl commonPopBackBtn mleft-05"
          width="12"
          height="20"
        />
      </div>
      <div class="commonTitleText dateAreaBox">
        <div class="calBox">
          <div
            class="cursorP"
            style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;"
            @click="MoveDate(-1)"
          >
            <img
              class="cursorP"
              src="../../assets/images/todo/purpleArrow.png"
              style="transform: rotateZ(180deg)"
              width="20"
              height="20"
            />
          </div>
          <Datepicker
            class="cursorP fl DatePicker contents"
            v-model:value="mSelectDate"
            :editable="false"
            type="date"
            :format="'MMM DD, YYYY'"
          ></Datepicker>
          <div
            class="cursorP"
            style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center"
            @click="MoveDate(-1)"
          >
            <div
              class="fr fontBold cursorP addBtn CDeepBgColor"
              style="position: absolute; right: -50px;"
              @click.stop="goToday"
            >
              Today
            </div>
            <img
              class="cursorP"
              src="../../assets/images/todo/purpleArrow.png"
              width="20"
              height="20"
            />
          </div>
        </div>
      </div>
      <!-- <div
        class="todoFilter"
        style="position: absolute; right: 0"
        :style="`top: ${this.$STATUS_HEIGHT + 5}px;`"
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
    <div style="width: 100%; height: 100%">
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
      <div
        class=""
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          margin: 10px;
          border-radius: 10px;
          background-color: #e7edff;
        "
      >
        <div
          class="fontBold"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
          "
        >
          <p class="fontSize" style="margin-right: 10px">My</p>
          <p class="fontSize">
            {{
              calPercent(
                mCompleteMyTodoCount,
                mMyTodoCount + mCompleteMyTodoCount
              )
            }}
            <span style="font-size: 12px"
              >({{ mCompleteMyTodoCount }}/{{
                mMyTodoCount + mCompleteMyTodoCount
              }})</span
            >
          </p>
        </div>
        <div
          class="fontBold"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
          "
        >
          <p class="fontSize" style="margin-right: 10px">Asked</p>
          <p class="fontSize">
            {{
              calPercent(
                mCompleteTargetTodoCount,
                mTargetTodoCount + mCompleteTargetTodoCount
              )
            }}
            <span style="font-size: 12px"
              >({{ mCompleteTargetTodoCount }}/{{
                mTargetTodoCount + mCompleteTargetTodoCount
              }})</span
            >
          </p>
        </div>
      </div>
      <div
        v-if="
          mMyTodoCount === 0 &&
          mTargetTodoCount === 0 &&
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
        There are no today's todo.
      </div>
      <div
        v-else
        style="
          height: calc(100% - 150px);
          overflow: hidden auto;
          padding-bottom: 30px;
        "
      >
        <div
          v-if="mMyTodoYn"
          class="fontBold"
          style="
            text-align: left;
            padding: 5px 15px;
            display: flex;
            align-items: center;
            margin-top: 20px;
          "
        >
          <img
            src="../../../public/resource/menu/icon_board_color.svg"
            width="20"
            style="margin-right: 5px"
          />
          <p style="font-size: 18px">My ({{ mMyTodoCount }})</p>
        </div>
        <template
          v-for="(group, groupIndex) in mGetTodoGroupList"
          :key="groupIndex"
        >
          <div v-if="group.myTodoList.length !== 0" style="padding: 5px 15px">
            <div
              class="backShadow"
              style="padding: 10px; border-radius: 10px; background: #fff"
            >
              <div
                :class="todo.strikeOnOff ? 'fade-out-box' : ''"
                v-for="(todo, todoIndex) in group.myTodoList"
                @click="goDetail(todo)"
                :key="todoIndex"
                class="w100P cursorP"
                style="
                  background-color: white;
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                  padding: 10px;
                "
                :style="
                  group.myTodoList.length - 1 === todoIndex
                    ? ''
                    : 'border-bottom:1px solid #acacac;'
                "
              >
                <div
                  style="
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <div
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <div class="MKAppUserPhotoBack flexCenter p-05 fontNavy fl">
                      <div class="MKAppUserPhoto MKShadow h100P backShadow">
                        <div
                          @click.stop="goUserProfile(todo.creUserKey)"
                          class="middleBgColor fl imgCircle profileImg"
                          :style="`background-image: url('${
                            todo.userDomainPath
                              ? $changeUrlBackslash(
                                  todo.userDomainPath + todo.userProfileImg
                                )
                              : $changeUrlBackslash(todo.userProfileImg)
                          }')`"
                        ></div>
                        <!-- <img
                          :src="todo.userDomainPath + todo.userProfileImg"
                          style="width"
                        /> -->
                      </div>
                    </div>
                    <div
                      style="
                        margin-left: 5px;
                        display: flex;
                        flex-direction: column;
                        align-items: start;
                      "
                    >
                      <p
                        class="fl todoFontSize fontBold"
                        style="margin-right: 5px"
                        @click.stop="goUserProfile(todo.creUserKey)"
                      >
                        {{
                          todo.creUserName
                            ? $changeText(todo.creUserName)
                            : '나'
                        }}
                      </p>
                    </div>
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      align-items: end;
                      text-align: right;
                    "
                  >
                    <div
                      class="fr CLDeepGrayColor todoFontSize"
                      style="line-height: 23px"
                    >
                      <span>{{
                        compareSameDate(getMonthDate(todo.workFromDate), getMonthDate(todo.workToDate))
                      }}</span>
                    </div>
                  </div>
                </div>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    margin-top: 10px;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      margin-left: 5px;
                      width: 75%;
                    "
                  >
                    <img
                      v-if="todo.strikeOnOff"
                      src="../../assets/images/todo/checkboxCheck.png"
                      width="20"
                      height="20"
                      @click.stop="
                        setCompleteTodo(
                          todo,
                          'myTodoList',
                          groupIndex,
                          todoIndex
                        )
                      "
                    />
                    <img
                      v-else
                      src="../../assets/images/todo/checkboxBlank.png"
                      width="20"
                      height="20"
                      @click.stop="
                        setCompleteTodo(
                          todo,
                          'myTodoList',
                          groupIndex,
                          todoIndex
                        )
                      "
                    />
                    <p
                      v-if="todo.contStatus === '00'"
                      class="fl fontBold todoFontSize mLeft-05"
                      style="
                        position: relative;
                        margin-left: 5px;
                        text-align: left;
                      "
                    >
                      <span
                        class="strikeLine"
                        :style="
                          todo.strikeOnOff
                            ? 'transition: all .3s; width:100%;'
                            : 'width:0;'
                        "
                      ></span>
                      {{ todo.title }}
                    </p>
                  </div>
                  <div style="width:25%; display:flex; justify-content:end; align-items:center;">
                    <div class="w100P actorImgList " @click.stop="openActorList(todoIndex, 0)">
                      <template v-for="(each, index) in todo.mNewActorList" :key="index" >
                        <img v-if="each.accessKind === 'U'" class="actorImg" :src="each.domainPath ? each.domainPath + each.pathMtext : require(`@/assets/images/intro/login/uniB_logo.png`)" style="" :alt="each.userDispMtext"/>
                        <img v-else class="actorImg" :src="require(`@/assets/images/todo/channer_addressBook.svg`)" style="" :alt="each.userDispMtext"/>
                        <div class="moreActorImg todoFontSize" style="" v-if="todo.actorList.length > 3 && index === 2">+{{ todo.actorList.length - 3 }}</div>
                        <div class="actorNameListWrap" v-if="mGetWhichTodoIndex === 0 && mOpenActorListIndex === todoIndex && mOpenActorListYn">
                          <div class="actorNameList">
                            <p class="todoFontSize" v-for="(each, index) in todo.actorList" :key="index">{{ each ? $changeText(each.userDispMtext) : 'X' }}</p>
                          </div>
                        </div>
                      </template>
                  </div>
                  </div>
                </div>
                <div
                  class="w100P"
                  style="
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    border-radius: 10px;
                    background-color: rgb(248, 248, 255);
                  "
                >
                  <div>
                    <div
                      style="
                        width: 30px;
                        height: 35px;
                        display: flex;
                        cursor: pointer;
                        float: left;
                        margin-right: 10px;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <div style="width: 100%; height: 20px; float: left">
                        <img
                          v-if="mWriteMemoYn"
                          :src="require(`@/assets/images/todo/memoIcon.svg`)"
                          class=""
                          alt=""
                        />
                        <img
                          v-else
                          :src="require(`@/assets/images/todo/memoIcon.svg`)"
                          class=""
                          alt=""
                        />
                      </div>
                      <p class="font12 fontBold mtop-01 fl w-100P userDoColor">
                        {{
                          todo.memoList.length === 0
                            ? '0'
                            : todo.memoList.length
                        }}
                      </p>
                    </div>
                    <div
                      v-if="todo.fileCount"
                      @click="clickFileDownload()"
                      style="
                        cursor: pointer;
                        width: 30px;
                        height: 35px;
                        display: flex;
                        float: left;
                        margin-right: 10px;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <div style="width: 100%; height: 20px; float: left">
                        <img
                          :src="require(`@/assets/images/todo/attachIcon.svg`)"
                          class=""
                          alt=""
                        />
                      </div>
                      <p class="font12 fontBold mtop-01 fl w-100P userDoColor">
                        {{ todo.fileCount }}
                      </p>
                    </div>
                  </div>
                  <div
                    style="
                      display: flex;
                      gap: 3px;
                      flex-wrap: wrap;
                      justify-content: end;
                    "
                  >
                    <div
                      v-for="(tag, index) in todo.tagList"
                      :key="index"
                      class="CDeepBgColor"
                      style="
                        color: white;
                        height: 20px;
                        line-height: 20px;
                        padding: 0px 5px;
                        border-radius: 10px;
                        font-size: 10px;
                        width: auto;
                      "
                    >
                      {{ tag.tagText }}
                    </div>
                  </div>
                </div>
                <!-- <div @click="openUniBTodoDetail" class="CDeepBgColor" style="color:white; height:20px; line-height:20px; padding: 0px 5px; border-radius: 10px; font-size: 10px; width:40px">{{ changeTypeToText(todo.todoType) }}</div> -->
              </div>
            </div>
          </div>
        </template>
        <div
          v-if="mTargetTodoYn"
          class="fontBold"
          style="
            text-align: left;
            padding: 5px 15px;
            display: flex;
            align-items: center;
            margin-top: 20px;
          "
        >
          <img
            src="../../../public/resource/menu/icon_board_color.svg"
            width="20"
            style="margin-right: 5px"
          />
          <p style="font-size: 18px">What I Asked ({{ mTargetTodoCount }})</p>
        </div>
        <template
          v-for="(group, groupIndex) in mGetTodoGroupList"
          :key="groupIndex"
        >
          <div
            v-if="group.targetTodoList.length !== 0"
            style="padding: 5px 15px"
          >
            <div
              class="backShadow"
              style="padding: 10px; border-radius: 10px; background: #fff"
            >
              <div
                :class="todo.strikeOnOff ? 'fade-out-box' : ''"
                v-for="(todo, todoIndex) in group.targetTodoList"
                :key="todoIndex"
                class="w100P cursorP"
                style="
                  background-color: white;
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                  padding: 10px 10px;
                "
                :style="
                  group.targetTodoList.length - 1 === todoIndex
                    ? ''
                    : 'border-bottom:1px solid #acacac;'
                "
                @click="goDetail(todo)"
              >
                <div
                  style="
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <div
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <div class="MKAppUserPhotoBack flexCenter p-05 fontNavy fl">
                      <div class="MKAppUserPhoto MKShadow h100P backShadow">
                        <div
                          @click.stop="goUserProfile(todo.creUserKey)"
                          class="middleBgColor fl imgCircle profileImg"
                          :style="`background-image: url('${
                            todo.userDomainPath
                              ? $changeUrlBackslash(
                                  todo.userDomainPath + todo.userProfileImg
                                )
                              : $changeUrlBackslash(todo.userProfileImg)
                          }')`"
                        ></div>
                        <!-- <img
                          :src="todo.userDomainPath + todo.userProfileImg"
                          style="width: 20px; height: 20px"
                        /> -->
                      </div>
                    </div>
                    <div
                      style="
                        margin-left: 5px;
                        display: flex;
                        flex-direction: column;
                        align-items: start;
                      "
                    >
                      <p
                        class="fl todoFontSize fontBold"
                        @click.stop="goUserProfile(todo.creUserKey)"
                        style="margin-right: 5px"
                      >
                        {{
                          todo.creUserName
                            ? $changeText(todo.creUserName)
                            : '나'
                        }}
                      </p>
                      <!-- <span class="todoFontSize" style="display:flex; gap:5px; color:#7E7E7E;">( 담당자 :
                      <span class="fontBold" v-for="(each, index) in todo.actorList" :key="index">
                        {{ each.userDispMtext ? $changeText(each.userDispMtext) : '담당자' }}
                      </span>)
                    </span> -->
                    </div>
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      align-items: end;
                      text-align: right;
                    "
                  >
                    <p
                      class="fr CLDeepGrayColor todoFontSize"
                      style="line-height: 23px"
                    >
                      <span>{{
                        compareSameDate(getMonthDate(todo.workFromDate), getMonthDate(todo.workToDate))
                      }}</span>
                    </p>
                  </div>
                  <!-- <img v-if="todo.status === '00'" class="cursorP" src="../../assets/images/todo/todoMenu.png" width="4" height="15" @click="openSubMenu(todo)"/> -->
                </div>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    margin-top: 10px;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      margin-left: 5px;
                      width: 75%;
                    "
                  >
                    <img
                      v-if="todo.strikeOnOff"
                      src="../../assets/images/todo/checkboxCheck.png"
                      width="20"
                      height="20"
                      @click.stop="
                        setCompleteTodo(
                          todo,
                          'targetTodoList',
                          groupIndex,
                          todoIndex
                        )
                      "
                    />
                    <img
                      v-else
                      src="../../assets/images/todo/checkboxBlank.png"
                      width="20"
                      height="20"
                      @click.stop="
                        setCompleteTodo(
                          todo,
                          'targetTodoList',
                          groupIndex,
                          todoIndex
                        )
                      "
                    />
                    <p
                      v-if="todo.contStatus === '00'"
                      class="fl fontBold todoFontSize mLeft-05"
                      style="
                        position: relative;
                        margin-left: 5px;
                        text-align: left;
                      "
                    >
                      <span
                        class="strikeLine"
                        :style="
                          todo.strikeOnOff
                            ? 'transition: all .3s; width:100%;'
                            : 'width:0;'
                        "
                      ></span>
                      {{ todo.title }}
                    </p>
                  </div>
                  <div style="width:25%; display:flex; justify-content:end; align-items:center;">
                    <div class="w100P actorImgList " @click.stop="openActorList(todoIndex, 1)">
                      <template v-for="(each, index) in todo.mNewActorList" :key="index" >
                        <img v-if="each.accessKind === 'U'" class="actorImg" :src="each.domainPath ? each.domainPath + each.pathMtext : require(`@/assets/images/intro/login/uniB_logo.png`)" style="" :alt="each.userDispMtext"/>
                        <img v-else class="actorImg" :src="require(`@/assets/images/todo/channer_addressBook.svg`)" style="" :alt="each.userDispMtext"/>
                        <div class="moreActorImg todoFontSize" style="" v-if="todo.actorList.length > 3 && index === 2">+{{ todo.actorList.length - 3 }}</div>
                        <div class="actorNameListWrap" v-if="mGetWhichTodoIndex === 1 && mOpenActorListIndex === todoIndex && mOpenActorListYn">
                          <div class="actorNameList">
                            <p class="todoFontSize" v-for="(each, index) in todo.actorList" :key="index">{{ each ? $changeText(each.userDispMtext) : 'X' }}</p>
                          </div>
                        </div>
                      </template>
                  </div>
                  </div>
                </div>
                <div
                  class="w100P"
                  style="
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    border-radius: 10px;
                    background-color: rgb(248, 248, 255);
                  "
                >
                  <div>
                    <div
                      style="
                        width: 30px;
                        height: 35px;
                        display: flex;
                        cursor: pointer;
                        float: left;
                        margin-right: 10px;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <div style="width: 100%; height: 20px; float: left">
                        <img
                          v-if="mWriteMemoYn"
                          :src="require(`@/assets/images/todo/memoIcon.svg`)"
                          class=""
                          alt=""
                        />
                        <img
                          v-else
                          :src="require(`@/assets/images/todo/memoIcon.svg`)"
                          class=""
                          alt=""
                        />
                      </div>
                      <p class="font12 fontBold mtop-01 fl w-100P userDoColor">
                        {{
                          todo.memoList.length === 0
                            ? '0'
                            : todo.memoList.length
                        }}
                      </p>
                    </div>
                    <div
                      v-if="todo.fileCount"
                      @click="clickFileDownload()"
                      style="
                        cursor: pointer;
                        width: 30px;
                        height: 35px;
                        display: flex;
                        float: left;
                        margin-right: 10px;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <div style="width: 100%; height: 20px; float: left">
                        <img
                          :src="require(`@/assets/images/todo/attachIcon.svg`)"
                          class=""
                          alt=""
                        />
                      </div>
                      <p class="font12 fontBold mtop-01 fl w-100P userDoColor">
                        {{ todo.fileCount }}
                      </p>
                    </div>
                  </div>
                  <div
                    style="
                      display: flex;
                      gap: 3px;
                      flex-wrap: wrap;
                      justify-content: end;
                    "
                  >
                    <div
                      v-for="(tag, index) in todo.tagList"
                      :key="index"
                      class="CDeepBgColor"
                      style="
                        color: white;
                        height: 20px;
                        line-height: 20px;
                        padding: 0px 5px;
                        border-radius: 10px;
                        font-size: 10px;
                        width: auto;
                      "
                    >
                      {{ tag.tagText }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div
          v-if="mCompleteTodoYn"
          class="fontBold"
          style="
            text-align: left;
            padding: 5px 15px;
            display: flex;
            align-items: center;
            margin-top: 20px;
          "
        >
          <img
            src="../../../public/resource/menu/icon_board_color.svg"
            width="20"
            style="margin-right: 5px"
          />
          <p style="font-size: 18px">
            Completed Todo ({{ mCompleteTodoCount }})
          </p>
        </div>
        <template
          v-for="(group, groupIndex) in mGetTodoGroupList"
          :key="groupIndex"
        >
          <div
            v-if="group.completeTodoList.length !== 0"
            style="padding: 5px 15px"
          >
            <div
              class="backShadow"
              style="padding: 10px; border-radius: 10px; background: #fff"
            >
              <div
                :class="todo.strikeOnOff ? 'fade-out-box' : ''"
                v-for="(todo, todoIndex) in group.completeTodoList"
                :key="todoIndex"
                class="w100P cursorP"
                style="
                  background-color: white;
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                  padding: 10px 10px;
                "
                :style="
                  group.completeTodoList.length - 1 === todoIndex
                    ? ''
                    : 'border-bottom:1px solid #acacac;'
                "
                @click="goDetail(todo)"
              >
                <div
                  style="
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <div
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <div class="MKAppUserPhotoBack flexCenter p-05 fontNavy fl">
                      <div class="MKAppUserPhoto MKShadow h100P backShadow">
                        <div
                          @click.stop="goUserProfile(todo.creUserKey)"
                          class="middleBgColor fl imgCircle profileImg"
                          :style="`background-image: url('${
                            todo.userDomainPath
                              ? $changeUrlBackslash(
                                  todo.userDomainPath + todo.userProfileImg
                                )
                              : $changeUrlBackslash(todo.userProfileImg)
                          }')`"
                        ></div>
                        <!-- <img
                          :src="todo.userDomainPath + todo.userProfileImg"
                          style="width: 20px; height: 20px"
                        /> -->
                      </div>
                    </div>
                    <div
                      style="
                        margin-left: 5px;
                        display: flex;
                        flex-direction: column;
                        align-items: start;
                      "
                    >
                      <p
                        class="fl todoFontSize"
                        @click.stop="goUserProfile(todo.creUserKey)"
                        style="margin-right: 5px"
                      >
                        {{
                          todo.creUserName
                            ? $changeText(todo.creUserName)
                            : '나'
                        }}
                      </p>
                    </div>
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      align-items: end;
                      text-align: right;
                    "
                  >
                    <p
                      class="fr CLDeepGrayColor todoFontSize"
                      style="line-height: 23px"
                    >
                      <span>{{
                        compareSameDate(getMonthDate(todo.workFromDate), getMonthDate(todo.workToDate))
                      }}</span>
                    </p>
                  </div>
                  <!-- <img v-if="todo.status === '00'" class="cursorP" src="../../assets/images/todo/todoMenu.png" width="4" height="15" @click="openSubMenu(todo)"/> -->
                </div>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    margin-top: 10px;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      margin-left: 5px;
                      width: 75%;
                    "
                  >
                    <img
                      v-if="todo.strikeOnOff"
                      src="../../assets/images/todo/checkboxBlank.png"
                      width="20"
                      height="20"
                      @click.stop="
                        setCompleteTodo(
                          todo,
                          'completeTodoList',
                          groupIndex,
                          todoIndex
                        )
                      "
                    />
                    <img
                      v-else
                      src="../../assets/images/todo/checkboxCheck.png"
                      width="20"
                      height="20"
                      @click.stop="
                        setCompleteTodo(
                          todo,
                          'completeTodoList',
                          groupIndex,
                          todoIndex
                        )
                      "
                    />
                    <p
                      class="fl fontBold todoFontSize fontBold mLeft-05 completeTodoTitle"
                      style="
                        position: relative;
                        margin-left: 5px;
                        text-align: left;
                        color: #b8b5b5;
                      "
                    >
                      <span
                        class="strikeLine"
                        :style="
                          todo.strikeOnOff
                            ? 'transition: all .3s; width:0;'
                            : 'width:100%;'
                        "
                      ></span>
                      {{ todo.title }}
                    </p>
                  </div>
                  <div style="width:25%; display:flex; justify-content:end; align-items:center;">
                    <div class="w100P actorImgList " @click.stop="openActorList(todoIndex, 2)">
                      <template v-for="(each, index) in todo.mNewActorList" :key="index" >
                        <img v-if="each.accessKind === 'U'" class="actorImg" :src="each.domainPath ? each.domainPath + each.pathMtext : require(`@/assets/images/intro/login/uniB_logo.png`)" style="" :alt="each.userDispMtext"/>
                        <img v-else class="actorImg" :src="require(`@/assets/images/todo/channer_addressBook.svg`)" style="" :alt="each.userDispMtext"/>
                        <div class="moreActorImg todoFontSize" style="" v-if="todo.actorList.length > 3 && index === 2">+{{ todo.actorList.length - 3 }}</div>
                        <div class="actorNameListWrap" v-if="mGetWhichTodoIndex === 2 && mOpenActorListIndex === todoIndex && mOpenActorListYn">
                          <div class="actorNameList">
                            <p class="todoFontSize" v-for="(each, index) in todo.actorList" :key="index">{{ each ? $changeText(each.userDispMtext) : 'X' }}</p>
                          </div>
                        </div>
                      </template>
                  </div>
                  </div>
                  <!-- <div class="CDeepBgColor" style="color:white; height:20px; line-height:20px; padding: 0px 5px; border-radius: 10px; font-size: 10px; width:40px">{{ changeTypeToText(todo.todoType) }}</div> -->
                </div>
                <div
                  class="w100P"
                  style="
                    margin-top: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    border-radius: 10px;
                    background-color: rgb(248, 248, 255);
                  "
                >
                  <div>
                    <div
                      style="
                        width: 30px;
                        height: 35px;
                        display: flex;
                        cursor: pointer;
                        float: left;
                        margin-right: 10px;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <div style="width: 100%; height: 20px; float: left">
                        <img
                          v-if="mWriteMemoYn"
                          :src="require(`@/assets/images/todo/memoIcon.svg`)"
                          class=""
                          alt=""
                        />
                        <img
                          v-else
                          :src="require(`@/assets/images/todo/memoIcon.svg`)"
                          class=""
                          alt=""
                        />
                      </div>
                      <p class="font12 fontBold mtop-01 fl w-100P userDoColor">
                        {{
                          todo.memoList.length === 0
                            ? '0'
                            : todo.memoList.length
                        }}
                      </p>
                    </div>
                    <div
                      v-if="todo.fileCount"
                      @click="clickFileDownload()"
                      style="
                        cursor: pointer;
                        width: 30px;
                        height: 35px;
                        display: flex;
                        float: left;
                        margin-right: 10px;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <div style="width: 100%; height: 20px; float: left">
                        <img
                          :src="require(`@/assets/images/todo/attachIcon.svg`)"
                          class=""
                          alt=""
                        />
                      </div>
                      <p class="font12 fontBold mtop-01 fl w-100P userDoColor">
                        {{ todo.fileCount }}
                      </p>
                    </div>
                  </div>
                  <div
                    style="
                      display: flex;
                      gap: 3px;
                      flex-wrap: wrap;
                      justify-content: end;
                    "
                  >
                    <div
                      v-for="(tag, index) in todo.tagList"
                      :key="index"
                      class="CDeepBgColor"
                      style="
                        color: white;
                        height: 20px;
                        line-height: 20px;
                        padding: 0px 5px;
                        border-radius: 10px;
                        font-size: 10px;
                        width: auto;
                      "
                    >
                      {{ tag.tagText }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <img
      id="writeBtn"
      src="@/assets/images/button/Icon_WriteBoardBtn.png"
      @click="openAddTodoPop"
      alt="button for write contents"
      class="img-78 img-w66 writeContentsBtn"
    />
  </div>
  <div class="popBg" v-if="mWritePopShowYn"></div>
  <!-- <transition name="show_right"> -->
  <CommonAddContentsForm
    style="z-index: 13"
    v-if="mWritePopShowYn"
    :pClosePop="closeWritePop"
    :pPostContentsFn="saveContents"
    :pGetReceiverList="returnTargetData"
    :pGetTagListFn="returnTag"
    :pOptions="mOption"
    :pUserInfo="GE_USER"
  />
  <div
    class="popBg"
    v-if="mProfilePopShowYn"
    @click="closeProfilePop"
  ></div>
  <userDetailPop
    v-if="mProfilePopShowYn"
    :propData="mPopParam"
    :pClosePop="closeProfilePop"
  />
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
import addPop from '../../components/pageComponents/todo/addPop.vue'
import unibDetailPop from '../../components/pageComponents/todo/unibDetailPop.vue'
import detailPop from '../../components/pageComponents/todo/detailPop.vue'
import setPop from '../../components/pageComponents/todo/setPop.vue'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import { commonMethods } from '../../assets/js/common'
import SkeletonBox from '@/components/unit/contents/ContentsSkeleton'
import CommonAddContentsForm from '../../components/common/CommonAddContentsForm.vue'
import userDetailPop from '@/components/popup/UserDetailPop'

export default {
  components: {
    Datepicker,
    addPop,
    detailPop,
    setPop,
    unibDetailPop,
    SkeletonBox,
    CommonAddContentsForm,
    userDetailPop
  },
  data() {
    return {
      mSelectDate: '',
      mMyTodoYn: false,
      mTargetTodoYn: false,
      mTodosideMenu: false,
      mCompleteTodoYn: false,
      mGetTodoGroupList: [],
      mMyTodoCount: 0,
      mTargetTodoCount: 0,
      mCompleteTodoCount: 0,
      mCompleteMyTodoCount: 0,
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
      mTargetDataList: [],
      mProfilePopShowYn: false,
      mOption: {
        model: 'mankik',
        purpose: 'Add ToDo',
        fileServerURL: 'https://unibuzzy.com/file/tp.uploadFile'
      },
      mTagList: [
        { categoryNameMtext: 'Select', categoryKey: 'A' },
        { categoryNameMtext: 'HouseWork', categoryKey: 'H' },
        { categoryNameMtext: 'Work', categoryKey: 'T' },
        { categoryNameMtext: 'Self-Improvement', categoryKey: 'S' },
        { categoryNameMtext: 'etc', categoryKey: 'E' }
      ],
      mWritePopShowYn: false,
      mGetWhichTodoIndex: -1,
      mOpenActorListIndex: -1,
      mOpenActorListYn: false,
      mPopParam: {}
    }
  },
  created() {
    this.$emit('enterCloudLoading', false)
    setTimeout(() => {
      // this.getTodoListGroupCab()
      this.$emit('showCloudLoading', false)
    }, 1000)
    const todoObject = {
      teamKey: 0
    }

    this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', [todoObject])
    this.mSelectDate = new Date()
  },
  methods: {
    closeProfilePop() {
      this.mProfilePopShowYn = false
    },
    goToday () {
      this.mSelectDate = new Date()
    },
    async goUserProfile(targetUserKey) {
      if (this.GE_USER.unknownYn) {
        this.$showToastPop(this.$t('CONF_MSG_CHECK_UNABLE'))
        return
      }
      var openPopParam = {}
      openPopParam.targetType = 'bookMemberDetail'
      openPopParam.userKey = targetUserKey

      if (targetUserKey) openPopParam.userKey = targetUserKey
      openPopParam.popHeaderText = this.$t('COMMON_TITLE_PROFILE')
      openPopParam.readOnlyYn = true
      this.mPopParam = openPopParam
      this.mProfilePopShowYn = true
    },
    // workToDate와 workFromDate가 같으면 날짜가 하나만 표시되도록
    compareSameDate (from, to) {
      if (from === to) {
        return from
      } else {
        return `${from} ~ ${to}`
      }
    },
    clickFileDownload() {
      return false // 추후 수정
    },
    openActorList(actorIndex, whichTodoIndex) {
      this.mOpenActorListIndex = actorIndex
      this.mGetWhichTodoIndex = whichTodoIndex
      this.mOpenActorListYn = !this.mOpenActorListYn
    },
    getMonthDate(date) {
      var format = 'MM/DD'
      return this.$dayjs(date).add(-13, 'hour').format(format)
    },
    goDetail(value) {
      console.log(value)
      var param = {}
      param.targetType = 'contentsDetail'
      param.targetKey = value.contentsKey
      param.popHeaderText = '오늘의 일'
      // param.teamKey = 0
      // param.creTeamKey = 0
      param.jobkindId = value.jobkindId
      param.creTeamKey = value.creTeamKey
      param.value = value
      value.readYn = 1
      param.readYn = value.readYn
      this.$emit('goDetail', param)
    },
    closeXPop(popId) {
      var history = this.$store.getters['UB_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('UB_HISTORY/setRemovePage', removePage)
      this.$store.commit('UB_HISTORY/updateStack', history)
      this.$checkDeleteHistory(popId)
    },
    closeWritePop() {
      this.closeXPop('writeContents')
      this.mWritePopShowYn = false
    },
    async saveContents(params) {
      params.creUserKey = this.GE_USER.userKey
      params.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      params.jobkindId = 'TODO'
      console.log(params.actorList)
      if (params.actorList) {
        const tempList = [...params.actorList]
        const actorList = []
        tempList.forEach((val) => {
          const tempObj = {
            accessKey: val.accessKey,
            accessKind: val.accessKind
          }
          actorList.push(tempObj)
        })
        params.actorList = actorList
      }
      await this.$saveContents(params).then((res) => {
        if (res.result) {
          this.getTodoListGroupCab()
        }
      })
      this.closeWritePop('WriteContents', this.closeWritePop)
    },
    returnTag() {
      return this.mTagList
    },
    openUniBTodoDetail() {
      // var param = {}
      // param.targetType = 'contentsDetail'
      // param.targetKey = 1011783
      // this.$emit('openPop', param)
      this.$router.push('/todo/1011783/934/13624')
    },
    closeUniBTodoDetail() {
      this.mUniBTodoDetailPopShowYn = false
    },
    checkTarget(value) {
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
          return 'target'
        } else {
          return 'completedTarget'
        }
      }
    },
    setCompleteTodo(value, menu, groupIndex, todoIndex) {
      this.completeTodo(value)
      this.mGetTodoGroupList[groupIndex][menu][todoIndex].strikeOnOff = true
      const todoType = this.checkTarget(value)
      setTimeout(() => {
        switch (todoType) {
          case 'my':
            this.mGetTodoGroupList[groupIndex][menu][todoIndex].contStatus =
              '99'
            this.mGetTodoGroupList[groupIndex][menu][
              todoIndex
            ].strikeOnOff = false
            this.mGetTodoGroupList[groupIndex][menu][
              todoIndex
            ].completeUserName = this.GE_USER.userNameMtext
            this.mGetTodoGroupList[groupIndex].completeTodoList.unshift(
              this.mGetTodoGroupList[groupIndex][menu][todoIndex]
            )
            this.mGetTodoGroupList[groupIndex][menu].splice(todoIndex, 1)
            // this.mMyTodoCount -= 1
            //  this.mCompleteMyTodoCount += 1
            break
          case 'target':
            this.mGetTodoGroupList[groupIndex][menu][todoIndex].contStatus =
              '99'
            this.mGetTodoGroupList[groupIndex][menu][
              todoIndex
            ].strikeOnOff = false
            this.mGetTodoGroupList[groupIndex][menu][
              todoIndex
            ].completeUserName = this.GE_USER.userNameMtext
            this.mGetTodoGroupList[groupIndex].completeTodoList.unshift(
              this.mGetTodoGroupList[groupIndex][menu][todoIndex]
            )
            this.mGetTodoGroupList[groupIndex][menu].splice(todoIndex, 1)
            // this.mTargetTodoCount -= 1
            // this.mCompleteTargetTodoCount += 1
            break
          case 'completedMy':
            this.mGetTodoGroupList[groupIndex][menu][todoIndex].contStatus =
              '00'
            this.mGetTodoGroupList[groupIndex][menu][
              todoIndex
            ].strikeOnOff = false
            this.mGetTodoGroupList[groupIndex].myTodoList.unshift(
              this.mGetTodoGroupList[groupIndex][menu][todoIndex]
            )
            this.mGetTodoGroupList[groupIndex][menu].splice(todoIndex, 1)
            // this.mMyTodoCount += 1
            // this.mCompleteMyTodoCount -= 1
            break
          case 'completedTarget':
            this.mGetTodoGroupList[groupIndex][menu][todoIndex].contStatus =
              '00'
            this.mGetTodoGroupList[groupIndex][menu][
              todoIndex
            ].strikeOnOff = false
            this.mGetTodoGroupList[groupIndex].targetTodoList.unshift(
              this.mGetTodoGroupList[groupIndex][menu][todoIndex]
            )
            this.mGetTodoGroupList[groupIndex][menu].splice(todoIndex, 1)
            // this.mTargetTodoCount += 1
            // this.mCompleteTargetTodoCount -= 1
            break
        }
        this.mMyTodoYn =
          this.mGetTodoGroupList[groupIndex].myTodoList.length > 0
        this.mTargetTodoYn =
          this.mGetTodoGroupList[groupIndex].targetTodoList.length > 0
        this.mCompleteTodoYn =
          this.mGetTodoGroupList[groupIndex].completeTodoList.length > 0
      }, 1000)
    },
    MoveDate(value) {
      this.setCountDate += value
      const setDate = this.mSelectDate.setDate(
        this.mSelectDate.getDate() + value
      )
      const returnDate = new Date(setDate)
      this.mSelectDate = returnDate
    },
    async completeTodo(value, loadingYn) {
      var param = {}
      param.contentsKey = value.contentsKey
      param.workUserName = this.GE_USER.userDispMtext
      param.jobkindId = 'TODO'
      if (value.contStatus === '00') {
        param.contStatus = '99'
      } else {
        param.contStatus = '00'
      }
      param.workUserKey = this.GE_USER.userKey
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.updateTodo',
        param: param
      })
      console.log(result)
    },
    async getTodoList(loadingYn) {
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
    convertTargetData(target) {
      if (target && target.length > 0) {
        const tempList = []
        target.forEach((value) => {
          const tempObj = {}
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
        })
        this.mTargetDataList = [
          {
            targetList: tempList
          }
        ]
      }
    },
    returnTargetData() {
      return this.mTargetDataList
    },
    async getTodoListGroupCab(loadingYn) {
      const param = {
        userKey: this.GE_USER.userKey,
        jobkindId: 'TODO',
        searchDateStr: this.getToday(this.mSelectDate),
        pageSize: 30
      }
      const myContents = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMyContentsList',
        param: param
      }, true)
      if (myContents.data.content) {
        for (let i = 0; i < myContents.data.content.length; i++) {
          myContents.data.content[i].creTeamKey = 0
          this.mGetTodoGroupList = myContents.data.content
        }
      } else {
        this.mGetTodoGroupList = []
      }
      this.$store.dispatch(
        'UB_CHANNEL/AC_ADD_CONTENTS',
        myContents.data.content
      )
      // const myContents = await this.$getContentsList(param)
      this.mMyTodoYn = false
      this.mTargetTodoYn = false
      this.mCompleteTodoYn = false
      this.mMyTodoCount = 0
      this.mTargetTodoCount = 0
      this.mCompleteTodoCount = 0
      this.mCompleteMyTodoCount = 0
      this.mCompleteTargetTodoCount = 0
      const myTodoList = []
      const targetTodoList = []
      const completeTodoList = []
      const cabinetList = {}
      console.log('============ todo group list =====', this.mGetTodoGroupList)
      for (let i = 0; i < this.mGetTodoGroupList.length; i++) {
        // actorList 가 3명 이상일 경우 3명으로 추리기
        console.log('몇명이야?', this.mGetTodoGroupList[i].actorList.length)
        this.mNewActorList = this.mGetTodoGroupList[i].actorList
        if (this.mNewActorList.length > 3) {
          this.mNewActorList = this.mNewActorList.slice(0, 3)
        }
        console.log('this.this.mNewActorList', this.mNewActorList)
        this.mGetTodoGroupList[i].mNewActorList = this.mNewActorList
        this.mGetTodoGroupList[i].strikeOnOff = false
        this.mGetTodoGroupList[i].sideMenuOpenYn = false
        // 들어온 일이 내 것인이, 남의 것인지 구분해주는 함수
        const todoType = this.checkTarget(this.mGetTodoGroupList[i])
        switch (todoType) {
          case 'my':
            myTodoList.push(this.mGetTodoGroupList[i])
            // this.mMyTodoCount++
            break
          case 'target':
            targetTodoList.push(this.mGetTodoGroupList[i])
            // this.mTargetTodoCount++
            break
          case 'completedMy':
            this.mGetTodoGroupList[i].completeTarget = 'myTodo'
            completeTodoList.push(this.mGetTodoGroupList[i])
            // this.mMyTodoCount++
            // this.mCompleteMyTodoCount++
            // this.mCompleteTodoCount++
            break
          case 'completedTarget':
            this.mGetTodoGroupList[i].completeTarget = 'target'
            completeTodoList.push(this.mGetTodoGroupList[i])
            // this.mCompleteTargetTodoCount++
            // this.mTargetTodoCount++
            // this.mCompleteTodoCount++
            break
        }
      }
      cabinetList.myTodoList = this.replaceArr(myTodoList)
      cabinetList.targetTodoList = this.replaceArr(targetTodoList)
      cabinetList.completeTodoList = this.replaceArr(completeTodoList)
      this.mMyTodoYn = cabinetList.myTodoList.length > 0
      this.mTargetTodoYn = cabinetList.targetTodoList.length > 0
      this.mCompleteTodoYn = cabinetList.completeTodoList.length > 0
      this.mGetTodoGroupList = [cabinetList]
      // }
    },
    todosideMenu(todo, value, groupIndex, todoIndex) {
      this.mSelectTodo = todo
      this.mGetTodoGroupList[groupIndex][value][todoIndex].sideMenuOpenYn =
        !this.mGetTodoGroupList[groupIndex][value][todoIndex].sideMenuOpenYn
    },
    getToday(value) {
      var date = value
      var year = date.getFullYear()
      var month = ('0' + (1 + date.getMonth())).slice(-2)
      var day = ('0' + date.getDate()).slice(-2)

      return year + '-' + month + '-' + day
    },
    getDate(value) {
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
    changeTypeToText(value) {
      let returnData = ''
      if (value === 'H') {
        returnData = 'HouseWork'
      } else if (value === 'T') {
        returnData = 'Work'
      } else if (value === 'S') {
        returnData = 'Self-Improvement'
      } else if (value === 'E') {
        returnData = 'etc'
      }
      return returnData
    },
    async deleteTodo(loadingYn) {
      commonMethods.showAxiosLoading(true)
      var param = {}
      param.todoKey = this.mTodoObj.todoKey
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var result = await this.$deleteTodo(param, nonLoading)
      console.log(result)
      if (result.result) {
        this.getTodoListGroupCab()
        this.closeDeletePop()
      }
      commonMethods.showAxiosLoading(false)
    },
    async updateTodo(value, loadingYn) {
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
      param.todo.creUserKey = this.GE_USER.userKey
      var nonLoading = true
      var result = await this.$saveTodo(param, nonLoading)
      console.log(result)
      if (result.resultMsg === 'OK') {
        if (this.getTodoListGroupCab) {
          await this.getTodoListGroupCab(false)
        }
        await this.closeUpdatePop()
        this.mShowSkeletonYn = false
      }
    },
    openUpdatePop() {
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
              console.log(this.mGetTodoFamilyList[i].mCabUserList)
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
        console.log(cabUserList)
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
    calPercent(total, com) {
      let returnData = ''
      if (com === 0) {
        returnData = 0
      } else {
        returnData = Math.floor((total / com) * 100) + ''
      }
      return returnData + '%'
    },
    closeUpdatePop() {
      this.mSetPopShowYn = false
    },
    openDeletePop() {
      this.mConfirmText = 'Are you sure you want to delete it?'
      this.mDeleteConfirmShowYn = true
      this.mOpenMenuShowYn = false
    },
    closeDeletePop() {
      this.mDeleteConfirmShowYn = false
    },
    openSubMenu(value) {
      this.mTodoObj = value
      console.log(value)
      this.mOpenMenuShowYn = true
    },
    closeSubMenu() {
      this.mOpenMenuShowYn = false
    },
    // async openTodoDetail (value) {
    //   const param = {}
    //   param.todoKey = value.todoKey
    //   var result = await this.$commonAxiosFunction(
    //     { url: '/sUniB/mk.getTodoList', param: param },
    //     false
    //   )
    //   console.log(result)
    //   if (result.data.result) {
    //     console.log(result)
    //     this.mTodoDetail = result.data.todo[0]
    //     this.mMemoList = this.mTodoDetail.memoList
    //   }
    //   this.mSelectTodo = value
    //   this.mTodoDetailShowYn = true
    // },
    closeTodoDetail() {
      this.mTodoDetailShowYn = false
    },
    async openAddTodoPop() {
      if (this.mGetTodoFamilyList.length === 0) {
        var paramMap = {}
        paramMap.userKey = this.GE_USER.userKey
        paramMap.searchDate = this.getDate(1)
        paramMap.sysCabinetCode = 'USER'
        var result = await this.$getTodoListGroupCab(paramMap, true)
        if (result.result) {
          this.convertTargetData(result.todo)
          this.mGetTodoFamilyList = result.todo
          this.mWritePopShowYn = true
        }
      } else {
        this.mWritePopShowYn = true
      }
    },
    replaceArr(arr) {
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
        data = data.sort(function (a, b) {
          // num으로 오름차순 정렬
          return b.contentsKey - a.contentsKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    closeAddTodoPop() {
      this.mAddTodoPopShowYn = false
    },
    goMain() {
      this.$router.push('/')
    }
  },
  computed: {
    GE_USER() {
      return this.$store.getters['UB_USER/GE_USER']
    },
    GE_NEW_CONT_LIST() {
      console.log(this.$store.getters['UB_CHANNEL/GE_NEW_CONT_LIST'])
      return this.$store.getters['UB_CHANNEL/GE_NEW_CONT_LIST']
    },
    GE_NEW_MEMO_LIST(state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
    },
    GE_MAIN_CHAN_LIST() {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_DISP_LIST() {
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
      for (j = 0; j < group.myTodoList.length; j++) {
        const todo = group.myTodoList[j]
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
      console.log([returnData])
      return [returnData]
    }
  },
  watch: {
    mSelectDate: {
      immediate: true,
      handler(val) {
        if (!val) return
        this.getTodoListGroupCab()
      },
      deep: true
    },
    mGetTodoGroupList: {
      immediate: true,
      handler(val) {
        this.mMyTodoCount = 0
        this.mTargetTodoCount = 0
        this.mCompleteMyTodoCount = 0
        this.mCompleteTargetTodoCount = 0
        this.mCompleteTodoCount = 0
        if (!val || !val[0]) return
        const group = val[0]
        if (group.myTodoList && group.myTodoList.length > 0) {
          this.mMyTodoCount = group.myTodoList.length
        }
        if (group.targetTodoList && group.targetTodoList.length > 0) {
          this.mTargetTodoCount = group.targetTodoList.length
        }
        if (group.completeTodoList && group.completeTodoList.length > 0) {
          this.mCompleteTodoCount = group.completeTodoList.length
          for (let i = 0; i < group.completeTodoList.length; i++) {
            const todo = group.completeTodoList[i]
            if (todo.completeTarget && todo.completeTarget === 'myTodo') {
              this.mCompleteMyTodoCount++
            } else if (
              todo.completeTarget &&
              todo.completeTarget === 'target'
            ) {
              this.mCompleteTargetTodoCount++
            }
          }
        }
      },
      deep: true
    },
    GE_NEW_MEMO_LIST: {
      async handler(value, old) {
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
          this.mGetTodoGroupList[0].myTodoList.findIndex(
            (todo) => todo.contentsKey === newTodo.targetKey
          ) !== -1 ||
          this.mGetTodoGroupList[0].targetTodoList.findIndex(
            (todo) => todo.contentsKey === newTodo.targetKey
          ) !== -1
        ) {
          const myIndex = this.mGetTodoGroupList[0].myTodoList.findIndex(
            (todo) => todo.contentsKey === newTodo.targetKey
          )
          const targetIndex =
            this.mGetTodoGroupList[0].targetTodoList.findIndex(
              (todo) => todo.contentsKey === newTodo.targetKey
            )
          if (myIndex !== -1) {
            content = this.mGetTodoGroupList[0].myTodoList[myIndex]
            index = myIndex
          } else if (targetIndex !== -1) {
            content = this.mGetTodoGroupList[0].targetTodoList[targetIndex]
            listType = 'target'
            index = targetIndex
          }
        } else if (
          this.mGetTodoGroupList[0].completeTodoList.findIndex(
            (todo) => todo.contentsKey === newTodo.targetKey
          ) !== -1
        ) {
          index = this.mGetTodoGroupList[0].completeTodoList.findIndex(
            (todo) => todo.contentsKey === newTodo.targetKey
          )
          if (index !== -1) {
            content = this.mGetTodoGroupList[0].completeTodoList[index]
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
          this.mGetTodoGroupList[0].myTodoList[index].D_MEMO_LIST =
            this.replaceMemoArr(newArr)
          this.mGetTodoGroupList[0].myTodoList[index].creTeamKey = 0
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [
            this.mGetTodoGroupList[0].myTodoList[index]
          ])
        } else if (listType === 'target') {
          this.mGetTodoGroupList[0].targetTodoList[index].D_MEMO_LIST =
            this.replaceMemoArr(newArr)
          this.mGetTodoGroupList[0].targetTodoList[index].creTeamKey = 0
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [
            this.mGetTodoGroupList[0].targetTodoList[index]
          ])
        } else if (listType === 'complete') {
          this.mGetTodoGroupList[0].completeTodoList[index].D_MEMO_LIST =
            this.replaceMemoArr(newArr)
          this.mGetTodoGroupList[0].completeTodoList[index].creTeamKey = 0
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [
            this.mGetTodoGroupList[0].completeTodoList[index]
          ])
        }
      },
      deep: true
    },
    GE_NEW_CONT_LIST: {
      handler(value, old) {
        if (!value || !value[0]) return
        console.log(value[0])
        if (value[0].jobkindId !== 'TODO') return
        const newTodo = value[0]
        let oriList = []
        newTodo.strikeOnOff = false
        newTodo.sideMenuOpenYn = false
        // eslint-disable-next-line no-debugger
        debugger
        const todoType = this.checkTarget(newTodo)
        if (
          this.mGetTodoGroupList[0].myTodoList.findIndex(
            (todo) => todo.contentsKey === newTodo.contentsKey
          ) !== -1 ||
          this.mGetTodoGroupList[0].targetTodoList.findIndex(
            (todo) => todo.contentsKey === newTodo.contentsKey
          ) !== -1
        ) {
          const myIndex = this.mGetTodoGroupList[0].myTodoList.findIndex(
            (todo) => todo.contentsKey === newTodo.contentsKey
          )
          const targetIndex =
            this.mGetTodoGroupList[0].targetTodoList.findIndex(
              (todo) => todo.contentsKey === newTodo.contentsKey
            )
          if (newTodo.contStatus === '99') {
            this.mGetTodoGroupList[0].completeTodoList.unshift(newTodo)
            if (myIndex !== -1) {
              this.mGetTodoGroupList[0].myTodoList.splice(myIndex, 1)
            } else if (targetIndex !== -1) {
              this.mGetTodoGroupList[0].targetTodoList.splice(targetIndex, 1)
            }
          }
        } else if (
          this.mGetTodoGroupList[0].completeTodoList.findIndex(
            (todo) => todo.contentsKey === newTodo.contentsKey
          ) !== -1
        ) {
          const index = this.mGetTodoGroupList[0].completeTodoList.findIndex(
            (todo) => todo.contentsKey === newTodo.contentsKey
          )
          if (newTodo.contStatus === '00') {
            if (
              this.mGetTodoGroupList[0].completeTodoList[index]
                .completeTarget === 'myTodo'
            ) {
              this.mGetTodoGroupList[0].myTodoList.unshift(newTodo)
            } else if (
              this.mGetTodoGroupList[0].completeTodoList[index]
                .completeTarget === 'myTodo'
            ) {
              this.mGetTodoGroupList[0].targetTodoList.unshift(newTodo)
            }
            if (index !== -1) {
              this.mGetTodoGroupList[0].completeTodoList.splice(index, 1)
            }
          }
        } else {
          switch (todoType) {
            case 'my':
              this.mGetTodoGroupList[0].myTodoList.unshift(newTodo)
              oriList = this.mGetTodoGroupList[0].myTodoList
              this.mGetTodoGroupList[0].myTodoList = this.replaceArr(oriList)
              // this.mMyTodoCount++
              break
            case 'target':
              this.mGetTodoGroupList[0].targetTodoList.unshift(newTodo)
              oriList = this.mGetTodoGroupList[0].targetTodoList
              this.mGetTodoGroupList[0].targetTodoList =
                this.replaceArr(oriList)
              // this.mTargetTodoCount++
              break
            case 'completedMy':
              this.mGetTodoGroupList[0].completeTodoList.unshift(newTodo)
              oriList = this.mGetTodoGroupList[0].completeTodoList
              this.mGetTodoGroupList[0].completeTodoList =
                this.replaceArr(oriList)
              // this.mCompleteMyTodoCount++
              // this.mCompleteTodoCount++
              // this.mMyTodoCount++
              break
            case 'completedTarget':
              this.mGetTodoGroupList[0].completeTodoList.unshift(newTodo)
              oriList = this.mGetTodoGroupList[0].completeTodoList
              this.mGetTodoGroupList[0].completeTodoList =
                this.replaceArr(oriList)
              // this.mCompleteTargetTodoCount++
              // this.mCompleteTodoCount++
              // this.mTargetTodoCount++
              break
          }
        }

        this.myTodoYn = this.mGetTodoGroupList[0].myTodoList.length > 0
        this.mTargetTodoYn = this.mGetTodoGroupList[0].targetTodoList.length > 0
        this.mCompleteTodoYn =
          this.mGetTodoGroupList[0].completeTodoList.length > 0
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.writeContentsBtn {
  position: absolute;
  bottom: 70px;
  right: 10%;
  z-index: 9;
  cursor: pointer;
}
.fontSize {
  font-size: 18px;
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
  width: 40% !important;
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
  justify-content: center;
  align-items: center;
}
.calBox {
  width: 70%;
  display: flex;
  justify-content: center;
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
  color: white;
  background-color: #3d9aff;
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
.actorImg {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: -10px;
  border: 2px solid #fff;
  box-shadow: 0 5px 6px 0 rgba(60, 60, 60, 0.2);
  background-color: #fff;
}
.moreActorImg {
  margin-left: -10px;
  font-weight: bold;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  box-shadow: 0 5px 6px 0 rgba(60, 60, 60, 0.2);
  background-color: #e7edff !important;
  color: #5f61bd !important;
  line-height: 35px;
  z-index: 2;
}
.actorImgList{
  display:flex;
  justify-content:end;
  align-items:center;
  position:relative;
}
.actorNameListWrap{
  transition:all .5s;
  position:absolute;
  right:-10px;
  top:130%;
  z-index:20;
}
.actorNameListWrap:before{
  content:'';
  position: absolute;
  top: -10px;
  left: 15px;
  transform:translateX(-50%);
  border-top:0px solid transparent;
  border-left:8px solid transparent;
  border-right:8px solid transparent;
  border-bottom:16px solid #E7EDFF;
}
.actorNameList{
  display:flex;
  flex-direction:column;
  align-items:start;
  background-color:#E7EDFF!important;
  box-shadow: 0 5px 6px 0 rgba(60, 60, 60, 0.2);
  border-radius:10px;
  padding:5px 7px;
  color:#7e7e7e;
  width:auto;
  height:auto;
}
.strikeLine {
  position: absolute;
  background-color: #b8b5b5;
  height: 2px;
  width: 0;
  top: 50%;
  transform: translateY(-50%);
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
.todoFontSize {
  font-size: 15px;
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
  /* from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  } */
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
  .fontSize {
    font-size: 15px !important;
  }
  .actorImg {
    width: 25px !important;
    height: 25px !important;
  }
  .moreActorImg {
    width: 25px !important;
    height: 25px !important;
    line-height: 25px !important;
  }
  .completeTodoTitle {
    white-space: nowrap;
    /* width:100%; */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .completeTodoTitle {
    white-space: nowrap;
    /* width:100%; */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .commonSubTitleTextBold {
    font-size: 14px;
  }
  .todoFontSize {
    font-size: 13px;
  }
}
.titleLine {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: black;
  font-size: 12px;
  margin: 8px 0px;
}
.titleLine::before,
.titleLine::after {
  content: '';
  flex-grow: 1;
  background: black;
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 16px;
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
  z-index: 9998;
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
.picImgWrap {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  background-color: #fff;
}
/* .picWrapReal {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
} */
.MKAppUserPhotoBack {
  border-radius: 30px;
  background-color: rgb(223, 224, 226);
  min-width: 30px;
  min-height: 30px;
  margin-right: 5px;
}
.MKAppUserPhoto {
  overflow: hidden;
  border-radius: 50%;
}
.profileImg {
  width: 40px;
  height: 40px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.backShadow {
  box-shadow: 0 0 6px 0 rgba(60, 60, 60, 0.2);
}
</style>
