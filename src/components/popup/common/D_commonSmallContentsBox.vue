<template>
  <div style="width: 100%;">
    <div class="textLeft font12 fontBold ml-04">관련 컨텐츠</div>
    <div style="padding: 5px; width: 100%; height: 50px; border-radius: 8px; display: flex; align-items: center; border: 1px solid #CCC;">
          <div class="commonLightBGColor" style="width: 30px; height: 30px; border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;"></div>
          <div class="mleft-1" style="width: calc(100% - 50px);">
            <div style="display: flex; justify-content: space-between;">
              <p class=" textLeft textOverdot commonBlack fontBold font14" style="max-width: calc(100% - 70px);">
                <img v-if="contentsEle.jobkindId === 'ALIM'" src="../../assets/images/push/contTitle_alim.svg" style="width: 20px; float: left; margin-right: 5px;" alt="">
                <img v-else-if="contentsEle.jobkindId === 'BOAR'" src="../../assets/images/push/contTitle_board.svg" style="width: 20px; float: left; margin-right: 5px;" alt="">
                {{contentsEle.title}}
              </p>
              <p class="font12 mleft-1" style="max-width: 70px;">{{ this.$changeDateFormat(contentsEle.creDate) }}</p>
            </div>
            <div class="textLeft" style="margin-left: 25px; width: calc(100% - 25px); display: flex">
              <p class="textOverdot font12" style="max-width: 50%;">{{ $changeText(contentsEle.nameMtext) }}</p>
              <p v-if="contentsEle.jobkindId==='BOAR'" class="textOverdot textLeft ml-04 font12" style="max-width: calc(50% - 4px)">({{ $changeText(contentsEle.cabinetNameMtext) }})</p>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['contentsEle'],
  methods: {
  }
}
</script>
