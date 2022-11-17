<template>
    <div v-if="!childShowYn" style="width: 100%; min-height: 20px; display: flex; margin-bottom: 5px; ">
        <div style="width: 90px; margin-right: 10px; height: 100%;" @click="emit({ 'targetType': 'goUserProfile', 'value': propMemoEle })">
            <p class="commonBlack textLeft font14 fontBold">{{this.$changeText(propMemoEle.userNameMtext)}}</p>
        </div>
        <div style="width: calc(100% - 100px); min-height: 20px;" @click="emit({ 'targetType': 'goContentsDetail', 'value': propMemoEle })">
            <p class="commonBlack textLeft font14">{{this.$decodeHTML(propMemoEle.bodyFullStr)}}</p>
        </div>
    </div>
    <div v-else style="width: 100%; float: left; height: 100%; margin-bottom: 20px; border-bottom: 1px solid #cccccc50;">
        <div style="width: 100%; min-height: 20px; display: flex; margin-bottom: 5px;float: left; position: relative;">
            <img src="../../../assets/images/push/contents_moreBtnIcon.svg" style="position: absolute; right: 5px; top: 0;" alt="">
            <div style="width: 40px; display: flex; justify-content: center; align-items: center; border: 2px solid #5B1CFC; border-radius: 100%; padding: 2px; margin-right: 10px; height: 40px;">
                <div :style="'background-image: url(' + propMemoEle.domainPath + propMemoEle.userProfileImg + ');'" style="height: 36px; width: 36px; border-radius: 100%;  background-repeat: no-repeat; background-position: center; background-size: cover;"></div>
            </div>
            <div style="width: calc(100% - 40px); min-height: 40px; display: flex; flex-direction: column;">
                <div style="width: 100%; margin-right: 10px; min-height: 20px; margin-top: 5px;">
                    <p class="commonBlack "><pp class="fl commonBlack mright-05 textLeft font14 fontBold">{{this.$changeText(propMemoEle.userNameMtext)}}</pp><pp class="fl commonGray font12"  style="font-weight:normal;">{{this.$changeDateFormat(propMemoEle.creDate)}}</pp></p>
                </div>
                <div style="min-height: 20px; width: 100%; min-height: 20px;">
                    <p class="commonBlack textLeft font14">{{this.$decodeHTML(propMemoEle.bodyFullStr)}}</p>
                </div>
                <div style="min-height: 20px; margin-top: 10px;  width: 100%; padding-right: 10px; min-height: 20px;">
                    <p class="commonGray textLeft font12 fl">답글달기</p>
                    <p class="commonGray textLeft font12 fr">삭제</p>
                    <p class="commonGray textLeft font12 fr mright-1">수정</p>
                </div>
            </div>
        </div>
        <div style="width: 100%; float: left; padding-left: 40px; min-height: 20px;">
            <div v-for="(cmemo, cIndex) in propMemoEle.cmemoList" :key="cIndex" style="width: 100%; min-height: 20px; display: flex; margin-bottom: 5px;float: left; position: relative;">
                <img src="../../../assets/images/push/contents_moreBtnIcon.svg" style="position: absolute; right: 5px; top: 0;" alt="">
                <div style="width: 40px; display: flex; justify-content: center; align-items: center; border: 2px solid #5B1CFC; border-radius: 100%; padding: 2px; margin-right: 10px; height: 40px;">
                    <div :style="'background-image: url(' + cmemo.domainPath + cmemo.userProfileImg + ');'" style="height: 36px; width: 36px; border-radius: 100%;  background-repeat: no-repeat; background-position: center; background-size: cover;"></div>
                </div>
                <div style="width: calc(100% - 40px); min-height: 40px; display: flex; flex-direction: column;">
                    <div style="width: 100%; margin-right: 10px; min-height: 20px;">
                        <p class="commonBlack "><pp class="fl commonBlack mright-05 textLeft font14 fontBold">{{this.$changeText(cmemo.userNameMtext)}}</pp><pp class="fl commonGray font12"  style="font-weight:normal; line-height: 22px;">{{this.$changeDateFormat(cmemo.creDate)}}</pp></p>
                    </div>
                    <div style="min-height: 20px; width: 100%; min-height: 20px; margin-top: 5px;">
                        <p class="commonBlack textLeft font14" v-html="this.$decodeHTML(cmemo.bodyFullStr)"></p>
                    </div>
                    <div style="min-height: 20px; width: 100%; margin-top: 5px; padding-right: 10px; min-height: 20px;">
                        <p class="commonGray textLeft font12 fl">답글달기</p>
                        <p class="commonGray textLeft font12 fr">삭제</p>
                        <p class="commonGray textLeft font12 fr mright-1">수정</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    propMemoEle: {},
    diplayCount: {},
    childShowYn: {}
  },
  created () {
    console.log(this.childShowYn)
  },
  methods: {
    emit (emitData) {
      this.$emit('memoEmitFunc', emitData)
    }
  }
}
</script>

<style scoped>

</style>
