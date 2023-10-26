<template>
  <div
    style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid #000;
      width: 70%;
      height: 80%;
    "
  >
    <CommonAddContentsForm
      :pOptions="options"
      :pUserInfo="userInfo"
      :pGetTagListFn="getTagListFn"
      :pGetReceiverList="getReceiverList"
      :pPostContentsFn="postContents"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CommonAddContentsForm from '../components/common/CommonAddContentsForm.vue'

export default defineComponent({
  components: {
    CommonAddContentsForm
  },
  data() {
    return {
      options: {
        purpose: '테스트123',
        model: 'mamkik'
      },
      userInfo: {
        nickname: 'user1',
        userKey: '4216'
      },
      getTagListFn() {
        return [
          {
            categoryKey: 0,
            categoryNameMtext: 'tag0'
          },
          {
            categoryKey: 1,
            categoryNameMtext: 'tag1'
          },
          {
            categoryKey: 2,
            categoryNameMtext: 'tag2'
          }
        ]
      },
      getReceiverList() {
        return [
          {
            accessKind: 'ex1',
            accessKey: 4216,
            iconPath: 'asdasd',
            accessName: 'target1',
            cList: [
              {
                accessKind: 'exex',
                accessKey: 421655,
                iconPath: 'asdasdasd',
                accessName: 'target1-1'
              }
            ]
          },
          {
            accessKind: 'ex2',
            accessKey: 42162,
            iconPath: 'asdasd',
            accessName: 'target2'
          }
        ]
      },
      postContents(params) {
        console.log('post content=========', params)
      }
    }
  },
  methods: {}
})
</script>

<style scoped></style>
