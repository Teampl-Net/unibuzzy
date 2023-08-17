<i18n>
  {
    "ko": {
      "SEAR_TAB_ACT_CAHNNEL": "최근활동"
    },
    "en": {
      "SEAR_TAB_ACT_CAHNNEL": "Recent"
    }
  }
  </i18n>
  <template>
  <div class="w100P pSide-1" :style="
        $appType === 'UB'
            ? 'background-color: rgba(255, 255, 255 ,0.5); border-radius: 10px;'
            : ''
        "
        style="min-height: 80px;
            border-bottom: 1px solid #cccccc70;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 15px;
            padding-bottom: 15px;
            margin-top:5px;
        "
  >
    <div
        class="w100P "
        style="
        position: relative;
        min-height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
        "
        @click="goChannelMain(chanElement)"
    >
        <div
        v-if="$appType === 'UB' && pSelectedYn === true"
        class="font11"
        style="
            background-color: #fff;
            position: absolute;
            top: -10px;
            left: 10px;
            border: 2px solid #7978bd;
            border-radius: 10px;
            padding: 0 5px;
        "
        >
        Now
        </div>
        <div
        v-if="chanElement"
        style="
            background-color: white;
            position: relative;
            border: 0.5px solid rgba(0, 0, 0, 0.1);
            width: 60px;
            height: 60px;
            float: left;
            border-radius: 100%;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        "
        :style="
            'background-image: url(' +
            (chanElement.logoDomainPath !== undefind
            ? chanElement.logoDomainPath + chanElement.logoPathMtext
            : chanElement.logoPathMtext) +
            ');'
        "
        >
        <div
            v-if="chanElement.ownerYn || chanElement.managerKey"
            class="CWhiteBgColor"
            style="
            position: absolute;
            right: 0;
            display: flex;
            justify-content: center;
            algin-items: center;
            padding: 2px;
            bottom: 0;
            width: 20px;
            height: 20px;
            border-radius: 100%;
            "
        >
            <img
            src="../../assets/images/channel/ownerChannel_crown.svg"
            style="width: 90%; float: left"
            v-if="chanElement.ownerYn"
            alt=""
            />
            <img
            src="../../assets/images/common/icon_setting_gear.svg"
            style="width: 90%; float: left"
            v-else
            alt=""
            />
        </div>
        </div>
        <div class="fl mleft-1" style="width: calc(100% - 65px - 1rem)">
        <div class="w100P fl font16 fontBold textLeft grayBlack">
            <img
            class="fl img-w14 mtop-02 mright-02"
            v-if="chanElement.officialYn"
            src="../../assets/images/main/main_officialMark.svg"
            alt=""
            />
            <!-- {{$route.path === "/" ? $changeText(chanElement.nameMtext) + " Channel " : `${$changeText(chanElement.bdAreaNameMtext)} > ${$changeText(chanElement.nameMtext )}`}} -->
            {{$route.path === "/" ? $changeText(chanElement.nameMtext) + " Channel " : `${$changeText(chanElement.nameMtext )}`}}
            <p class="fr font13 lightGray" style="font-weight: normal">
            {{
                $t("SEAR_TAB_ACT_CAHNNEL") +
                " " +
                $changeDateFormat(
                chanElement.updDate !== undefind
                    ? chanElement.updDate
                    : chanElement.teamUpdDate
                )
            }}
            </p>
        </div>
        <p v-if="$route.path === '/'" class="w100P fl font14 textLeft grayBlack">
            {{
            $changeText(chanElement.memoMtext)
                ? $changeText(chanElement.memoMtext)
                : "channel description"
            }}
        </p>
        <p
            v-if="$route.path === '/search'"
            class="w100P fl font14 textLeft grayBlack"
        >
            {{
            $changeText(chanElement.memoMtext)
                ? $changeText(chanElement.memoMtext)
                : ""
            }}
        </p>
        <div class="w100P fl font14 textLeft lightGray">
            <p class="fl font14">{{ $changeText(chanElement.bdAreaNameMtext) }}</p>
            <img
            src="../../assets/images/editChan/icon_user_Gray.svg"
            class="img-w15 mright-01 fl mleft-03 mtop-01"
            alt=""
            />
            <p class="fl font14" style="margin-top: 1px">
            {{
                chanElement.followerCount !== undefind
                ? chanElement.followerCount
                : chanElement.fCount
            }}
            </p>
            <div v-if="$route.path === '/chanList'" class="fr">
              <p class="fontBold" style="border-radius:5px; padding:5px 10px; background-color:#fff; color:#062BB5;"> + Follow </p>
              <p class="fontBold" style="border-radius:5px; padding:5px 10px; background-color:#062BB5; color:#fff;"> + Follow </p>
            </div>
        </div>
      </div>
    </div>
    <div
        v-if="
        $route.path === '/' &&
        chanElement.popCList &&
        chanElement.popCList.length > 0
        "
        class="w100P fl"
        style="hight: 50px; display: flex; flex-direction: column; padding: 10px;"
    >
        <p class="font15 fontBold textLeft">ㆍPopular Post</p>
        <div style="width: 100%; min-height: 40px; border-radius: 5px; padding: 5px; background: #FFFFFF98;">
            <p class="font12 fl commonColor fontBold textLeft">{{ `${$changeText(chanElement.popCList[0].cabinetNameMtext)} Board > ${chanElement.popCList[0].showCreNameYn? $changeText(chanElement.popCList[0].creUserName) : 'Anonymous'}` }}</p>
            <p class="font12 fr lightGray textLeft">{{ `${$changeDateFormat(chanElement.popCList[0].creDate)}` }}</p>
            <div class="fl" style="width: 100%; min-height: 40px; margin-left: 3px; margin-bottom: 5px; margin-top: 5px; padding-left: 5px; border-left: 2px solid #CCC;">
                <p class="fl font14 textLeft fontBold" style="">{{ chanElement.popCList[0].title }}</p>
                <pre class="fl font14 textLeft textOverdot" style="width: calc(100% - 10px); word-break: break-all;" v-html="$setBodyLength(chanElement.popCList[0].bodyFullStr, chanElement.popCList[0].jobkindId === 'BOAR' && chanElement.popCList[0].workStatYn && CONT_DETAIL.workStatCodeKey === 46)"></pre>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    chanElement: {},
    pSelectedYn: Boolean
  },
  created () {
    console.log('chanElement', this.chanElement)
  },
  methods: {
    goChannelMain (chanElement) {
      var openPopParam = {}
      openPopParam.targetKey = chanElement.teamKey
      if (!openPopParam.targetKey) {
        openPopParam.targetKey = chanElement.targetKey
      }
      openPopParam.targetType = 'chanDetail'
      this.$emit('openPop', openPopParam)
    }
  }
}
</script>

  <style>
.chanLogoImgWrap {
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  position: relative;
  flex-shrink: 0;
}
</style>
