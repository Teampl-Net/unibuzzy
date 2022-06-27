<template>
     <div class="toggle-switch">
        <input type="checkbox" :id="toggleId" @click="test1" />
        <label :for="toggleId" >
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
    }
  },
  props: {
    toggleId: {},
    isChecked: {}
  },

  mounted () {
    if (this.isChecked) {
      var a = document.getElementById(this.toggleId)
      a.checked = true
    }
  },
  methods: {
  }

})
</script>

<style >
.toggle-switch input[type=checkbox]{
  display: none;
}

.toggle-track{
  display: inline-block;
  position: relative;
  width: 60px;
  height: 25px;
  border-radius:60px;
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

  width: 30px;
  height: 27px;
  margin: 5px;
  border-radius:100%;
  transition:left 0.3s;
  font-size: 11px;
  font-weight: bold;

  content: "Off";
  left: 25px;
  background-color: #ccc;
}
.toggle-switch input[type=checkbox] + label .toggle-track:after{

  display: inline-block;
  position: absolute;
  right: 8px;
  color: #fff;
}

.toggle-switch input[type=checkbox]:checked + label .toggle-track:before{
  content:'On';
  left: -6px;
  background: #6768A7;
  color: white;
}
</style>
