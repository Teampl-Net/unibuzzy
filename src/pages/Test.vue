<template>
  <CommonAddContentsForm
    :pOptions="options"
    :pUserInfo="userInfo"
    :pGetTagListFn="getTagListFn"
    :pGetReceiverList="getReceiverList"
    :pPostContentsFn="postContents"
  />
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
        model: 'unibuzzy',
        fileServerURL: 'https://unibuzzy.com/file/tp.uploadFile'
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
            tabName: '주소록',
            targetList: [
              {
                accessKind: 'A',
                accessKey: 1,
                iconPath: require('@/assets/images/editChan/icon_addressBook.svg'),
                accessName: '주소록1',
                cList: [
                  {
                    accessKind: 'U',
                    accessKey: 2,
                    iconPath: require('@/assets/images/editChan/icon_addressBook.svg'),
                    accessName: '유저1',
                    cList: [
                      {
                        accessKind: 'C',
                        accessKey: 3,
                        iconPath: require('@/assets/images/editChan/icon_addressBook.svg'),
                        accessName: '자식1'
                      }
                    ]
                  },
                  {
                    accessKind: 'U',
                    accessKey: 10,
                    iconPath: require('@/assets/images/editChan/icon_addressBook.svg'),
                    accessName: '유저2'
                  }
                ]
              },
              {
                accessKind: 'A',
                accessKey: 4,
                iconPath: require('@/assets/images/editChan/icon_addressBook.svg'),
                accessName: '주소록2',
                cList: [
                  {
                    accessKind: 'U',
                    accessKey: 5,
                    iconPath: require('@/assets/images/editChan/icon_addressBook.svg'),
                    accessName: '유저3'
                  }
                ]
              }
            ]
          },
          {
            tabName: '팀',
            targetList: [
              {
                accessKind: 'T',
                accessKey: 6,
                iconPath: require('@/assets/images/editChan/icon_addressBook.svg'),
                accessName: '팀1',
                cList: [
                  {
                    accessKind: 'U',
                    accessKey: 7,
                    iconPath: require('@/assets/images/editChan/icon_addressBook.svg'),
                    accessName: '유저2'
                  }
                ]
              }
            ]
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
