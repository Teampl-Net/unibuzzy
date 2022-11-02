<template>
<div class="w-100P fl">
  <div v-for="(data, index) in activeTabList" :key="index" @click="emit('click', data)" class="fl mainTabBox mright-03" :style="activeTab === data.name ? 'border: 1px solid #6768a7; ;border-bottom: none; background:#fff !important;' : 'border: 1px solid #6768a7;'">
    <p class="font16 fontBold fl">{{data.display}}</p>
  </div>
</div>
</template>
<script>
export default {
  props: {
    activeTabList: {},
    activeTab: {}
  },
  methods: {
    emit (type, data) {
      if (type === 'click') {
        this.$emit('changeTab', data.name)
      }
    }
  }
}
</script>
<style>
.mainTabBox {
  padding:5px 10px; border-top-left-radius: 8px; border-top-right-radius: 8px;
  background: rgba(186, 187, 215, 0.5);
  background: #fff
}
</style>
