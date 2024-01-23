<template>
    <div style="width: 100%; height: 100vh; position: absolute; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " ></div>
    <div :style="popLeft" class="admMsgPopWrap">
        <div class="admMsgPopHeader">
            <p class="font12 headerFont fl" style="line-height: 2.6rem; margin-left: 0.3rem" >내용을 입력해주세요.</p>
        </div>

        <div class="admMsgPopBody" >
            <textarea v-model="admMsgText" class="admMsgTextarea" ></textarea>
            <div class="admMsgBtnArea" >
                <gBtnSmall class="mright-05" v-on:click="goSave" btnTitle="저장"/>
                <gBtnSmall class="mright-05" v-on:click="goNo" btnTitle="닫기"/>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    data(){
        admMsgText:''
    },
    computed: {
        popLeft () {
            return { left: (window.innerWidth - 450) / 2 + 'px' }
        }
    },
    methods:{
        goNo(){
            this.$emit('no')
        },
        goSave(){
            var obj = new Object();
            obj.admMsg = this.admMsgText;
            this.$emit('save',obj)
        },
        setMsgData(){

            this.admMsgText = this.propMsgData
        },

    },
    props:{
        propMsgData:{}
    },
    created(){ // 기존 데이터 넣어주기
        this.setMsgData()
    }
}
</script>


<style >
.admMsgPopHeader{height: 50px; width: 100%; border-bottom: 1px solid rgb(74 102 158); padding: 0.6rem 0.5rem;}
.admMsgPopWrap{width: 450px; position: absolute; z-index: 999; top: 30%; border-radius: 10px; background: #FFFFFF;}
.admMsgPopBody{width: 100%; padding: 1em 0; background-color: #f9f9f9;}
.admMsgTextarea{ resize: none; width:90%; height:250px; border:1px solid rgb(74 102 158) }
.admMsgBtnArea{display: flex; height: 20px; justify-content:center;}
</style>