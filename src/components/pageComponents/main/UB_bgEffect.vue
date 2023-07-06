<template>
  <img class="blueHotBalloon" src="../../assets/images/main/blue_hotBalloon.png" width="30" style="position: absolute;" />
  <img class="rightSmallCloud" src="../../assets/images/main/rightSmallCloud.png" width="60"
    style="position: absolute; " />
  <img class="leftBigCloud" src="../../assets/images/main/leftBigCloud.png" width="80" style="position: absolute; " />
  <img class="leftSmallCloud" src="../../assets/images/main/leftSmallCloud.png" width="60" style="position: absolute; " />
  <img class="redHotBalloon" src="../../assets/images/main/hotBalloon.png" width="70" style="position: absolute;" />
  <!-- <img class="largeCloud" src="../../assets/images/main/bg_largeCloud.png" height="100" style="position: absolute;" /> -->
  <img class="yellowCar" src="../../assets/images/main/yellow_leftUp.png" width="40" style="position: absolute;" />
  <img />
</template>
<script>
export default {
  data () {
    return {
      carLeft: window.innerWidth / 2,
      carTop: window.innerHeight / 10
    }
  }
}
</script>

<style scoped>
img {
  -webkit-user-drag: none;
}

@keyframes balloon-ani {
  from {
    transform: translate(-100px, 100px);
  }

  to {
    transform: translate(500px, 100px);
  }
}

@keyframes blue-balloon-ani {
  from {
    transform: translate(-300px, 50px);
  }

  to {
    transform: translate(500px, 50px);
  }
}

@keyframes rightSmallCloud-ani {
  from {
    transform: translate(0, 50px);
  }

  to {
    transform: translate(200px, 200px);
  }
}

@keyframes leftSmallcloud-ani {
  from {
    transform: translate(-50px, 80px);
  }

  to {
    transform: translate(-300px, 180px);
  }
}

@keyframes leftBigcloud-ani {
  from {
    transform: translate(-100px, 50px);
  }

  to {
    transform: translate(-300px, 100px);
  }
}

@keyframes car-ani {
  from {
    transform: translate(-195px, 500px);
  }

  to {
    transform: translate(0, 620px);
  }
}

.yellowCar {
  animation: car-ani 20s linear infinite reverse;
  z-index: 9;
}

.redHotBalloon {
  animation: balloon-ani 100s linear infinite;
}

.blueHotBalloon {
  animation: balloon-ani 400s linear infinite;
}

.redHotBalloon:active {
  animation-play-state: paused;
}

.rightSmallCloud {
  animation: rightSmallCloud-ani 70s linear infinite;
}

.leftBigCloud {
  animation: leftBigcloud-ani 40s linear infinite;
}

.leftSmallCloud {
  animation: leftSmallcloud-ani 100s linear infinite;
}</style>
