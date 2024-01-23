<template>
    <div class="tablayerPopup">
        <div class="tabspinner"></div>
    </div>
</template>
<script>
export default {
  methods: {
    tabshow () {
      document.getElementsByClassName('tablayerPopup')[0].style.display = 'block'
    },
    tabhide () {
      document.getElementsByClassName('tablayerPopup')[0].style.display = 'none'
    }

  }
}
</script>

<style>
.tablayerPopup {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.1);
    z-index: 1;
    justify-content: center;
    align-items: center;
    margin: -30px 0 0 -30px;
}

.tabspinner {
    position: absolute;
    top: 50%;
    left: 50%;
    /* top: 50%; */
    /* top:100%; */
    /* transform: translate(-50%); */
    left: calc( 50% - 20px); /* 크기 만큼 빼줘야 가운데 정렬  */
    border: 5px solid #f3f3f3; /* Light grey */
    border-top: 5px solid rgb(74 102 158);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spinner 1s linear infinite;
}
@keyframes spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
