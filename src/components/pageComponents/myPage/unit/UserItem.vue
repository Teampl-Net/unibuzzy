<template>
    <div class="userItemWrap">
        <div class="userItemBox">
            <img v-if="this.uItem === '휴대폰 번호'" style="width: 1rem;" class="mr-04 mbottom-01" src="@/assets/images/main/main_phone.png"/>
            <img v-if="this.uItem === '이메일'" style="width: 1.2rem;" class="mr-04 mbottom-01" src="@/assets/images/main/main_email.png"/>
            <span class="fontBold commonColor">{{uItem === '이메일'? $t('COMMON_NAME_EMAIL'):$t('COMMON_NAME_PHONE')}}</span>
        </div>
        <div class="userInfoBox">
            <span v-if="this.uItem === '이메일'" class="fl textOverdot">{{this.GE_USER.userEmail}}</span>
            <span v-else-if="this.uItem === '휴대폰 번호'" class="fl">{{this.$setPhone(this.GE_USER.phoneEnc)}}</span>
        </div>
    </div>
</template>

<script>
export default {
  emits: ['openPop'],
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
      return this.$store.getters['UB_USER/GE_USER']
    }
  },
  props: {
    uItem: {}
  }
}
</script>

<style scoped>
.userItemWrap {
  width: 100%;
  height: 4rem;
}
.userItemBox {
  text-align: left;
  width: 100%;
  height: 40%;
}
.userInfoBox {
  height: 40%;
}
.userInfoBox > span {
  width: 100%;
}
</style>
