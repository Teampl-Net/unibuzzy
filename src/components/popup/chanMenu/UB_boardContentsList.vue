<i18n>
  {
    "ko": {
      "EMPT_MSG_SHARE_POST": "공유된 게시판이 없습니다."
    },
    "en": {
      "EMPT_MSG_SHARE_POST": "There is no shared bulletin board."
    }
  }
</i18n>
<template>

<div class="w100P fl">
    <div  v-for="(data, index) in propBoardList" :key='index' class="MenuListNew fl cursorP mleft-05 w100P" @click="listClick(data)" >
    <img class="fl cursorP img-w18 mright-05" alt="주소록 이미지"  src="../../../assets/images/editChan/icon_board.svg">
    <p class="grayBlack fontBold mleft-05 textOverdot textLeft fl cabinetNameBox" style="font-size: 1rem; width: calc(100% - 90px);">
        {{this.$changeText(data.cabinetNameMtext)}}
    </p>
    </div>
    <p v-if="propBoardList.length === 0" class="fl w100P textLeft font14 mtop-07 mbottom-07">{{ $t('EMPT_MSG_SHARE_POST') }}</p>
</div>
</template>

<script>
export default {
  props: {
    propBoardList: {}
  },
  methods: {
    listClick (data) {
      this.$emit('boardContentsClick', data)
    }
  }
}
</script>

<style >
.MenuListNew{
/* border-bottom:1px solid #eee; */
/* margin-top: 10px; */
padding: 10px 0;
display: flex;
align-items: center;
align-content: center;
}
.cabinetNameBox {
  font-size: 1rem;
  width: calc(100% - 90px);
}
</style>
