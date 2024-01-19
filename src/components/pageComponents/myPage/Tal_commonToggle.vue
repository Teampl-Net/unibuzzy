<template>
     <div class="toggle-switch">
        <input type="checkbox" :id="toggleId" v-model="toggle" @click="test1" />
        <label :for="toggleId" @click="toggleOnOff" >
        <span class="toggle-track" :style="toggle === false ? 'background-color: #cccccc !important; ' : ''"></span>
        </label>
    </div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
export default ({
  data () {
    return {
      toggle:true
    }
  },
  props: {
    toggleId: {},
    isChecked: {}
  },
  created (){
    this.toggle = this.isChecked
  },
  mounted () {
    if (this.isChecked) {
      document.getElementById(this.toggleId).checked = true
      // var a =
      // a.checked = true
    }
  },
  methods: {
    toggleOnOff () {
      var param = {}
      param.toggleId = this.toggleId
      param.toggleYn = !this.toggle
      this.$emit('ChangeToggle', param)
    }
  },


})
</script>

<style >
.toggle-switch input[type=checkbox]{
  display: none;
}

.toggle-track{
  display: inline-block;
  position: relative;
  min-width: 33px;
  min-height: 18px;
  border-radius: 30px;
  background-color: #879dc9;
  line-height: 27px;
  text-align: center;
}
.toggle-track:before{
  content:'';
  display: block;
  position: absolute;
  /* top: 0px; */
  /* left: -15px; */
  top: -7px;
  /* min-width: 15px;
  min-height: 15px; */
  min-width: 20px;
  min-height: 20px;
  /* border: 1px solid rgb(74 102 158); */
  border: 1px solid #cccccc ;
  margin: 6px;
  border-radius:100%;
  transition:left 0.3s;
  /* font-size: 5px; */
  /* font-weight: bold; */

  /* content: "Off"; */
  left: -8px;
  background-color: white;
  color: white;


}
.toggle-switch input[type=checkbox] + label .toggle-track:after{
  display: inline-block;
  position: absolute;
  right: 8px;
  background-color: #cccccc !important;
  color: #fff;
}

.toggle-switch input[type=checkbox]:checked + label .toggle-track:before{
  /* content:'On'; */
  left: 10px;
  border: 1px solid rgb(74 102 158);
  background: white ;

}
</style>
