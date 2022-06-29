<template>
    <!-- <div class="layerPopup"> -->
        <div class="spinner"></div>
    <!-- </div> -->
</template>
<script>
export default {
    methods: {
        show() {
            document.getElementsByClassName('spinner')[0].style.display='block';
        },
        hide() {
            document.getElementsByClassName('spinner')[0].style.display='none';
        }

    }
}
</script>

<style>
.spinner {
    position: absolute;
    /* top: 50%; */
    top:100%;
    left: 50%;
    border: 5px solid #f3f3f3; /* Light grey */
    border-top: 5px solid #6768A7;
    border-radius: 50%;
    width: 40px;
    height: 40px;
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
