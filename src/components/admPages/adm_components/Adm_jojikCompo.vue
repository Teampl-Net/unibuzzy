<template>
  <div class="jojikCompo">
    <div style="display:flex; align-items:center; gap:0.5rem;">
      <!-- <div class="imgInfo" :style="{'background': pBranch.domainPath !== '' ?  `url('${pBranch.domainPath}')` : '#fbfbfd;'}"> -->
      <div class="imgInfo">
      </div>
      <div class="textInfo">
        <p class="font15 fontBold">{{ pBranch.orgName ? pBranch.orgName : '새 조직' }}</p>
        <!-- <p class="font13">{{ pBranch.orgKey ? pBranch.orgKey : pBranch.code }}</p> -->
      </div>
    </div>
    <div>
      <p v-if="pBranch.orgType" class="font14">{{ pBranch.orgType === 'T' ? '채널' : '주소록' }}</p>
      <p class="font13">🙍🏻‍♂️{{ pBranch.allCount }}</p>
   </div>
  </div>
</template>

<script>
export default {
  props: {
    pBranch: {}
  },
  created () {
    // console.log('jojikCompo pBranch', this.pBranch)
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style scoped>
.jojikCompo{
  width:100%;
  height:100px;
  padding:10px 20px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  background-color: #fff;
  border-radius:10px;
  box-shadow:0 0 3px 1px rgba(0,0,0,0.1);
}
.imgInfo{
  width:60px;
  height:60px;
  border-radius:50%;
  background-color:pink;
}
.textInfo{
  text-align:left;
  margin-left:0.5rem;
}
</style>
