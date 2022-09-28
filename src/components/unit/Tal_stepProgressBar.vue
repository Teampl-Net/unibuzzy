<template>
  <div class="stepProgressContainer">
      <ul class="progressbar">
        <li :style="'width: ' + this.stepWidth" :class="{active: value === activeStep}" v-for="(value, index) in progressStep" :key="index"> </li>
      </ul>
  </div>
</template>
<script>
export default {
  props: {
    progressStep: {},
    activeStep: {}
  },
  data () {
    return {
      stepWidth: '50px'
    }
  },
  created () {
    this.stepWidth = 100 / this.progressStep.length + '%'
    // console.log('test!!!!!!')
    // console.log(this.activeStep)
  }
}
</script>

(html comment removed:  Add "scoped" attribute to limit CSS to this component only )
<style scoped>
.stepProgressContainer{
    width: 100%;
    min-height: 50px; float: left;
}
.progressbar{
  padding-left: 0;
  counter-reset: step;
  min-height: 100%;
  height: 30px;
  width: 100%;
}
.progressbar li{
  float: left;
  position: relative;
  text-align: center;
  list-style-type: none;
}
.progressbar li:before{
  content:counter(step);
  counter-increment: step;
  width: 30px;
  height: 30px;
  border: 2px solid #6768a7;
  display: block;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  line-height: 27px;
  background: rgb(219 220 255);
  color: #6768a7;
  text-align: center;
  font-weight: bold;
}
.progressbar li:after{
  content: '';
  position: absolute;
  width:100%;
  height: 3px;
  background: #979797;
  top: 15px;
  left: -50%;
  z-index: -1;
}
.progressbar li.active:before{
 border-color: #6768a7;
 background: #6768a7;
 color: white
}
.progressbar li.active:after{
 background: #6768a7;
}
.progressbar li.active /* - li */:after{
 background: #6768a7;
}
.progressbar li.active /* - li */:before{
border-color: #6768a7;
background: #6768a7;
color: white
}
.progressbar li:first-child:after{
 content: none;
}
.li {
  list-style-type: none;
}
</style>
