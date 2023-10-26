<template>
  <header>
    <!-- Popup Title -->
    <h1>{{ pOptions.purpose }}</h1>
    <button>닫기</button>
  </header>

  <main>
    <form>
      <!-- neccessary post values -->
      <fieldset id="neccessaryOptions">
        <legend>기본 정보 설정</legend>

        <fieldset id="postReceivers">
          <legend>받는 사람 지정</legend>
          <button type="button">All</button>
          <button type="button" @click="toggleReceiverSelectPop">Select</button>

          <!-- target선택 팝업 -->
          <SelectTargetPop
            v-if="showReceiverSelectList"
            :pSelectData="receiverList"
            :pSelectedTargetList="params.targetList"
            @saveTarget="setTargetList"
            @closeXPop="toggleReceiverSelectPop"
          />

          <!-- 선택된 target -->
          <div v-if="params.targetList.length" class="selectedTargetList">
            <div v-for="target in params.targetList" :key="target.accessKey">
              {{ target.accessName }}
            </div>
          </div>
        </fieldset>

        <div class="optionToggleBtnWrap">
          <button type="button" @click="toggleAnonymousYn">익명</button>
          <button type="button" @click="toggleCommentYn">댓글</button>
        </div>

        <fieldset>
          <label for="id">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            v-model="tagList.title"
          />
        </fieldset>
      </fieldset>

      <!-- optional post values -->
      <fieldset id="optionalOptions">
        <fieldset v-if="pOptions.model === 'mamkik'" id="date">
          <legend>날짜 선택</legend>
          <label for="">Date</label>
          <input
            v-if="pOptions.model === 'mamkik'"
            id="fromDate"
            type="date"
            v-model="params.fromDateStr"
          />
          <input id="toDate" type="date" v-model="params.toDateStr" />
        </fieldset>

        <fieldset v-if="pOptions.model === 'mamkik'" id="categoryTag">
          <legend>카테고리 선택</legend>
          <div class="categoryListWrap">
            <button
              type="button"
              v-for="tag in tagList"
              :key="tag.categoryKey"
              @click="toggleSelectTag(tag)"
            >
              {{ tag.categoryNameMtext }}
            </button>
          </div>
        </fieldset>

        <fieldset
          v-if="pOptions.model === 'mamkik' || pOptions.model === 'unibuzzy'"
          id="uploadFile"
        >
          <legend>파일 첨부</legend>
          <input type="file" />
        </fieldset>

        <fieldset>
          <legend>작성 내용</legend>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="params.bodyFullStr"
          ></textarea>
        </fieldset>
      </fieldset>
    </form>
  </main>

  <footer>
    <div class="btnListWrap">
      <button @click="pPostContentsFn(params)">완료</button>
      <button>취소</button>
    </div>
  </footer>
</template>

<script>
// vue settings
import { defineComponent, ref, reactive, onMounted } from 'vue'

// components
import SelectTargetPop from './selectTarget/SelectTargetPop.vue'

export default defineComponent({
  props: [
    'pOptions',
    'pUserInfo',
    'pGetTagListFn',
    'pGetReceiverList',
    'pPostContentsFn'
  ],
  components: {
    SelectTargetPop
  },
  setup(props) {
    // Tag List
    const tagList = props.pGetTagListFn()

    // 대상 지정하기 기능
    const receiverList = props.pGetReceiverList()
    const selectAllReceivers = () => {
      params.targetList = 'A'
    }
    const showReceiverSelectList = ref(false)
    const toggleReceiverSelectPop = () => {
      showReceiverSelectList.value = !showReceiverSelectList.value
    }

    // 날짜 옵션 - fromDate기본값 설정
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const currentDate = `${year}-${month}-${day}`
    onMounted(() => {
      const dateInput = document.getElementById('fromDate')
      if (dateInput) {
        dateInput.value = currentDate
      }
    })

    // submit params 설정
    const params = reactive({
      title: '',
      targetList: [],
      toDateStr: 'yyyy-mm-dd',
      fromDateStr: '',
      bodyFullStr: '',
      tagList: [],
      attachYn: false,
      attachFileList: [],
      showCreNameYn: true,
      canReplyYn: false
    })
    // 익명 & 댓글 여부 설정
    const toggleAnonymousYn = () => {
      params.showCreNameYn = !params.showCreNameYn
    }
    const toggleCommentYn = () => {
      params.canReplyYn = !params.canReplyYn
    }
    // tagList 설정
    const toggleSelectTag = (selectedTag) => {
      const indexToRemove = params.tagList.indexOf(selectedTag)
      if (indexToRemove !== -1) {
        params.tagList.splice(indexToRemove, 1)
      } else {
        params.tagList.push(selectedTag)
      }
    }
    // targetList 설정
    const setTargetList = (selectedTargetList) => {
      params.targetList = selectedTargetList
    }

    return {
      tagList,
      showReceiverSelectList,
      toggleReceiverSelectPop,
      selectAllReceivers,
      receiverList,
      params,
      toggleAnonymousYn,
      toggleCommentYn,
      setTargetList,
      toggleSelectTag
    }
  }
})
</script>

<style lang="scss" scoped>
// 임시 CSS
main {
  height: calc(100% - 120px);
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}
legend {
  display: none;
}
</style>
