<template>
<div style="width:100%; height:100%;">
    <template v-if="listData.length > 0">
        <div  v-for="(data, index) in listData" :key='index' class="MenuListNew fl"  style="width:100%; min-height:30px; " @click="listClick(data)" >
            <!-- <img src="" /> -->
            <div class="fl" style="width:30px;height:30px; border-radius:100%; margin-left:1rem; padding: 2px; border-radius: 100%;" :style="'background: ' + data.picBgPath + ';'">
                <img src="../../../assets/images/channel/channer_board.png" style="width: 95%; " alt="" >
            </div>
            <div class="textLeft fl mleft-2 font16" style="line-height: 30px; width: calc(100% - 60px);">
                <span class="fontBold" style="color: black;">{{this.$changeText(data.cabinetNameMtext)}}</span>
                <!-- <span class="mleft-05 fl fontBold commonColor">{{data}}</span> -->
            </div>
        </div>
    </template>

    <div class="textLeft mtop-05" style="margin-left: calc(2rem + 20px);" v-else><p class="font14">공유된 게시판이 없습니다.</p></div>
</div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
export default {
    props: {
        listData: {},
    },
    data () {
        return{
        }
    },
    created() {
        this.$emit('boardCount', this.listData.length)
    },
    methods: {
        listClick (data) {
            this.$emit('chanMenuClick', data)
        }
    }
}
</script>

<style >
.MenuListNew{border-bottom:1px solid #eee;  padding: 0.7rem 0; margin-top: 10px;
display: flex;
align-items: center;
align-content: center;
}
</style>
