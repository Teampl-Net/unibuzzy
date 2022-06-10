<template>
<div v-for="(data, index) in listData" :key='index' class="MenuListNew fl"  style="width:100%; " @click="listClick(data)" >
    <div style="width:100%; height:30px; " class="fl">
        <!-- <img src="" /> -->
        <div class="fl" style="width:30px;height:30px; border-radius:100%; background-color:#ccc; margin-left:1rem;">
            <img src="../../../assets/images/main/main_subscriber.png" alt="" >
        </div>
        <div class="fl mleft-2 fontBold" style="line-height:30px;color:black;">{{data.boardName}}</div>
    </div>
    <!-- <p>생성된 게시판이 없습니다.</p> -->
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
    methods: {
        listClick (data) {

            this.$emit('chanMenuClick', data.boardName)
        }
    }
}
</script>

<style >
.MenuListNew{border-bottom:1px solid #eee;  padding: 0.7rem 0; }
</style>
