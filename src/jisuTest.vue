<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <button @click="click">야ㅑ양</button>
  <vue3-simple-html2pdf
    ref="vue3SimpleHtml2pdf"
    :options="pdfOptions"
    :filename="exportFilename"
  >
    <img src="https://www.dummyimage.com/600x400/000/fff" alt="">
  </vue3-simple-html2pdf>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      pdfOptions: {
        margin: 15,
        image: {
          type: 'jpeg',
          quality: 1
        },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'p'
        }
      },
      exportFilename: 'my-custom-file.pdf'
    }
  },
  watch: {
  },
  methods: {
    click () {
      this.$refs.vue3SimpleHtml2pdf.download()
    }
  },
  computed: {
  }
}
</script>

<style scoped>
table {
  width: 100%;
  font-size: 14px;
  text-align: center;
  border: 1px solid #ccc;
  border-collapse: collapse;
}
th {
  background: #ddd;
  font-weight: bold;
}
td, th {
    padding: 8px;
    border: 1px solid #ccc;
  }
th {
    background: #ddd;
    font-weight: bold;
  }
</style>
