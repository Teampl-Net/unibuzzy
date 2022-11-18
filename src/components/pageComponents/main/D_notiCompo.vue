<template>
    <div @click="this.$emit('clickNoti', mNotiEle)" v-if="mNotiEle.title" style="width: 100%; min-height: 50px; float: left; padding: 10px 0;  margin-bottom: 5px; border-bottom: 1px solid #ccc;  display: flex;">
        <div style="width: 45px; height: 45px; margin-right: 10px; border-radius: 100%; overflow: hidden;" >
            <img v-if="mNotiEle.largeIcon" :src="mNotiEle.largeIcon" style="width: 100%; float: left;  height: 100%;" alt="">
        </div>
        <div style="width: calc(100% - 55px);">
            <p class="font14 commonBlack fontBold textLeft">{{mNotiEle.title}}</p>
            <p class="font14 commonBlack textLeft">{{mNotiEle.body}}</p>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    mNotiEle: {}
  }
}
</script>

<style scoped>

</style>
