<template>
  <div class="jojikCompo">
    <div style="display:flex; align-items:center;">
      <div class="imgInfo">
      </div>
      <div class="textInfo">
        <p class="font15">{{ pBranch.name }}</p>
        <p class="font13">{{ pBranch.code }}</p>
      </div>
    </div>
    <div>정보</div>
  </div>
</template>

<script>
export default {
  props: {
    pBranch: {}
  },
  created () {

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
  border:1px solid rgb(199, 199, 199);
}
.imgInfo{
  width:60px;
  height:60px;
  border-radius:50%;
  border:1px solid gray;
}
.textInfo{
  text-align:left;
  margin-left:0.5rem;
}
</style>
