<template>

<div style="width: 100%; float: left;">
    <div  v-for="(data, index) in listData" :key='index' class="MenuListNew fl cursorP mleft-05"  style="width:100%; " @click="listClick(data)" >
    <img class="fl cursorP img-w18 mright-05" alt="주소록 이미지"  src="../../../assets/images/editChan/icon_board.svg">
    <span class="grayBlack fontBold mleft-05 w-100P textOverdot textLeft fl" >

        {{this.$changeText(data.cabinetNameMtext)}}
    </span>
    </div>
    <p v-if="listData.length === 0" class="fl w-100P textLeft font14 mtop-07">공유된 게시판이 없습니다.</p>
</div>
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
/* border-bottom:1px solid #eee; */
/* margin-top: 10px; */
padding: 10px 0;
display: flex;
align-items: center;
align-content: center;
}
</style>
