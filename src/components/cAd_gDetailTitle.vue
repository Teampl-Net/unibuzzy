<template>
    <div style="border-bottom: 1px solid #BFBFDA; padding-bottom: 1rem ; min-height: 5rem; margin-bottom: 1.5rem;" >
    <img src="../resource/images/channer_logo.png" style="width: 4rem; margin-right: 1rem;float: left;" alt="">
    <div style="float: left; margin-top: 0.5rem;">
        <p style="font-size: 18px; font-weight: bold; color: #6768A7; margin-bottom: 0.2rem;">{{this.chanName}}</p>
        <p style="font-size: 15px; color: #A1A1A1;">{{this.creDate}}</p>
    </div>
    <img src="../resource/images/unselectedStarIcon.svg" class="fr mtop-05" alt="">
    </div>
</template>

<script>
export default {
  props: {
    chanName: {},
    creDate: {}
  }
}
</script>
