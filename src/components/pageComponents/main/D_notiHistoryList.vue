<template>
    <div style="width: 100%; height: 100%; padding: 60px 1.5rem; padding-bottom: 0;float: left; background: #fff;">
        <p class="notiTitle font18 fontBold commonColor mbottom-05 textLeft">최근 받은 알림</p>
        <notiCompo v-for="(noti, index) in GE_RECENT_NOTI_LIST" :mNotiEle="noti" :key="index" />
    </div>
</template>

<script>
import notiCompo from './D_notiCompo.vue'
export default {
  data () {
    return {
      mNotiList: []
    }
  },
  created () {

  },
  computed: {
    GE_RECENT_NOTI_LIST () {
      return this.$store.getters['D_NOTI/GE_RECENT_NOTI_LIST']
    }
  },
  methods: {
  },
  components: {
    notiCompo
  }
}
</script>

<style scoped>

</style>
