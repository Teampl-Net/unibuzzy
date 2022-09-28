<template>
    <template v-if="listData.length > 0">
        <div  v-for="(data, index) in listData" :key='index' class="MenuListNew fl cursorP"  style="width:100%; " @click="listClick(data)" >
            <!-- <div v-if="!noIcon" class="fl mleft-1" style="width:30px;height:30px; border-radius:100%; padding: 2px; border-radius: 100%;" :style="'background: ' + data.picBgPath + ';'">
                <img src="../../../assets/images/channel/channer_board.png" style="width: 95%; " alt="" >
            </div> -->
            <div class="fl mleft-2 textLeft font16 textOverdot" style="width: calc(100% - 30px - 3rem);" :style="noIcon ? 'margin: 0 0 0 0; width:100% !important;' : '' ">
                <span class="commonBlack fontBold mleft-05" >{{this.$changeText(data.cabinetNameMtext)}}</span>
            </div>
        </div>
    </template>
    <p v-else class="fl w-100P textLeft font14 mtop-07">공유된 게시판이 없습니다.</p>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
export default {
    props: {
        listData: {},
        noIcon: {}
    },
    data () {
        return{
        }
    },
    created () {
        // console.log('listData')
        // console.log(this.listData)
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
.MenuListNew{
border-bottom:1px solid #eee;
/* margin-top: 10px; */
padding: 10px 0;
display: flex;
align-items: center;
align-content: center;
}
</style>
