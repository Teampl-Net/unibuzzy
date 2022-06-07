<template>
    <div style="width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; z-index: 9999; background-color: #fff">
        <!-- 팝업 헤더 -->
        <div class="header" style="width: 100%; height: 50px; background-color: #ccc; ">
            <!-- 뒤로 가기 버튼 -->
            <img v-on:click="this.$emit('closePop')" class="mtop-05 mleft-1 fl" style="width: 0.8rem; " src="../../assets/images/main/icon_back_white.png"/>
            <!-- <img scr="" />  -->
            <p class="font20 fontBold" style= "line-height: 50px;">공유할 그룹에서 선택</p>
        </div>
        <div style="width: 100%; height: 15%; margin-top: 60px; padding: 0 24px; border-bottom: 1px solid #ccc;">
        <div class="nameType">
            <p class="font20 fontBold" style="margin-top: 60px; margin-bottom: 25px; text-align: left;">공유할 사람/그룹을 선택하세요.</p>
            <div class="itemWrite" style="height: 60px !important;">
                <p class="textLeft font16 fl" style="font-weight: bold; color: black; width: 40%; line-height: 60px;">공유자</p>
                <div @click="showChanMenu" style="width: 100%; font-size: 14px; border: 1px solid #ccc; text-align: left; padding: 1px 2px;">공유할 사람/그룹을 선택하세요.</div>
            </div>
        </div>
        </div>
        <div  style="width: 100%; height: 70%; margin-top: 30px; padding: 0 24px; border-bottom: 1px solid #ccc;">
        <div class="itemWrite" style="height: 60px !important;">
            <p class="textLeft font16 fl" style="font-weight: bold; color: black; width: 40%; line-height: 60px;">작성</p>
            <div style="width: 100%; font-size: 14px; border: 1px solid #ccc; text-align: left; padding: 1px 2px;">공유할 그룹/사람 선택</div>
        </div>
        <div class="itemWrite" style="height: 60px !important;">
            <p class="textLeft font16 fl" style="font-weight: bold; color: black; width: 40%; line-height: 60px;">열람</p>
            <div style="width: 100%; font-size: 14px; border: 1px solid #ccc; text-align: left; padding: 1px 2px;">공유할 그룹/사람 선택</div>
        </div>
        <div class="itemWrite" style="height: 60px !important;">
            <p class="textLeft font16 fl" style="font-weight: bold; color: black; width: 40%; line-height: 60px;">댓글</p>
            <div style="width: 100%; font-size: 14px; border: 1px solid #ccc; text-align: left; padding: 1px 2px;">공유할 그룹/사람 선택</div>
        </div>
        </div>
    </div>

    <managerReceiver v-if="managerReceiverYn" @closePop='managerReceiverYn = false' />
</template>
<script>
/* eslint-disable */
// eslint-disable-next-line
import managerReceiver from './receiver/Tal_managerReceiver.vue'
export default {
    data () {
        return{
            managerReceiverYn: false
        }
    },
    components: { managerReceiver },
    methods: {
        showChanMenu () {
            this.managerReceiverYn = true
        }
    }
}
</script>

<style scoped>
    .menuHeader {padding:0.5rem 0;position: absolute; top: 0rem; left: 0; width: 100%; height: 50px; border-bottom: 1px solid #fff; background-color:#6768a7 ;}
    .menuHeader p{color: #FFFFFF; font-size: 20px; text-align: center;}
    .itemWrite{
        height: 80px; display: flex; align-items: center;
    }
    .creChanIntroTextWrap{padding: 10px 0; float: left; }
    .creChanIntroTextWrap p{font-size: 20px; }
    .creChanBigBtn{width: 100%; height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;}
    .activeTypeBox{background: #6768a7; color: #fff;}
    .activeTypeBox p {color: #fff;}
    .creChanBigBtn{width: 100%; height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;}
.selecWriterShow{background: #6768a7 !important; color: #fff;}
</style>
