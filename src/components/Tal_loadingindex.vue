<template>
    <div class="loadingZWrap">
        <div class="loadingZcontainer">
            <img class="boombox" src="../assets/images/common/message_logo.png" alt="">
            <div class="shadow"></div>
            <p class="waitingText">Wait a moment...</p>
        </div>
    </div>
</template>

<script>
// import '../../../public/smarteditor/js/smarteditor2'
// import { nhn from '../../../public/smarteditor2-master/workspace/static/js/service/HuskyEZCreator.js'
export default {
  name: 'app',
  mounted () {
  },
  setup () {
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unused-vars
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style>

@keyframes dance-and-bounce {
  0% {
    width: 90px;
    height: 100px;
    -moz-transform: rotate(0deg) translateY(0px);
    -webkit-transform: rotate(0deg) translateY(0px);
    transform: rotate(0deg) translateY(0px);
  }
  15% {

    width: 88px;
    height: 105px;
    -moz-transform: rotate(0deg) translateY(-20px);
    -webkit-transform: rotate(0deg) translateY(-20px);
    transform: rotate(0deg) translateY(-20px);
  }
  20% {
    width: 88px;
    height: 102px;
    -moz-transform: rotate(0deg) translateY(-16px);
    -webkit-transform: rotate(0deg) translateY(-16px);
    transform: rotate(0deg) translateY(-16px);
  }
  /* 35%{
      top: -100px;
      width: 88px;
    height: 105px;
    -moz-transform: rotate(0deg) translateY(0px);
    -webkit-transform: rotate(0deg) translateY(0px);
    transform: rotate(0deg) translateY(0px);
  } */
  35%{
      top: -100px;
      width: 88px;
    height: 100px;
    -moz-transform: rotate(0deg) translateY(5px);
    -webkit-transform: rotate(0deg) translateY(5px);
    transform: rotate(0deg) translateY(5px);
  }
  40%{
    top: -90px;
    width: 88px;
    height: 90px;
    -moz-transform: rotate(0deg) translateY(10px);
    -webkit-transform: rotate(0deg) translateY(10px);
    transform: rotate(0deg) translateY(10px);
  }
  60%{
      top: -100px;
      width: 88px;
    height: 100px;
    -moz-transform: rotate(0deg) translateY(0px);
    -webkit-transform: rotate(0deg) translateY(0px);
    transform: rotate(0deg) translateY(0px);

  }
  70%{
      top: -100px;
      width: 88px;
    height: 100px;
    -moz-transform: rotate(0deg) translateY(0px);
    -webkit-transform: rotate(0deg) translateY(0px);
    transform: rotate(0deg) translateY(0px);

  }
  75%{
    width: 88px;
    height: 100px;
    -moz-transform: rotate(-10deg) translateY(0px);
    -webkit-transform: rotate(-10deg) translateY(0px);
    transform: rotate(-10deg) translateY(0px);
  }
  77.5%{
    -moz-transform: rotate(0deg) translateY(0px);
    -webkit-transform: rotate(0deg) translateY(0px);
    transform: rotate(0deg) translateY(0px);
  }
  80%{
    -moz-transform: rotate(10deg) translateY(0px);
    -webkit-transform: rotate(10deg) translateY(0px);
    transform: rotate(10deg) translateY(0px);
  }
  85%{
    -moz-transform: rotate(0deg) translateY(0px);
    -webkit-transform: rotate(0deg) translateY(0px);
    transform: rotate(0deg) translateY(0px);
  }
  90%{
    -moz-transform: rotate(0deg) translateY(0px);
    -webkit-transform: rotate(0deg) translateY(0px);
    transform: rotate(0deg) translateY(0px);
  }
}

@keyframes shadow {
  0% {
    left: -25px;
    width: 170px;
    /* background: #11806a; */
  }
  15% {
    left: 5px;
    width: 120px;
  }
  /* 35% {
    left: 5px;
    width: 150px;
    /* background: #14967c;
  } */
  35%{
    left: -25px;
    bottom: -30px;
    width: 170px;
  }
  45%{
    left: -30px;
    bottom: -30px;
    width: 180px;
  }
  60%{
    left: -25px;
    bottom: -30px;
    width: 170px;
  }

  75% {
    /* background: #71368a; */
  }
  100% {
    /* background: #11806a; */
  }
}

.loadingZWrap{
  background-color: #FFFFFF;
  -moz-animation-delay: 2s;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
}

.loadingZcontainer {
  position: relative;
  top: 40%;
  left: 85%;
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.boombox {
    top: -100px;
    left: 16px;
  position: absolute;
  width: 88px;
  height: 100px;
  -moz-border-radius: 18px;
  -webkit-border-radius: 18px;
  border-radius: 18px;
  -webkit-animation: dance-and-bounce 2s infinite;
  -moz-animation: dance-and-bounce 2s infinite;
  animation: dance-and-bounce 2s infinite;
  -moz-animation-delay: 2s;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  z-index: 2;

}
.boombox :before, .boombox  :after{
    content:'';
    position: absolute;
    width: 200px;
    border: 10px solid #103950;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }

.boombox :before {
    /* top: -48px;
    left: 16px; */
    height: 10px;
    background-color: #ffcf54;
    border-bottom-width: 8px;
  }

.boombox :after{
    border-top: 0;
    height: 15px;
    /* top: -26px;
    left: 16px; */
  }

.shadow {
  position: absolute;
  bottom: -30px;
  left: -25px;
  width: 170px;
  height: 40px;
  background: #b7b7b748;
  border-radius: 50%;
  animation: shadow 2s infinite;
  animation-delay: 2s;
  box-shadow: none!important;
}
.waitingText{position: absolute;bottom: -80px; color: #6768A7; left: -10px; font-size: 20px; font-weight: bold;}
</style>
