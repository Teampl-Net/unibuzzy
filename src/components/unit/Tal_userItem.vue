<template>
    <div style="width: 100%; height: 4rem;">
        <div style="text-align: left; width: 100%; height: 40%;">
            <img v-if="this.uItem === '휴대폰 번호'" style="width: 1.2rem;" class="mr-04 mbottom-01" src="../../assets/images/main/main_email.png"/>
            <img v-if="this.uItem === '이메일'" style="width: 1.2rem;" class="mr-04 mbottom-01" src="../../assets/images/main/main_phone.png"/>
            <span class="fontBold commonColor">{{uItem}}</span>
        </div>
        <div class="" style="height: 40%;" >
            <span v-if="this.uItem === '이메일'" class="fl">{{getUserInform.userEmail}}</span>
            <span v-else-if="this.uItem === '휴대폰 번호'" class="fl">{{getUserInform.phoneLast}}</span>
            <!-- <gBtnSmall style="float: right;" btnTitle="변경" v-on:click="openChangePop(uItem)" /> -->
        </div>
    </div>
</template>

<script>
export default {
  emits: ['openPop'],
  data () {
    return {
    //   uItem: [
    //     { icon: '', title: '이메일', value: '', btnText: '', link: '' }
    //   ]
    }
  },
  methods: {
    openChangePop (target) {
      this.$emit('openPop', target)
    }
  },
  computed: {
    getUserInform () {
      var userInfo = this.$getUserInform()
      if (userInfo.userEmail); else userInfo.userEmail = '등록된 이메일이 없습니다.'
      userInfo.phoneLast = null
      if (userInfo.phoneLast) {
        userInfo.phoneLast = '010-****-' + userInfo.phoneLast
      } else {
        userInfo.phoneLast = '등록된 번호 없음'
      }
      return userInfo
    }
  },
  props: {
    uItem: {}
  }
}
</script>

<style scoped>
</style>
