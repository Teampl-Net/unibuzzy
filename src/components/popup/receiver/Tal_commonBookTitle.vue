<template>
    <div class="headerShadow" style="border-bottom: 1px solid #ccc; padding: 5px 0; height:40px; margin-top:10px; overflow: hidden; " >
            <p class="fl mright-05 font18 h100P fontBold colorBlack">{{titleText}}</p>
            <!-- <div class="mleft-01 fl" style="height: 100%; ">
                <img class="fl" style="margin-top: 4px; width: 15px;" src="../../../assets/images/main/main_subscriber.png" />
                <p class="fl font14" style="margin-top: 2px;">{{teamLength}}</p>
            </div> -->
            <!-- <gBtnSmall btnThema="light" btnTitle="추가" class="mright-05"  @click="!detailOpenYn? this.$refs.teamListRef.newAddTeam() : this.$refs.memberListRef.newAddMember()" v-if='teamEditYn || memberEditYn' /> -->
        </div>
</template>

<script>
export default {
  props: {
    titleText: {},
    btnTitle: {},
    selectPopYn: {}
  }
}
</script>

<style scoped>

</style>
