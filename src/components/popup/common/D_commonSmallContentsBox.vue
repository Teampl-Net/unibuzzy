<template>
  <div class="w100P">
    <div class="smallContBoxWrap">
          <div class="smallContBoxIcon" :style="'background-image: url(' + (contentsEle.domainPath ? contentsEle.domainPath + contentsEle.logoPathMtext : contentsEle.logoPathMtext) + ');'"></div>
          <div class="mleft-1 smallContBoxInfoWrap">
            <div class="smallContBoxInfoBox">
              <p class=" textLeft textOverdot commonBlack fontBold font14 smallContBoxInfoTitle">
                <img v-if="contentsEle.jobkindId === 'ALIM'" src="../../../assets/images/common/icon_alim.svg" alt="">
                <img v-else-if="contentsEle.jobkindId === 'BOAR' && accessKind !== 'R'" src="../../../assets/images/common/icon_board_color.svg" alt="">
                <img v-else-if="accessKind === 'R'" src="../../../assets/images/common/icon_memo_filter.svg" alt="">
                {{contentsEle.title}}
              </p>
              <p class="font12 mleft-1 smallContBoxCreDate">{{ this.$changeDateFormat(contentsEle.creDate) }}</p>
            </div>
            <div class="textLeft smallContBoxUserInfo">
              <p class="textOverdot fontBold font12 smallContBoxUserName">{{ $changeText(contentsEle.nameMtext) + '(' + contentsEle.creUserName + ')'}}</p>
              <p v-if="contentsEle.jobkindId==='BOAR'" class="textOverdot textLeft ml-04 font12 smallContBoxCabinet"> - {{ $changeText(contentsEle.cabinetNameMtext) }} </p>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['contentsEle', 'accessKind'],
  methods: {
  }
}
</script>

<style scoped>
.smallContBoxWrap {
  padding: 5px 10px;
  width: 100%;
  min-height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-top: 5px;
  box-shadow: 0 0 4px 4px #00000010;
}
.smallContBoxIcon {
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.smallContBoxInfoWrap {
  width: calc(100% - 50px);
}
.smallContBoxInfoTitle {
  max-width: calc(100% - 70px);
}
.smallContBoxInfoTitle > img {
  width: 20px;
  float: left;
  margin-right: 5px;
}
.smallContBoxCreDate {
  max-width: 70px;
}
.smallContBoxUserInfo {
  width: calc(100% - 25px);
  display: flex;
}
.smallContBoxUserName {
  max-width: 50%;
}
.smallContBoxCabinet {
  max-width: calc(50% - 4px);
}
.smallContBoxInfoBox {
  display: flex;
  justify-content: space-between;
}
</style>
