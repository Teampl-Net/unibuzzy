<template>
    <div style="width: 100%; height: 4rem;">
        <div style="text-align: left; width: 100%; height: 40%;">
            <img v-if="this.uItem === '휴대폰 번호'" style="width: 1rem;" class="mr-04 mbottom-01" src="../../assets/images/main/main_phone.png"/>
            <img v-if="this.uItem === '이메일'" style="width: 1.2rem;" class="mr-04 mbottom-01" src="../../assets/images/main/main_email.png"/>
            <span class="fontBold commonColor">{{uItem}}</span>
        </div>
        <div class="" style="height: 40%;" >
            <span v-if="this.uItem === '이메일'" class="fl">{{this.GE_USER.userEmail}}</span>
            <span v-else-if="this.uItem === '휴대폰 번호'" class="fl">{{this.$setPhone(this.GE_USER.phoneEnc)}}</span>
            <gBtnSmall v-if="this.uItem === '이메일'" btnThema="light" style="float: right;" btnTitle="변경" v-on:click="openChangePop(uItem)" />
            <gBtnSmall v-if="this.uItem === '휴대폰 번호' && this.GE_USER.userKey === 228 || this.GE_USER.userKey === 255 || !isMobile" btnThema="light" style="float: right;" btnTitle="실명인증" v-on:click="openChangePop(uItem)" />
        </div>
    </div>
</template>

<script>
export default {
  emits: ['openPop'],
  data () {
    return {
      isMobile: /Mobi/i.test(window.navigator.userAgent)
    //   uItem: [
    //     { icon: '', title: '이메일', value: '', btnText: '', link: '' }
    //   ]
    }
  },
  methods: {
    openChangePop (target) {
      if (target === '휴대폰 번호') {
        target = ''
        target = 'changePhone'
      }
      this.$emit('openPop', target)
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  props: {
    uItem: {}
  }
}
</script>

<style scoped>
</style>
