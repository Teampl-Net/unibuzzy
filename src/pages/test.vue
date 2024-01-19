<template>
  <div >
      <div v-for="chatRoom in chatRoomList" :key="chatRoom.testKey">
          {{chatRoom}}
      </div>
  </div>
</template>
<script >
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
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
    async getChatRoomList () {
      // 검색하고자 하는 파라미터값(상세의 경우 유니크한 채팅키값, 리스트의 경우 userKey(누구와 관련된?))
      // const param = {
      //   chatRoomKey: 1,
      //   userKey: 2
      // ... 기타 외
      // }
      // 아마 axios 함수는 글로벌로 다른 js/ts에서 관리가 될 것이지만, 현재 만끽 개발환경이 어떻게 셋팅되었는지 확인하기 전이라, 우선 axios를 직접호출!
      // const response = await axios.post('https://mankik.com/service/mk.getChatRoomList', param) // 아마 이런 형태 혹은 비슷하게 api요청
      // this.chatRoomList = response.data
      // api구현 전) 임시로 더미모델데이터 사용
      this.chatRoomList = [{ testKey: 0, testName: '일번' }, { testKey: 1, testName: '이번' }, { testKey: 3, testName: '삼번' }, { testKey: 4, testName: '사번' }]
    }
  },
  setup () {
    const chatRoomList = reactive([]) // 서울시청 좌표

    return {
      chatRoomList
    }
  }
})
// 1. created시점에 getChatRoomList
// => 구현하려는 서비스/화면에 따라 호출시점이 다를 수 있음
// 예를들어) 초기에는 아무것도 호출하지않으나 버튼이 눌렸을때 화면이 그려져야하면? 버튼 이벤트에 함수선언
// 2. getChatRoomList api호출 : 백엔드 개발자를 통해 api사양서를 전달받고, param 및 url을 완성한다.
// => param은 리스트를 불러올 때 조건을 검색하기 위해 사용됨
// 예를들어) 오늘의 일에서 담당자필터, 우선순위 필터 등등은 전체 리스트를 불러오던 api와 같은 함수를 사용하지만 param이 다르게 호출되어 필터링된 값이 응답된다.
// 3. setup에서 선언된 변수에 2에서 응답받은 값으로 치환
// 4. (자동으로) template 내에 변수가 동적으로 렌더링된다.

// 공부포인트
// 1. vue의 라이프사이클 각각의 특성에 대해 스터디
// 2. axios 통신 및 async, await 비동기/동기 호출에 대해 스터디
// 3. vue3 문법자체에 대해.. 스터디
// 4. v-model에 대해 스터디(저절로 스터디가 될 것이라 생각함)
</script>
