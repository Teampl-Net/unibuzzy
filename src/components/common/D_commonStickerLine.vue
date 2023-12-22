<template>
    <div v-if="pSticker" style="flex-shrink: 0;" :class="pSmallYn === true? 'thinHeight' : 'normalHeight'" >
        <!-- <p class="fontBold textRight" :class="pSmallYn === true? 'font14' : 'font16'" style="position: absolute; top: 0; right: 10px; z-index:2;">{{this.$changeText(pSticker.nameMtext)}}</p> -->
        <div v-if="pSmallYn === true" :style="this.pContrastColorYn ? 'color: #fff !important; background:' + pSticker.picBgPath + ';' : 'color: ' + pSticker.picBgPath + '; background: #fff;' + 'border: 2px solid ' + pSticker.picBgPath + '; color: ' + pSticker.picBgPath " :class="pSelecteModeYn? 'selModePadding': ''" class="normalLineStyle cursorP font12 fontBold">
            {{this.$changeText(pSticker.nameMtext)}}
            <span  v-if="pSelecteModeYn" style="cursor: pointer; width: 10px; position: absolute; right: 5px;"  :style="'color: ' + pSticker.picBgPath" class="font16 fontBold">x</span>
            <!-- <img v-if="pSelecteModeYn" src="../../assets/images/common/grayXIcon.svg" style="cursor: pointer; width: 10px; position: absolute; right: 5px;" alt=""> -->
        </div>
        <div v-else class="thinLineStyle cursorP font14 fontBold" :class="pSelecteModeYn? 'selModePadding': ''" :style="pSelectedYn || pContrastColorYn ? 'background: ' + pSticker.picBgPath + '; color: #fff; padding: 0 12px;' : 'border: 2px solid ' + pSticker.picBgPath + '; color: ' + pSticker.picBgPath ">
            {{this.$changeText(pSticker.nameMtext)}}
            <span  v-if="pSelecteModeYn" style="cursor: pointer; width: 10px; position: absolute; right: 5px;"  :style="'color: ' + pSticker.picBgPath" class="font16 fontBold">x</span>
            <!-- <img v-if="pSelecteModeYn" src="../../assets/images/common/grayXIcon.svg" style="cursor: pointer; width: 10px; position: absolute; right: 5px;" alt=""> -->
        </div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    pContrastColorYn: {},
    pSticker: {},
    pSmallYn: {},
    pSelectedYn: {},
    pSelecteModeYn: {}
    // pTextShowYn: {}
  },
    created() {
    }
}
</script>

<style scoped>
.normalLineStyle {
    float: left; min-width: 30px; height: 20px; padding: 0 8px; display: flex; align-items: center; text-align: center; border-radius: 30px;
    position: relative;
}
.selModePadding {
    padding-right: 25px!important;
}
.thinLineStyle {
    float: left; min-width: 30px; height: 25px; padding: 0 10px; display: flex; align-items: center; text-align: center; border-radius: 5px;
    position: relative;
    border-radius:25px;
}
.normalHeight {
    min-height: 20px;
    margin-bottom: 5px;
}
.thinHeight {
    min-height: 20px;
    margin-bottom: 5px;
}
</style>
