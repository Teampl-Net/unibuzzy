<template>
<div style="width: 100%; float: left;">
  <div v-for="(data, index) in propAddressBookList" :id="'book'+ index" :key='index' class="cabinetListCard cursorP fl mleft-05" @click="clickList(data)" >
    <span class="grayBlack fontBold mleft-05 w-100P textOverdot textLeft fl" >
      <img class="fl cursorP img-w18 mright-05" alt="주소록 이미지"  src="../../../assets/images/board/icon_book.svg">
      {{this.$changeText(data.cabinetNameMtext)}}
    </span>
  </div>
  <p v-if="propAddressBookList.length === 0" class="fl w-100P textLeft font14 mtop-07 mbottom-07">생성된 그룹이 없습니다.</p>
</div>
</template>

<script>
export default {
  props: {
    propAddressBookList: {}
  },
  methods: {
    clickList (data) {
      this.$emit('openBookDetail', data)
    }
  }

}
</script>

<style >
.cabinetListCard{
width:100%; overflow: hidden; position: relative;
padding: 10px 0;
/* border-bottom: 1px solid #eee; */
float: left;
}
.fontBold{font-weight: bold;}

</style>
