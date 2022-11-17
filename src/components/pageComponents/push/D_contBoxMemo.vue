<template>
    <div style="width: 100%; min-height: 20px; display: flex; margin-bottom: 5px; ">
        <div style="width: 90px; margin-right: 10px; height: 100%;">
            <p class="commonBlack textLeft font14 fontBold">{{this.$changeText(propMemoEle.userNameMtext)}}</p>
        </div>
        <div style="width: calc(100% - 100px); min-height: 20px;">
            <p class="commonBlack textLeft font14">{{this.$decodeHTML(propMemoEle.bodyFullStr)}}</p>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    propMemoEle: {}
  }
}
</script>

<style scoped>

</style>
