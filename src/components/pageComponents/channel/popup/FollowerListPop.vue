<template>
  <div class="receiverTeamListCard">
    <div class="headerShadow font20 fontBold followerPopHeader">
      Follower List
      <img @click="pClosePop" class="cursorP closeIcon" src="@/assets/images/common/popup_close.png">
    </div>
    <div class="followerListWrap">
      <gUserItem class="mTop10" @click="openProfilePop(user)" :style="index !== pManagerList.length - 1? 'border-bottom: 1px solid #999;':''" v-for="(user, index) in pManagerList" :key="user.userKey" :pUserData="user" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pManagerList: Array,
    pClosePop: Function,
    pOpenProfilePop: Function
  },
  methods: {
    openProfilePop (user) {
      this.pOpenProfilePop(user)
    }
  }
}
</script>

<style scoped>
.receiverTeamListCard {
  background: #fff;
  width: 70%;
  height: 60%;
  position: absolute;
  left: 15%;
  top: 20%;
  z-index: 9999;
  padding: 10px 20px 20px;
  border-radius: 20px;
}
.followerPopHeader {
  height: 40px;
  color: #6768a7;
  position: relative;
}
.closeIcon {
  width: 20px;
  position: absolute;
  top: 5px;
  right: 0;
}
.followerListWrap {
  height: calc(100% - 40px);
  overflow: auto;
}
</style>
