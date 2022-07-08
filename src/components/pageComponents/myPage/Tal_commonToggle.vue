<template>
     <div class="toggle-switch">
        <input type="checkbox" :id="toggleId" v-model="toggle" @click="test1" />
        <label :for="toggleId" @click="toggleOnOff" >
        <span class="toggle-track"></span>
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
    // alert(this.isChecked)
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
  min-width: 30px;
  min-height: 15px;
  border-radius: 30px;
  background: #d9d9d9;
  line-height: 27px;
  text-align: center;
}
.toggle-track:before{
  content:'';
  display: block;
  position: absolute;
  /* top: 0px; */
  /* left: -15px; */
  top: -6px;
  min-width: 15px;
  min-height: 15px;
  margin: 6px;
  border-radius:100%;
  transition:left 0.3s;
  /* font-size: 5px; */
  /* font-weight: bold; */

  /* content: "Off"; */
  left: -6px;
  background-color: #aaa;
  color: white;


}
.toggle-switch input[type=checkbox] + label .toggle-track:after{
  display: inline-block;
  position: absolute;
  right: 8px;
  color: #fff;
}

.toggle-switch input[type=checkbox]:checked + label .toggle-track:before{
  /* content:'On'; */
  left: 10px;

  background: #6768A7;

}
</style>
