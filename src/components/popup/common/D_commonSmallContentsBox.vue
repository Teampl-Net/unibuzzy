<template>
  <div style="width: 100%;">
    <div style="padding: 5px 10px; width: 100%; height: 50px; border-radius: 8px; display: flex; align-items: center; margin-top: 5px; box-shadow: 0 0 4px 4px #00000010;">
          <div :style="'background-image: url(' + (contentsEle.domainPath ? contentsEle.domainPath + contentsEle.logoPathMtext : contentsEle.logoPathMtext) + ');'" style="border: 0.5px solid rgba(0, 0, 0, 0.2); width: 35px; height:  35px; border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;">
          </div>
          <div class="mleft-1" style="width: calc(100% - 50px);">
            <div style="display: flex; justify-content: space-between;">
              <p class=" textLeft textOverdot commonBlack fontBold font14" style="max-width: calc(100% - 70px);">
                <img v-if="contentsEle.jobkindId === 'ALIM'" src="../../../assets/images/common/icon_alim.svg" style="width: 20px; float: left; margin-right: 5px;" alt="">
                <img v-else-if="contentsEle.jobkindId === 'BOAR' && accessKind !== 'R'" src="../../../assets/images/common/icon_board_color.svg" style="width: 20px; float: left; margin-right: 5px;" alt="">
                <img v-else-if="accessKind === 'R'" src="../../../assets/images/common/icon_memo_filter.svg" style="width: 20px; float: left; margin-right: 5px;" alt="">
                {{contentsEle.title}}
              </p>
              <p class="font12 mleft-1" style="max-width: 70px;">{{ this.$changeDateFormat(contentsEle.creDate) }}</p>
            </div>
            <div class="textLeft" style="width: calc(100% - 25px); display: flex">
              <p class="textOverdot fontBold font12" style="max-width: 50%;">{{ $changeText(contentsEle.nameMtext) + '(' + contentsEle.creUserName + ')'}}</p>
              <p v-if="contentsEle.jobkindId==='BOAR'" class="textOverdot textLeft ml-04 font12" style="max-width: calc(50% - 4px)"> - {{ $changeText(contentsEle.cabinetNameMtext) }} </p>
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
