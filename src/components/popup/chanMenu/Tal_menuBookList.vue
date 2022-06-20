<template>

<div v-if="listData.length > 0" style="width: 100%; margin-top:0.5rem;" class="">
    <div v-for="(data, index) in listData" :id="'book'+ index" :key='index' class="cabinetListCard fl" >

        <div style="width:100%; height:30px;" class="fl">
            <!-- <img src="" /> -->
            <div class="fl" style="width:30px;height:30px; border-radius:100%; background-color:#ccc; margin-left:1rem;">
                <img src="../../../assets/images/main/main_subscriber.png" alt="" >
            </div>
            <div class="fl mleft-2 fontBold" style="line-height:30px;color:black;">{{data.cabinetNameMtext}}</div>
        </div>
    </div>

</div>
<div v-else><p>생성된 그룹이 없습니다.</p></div>

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
    async created () {


    },
    components: {
        // draggable: VueDraggableNext
    },
    methods:{
        clickList(data){
            // alert(true)
            // if(this.selectPopYn !== true)
            // this.$emit('openMCabUserList',data) // alert(data.reveiverTeamName)
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
