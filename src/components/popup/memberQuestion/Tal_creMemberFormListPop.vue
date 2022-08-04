<template>
<div @click="closePop" style="background:#00000050; z-index:999; position:absolute; top:0; left:0; width:100%; height:100%;" ></div>

<div class="formMenuList" style="">
  <div @click="menuEvent(data.menuEvent)" v-for="(data, index) in menuList" :key="index" class="fl w-100P" style="min-height: 40px; padding: 0.5rem 1rem;" :style="index !== (menuList.length-1) ? 'border-bottom: 1px solid #ccc;' : '' " >
    <p class="commonBlack fl textLeft font18 fontBold" v-if="index !== (menuList.length-1)">-</p>
    <p class="commonBlack fr textRight font18 fontBold" style=""> {{data.menuTitle}}</p>
  </div>
</div>
</template>
<script>
export default {
  props: {
    propData: {}
  },
  data () {
    return {
      menuList: [{ menuTitle: '문제 템플릿 가져오기', menuEvent: 'getTemplate' }, { menuTitle: '새로만들기', menuEvent: 'newForm' }, { menuTitle: '닫기', menuEvent: 'closePop' }]
    }
  },
  methods: {
    menuEvent (type) {
      var param = {}
      param.teamKey = this.propData.teamKey

      switch (type) {
        case 'getTemplate':
          param.templateYn = true
          param.targetType = 'templateList'
          this.openPop(param)
          this.closePop()
          break
        case 'newForm':
          param.newFormYn = true
          param.targetType = 'memberForm'
          this.openPop(param)
          this.closePop()
          break
        case 'closePop':
          this.closePop()
          break
      }
    },
    openPop (param) {
      this.$emit('openPop', param)
    },
    closePop () {
      this.$emit('closePop')
    }
  }
}
</script>
<style>
.formMenuList{
  z-index:999;
  position:absolute;
  bottom: 10rem;
  right:3rem;

  width:40%;
  min-width:220px;
  background:white;
  border-radius:1rem;
  padding:0.5rem;
}

</style>
