<template>
<!-- <div style="z-index:999; width: 100vw; height: 100vh; position: fixed; top:0; left:0;" @click="this.$emit('closePop')"/> -->
<div style="width:100%; height: calc(100% - 150px); background-color:white; position: absolute; top:150px; left:0; z-index:9; ">
    <div v-if="ownerYn" class="fadein" style=" max-width:90%; line-height:1.4rem; ;padding: 10px 20px; background-color:#cccccc90; border-radius:20px; position: absolute; left:5%; top:2%; z-index:11">
        <p class="commonBlack fontBold textLeft ">[{{this.$changeText(chanInfo.nameMtext)}}]의 채널에서 발생한 알림은 '최신'탭에 볼 수 있어요!</p>
        <p class="commonBlack fontBold textLeft">채널 정보에서 링크를 복사해 구독자를 늘려보세요!</p>
        <p class="commonBlack fontBold textLeft">상단의 보이는 메뉴 눌러 주소록과 게시판을 만들어보세요!</p>
        <p class="commonBlack fontBold textLeft">하단 + 버튼을 눌러 최초의 알림을 보내보세요!</p>
    </div>
    <div v-if="!ownerYn" class="fadein" style=" max-width:90%; line-height:1.4rem; ;padding: 10px 20px; background-color:#cccccc90; border-radius:20px; position: absolute; left:5%; top:2%; z-index:11">
        <p class="commonBlack fontBold textLeft ">[{{this.$changeText(chanInfo.nameMtext)}}]의 채널 관리자가 발송하는 알림은 '최신'탭에서 볼 수 있고</p>
        <p class="commonBlack fontBold textLeft">알림의 하트와 별은 각각 좋아요, 중요한 탭에서 따로 볼 수 있습니다!</p>
        <p class="commonBlack fontBold textLeft">채널 정보에서 멤버를 신청하여 구성원이 되어보세요!</p>
        <p class="commonBlack fontBold textLeft">상단의 보이는 메뉴 눌러 게시판을 읽어보세요!</p>
    </div>
    <div style="position: absolute; top:20%;  left:50%; transform: translate(-50%,0); z-index:10; opacity: 1 !important;">
        <gSvg
        viewBox="0 0 200 200 "
        width="200"
        height="200"
        iconColor="rgba(100,100,255,0.80)"
        icon-name="wink"
        ><iconWink />
        </gSvg>

    </div>

</div>
</template>
<script>
/* eslint-disable */
export default {
    props:{
        chanInfo:{},

    },
    data (){
        return{
            step:0,
            ownerYn:false
        }
    },
    created (){
        console.log(this.chanInfo);
        if(this.chanInfo.userTeamInfo.ownerYn) this.ownerYn = true
        this.startStep()
    },
    methods:{
        startStep(){

            setTimeout(()=>{
                this.step += 1
            },2000)

        }
    }

}
</script>
<style>

</style>
