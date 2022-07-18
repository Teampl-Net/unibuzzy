<template>
    <template v-if="listData.length > 0">
        <div  v-for="(data, index) in listData" :key='index' class="MenuListNew fl"  style="width:100%; min-height:30px; " @click="listClick(data)" >
                <!-- <img src="" /> -->
            <div class="fl" style="width:30px; border-radius:100%; margin-left:1rem; padding: 2px; border-radius: 100%; flex-shrink: 0; flex-grow: 0; " :style="'background: ' + data.picBgPath + ';'">
                <img src="../../../assets/images/channel/channer_board.png" style="width: 100%; " alt="" >
            </div>

            <div class="fl mleft-05 fontBold font16" style="line-height:30px;color:black; width: calc(100% - 60px); text-align:left;">{{this.$changeText(data.cabinetNameMtext)}}</div>

        </div>
    </template>

    <div class="textLeft" style="margin-left: calc(2rem + 20px);" v-else><p class="font14">공유된 게시판이 없습니다.</p></div>
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
    methods: {
        listClick (data) {
            this.$emit('chanMenuClick', data)
        }
    }
}
</script>

<style >
.MenuListNew{border-bottom:1px solid #eee;  padding: 0.7rem 0;
display: flex;
align-items: center;
align-content: center;
}
</style>
