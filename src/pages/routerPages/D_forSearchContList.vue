<template>
  <div style="width: 100%; height: 100%;">
    <table style="width: 100%; max-height: 500px;">
      <colgroup>
        <col width="10%">
        <col width="50%">
        <col width="20%">
        <col width="20%">
      </colgroup>
      <tr style="background-color: lightgray;">
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
      </tr>
        <tr v-for="contents, index in this.mContList" :key="index">
          <td>{{ contents.contentsKey }}</td>
          <td class="cursorP"><a :href="`/#/contDetail?contentsKey=${contents.contentsKey}`">{{ contents.title }}</a></td>
          <td>{{ contents.creUserName }}</td>
          <td>{{ $changeDateFormat(contents.creDate) }}</td>
        </tr>
    </table>
    <div style="height: 30px; width: 100%; background-color: lightgray; display: flex; align-items: center; justify-content: center;">
      <router-link style="width: 30px; height: 30px; background-color: #fff; line-height: 30px; margin-right: 10px;" :to="{name: 'contList', query: {page: mOffsetInt-1}}">&lt;</router-link>
      {{ this.mOffsetInt + 1 }} / {{ this.mLastPage }}
      <router-link style="width: 30px; height: 30px; background-color: #fff; line-height: 30px; margin-right: 10px;" :to="{name: 'contList', query: {page: mOffsetInt+1}}">&gt;</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      mContList: {},
      mOffsetInt: 0,
      mLastPage: 1
    }
  },
  watch: {
    page: {
      async handler (value, old) {
        if (value) {
          this.mOffsetInt = value
          var param = {}
          param.offsetInt = this.mOffsetInt
          param.pageSize = 10
          var result = await this.$getContentsList(param, false, true)
          if (result && result.content) {
            this.mContList = result.content
            this.mLastPage = result.totalPages
            if (this.mLastPage < this.mOffsetInt || this.mOffsetInt === -1) {
              this.mOffsetInt = 1
            }
          }
        }
      },
      deep: true
    }
  },
  computed: {
    page () {
      return parseInt(this.$route.query.page)
    }
  },
  async created () {
    this.mOffsetInt = parseInt(this.$route.query.page)
    var param = {}
    param.offsetInt = this.mOffsetInt
    param.pageSize = 10
    var result = await this.$getContentsList(param, false, true)
    if (result && result.content) {
      this.mContList = result.content
      this.mLastPage = result.totalPages
      if (this.mLastPage < this.mOffsetInt || this.mOffsetInt === -1) {
        this.mOffsetInt = 1
      }
    }
    document.querySelector('meta[property="og:description"]').setAttribute('content', '더알림 콘텐츠 리스트')
    document.querySelector('meta[property="og:title"]').setAttribute('content', '더알림 | 콘텐츠 리스트')
  }
}
</script>

<style scoped>
th, td {
  border: 1px solid black;
}
</style>
