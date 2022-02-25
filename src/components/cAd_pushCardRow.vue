<template>
    <div ref="contentesHeight" @click="openPushDetail(pushKey)" style="display: flex; flex-direction: column; cursor: pointer; width: 100%; border-radius: 5px; padding: 1rem; box-shadow: rgb(21 34 50 / 6%) 0px 0px 4px 4px; text-align: left; margin-bottom: 1rem;">
      <p style="color:#000000; font-size: 14px; font-weight: bold; min-height: 1.5rem; margin-bottom: 1rem;">{{pushTitle}}</p>
      <div class="subDetail fl" style="position: relative;" v-if="sendListPageYn === true">
        <span class="mright-05">{{sendGroup}}</span><span class="mright-05" style="line-height: 16px;">|</span><span>보낸일시 {{sendDate}}</span>
        <div class="readDatePop" @click="openReadPop">수신확인</div>
      </div>
      <div class="subDetail fl" style="position: relative;" v-else>
        <span class="font12Im">{{pushBody}}</span>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      pushList: [
      ]
    }
  },
  methods: {
    openReadPop () {
      this.$emit('openPop', 'readPop')
    },
    openPushDetail (pushKey) {
      this.$emit('openPushDetail', pushKey)
    }
  },
  props: {
    pushTitle: {},
    sendDate: {},
    recvDate: {},
    pushKey: {},
    sendGroup: {},
    pushBody: {},
    sendListPageYn: Boolean
  }
}
</script>
<style scoped>
.subDetail{min-height: 1.5rem; display: flex;}
.subDetail span{font-size: 14px;}
.font12Im{font-size: 12px!important;}
.readDatePop{background-color: #EFEFF6; position: absolute; right: 0; min-width: 80px; height: 1.5rem; border-radius: 3px; min-height: 25px; cursor: pointer; line-height: 25px; padding: 0 0.7rem; color: #000000; font-size: 14px;}

</style>
