<template>
  <transition name="newContents">
    <div v-if="this.showYn" style="margin: 0 auto; width: 100px; height: 100px; background-color: #fff; box-shadow: rgba(103, 104, 167, 0.4) 0px 1px 3px;"></div>
  </transition>
  <button @click="click">상자 토글</button>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  created () {
  },
  data () {
    return {
      showYn: false
    }
  },
  watch: {
  },
  methods: {
    click () {
      this.showYn = !this.showYn
    }
  },
  computed: {
  }
}
</script>
