<template>
<div style="position: absolute; width: 100%; height: 100vh; background: #00000026; left: 0; z-index: 9999; top: 0;"></div>
    <div class="testProgress" style="width: 80%; overflow: hidden auto; max-width: 500px; height: 300px; position: absolute; top: 25%; left: 10%; z-index: 99999; background:#FFF; border-radius: 15px; box-shadow: 9px 9px 9px -9px #ccc; padding: 10px 20px;">
        <p class="font18 fontBold commonBlack textLeft">파일 업로드중 ...</p>
        <!-- <div style=" margin-top: 10px; position: relative;">
            <p class="textLeft commonBlack font16">{{'1. zzzzz'}} <small class="font13">{{'(' + this.$byteConvert(12105) + ')'}}</small></p>
            <b-progress variant="success" :max="100" height="1rem">
                <b-progress-bar variant="success" :value="30 || 0">
                <span style="position: absolute; left: 45%;" :class="Number(30) < 50 ? 'commonBlack' : 'whiteColor'"><strong>{{ Number(30) < 100 ? 30 + '%' : 'success!'}}</strong></span>
                </b-progress-bar>
            </b-progress>
        </div> -->
        <div v-for="(value, index) in uploadFileList"  style="margin-top: 10px; position: relative;" :key="index">
            <p class="textLeft commonBlack font16">{{ (index + 1) +'. ' + value[0].file.name || '파일'}} <small class="font13">{{'(' + this.$byteConvert(value[0].file.size) + ')'}}</small></p>
            <b-progress :max="100" height="1rem">
                <b-progress-bar  :value="value.percentage || 0">
                <!-- eslint-disable-next-line vue/no-parsing-error -->
                <span style="position: absolute; left: 40%" :class="Number(value.percentage) < 50 ? 'commonBlack' : 'whiteColor'"><strong>{{ Number(value.percentage) < 100 ? value.percentage + '%' : 'success!'}}</strong></span>
                </b-progress-bar>
            </b-progress>
        <!-- <ProgressBar bar_color="#dc720f" :val="value.percentage" :text="value.percentage + '%'"></ProgressBar> -->
        </div>
  </div>
</template>

<script>
export default {
  props: {
    uploadFileList: {}
  }
}
</script>
<style scoped>
.progress-bar {
    #879dc9!important;
}
</style>
