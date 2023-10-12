<template>
  <div class="fr font12 commonDarkGray" style="">
    <div v-for="(value, index) in propData" :key="index" class="fl " style="display: flex;">
      <template v-if="value.type === 'book'">
        <img src="@/assets/images/editChan/icon_addressBook_Gray.svg" alt="" class="fl img-w15 mleft-03" >
        <p class="font12 commonDarkGray fl">{{value.count}}</p>
      </template>
      <template v-else-if="value.type === 'member'">
        <img src="@/assets/images/common/memberIcon_gray.svg" alt="" class="fl img-w15 mleft-03" >
        <p class="font12 commonDarkGray fl">{{value.count}}</p>
      </template>
      <template v-else-if="value.type === 'user'">
        <img src="@/assets/images/editChan/icon_user_Gray.svg" alt="" class="fl img-w12 mleft-03" >
        <p class="font12 commonDarkGray fl">{{value.count}}</p>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    propData: {}
  }
}
</script>

<style>

</style>
