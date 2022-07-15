<template>
    <template v-if="listData.length > 0">
        <div  v-for="(data, index) in listData" :key='index' class="MenuListNew fl"  style="width:100%; " @click="listClick(data)" >
            <div style="width:100%; height:30px; " class="fl">
                <!-- <img src="" /> -->
                <div class="fl" style="width:30px;height:30px; border-radius:100%; margin-left:1rem; padding: 2px; border-radius: 100%;" :style="'background: ' + data.picBgPath + ';'">
                    <img src="../../../assets/images/channel/channer_board.png" style="width: 95%; " alt="" >
                </div>
                <div class="fl mleft-05 fontBold" style="line-height:30px;color:black;">{{this.$changeText(data.cabinetNameMtext)}}</div>
            </div>
        </div>
    </template>

    <div v-else><p>공유된 게시판이 없습니다.</p></div>
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
.MenuListNew{border-bottom:1px solid #eee;  padding: 0.7rem 0; }
</style>
