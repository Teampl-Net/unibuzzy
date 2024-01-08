<i18n>
  {
    "ko": {
      "MAIN_MSG_NOPERM": "열람 권한이 없습니다."
    },
    "en": {
      "MAIN_MSG_NOPERM": "You do not have permission to view."
    }
  }
  </i18n>
  <template>
    <div
      v-if="showEditPopYn"
      style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 14;
      "
    ></div>

    <div
      v-if="mLoadingShowYn"
      id="loading"
      style="display: block; z-index: 9999999"
    >
      <div class="spinner"></div>
    </div>
    <!-- <button @click="downloadPdf">다운로드</button> -->
    <!-- <vue3-simple-html2pdf ref="vue3SimpleHtml2pdf" :options="pdfOptions" :filename="exportFilename" style="width: 100%;"> -->
    <div
      class="cursorP"
      :class="animationYn ? 'newContentsAni' : ''"
      @click.stop="handleParentClick"
      @dragenter="onDragenter"
      key="animationYn"
      v-if="this.CONT_DETAIL"
      :style="`padding-bottom: ${this.$STATUS_HEIGHT}px; ${ propTargetType !== 'contentsDetail' ? '' : ''}`"
      style="
        width: 100%;
        background: #fff;
        overflow: hidden;
        min-height: 20px;
        float: left;
        /* box-shadow: 0px 1px 3px rgba(103, 104, 167, 0.4); */
        margin-bottom: 10px;
        position: relative;
        border-radius: 8px;

      "
    >
      <div
        v-if="propJustShowYn"
        :style="
          propPreStickerList && propPreStickerList.length > 0
            ? 'height: calc(100% - 50px);'
            : 'height: calc(100%); '
        "
        style="width: 100%; position: absolute; left: 0; top: 0; z-index: 99"
      ></div>
      <!-- :class="(CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46)? 'opacity05': ''" -->
      <!-- header-->
      <div v-if="propDetailYn===true" class="w100P" style="position:relative; box-shadow:0 0 3px 4px rgba(60,60,60,0.1); padding:0 25px 0 20px; height:50px; display:flex; align-items:center; justify-content:space-between;">
        <img v-on:click="closeXPop" src="@/assets/images/common/icon_back.png" class="cursorP" style="width: 0.8rem;margin-left: 0.5rem;" alt="뒤로가기"/>
        <div style="width:100px; display:flex; align-items:center; justify-content:end;">
          <p class="font20 CLDeepGrayColor" style=" font-weight:bold; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);">
            {{ CONT_DETAIL.jobkindId==='TODO' ? $t('COMMON_TITLE_TODODETAIL') : CONT_DETAIL.jobkindId==='BOAR' ? $t('COMMON_TITLE_BOARDDETAIL') : CONT_DETAIL.jobkindId==='MEMO' ? $t('COMMON_TITLE_MEMODETAIL') : $t('COMMON_TITLE_ALIMDETAIL') }}
          </p>
          <div
            style="
              width: 30px;
              height: 35px;
              display: flex;
              flex-direction: column;
              cursor: pointer;
              justify-content: center;
              align-items: center;
            "
          >
            <div
              style="
                width: 100%;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <img
                src="../../../assets/images/push/contentsShareIcon.svg"
                class="fl"
                alt="공유 아이콘"
                data-clipboard-action="copy"
                id="boardDetailCopyBody"
                @click.stop="contentsSharePop()"
                :data-clipboard-text="CONT_DETAIL.copyTextStr"
              />
            </div>
          </div>
          <div style="width:34px;">
            <img
              v-if="!pNoAuthYn"
              src="../../../assets/images/push/contents_moreBtnIcon.svg"
              alt=""
              @click.stop="contentMenuClick"
            />
          </div>
        </div>
      </div>

      <div v-if="CONT_DETAIL.contStatus === '99'" class="w100P fontBold completedTodoText " style="padding:10px 10px 10px 25px;text-align:left; height:auto; background-color:#d6d6d6">
        {{ $changeText(CONT_DETAIL.workUserName) + `${$t('COMMON_TODO_COMPLETEDAT')}` + '(' + getMonthDate(CONT_DETAIL.workEndDate) + ')'  }}
      </div>
      <div class="contentsCardHeaderArea" style="width: 100%; min-height: 20px;">
        <!-- <div
          :style="
            this.GE_USER.userKey === CONT_DETAIL.creUserKey
              ? 'border: 2px solid #5B1CFC !important; '
              : 'border: 2px solid rgba(0, 0, 0, 0.1)!important;'
          "
          class="contentsCardLogoArea"
        >
          <div
            v-if="CONT_DETAIL.jobkindId === 'TODO'"
            class="cursorP"
            @click="goUserProfile()"
            :style="
              'background-image: url(' +
              (CONT_DETAIL.userDomainPath
                ? CONT_DETAIL.userDomainPath + CONT_DETAIL.userProfileImg
                : CONT_DETAIL.userProfileImg) +
              ');'
            "
            style="
              width: calc(100% - 2px);
              height: calc(100% - 2px);
              border-radius: 100%;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
            "
          ></div>
          <div
            v-else
            @click="goChannelMain()"
            :style="
              'background-image: url(' +
              (CONT_DETAIL.domainPath
                ? CONT_DETAIL.domainPath + CONT_DETAIL.logoPathMtext
                : CONT_DETAIL.logoPathMtext) +
              ');'
            "
            style="
              width: calc(100% - 2px);
              height: calc(100% - 2px);
              border-radius: 100%;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
            "
          ></div>
        </div> -->
        <div class="w100P h100P" style="padding:0 20px 0px 0;">
          <div
          style="
            width: calc(100% - 10px);
            height: 100%;
            display: flex;
            flex-direction: column;
          "
        >
          <div style="padding-top:20px;" :style="{'border-left' : CONT_DETAIL.jobkindId === 'TODO' ? '7px solid rgb(137 120 175 / 60%)' : CONT_DETAIL.jobkindId === 'BOAR' ? '7px solid rgba(120, 175, 135, 0.6)' :  CONT_DETAIL.jobkindId === 'ALIM' ? '7px solid pink' : ''}">
            <div
            style="
              width: 100%;
              position: relative;
              height: 50%;
              min-height: 26px;
              position: relative;
              margin-left:20px;
            "
          >
              <template
                v-if="
                  !pNoAuthYn &&
                  CONT_DETAIL.jobkindId === 'BOAR' &&
                  CONT_DETAIL.VIEW_YN === false &&
                  CONT_DETAIL.creUserKey !== this.GE_USER.userKey &&
                  CONT_DETAIL.titleBlindYn
                "
              >
                <p
                  class="textLeft textOverdot commonBlack fontBold font16"
                  style="width: calc(100% - 35px)"
                >
                  {{ $t('MAIN_MSG_NOPERM') }}
                </p>
              </template>
              <template v-else>
                <div class="w100P" style="display:flex; align-items:center;">
                  <div class="w100P" style="display:flex; align-items:start;">
                    <img
                      class="cursorP"
                      v-if="
                        CONT_DETAIL.contTarget && CONT_DETAIL.contTarget === 'myRef'
                      "
                      src="@/assets/images/todo/checkboxRef.svg"
                      width="30"
                      height="30"
                      style="margin-top:-0.3rem; opacity:0.6;"

                    />
                    <img
                      class="cursorP"
                      v-else-if="
                        CONT_DETAIL.jobkindId === 'TODO' &&
                        CONT_DETAIL.contStatus === '99'
                      "
                      src="@/assets/images/todo/checkboxCheck.png"
                      width="30"
                      height="30"
                      style="margin-top:-0.3rem; opacity:0.6;"
                      @click.stop="reqCompleteTodo(CONT_DETAIL)"
                    />
                    <img
                      class="cursorP"
                      v-else-if="
                        CONT_DETAIL.jobkindId === 'TODO' &&
                        CONT_DETAIL.contStatus === '00'
                      "
                      src="@/assets/images/todo/checkboxBlank.png"
                      width="30"
                      height="30"
                      style="margin-top:-0.3rem; opacity:0.6;"
                      @click.stop="reqCompleteTodo(CONT_DETAIL)"
                    />
                      <div style="width:calc(100% - 30px);">
                        <p
                          style="line-height:1.2; width:95%;"
                          :style="{'margin-left' : CONT_DETAIL.jobkindId === 'TODO' ? '5px' : ''}"
                          class="cursorDragText textLeft commonBlack fontBold todoTitleFontSize"
                          :class="
                            `${(CONT_DETAIL.jobkindId === 'BOAR' &&
                              CONT_DETAIL.workStatYn &&
                              CONT_DETAIL.workStatCodeKey === 46) ||
                            (CONT_DETAIL.jobkindId === 'TODO' &&
                              CONT_DETAIL.contStatus === '99')
                              ? 'completeWork'
                              : ''}`
                              //  ${propDetailYn?'':'textOverdot'}
                          "
                        >
                          {{ CONT_DETAIL.title }}
                          <span :style="{color : CONT_DETAIL.contStatus === '99' ? '#7b7878' : '' }" class="todoImportantInfoMemo mleft-03" style="line-height:1.8; font-weight:normal; line-height:1;" v-if="CONT_DETAIL.memoCount > 0">
                            ({{ CONT_DETAIL.memoCount }})
                          </span>
                          <!-- <span v-if="CONT_DETAIL.D_CONT_USER_STICKER_LIST && CONT_DETAIL.D_CONT_USER_STICKER_LIST.length > 0" class="todoTag mright-03" :style="`background: ${CONT_DETAIL.D_CONT_USER_STICKER_LIST[0].picBgPath}`">
                            {{ $changeText(CONT_DETAIL.D_CONT_USER_STICKER_LIST.nameMtext) }}
                          </span> -->
                          <template v-for="(sticker, index) in CONT_DETAIL.stickerList" :key="index">
                            <div @click.stop="clickSticker(sticker)"
                              class="todoTag mright-03"
                              :style="`background: ${sticker.picBgPath}`"
                              :class="{tagColorBlack : sticker.picBgPath === '#91BDFF' || sticker.picBgPath === '#C2DAFF' || sticker.picBgPath === '#FFC58F' || sticker.picBgPath === '#FFE0C4' || sticker.picBgPath === '#A8FFA1' || sticker.picBgPath === '#CDFFC9' || sticker.picBgPath === '#DAB5FF' || sticker.picBgPath === '#EAD5FF' || sticker.picBgPath === '#95E6FF' || sticker.picBgPath === '#C8F5FF' || sticker.picBgPath === '#FF96CF' || sticker.picBgPath === '#FFC3E4' || sticker.picBgPath === '#CCCCCC' || sticker.picBgPath === '#E3E3E3'}">
                              <span :style="{color:getLightOrDark(sticker.picBgPath)}">{{ $changeText(sticker.nameMtext) }}</span>
                            </div>
                          </template>
                        </p>
                      </div>
                  </div>
                </div>
              </template>
            </div>
            <div :class="{headerInfoWrap : CONT_DETAIL.jobkindId !== 'TODO'}" :style="{'padding-left': CONT_DETAIL.jobkindId === 'TODO' ? '30px' : ''}" style="width:calc(100% - 20px); margin-left:20px; display:flex; align-items:center; justify-content:space-between;">
              <div class="w100P " style="text-align:left; line-height:23px;">
                <span v-if="CONT_DETAIL.jobkindId !== 'BOAR'" style="min-width:39px;" class="todoPriority fl mright-03 fontBold" :class="{todoPriorityHigh : CONT_DETAIL.priority === '00', todoPriorityMiddle: CONT_DETAIL.priority === '01', todoPriorityLow : CONT_DETAIL.priority === '02'  }">
                    {{ CONT_DETAIL.priority === '00' ? $t('COMMON_TODO_HIGH') : CONT_DETAIL.priority === '01' ? $t('COMMON_TODO_MID') : $t('COMMON_TODO_LOW') }}
                  </span>
                  <div v-if="CONT_DETAIL.jobkindId === 'TODO'" class="font15 fl" @click.stop="goUserProfile()" style="display:flex; align-items:center; ">
                    <img class="profileImg" :src="CONT_DETAIL.userDomainPath ? CONT_DETAIL.userDomainPath + CONT_DETAIL.userProfileImg : CONT_DETAIL.userProfileImg" :alt="CONT_DETAIL.creUserName"/>
                  </div>
                  <p
                    v-if="CONT_DETAIL.jobkindId === 'TODO'"
                    class="CLDeepGrayColor font15"
                    style="line-height: 23px; display:inline-block;"
                  >
                    <span class="fl" :class="{delayedTodo : new Date(CONT_DETAIL.workToDate) < new Date() && getHowLate(CONT_DETAIL.workToDate) > 0}">
                      {{
                        getMonthDate(CONT_DETAIL.workFromDate) +
                        '~' +
                        getMonthDate(CONT_DETAIL.workToDate)
                      }}</span
                    >
                  </p>
                  <p v-else class="CLDeepGrayColor font15" style="display:inline-block; text-align:left;">
                      <img
                      v-if="CONT_DETAIL.jobkindId === 'ALIM'"
                      src="../../../assets/images/push/contTitle_alim.svg"
                      class="cursorNotDrag mright-03"
                      style="
                        width: 20px;
                      "
                      alt=""
                    />
                    <img
                      v-if="CONT_DETAIL.jobkindId === 'BOAR'"
                      src="../../../assets/images/push/contTitle_board.svg"
                      class="cursorNotDrag mright-03"
                      style="
                        width: 20px;
                      "
                      alt=""
                    />
                    <span>{{ this.$changeText(CONT_DETAIL.nameMtext) }}</span>
                    <span v-if="CONT_DETAIL.jobkindId === 'BOAR'"> > </span>
                    <span v-if="CONT_DETAIL.jobkindId === 'BOAR'"> {{ CONT_DETAIL ? this.$changeText(CONT_DETAIL.cabinetNameMtext) : '' }}</span>
                    <span> | </span>
                    <span >
                      <img class="profileImg" @click.stop="goUserProfile()"
                      :src="CONT_DETAIL.userDomainPath ? CONT_DETAIL.userDomainPath + CONT_DETAIL.userProfileImg : CONT_DETAIL.userProfileImg" :alt="CONT_DETAIL.creUserName"/>
                      {{ this.$changeText(CONT_DETAIL.creUserName) }}
                    </span>
                  </p>
              </div>
              <div v-if="CONT_DETAIL.jobkindId === 'TODO' && !(CONT_DETAIL && CONT_DETAIL.actorList.length === 2 && CONT_DETAIL.actorList[0].accessKey === GE_USER.userKey && CONT_DETAIL.actorList[1].accessKey === GE_USER.userKey)" class="todoOtherInfosAsignee">
                <div class="w100P actorImgList cursorP" @click.stop=" openRecvActorListPop()">
                  <template v-for="(each, index) in CONT_DETAIL.actorList" :key="index">
                    <img v-if="each.actType === 'RV' && each.accessKind === 'U' && index < 3 " class="actorImg" :src="each.domainPath ? each.domainPath + each.pathMtext : require(`@/assets/images/todo/defaultImg.png`)" style="" :alt="each.userDispMtext"/>
                    <img v-else-if="each.actType === 'RV' && index < 3" class="actorImg" :src="require(`@/assets/images/todo/channer_addressBook.svg`)" style="" :alt="each.userDispMtext"/>
                    <div class="moreActorImg" style="" v-if="index === 2">
                      <span>+{{ CONT_DETAIL.actorList.length }}</span>
                    </div>
                    <div class="moreActorImg" style="" v-else-if="(CONT_DETAIL.actorList.length === 1 && CONT_DETAIL.actorList[0].actType === 'CK') || (CONT_DETAIL.actorList.length === 2 && CONT_DETAIL.actorList[1].actType === 'CK') && index === 1">
                      <span>+{{ CONT_DETAIL.actorList.length }}</span>
                    </div>
                    <div class="actorNameListWrap" v-if="mOpenActorListYn">
                      <div class="actorNameList">
                        <p @click.stop="goUserProfile(each.accessKey)" class="todoFontSize" style="white-space:nowrap; display:flex; align-items:center;" v-for="(each, index) in CONT_DETAIL.actorList" :key="index">
                          <template v-if="each">
                            <img v-if="each.accessKind === 'U'"  class="moreActorImg" style="border:2px solid #e7edff;" :src="each.domainPath + each.pathMtext" />
                            <img v-if="each.accessKind === 'C'" class="moreActorImg" style="border:2px solid #e7edff;" :src="require(`@/assets/images/todo/channer_addressBook.svg`)" />
                          </template>
                          {{ each.userDispMtext ? $changeText(each.userDispMtext) : each.userDispMtext ? $changeText(each.userDispMtext) : $changeText(each.cabinetNameMtext) }}
                          {{each.actType === 'CK'? '(' + this.$t('COMMON_TODO_REVIEWER') + ')' : each.actType === 'RV'? '(' + this.$t('COMMON_TODO_RECEIVER') + ')' : each.actType === 'RF'? '(' + this.$t('COMMON_TODO_PUBLIC') + ')' : ''}}
                        </p>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <statCodeComponent
                v-if="
                  CONT_DETAIL.jobkindId === 'BOAR' &&
                  CONT_DETAIL.workStatYn &&
                  !pNoAuthYn
                "
                @click.stop="openWorkStatePop(CONT_DETAIL)"
                :alimDetail="CONT_DETAIL"
                class="fr statCodeCompo"
                :contentsKey="CONT_DETAIL.contentsKey"
                :teamKey="CONT_DETAIL.creTeamKey"
                :currentCodeKey="CONT_DETAIL.workStatCodeKey"
                :codeList="CONT_DETAIL.workStatCodeList"
              />
            <div v-if="CONT_DETAIL.jobkindId === 'ALIM' || CONT_DETAIL.jobkindId === 'TODO'" style="display:flex; align-items:center; gap:0.2rem;">
              <div v-if="!GE_USER.unknownYn" style="width: 100%;">
            <!-- <p class="fr font12 lightGray mright-03" @click="CONT_DETAIL.rUserCount !== -1? this.openRecvListPop(): ''" v-if="CONT_DETAIL.jobkindId === 'ALIM'" style="border: 1px solid rgb(204, 204, 204); padding: 0px 5px; border-radius: 8px; display: flex; align-items: center;" > -->
            <!-- <p
              class="fl commonColor font12 fl textLeft fontBold cursorP"
              v-if="
                !pNoAuthYn &&
                CONT_DETAIL.creUserKey !== GE_USER.userKey &&
                CONT_DETAIL.showCreNameYn === 1 &&
                CONT_DETAIL.jobkindId === 'ALIM'
              "
              style="padding-left:30px; margin-top: 2px"
              @click="sendReply"
            >
              답장하기
            </p> -->
            <div
              v-if="cancelTimerShowCheck(CONT_DETAIL)"
              style="width:100px;"
              class="fl"
              :id="'timerArea' + CONT_DETAIL.contentsKey"
              @click.stop="cancelConfirm(CONT_DETAIL)"
            >
              <p
                :id="'timerText' + CONT_DETAIL.contentsKey"
                class="font12 fl textRight w-100P"
              >
                {{
                  setIntervalTimer(CONT_DETAIL.creDate, CONT_DETAIL.contentsKey)
                }}
              </p>
            </div>
              </div>
              <div
              @click.stop="
                openRecvActorListPop(CONT_DETAIL.rUserCount === -1 ? true : '')
              "
              class="fr cursorP font12 commonGrayBG CDeepColor fontBold"
              v-if="CONT_DETAIL.jobkindId === 'ALIM'"
              :style="
                CONT_DETAIL.rUserCount !== -1 &&
                CONT_DETAIL.creUserKey === GE_USER.userKey
                  ? 'background: rgb(221 229 251)!important;'
                  : ''
              "
              style="
                padding: 0px 8px;
                border-radius: 8px;
                height: 18px;
                display: flex;
                align-items: center;
                width:50px;
                text-align:right;
                white-space:nowrap;
              "
            >
              <!-- <p  class="font12 fl lightGray">수신</p>
                            <span class="font12 mSide-02">{{'|'}}</span> -->
              <template v-if="CONT_DETAIL.rUserCount === -1"> {{ $t('COMMON_TODO_ALL')}} </template>
              <template v-else-if="CONT_DETAIL.rUserCount !== -1">
                <img
                  src="../../../assets/images/push/userIcon.svg"
                  class="img-w13 mright-01 fl"
                  style=""
                  alt=""
                />
                <p
                  class="font12 fl mleft-01 CDeepColor"
                  style="line-height: 1; margin-top: 1px"
                >
                  {{ CONT_DETAIL.rUserCount }}
                </p>
              </template>
              </div>
            </div>
            </div>
            <div class="mtop-03" style="margin-left:20px; border-bottom:1px solid rgba(204, 204, 204, 0.314);"></div> <!-- 구분선 -->
            <div :style="{'padding-left' : CONT_DETAIL.jobkindId === 'TODO' ? '50px' : '20px'}" class="font15 mtop-03" style="display:flex; align-items:center; justify-content:end; color:#636363; font-size:15px;">
            <!-- <div v-if="CONT_DETAIL.jobkindId === 'TODO'" class="font15" @click.stop="goUserProfile()" style="display:flex; align-items:center; ">
              <img class="profileImg" :src="CONT_DETAIL.userDomainPath ? CONT_DETAIL.userDomainPath + CONT_DETAIL.userProfileImg : CONT_DETAIL.userProfileImg" :alt="CONT_DETAIL.creUserName"/>
              <span class="mleft-03 mright-03"> {{ this.$changeText(CONT_DETAIL.creUserName) }}</span>
              <span>{{ this.$changeDateFormat(CONT_DETAIL.creDate) }}</span>
            </div> -->
            <span v-if="CONT_DETAIL.jobkindId !== 'TODO'">{{ this.$changeDateFormat(CONT_DETAIL.creDate) }}</span>
            <div @click.stop="clickFileDownload()" v-if="CONT_DETAIL.fileCount" class="cursorP">
              <img src="../../../assets/images/push/contentsClipIcon.svg" style="width:15px;" class="" alt=""/>
              <span class="font15 mleft-03"> {{ CONT_DETAIL.fileCount }} file</span>
            </div>
            </div>
          </div>
            <!-- <div
            @click="goChannelMain()"
            :style="
              'background-image: url(' +
              (CONT_DETAIL.domainPath
                ? CONT_DETAIL.domainPath + CONT_DETAIL.logoPathMtext
                : CONT_DETAIL.logoPathMtext) +
              ');'
            "
            style="
              width: calc(100% - 2px);
              height: calc(100% - 2px);
              border-radius: 100%;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
            "
          ></div> -->
            <div
              style="line-height: 23px"
              class="CLDeepGrayColor font14 fl textLeft fontBold"
            >
              <!-- <p
                v-if="CONT_DETAIL.jobkindId === 'BOAR'"
                class="CLDeepGrayColor font14 fl textLeft fontBold"
                @click="goChannelMain()"
              >
                <img
                  src="../../../assets/images/channel/icon_official2.svg"
                  v-if="CONT_DETAIL.officialYn"
                  style="height: 21px; padding: 3px"
                  class="fl"
                  alt=""
                />
                <span class="fl">
                  {{ this.$changeText(CONT_DETAIL.cabinetNameMtext) }}
                </span>
                <span
                  class="teverdot fl"
                  style="display: block; max-width: 70px"
                >
                  ({{ this.$changeText(CONT_DETAIL.nameMtext) }})
                </span>
              </p>
              <p
                v-else
                class="CLDeepGrayColor font14 fl textLeft fontBold"
                @click="goChannelMain()"
              >
                <img
                  src="../../../assets/images/channel/icon_official2.svg"
                  v-if="CONT_DETAIL.officialYn"
                  style="height: 21px; padding: 3px"
                  class="fl"
                  alt=""
                />
                <span class="fl">
                  {{ this.$changeText(CONT_DETAIL.nameMtext) }}</span
                >
              </p> -->

              <span
                v-if="CONT_DETAIL.jobkindId === 'TODO'"
                @click.stop="goUserProfile()"
                style="font-weight: normal; display: block"
                class="mleft-03"
              >
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- //header-->
      <!-- <div id="stickerArea" style="width: 100%; min-height: 20px; float: left;">

                <gSticker @click="mStickerPopShowYn = true" :pSticker="{nameMtext: 'test', picBgPath: '#CCC'}"/>
            </div> -->
      <div
        v-if="!propJustShowYn"
        :class="
          (CONT_DETAIL.jobkindId === 'BOAR' &&
            CONT_DETAIL.workStatYn &&
            CONT_DETAIL.workStatCodeKey === 46)"
        class="contentsCardBodyArea"
        style="width: 100%; float: left; min-height: 20px; position: relative;"
      >
        <div
          v-if="
            !pNoAuthYn &&
            CONT_DETAIL.jobkindId === 'BOAR' &&
            CONT_DETAIL.VIEW_YN === false &&
            CONT_DETAIL.creUserKey !== this.GE_USER.userKey &&
            !CONT_DETAIL.titleBlindYn
          "
          @cick="zzz"
          class="font14 cursorP mbottom-05 bodyFullStr"
          style="min-height: 30px"
          v-html="$notPerText()"
        ></div>
        <div
          v-else-if="
            !pNoAuthYn &&
            CONT_DETAIL.jobkindId === 'BOAR' &&
            CONT_DETAIL.VIEW_YN === false &&
            CONT_DETAIL.creUserKey !== this.GE_USER.userKey &&
            CONT_DETAIL.titleBlindYn
          "
          class=""
        ></div>
        <div
          v-else
          class="fl w-100P"
          ref="contentsBoxRef"
          style="word-break: break-all; overflow: hidden; max-height: 300px"
          :id="'contentsBodyBoxArea' + CONT_DETAIL.contentsKey"
        >
          <pre
            :ref="'mainContRef' + CONT_DETAIL.contentsKey"
            @loadeddata="testLoad"
            :class="(
              CONT_DETAIL.jobkindId === 'BOAR' &&
              CONT_DETAIL.workStatYn &&
              CONT_DETAIL.workStatCodeKey === 46
                ? 'completeWork'
                : '') + (CONT_DETAIL.jobkindId !== 'TODO'? 'mainConts' : 'todoConts')
            "
            :id="'bodyFullStr' + CONT_DETAIL.contentsKey"
            class="font14 mbottom-05  cursorDragText h-100P w-100P fl"
            style="word-break: break-all; overflow: hidden auto; font-size:16px !important;"
            v-html="
              $setBodyLength(
                CONT_DETAIL.bodyFullStr,
                CONT_DETAIL.jobkindId === 'BOAR' &&
                  CONT_DETAIL.workStatYn &&
                  CONT_DETAIL.workStatCodeKey === 46
              )
            "
          ></pre>
        </div>
        <!-- <div v-if="!mFadeNotShowYn && $refs.mainContRef && $refs.mainContRef.offsetHeight > 300 && CONT_DETAIL.D_CONT_USER_STICKER_LIST && CONT_DETAIL.D_CONT_USER_STICKER_LIST.length > 0" class="w-100P fl" style="position: absolute; bottom: 35px; height: 100px; background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8));"></div> -->
        <!-- <div
          v-if="
            !propJustShowYn &&
            CONT_DETAIL.D_CONT_USER_STICKER_LIST &&
            CONT_DETAIL.D_CONT_USER_STICKER_LIST.length > 0
          "
          style="
            width: 100%;
            padding: 5px 10px;
            padding-left: 20px;
            padding-bottom: 0;
            float: left;
            min-height: 20px;
            margin-top: 10px;
          "
        >
          <template
            v-for="(value, index) in CONT_DETAIL.D_CONT_USER_STICKER_LIST"
            :key="index"
          >
            <gStickerLine
              @click="goStickerContentsList(value)"
              v-if="value"
              :pSmallYn="true"
              style="float: left; margin-right: 5px; min-width: 30px"
              :pSticker="value.sticker"
            />
          </template>
        </div> -->
        <div
          v-if="!mFadeNotShowYn && mContentMoreShowYn"
          class="w-100P"
          style="
            position: absolute;
            bottom: 0;
            height: 100px;
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0.8)
            );
          "
        ></div>
        <!-- <div v-if="!mFadeNotShowYn && (($refs.mainContRef && $refs.mainContRef.offsetHeight > 300 && !CONT_DETAIL.D_CONT_USER_STICKER_LIST) || ($refs.mainContRef && $refs.mainContRef.offsetHeight > 300 && !CONT_DETAIL.D_CONT_USER_STICKER_LIST[0]))" class="w-100P" style="position: absolute; bottom: 0; height: 100px; background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8));"></div> -->
        <!-- <p v-if="!mFadeNotShowYn && mContentMoreShowYn" :id="'bodyMore'+CONT_DETAIL.contentsKey" class="w-100P textRight fr font14 commonColor fontBold mtop-05  mright-1" style="display:none; position: absolute; bottom: 0; right: 10px;">더보기 > </p> -->
        <p
          :ref="'bodyMoreRef' + CONT_DETAIL.contentsKey"
          v-if="!mFadeNotShowYn && mContentMoreShowYn"
          class="w-100P textRight fr font14 commonColor fontBold mtop-05 mright-1"
          style="position: absolute; bottom: 0; right: 10px"
        >
          {{ $t('COMMON_NAME_MORE') }} >
        </p>
      </div>
      <div
        v-else
        style="
          width: 100%;
          padding: 5px 10px;
          padding-bottom: 0;
          float: left;
          min-height: 35px;
        "
      >
        <template v-for="(value, index) in propPreStickerList" :key="index">
          <gStickerLine
            v-if="value"
            :pSelecteModeYn="true"
            :pSmallYn="true"
            @click.stop="this.$emit('selectSticker', value)"
            style="
              cursor: pointer;
              float: left;
              margin-right: 5px;
              min-width: 30px;
            "
            :pSticker="value"
          />
        </template>
      </div>
      <!-- <div v-if="CONT_DETAIL.jobkindId === 'TODO'" class="w100P tagListWrap" style="padding-top:10px;padding-left:20px; display: flex; gap: 5px; align-items:center; flex-wrap: wrap">
            <div
              v-for="(tag, index) in CONT_DETAIL.D_CONT_USER_STICKER_LIST"
              :key="index"
              class="todoTag mright-03 mtop-03 fontBold"
              :style="`background: ${CONT_DETAIL.picBgPath}`"
            >
              {{ $changeText(tag.nameMtext) }}
            </div>
          </div> -->
      <template
        v-if="
          !propJustShowYn &&
          (pNoAuthYn ||
            CONT_DETAIL.jobkindId === 'TODO' ||
            (CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.VIEW_YN === true) ||
            CONT_DETAIL.jobkindId === 'ALIM' ||
            CONT_DETAIL.creUserKey === this.GE_USER.userKey)
        "
        :class="
          (CONT_DETAIL.jobkindId === 'BOAR' &&
            CONT_DETAIL.workStatYn &&
            CONT_DETAIL.workStatCodeKey === 46) ||
          (CONT_DETAIL.jobkindId === 'TODO' && CONT_DETAIL.contStatus === '99')
            ? 'opacity05'
            : ''
        "
      >
        <div
          v-if="!pNoAuthYn"
          class="contentsCardUserDoArea"
          style="
            position: relative;
            width: 100%;
            background: #f8f8ff;
            min-height: 40px;
            float: left;
            justify-content: space-between;
            display: flex;
            margin-top: 10px;
            padding: 10px 20px;
          "
        >
          <stickerListSetting
            @mContStickerList="saveStickerList"
            @openStickerPop="openStickerPop"
            v-if="this.openStickerListYn"
            :openStickerListYn="this.openStickerListYn"
            :contDetail="this.CONT_DETAIL"
            :propStickerList="this.mStickerList"
            @openPop="openSettingStickerPop"
          />
          <div
            style="float: left; width: calc(100% - 100px); height: 100%"
            v-if="this.CONT_DETAIL.D_CONT_USER_DO"
          >
            <!-- <div
              v-if="CONT_DETAIL.jobkindId !== 'TODO'"
              @click="
                GE_USER.unknownYn
                  ? pOpenUnknownLoginPop(CONT_DETAIL)
                  : changeAct(
                      this.CONT_DETAIL.D_CONT_USER_DO[0],
                      this.CONT_DETAIL.contentKey
                    )
              "
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
                  v-if="
                    !this.CONT_DETAIL.D_CONT_USER_DO[0].doKey ||
                    this.CONT_DETAIL.D_CONT_USER_DO[0].doKey === 0
                  "
                  class=""
                  src="../../../assets/images/contents/cont_star_no.svg"
                  alt=""
                />
                <img
                  v-else
                  src="../../../assets/images/contents/cont_star.svg"
                  alt=""
                  class=""
                />
              </div>
              <p class="font12 fontBold fl mtop-01 w-100P userDoColor">
                {{ CONT_DETAIL.starCount }}
              </p>
            </div> -->
            <div
              style="
                width: auto;
                height: 35px;
                display: flex;
                cursor: pointer;
                margin-right: 10px;
                align-items: center;
                justify-content:start;
                gap:0.3rem;
              "
            >
              <!-- <span class="font14 fontBold mtop-02" style="color:#636363 !important;">
                활동
              </span> -->
              <div v-if="propDetailYn === true">
                <p class="showHistoryBtn font14 fontBold" style="white-space:nowrap;">
                  <span :class="{selectedHistoryTab : mSelectedHistoryTabIdx === index, 'pleft-1' : index===1 }" @click.stop="selectHistory(index)" v-for="(tab, index) in mShowHistoryTab" :key="index" style="">
                  {{ tab.title }}
                  <span style="color:#7e7e7e;" v-if=" index===0 " class="pleft-08">|</span>
                </span>
                </p>
              </div>
              <template v-else>
                <div style="width:20px; position:relative;">
                  <img v-if="this.CONT_DETAIL && this.CONT_DETAIL.memoCount === 0" :src="require(`@/assets/images/contents/icon_memo_blue.png`)" class="w100P"/>
                  <img v-else :src="require(`@/assets/images/contents/icon_memo_blue_on.png`)" class="w100P"/>
                  <span class="fontBold" :style="{color: this.CONT_DETAIL.memoCount === 0 ? '#5F61BD' : '#fff'}" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-size:10px;">
                    {{ this.CONT_DETAIL ? this.CONT_DETAIL.memoCount : '0' }}
                  </span>
                </div>
              </template>
            </div>
          </div>
          <div v-if="CONT_DETAIL.jobkindId && CONT_DETAIL.jobkindId !== 'MEMO'" style="width: 140px; height: 100%; display:flex; align-items:center; justify-content:end;">
            <div style=" width: 30px; height: 35px; display: flex; cursor: pointer; margin-right: 10px; flex-direction: column; justify-content: center; align-items: center;">
              <div @click.stop="
                GE_USER.unknownYn
                  ? pOpenUnknownLoginPop(CONT_DETAIL)
                  : changeAct(
                      CONT_DETAIL.D_CONT_USER_DO[0],
                      CONT_DETAIL.contentKey
                    )
              " style="width: 20px; height: 20px; display: flex; justify-content: center;">
                <img
                class="w100P" style="opacity:0.6;" :style="{opacity: CONT_DETAIL.D_CONT_USER_DO &&
                ( CONT_DETAIL.D_CONT_USER_DO[0].doKey &&
                    CONT_DETAIL.D_CONT_USER_DO[0].doKey !== 0) ? '1' : '0.6'}"
                  src="../../../assets/images/todo/icon_pin2.png"

                  alt="핀"
                />

                  <!-- class="w100P" style="opacity:0.6;" :style="{opacity: this.fixedTop === true ? '1' : '0.6'}" -->
              </div>
              <!-- <p class="font12 fontBold fl mtop-01 w-100P userDoColor">
                {{ $t('COMMON_NAME_PIN') }}
              </p> -->
            </div>
            <div
              @click.stop="
                GE_USER.unknownYn
                  ? pOpenUnknownLoginPop(CONT_DETAIL)
                  : subScribeContents()
              "
              style="
                width: 30px;
                height: 35px;
                display: flex;
                cursor: pointer;
                margin-right: 10px;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
            >
              <div
                style="
                  width: 100%;
                  height: 20px;
                  display: flex;
                  margin-top:-0.2rem;
                  justify-content: center;
                "
              >
                <img
                  v-if="
                    this.CONT_DETAIL.subsYn === 1 ||
                    this.CONT_DETAIL.subsYn === true
                  "
                  src="../../../assets/images/push/contentsBellIcon_on.svg"
                  class=" "
                  alt=""
                />
                <img
                  v-else
                  src="../../../assets/images/push/contentsBellIcon.svg"
                  class=""
                  alt=""
                />
              </div>
              <!-- <p class="font12 fontBold fl mtop-01 w-100P userDoColor">
                {{ $t('COMMON_NAME_INTEREST') }}
              </p> -->
            </div>
            <!-- <div
              v-if="CONT_DETAIL.jobkindId !== 'TODO'"
              @click="
                GE_USER.unknownYn
                  ? pOpenUnknownLoginPop(CONT_DETAIL)
                  : openStickerPop()
              "
              style="
                cursor: pointer;
                width: 30px;
                height: 35px;
                display: flex;
                float: right;
                margin-right: 10px;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
            >
              <div
                style="
                  width: 100%;
                  height: 20px;
                  float: left;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <img
                  src="../../../assets/images/push/stickerIcon.svg"
                  class="img-w20"
                  alt=""
                />
              </div>
              <p class="font12 fl fontBold w-100P mtop-01 userDoColor">
                {{ $t('COMMON_NAME_LABEL') }}
              </p>
            </div> -->

            <!-- this.$emit('fileDownload') -->
            <!-- <div @click="clickFileDownload()" v-if="this.CONT_DETAIL.attachMfilekey && this.CONT_DETAIL.attachMfilekey > 0" style="width: 30px; height: 35px; display: flex; float: right; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                            <img v-if="this.CONT_DETAIL.attachMfilekey && this.CONT_DETAIL.attachMfilekey > 0" src="../../../assets/images/contents/icon_clip.png" class="img-w20" alt="">
                            <img v-else src="../../../assets/images/contents/icon_clip.png" class="img-w20" alt="">
                        </div> -->
              <div
              @click.stop="
                GE_USER.unknownYn || (this.CONT_DETAIL && !this.CONT_DETAIL.D_CONT_USER_DO)
                  ? pOpenUnknownLoginPop(CONT_DETAIL)
                  : changeAct(
                      this.CONT_DETAIL.D_CONT_USER_DO[1],
                      this.CONT_DETAIL.contentKey
                    )
              "
              style="
                cursor: pointer;
                width: 30px;
                height: 35px;
                display: flex;
                margin-right: 10px;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
            >
              <div style="width: 100%; height: 20px;">
                <img
                  v-if="
                    !this.CONT_DETAIL.D_CONT_USER_DO || !this.CONT_DETAIL.D_CONT_USER_DO[1].doKey ||
                    this.CONT_DETAIL.D_CONT_USER_DO[1].doKey === 0
                  "
                  class=""
                  style="vertical-align:top !important; width:21px; opacity:0.85;"
                  src="../../../assets/images/todo/icon_heart_blue.png"
                  alt=""
                />
                <img
                  v-else
                  style="vertical-align:top !important;"
                  src="../../../assets/images/contents/cont_like.svg"
                  alt=""
                  class=""
                />
              </div>
              <!-- <p class="font12 fl fontBold w-100P mtop-01 userDoColor">
                {{ CONT_DETAIL.likeCount ? CONT_DETAIL.likeCount : '0'}}
              </p> -->
            </div>
            <!-- <div
              style="
                width: 30px;
                height: 35px;
                display: flex;
                margin-right: 10px;
                flex-direction: column;
                cursor: pointer;
                justify-content: center;
                align-items: center;
              "
            >
              <div
                style="
                  width: 100%;
                  height: 20px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <img
                  src="../../../assets/images/push/contentsShareIcon.svg"
                  class="fl"
                  alt="공유 아이콘"
                  data-clipboard-action="copy"
                  id="boardDetailCopyBody"
                  @click="contentsSharePop()"
                  :data-clipboard-text="CONT_DETAIL.copyTextStr"
                />
              </div>
              <p class="font12 fl fontBold w-100P mtop-01 userDoColor">
                {{ $t('COMMON_NAME_SHARE') }}
              </p>
            </div> -->
          </div>
        </div>
        <div
          v-else
          class="contentsCardUserDoArea"
          style="
            position: relative;
            width: 100%;
            background: #f8f8ff;
            min-height: 40px;
            float: left;
            justify-content: space-between;
            display: flex;
            margin-top: 10px;
            padding: 10px 20px;
          "
        ></div>
        <!-- <div v-if="this.CONT_DETAIL.D_MEMO_LIST && this.CONT_DETAIL.D_MEMO_LIST.length > 0" style="height: 2px; background: #F1F1F1;  width: calc(100% - 40px); margin: 10px 20px; margin-bottom: 10px;float: left;"></div> -->
        <div
          @click.stop="handleParentClick"
          class="contentsCardMemoArea"
          v-if="
            !pNoAuthYn &&
            this.CONT_DETAIL.D_MEMO_LIST &&
            this.CONT_DETAIL.D_MEMO_LIST.length > 0
          "
          style=" width: 100%; float: left; cursor: pointer; padding: 10px 20px 0 20px; min-height: 20px; margin-bottom: 10px; " :id="'contentsCardMemoArea' + CONT_DETAIL.contentsKey">
          <p
            v-if="propDetailYn === false && this.mMemoMoreShowYn"
            class="fl w-100P textLeft font12 commonColor fontBold mbottom-05 mright-05"
            @click.stop="this.goContentsDetail(undefined, true)"
          >
            {{ returnCommentText() }}
          </p>
          <template
            v-for="(memo, mIndex) in this.CONT_DETAIL.D_MEMO_LIST"
            :key="mIndex"
          >
            <memoCompo @updateMemo="updateMemo" @openImgPop="openImgPop" :propContDetail="this.CONT_DETAIL" :diplayCount="-1" @saveModiMemo="saveModiMemo" v-if="this.propDetailYn || mIndex < 3" :childShowYn="propDetailYn" :propMemoEle="memo" :propMIndex="mIndex" :propMemoLength="this.CONT_DETAIL.D_MEMO_LIST.length" @memoEmitFunc="memoEmitFunc"/>
          </template>
          <!-- <img v-if="propDetailYn === false && this.CONT_DETAIL.D_MEMO_LIST && this.CONT_DETAIL.D_MEMO_LIST.length > 3" class="img-w4 mtop-05" src="../../../assets/images/common/icon_menu_round_vertical_gray.svg" alt="" @click="goContentsDetail()"> -->
          <myObserver
            v-if="propDetailYn === true"
            @triggerIntersected="memoLoadMore"
            id="observer"
            class="fl w-100P"
            style="float: left"
          ></myObserver>
        </div>
        <div
          class="contentsCardMemoArea"
          v-else-if="
            pNoAuthYn &&
            this.CONT_DETAIL.memoList &&
            this.CONT_DETAIL.memoList.length > 0
          "
          style=" width: 100%; float: left; cursor: pointer; padding: 10px 20px 0 20px; min-height: 20px; margin-bottom: 10px;" :id="'contentsCardMemoArea' + CONT_DETAIL.contentsKey">
          <template
            v-for="(memo, mIndex) in this.CONT_DETAIL.memoList"
            :key="mIndex"
          >
            <memoCompo :pNoAuthYn="pNoAuthYn" @updateMemo="updateMemo" @openImgPop="openImgPop" :propContDetail="this.CONT_DETAIL" :diplayCount="-1" @saveModiMemo="saveModiMemo" v-if="this.propDetailYn || mIndex < 3" :childShowYn="propDetailYn" :propMemoEle="memo" :propMIndex="mIndex" :propMemoLength="this.CONT_DETAIL.memoList.length" @memoEmitFunc="memoEmitFunc"/>
          </template>
          <!-- <img v-if="propDetailYn === false && this.CONT_DETAIL.D_MEMO_LIST && this.CONT_DETAIL.D_MEMO_LIST.length > 3" class="img-w4 mtop-05" src="../../../assets/images/common/icon_menu_round_vertical_gray.svg" alt="" @click="goContentsDetail()"> -->
          <p
            v-if="propDetailYn === false && this.mMemoMoreShowYn"
            class="fr font14 commonColor fontBold mtop-05 mright"
            @click.stop="this.goContentsDetail(undefined, true)"
          >
            {{ returnCommentText() }}
          </p>
          <myObserver
            v-if="propDetailYn === true"
            @triggerIntersected="memoLoadMore"
            id="observer"
            class="fl w-100P"
            style="float: left"
          ></myObserver>
        </div>
      </template>
    </div>
    <!-- </vue3-simple-html2pdf> -->
    <!-- 밑에는 댓글 작성 창 -->
    <gMemoPop
      :pOpenMemoPop="openMemoPop" :pMemoPopHeight="memoPopHeight" :pIsFocused="isFocused" @memoPopClick="openMemoPop" :pHandleParentClick="handleParentClick"
      style="position: absolute; bottom: 0"
      :resetMemoYn="mMemoResetYn"
      v-if="
        !pNoAuthYn &&
        this.propDetailYn &&
        !(
          CONT_DETAIL.jobkindId === 'BOAR' &&
          CONT_DETAIL.VIEW_YN === false &&
          CONT_DETAIL.creUserKey !== this.GE_USER.userKey
        )
      "
      ref="gMemoRef"
      transition="showMemoPop"
      :mememo="mMememoValue"
      @saveMemoText="saveMemo"
      @clearMemoObj="clearMemoObj"
      @writeMemoScrollMove="writeMemoScrollMove"
    />
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
    <statCodePop
      @closeXPop="this.mWorkStateCodePopShowYn = false"
      :currentWorker="{
        workUserKey: mWorkStateCodePopProps.workUserKey,
        workUserName: mWorkStateCodePopProps.workUserName
      }"
      :teamKey="mWorkStateCodePopProps.creTeamKey"
      :alimDetail="mWorkStateCodePopProps"
      :contentsKey="mWorkStateCodePopProps.contentsKey"
      v-if="mWorkStateCodePopShowYn"
      :codeList="mWorkStateCodePopProps.workStatCodeList"
      :currentCodeKey="mWorkStateCodePopProps.workStatCodeKey"
      class="fr"
    ></statCodePop>
    <gConfirmPop
      :confirmText="mConfirmText"
      :confirmType="mConfirmType"
      v-if="mConfirmPopShowYn"
      @ok="confirmOk"
      @no="mConfirmPopShowYn = false"
    />
    <div
      v-if="mSelectBoardPopShowYn === true"
      style="
        width: 100vw;
        height: 100vh;
        position: fixed;
        background: #00000010;
        z-index: 9;
        top: 0;
        left: 0;
      "
    />
    <div
      v-if="mSelectBoardPopShowYn === true"
      style="
        width: 100%;
        height: 100vh;
        position: fixed;
        z-index: 9;
        top: 0;
        left: 0;
      "
    >
      <gSelectBoardPop
        :type="mSelectBoardType"
        @closeXPop="mSelectBoardPopShowYn = false"
        :boardDetail="mMoveContentsDetailValue"
      />
    </div>

    <imgLongClickPop
      @closePop="this.mImgDetailAlertShowYn = false"
      @clickBtn="longClickAlertClick"
      v-if="mImgDetailAlertShowYn"
    />

    <imgPreviewPop
      :mFileKey="CONT_DETAIL.attachMfilekey"
      :startIndex="mSelectImgIndex"
      @closePop="this.mPreviewPopShowYn = false"
      v-if="mPreviewPopShowYn && CONT_DETAIL.attachMfilekey"
      style="
        width: 100%;
        height: calc(100%);
        position: absolute;
        top: 0px;
        left: 0%;
        z-index: 99;
        padding: 20px 0;
        background: #000000;
      "
      :contentsTitle="CONT_DETAIL.title"
      :creUserName="CONT_DETAIL.creUserName"
      :creDate="CONT_DETAIL.dateText"
      :imgList="this.mClickImgList"
    />
    <template v-if="mContRecvPopShowYn">
      <div
        @click.stop="this.$refs.recvListPop.closeXPop()"
        style="
          width: calc(100% + 1rem);
          height: 100%;
          top: 0;
          z-index: 10;
          left: -1rem;
          position: fixed;
          background: #00000026;
        "
      ></div>
      <recvListPop
        ref="recvListPop"
        @closeXPop="closeRecvListPop"
        :initData="mActorListInitDataList"
      />
    </template>
    <attachFileListPop
      propTargetType="C"
      :propFileData="this.mFilePopData"
      @clickFileDownload="clickFileDownload"
      v-if="mFilePopYn === true"
      @closePop="mFilePopYn = false"
    />
    <!-- <div v-if="mStickerPopShowYn" style="width: 100%; height: 100%; left: 0; top: 0; position: absolute; z-index: 8; background: #00000026;"></div> -->
    <!-- <gSelectsPop v-if="mStickerPopShowYn" @closeXPop="mStickerPopShowYn=false" style="" :pContentsEle="this.CONT_DETAIL"/> -->
    <CommonAddContentsForm
      v-if="showEditPopYn"
      style="z-index: 15"
      :pClosePop="toggleEditPop"
      :pGetReceiverList="returnTargetData"
      :pGetTagListFn="returnTag"
      :pPostContentsFn="editTodo"
      :popUpType="CONT_DETAIL.jobkindId"
      :pContentsData="this.CONT_DETAIL"
      :pOptions="mOption"
    />
    <div v-if="mCommentPopShowYn" class="backgroundShadow" @click.stop="$refs.memoCommentTag.backClick()" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 98;"></div>
    <completeTodoPop :pCompleteTodo="setCompleteTodo" :pCloseCompletePop="closeCompletePop" ref="memoCommentTag"  v-if="mCommentPopShowYn" :pTodoElement="CONT_DETAIL"/>
  </template>
<script>
import { onMessage } from '../../../assets/js/webviewInterface'

// components
import stickerListSetting from '../../popup/common/D_stickerListSetting.vue'
import memoCompo from './D_contBoxMemo.vue'
import completeTodoPop from '@/pages/routerPages/D_completeTodoPop.vue'
import statCodeComponent from '@/components/board/D_manageStateCode.vue'
import CommonAddContentsForm from '../../write/CommonAddContentsForm.vue'

import imgPreviewPop from '@/components/popup/file/Tal_imgPreviewPop.vue'
import statCodePop from '@/components/board/D_manageStateCodePop.vue'
import attachFileListPop from '../main/unit/D_commonAttachFileListPop.vue'
import recvListPop from './D_contentsRecvListPop.vue'

export default {
  components: {
    stickerListSetting,
    attachFileListPop,
    memoCompo,
    completeTodoPop,
    statCodeComponent,
    statCodePop,
    imgPreviewPop,
    recvListPop,
    CommonAddContentsForm
  },
  props: {
    pFadeNotShowYn: {},
    pOpenUnknownLoginPop: Function,
    propTargetType: {},
    contentsEle: {},
    propDetailYn: {},
    propContIndex: {},
    imgClickYn: {},
    propJustShowYn: {},
    propPreStickerList: {},
    index: {},
    pNoAuthYn: {}
  },
  created () {
    // this.saveStickerList()
    if (this.pFadeNotShowYn) this.mFadeNotShowYn = true
    else this.mFadeNotShowYn = false
    if (this.CONT_DETAIL) {
      // console.log('CONT_DETAIL************', this.CONT_DETAIL)
      if (this.CONT_DETAIL.D_CONT_USER_STICKER_LIST) {
        var stickerList = []
        for (
          var s = 0;
          s < this.CONT_DETAIL.D_CONT_USER_STICKER_LIST.length;
          s++
        ) {
          if (!this.CONT_DETAIL.D_CONT_USER_STICKER_LIST[s].sticker) continue
          stickerList.push(this.CONT_DETAIL.D_CONT_USER_STICKER_LIST[s].sticker)
        }
        this.mContStickerList = this.replaceArr(stickerList)
      }
    }
  },
  data () {
    return {
      mCommentPopShowYn: false,
      mMemoLeng: 0,
      mFadeNotShowYn: false,
      mContentMoreShowYn: true,
      mStickerList: [],
      mContStickerList: [],
      openStickerListYn: false,
      mMoreYn: false,
      mFilePopShowYn: false,
      mLoadingShowYn: false,
      mContMenuShowYn: false,
      mConfirmText: '',
      mConfirmType: 'one',
      mConfirmPopShowYn: false,
      mCurrentConfirmType: '',
      // mMemoWritePopShowYn: true,
      mMememoValue: {},
      mContentsSharLink: null,
      mSelectBoardPopShowYn: false,
      mMoveContentsDetailValue: {},
      mSelectBoardType: '',
      mMemoResetYn: false,
      mWorkStateCodePopShowYn: false,
      mWorkStateCodePopProps: {},
      mClickImgList: [],
      mClickTime: null,
      mClickEndYn: false,
      mSelectedImgIndex: 0,
      mImgDetailAlertShowYn: false,
      mPreviewPopShowYn: false,
      mSelectImgObject: {},
      mFileDownData: {},
      mFilePopData: {},
      mFilePopYn: false,
      mContRecvPopShowYn: false,
      mActorListInitDataList: [],
      mWriteMemoYn: false,
      mMemoMoreShowYn: false,
      mStickerPopShowYn: false,
      animationYn: false,
      enterTarget: null,
      showEditPopYn: false,
      mOption: {
        model: 'mankik',
        purpose: 'Edit ToDo',
        fileServerURL: 'https://mzoin.com/fileServer/tp.uploadFile'
      },
      mTargetDataList: [],
      mOpenActorListYn: false,
      mOpenHistoryTab: false,
      mSelectedHistoryTabIdx: 0,
      mSelectedHistoryTabName: this.$t('COMMON_TODO_ALL'),
      mShowHistoryTab: [{ id: 1, title: this.$t('COMMON_TODO_ALL'), val: 'AllHistory' }, { id: 2, title: this.$t('COMMON_TODO_COMMENT'), val: 'comment' }],
      isFocused: false,
      memoPopHeight: '2rem',
      fixedTop: false,
      mSetNewTag: [{ categoryNameMtext: 'Memo', categoryKey: 'H' },
        { categoryNameMtext: 'Work', categoryKey: 'T' },
        { categoryNameMtext: 'Idea', categoryKey: 'S' },
        { categoryNameMtext: 'etc', categoryKey: 'E' }]
    }
  },
  updated () {
    this.addImgEvnt()
  },
  async mounted () {
    // this.addImgEvnt()
    var scrollWrap = document.getElementById('mainAllWrap')
    if (scrollWrap) {
      scrollWrap.addEventListener('scroll', this.handleScroll)
    }
    // if (this.CONT_DETAIL.attachMfilekey && !this.CONT_DETAIL.D_ATTACH_FILE_LIST) {
    //   this.settingFileList()
    // }
    var this_ = this
    this.$nextTick(async () => {
      this_.addImgEvnt()
      // this_.showContentMore()
    })
    await this.setContentsMoreText()
    // this.showContentMore()
    await this.setPreTagInFirstTextLine()
    if (this.pNoAuthYn) {
      this.alimBigView()
    }
  },
  methods: {
    getLightOrDark (colors) {
      if (colors && colors.length > 0) {
        // Variables for red, green, blue values
        var r, g, b, hsp

        // Check the format of the color, HEX or RGB?
        if (colors.match(/^rgb/)) {
          // If RGB --> store the red, green, blue values in separate variables
          colors = colors.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)

          r = colors[1]
          g = colors[2]
          b = colors[3]
        } else {
          // If hex --> Convert it to RGB: http://gist.github.com/983661
          colors = +('0x' + colors.slice(1).replace(
            colors.length < 5 && /./g, '$&$&'))

          r = colors >> 16
          g = colors >> 8 & 255
          b = colors & 255
        }

        // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        hsp = Math.sqrt(
          0.299 * (r * r) +
              0.587 * (g * g) +
              0.114 * (b * b)
        )
        // Using the HSP value, determine whether the color is light or dark
        if (hsp > 141) {
          return '#222'
        } else {
          return '#fff'
        }
      }
    },
    async setCompleteTodo (value, memoComment) {
      await this.completeTodo(value, memoComment)
      if (this.$refs.memoCommentTag) {
        this.$refs.memoCommentTag.backClick()
      }
    },
    closeCompletePop (updateYn) {
      if (updateYn) {

      } else {
      }
      this.mCommentPopShowYn = !this.mCommentPopShowYn
    },
    reqCompleteTodo () {
      if (this.CONT_DETAIL.contStatus === '00') {
        this.mCommentPopShowYn = !this.mCommentPopShowYn
      } else {
        this.completeTodo(this.CONT_DETAIL)
      }
    },
    closeXPop () {
      this.$emit('closeXPop')
    },
    fixedAtTop () {
      this.fixedTop = !this.fixedTop
    },
    openMemoPop () {
      this.isFocused = true
      this.memoPopHeight = '6rem'
    },
    handleParentClick (data) {
      this.memoPopHeight = '2rem'
      this.goContentsDetail()
      this.closeActorList()
    },
    handleFocusChange (newFocusState) {
      // 자식 컴포넌트에서 isFocus 상태가 변경될 때 호출되는 메서드
      this.isFocus = newFocusState
    },
    selectHistory (index) {
      // this.mSelectedHistoryTabName = this.mSelectedHistoryTabName === '전체'
      //   ? this.mShowHistoryTab[1].title
      //   : this.mShowHistoryTab[0].title
      // console.log('Selected Tab:', this.selectedTab.val)
      this.mSelectedHistoryTabIdx = index
    },
    getMonthDate (date) {
      var format = 'MM/DD'
      return this.$dayjs(date).add(9, 'hour').format(format)
    },
    getHowLate (toDate, endDate = new Date()) {
      const howLate = new Date(endDate).getTime()
      const toDateNew = new Date(toDate).getTime()
      const timeDifference = howLate - toDateNew
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      return daysDifference
    },
    openActorList () {
      this.mOpenActorListYn = !this.mOpenActorListYn
    },
    closeActorList () {
      this.mOpenActorListYn = false
    },
    async completeTodo (value, memoComment) {
      var param = {}
      if (memoComment) {
        param.memoHeaderStr = '[완료메세지]\n'
        param.memoBodyStr = memoComment
      }
      param.contentsKey = value.contentsKey
      param.workUserName = this.GE_USER.userDispMtext
      param.creUserName = this.GE_USER.userDispMtext
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
      param.jobkindId = 'TODO'
      if (value.contStatus === '00') {
        param.contStatus = '99'
      } else {
        param.contStatus = '00'
      }
      param.workUserKey = this.GE_USER.userKey
      const res = await this.$commonAxiosFunction({
        url: '/sUniB/tp.updateTodo',
        param: param
      })
      this.CONT_DETAIL.contStatus = param.contStatus
      this.CONT_DETAIL.workUserName = this.GE_USER.userDispMtext
      this.CONT_DETAIL.workUserKey = value.workUserKey
      this.CONT_DETAIL.creTeamKey = 0
      try {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.CONT_DETAIL])
        if (res && res.sticker) {
          this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', res.sticker)
        }
      } catch (error) {
        console.log(error)
      }
      this.$emit('completeTodo')
    },
    returnTag () {
      return this.GE_STICKER_LIST
      // 기본으로 들어있는 4가지 값이 중복되지 않게 처리
      // const uniqueTags = new Set()
      // this.mSetNewTag.filter(tag => {
      //   const tagText = tag.nameMtext
      //   if (!uniqueTags.has(tagText)) {
      //     uniqueTags.add(tagText)
      //     return true
      //   }
      //   return false
      // })

      // // 사용자 정의 태그 추가, 중복되어 생기지 않게 처리
      // for (let i = 0; i < this.CONT_DETAIL.stickerList.length; i++) {
      //   const tagText = this.CONT_DETAIL.stickerList[i].nameMtext
      //   if (!uniqueTags.has(tagText)) {
      //     this.mSetNewTag.unshift({ nameMtext: tagText, stickerKey: null, picBgPath: '#CCC', creUserKey: this.GE_USER.userKey })
      //     uniqueTags.add(tagText)
      //   }
      // }
      // console.log('this.mSetNewTag', this.mSetNewTag)
      // return this.mSetNewTag
    },
    onDragenter (event) {
      // class 넣기
      try {
        const memoRef = this.$refs.gMemoRef
        if (memoRef) {
          memoRef.onDragenter()
          // this.mIsDraggedYn = true
        }
        this.enterTarget = event.target
      } catch (error) {
        console.log(error)
      }
    },
    onDragleave (event) {
      // class 삭제
      if (this.enterTarget === event.target) {
        event.stopPropagation()
        event.preventDefault()
        const memoRef = this.$refs.gMemoRef
        if (memoRef) {
          memoRef.onDragleave()
          // this.mIsDraggedYn = true
        }
      }
    },
    returnCommentText () {
      if (this.GE_LOCALE === 'ko') {
        return `댓글 ${this.mMemoLeng}개 모두 보기`
      } else {
        return `See all ${this.mMemoLeng} comments`
      }
    },
    // showContentMore () {
    //   if (this.propDetailYn) this.alimBigView()
    //   let contentHeight = 0
    //   if (this.$refs.mainContRef) {
    //     contentHeight = this.$refs.mainContRef.offsetHeight
    //   }
    //   // var bodyMoreText = window.document.getElementById('bodyMore' + this.contentsEle.contentsKey)
    //   if (contentHeight < 300) {
    //     this.mContentMoreShowYn = false
    //     // bodyMoreText.style.display = 'block'
    //   } else {
    //     this.mContentMoreShowYn = true
    //     // bodyMoreText.style.display = 'none'
    //   }
    // },
    alimBigView () {
      var contentsBodyBoxArea = window.document.getElementById(
        'contentsBodyBoxArea' + this.CONT_DETAIL.contentsKey
      )
      // var bodyMoreArea = window.document.getElementById('bodyMore' + this.CONT_DETAIL.contentsKey)
      contentsBodyBoxArea.style.maxHeight = '100%'
      // eslint-disable-next-line no-debugger
      // debugger
      // let contentRef = {}
      // if (this.$refs.mainContRef) {
      //   this.mContentMoreShowYn = false
      //   contentRef = this.$refs.mainContRef
      //   contentRef.style.maxHeight = '100%'
      // }
      this.mContentMoreShowYn = false
      // this.mMoreYn = false
      // bodyMoreArea.style.display = 'none'
    },
    saveStickerList (params) {
      this.mContStickerList = params.mContStickerList
    },
    async openStickerPop () {
      if (this.GE_USER.unknownYn) {
        this.pOpenUnknownLoginPop(this.CONT_DETAIL)
        return
      }
      if (!this.openStickerListYn) {
        var param = {}
        if (this.GE_USER.unknownYn) return
        param.creUserKey = this.GE_USER.userKey
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.getStickerList',
          param: param
        })
        this.mStickerList = result.data
        // var index
        // for (var i = 0; i < this.mContStickerList.length; i++) {
        //   index = this.mStickerList.findIndex((item) => Number(item.stickerKey) === Number(this.mContStickerList[i].stickerKey))
        //   if (index !== -1) {
        //     this.mStickerList.splice(index, 1)
        //   }
        // }
        this.openStickerListYn = true
      } else {
        this.openStickerListYn = false
      }
    },
    openSettingStickerPop (params) {
      this.$emit('openPop', params)
    },
    addAnimation () {
      this.animationYn = true
      var this_ = this
      setTimeout(() => {
        this_.animationYn = false
      }, 2000)
    },
    goStickerContentsList (val) {
      if (!val.stickerKey) return
      this.$emit('requestSearchSticker', { selectedSticker: val })
    },
    updateMemo (param) {
      console.log('새 댓글*****', param)
      var idx
      var idx2
      if (param[2] !== null) {
        idx = this.CONT_DETAIL.D_MEMO_LIST.findIndex(
          (item) => item.memoKey === Number(param[2])
        )
        idx2 = this.CONT_DETAIL.D_MEMO_LIST[idx].cmemoList.findIndex(
          (item) => item.memoKey === Number(param[1])
        )
        this.CONT_DETAIL.D_MEMO_LIST[idx].cmemoList[idx2].attachFileList =
            param[0]
      } else {
        idx = this.CONT_DETAIL.D_MEMO_LIST.findIndex(
          (item) => item.memoKey === Number(param[1])
        )
        this.CONT_DETAIL.D_MEMO_LIST[idx].attachFileList = param[0]
      }
    },
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    setMoreMemoBtn () {
      if (!this.CONT_DETAIL) return
      var memoList = this.CONT_DETAIL.D_MEMO_LIST
      if (!memoList) {
        memoList = this.CONT_DETAIL.memoList
      }
      if (!memoList) return
      /* if (memoList.length > 3) {
          return true
        } */
      var leng = memoList.length
      for (var i = 0; i < memoList.length; i++) {
        if (memoList[i].creUserKey === this.GE_USER.userKey) {
          this.mWriteMemoYn = true
        }
        for (var c = 0; c < memoList[i].cmemoList.length; c++) {
          if (memoList[i].cmemoList[c].creUserKey === this.GE_USER.userKey) {
            this.mWriteMemoYn = true
          }
        }
        leng += memoList[i].cmemoList.length
      }
      if (leng > 3) {
        this.mMemoMoreShowYn = true
        if (this.CONT_DETAIL && this.CONT_DETAIL.memoCount) {
          this.mMemoLeng = this.CONT_DETAIL.memoCount
        }
      }
    },
    closeRecvListPop (openPopParam) {
      this.mContRecvPopShowYn = false
      if (openPopParam) {
        this.openWriteContentsPop(openPopParam)
      }
    },
    openWriteContentsPop (openPopParam) {
      var param = {}
      param.selectedList = openPopParam
      param.targetType = 'writeContents'
      param.targetKey = this.contentsEle.creTeamKey
      param.popHeaderText = this.contentsEle.nameMtext
      this.$emit('openPop', param)
    },
    sendReply () {
      var selectedList = { memberList: [], bookList: [] }
      var creUserObj = {}
      creUserObj.accessKind = 'U'
      creUserObj.userKey = this.contentsEle.creUserKey
      creUserObj.userDispMtext = 'KO$^$' + this.contentsEle.creUserName
      selectedList.memberList.push(creUserObj)
      this.openWriteContentsPop(selectedList)
    },
    async openRecvActorListPop (allYn) {
      if (allYn === true) {
        this.$showToastPop(this.$t('COMM_MSG_RECEIVE_ALL'))
        return
      }
      if (this.contentsEle.creUserKey !== this.GE_USER.userKey) {
        this.$showToastPop(this.$t('COMM_MSG_RECEIVER_CHECK'))
        return
      }
      this.mActorListInitDataList = this.CONT_DETAIL
      if (this.CONT_DETAIL.actorList) {
        this.mActorListInitDataList.actorList = this.CONT_DETAIL.actorList
      } else {
        var paramMap = new Map()
        paramMap.set('contentsKey', this.contentsEle.contentsKey)
        paramMap.set('teamKey', this.contentsEle.creTeamKey)
        try {
          var result = await this.$commonAxiosFunction({
            url: '/sUniB/tp.getContentsActorList',
            param: Object.fromEntries(paramMap)
          })
          if (result && result.data && result.data.length > 0) {
            var actorList = result.data
            this.mActorListInitDataList.actorList = actorList
          }
        } catch (e) {
          console.error('D_contentsDetail error')
          console.error(e)
        } finally {
        /* this.memoShowYn = false
          this.mLoadingShowYn = false */
        }
      }
      if (this.mActorListInitDataList.actorList) {
        this.mContRecvPopShowYn = true
      }
    },
    async saveModiMemo (modiMemoObj) {
      var memo = null
      if (modiMemoObj.param) {
        memo = modiMemoObj.param
      }
      try {
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.saveMemo',
          param: { memo: memo }
        })
        // if (result.data.result === true || result.data.result === 'true') {
        if (result.data && result.data.result) {
          this.$refs.gMemoRef.clearMemo()
          this.mMememoValue = {}
          //   this.getMemoList(true)
          if (
            result.data.resultList &&
              result.data.resultList.memoList.length > 0
          ) {
            var saveMemoObj = {}
            var index
            if (memo.parentMemoKey) {
              // 댓글의 부모키값이 있으면 컨텐츠의 댓글 중 부모의 ^memo%키값을 찾음
              index = await result.data.resultList.memoList.findIndex(
                (item) => item.memoKey === memo.parentMemoKey
              )
              saveMemoObj = await result.data.resultList.memoList[index]
            } else {
              saveMemoObj = await result.data.resultList.memoList[0]

              saveMemoObj = await result.data.resultList.memoList[0]
              var newMemoList = [
                ...this.CONT_DETAIL.D_MEMO_LIST,
                ...result.data.resultList.memoList
              ]

              this.CONT_DETAIL.D_MEMO_LIST = this.replaceArr(newMemoList)
              // eslint-disable-next-line vue/no-mutating-props
              this.contentsEle.D_MEMO_LIST = this.replaceArr(newMemoList)
            }
            saveMemoObj.creTeamKey = this.CONT_DETAIL.creTeamKey
            saveMemoObj.jobkindId = this.CONT_DETAIL.jobkindId
            await this.$store.commit('D_CHANNEL/MU_ADD_MEMO', saveMemoObj)
          }
        }
      } catch (e) {
        console.error('D_contentsDetail error')
        console.error(e)
      } finally {
        this.memoShowYn = false
        this.mLoadingShowYn = false
      }
    },
    async clickFileDownload () {
      await this.getContentsDetail()
      await this.settingFileList_downAtt()
      this.mFilePopData = this.mFileDownData
      // if (!this.propDetailYn) {
      //   await this.getContentsDetail()
      //   await this.settingFileList_downAtt()
      //   this.mFilePopData = this.mFileDownData
      // } else {
      //   this.mFilePopData = this.CONT_DETAIL
      // }
      // this.$emit('fileDownload', this.mFileDownData)
      this.mFilePopYn = true
    },
    async getContentsDetail () {
      // eslint-disable-next-line no-debugger
      debugger
      var param = {}
      param.contentsKey = this.contentsEle.contentsKey
      param.targetKey = this.contentsEle.contentsKey
      param.jobkindId = this.contentsEle.jobkindId
      param.userKey = this.GE_USER.userKey
      param.ownUserKey = this.GE_USER.userKey
      var resultList = await this.$getContentsList(param)
      var detailData = resultList.content[0]
      this.mFileDownData = detailData
      try {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
      } catch (error) {
        console.log(error)
      }
    },
    async settingFileList_downAtt () {
      try {
        if (
          this.CONT_DETAIL &&
            this.CONT_DETAIL.attachFileList !== undefined &&
            this.CONT_DETAIL.attachFileList.length > 0
        ) {
          var attachFileList = []
          var bodyImgFileList = []
          for (var a = 0; a < this.CONT_DETAIL.attachFileList.length; a++) {
            if (this.CONT_DETAIL.attachFileList[a].attachYn === true) {
              attachFileList.push(this.CONT_DETAIL.attachFileList[a])
            } else if (this.CONT_DETAIL.attachFileList[a].attachYn === false) {
              bodyImgFileList.push(this.CONT_DETAIL.attachFileList[a])
            }
          }

          var cont = this.contentsEle
          cont.D_ATTACH_FILE_LIST = attachFileList
          cont.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.mFileDownData.D_ATTACH_FILE_LIST = attachFileList
          this.mFileDownData.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
          return bodyImgFileList
        }
      } catch (error) {
        console.log(error)
      }
    },
    async settingFileList_old () {
      // eslint-disable-next-line no-debugger
      debugger
      try {
        if (
          this.CONT_DETAIL &&
            this.CONT_DETAIL.attachFileList !== undefined &&
            this.CONT_DETAIL.attachFileList.length > 0
        ) {
          var attachFileList = []
          var bodyImgFileList = []
          for (var a = 0; a < this.CONT_DETAIL.attachFileList.length; a++) {
            if (this.CONT_DETAIL.attachFileList[a].attachYn === true) {
              attachFileList.push(this.CONT_DETAIL.attachFileList[a])
            } else if (this.CONT_DETAIL.attachFileList[a].attachYn === false) {
              bodyImgFileList.push(this.CONT_DETAIL.attachFileList[a])
            }
          }

          var cont = this.contentsEle
          cont.D_ATTACH_FILE_LIST = attachFileList
          cont.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.mFileDownData.D_ATTACH_FILE_LIST = attachFileList
          this.mFileDownData.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
          return bodyImgFileList
        }
      } catch (error) {
        console.log(error)
      }
    },
    async settingFileList () {
      if (
        this.CONT_DETAIL &&
          this.CONT_DETAIL.attachFileList !== undefined &&
          this.CONT_DETAIL.attachFileList.length > 0
      ) {
        var bodyImgFileList = []
        for (var a = 0; a < this.CONT_DETAIL.attachFileList.length; a++) {
          if (this.CONT_DETAIL.attachFileList[a].attachYn === false) {
            bodyImgFileList.push(this.CONT_DETAIL.attachFileList[a])
          }
        }

        /*  var cont = this.contentsEle
            cont.D_ATTACH_FILE_LIST = attachFileList
            cont.D_BODY_IMG_FILE_LIST = bodyImgFileList
            this.mFileDownData.D_ATTACH_FILE_LIST = attachFileList
            this.mFileDownData.D_BODY_IMG_FILE_LIST = bodyImgFileList
            this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont]) */
        return bodyImgFileList
      }
    },
    async setPreTagInFirstTextLine () {
      // 본문 영역에 첫번째 줄이 사진이 아닐 경우 라인을 그어주기 위한 함수
      // if (!window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey)) return
      // if (!this.$refs.mainContRef) return
      if (!this.$refs[['mainContRef' + this.contentsEle.contentsKey]]) return
      if (
        this.contentsEle.jobkindId === 'BOAR' &&
          this.$checkUserAuth(this.contentsEle.shareItem).V === false &&
          this.contentsEle.creUserKey !== this.GE_USER.userKey
      ) {
        return
      }

      // var contents = await window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey)
      if (this.$refs['mainContRef' + this.contentsEle.contentsKey]) {
        var contents = this.$refs['mainContRef' + this.contentsEle.contentsKey]
      }
      if (
        !contents ||
          !contents.childNodes ||
          contents.childNodes.length === 0
      ) {
        return
      }
      if (contents.childNodes.length > 0) {
        var i = 0
        var child = contents.childNodes[i]
        while (child.innerText === '') {
          child = contents.childNodes[i]
          i += 1

          if (contents.childNodes.length === i) break
        }
        if (child.id === 'formEditText') {
          // 밑에 체크를 안해주면 중복으로 줄이 생김
          var tempCheck = window.document.getElementById(
            'firstTextLine' + this.contentsEle.contentsKey
          )
          if (tempCheck === undefined || tempCheck === null) {
            var tempDiv = document.createElement('div')
            tempDiv.id = 'firstTextLine' + this.contentsEle.contentsKey
            tempDiv.classList.add('firstTextLine')
            child.prepend(tempDiv)
          }
        } else {
        }
      }
    },
    async getMemoTop () {
      // contentsDetail.vue에서 스크롤 무브로 사용하고 있습니다.
      if (this.propDetailYn === false) return
      this.$nextTick(() => {
        var memoFrist = window.document.getElementById(
          'contentsCardMemoArea' + this.CONT_DETAIL.contentsKey
        )
        if (!memoFrist) return
        var memoFristTop = memoFrist.offsetTop
        return memoFristTop
      })
    },
    cancelConfirm () {
      this.mConfirmText = this.$t('COMMON_MSG_CANCEL_NOTI')
      this.mCurrentConfirmType = 'alimCancel'
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
    },
    setIntervalTimer (date, contentsKey) {
      var time = this.$cancelTimer(date)
      // var innerHTML = '<p class="CErrorColor font12 fr mleft-05" style="text-decoration: underline;" id="contentsTime' + contentsKey +'"></p> <p class="font12 fr textRight" id="contentsTime' + contentsKey + '"></p>'
      if (time !== false) {
        this.$nextTick(() => {
          // document.getElementById('timerText'+contentsKey).innerHTML = innerHTML
          setInterval(() => {
            time = this.$cancelTimer(date)
            if (time !== false) {
              if (document.getElementById('timerText' + contentsKey)) {
                document.getElementById('timerText' + contentsKey).innerHTML =
                    time
              }
            } else {
              clearInterval()
              if (document.getElementById('timerBtn' + contentsKey)) {
                document.getElementById('timerBtn' + contentsKey).innerText = ''
              }
              if (document.getElementById('timerText' + contentsKey)) {
                document.getElementById('timerText' + contentsKey).innerText =
                    ''
              }
              if (document.getElementById('timerArea' + contentsKey)) {
                document.getElementById('timerArea' + contentsKey).innerText =
                    ''
              }
            }
          }, 1000)
        })
      }
    },
    cancelTimerShowCheck (contents) {
      var result = false
      if (
        contents.jobkindId === 'ALIM' &&
          contents.creUserKey === this.GE_USER.userKey
      ) {
        var time = this.$cancelTimer(contents.creDate)
        if (time !== false) {
          result = true
        }
      }
      return result
    },
    memoLoadMore () {
      this.$emit('memoLoadMore')
    },
    writeMemoScrollMove () {
      this.$emit('writeMemoScrollMove')
    },
    handleScroll () {
      this.mClickEndYn = true
    },
    clearMemoObj () {
      this.mMememoValue = null
    },
    writeMeMemo (memoObj) {
      this.mMememoValue = {}
      this.mMememoValue = memoObj
      this.$refs.gMemoRef.setMememo(memoObj)
    },
    memoEmitFunc (emitData) {
      var type = emitData.targetType
      var data = emitData.value
      if (type === 'goUserProfile') {
        if (this.propDetailYn) {
          this.goUserProfile(data.creUserKey)
        } else {
          this.goContentsDetail(undefined, true)
        }
        //
      } else if (type === 'goContentsDetail') {
        // 댓글로 스크롤하기 위해 2번째 파라미터를 true로 보내줌 (1번째는 컨텐츠 더보기 유무)
        this.goContentsDetail(undefined, true)
      } else if (type === 'writeMeMemo') {
        this.writeMeMemo(data)
      }
    },
    confirmOk () {
      var toastText = ''
      this.mConfirmType = 'timeout'
      if (this.mCurrentConfirmType === 'BLOC') {
        var param = {}
        param.claimType = 'BLOC'
        if (this.CONT_DETAIL.contentsKey) {
          param.targetKind = 'C'
          param.targetKey = this.CONT_DETAIL.contentsKey
        } else return false
        param.creUserKey = this.GE_USER.userKey
        toastText = this.$t('COMMON_MSG_BLOCKED')
        this.saveActAxiosFunc(param, toastText)
      } else if (this.mCurrentConfirmType === 'alimDEL') {
        this.deleteContents(this.$t('COMMON_MSG_DELETED_NOTI'))
      } else if (this.mCurrentConfirmType === 'boardDEL') {
        this.deleteContents(this.$t('COMMON_MSG_DELETED_POST'))
      } else if (this.mCurrentConfirmType === 'todoDEL') {
        this.deleteContents(this.$t('COMM_MSG_DELETED_SCHEDULE'))
      } else if (this.mCurrentConfirmType === 'contMemoDEL') {
        this.deleteContents(this.$t('COMM_MSG_DELETED_MEMO'))
      } else if (this.mCurrentConfirmType === 'alimCancel') {
        this.alimCancle()
      }

      this.mCurrentConfirmType = ''
      this.mConfirmPopShowYn = false
    },
    async alimCancle () {
      // 현재 시간과 비교하며 3분이 지났으면 false가 오고있음 혹시 모르니 한번 더 체크하는 중
      var checkTime = this.$cancelTimer(this.contentsEle.creDate)
      if (checkTime !== false) {
        this.mLoadingShowYn = true
        try {
          var param = {}
          param = this.contentsEle
          var result = await this.$commonAxiosFunction({
            url: '/sUniB/tp.deleteContents',
            param: param
          })
          if (result) {
            this.$emit('contDelete', this.propContIndex)
            // this.$store.commit('D_CHANNEL/MU_DEL_CONT_LIST', [this.contentsEle])
            this.$showToastPop(this.$t('COMM_MSG_CANCELED_NOTI'))
          }
        } catch (e) {
          this.$showToastPop(
            this.$t('COMM_MSG_CANCEL_FAIL')
          )
          console.log(e)
        } finally {
          this.mLoadingShowYn = false
        }
      } else {
        this.$showToastPop(this.$t('COMM_MSG_CANCLE_TIMEOUT'))
      }
    },
    editable (type, allYn) {
      this.mContMenuShowYn = false
      if (type === 'edit') {
        if (this.contentsEle.jobkindId === 'BOAR') {
          this.editBoard()
        }
      } else if (type === 'delete') {
        if (allYn) {
        } else {
          this.deleteConfirm()
        }
      } else if (type === 'alimBloc') {
      } else if (type === 'move' || type === 'copy') {
        this.moveOrCopyContent(type)
      } else if (type === 'writeBoard') {
        this.makeNewContents(type)
      } else if (type === 'writeAlim') {
        this.makeNewContents(type)
      } else if (type === 'subScribe') {
        this.subScribeContents(type)
      } else if (type === 'textCopy') {
        this.textCopy()
      }
    },
    getDate (value) {
      // -1:day-1, 0:day, 1:day+1
      let todayDate = ''
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1 + ''
      let day = date.getDate() + value + ''
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      todayDate = year + '-' + month + '-' + day
      return todayDate
    },
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
          } else {
            tempObj.accessKind = 'C'
            tempObj.accessKey = value.cabinetKey
            tempObj.accessName = value.cabinetNameMtext
            tempObj.iconPath = require('@/assets/images/editChan/icon_addressBook.svg')
            // targetList에 나타나는 아이콘을 원 안에 가득 채울지, 아닐지 결정하는 변수
            tempObj.iconFullYn = false
            if (value.nameMtext) {
              tempObj.accessName = `[${this.$changeText(value.nameMtext)}] ` + this.$changeText(value.cabinetNameMtext)
              tempObj.iconPath = value.logoDomainPath
                ? this.$changeUrlBackslash(
                  value.logoDomainPath + value.logoPathMtext
                )
                : value.logoPathMtext
              tempObj.iconFullYn = true
            }

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
        return this.convertTargetData(target, true)
      }
      return this.mTargetDataList
    },
    async toggleEditPop () {
      if (this.CONT_DETAIL.jobkindId !== 'MEMO') {
        const paramMap = {}
        paramMap.userKey = this.GE_USER.userKey
        paramMap.searchDate = this.getDate(1)
        paramMap.sysCabinetCode = 'USER'

        const result = await this.$getTodoListGroupCab(paramMap, true)
        if (result.result) {
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
        }
      }

      this.showEditPopYn = !this.showEditPopYn
      this.mContMenuShowYn = false
    },
    async editTodo (params) {
      params.creUserKey = this.GE_USER.userKey
      params.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      params.jobkindId = this.CONT_DETAIL.jobkindId
      params.contentsKey = this.CONT_DETAIL.contentsKey

      if (this.CONT_DETAIL.jobkindId !== 'MEMO') {
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

      await this.$saveContents(params).then((res) => {
        this.$emit('completeTodo')
        if (res.sticker) {
          this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', res.sticker)
        }
      })
      // this.closeWritePop('WriteContents', this.closeWritePop)
      this.toggleEditPop()
    },
    editBoard () {
      const param = {}
      param.targetKey = this.CONT_DETAIL.contentsKey
      param.contentsJobkindId = 'BOAR'
      param.targetType = 'writeContents'
      param.jobkindId = 'BOAR'
      param.creTeamKey = this.CONT_DETAIL.creTeamKey
      if (this.CONT_DETAIL.attachMfilekey) {
        param.attachMfilekey = this.CONT_DETAIL.attachMfilekey
      }
      if (this.CONT_DETAIL.attachFileList) {
        param.attachFileList = this.CONT_DETAIL.attachFileList
      }
      param.bodyFullStr = this.CONT_DETAIL.bodyFullStr
      param.modiContentsKey = this.CONT_DETAIL.contentsKey
      param.titleStr = this.CONT_DETAIL.title
      param.value = this.CONT_DETAIL
      this.$emit('openPop', param)
    },
    deleteConfirm () {
      if (this.contentsEle.jobkindId === 'ALIM') {
        this.mConfirmText =
            this.$t('COMMON_MSG_DELETE_NOTI')
        this.mCurrentConfirmType = 'alimDEL'
      } else if (this.contentsEle.jobkindId === 'BOAR') {
        this.mConfirmText = this.$t('COMMON_MSG_DELETE_POST')
        this.mCurrentConfirmType = 'boardDEL'
      } else if (this.contentsEle.jobkindId === 'TODO') {
        this.mConfirmText = this.$t('COMM_MSG_DELETE_SCHEDULE')
        this.mCurrentConfirmType = 'todoDEL'
      } else if (this.contentsEle.jobkindId === 'MEMO') {
        this.mConfirmText = this.$t('COMMON_MSG_DELETE_MEMO')
        this.mCurrentConfirmType = 'contMemoDEL'
      }
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
    },
    async deleteContents (toastText) {
      var result
      var inParam = {}
      if (this.contentsEle.jobkindId === 'ALIM') {
        inParam = {}
        inParam.mccKey = this.contentsEle.mccKey
        inParam.jobkindId = 'ALIM'
        result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.deleteMCabContents',
          param: inParam
        })
      } else if (this.contentsEle.jobkindId === 'BOAR') {
        inParam = {}
        inParam.mccKey = this.contentsEle.mccKey
        inParam.contentsKey = this.contentsEle.contentsKey
        inParam.jobkindId = 'BOAR'
        inParam.teamKey = this.contentsEle.creTeamKey
        inParam.deleteYn = true
        result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.deleteContents',
          param: inParam
        })
      } else if (this.contentsEle.jobkindId === 'TODO' || this.contentsEle.jobkindId === 'MEMO') {
        inParam = {}
        inParam.mccKey = this.contentsEle.mccKey
        inParam.contentsKey = this.contentsEle.contentsKey
        inParam.jobkindId = this.contentsEle.jobkindId
        // inParam.teamKey = this.contentsEle.creTeamKey
        inParam.deleteYn = true
        result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.deleteContents',
          param: inParam
        })
        this.$emit('completeTodo', true)
      }
      if (result) {
        this.$showToastPop(toastText)
      }
      // 반복문에 index값을 prop으로 받아 해당 함수가 리스트에 몇번째에서 발생한지 인지하고 그 인덱스를 삭제
      this.$emit('contDelete', this.propContIndex)
      // @@@ 추후에 vuex에 컨텐츠 삭제를 해야함 @@@@ @@@@ @@@@ @@@@ @@@@ #추가
      this.$store.commit('D_CHANNEL/MU_DEL_CONT_LIST', inParam)
    },
    moveOrCopyContent (type) {
      this.mSelectBoardType = type
      this.mMoveContentsDetailValue = this.CONT_DETAIL
      this.mSelectBoardPopShowYn = true
    },
    closeSelectBoardPop () {
      this.mSelectBoardPopShowYn = false
    },
    async makeNewContents (type) {
      // writeBoard -> 알림을 게시글로 작성, writeAlim -> 게시글을 알림으로 작성
      // eslint-disable-next-line no-debugger
      debugger
      if (
        this.contentsEle.creTeamKey &&
          type !== 'writeBoard' &&
          (!this.CHANNEL_DETAIL.ownerYn ||
            !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn) &&
          !this.CHANNEL_DETAIL.memberYn &&
          !this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn &&
          (this.CHANNEL_DETAIL.memberYn === 0 ||
            this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 0) &&
          (!this.CHANNEL_DETAIL.managerKey ||
            !this.CHANNEL_DETAIL.D_CHAN_AUTH.managerKey)
      ) {
        this.$showToastPop(
          this.$t('COMM_MSG_MEMB_NEED')
        )
        // this.$checkDeleteHistory('bottomWriteSheets')
        // this.$emit('openMember')
        return
      }
      // const param = {}
      // param.contentsKey = this.contentsEle.contentsKey
      // param.targetKey = this.contentsEle.contentsKey
      // param.jobkindId = this.contentsEle.jobkindId
      // param.userKey = this.GE_USER.userKey
      // param.ownUserKey = this.GE_USER.userKey
      // var resultList = await this.$getContentsList(param)
      var writeParam = {}
      writeParam.contentsJobkindId = type === 'writeBoard' ? 'BOAR' : 'ALIM'
      writeParam.targetKey = this.contentsEle.creTeamKey
      writeParam.teamKey = this.contentsEle.creTeamKey
      writeParam.currentTeamKey = this.contentsEle.creTeamKey
      writeParam.attachMfilekey = this.contentsEle.attachMfilekey
      if (this.contentsEle.attachFileList) {
        writeParam.attachFileList = this.contentsEle.attachFileList
      }
      writeParam.targetType = 'writeContents'
      if (writeParam.contentsJobkindId === 'ALIM') {
        writeParam.UseAnOtherYn = true
        writeParam.targetNameMtext = this.CHANNEL_DETAIL.nameMtext
      } else if (writeParam.contentsJobkindId === 'BOAR') {
        var teamList = await this.$getWriteBoardData(
          this.contentsEle.creTeamKey
        )
        if (teamList === false) {
          this.$showToastPop(
            this.$t('COMM_MSG_CHAN_NONE')
          )
          return
        }
        writeParam.selectBoardYn = true
        writeParam.UseAnOtherYn = true
        writeParam.initData = teamList
      }
      writeParam.titleStr = this.contentsEle.title
      writeParam.bodyFullStr = this.contentsEle.bodyFullStr
      writeParam.modiContentsKey = this.contentsEle.contentsKey
      this.$emit('openPop', writeParam)
      // this.mSeleteWriteTypePopShowYn = false
    },
    /* makeNewContents (type) {
        var tempData = JSON.parse(JSON.stringify(this.contentsEle))
        console.log(type)
        tempData.contentsJobkindId = type === 'writeBoard' ? 'BOAR' : type === 'writeAlim' ? 'ALIM' : undefined
        tempData.targetType = 'writeContents'

        tempData.UseAnOtherYn = true
        tempData.selectBoardYn = true

        // tempData.bodyFullStr = tempData.bodyFullStr
        tempData.titleStr = tempData.title

        tempData.modiContentsKey = tempData.contentsKey

        this.$emit('openPop', tempData)
      }, */
    bloc (type) {
      var typeText = type
      if (typeText === 'USER') {
        this.mConfirmText = this.$t('COMMON_MSG_BLOCK')
      } else {
        this.mConfirmText = this.$t('COMMON_MSG_BLOCK_BOAR')
      }
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
      this.mCurrentConfirmType = 'BLOC'
    },
    report (type) {
      var targetKind
      var targetKey
      var toastText
      if (type === 'ALIM') {
        targetKind = 'C'
        targetKey = this.CONT_DETAIL.contentsKey
        toastText = this.$t('COMMON_MSG_REPORT_NOTI')
      } else if (type === 'BOAR') {
        targetKind = 'C'
        targetKey = this.CONT_DETAIL.contentsKey
        toastText = this.$t('COMMON_MSG_REPORT_POST')
      } else if (type === 'MEMO') {
        targetKind = 'C'
        targetKey = this.CONT_DETAIL.memoKey
        toastText = this.$t('COMMON_MSG_REPORT_COMMENT')
      } else if (type === 'CHANNEL') {
        targetKind = 'T'
        targetKey = this.CONT_DETAIL.creTeamKey
        toastText = this.$t('COMMON_MSG_REPORT_CHAN')
      } else if (type === 'USER') {
        targetKind = 'U'
        targetKey = this.CONT_DETAIL.creUserKey
        toastText = this.$t('COMMON_MSG_REPORT_USER')
      }
      var param = {}
      param.claimType = 'REPO'
      param.targetKind = targetKind
      param.targetKey = parseInt(targetKey)
      param.creUserKey = this.GE_USER.userKey
      this.saveActAxiosFunc(param, toastText)
    },
    /** 신고, 차단, 탈퇴를 할 수 있는 axios함수 // actType, targetKind, targetKey, creUserKey 보내기 */
    async saveActAxiosFunc (param, toastText) {
      try {
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.saveClaimLog',
          param: param
        })
        if (result) {
          this.$showToastPop(toastText)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.mContMenuShowYn = false
      }
    },
    contentMenuClick () {
      this.mContMenuShowYn = true
    },
    textCopy () {
      const textarea = document.createElement('textarea')
      // textarea.style.display = 'none'
      document.body.appendChild(textarea)

      var contKey, content
      try {
        if (this.contentsEle.jobkindId) {
          contKey = this.contentsEle.contentsKey
          // content = document.getElementById('bodyFullStr' + contKey).innerText
          content = this.$refs[['mainContRef' + contKey]].innerText
        }

        textarea.value = content
        textarea.select()
        // 복사 후 textarea 지우기
        document.execCommand('copy')
        document.body.removeChild(textarea)
        this.$showToastPop(this.$t('COMMON_MSG_COPY_SUCCESS'))
      } catch (error) {
        this.$showToastPop(this.$t('COMMON_MSG_COPY_FAIL'))
      }
    },
    async saveMemo (inSaveMemoObj) {
      console.log('새 메모메모', inSaveMemoObj)
      if (inSaveMemoObj.saveMemoHtml === undefined) return
      this.mLoadingShowYn = true
      var memo = {}
      if (inSaveMemoObj.attachFileList) {
        memo.attachFileList = inSaveMemoObj.attachFileList
      }
      memo.parentMemoKey = null
      if (this.mMememoValue !== undefined && this.mMememoValue !== null) {
        memo.parentMemoKey = this.mMememoValue.parentMemoKey
      }

      memo.bodyFullStr = inSaveMemoObj.saveMemoHtml
      /* memo.bodyFilekey  */
      memo.targetKind = 'C'
      memo.targetKey = this.CONT_DETAIL.contentsKey
      // memo.toUserKey = this.CONT_DETAIL.creUserKey 대댓글때 사용하는것임
      memo.creUserKey = this.GE_USER.userKey
      memo.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      memo.userName = this.$changeText(this.GE_USER.userDispMtext)
      memo.allYn = true
      memo.ownUserKey = this.GE_USER.userkey
      try {
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.saveMemo',
          param: { memo: memo }
        })
        // if (result.data.result === true || result.data.result === 'true') {
        if (result.data && result.data.result) {
          this.$refs.gMemoRef.clearMemo()
          this.mMememoValue = {}
          //   this.getMemoList(true)
          if (
            result.data.resultList &&
              result.data.resultList.memoList.length > 0
          ) {
            var saveMemoObj = {}
            var index
            this.$emit('scrollToMemoTop')
            if (memo.parentMemoKey) {
              // 댓글의 부모키값이 있으면 컨텐츠의 댓글 중 부모의 키값을 찾음
              index = await result.data.resultList.memoList.findIndex(
                (item) => item.memoKey === memo.parentMemoKey
              )
              saveMemoObj = await result.data.resultList.memoList[index]
            } else {
              saveMemoObj = await result.data.resultList.memoList[0]
            }
            saveMemoObj.creTeamKey = this.CONT_DETAIL.creTeamKey
            saveMemoObj.jobkindId = this.CONT_DETAIL.jobkindId
            await this.$store.commit('D_CHANNEL/MU_ADD_MEMO', saveMemoObj)
          }
        }
      } catch (e) {
        console.error('D_contentsDetail 오류')
        console.error(e)
      } finally {
        this.memoShowYn = false
        this.mLoadingShowYn = false
      }
    },
    /** 컨텐츠의 크기를 비교해서 더보기> 버튼 보여주는 함수 */
    async setContentsMoreText () {
      // 컨텐츠가 게시글이면서 권한이 없으면 리턴
      // if (!window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey)) return
      if (!this.$refs['mainContRef' + this.contentsEle.contentsKey]) return
      if (
        this.contentsEle.jobkindId === 'BOAR' &&
          this.$checkUserAuth(this.contentsEle.shareItem).V === false &&
          this.contentsEle.creUserKey !== this.GE_USER.userKey
      ) {
        return
      }
      try {
        if (this.propDetailYn === true) {
          this.alimBigView()
          return
        }

        // var contents = await window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey).offsetHeight
        if (this.$refs['mainContRef' + this.contentsEle.contentsKey]) {
          var contents =
              this.$refs['mainContRef' + this.contentsEle.contentsKey]
                .offsetHeight
        }

        // 이미지를 불러오는 이유는 마운트 시점에 이미지의 크기를 못받오기에 추가함
        var imgList = await window.document.querySelectorAll(
          '#bodyFullStr' + this.contentsEle.contentsKey + ' img'
        )
        if (imgList && imgList.length > 0) {
          for (let i = 0; i < imgList.length; i++) {
            imgList[i].addEventListener('load', (event) => {
              try {
                var imgsHeight = 0
                imgsHeight += imgList[i].clientHeight
                // imgsHeight += event.path[0].clientHeight
                var contentHeight = contents + imgsHeight
                // var bodyMoreText = this.$refs['bodyMoreRef' + this.contentsEle.contentsKey]
                // var bodyMoreText = window.document.getElementById('bodyMore' + this.contentsEle.contentsKey)
                if (contentHeight > 399) {
                  // this.mMoreYn = true
                  this.mContentMoreShowYn = true
                } else {
                  this.mContentMoreShowYn = false
                }
              } catch (error) {
              }
            })
          }
        } else {
          var contentHeight = contents
          // var bodyMoreText = await window.document.getElementById('bodyMore' + this.contentsEle.contentsKey)
          if (contentHeight > 399) {
            // bodyMoreText.style.display = 'block'
            this.mContentMoreShowYn = true
          } else {
            this.mContentMoreShowYn = false
          }
        }
        // })
      } catch (e) {
        console.log(e)
      }
    },
    async contentsSharePop () {
      var link = await this.$makeShareLink(
        this.CONT_DETAIL.contentsKey,
        'contentsDetail',
        this.CONT_DETAIL.bodyFullStr,
        this.CONT_DETAIL.title,
        this.CONT_DETAIL.jobkindId
      )
      var shareItem = {
        title: this.$t('COMMON_NAME_APP'),
        text: this.CONT_DETAIL.title,
        url: link
      }
      if (navigator.share) {
        navigator.share(shareItem)
      } else {
        onMessage('REQ', 'nativeShare', shareItem)
      }
      /*  if (window.navigator.share) {
          window.navigator.share({ title: '더알림', text: this.CONT_DETAIL.title, url: this.CONT_DETAIL.copyTextStr })
        } else {
          this.$showToastPop('지원하지 않는 브라우저입니다.')
        } */
    },
    goChannelMain () {
      var openPopParam = {}
      openPopParam.targetKey = this.CONT_DETAIL.creTeamKey
      openPopParam.targetType = 'chanDetail'
      // targetContentsKey키를 주면 스크롤 이벤트가 작동
      // openPopParam.targetContentsKey = this.CONT_DETAIL.contentsKey
      this.$emit('openPop', openPopParam)
    },
    async goUserProfile (targetUserKey) {
      if (this.GE_USER.unknownYn) {
        this.$showToastPop(this.$t('COMM_MSG_MEMB_NEED'))
        return
      }
      var openPopParam = {}
      if (this.CONT_DETAIL.creTeamKey) {
        openPopParam.targetKey = this.CONT_DETAIL.creTeamKey
        openPopParam.teamKey = this.CONT_DETAIL.creTeamKey
      }
      openPopParam.targetType = 'bookMemberDetail'
      openPopParam.userKey = this.CONT_DETAIL.creUserKey

      // 댓글의 유저를 클릭 시 댓글의 유저키를 넣어준다.
      if (targetUserKey) openPopParam.userKey = targetUserKey
      openPopParam.popHeaderText = this.$t('COMMON_TITLE_PROFILE')
      openPopParam.readOnlyYn = true

      console.log('openPopParam', openPopParam)
      this.$emit('openPop', openPopParam)
    },
    goContentsDetail (moreCheckYn, memoScrollYn) {
      // eslint-disable-next-line no-debugger
      debugger
      if (this.propDetailYn) return
      // 권한이 없는 컨텐츠는 이동하지 못하게 리턴
      if (
        this.contentsEle.jobkindId === 'BOAR' &&
          this.$checkUserAuth(this.contentsEle.shareItem).V === false &&
          this.contentsEle.creUserKey !== this.GE_USER.userKey
      ) {
        return
      }
      // if (window.getSelection() !== null || window.getSelection() !== '') return
      if (moreCheckYn) {
        this.alimBigView()
        return
      }
      if (this.GE_USER.unknownYn) {
        this.pOpenUnknownLoginPop(this.CONT_DETAIL)
        // this.$showToastPop('로그인 후 이용가능합니다.')
        return
      }
      var openPopParam = {}
      openPopParam.targetType = 'contentsDetail'
      openPopParam.targetKey = this.CONT_DETAIL.contentsKey
      openPopParam.teamKey = this.CONT_DETAIL.creTeamKey
      openPopParam.creTeamKey = this.CONT_DETAIL.creTeamKey
      openPopParam.jobkindId = this.CONT_DETAIL.jobkindId
      if (memoScrollYn) openPopParam.memoScrollYn = true

      if (this.CONT_DETAIL.jobkindId === 'ALIM') {
        openPopParam.popHeaderText = this.CONT_DETAIL.nameMtext
      } else if (this.CONT_DETAIL.jobkindId === 'BOAR') {
        openPopParam.popHeaderText = this.CONT_DETAIL.cabinetNameMtext
      }
      if (this.CONT_DETAIL.officialYn) {
        openPopParam.officialYn = this.CONT_DETAIL.officialYn
      }
      openPopParam.value = this.CONT_DETAIL

      this.$emit('openPop', openPopParam)
    },
    async changeAct (act, key) {
      if (this.GE_USER.unknownYn) {
        this.pOpenUnknownLoginPop(this.CONT_DETAIL)
        // this.$showToastPop('로그인 후 이용가능합니다.')
        return
      }
      // eslint-disable-next-line no-unused-vars
      var result = null
      var saveYn = true
      var changeUserDoList = []
      var tempDetail = this.CONT_DETAIL
      if (!tempDetail.D_CONT_USER_DO) {
        tempDetail.D_CONT_USER_DO = [
          { doType: 'ST', doKey: 0 },
          { doType: 'LI', doKey: 0 },
          { doType: 'RE', doKey: false }
        ]
      }
      changeUserDoList = tempDetail.D_CONT_USER_DO
      for (var i = 0; i < changeUserDoList.length; i++) {
        if (changeUserDoList[i].doType === act.doType) {
          if (changeUserDoList[i].doKey === 1) return
        }
      }
      // this.pushDetail = JSON.parse(this.propParams).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = this.CONT_DETAIL.contentsKey
      if (param.targetKey === null) {
        return
      }
      param.doType = act.doType
      param.userName = this.$changeText(this.GE_USER.userDispMtext)
      if (saveYn === false) {
        param.doKey = act.doKey
        result = await this.$saveUserDo(param, 'delete')
        if (act.doType === 'LI') {
          tempDetail.likeCount -= 1
        }
        for (i = 0; i < changeUserDoList.length; i++) {
          if (changeUserDoList[i].doType === act.doType) {
            changeUserDoList[i].doKey = 0
          }
        }
        tempDetail.D_CONT_USER_DO = changeUserDoList
      } else {
        param.actYn = true
        param.targetKind = 'C'
        var this_ = this
        this.$saveUserDo(param, 'save').then((result) => {
          // eslint-disable-next-line no-debugger
          debugger
          for (var d = changeUserDoList.length - 1; d >= 0; d--) {
            if (changeUserDoList[d].doType === act.doType) {
              changeUserDoList[d].doKey = result.doKey
            }
          }
          // temp.push({ doType: act.doType, doKey: result.doKey })
          tempDetail.D_CONT_USER_DO = changeUserDoList
          tempDetail.likeCount = result.likeCount
          if (result.result === true && act.doType === 'LI') {
            tempDetail.subsYn = result.subsYn = 1
          }
          tempDetail.starCount = result.starCount
          this_.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', [
            tempDetail
          ])
        })
        for (var d = changeUserDoList.length - 1; d >= 0; d--) {
          if (changeUserDoList[d].doType === act.doType) {
            changeUserDoList[d].doKey = 1
          }
        }
        if (act.doType === 'LI') {
          tempDetail.likeCount += 1
        }
        if (act.doType === 'ST') {
          tempDetail.starCount += 1
        }
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', [
          tempDetail
        ])
        // }
      }
    },
    async subScribeContents () {
      if (this.GE_USER.unknownYn) {
        this.pOpenUnknownLoginPop(this.CONT_DETAIL)
        // this.$showToastPop('로그인 후 이용가능합니다.')
        return
      }
      // eslint-disable-next-line no-unused-vars
      var result = null
      var subsYn = this.CONT_DETAIL.subsYn
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = this.CONT_DETAIL.contentsKey
      param.targetKind = 'C'
      if (param.targetKey === null) {
        return
      }
      if (subsYn !== null && subsYn !== undefined) {
        param.subsYn = !subsYn
      } else {
        param.subsYn = true
      }
      param.userKey = this.GE_USER.userKey
      // var req = 'save'
      var reqText = this.$t('COMM_MSG_SUCCESS')
      if (!param.subsYn) {
        // req = 'delete'
        reqText = this.$t('COMM_MSG_RELEASED')
      }
      // eslint-disable-next-line no-redeclare
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveSubscribe',
        param: { subscribe: param }
      })
      this.$showToastPop(this.$t('COMM_MSG_NOTIIS') + reqText)
      var contentsDetail = this.CONT_DETAIL
      contentsDetail.subsYn = param.subsYn
      if (contentsDetail.jobkindId === 'TODO') {
        contentsDetail.creTeamKey = 0
      }
      try {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [contentsDetail])
      } catch (error) {
        console.log(error)
      }
    },
    replaceArr (arr) {
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
    },
    openWorkStatePop (data) {
      this.mWorkStateCodePopProps = data
      this.mWorkStateCodePopShowYn = true
    },
    async addImgEvnt () {
      // if (!this.imgClickYn) return
      // (this.CONT_DETAIL)
      var contBody = this.$refs.contentsBoxRef
      if (!contBody) return
      // var fileList = await this.settingFileList()
      this.mClickImgList = contBody.querySelectorAll('img')
      for (let m = 0; m < this.mClickImgList.length; m++) {
        var this_ = this
        this_.mClickImgList[m].addEventListener('click', (event) => {
          if (!this_.mContentMoreShowYn) {
            this_.$emit('openImgPop', [this_.mClickImgList, m])
            event.stopPropagation()
          }
        })
      }
    },
    openImgDetailAlert (img) {
      if (this.imgClickYn === false) return
      // var history = this.$store.getters['D_HISTORY/hStack']
      // this.alertPopId = 'imgDetailAlertPop' + history.length
      // this.alertPopId = this.$setParentsId(this.pPopId, this.alertPopId)
      // history.push(this.alertPopId)
      // this.$store.commit('D_HISTORY/updateStack', history)
      this.mImgDetailAlertShowYn = true
      this.mClickEndYn = false
    },
    longClickAlertClick (btnType) {
      if (btnType === 'download') this.imgDownload()
      else if (btnType === 'share');
      else if (btnType === 'preview') {
        this.mImgDetailAlertShowYn = false
        this.mClickEndYn = false
        this.mPreviewPopShowYn = true
      }
    },
    async imgDownload () {
      try {
        if (this.$getMobileYn()) {
          onMessage('REQ', 'saveCameraRoll', this.mSelectImgObject.path)
        } else {
          // eslint-disable-next-line no-unused-vars
          var result = await this.$downloadFile(
            this.mSelectImgObject.fileKey,
            this.mSelectImgObject.path
          )
        }
        this.$showToastPop(this.$t('COMM_MSG_AFTER_SAVE'))
        this.mImgDetailAlertShowYn = false
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    },
    GE_STICKER_LIST () {
      return this.$store.getters['D_CHANNEL/GE_STICKER_LIST']
    },
    CHANNEL_DETAIL () {
      // eslint-disable-next-line no-debugger
      debugger
      var detail = this.$getDetail('TEAM', this.contentsEle.creTeamKey)
      if (detail && detail.length > 0) {
        // eslint-disable-next-line no-debugger
        debugger
        if (
          !detail[0].D_CHAN_AUTH ||
            detail[0].D_CHAN_AUTH === true ||
            (detail[0].D_CHAN_AUTH.followYn && !detail[0].D_CHAN_AUTH.settingYn)
        ) {
          return this.CHANNEL_DETAIL
        } else {
          return detail[0]
        }
      } else {
        if (this.CHANNEL_DETAIL) {
          return this.CHANNEL_DETAIL
        } else {
          return null
        }
      }
    },
    CONT_DETAIL () {
      if (!this.contentsEle) return
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
        const viewAuth = this.$checkUserAuth(cont[0].shareItem).V
        /* if (cont[0].shareList) {
            const shareList = cont[0].shareList
            const index = shareList.findIndex((item) => (item.accessKind === 'T' || item.accessKind === 'F'))
            if (index !== -1) {
              viewAuth = true
            }
          } */
        cont[0].VIEW_YN = viewAuth
        return cont[0]
      } else {
        var content = this.contentsEle
        const viewAuth = this.$checkUserAuth(this.contentsEle.shareItem).V
        /* if (this.contentsEle.shareList) {
            const shareList = this.contentsEle.shareList
            const index = shareList.findIndex((item) => (item.accessKind === 'T' || item.accessKind === 'F'))
            if (index !== -1) {
              viewAuth = true
            }
          } */
        content.VIEW_YN = viewAuth
        return content
      }
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
      // return this.$store.getters['D_USER/GE_USER']
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
    }
  },
  watch: {
    isFocused: {
      immediate: true,
      handler (value, old) {
        // console.log('isFocused', this.isFocused)
      }
    },
    GE_LOCALE: {
      immediate: true,
      handler (value) {
        this.mActiveTabList = [
          { display: this.$t('COMMON_TAB_FOLLOWING'), name: 'user' },
          { display: this.$t('COMMON_TAB_ALL'), name: 'all' },
          { display: this.$t('COMMON_TAB_MANAGING'), name: 'mychannel' }
        ]
      },
      deep: true
    },
    /* GE_STICKER_LIST: {
      handler (value, old) {
        if (value.length === 0) {
          this.CONT_DETAIL.stickerList = []
          return
        }
        if (this.CONT_DETAIL.stickerList.length > 0) {
          var newArr = []
          var idx
          for (
            var i = 0;
            i < this.CONT_DETAIL.stickerList.length;
            i++
          ) {
            if (this.CONT_DETAIL.stickerList[i].sticker !== null) {
              idx = value.findIndex((item) => (this.CONT_DETAIL.stickerList[i].sticker && item.stickerKey === this.CONT_DETAIL.stickerList[i].sticker.stickerKey))
              if (idx !== -1) {
                this.CONT_DETAIL.stickerList[i].sticker.picBgPath =
                value[idx].picBgPath
                this.CONT_DETAIL.stickerList[i].sticker.nameMtext =
                value[idx].nameMtext
                newArr.push(this.CONT_DETAIL.stickerList[i])
              }
            }
          }
          this.CONT_DETAIL.D_CONT_USER_STICKER_LIST = newArr
        }
      },
      deep: true
    }, */
    CONT_DETAIL: {
      immediate: true,
      deep: true,
      handler (value, index) {
        // console.log('value*******', value)
        this.setMoreMemoBtn()
        /* if (this.CONT_DETAIL.stickerList.length > 0) {
          var newArr = []
          var idx
          for (
            var i = 0;
            i < this.CONT_DETAIL.stickerList.length;
            i++
          ) {
            if (this.CONT_DETAIL.stickerList[i].sticker !== null) {
              idx = this.GE_STICKER_LIST.findIndex((item) => (this.CONT_DETAIL.stickerList[i].sticker && item.stickerKey === this.CONT_DETAIL.stickerList[i].sticker.stickerKey))
              if (idx !== -1) {
                this.CONT_DETAIL.stickerList[i].sticker.picBgPath =
                this.GE_STICKER_LIST[idx].picBgPath
                this.CONT_DETAIL.stickerList[i].sticker.nameMtext =
                this.GE_STICKER_LIST[idx].nameMtext
                newArr.push(this.CONT_DETAIL.stickerList[i])
              }
            }
          }
          this.CONT_DETAIL.D_CONT_USER_STICKER_LIST = newArr
        } */
      }
    },
    GE_NEW_MEMO_LIST: {
      async handler (value, old) {
        console.log('GE_NEW_MEMO_LIST', value)
        var newArr = []
        if (!value || value.length === 0) return
        var content = null
        content = this.CONT_DETAIL
        // if (this.contentsEle && (content === undefined || content === null)) content = this.contentsEle
        if (value[0].targetKey !== content.contentsKey) return
        // this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.CONT_DETAIL])
        var memoAleadyIdx = content.D_MEMO_LIST.findIndex(
          (item) => Number(item.memoKey) === Number(value[0].memoKey)
        )
        if (memoAleadyIdx !== -1) {
          content.D_MEMO_LIST[memoAleadyIdx] = value[0]
          newArr = content.D_MEMO_LIST
        } else {
          newArr = [value[0], ...content.D_MEMO_LIST]
        }
        this.CONT_DETAIL.D_MEMO_LIST = this.replaceArr(newArr)
        // eslint-disable-next-line vue/no-mutating-props
        this.contentsEle.D_MEMO_LIST = this.replaceArr(newArr)
        if (content.jobkindId === 'TODO') {
          content.creTeamKey = 0
        }

        try {
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.CONT_DETAIL])
        } catch (error) {
          console.log(error)
        }
      },
      deep: true
    }
  }
}
</script>

  <style scoped>
  .tagColorBlack{
    color:#222 !important;
  }

  .selectedHistoryTab{
    color:#000 !important;
  }
  .delayedTodo{
    color:red !important;
  }
  .actorImg {
    width:26px;
    height:26px;
    border-radius:50%;
    margin-left:-10px;
    border:2px solid #E7EDFF;
    box-shadow:0 5px 6px 0 rgba(255,255,255, 0.6);
    background-color:#fff;
    overflow:hidden;
  }

    .moreActorImg{
    margin-left:-10px;
    font-weight:bold;
    width:27px;
    height:27px;
    border-radius:50%;
    /* box-shadow:0 5px 6px 0 rgba(60, 60, 60, 0.2); */
    background-color:#E7EDFF !important;
    color:#5F61BD !important;
    z-index:2;
    display:flex;
    align-items:center;
    justify-content:center;
    line-height:1;
    font-size:13px;
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
    z-index:13;
  }
  .actorNameListWrap.wrapOpen{
    display:block !important;;
  }
  .actorNameListWrap:before{
    content:'';
    position: absolute;
    top: -10px;
    right: 10px;
    transform:translateX(-50%);
    border-top:0px solid transparent;
    border-left:8px solid transparent;
    border-right:8px solid transparent;
    border-bottom:16px solid #E7EDFF;
  }
  .actorNameList {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap:0.2rem;
  background-color: #e7edff !important;
  box-shadow: 0 5px 8px 0 rgba(133, 133, 133, 0.102);
  border-radius: 10px;
  padding: 5px 17px;
  color: #7e7e7e;
  width: auto;
  height: auto;
}
  .todoFontSize {
    font-size: 15px;
  }
  .todoTitleFontSize{
    font-size:18px;
  }
  .todoImportantInfoMemo{
    font-size:18px;
    font-weight:normal !important;
  }
  .todoPriority {
  border-radius: 20px;
  font-size: 12px;
  width: auto;
  padding: 0px 9px;
}
.todoPriorityHigh {
  border:1px solid #FF0000;
  color:#FF0000;
}
.todoPriorityMiddle {
  border:1px solid #0066FF;
  color:#0066FF;
}
.todoPriorityLow {
  border:1px solid #FFA800;
  color:#FFA800;
}
.todoPriorityLowMore {
  background-color: rgb(250, 251, 254);
  color: #000 !important;
}
  .todoTag{
    color: white;
    height:19px;
    line-height:19px;
    padding: 0px 8px;
    border-radius: 5px;
    font-size: 12px;
    width: auto;
    display:inline-block;
    vertical-align:middle;
    margin-top:-0.1rem;
    border-radius:19px;
  }
  .completedTodoText{
    font-size:15px;
  }
  .todoFlex {
    display: flex;
    flex-direction: column;
    align-items: end;
    text-align: right;
  }

  .profileImg {
    width: 26px;
    height: 26px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display:inline-block;
    border-radius:50%;
    border:2px solid #E7EDFF;
  }
  .contentsCard {
    background: #ffffff;
    border-bottom: 2px solid #e1e1e1;
    display: flex;
    flex-direction: column;
  }
  .todoOtherInfosAsignee{
    width:25%;
    display:flex;
    justify-content:end;
    align-items:center;
  }
  .contentsCardLogoArea {
    width: 45px;
    height: 45px;
    overflow: hidden;
    float: left;
    border-radius: 100%;
    border: 2px solid #5b1cfc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .overHidden {
    overflow: hidden;
  }
  .showHistoryBtn{
    height:auto;
    /* background-color:gray; */
    /* color:#fff; */
    font-weight:bold;
    border-radius:5px;
    padding:1px 10px;
    margin-left:0.3rem;
    border-radius:10px;
    text-align:center;
    font-size:14px;
  }
  .historyEachBtn{
    position:absolute;
    bottom:-90px;
    right:-110px;
    width:100px;
    height:auto;
    border:1px solid #b9b9b9;
    border-radius:20px;
    background-color:#fff;
    z-index:2;
    box-shadow:0 10px 8px 0 #3c3c3c1a;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    color:#636363;
  }
  .historyEachBtn > span{
    width:100%;
    padding:7px 0;
  }
  .historyEachBtn > span.selectedTab{
    font-weight:bold !important;
  }

  @media screen and (max-width:650px){
    .todoTitleFontSize{
    font-size:19px !important;
    }
    .todoImportantInfoMemo{
    font-size:14px;
  }
  }

  @media screen and (max-width:500px){
    .actorImg{
      width:25px !important;
      height:25px !important;
    }
    .moreActorImg{
      width:23px !important;
      height:23px !important;
      font-size:11px !important;
    }
    .profileImg{
      width:25px !important;
      height:25px !important;
    }
    .todoFontSize {
      font-size: 13px;
    }
    .showHistoryBtn{
      font-size:12px !important;
    }
    .font15{
      font-size:12px !important;
    }
    .headerInfoWrap{
      flex-direction:column !important;
      align-items:self-end !important;
    }
    .statCodeCompo{
      float:right;
    }
  }
  @media screen and (max-width:360px){
    .todoOtherInfosAsignee{
      text-align:right;
    }
  }
  pre div[id='formEditText'] {
    border-top: 1px solid #ccc;
  }
  </style>

  <style>
  .mainConts .formText{ padding: 15px 25px 20px 25px !important; text-align: left !important;}
  .todoConts .formText{ padding: 10px 25px 10px 25px !important; text-align: left !important;}

  .mainConts img {padding: 0!important}

  .contentsCardBodyArea .formLine,
  .contentsCardBodyArea .formDot {
    padding: 0 10px !important;
  }
  </style>
