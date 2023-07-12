<template>
  <div class="receiverTeamListCard" style="background: #fff; width: 70%; height: 60%; position: absolute; left: 15%; top: 20%; z-index: 9999; padding: 10px 20px 20px; border-radius: 20px;">
    <div class="headerShadow font20 fontBold" style="height: 40px; color: #6768a7; position: relative;">
      Follower List
      <img @click="pClosePop" style="width: 20px; position: absolute; top: 5px; right: 0;" class="cursorP" src="@/assets/images/common/popup_close.png">
    </div>
    <div style="height: calc(100% - 40px); overflow: auto;">
      <userItem @click="openProfilePop(user)" style="margin-top: 10px;" :style="index !== pManagerList.length - 1? 'border-bottom: 1px solid #999;':''" v-for="(user, index) in pManagerList" :key="user.userKey" :pUserData="user" />
    </div>
  </div>
</template>

<script>
import userItem from '../unit/UB_commonUserItem.vue'
export default {
  components: {
    userItem
  },
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
</style>
