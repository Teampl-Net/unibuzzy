<template>
    <div class="mainHeaderWrap" style="">
        <img src="../../assets/images/common/thealim_header_logo.png" class="fl" style=" width: 1.7rem; margin: 0 0.4rem" >
        <p class="font25 headerFont commonColor fl" v-html="headerTitle"></p>
        <div class="menuBtn">
        <img v-on:click="showMenu()" src="../../assets/images/common/icon_menu.png" style="width: 1.8rem"/>
        </div>
        <!-- <div class=" policyHeader fl ms-2 text-start " style="margin-top: 5px; line-height: 20px">
            <p class="font25 headerFont commonColor fl">더알림</p>
        </div> -->
    </div>
</template>

<script>

export default {
  name: 'talHeader',
  methods: {
    showMenu () {
      this.$emit('showMenu')
    }
  },
  props: {
    headerTitle: {}
  }
}

</script>

<style>
.mainHeaderWrap{box-sizing: border-box; display: list-item; padding: 0.7rem 0.5rem; text-align: left; width: 100%; height: 50px;}
.menuBtn{float: right;}
</style>
