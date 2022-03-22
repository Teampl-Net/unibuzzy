<template>
    <div style="width: 100%; height: 4rem;">
        <div style="text-align: left; width: 100%; height: 40%;">
            <img class="mr-04" :src="uItem.icon"/>
            <span class="fontBold commonColor">{{uItem.title}}</span>
        </div>
        <div class="" style="height: 40%;" >
            <span v-if="this.uItem.title === '이메일'" class="fl">{{getUserEmail}}</span>
            <span v-else-if="this.uItem.title === '휴대폰 번호'" class="fl">{{getUserMobile}}</span>
            <gBtnSmall style="float: right;" :btnTitle="uItem.btnText" v-on:click="openChangePop(uItem.click)" />
        </div>
    </div>
</template>

<script>
export default {
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
    getUserEmail () {
      var resultEmail = '등록된 이메일 주소가 없습니다.'
      var userEmail = localStorage.getItem('userEmail')
      if (userEmail !== undefined && userEmail !== 'undefined' && userEmail !== null && userEmail !== 'null' && userEmail !== '') {
        resultEmail = userEmail
      }
      return resultEmail
    },
    getUserMobile () {
      var resultMobile = '등록된 번호가 없습니다.'
      var userMobile = localStorage.getItem('userMobile')
      if (userMobile !== undefined && userMobile !== 'undefined' && userMobile !== null && userMobile !== 'null' && userMobile !== '') {
        resultMobile = userMobile
      }
      return resultMobile
    }
  },
  props: {
    uItem: Array
  }
}
</script>

<style scoped>
</style>
