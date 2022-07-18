<template>

<div v-if="listData.length > 0" style="width: 100%; margin-top:0.5rem;" class="">
    <div v-for="(data, index) in listData" :id="'book'+ index" :key='index' class="cabinetListCard fl" @click="clickList(data)">

        <div style="width:100%; height:30px;" class="fl">
            <!-- <img src="" /> -->
            <div class="fl" style="width:30px;height:30px; margin-left:1rem;">
                <img src="../../../assets/images/channel/channer_addressBook.svg" alt="" >
            </div>
            <div class="fl mleft-2 fontBold font16" style="line-height:30px;color:black;">{{data.cabinetNameMtext}}</div>
        </div>
    </div>

</div>
<div v-else class="textLeft " style="margin-left: calc(2rem + 20px);"><p class="textLeft font14">생성된 그룹이 없습니다.</p></div>

</template>

<script>
// import { VueDraggableNext } from 'vue-draggable-next'
/* eslint-disable */
// eslint-disable-next-line
export default {
    props:{
        listData:{},
        editYn:{},
        selectPopYn:{},
        chanAlimListTeamKey: {}
    },
    data(){
        return{
            // cabinetList: [{cabinetNameMtext:'KO$^$SSS'},{cabinetNameMtext:'KO$^$BBB'}],

            editTeamName:'',
            editNameYn:null,
            teamList: {},
            dragging: false
        }
    },
    async created() {

    },
    components: {
        // draggable: VueDraggableNext
    },
    methods:{
        clickList(data){
            this.$emit('openDetail',data)
        },
    }

}
</script>

<style >
.cabinetListCard{
width:100%; overflow: hidden; position: relative;
padding: 10px 0;
border-bottom: 1px solid #eee;
float: left;
}
.fontBold{font-weight: bold;}

</style>
