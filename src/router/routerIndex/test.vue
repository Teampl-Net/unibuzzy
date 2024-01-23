<template>
    <div >
        <div v-for="chatRoom in chatRoomList" :key="chatRoom.testKey">
            {{chatRoom}}
        </div>
    </div>
  </template>
  <!-- eslint-disable camelcase -->
<script lang="ts">
// eslint-disable-next-line no-unused-vars
import { defineComponent, ref, onMounted, watch, reactive } from 'vue'
export default defineComponent({
  data () {
    return {
    }
  },
  created () {
    this.getChatRoomList()
  },
  methods: {

    getChatRoomList (str: any) {
      this.chatRoomList.value = [{ testKey: 0, testName: '일번' }, { testKey: 1, testName: '이번' }, { testKey: 3, testName: '삼번' }, { testKey: 4, testName: '사번' }]
    }
  },
  setup () {
    const chatRoomList = reactive<any>([]) // 서울시청 좌표

    return {
      chatRoomList
    }
  }
})
</script>
